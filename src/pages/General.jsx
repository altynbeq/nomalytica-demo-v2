import React, { useEffect } from 'react';

import { useStateContext } from '../contexts/ContextProvider';

import { FirstRowStats, SalesDouble, MonthlyRevenueBars, SecondRowPie, ThirdRowTransList, ThirdRowLineChart, LastRowWeaklyStats, LastRowSecondComp, LastRowThirdComp } from '../components/General';
import { ContainerWrapper } from '../components';
import LoadingSkeleton from '../components/LoadingSkeleton'

import { WeeklyStats, ProductsStats, WeaklyTotalSalesChart } from '../components/Sales'
import { SpisanieStats } from '../components/Sklad';
import { getDataSpisanie } from '../hoc/shareData';
import { PaidToAmount, KassaKKMPie, RevenueByWeekStacked } from '../components/Finance'
import { WeekStats } from '../components/General'




const General = ({leads, sales1C, kkm, products1C, deals, spisanie, weekSalesSeries}) => {
  const { skeletonUp, currentColor, currentMode, setActiveMenu } = useStateContext();
  const dataSpisanie = getDataSpisanie();
  useEffect(()=> {
    window.scrollTo(0, 0);
  }, [])

  if(skeletonUp){
    return(
      <div className='flex m-10 flex-col gap-6 justify-evenly align-center text-center w-[100%]'>
        <LoadingSkeleton />
        <LoadingSkeleton />
        <LoadingSkeleton />
      </div>
    )
  }
  return ( 
    <div className="mt-12 flex flex-col gap-6  justify-center">
      <div className="flex mt-5  w-[100%] flex-wrap  justify-center align-top xs:flex-col  md:mx-3  gap-[0.5rem] items-center">
        <WeekStats products1C={products1C.products1CDay} spisanie={spisanie.spisanieDay} sales1C={sales1C.sales1CDay} kkm={kkm.kkmDay} leads={leads.leadsDay} deals={deals.dealsDay} idcomp="weekStats" title="Дневная статистика"  />
        <SpisanieStats rawSpisanie={dataSpisanie.readyDayData} idcomponent="spisanieDay" title="Списания за день" spisanie={spisanie.spisanieDay} />
        <ProductsStats products1C={products1C.products1CDay}  idcomp="weekStatis" title="Товарная статистика" />
      </div>
      <div className="flex gap-4 w-full items-center flex-col md:flex-row justify-center">
        <PaidToAmount id="PaidToWeek" sales1C={sales1C.sales1CYesterday} kkm={kkm.kkmDay} title="Выручка за вчера"  />
        <KassaKKMPie id="KKMWeek" sales1C={sales1C.sales1CYesterday} title="Фискальный регистратор (вчера)" />
      </div>
      <div className="flex gap-4 w-full items-center flex-col md:flex-row justify-center">
        <RevenueByWeekStacked  sales1C={sales1C.sales1CWeek} width="[43%]" />
        <WeaklyTotalSalesChart sales1C={weekSalesSeries} title="Продажи за неделю" />
      </div>
      {/* <div className='flex md:mx-3 flex-wrap align-center justify-center gap-[1.5rem] items-center'> 
        <FirstRowStats />
      </div>
      <div className="flex mt-5 w-[100%] align-center gap-4 flex-wrap md:flex-row justify-center">
        <SalesDouble />
        <div className=' flex justify-center align-center flex-col w-[100%] md:w-[30%]'>
          <MonthlyRevenueBars />
          <SecondRowPie />
        </div>
      </div>

      <div className="flex w-[100%] gap-4 my-4 items-center flex-col md:flex-row justify-center">
        <ThirdRowTransList />
        <ThirdRowLineChart />
      </div>

      <div className="flex flex-col align-center md:flex-row w-[100%]  justify-center">
        <LastRowWeaklyStats />
        <LastRowSecondComp />
        <LastRowThirdComp />
      </div>  */} 
    </div>
  );
};
 
export default General;



// return (
//   <div className="mt-12 ">
//     <div className='flex md:mx-3  flex-wrap justify-center gap-[1.5rem] items-center'>
//       <FirstRowStats />
//     </div>
//     <div className="flex gap-1.5 flex-col md:flex-row  justify-center">
//       <SalesDouble />
//       <div className=' flex justify-center align-center flex-col  w-[100%] md:w-[35%]'>
//         <MonthlyRevenueBars />
//         <SecondRowPie />
//       </div>
//     </div>

//     <div className="flex w-[100%] gap-6 m-4 flex-col md:flex-row justify-center">
//       <ThirdRowTransList />
//       <ThirdRowLineChart />
//     </div>

//     <div className="flex flex-col align-center md:flex-row w-[100%]  justify-center">
//       <LastRowWeaklyStats />
//       <LastRowSecondComp />
//       <LastRowThirdComp />
//     </div>
//   </div>
// );