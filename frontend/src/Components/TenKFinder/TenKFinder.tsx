import React, { useEffect, useState } from 'react'
import { CompanyTenK } from '../../company'
import { getTenK } from '../../api'
import TenKFinderItem from './TenKFinderItem/TenKFinderItem'
import Spinner from '../Spinner/Spinner'

interface Props {
 ticker: string
}

const TenKFinder = ({ticker}: Props) => {
    const [companyData, setCompanyData] = useState<CompanyTenK[]>()

    useEffect(() => {
        const fetchTenK = async () => {
            const result = await getTenK(ticker)
            setCompanyData(result?.data);
        }
        fetchTenK()
    },[ticker])
  return (
    <div className='inline-flex rounded-md shadow-sm m-4'>
        { companyData ? (
            companyData?.slice(0, 5).map((tenK) => {
                return <TenKFinderItem tenK={tenK} />
            })
        ): (
            <Spinner />
        )}
    </div>
  )
}

export default TenKFinder