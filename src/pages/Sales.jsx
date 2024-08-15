import React, { useEffect, useState } from 'react'
import { useStateContext } from '../contexts/ContextProvider';

import { DailySalesStats, YearStats, WeaklyStatistics, ProductsStats, BestSalesStats, BoxTotalStats, WeaklyTotalSalesChart, MonthlyTotalSalesChart, OverallRevenueChart, WeeklyStats } from '../components/Sales';
import { FirstRowStats } from '../components/General';
import LoadingSkeleton from '../components/LoadingSkeleton'
import { getSalesReportsData, getSalesProductsData } from '../hoc/shareData';

const Sales = ({ leads, sales1C, kkm, products1C, deals, spisanie, conversionSeries, weekSalesSeries}) => {
    const { dateRanges, skeletonUp, currentColor, currentMode,setActiveMenu } = useStateContext(); 
    const excelSalesReport = getSalesReportsData();
    const [ ready, setReady ] = useState(false);
    const [ excelSalesReportDay, setexcelSalesReportDay ] = useState([]);
    const [ excelSalesReportWeek, setexcelSalesReportWeek ] = useState([]);
    const [ excelSalesReportMonth, setexcelSalesReportMonth ] = useState([]);
    useEffect(()=> {
        window.scrollTo(0, 0);
        if(excelSalesReport){
            setexcelSalesReportDay(excelSalesReport.readyDayData);
            setexcelSalesReportWeek(excelSalesReport.readyWeekData);
            setexcelSalesReportMonth(excelSalesReport.readyMonthData);
        }
    },[excelSalesReport]);

    if(skeletonUp && !ready){
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
                <DailySalesStats spisanie={spisanie.spisanieDay}  sales1C={sales1C.sales1CDay} products1C={products1C.products1CDay} kkm={kkm.kkmDay} />
                <WeeklyStats products1C={products1C.products1CDay} sales1C={sales1C.sales1CDay} kkm={kkm.kkmDay} leads={leads.leadsDay} deals={deals.dealsDay} idcomp="weekStats" title="Дневная статистика"  />
            </div>
            <div className='flex md:mx-3 flex-wrap align-center justify-center gap-[1.5rem] items-center'> 
                <FirstRowStats />
            </div>
            <div className="flex w-[100%] align-center  flex-wrap justify-center gap-[0.5rem]   items-center">
                <WeaklyStatistics products1C={products1C.products1CWeek} sales1C={sales1C.sales1CWeek} kkm={kkm.kkmWeek} leads={leads.leadsWeek} deals={deals.dealsWeek}  excelData={excelSalesReportWeek} idcomp="weekStatis" title="Недельная статистика"  />
                <WeaklyStatistics products1C={products1C.products1CMonth} sales1C={sales1C.sales1CMonth} kkm={kkm.kkmMonth} leads={leads.leadsMonth} deals={deals.dealsMonth} excelData={excelSalesReportMonth} idcomp="monthStatis" title="Месячная статистика"  />
                <ProductsStats idcomp="weekStatis" title="Товарная статистика" />
            </div> 
            <div className="flex w-[100%] align-center  flex-wrap justify-center gap-[1.5rem]  items-center">
                <WeaklyTotalSalesChart sales1C={weekSalesSeries} title="Продажи за неделю" />
                <MonthlyTotalSalesChart sales1C={kkm.kkmMonth}  title="Продажи за месяц" />
            </div>
            <div className="flex w-[100%] align-center  flex-wrap justify-center gap-[1.5rem]  items-center">
                <MonthlyTotalSalesChart sales1C={leads.leadsMonth} title="Лиды за месяц" />
                <MonthlyTotalSalesChart sales1C={conversionSeries} title="Конверсия Bitrix %" />
            </div>
            <div className="flex mt-5 flex-wrap align-center justify-center gap-[1.5rem] w-[100%] items-center">
                <OverallRevenueChart />
                <YearStats title="Годовая статистика" />
            </div>
        </div>
    )
}

export default Sales

{/* <div className="flex m-3 mt-5 flex-row md:flex-row sm:flex-col xs:flex-col justify-center gap-[1.5rem] w-[100%] items-center">
                <MonthlyTotalSalesChart />
            </div> */}