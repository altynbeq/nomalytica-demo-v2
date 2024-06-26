import React from 'react'
import { GoPrimitiveDot } from 'react-icons/go';
import { Stacked } from '../../components';
import { stackedCustomSeries, stackedPrimaryXAxis, stackedPrimaryYAxis } from '../../data/salesData';


const WeaklyTotalSalesChart = ({weekFinanceData, weekLeadsData}) => {
  

  const stackedCustomSeries = [
    { 
      dataSource: weekFinanceData.salesSeries,
      xName: 'x',
      yName: 'y',
      name: 'Продажи',
      type: 'StackingColumn',
      background: 'blue',
    },
    // { dataSource: stackedChartDataWeekly[1],
    // xName: 'x',
    // yName: 'y',
    // name: 'Списание',
    // type: 'StackingColumn',
    // background: 'red',
    // },
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
    minimum: weekFinanceData.minSalesSeries > 0 ? Math.round(weekFinanceData.minSalesSeries/2) : 0,
    maximum: weekFinanceData.maxSalesSeries > 0 ? Math.round(weekFinanceData.maxSalesSeries * 1.5) : 0,
    interval: 2,
    majorTickLines: { width: 0 },
    majorGridLines: { width: 1 },
    minorGridLines: { width: 1 },
    minorTickLines: { width: 0 },
    labelFormat: '{value}',
  };

  return (
    <div className="bg-white dark:text-gray-200 dark:bg-secondary-dark-bg p-6 md:w-[40%] w-[90%] rounded-2xl ">
        <div className="flex justify-between items-center gap-2 mb-10">
          <p className="md:text-xl font-semibold">Продажи за неделю</p>
          <div className="flex items-center gap-4">
              <p className="flex md:text-xl items-center gap-2 text-green-400 hover:drop-shadow-xl">
              <span>
                  <GoPrimitiveDot />
              </span>
              <span>13-19 Мая 2024</span>
              </p>
          </div>
        </div>
          
        <Stacked stackedCustomSeries={stackedCustomSeries} stackedPrimaryXAxis={stackedPrimaryXAxis} stackedPrimaryYAxis={stackedPrimaryYAxis}  />
    </div>
  )
}

export default WeaklyTotalSalesChart