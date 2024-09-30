import React, { useEffect, useState } from 'react';
import { useStateContext  } from '../../contexts/ContextProvider';
import { SparkLine } from '../../components';
import { Skeleton } from '@mui/material';
import BarChartRe from '../ReCharts/BarCharts';

const WeaklyRevenueOverviewStacked = ({deals}) => {
    const { dateRanges, currentColor, currentMode } = useStateContext();
    return (
        <div className="rounded-2xl  p-2 mx-3" style={{ backgroundColor: currentColor }}>
            <div className="flex flex-col md:flex-row justify-between items-center">
                <p className="font-semibold text-white text-2xl">Средний чек</p>

                <div className="mt-4 md:mt-0 text-center md:text-right">
                <p className="text-2xl text-white font-semibold">{deals.avgCheck > 0 ? deals.avgCheck : 0} тг</p>
                <p className="text-gray-200">За нелелю</p>
                </div>
            </div>

            <div className="mt-4 h-[100px]">
                <BarChartRe />
                {/* <SparkLine
                currentColor={currentColor}
                id="column-sparkLine-two"
                height="100px"
                type="Column"
                width="inherit"
                data={deals.avgCheckSeries}
                color="rgb(242, 252, 253)"
                /> */}
            </div>
        </div>
    );
}

export default WeaklyRevenueOverviewStacked