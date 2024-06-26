import React from 'react'
import { GoPrimitiveDot } from 'react-icons/go';
import { Stacked } from '../../components';
import { stackedCustomSeriesYearly, stackedPrimaryYAxisYearly, stackedPrimaryXAxisYearly } from '../../data/salesData';

const MonthlyRevenueChart = (monthFinanceData) => {
    const data = monthFinanceData.monthFinanceData;

    
    const stackedCustomSeriesYearly = [
        { 
          dataSource: data.series,
          xName: 'x',
          yName: 'y',
          name: 'Продажи',
          type: 'StackingColumn',
          background: 'blue',
        },
    ];

    const stackedPrimaryXAxisYearly = {
        lineStyle: { width: 0 },
        minimum: data.minAmountSeries,
        maximum: data.maxAmountSeries * 1.1,
        interval: 50000,
        majorTickLines: { width: 0 },
        majorGridLines: { width: 1 },
        minorGridLines: { width: 1 },
        minorTickLines: { width: 0 },
        labelFormat: '{value}',
    };
    
    const stackedPrimaryYAxisYearly = {
        majorGridLines: { width: 0 },
        minorGridLines: { width: 0 },
        majorTickLines: { width: 0 },
        minorTickLines: { width: 0 },
        interval: 1,
        lineStyle: { width: 0 },
        labelIntersectAction: 'Rotate45',
        valueType: 'Category',
    };

    return (
        <div className="bg-white dark:text-gray-200 dark:bg-secondary-dark-bg p-6 rounded-2xl mr-10 w-[90%] md:w-[50%]">
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