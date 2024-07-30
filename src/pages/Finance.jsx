import React, { useEffect } from 'react';
import { DropDownListComponent } from '@syncfusion/ej2-react-dropdowns';
import { dropdownData } from '../data/ecomData';
import { useStateContext } from '../contexts/ContextProvider';
import { MonthStatistics, PaidToAmountCheck, KassaKKMPie, PaidToAmount, MonthlyRevenueChart, OverallRevenueChart, RevenueByWeekStacked, WeekRevenueStats, DailyRevenue, WeaklyRevenueOverviewStacked, TotalRevenuePie, WeaklyStatistics, TotalRevenueChart } from '../components/Finance';

// const DropDown = ({ currentMode }) => (
//   <div className="w-28 border-1 border-color px-2 py-1 rounded-md">
//     <DropDownListComponent id="time" fields={{ text: 'Time', value: 'Id' }} style={{ border: 'none', color: (currentMode === 'Dark') && 'white' }} value="1" dataSource={dropdownData} popupHeight="220px" popupWidth="120px" />
//   </div>
// );

const Finance = ({dayFinanceData, weekFinanceData, monthFinanceData, sales1C}) => {
  const { currentColor, currentMode, setActiveMenu } = useStateContext();
  return (
    <div className="mt-12 flex flex-col justify-center align-center gap-8">
      <div className="flex mt-5 w-[100%] align-center gap-4 flex-wrap md:flex-row justify-center">
        <DailyRevenue dayFinanceData={dayFinanceData} />
        <div className=' flex justify-center align-center flex-col w-[100%] md:w-[30%]'>
          <WeaklyRevenueOverviewStacked weekFinanceData={weekFinanceData} />
          <TotalRevenuePie />
        </div>
      </div>
      <div className="flex flex-wrap lg:flex-nowrap gap-5 justify-center ">
          <RevenueByWeekStacked weekFinanceData={weekFinanceData} />
          <WeekRevenueStats weekFinanceData={weekFinanceData} />
      </div>
      <div className="flex gap-4 w-full items-center flex-col md:flex-row justify-center">
        <PaidToAmount id="PaidToWeek" sales1C={sales1C.sales1CWeek} title="Остаток за неделю"  />
        <KassaKKMPie id="KKMWeek" sales1C={sales1C.sales1CWeek} title="Фискальный регистратор (неделя)" />
      </div>
      <div className="flex gap-4 my-4 w-full items-center flex-col md:flex-row justify-center">
          <MonthStatistics monthFinanceData={monthFinanceData} />
          <MonthlyRevenueChart monthFinanceData={monthFinanceData} />
      </div>
      <div className="flex gap-4 w-full items-center flex-col md:flex-row justify-center">
        <PaidToAmount id="PaidToMonth" sales1C={sales1C.sales1CDay} title="Остаток за день"  />
        <KassaKKMPie id="KKMMonth" sales1C={sales1C.sales1CMonth} title="Фискальный регистратор (месяц)"  />
      </div>
      <div className="flex gap-4 my-4 w-full items-center flex-col md:flex-row justify-center">
        <WeaklyStatistics weekFinanceData={weekFinanceData} title="Годовая статистика" />
        <OverallRevenueChart />
      </div>
    </div>
  );
};

export default Finance;
