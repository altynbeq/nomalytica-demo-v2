import React, { useState } from 'react'

import { Stacked } from '../../components';
import { Skeleton } from '@mui/material';
import { useStateContext } from '../../contexts/ContextProvider';
import { Dropdown } from 'primereact/dropdown';
import { getSalesReceiptsFront } from '../../methods/salesReceipts/getSalesReceiptsFront'

function convertMonthToDateRange(monthName, year) {
  const monthIndex = new Date(`${monthName} 1, ${year}`).getMonth(); // Get the month index (0-based)
  const startDate = new Date(year, monthIndex, 1, 0, 0, 0); // Start of the month
  const endDate = new Date(year, monthIndex + 1, 0, 23, 59, 59); // End of the month

  const formatDate = (date) => {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      const hours = String(date.getHours()).padStart(2, '0');
      const minutes = String(date.getMinutes()).padStart(2, '0');
      const seconds = String(date.getSeconds()).padStart(2, '0');

      return `${year}-${month}-${day}%20${hours}:${minutes}:${seconds}`;
  };

  return {
      startDate: formatDate(startDate),
      endDate: formatDate(endDate)
  };
}

const MonthlyRevenueChart = ({sales1C}) => {
    const { dateRanges } = useStateContext();
    const [ selectedMonth, setSelectedMonth ] = useState('September');
    const [ salesSeries, setSalesSeries ] = useState(sales1C.salesSumSeries);

    const cities = [  "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    let  maxSeriesVal = salesSeries.reduce((acc, item) => {
        return Math.max(acc, item.y);
    }, 0);

    let  minSeriesVal = salesSeries.reduce((acc, item) => {
        if (item.y !== 0 || acc === Infinity) {
          return Math.min(acc, item.y);
        }
        return acc;
    }, Infinity);

    let  finalMinSeriesVal = minSeriesVal === Infinity ? 0 : minSeriesVal / 2;
    const range = maxSeriesVal - finalMinSeriesVal;
    let interval;
    if (range <= 10) {
      interval = 1;
    } else if (range <= 100) {
      interval = 10;
    } else if (range <= 1000) {
      interval = 100;
    } else if (range <= 10000) {
      interval = 1000;
    } else if (range <= 100000) {
      interval = 50000;
    } else {
      interval = 100000;
    }
    let stackedCustomSeriesYearly = [
        {
          dataSource: salesSeries,
          xName: 'x',
          yName: 'y',
          name: 'Продажи',
          type: 'StackingColumn',
          background: 'blue',
        },
    ];
    let stackedPrimaryXAxisYearly = {
      lineStyle: { width: 0 },
      minimum: minSeriesVal > 0 ? minSeriesVal / 2 : 0,
      // data.minAmountSeries > 0 ? data.minAmountSeries : 10,
      maximum: maxSeriesVal > 0 ? maxSeriesVal * 1.3 : 10,
      // data.maxAmountSeries > 0 ? data.maxAmountSeries * 1.1 : 100,
      interval: interval ,
      // data.maxAmountSeries > 0 ? 50000 : 100,
      majorTickLines: { width: 0 },
      majorGridLines: { width: 1 },
      minorGridLines: { width: 1 },
      minorTickLines: { width: 0 },
      labelFormat: '{value}',
    };
    let stackedPrimaryYAxisYearly = {
        majorGridLines: { width: 0 },
        minorGridLines: { width: 0 },
        majorTickLines: { width: 0 },
        minorTickLines: { width: 0 },
        interval: 1,
        lineStyle: { width: 0 },
        labelIntersectAction: 'Rotate45',
        valueType: 'Category',
    };
    const handleMonthChange = async (e) => {
      setSelectedMonth(e);
      const date = convertMonthToDateRange(e, 2024);
      const data = await getSalesReceiptsFront(date);
      setSalesSeries(data.salesSumSeries);
    }

    if(!salesSeries){
      return <Skeleton />
    }
    return (
        <div className="bg-white dark:text-gray-200 dark:bg-secondary-dark-bg p-6 rounded-2xl  w-[90%] md:w-[50%] subtle-border">
            <div className="flex justify-between items-center gap-2 mb-10">
            <p className="text-xl font-semibold">Продажи за месяц</p>
            <div className="flex items-center gap-4">
              <Dropdown value={selectedMonth} onChange={(e) => handleMonthChange(e.value)} options={cities} optionLabel="name"
                placeholder="Выберите месяц" className="w-full md:w-14rem" />
            </div>
            </div>
            <div className="w-[100%]">
                <Stacked id="MonthlyRevenueChart" stackedCustomSeries={stackedCustomSeriesYearly} stackedPrimaryXAxis={stackedPrimaryYAxisYearly} stackedPrimaryYAxis={stackedPrimaryXAxisYearly}    />
            </div>
        </div>
    );
}

export default MonthlyRevenueChart