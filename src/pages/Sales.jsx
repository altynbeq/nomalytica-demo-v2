import React, { useState, useEffect } from 'react'
import { useStateContext } from '../contexts/ContextProvider';
import { DailySalesStats, WeeklySalesStats, BoxTotalStats, WeaklyTotalSalesChart, MonthlyTotalSalesChart, OverallRevenueChart } from '../components/Sales';
import { getDateRange } from '../methods/getDateRange';
import { fetchLeads } from '../methods/getLeads';
import { weekDataSalesFormer } from '../data/Sales/WeekDataSalesFormer';
import { monthDataSalesFormer } from '../data/Sales/MonthDataSalesFormer'; 

const Sales = ({dayFinanceData, weekFinanceData, monthFinanceData, weekLeadsData, dayLeadsData}) => {
    const { currentColor, currentMode } = useStateContext(); 

    return (
        <div className='mt-12 flex flex-col justify-center align-center p-10'>
            <div className="flex flex-wrap lg:flex-nowrap justify-center align-top">
                <DailySalesStats dayFinanceData={dayFinanceData} dayLeadsData={dayLeadsData} />
                <WeeklySalesStats weekFinanceData={weekFinanceData} />
            </div>
            <div className='flex m-3 mt-5 flex-wrap justify-center gap-[1.5rem] items-center'>
                <BoxTotalStats monthFinanceData={monthFinanceData}  />
            </div>
            <div className="flex m-3 mt-5 flex-wrap justify-center gap-[1.5rem] items-center">
                <WeaklyTotalSalesChart weekFinanceData={weekFinanceData}  />
                <MonthlyTotalSalesChart monthFinanceData={monthFinanceData} />
            </div>
            <div className="flex m-3 mt-5 flex-wrap justify-center gap-[1.5rem] items-center w-full">
                <OverallRevenueChart />
            </div>
        </div>
    )
}

export default Sales