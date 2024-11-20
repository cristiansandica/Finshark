import { SyntheticEvent } from 'react';
import CardPortfolio from '../CardPortfolio/CardPortfolio';
import { v4 as uuidv4 } from 'uuid';

interface Props {
    portfolioValues: string[];
    onPortfolioDelete: (e: SyntheticEvent) => void;
}

const ListPortfolio = ({ portfolioValues, onPortfolioDelete }: Props) => {
    return (
        <>
            <h3>My portfolio</h3>
            <ul>
                {portfolioValues.length > 0 ? (
                    portfolioValues.map((value) => {
                        return (
                            <CardPortfolio
                                key={uuidv4()}
                                portfolioValue={value}
                                onPortfolioDelete={onPortfolioDelete}
                            />
                        )
                    })
                ) : (
                    <h3>
                        Your portfolio is empty
                    </h3>
                )}
            </ul>
        </>
    )
}

export default ListPortfolio