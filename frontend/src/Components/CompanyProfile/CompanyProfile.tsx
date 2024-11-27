import { useEffect, useState } from 'react';
import { CompanyKeyMetrics } from '../../company';
import { useOutletContext } from 'react-router-dom';
import { getKeyMetrics } from '../../api';
import RatioList from '../RatioList/RatioList';

interface Props { }

const tableConfig = [
    {
        label: "Market Cap",
        render: (company: CompanyKeyMetrics) => company.marketCapTTM,
    },
    {
        label: "Current Ratio",
        render: (company: CompanyKeyMetrics) => company.currentRatioTTM,
    },
    {
        label: "Return On Equity",
        render: (company: CompanyKeyMetrics) => company.roeTTM,
    },
    {
        label: "Cash Per Share",
        render: (company: CompanyKeyMetrics) => company.cashPerShareTTM,
    },
    {
        label: "Current Ratio",
        render: (company: CompanyKeyMetrics) => company.currentRatioTTM,
    },
    {
        label: "Return On Equity",
        render: (company: CompanyKeyMetrics) => company.roeTTM,
    },
];


function CompanyProfile({ }: Props) {
    const ticker = useOutletContext<string>();
    const [companyData, setCompanyData] = useState<CompanyKeyMetrics>();
    useEffect(() => {
        const getCompanyKeyRatios = async () => {
            const value = await getKeyMetrics(ticker);
            console.log(value, 'value')
            setCompanyData(value?.data[1]);
        };
        getCompanyKeyRatios();
    }, []);
    return (
        <div>
            {companyData ? (
                <>
                    <RatioList data={companyData} config={tableConfig} />
                </>
            ) :
                <>
                    Loading...
                </>
            }
        </div>
    )
}

export default CompanyProfile