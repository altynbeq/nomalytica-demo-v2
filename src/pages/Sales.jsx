import React, { useEffect } from 'react'
import { useStateContext } from '../contexts/ContextProvider';

import { DailySalesStats, BestSalesStats, BoxTotalStats, WeaklyTotalSalesChart, MonthlyTotalSalesChart, OverallRevenueChart } from '../components/Sales';
import { FirstRowStats } from '../components/General';
import { WeaklyStatistics } from '../components/Finance';

const Sales = ({dayFinanceData, dayLeadsData, monthFinanceData, weekFinanceData, weekLeadsData}) => {
    const { currentColor, currentMode,setActiveMenu } = useStateContext(); 

    useEffect(()=> {
        setActiveMenu(false);
    },[]);

    return (
        <div className='mt-12 overflow-none '>
            <div className="flex  w-[100%] flex-wrap  justify-center align-top xs:flex-col  md:mx-3  gap-[0.5rem] items-center">
                <DailySalesStats dayFinanceData={dayFinanceData} dayLeadsData={dayLeadsData} />
                <WeaklyStatistics 
                    weekFinanceData={weekFinanceData} 
                />
            </div>
            <div className='flex md:mx-3  flex-wrap justify-center gap-[1.5rem] items-center'>
                {/* <BoxTotalStats /> */}
                <FirstRowStats />
            </div>
            <div className="flex w-[100%] align-center  flex-wrap justify-center gap-[1.5rem]  items-center">
                <WeaklyTotalSalesChart weekFinanceData={weekFinanceData} weekLeadsData={weekLeadsData} />
                <MonthlyTotalSalesChart monthFinanceData={monthFinanceData} />
            </div>
            {/* <div className="flex m-3 mt-5 flex-row md:flex-row sm:flex-col xs:flex-col justify-center gap-[1.5rem] w-[100%] items-center">
                <MonthlyTotalSalesChart />
            </div> */}
            <div className="flex m-3 mt-5  justify-center gap-[1.5rem] w-[100%] items-center">
                <OverallRevenueChart />
            </div>
        </div>
    )
}

export default Sales