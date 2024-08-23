import React, { useEffect } from 'react'
import { Header } from '../components';
import { SkladStatistivs, SkladStats, SpisanieStats } from '../components/Sklad';
import { Orders } from '../pages';
import { Button } from '../components';
import { useStateContext } from '../contexts/ContextProvider';
import LoadingSkeleton from '../components/LoadingSkeleton'
import { getDataSpisanie } from '../hoc/shareData';
import { SpisanieMonthChart } from '../components/Sklad'

const Sklad = ({spisanie, products1C}) => {
  const { skeletonUp } = useStateContext();
  const dataSpisanie = getDataSpisanie();
  useEffect(()=> {
    window.scrollTo(0, 0);
  }, []);
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
    <div className="mt-12">
      <div className="flex flex-col w-[100%] md:flex-wrap gap-2 justify-center align-top md:m-5 lg:flex-row 2xl:flex-row items-center">
        <SkladStatistivs products1C={products1C.products1CWeek} spisanie={spisanie.spisanieWeek}  />
        <SpisanieMonthChart spisanie={spisanie.spisanieMonth} title="Списания за месяц" />
        {/* <SkladStats /> */}
      </div>
      <div className="flex flex-col w-[100%] md:flex-row gap-2 justify-center align-top md:m-5 lg:flex-row 2xl:flex-row items-center">
        <SpisanieStats rawSpisanie={dataSpisanie.readyDayData} idcomponent="spisanieDay" title="Списания за день" spisanie={spisanie.spisanieDay} />
        <SpisanieStats rawSpisanie={dataSpisanie.readyWeekData} idcomponent="spisanieWeek" title="Списания за неделю" spisanie={spisanie.spisanieWeek} />
        <SpisanieStats rawSpisanie={dataSpisanie.readyMonthData} idcomponent="spisanieMonth" title="Списания за месяц" spisanie={spisanie.spisanieMonth} />
      </div>
      <div className="w-[100%] flex justify-center align-center mr-5">
        <div className="w-[90%] lg:w-[80%] mt-10 bg-white rounded-3xl">
          <Orders />
        </div>
      </div>
    </div>
  );
}

export default Sklad;
