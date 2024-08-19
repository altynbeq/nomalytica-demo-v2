import React, { useEffect, useState } from 'react';
import { useStateContext } from '../contexts/ContextProvider';
import { MonthStatistics, PaidToAmountCheck, KassaKKMPie, PaidToAmount, MonthlyRevenueChart, OverallRevenueChart, RevenueByWeekStacked, WeekRevenueStats, DailyRevenue, WeaklyRevenueOverviewStacked, TotalRevenuePie, WeaklyStatistics, TotalRevenueChart } from '../components/Finance';
import LoadingSkeleton from '../components/LoadingSkeleton';
import { getSalesReportsData } from '../hoc/shareData';

const Finance = ({sales1C, products1C, kkm, deals, leads, spisanie}) => {
  const { skeletonUp , dateRanges } = useStateContext();
  const excelSalesReport = getSalesReportsData();
  const [ excelSalesReportWeek, setexcelSalesReportWeek ] = useState([]);
  const [ excelSalesReportMonth, setexcelSalesReportMonth ] = useState([]);
  useEffect(()=>{
    window.scrollTo(0, 0);
    if(excelSalesReport){
      setexcelSalesReportWeek(excelSalesReport.readyWeekData);
      setexcelSalesReportMonth(excelSalesReport.readyMonthData);
    }
  }, [])
  
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
    <div className="mt-12 flex flex-col justify-center align-center gap-8">
      <div className="flex mt-5 w-[100%] align-center gap-4 flex-wrap md:flex-row justify-center">
        <DailyRevenue sales1C={sales1C.sales1CDay} kkm={kkm.kkmDay} products1C={products1C.products1CDay} deals={deals.dealsDay} leads={leads.leadsDat} />
        <div className=' flex justify-center align-center flex-col w-[100%] md:w-[30%]'>
          <WeaklyRevenueOverviewStacked deals={deals.dealsWeek} />
          <TotalRevenuePie />
        </div>
      </div>
       <div className="flex flex-wrap lg:flex-nowrap gap-5 justify-center ">
          <RevenueByWeekStacked  sales1C={sales1C.sales1CWeek} />
          <MonthStatistics idcomponent="weekStats" title="Недельная статистика" excelData={excelSalesReportWeek} spisanie={spisanie.spisanieWeek} leads={leads.leadsWeek} deals={deals.dealsWeek}  sales1C={sales1C.sales1CWeek} kkm={kkm.kkmWeek} products1C={products1C.products1CWeek} />
          {/* <WeekRevenueStats spisanie={spisanie.spisanieWeek} leads={leads.leadsWeek} kkm={kkm.kkmWeek} sales1C={sales1C.sales1CWeek} products1C={products1C.products1CWeek} /> */}
      </div>
      <div className="flex gap-4 w-full items-center flex-col md:flex-row justify-center">
        <PaidToAmount id="PaidToWeek" sales1C={sales1C.sales1CWeek} kkm={kkm.kkmWeek} title="Выручка за неделю"  />
        <KassaKKMPie id="KKMWeek" sales1C={sales1C.sales1CWeek} title="Фискальный регистратор (неделя)" />
      </div>
      <div className="flex gap-4 my-4 w-full items-center flex-col md:flex-row justify-center">
          <MonthStatistics excelData={excelSalesReportMonth} idcomponent="monthStats" title="Месячная статистика" spisanie={spisanie.spisanieMonth} leads={leads.leadsMonth} deals={deals.dealsMonth}  sales1C={sales1C.sales1CMonth} kkm={kkm.kkmMonth} products1C={products1C.products1CMonth} />
          <MonthlyRevenueChart sales1C={sales1C.sales1CMonth} />
      </div>
       <div className="flex gap-4 w-full items-center flex-col md:flex-row justify-center">
        <PaidToAmount id="PaidToMonth" sales1C={sales1C.sales1CMonth} title="Выручка за месяц"  />
        <KassaKKMPie id="KKMMonth" sales1C={sales1C.sales1CMonth} title="Фискальный регистратор (месяц)"  />
      </div>
      <div className="flex gap-4 my-4 w-full items-center flex-col md:flex-row justify-center">
        <WeaklyStatistics title="Годовая статистика" />
        <OverallRevenueChart />
      </div> 
    </div>
  );
};

export default Finance;