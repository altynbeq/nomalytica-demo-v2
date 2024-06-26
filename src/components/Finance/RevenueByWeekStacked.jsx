import React from "react";
import { Stacked } from '..';
import { GoPrimitiveDot } from 'react-icons/go';

const RevenueByWeekStacked = (weekFinanceData) => {
  const data = weekFinanceData.weekFinanceData;

  const stackedCustomSeries = [
    { 
      dataSource: data.series,
      xName: 'x',
      yName: 'y',
      name: 'Продажи',
      type: 'StackingColumn',
      background: 'blue',
    },
  ];
  const stackedPrimaryXAxis = {
    majorGridLines: { width: 0 },
    minorGridLines: { width: 0 },
    majorTickLines: { width: 0 },
    minorTickLines: { width: 0 },
    interval: 1,
    lineStyle: { width: 0 },
    labelIntersectAction: 'Rotate45',
    valueType: 'Category',
  };

  const stackedPrimaryYAxis = {
    lineStyle: { width: 0 },
    minimum: 40000,
    maximum: 600000,
    interval: 100000,
    majorTickLines: { width: 0 },
    majorGridLines: { width: 1 },
    minorGridLines: { width: 1 },
    minorTickLines: { width: 0 },
    labelFormat: '{value}',
  };

  return (
    <div className="bg-white dark:text-gray-200 dark:bg-secondary-dark-bg p-6 rounded-2xl w-[100%] md:w-[50%]">
      <div className="flex justify-between items-center gap-2 mb-10">
          <p className="text-xl font-semibold">Доход за V7</p>
          <div className="flex items-center gap-4">
              <p className="flex items-center gap-2 text-green-400 hover:drop-shadow-xl">
              <span>
                  <GoPrimitiveDot />
              </span>
              <span>13-19 Мая 2024</span>
              </p>
          </div>
        </div>
        <div className="md:w-full overflow-auto">
            <Stacked id="stackedTotalRevenue" stackedCustomSeries={stackedCustomSeries} stackedPrimaryXAxis={stackedPrimaryXAxis} stackedPrimaryYAxis={stackedPrimaryYAxis}  />
        </div>
    </div>
  )
}

export default RevenueByWeekStacked