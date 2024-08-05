import React from 'react'
import { GoPrimitiveDot } from 'react-icons/go';
import { Stacked } from '../../components';
import { Skeleton } from '@mui/material';

const MonthlyRevenueChart = ({monthFinanceData, sales1C}) => {
    const data = monthFinanceData;

    let  maxSeriesVal = sales1C.salesSumSeries.reduce((acc, item) => {
        return Math.max(acc, item.y);
      }, 0);

    let  minSeriesVal = sales1C.salesSumSeries.reduce((acc, item) => {
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
            dataSource: sales1C.salesSumSeries,
            xName: 'x',
            yName: 'y',
            name: 'Продажи',
            type: 'StackingColumn',
            background: 'blue',
          },
      ];
      let stackedPrimaryXAxisYearly = {
        lineStyle: { width: 0 },
        minimum: minSeriesVal > 0 ? minSeriesVal : 0,
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

      if(!sales1C.salesSumSeries){
        return <Skeleton />
      }

    return (
        <div className="bg-white dark:text-gray-200 dark:bg-secondary-dark-bg p-6 rounded-2xl  w-[90%] md:w-[55%] subtle-border">
            <div className="flex justify-between items-center gap-2 mb-10">
            <p className="text-xl font-semibold">Продажи за месяц</p>
            <div className="flex items-center gap-4">
                <p className="flex items-center gap-2 text-green-400 hover:drop-shadow-xl">
                <span>
                    <GoPrimitiveDot />
                </span>
                <span>2024</span>
                </p>
            </div>
            </div>
            <div className="w-[100%]">
                <Stacked id="MonthlyRevenueChart" stackedCustomSeries={stackedCustomSeriesYearly} stackedPrimaryXAxis={stackedPrimaryYAxisYearly} stackedPrimaryYAxis={stackedPrimaryXAxisYearly}    />
            </div>
        </div>
    );
}

export default MonthlyRevenueChart 

// <div className="bg-white dark:text-gray-200 dark:bg-secondary-dark-bg p-6 mx-5 md:mx-0 rounded-2xl mr-10 w-[90%] md:w-[85%]">
//             <div className="flex justify-between items-center gap-2 mb-10">
//             <p className="text-xl font-semibold">Продажи за месяц</p>
//             <div className="flex items-center gap-4">
//                 <p className="flex items-center gap-2 text-green-400 hover:drop-shadow-xl">
//                 <span>
//                     <GoPrimitiveDot />
//                 </span>
//                 <span>2024</span>
//                 </p>
//             </div>
//             </div>
//                 <Stacked id="WeeklyMainRevenueChart" stackedCustomSeries={stackedCustomSeriesYearly} stackedPrimaryXAxis={stackedPrimaryXAxisYearly} stackedPrimaryYAxis={stackedPrimaryYAxisYearly}  />
//         </div>