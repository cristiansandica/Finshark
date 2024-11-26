import { ChangeEvent, SyntheticEvent, useState } from 'react'
import { CompanySearch } from '../../../company';
import Search from '../../Search/Search';
import ListPortfolio from '../../Portfolio/ListPortfolio/ListPortfolio';
import CardList from '../../CardList/CardList';
import { searchCompanies } from '../../../api';
import { PortfolioGet } from '../../../Models/Portfolio';

interface Props {}

const SearchPage = (props: Props) => {
    const [search, setSearch] = useState<string>('');
    const [searchResult, setSearchResult] = useState<CompanySearch[]>([]);
    const [serverError, setServerError] = useState<string | null>(null);
    const [portfolioValues, setPortfolioValues] = useState<PortfolioGet[]>([]);

    const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value)
    }

    const onPortfolioCreate = (e: any) => {
        e.preventDefault();
        const exists = portfolioValues.find((value) => value === e.target[0].value)
        console.log(exists, 'exists')
        if (exists) return;
        const updatedPortfolio = [...portfolioValues, e.target[0].value];
        console.log(updatedPortfolio, 'updated')
        setPortfolioValues(updatedPortfolio);
    }

    const onPortfolioDelete = (e: any) => {
        e.preventDefault();
        const removed = portfolioValues.filter((value) => {
            return value !== e.target[0].value;
        })
        setPortfolioValues(removed);
    }

    const onSearchSubmit = async (e: SyntheticEvent) => {
        e.preventDefault();
        const result = await searchCompanies(search);
        if (typeof result === "string") {
            setServerError(result);
        } else if (Array.isArray(result.data)) {
            setSearchResult(result.data)
        }
        console.log(searchResult)
    }

    return (
        <>
            <Search onSearchSubmit={onSearchSubmit} search={search} handleSearchChange={handleSearchChange} />
            <ListPortfolio portfolioValues={portfolioValues} onPortfolioDelete={onPortfolioDelete} />
            <CardList searchResult={searchResult} onPortfolioCreate={onPortfolioCreate} />
            {serverError && <div>Unable to connect to API</div>}
        </>
    )
}

export default SearchPage