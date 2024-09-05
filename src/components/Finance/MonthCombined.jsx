import React from 'react'
import { IoIosMore } from 'react-icons/io';
import { useStateContext } from '../../contexts/ContextProvider';
import { ExportToExcel } from '../'; 
import { FaDollarSign, FaMoneyBillAlt, FaMoneyBill, FaBox, FaFilter, FaChartBar } from "react-icons/fa";
import { GoPrimitiveDot } from 'react-icons/go';
import { Stacked } from '../../components';
import { Skeleton } from '@mui/material';
import { MonthStatistics, MonthlyRevenueChart } from './'

const MonthCombined = ({sales1C, products1C, kkm, leads, deals, idcomponent, title, spisanie, excelData}) => {
   
    return (
        <div className='flex gap-4 my-4 w-full items-center flex-col md:flex-row justify-center'>
            <MonthStatistics excelData={excelData} idcomponent="monthStats" title="Месячная статистика" spisanie={spisanie} leads={leads} deals={deals}  sales1C={sales1C} kkm={kkm} products1C={products1C} />
            <MonthlyRevenueChart sales1C={sales1C} />
        </div>
        
    )
}

export default MonthCombined