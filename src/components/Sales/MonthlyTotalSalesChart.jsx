import React from 'react'
import { GoPrimitiveDot } from 'react-icons/go';
import { Stacked } from '../../components';
import { stackedCustomSeriesMonthly, stackedPrimaryXAxis, stackedPrimaryYAxis } from '../../data/salesData';


const MonthlyTotalSalesChart = ({monthFinanceData}) => {
  
  const stackedCustomSeriesMonthly = [
    { 
      dataSource: monthFinanceData.salesSeries,
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
    minimum: monthFinanceData.minSalesSeries,
    maximum: monthFinanceData.maxSalesSeries * 1.2,
    interval: 2,
    majorTickLines: { width: 0 },
    majorGridLines: { width: 1 },
    minorGridLines: { width: 1 },
    minorTickLines: { width: 0 },
    labelFormat: '{value}',
  };

  // const stackedPrimaryYAxis = {
  //   majorGridLines: { width: 0 },
  //   minorGridLines: { width: 0 },
  //   majorTickLines: { width: 0 },
  //   minorTickLines: { width: 0 },
  //   interval: 1,
  //   lineStyle: { width: 0 },
  //   labelIntersectAction: 'Rotate45',
  //   valueType: 'Category',
  // };

  return (
    <div className="bg-white dark:text-gray-200 dark:bg-secondary-dark-bg p-6 md:w-[40%] w-[90%] rounded-2xl ">
        <div className="flex justify-between items-center gap-2 mb-10">
          <p className="md:text-xl font-semibold">Продажи за месяц</p>
          <div className="flex items-center gap-4">
              <p className="flex items-center gap-2 text-green-400 hover:drop-shadow-xl">
              <span>
                  <GoPrimitiveDot />
              </span>
              <span>Май 2024</span>
              </p>
          </div>
        </div>
        <div className="w-[100%]">
          <Stacked stackedCustomSeries={stackedCustomSeriesMonthly} stackedPrimaryXAxis={stackedPrimaryXAxis} stackedPrimaryYAxis={stackedPrimaryYAxis}  />
        </div>
    </div>
  )
}

export default MonthlyTotalSalesChart