import React, { useState } from 'react'
import { Stacked } from '../../components';
import { useStateContext } from '../../contexts/ContextProvider';
import { Calendar } from 'primereact/calendar';
import { getKKMReceiptsFront } from '../../methods/kkmReceipts/getKKMReceiptsFront'

function formatDates(dates) {
  const formatDate = (date) => {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
      const day = String(date.getDate()).padStart(2, '0');
      const hours = String(date.getHours()).padStart(2, '0');
      const minutes = String(date.getMinutes()).padStart(2, '0');
      const seconds = String(date.getSeconds()).padStart(2, '0');

      return `${year}-${month}-${day}%20${hours}:${minutes}:${seconds}`;
  };

  return {
      startDate: formatDate(dates[0]),
      endDate: formatDate(dates[1])
  };
}

const WeaklyTotalSalesChart = ({sales1C, title}) => {
  const { dateRanges } = useStateContext();
  const [dates, setDates] = useState([new Date(dateRanges[1].startDate.replace('%20', ' ')), new Date(dateRanges[1].endDate.replace('%20', ' '))]);
  const list = sales1C.salesSeries ? sales1C.salesSeries : sales1C.series;
  const [ salesSeries, setSalesSeries ] = useState(sales1C.salesSeries ? sales1C.salesSeries : sales1C.series);

  if(!salesSeries){
    return(
      <></>
    )
  }
  const maxSeriesVal = salesSeries.reduce((acc, item) => {
    return Math.max(acc, item.y);
  }, 0);
  
  const minSeriesVal = salesSeries.reduce((acc, item) => {
    if (item.y !== 0 || acc === Infinity) {
      return Math.min(acc, item.y);
    }
    return acc;
  }, Infinity);
  
  const finalMinSeriesVal = minSeriesVal === Infinity ? 0 : minSeriesVal;

  const range = maxSeriesVal - finalMinSeriesVal;

  let interval;
  if (range <= 10) {
    interval = 5;
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
      dataSource: salesSeries,
      xName: 'x',
      yName: 'y',
      name: 'Продажи',
      type: 'StackingColumn',
      background: 'blue',
    },
  ];
  
  let stackedPrimaryYAxis = {
    lineStyle: { width: 0 },
    minimum: Math.round(finalMinSeriesVal / 2),
    maximum: Math.round(maxSeriesVal > 0 ? maxSeriesVal * 1.5 : 10),
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

  const handleDateChange = async (e) => {
    if(e[1]){
      const date = formatDates(e);
      const data = await getKKMReceiptsFront(date);
      setSalesSeries(data.salesSeries);
    }
  }

  return (
    <div className="bg-white dark:text-gray-200 dark:bg-secondary-dark-bg p-6 md:w-[43%] w-[90%] rounded-2xl subtle-border">
        <div className="flex justify-between items-center gap-2 mb-10">
          <p className="md:text-xl font-semibold">{title}</p>
          <div className="flex items-center gap-4">
              <Calendar value={dates} onChange={(e) => {
                  handleDateChange(e.value)
                  setDates(e.value)
                }} selectionMode="range" readOnlyInput hideOnRangeSelection />
          </div>
        </div>
          
        <Stacked stackedCustomSeries={stackedCustomSeries} stackedPrimaryXAxis={stackedPrimaryXAxis} stackedPrimaryYAxis={stackedPrimaryYAxis}  />
    </div>
  )
}

export default WeaklyTotalSalesChart