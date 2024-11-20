import CardPortfolio from '../CardPortfolio/CardPortfolio';

interface Props {
    portfolioValues: string[];
}

const ListPortfolio = ({ portfolioValues }: Props) => {
    return (
        <>
            <h3>My portfolio</h3>
            <ul>
                {portfolioValues.length > 0 ? (
                    portfolioValues.map((value) => {
                        return (
                            <CardPortfolio
                                portfolioValue={value}
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