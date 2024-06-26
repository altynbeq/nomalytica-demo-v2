import React from 'react';
import { useStateContext  } from '../../contexts/ContextProvider';
import { weakylRevenue } from '../../data/financeData';
import { SparkLine } from '../../components';

const WeaklyRevenueOverviewStacked = () => {
    const { currentColor, currentMode } = useStateContext();

    return (
        <div className=" rounded-2xl md:w-400 p-4 m-3" style={{ backgroundColor: currentColor }} >
            <div className="flex justify-between items-center ">
                <p className="font-semibold text-white text-2xl">Заработок</p>
                <div>
                <p className="text-2xl text-white font-semibold mt-8">863,448</p>
                <p className="text-gray-200">Недельный заработок</p>
                </div>
            </div>
            <div className="mt-4">
                <SparkLine currentColor={currentColor} id="column-sparkLine" height="100px" type="Column" data={weakylRevenue} width="320" color="rgb(242, 252, 253)" />
            </div>
        </div>
    );
}

export default WeaklyRevenueOverviewStacked