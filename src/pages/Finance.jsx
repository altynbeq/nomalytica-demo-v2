import React, { useEffect, useState } from 'react';
import { useStateContext } from '../contexts/ContextProvider';
import { MonthStatistics, MonthCombined, PaidToAmountCheck, KassaKKMPie, PaidToAmount, MonthlyRevenueChart, OverallRevenueChart, RevenueByWeekStacked, WeekRevenueStats, DailyRevenue, WeaklyRevenueOverviewStacked, TotalRevenuePie, WeaklyStatistics, TotalRevenueChart } from '../components/Finance';
import LoadingSkeleton from '../components/LoadingSkeleton';
import { getSalesReportsData } from '../hoc/shareData';
import { StatsBlockFinance } from '../components'

const Finance = ({sales1C, products1C, kkm, deals, leads, spisanie}) => {
  const { skeletonUp , dateRanges } = useStateContext();
  const excelSalesReport = getSalesReportsData();
  const [ excelSalesReportWeek, setexcelSalesReportWeek ] = useState([]);
  const [ excelSalesReportMonth, setexcelSalesReportMonth ] = useState([]);
  useEffect(()=>{
    // window.scrollTo(0, 0);
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
      <div className="flex gap-4 w-full items-center flex-col md:flex-row justify-center">
          <StatsBlockFinance idcomp="weekStatsFinance" cal="cal" products1C={products1C.products1CWeek} spisanie={spisanie.spisanieWeek} sales1C={sales1C.sales1CWeek} kkm={kkm.kkmWeek} leads={leads.leadsWeek} deals={deals.dealsWeek}  />
          {/* <RevenueByWeekStacked  sales1C={sales1C.sales1CWeek} /> */}
          <div className="flex gap-4 md:gap-10 flex-col justify-center align-center pl-4 md:pl-0">
            <PaidToAmount comb={true} id="PaidToWeek" sales1C={sales1C.sales1CWeek} kkm={kkm.kkmWeek} title="Выручка за неделю"  />
            <KassaKKMPie comb={true} id="KKMWeek" sales1C={sales1C.sales1CWeek} title="Фискальный регистратор (неделя)" />
            <div className=' flex align-center justify-center '>
              <button className="bg-gray-200 text-gray-600 text-lg p-4  rounded-md py-2 ">
                Скачать отчет
              </button>
            </div>
          </div>
      </div>
      <div className="flex gap-4 w-full items-center flex-col md:flex-row justify-center">
          <StatsBlockFinance cal="drop" products1C={products1C.products1CMonth} spisanie={spisanie.spisanieMonth} sales1C={sales1C.sales1CMonth} kkm={kkm.kkmMonth} leads={leads.leadsMonth} deals={deals.dealsMonth} idcomp="monthStatsFinance" />
        <div className="flex gap-4 md:gap-10 flex-col justify-center pl-4 md:pl-0">
          <PaidToAmount id="PaidToMonth" comb={true} sales1C={sales1C.sales1CMonth} title="Выручка за месяц"  />
          <KassaKKMPie id="KKMMonth" comb={true} sales1C={sales1C.sales1CMonth} title="Фискальный регистратор (месяц)"  />
          <div className=' flex align-center justify-center '>
            <button className="bg-gray-200 text-gray-600 text-lg p-4  rounded-md py-2 ">
            Скачать отчет
          </button>
          </div>
          
        </div>
      </div>
      {/* <div className="flex gap-4 my-4 w-full items-center flex-col md:flex-row justify-center">
        <MonthCombined sales1C={sales1C.sales1CMonth} excelData={excelSalesReportMonth} idcomponent="monthStatsComb" title="Месячная статистика" spisanie={spisanie.spisanieMonth} leads={leads.leadsMonth} deals={deals.dealsMonth} kkm={kkm.kkmMonth} products1C={products1C.products1CMonth} />
      </div> */}
      <div className="flex gap-4 my-4 w-full items-center flex-col md:flex-row justify-center">
        <WeaklyStatistics title="Годовая статистика" />
        <OverallRevenueChart />
      </div> 
    </div>
  );
};

export default Finance;