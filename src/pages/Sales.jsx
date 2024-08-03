import React, { useEffect } from 'react'
import { useStateContext } from '../contexts/ContextProvider';

import { DailySalesStats, BestSalesStats, BoxTotalStats, WeaklyTotalSalesChart, MonthlyTotalSalesChart, OverallRevenueChart, WeeklyStats } from '../components/Sales';
import { FirstRowStats } from '../components/General';
import { WeaklyStatistics } from '../components/Finance';
import LoadingSkeleton from '../components/LoadingSkeleton'

const Sales = ({dayFinanceData, weekFinanceData, monthFinanceData, dayLeadsData,  weekLeadsData, sales1C, kkm, products1C}) => {
    const { skeletonUp, currentColor, currentMode,setActiveMenu } = useStateContext(); 
    
    if(skeletonUp){
        return(
        <div className='flex mx-10 flex-col gap-6 justify-evenly align-center text-center w-[100%]'>
            <LoadingSkeleton />
            <LoadingSkeleton />
            <LoadingSkeleton />
        </div>
        )
    }

    return (
        <div className='mt-12 flex flex-col gap-6  justify-center '>
             <div className="flex  w-[100%] flex-wrap  justify-center align-top xs:flex-col  md:mx-3  gap-[0.5rem] items-center">
                <DailySalesStats dayFinanceData={dayFinanceData} dayLeadsData={dayLeadsData} sales1C={sales1C.sales1CDay} products1C={products1C.products1CDay} />
                <WeeklyStats weekFinanceData={weekFinanceData} title="Дневная статистика"  />
            </div>
            <div className='flex md:mx-3 flex-wrap align-center justify-center gap-[1.5rem] items-center'> 
                <FirstRowStats />
            </div>
            <div className="flex w-[100%] align-center  flex-wrap justify-center gap-[0.5rem]   items-center">
                <WeaklyStatistics weekFinanceData={weekFinanceData} title="Недельная статистика"  />
                <WeaklyStatistics weekFinanceData={weekFinanceData} title="Дневная статистика"  />
                <WeaklyStatistics weekFinanceData={weekFinanceData} title="Товарная статистика" />
            </div> 
            <div className="flex w-[100%] align-center  flex-wrap justify-center gap-[1.5rem]  items-center">
                <WeaklyTotalSalesChart weekFinanceData={weekFinanceData} weekLeadsData={weekLeadsData} sales1C={sales1C.sales1CWeek} />
                <MonthlyTotalSalesChart monthFinanceData={monthFinanceData} sales1C={sales1C.sales1CMonth} />
            </div>
            <div className="flex mt-5 flex-wrap align-center justify-center gap-[1.5rem] w-[100%] items-center">
                <OverallRevenueChart />
                <WeeklyStats weekFinanceData={weekFinanceData} title="Годовая статистика" />
            </div>
        </div>
    )
}

export default Sales

{/* <div className="flex m-3 mt-5 flex-row md:flex-row sm:flex-col xs:flex-col justify-center gap-[1.5rem] w-[100%] items-center">
                <MonthlyTotalSalesChart />
            </div> */}