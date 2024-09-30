import React, { useEffect, useState } from 'react'

import { Stacked } from '../../components';
import { Skeleton } from '@mui/material';
import { useStateContext } from '../../contexts/ContextProvider';
import { Dropdown } from 'primereact/dropdown';
import { getSpisanie } from '../../methods/products&spisanie/getSpisanieFront';
import BarChartRe from '../demo/BarChart';

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

const SpisanieMonthChart = ({spisanie, title}) => {
  const { dateRanges } = useStateContext();
  const [ selectedMonth, setSelectedMonth ] = useState('September');
  const [ spisanieSeries, setSpisanieSeries ] = useState(spisanie.series);
  const [ ready, setReady ] = useState(false);
  const cities = [  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"];
  const date = dateRanges[2].startDate.split('%')[0].split('-')[0] + '-' + dateRanges[2].startDate.split('%')[0].split('-')[1]

  const maxSeriesVal = spisanieSeries.reduce((acc, item) => {
    return Math.max(acc, item.y);
  }, 0);

  const minSeriesVal = spisanieSeries.reduce((acc, item) => {
    if (item.y !== 0 || acc === Infinity) {
      return Math.min(acc, item.y);
    }
    return acc;
  }, Infinity);

  const finalMinSeriesVal = minSeriesVal === Infinity ? 0 : minSeriesVal;

  const range = maxSeriesVal - finalMinSeriesVal;
  const list = spisanie.series
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
    interval = 10000;
  } else if (range <= 1000000) {
    interval = 100000;
  } else {
    interval = 1000000;
  }

  let stackedCustomSeries = [
    {
      dataSource: spisanieSeries,
      xName: 'x',
      yName: 'y',
      name: 'Продажи',
      type: 'StackingColumn',
      background: 'blue',
    },
  ];
  let stackedPrimaryYAxis = {
    lineStyle: { width: 0 },
    minimum: 0,
    maximum: maxSeriesVal > 0 ? Math.round(maxSeriesVal * 1.5) : 10,
    interval: Math.round(interval),
    majorTickLines: { width: 0 },
    majorGridLines: { width: 1 },
    minorGridLines: { width: 1 },
    minorTickLines: { width: 0 },
    labelFormat: '{value}',
  };

  let stackedPrimaryXAxis = {
    majorGridLines: { width: 0 },
    minorGridLines: { width: 0 },
    majorTickLines: { width: 0 },
    minorTickLines: { width: 0 },
    interval: 1,
    lineStyle: { width: 0 },
    labelIntersectAction: 'Rotate45',
    valueType: 'Category',
  };

  // useEffect(()=> {

  // }, [])

  const handleMonthChange = async (e) => {
    const date = convertMonthToDateRange(e, 2024);
    const data = await getSpisanie(date);
    setSpisanieSeries(data.series);
    setSelectedMonth(e);
  }

  if(!spisanieSeries){
    return(
      <Skeleton />
    )
  }
  return (
    <div className="bg-white dark:text-gray-200 dark:bg-secondary-dark-bg p-6 w-[90%] md:w-[53%] rounded-2xl subtle-border">
        <div className="flex justify-between items-center gap-2 mb-10">
        <p className="text-xl font-semibold">{title}</p>
        <div className="flex items-center gap-4">
            {/* <p className="flex items-center gap-2 text-green-400 hover:drop-shadow-xl">
            <span>

            </span>
            <span>{date}</span>
            </p> */}

            <Dropdown value={selectedMonth} onChange={(e) => handleMonthChange(e.value)} options={cities} optionLabel="name"
                placeholder="Выберите месяц" className="w-full md:w-14rem" />
        </div>
        </div>
        <div className="w-[100%] h-[400px]">
          <BarChartRe />
          {/* <Stacked stackedCustomSeries={stackedCustomSeries} stackedPrimaryXAxis={stackedPrimaryXAxis} stackedPrimaryYAxis={stackedPrimaryYAxis}  /> */}
        </div>
    </div>
  )
}

export default SpisanieMonthChart