import React from 'react'
import { GoPrimitiveDot } from 'react-icons/go';
import { Stacked } from '../../components';
import { Skeleton } from '@mui/material';
import { useStateContext } from '../../contexts/ContextProvider';

const SpisanieMonthChart = ({spisanie, title}) => {
  const { dateRanges } = useStateContext();
  const date = dateRanges[2].startDate.split('%')[0].split('-')[0] + '-' + dateRanges[2].startDate.split('%')[0].split('-')[1]
  
  const list = spisanie.series;
  if(!list){
    return(
      <Skeleton />
    )
  }
  const maxSeriesVal = list.reduce((acc, item) => {
    return Math.max(acc, item.y);
  }, 0);
  
  const minSeriesVal = list.reduce((acc, item) => {
    if (item.y !== 0 || acc === Infinity) {
      return Math.min(acc, item.y);
    }
    return acc;
  }, Infinity);
  
  const finalMinSeriesVal = minSeriesVal === Infinity ? 0 : minSeriesVal;

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
    interval = 10000;
  } else if (range <= 1000000) {
    interval = 100000;
  } else {
    interval = 1000000;
  }

  let stackedCustomSeries = [
    { 
      dataSource: list,
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
  // if(sales1C.salesSeries){
  //   return <Skeleton />
  // }
  return (
    <div className="bg-white dark:text-gray-200 dark:bg-secondary-dark-bg p-6 md:w-[50%] w-[90%] rounded-2xl subtle-border">
        <div className="flex justify-between items-center gap-2 mb-10">
        <p className="text-xl font-semibold">{title}</p>
        <div className="flex items-center gap-4">
            <p className="flex items-center gap-2 text-green-400 hover:drop-shadow-xl">
            <span>
                <GoPrimitiveDot />
            </span>
            <span>{date}</span>
            </p>
        </div>
        </div>
        <div className="w-[100%]">
          <Stacked stackedCustomSeries={stackedCustomSeries} stackedPrimaryXAxis={stackedPrimaryXAxis} stackedPrimaryYAxis={stackedPrimaryYAxis}  />
        </div>
    </div>
  )
}

export default SpisanieMonthChart