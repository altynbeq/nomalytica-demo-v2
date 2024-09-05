import React, { useEffect, useState } from 'react'
import {  SpisanieStats } from '../components/Sklad';
import { Orders } from '../pages';
import { useStateContext } from '../contexts/ContextProvider';
import LoadingSkeleton from '../components/LoadingSkeleton'
import { getDataSpisanie } from '../hoc/shareData';
import { SpisanieMonthChart } from '../components/Sklad'
import { ordersData } from '../data/ordersData';
import { ProductsStats } from '../components/Sales'

import { Calendar } from 'primereact/calendar';
        

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
    <div className="mt-12 flex flex-col justify-center w-[100%]  md:w-[90%] align-center gap-8">
      <div className="flex mt-5  flex-wrap xs:flex-col w-[100%]  gap-2 justify-center ">
        <ProductsStats spisanie={spisanie.spisanieMonth} products1C={products1C.products1CMonth} isOnSkald={true} idcomp="weekStatis" title="Товарная статистика" />
        <SpisanieMonthChart spisanie={spisanie.spisanieMonth} title="Списания за месяц" />
      </div>
      <div className="w-[100%] flex justify-center align-center mr-5">
        <div className="w-[90%] lg:w-[80%] mt-10 bg-white rounded-3xl">
          <Orders ordersData={products1C.products1CWeek.itemName} rawSpisanie={dataSpisanie.readyWeekData} spisanie={spisanie.spisanieWeek} defVal={false} title="Продано товаров" width="[100%]" />
        </div>
      </div>
      <div className="flex flex-col  md:flex-row gap-2 justify-center align-center  items-center">
        <SpisanieStats width="35%" rawSpisanie={dataSpisanie.readyDayData} idcomponent="spisanieDay" title="Списания за день" spisanie={spisanie.spisanieDay} />
        <SpisanieStats width="40%" rawSpisanie={dataSpisanie.readyWeekData} idcomponent="spisanieWeek" title="Списания за неделю" spisanie={spisanie.spisanieWeek} />
        <SpisanieStats width="40%" rawSpisanie={dataSpisanie.readyMonthData} idcomponent="spisanieMonth" title="Списания за месяц" spisanie={spisanie.spisanieMonth} />
      </div>
      <div className="w-[100%] flex justify-center align-center mr-5">
        <div className="w-[90%] lg:w-[80%] mt-10 bg-white rounded-3xl">
          <Orders ordersData={ordersData} defVal={true} title="Список заказов" width="[100%]" />
        </div>
      </div>
    </div>
  );
}

export default Sklad;
