import React, { SyntheticEvent } from 'react'

interface Props {
    onPortfolioDelete: (e: SyntheticEvent) => void;
    portfolioValue: string;
}

const DeletePortfolio = ({ onPortfolioDelete, portfolioValue }: Props) => {
    return (
        <div>
            <form onSubmit={onPortfolioDelete}>
                <input hidden={true} value={portfolioValue} />
                <button 
                className='block w-ful py-3 text-white duration-200'
                >x</button>
            </form>
        </div>
    )
}

export default DeletePortfolio