import React, { useEffect, useState, useRef } from 'react';
import { useStateContext } from '../contexts/ContextProvider';
import { MonthStatistics, MonthCombined, PaidToAmountCheck, KassaKKMPie, PaidToAmount, MonthlyRevenueChart, OverallRevenueChart, RevenueByWeekStacked, WeekRevenueStats, DailyRevenue, WeaklyRevenueOverviewStacked, TotalRevenuePie, WeaklyStatistics, TotalRevenueChart } from '../components/Finance';
import LoadingSkeleton from '../components/LoadingSkeleton';
import { getSalesReportsData } from '../hoc/shareData';
import { StatsBlockFinance } from '../components'
import CardWithStats from '../components/demo/ChartsHolder'
import BarChartWide from '../components/ReCharts/BarChartWide';
import YearBarChart from '../components/demo/YearBarChart'

const Finance = ({sales1C, products1C, kkm, deals, leads, spisanie}) => {
  const stepperRef = useRef(null);
  const { skeletonUp , dateRanges } = useStateContext();
  const [dates, setDates] = useState([new Date(dateRanges[1].startDate.replace('%20', ' ')), new Date(dateRanges[1].endDate.replace('%20', ' '))]);
  
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
        <div className=' flex justify-center gap-4 align-center flex-col w-[100%] md:w-[30%]'>
          <WeaklyRevenueOverviewStacked deals={deals.dealsWeek} />
          <TotalRevenuePie />
        </div>
      </div>
      <div className="flex gap-4 w-[100%] items-center align-center flex-col md:flex-row justify-center">
          <CardWithStats />
          {/* <StatsBlockFinance idcomp="weekStatsFinance" cal="cal" products1C={products1C.products1CWeek} spisanie={spisanie.spisanieWeek} sales1C={sales1C.sales1CWeek} kkm={kkm.kkmWeek} leads={leads.leadsWeek} deals={deals.dealsWeek}  /> */}
          {/* <RevenueByWeekStacked  sales1C={sales1C.sales1CWeek} /> */}
          <PaidToAmount comb={true} id="PaidToWeek" sales1C={sales1C.sales1CWeek} kkm={kkm.kkmWeek} title="Выручка"  />
          {/* <div className="flex w-[100%] md:w-[40%] gap-4 flex-col justify-center align-center ml-10 md:ml-0   ">
            <PaidToAmount comb={true} id="PaidToWeek" sales1C={sales1C.sales1CWeek} kkm={kkm.kkmWeek} title="Выручка"  />
            <KassaKKMPie comb={true} id="KKMWeek" sales1C={sales1C.sales1CWeek} title="Фискальный регистратор (неделя)" />
          </div> */}
      </div>
      <div className='flex gap-8 w-[100%] items-center align-center flex-col md:flex-row justify-center'>
        <YearBarChart />
      </div>
      {/* <div className="flex gap-4 my-4 w-full items-center flex-col md:flex-row justify-center">
        <MonthCombined sales1C={sales1C.sales1CMonth} excelData={excelSalesReportMonth} idcomponent="monthStatsComb" title="Месячная статистика" spisanie={spisanie.spisanieMonth} leads={leads.leadsMonth} deals={deals.dealsMonth} kkm={kkm.kkmMonth} products1C={products1C.products1CMonth} />
      </div> */}
      {/* <div className="flex gap-4 my-4 w-full items-center flex-col md:flex-row justify-center">
        <WeaklyStatistics title="Годовая статистика" />
        <OverallRevenueChart />
      </div>  */}
    </div>
  );
};

export default Finance;