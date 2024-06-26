import React, { useEffect } from 'react';

import { useStateContext } from '../contexts/ContextProvider';

import { FirstRowStats, SalesDouble, MonthlyRevenueBars, SecondRowPie, ThirdRowTransList, ThirdRowLineChart, LastRowWeaklyStats, LastRowSecondComp, LastRowThirdComp } from '../components/General';

const General = () => {
  const { currentColor, currentMode, setActiveMenu } = useStateContext();

  useEffect(()=> {
    setActiveMenu(false);
  },[])

  return (
    <div className="mt-12">
      <div className='flex md:mx-3  flex-wrap justify-center gap-[1.5rem] items-center'>
        <FirstRowStats />
      </div>
      <div className="flex   gap-4 flex-col md:flex-row  justify-center">
        <SalesDouble />
        <div className=' flex justify-center align-center flex-col  w-[100%] md:w-[35%]'>
          <MonthlyRevenueBars />
          <SecondRowPie />
        </div>
      </div>

      <div className="flex w-[100%] gap-6 m-4 flex-col md:flex-row justify-center">
        <ThirdRowTransList />
        <ThirdRowLineChart />
      </div>

      <div className="flex flex-col align-center md:flex-row w-[100%]  justify-center">
        <LastRowWeaklyStats />
        <LastRowSecondComp />
        <LastRowThirdComp />
      </div>
    </div>
  );
};

export default General;
