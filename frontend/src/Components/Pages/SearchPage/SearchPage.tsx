import { ChangeEvent, SyntheticEvent, useState } from 'react'
import { CompanySearch } from '../../../company';
import Navbar from '../../Navbar/Navbar';
import Hero from '../../Hero/Hero';
import Search from '../../Search/Search';
import ListPortfolio from '../../Portfolio/ListPortfolio/ListPortfolio';
import CardList from '../../CardList/CardList';
import { searchCompanies } from '../../../api';

type Props = {}

const SearchPage = (props: Props) => {
    const [search, setSearch] = useState<string>('');
    const [searchResult, setSearchResult] = useState<CompanySearch[]>([]);
    const [serverError, setServerError] = useState<string | null>(null);
    const [portfolioValues, setPortfolioValues] = useState<string[]>([]);

    const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value)
    }

    const onPortfolioCreate = (e: any) => {
        const exists = portfolioValues.find((value) => value === e.target[0].value)
        if (exists) return;
        const updatedPortfolio = [...portfolioValues, e.target[0].value];
        setPortfolioValues(updatedPortfolio);
    }

    const onPortDelete = (e: any) => {
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
            <Hero />
            <Search onSearchSubmit={onSearchSubmit} search={search} handleSearchChange={handleSearchChange} />
            <ListPortfolio portfolioValues={portfolioValues} onPortfolioDelete={onPortDelete} />
            <CardList searchResult={searchResult} onPortfolioCreate={onPortfolioCreate} />
            {serverError && <div>Unable to connect to API</div>}
        </>
    )
}

export default SearchPage