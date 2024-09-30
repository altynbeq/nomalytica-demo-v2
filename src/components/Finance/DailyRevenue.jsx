import React,{ useState, useEffect } from 'react'

import { Button, Pie } from '../../components';
import { Skeleton } from '../../components';
import { useStateContext } from '../../contexts/ContextProvider';
import  ExportToExcel  from '../ExportToExcel'
import { getKkmData } from '../../hoc/shareData';
import HolePie from '../ReCharts/HolePieChart'

const DailyRevenue = ({sales1C, kkm, products1C }) => {
  const [ pieSeries, setSeries ] = useState([]);
  const [ ready, setReady ] = useState(false);
  const excelData = getKkmData();
  const { dateRanges, currentColor, currentMode } = useStateContext();
  const date = dateRanges[0].bitrixStartDate.split(' ')[0];
  const totalSum = new Intl.NumberFormat('en-US').format(kkm.totalSum);
  const numberOfItemsSold = Object.keys(kkm.itemsSold).length > 0 ? Object.keys(kkm.itemsSold).length : 0;
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

  if(!ready){
    return <Skeleton />
  }

  return (
    <div className="bg-white dark:text-gray-200 dark:bg-secondary-dark-bg my-3 p-4 text-center justify-center align-center w-[90%] md:w-[55%]  rounded-2xl subtle-border">
          <div className="flex justify-between">
            <p className="font-semibold text-1xl">Доходы за день</p>
            <div className="flex items-center gap-4">
              <p className="flex items-center gap-2 text-green-400 hover:drop-shadow-xl">
                <span>{date}</span>
              </p>
            </div>
          </div>

          <div className="mt-5 flex gap-2 flex-col md:flex-col w-[100%] items-center text-center justify-center">

            <div className='w-[100%] h-[300px]  flex text-center flex-col align-center justify-center'>
                  <HolePie />
                  {/* <Pie id="pie-money-flow" data={pieSeries} legendVisiblity={true} height="200px"  /> */}
            </div>
            <div className=" w-[100%] py-2 border-t-1 pr-2 flex flex-row md:w-[90%] gap-8 justify-center ">
              <div className='md:flex md:flex-row'>
                <div className='flex justify-center  border-color  flex-col text-start md:mr-5'>
                    <p className="text-gray-500 mt-1">Прибыль</p>
                    <span className="text-1xl ">{totalSum} тг</span>
                </div>
                <div className='flex md:border-l-1 border-t-1 md:border-t-0 pl-2 flex-col text-start'>
                    <p className="text-gray-500 mt-1">Покупок</p>
                    <p className="text-[1rem] font-semibold">{kkm.totalNumberSales}</p>
                </div>
              </div>
              <div className='md:flex md:flex-row'>
                <div className='flex justify-center border-l-1  pl-2 flex-col text-start md:mr-5'>
                    <p className="text-gray-500 mt-1">Продано товаров</p>
                    <p className="text-1xl font-semibold">{Math.round(products1C.productsSold)}</p>
                </div>
                <div className='flex justify-center border-t-1 md:border-t-0 border-l-1  pl-2 flex-col text-start'>
                    <p className="text-gray-500 ">Средний чек</p>
                    <span className="text-1xl font-semibold">{avgCheck}</span>
                </div>
              </div>
                
              {/* <div className="mt-8 flex justify-center">
                <ExportToExcel title="Чеки ККМ за день" data={excelData.readyDayData} />
              </div> */}
            </div>
          </div>
        </div>
  )
}

export default DailyRevenue