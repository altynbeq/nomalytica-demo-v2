import React, { useState, useEffect } from 'react'
import { GoPrimitiveDot } from 'react-icons/go';
import { Button, Pie } from '../../components';
// import { revenueTypesData, weakylRevenue, lineCustomSeries, LinePrimaryXAxis, LinePrimaryYAxis }  from '../../data/financeData'
import { useStateContext } from '../../contexts/ContextProvider';
import { Skeleton } from '@mui/material';
import ExportToExcel from '../../components/ExportToExcel';

const DailySalesStats = ({sales1C, products1C, kkm, spisanie}) => {
    const { dateRanges, currentColor, currentMode } = useStateContext();
    const date = dateRanges[0].bitrixStartDate.split(' ')[0];
    const totalSum = new Intl.NumberFormat('en-US').format(kkm.totalSum);
    const [ pieSeries, setSeries ] = useState([]);
    const [ ready, setReady ] = useState(false);
    const numberOfItemsSold = products1C.itemName ? Object.keys(products1C.itemName).length : 0;
    const avgCheck = kkm.totalSum/kkm.totalNumberSales > 0 ? new Intl.NumberFormat('en-US').format(Math.round(kkm.totalSum/kkm.totalNumberSales)) : 0;
    const itemsSold = Object.keys(kkm.itemsSold).length;
    
    useEffect(()=>{
        if (!sales1C || !sales1C.paidTo) {
          return;
        }
       
        const { paidTo } = sales1C;
        const total = sales1C.totalSum; // Assuming total is directly available in sales1C
    
        function seriesCollector() {
          const seriesData = Object.entries(paidTo).map(([key, value]) => {
            const roundedValue = Math.round(value);
            const percentage = ((value / total) * 100).toFixed(2) + '%';
            return {
              x: key,
              y: roundedValue,
              text: percentage
            };
          });
    
          setSeries(seriesData);
        }
    
        seriesCollector();
        setReady(true);
      }, [])
      
    if(!ready){ return <Skeleton /> }
    return (
        <div className="bg-white dark:text-gray-200 dark:bg-secondary-dark-bg m-3 p-4 w-[90%] md:w-[60%] justify-between rounded-2xl subtle-border">
            
            <div className="flex justify-between">
                <p className="font-semibold text-xl">Продажи за день</p>
                <div className="flex items-center gap-4">
                    <p className="flex items-center gap-2 text-green-400 hover:drop-shadow-xl">
                        <span>
                        <GoPrimitiveDot />
                        </span>
                        <span>{date}</span>
                    </p>
                </div>
            </div>

            <div className="flex w-[100%] flex-col lg:flex-row text-center   justify-center">
                <div className="w-[90%] md:w-[40%] md:border-r-1 border-color m-4 md:pr-10">
                    <div className='flex justify-center flex-col text-center'>
                        <p>
                            <span className="text-2xl font-semibold">{totalSum} тг</span>
                            <span className="p-1.5 hover:drop-shadow-xl cursor-pointer rounded-full text-white bg-green-400 ml-3 text-xs">
                                23%
                            </span>
                        </p>
                        <p className="text-gray-500 mt-1">Прибыль</p>
                    </div>
                    <div className="mt-8 gap-7 flex flex-row justify-between">
                        <div className='flex justify-center flex-col text-center'>
                            <p className="text-2xl font-semibold">{kkm.totalNumberSales}</p>
                            <p className="text-gray-500 mt-1">Покупок</p>
                        </div>
                        <div className='flex justify-center flex-col text-center'>
                            <p className="text-2xl font-semibold">{spisanie.totalAmountSpisanie}</p>
                            <p className="text-gray-500 mt-1">Cписание</p>
                        </div>
                    </div>
                    <div className="mt-8 gap-7 flex flex-row justify-center">
                        <div className='flex justify-center flex-col text-center'>
                            <p className="text-2xl font-semibold">{products1C.productsSold}</p>
                            <p className="text-gray-500 mt-1">Продано товаров</p>
                        </div>
                        <div className='flex justify-center flex-col text-center'>
                            <p className="text-2xl font-semibold">{spisanie.totalAmountSpisanie > 0 && products1C.productsSold > 0 ? Math.round((products1C.productsSold/spisanie.totalAmountSpisanie)* 100)  : 0 }%</p>
                            <p className="text-gray-500 mt-1">Cписание/Товары</p>
                        </div>
                    </div>
                    <div className="mt-8">
                        <div>
                            <div className='flex justify-center flex-col text-center'>
                                <p>
                                    <span className="text-2xl font-semibold">{avgCheck}тг</span>
                                    <span className="p-1.5 hover:drop-shadow-xl cursor-pointer rounded-full text-white bg-red-400 ml-3 text-xs">
                                        7%
                                    </span>
                                </p>
                            <p className="text-gray-500 mt-1">Средний чек</p>
                            </div>
                        </div>
                    </div>
                    <div className="mt-8 flex justify-center">
                        <ExportToExcel />
                    </div>
                </div>
                    
                <div className="w-[90%] md:w-[60%] flex text-center flex-col align-center justify-center">
                    <h2>Online/Offline</h2>
                    <Pie id="pie-money-flow" data={pieSeries} legendVisiblity={true} height="200px" color="red"  />
                </div>
            </div>
        </div>
    )
}

export default DailySalesStats