import React, { useState } from 'react'

import { Stacked } from '../../components';
import { Skeleton } from '@mui/material';
import { useStateContext } from '../../contexts/ContextProvider';
import { Dropdown } from 'primereact/dropdown';
import { getKKMReceiptsFront } from '../../methods/kkmReceipts/getKKMReceiptsFront'
import { fetchLeadsFront } from '../../methods/bitrixLeads/getLeadsFront'
import { fetchDealsFront } from '../../methods/bitrixDeals/getDealsFront'
import LineChartRe from '../../components/demo/LineChart'

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

const MonthlyTotalSalesChart = ({sales1C, title, type}) => {
  const { dateRanges } = useStateContext();
  const [ selectedMonth, setSelectedMonth ] = useState('September');
  const [ salesSeries, setSalesSeries ] = useState(sales1C.salesSeries ? sales1C.salesSeries : sales1C.series);
  const [ ready, setReady ] = useState(true);

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
    minimum: 0,
    // Math.round(finalMinSeriesVal / 2),
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
  const handleMonthChange = async (e) => {
    setSelectedMonth(e);
    if(type == 'sales'){
      const date = convertMonthToDateRange(e, 2024);
      const data = await getKKMReceiptsFront(date);
      setSalesSeries(data.salesSeries);
    } else if(type == 'leads'){
      const data = await fetchLeadsFront(e);
      setSalesSeries(data.series);
    } else if(type == 'conversion'){
      const [leads, deals] = await Promise.all([fetchLeadsFront(e), fetchDealsFront(e)]);
      let leadsSeries = leads.series;
      let dealsSeries = deals.series;

      const conversionSeriesCounter = leadsSeries.map((lead, index) => {
        const deal = dealsSeries[index];
        if (deal) {
        const conversion = lead.y !== 0 ? Math.round((deal.y / lead.y) * 100) : 0;
        return { x: lead.x, y: conversion };
        }
        return { x: lead.x, y: 0 };
      });
      setSalesSeries(conversionSeriesCounter)
    }
  }

  return (
    <div className="bg-white dark:text-gray-200 dark:bg-secondary-dark-bg p-6 md:w-[42%] w-[90%] rounded-2xl subtle-border">
        <div className="flex justify-between items-center gap-2 mb-10">
        <p className="text-xl font-semibold">{title}</p>
        <div className="flex items-center gap-4">
          <Dropdown value={selectedMonth} onChange={(e) => handleMonthChange(e.value)} options={cities} optionLabel="name"
                placeholder="Выберите месяц" className="w-full md:w-14rem" />
        </div>
        </div>
        <div className="w-[100%] h-[250px]">
          <LineChartRe />
        </div>
    </div>
  )
}

export default MonthlyTotalSalesChart