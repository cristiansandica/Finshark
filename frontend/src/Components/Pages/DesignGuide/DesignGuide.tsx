import RatioList from '../../RatioList/RatioList'
import Table from '../../Table/Table'
import { testIncomeStatementData } from '../../Table/testData'

type Props = {}

const tableConfig = [
    {
      label: "Market Cap",
      render: (company: any) => company.marketCapTTM,
      subTitle: "Total value of all a company's share of stock"
    }
]

const DesignGuide = (props: Props) => {
    return (
        <>
            <h1>FinShark Design Page</h1>
            <RatioList data={testIncomeStatementData} config={tableConfig} />
            <Table />
            <h2>This is FinShark's design page. This is where we will house various design aspects of the app </h2>
             <Table />
        </>
    )
}

export default DesignGuide