import React, { useEffect } from 'react';
import { DropDownListComponent } from '@syncfusion/ej2-react-dropdowns';
import { dropdownData } from '../data/ecomData';
import { useStateContext } from '../contexts/ContextProvider';
import { MonthStatistics, MonthlyRevenueChart, OverallRevenueChart, RevenueByWeekStacked, WeekRevenueStats, DailyRevenue, WeaklyRevenueOverviewStacked, TotalRevenuePie, WeaklyStatistics, TotalRevenueChart } from '../components/Finance';

// const DropDown = ({ currentMode }) => (
//   <div className="w-28 border-1 border-color px-2 py-1 rounded-md">
//     <DropDownListComponent id="time" fields={{ text: 'Time', value: 'Id' }} style={{ border: 'none', color: (currentMode === 'Dark') && 'white' }} value="1" dataSource={dropdownData} popupHeight="220px" popupWidth="120px" />
//   </div>
// );

const Finance = ({dayFinanceData, weekFinanceData, monthFinanceData}) => {
  // const { currentColor, currentMode, setActiveMenu } = useStateContext();

  // useEffect(()=> {
  //   setActiveMenu(false);
  // },[]);
 
  return (
    <div className="mt-[50px]">
      <div className="flex mt-8 md:mt-0 flex-wrap lg:flex-nowrap gap-5 justify-center ">
          <RevenueByWeekStacked 
            weekFinanceData={weekFinanceData} 
          />
          <WeekRevenueStats 
            weekFinanceData={weekFinanceData} 
          />
      </div>

      <div className="flex mt-5 w-[100%] align-center  gap-4 flex-col md:flex-row  justify-center">
          <DailyRevenue 
            dayFinanceData={dayFinanceData} 
          />
        <div className=' flex justify-center align-center flex-col  w-[100%] md:w-[30%]'>
          <WeaklyRevenueOverviewStacked weekFinanceData={weekFinanceData} />
          <TotalRevenuePie />
        </div>
      </div>

      <div className="flex gap-8 my-4 w-full items-center flex-col md:flex-row justify-center">
        <WeaklyStatistics 
          weekFinanceData={weekFinanceData} 
        />
        <OverallRevenueChart />
      </div>
      <div className="flex gap-8 my-4 w-full items-center flex-col md:flex-row justify-center">
           <MonthStatistics monthFinanceData={monthFinanceData} />
          <MonthlyRevenueChart 
            monthFinanceData={monthFinanceData} 
          />
      </div>
    </div>
  );
};

export default Finance;
