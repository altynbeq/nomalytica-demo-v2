import React from 'react';

import { useStateContext } from '../contexts/ContextProvider';

import { FirstRowStats, SalesDouble, MonthlyRevenueBars, SecondRowPie, ThirdRowTransList, ThirdRowLineChart, LastRowWeaklyStats, LastRowSecondComp, LastRowThirdComp } from '../components/General';

const General = () => {
  const { currentColor, currentMode } = useStateContext();

  return (
    <div className="mt-12">
      <FirstRowStats />

      <div className="flex gap-4 flex-wrap justify-center">
        <SalesDouble />
        <div className='flex xs:flex-row flex-col w-[380px]'>
          <MonthlyRevenueBars />
          <SecondRowPie />
        </div>
      </div>

      <div className="flex gap-10 m-4 flex-wrap justify-center">
        <ThirdRowTransList />
        <ThirdRowLineChart />
      </div>

      <div className="flex flex-wrap justify-center">
        <LastRowWeaklyStats />
        <LastRowSecondComp />
        <LastRowThirdComp />
      </div>
    </div>
  );
};

export default General;
