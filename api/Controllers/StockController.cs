using api.Data;
using api.Dtos.Stock;
using api.Dtos.UpdateStockRequestDto;
using api.Mappers;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;

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
        public IActionResult GetAll()
        {
            var stocks = _context.Stocks.ToList()
            .Select(s => s.ToStockDto());

            return Ok(stocks);
        }

        [HttpGet("{id:int}")]
        public IActionResult GetById([FromRoute] int id)
        {
            var stock = _context.Stocks.Find(id);
            if (stock == null)
            {
                return NotFound();
            }
            return Ok(stock.ToStockDto());
        }

        [HttpPost]
        public IActionResult Create([FromBody] CreateStockRequestDto stockDto)
        {
            var stockModel = stockDto.ToStockFromCreateDTO();
            _context.Stocks.Add(stockModel);
            _context.SaveChanges();
            return CreatedAtAction(nameof(GetById), new { id = stockModel.Id }, stockModel.ToStockDto());
        }

        [HttpPut]
        [Route("{id:int}")]
        public IActionResult Update([FromRoute] int id, [FromBody] UpdateStockRequestDto updateDto)
        {
            var stockModel = _context.Stocks.FirstOrDefault(x => x.Id == id);

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

            _context.SaveChanges();

            return Ok(stockModel.ToStockDto());
        }

        [HttpDelete]
        [Route("{id}")]
        public IActionResult Delete([FromRoute] int id)
        {
            var stockModel = _context.Stocks.FirstOrDefault(x => x.Id == id);

            if (stockModel == null)
            {
                return NotFound();
            }
            _context.Stocks.Remove(stockModel);
            _context.SaveChanges();

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