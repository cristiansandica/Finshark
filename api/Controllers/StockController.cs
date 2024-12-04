using api.Data;
using api.Dtos.Stock;
using api.Dtos.UpdateStockRequestDto;
using api.Mappers;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace api.Controllers
{
    [Route("api/stock")]
    [ApiController]
    public class StockController : ControllerBase
    {
        private readonly ApplicationDBContext _context;
        public StockController(ApplicationDBContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var stocks = await _context.Stocks.ToListAsync();
            
            var stockDto = stocks.Select(s => s.ToStockDto());

            return Ok(stocks);
        }

        [HttpGet("{id:int}")]
        public async Task<IActionResult> GetById([FromRoute] int id)
        {
            var stock = await _context.Stocks.FindAsync(id);
            if (stock == null)
            {
                return NotFound();
            }
            return Ok(stock.ToStockDto());
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] CreateStockRequestDto stockDto)
        {
            var stockModel = stockDto.ToStockFromCreateDTO();
            await _context.Stocks.AddAsync(stockModel);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetById), new { id = stockModel.Id }, stockModel.ToStockDto());
        }

        [HttpPut]
        [Route("{id:int}")]
        public async Task<IActionResult> Update([FromRoute] int id, [FromBody] UpdateStockRequestDto updateDto)
        {
            var stockModel = await _context.Stocks.FirstOrDefaultAsync(x => x.Id == id);

            if (stockModel == null)
            {
                return NotFound();
            }
            stockModel.Symbol = updateDto.Symbol;
            stockModel.CompanyName = updateDto.CompanyName;
            stockModel.Purchase = updateDto.Purchase;
            stockModel.LastDiv = updateDto.LastDiv;
            stockModel.Industry = updateDto.Industry;
            stockModel.MarketCap = updateDto.MarketCap;

            await _context.SaveChangesAsync();

            return Ok(stockModel.ToStockDto());
        }

        [HttpDelete]
        [Route("{id}")]
        public async Task<IActionResult> Delete([FromRoute] int id)
        {
            var stockModel = await _context.Stocks.FirstOrDefaultAsync(x => x.Id == id);

            if (stockModel == null)
            {
                return NotFound();
            }
            _context.Stocks.Remove(stockModel);
           await _context.SaveChangesAsync();

            return NoContent();
        }

        [HttpPatch]
        [Route("{id}")]
        public IActionResult Update([FromRoute] int id, [FromBody] PatchStockRequestDto updateDto)
        {
            var stockModel = _context.Stocks.FirstOrDefault(x => x.Id == id);

            if (stockModel == null)
            {
                return NotFound();
            }

            foreach (var property in updateDto.GetType().GetProperties())
            {
                var value = property.GetValue(updateDto);
                switch (property.Name)
                {
                    case nameof(PatchStockRequestDto.Symbol) when value != null:
                        stockModel.Symbol = (string)value;
                        break;
                    case nameof(PatchStockRequestDto.CompanyName) when value != null:
                        stockModel.CompanyName = (string)value;
                        break;
                    case nameof(PatchStockRequestDto.Purchase) when value != null:
                        stockModel.Purchase = (decimal)value;
                        break;
                    case nameof(PatchStockRequestDto.LastDiv) when value != null:
                        stockModel.LastDiv = (decimal)value;
                        break;
                    case nameof(PatchStockRequestDto.Industry) when value != null:
                        stockModel.Industry = (string)value;
                        break;
                    case nameof(PatchStockRequestDto.MarketCap) when value != null:
                        stockModel.MarketCap = (long)value;
                        break;
                }
            }

            _context.SaveChanges();

            return Ok(stockModel.ToStockDto());
        }
    }
}