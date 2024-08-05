import React,{ useState, useEffect } from 'react'
import { GoPrimitiveDot } from 'react-icons/go';
import { Button, Pie } from '../../components';
import { Skeleton } from '../../components';
import { useStateContext } from '../../contexts/ContextProvider';

const DailyRevenue = ({dayFinanceData, sales1C, kkm, }) => {
  const [ pieSeries, setSeries ] = useState([]);
  const [ ready, setReady ] = useState(false);

  const { currentColor, currentMode } = useStateContext();

  const data = dayFinanceData;
  const totalSum = new Intl.NumberFormat('en-US').format(kkm.totalSum);
  const numberOfItemsSold = Object.keys(kkm.itemsSold).length > 0 ? Object.keys(kkm.itemsSold).length : 0;
  const avgCheck = numberOfItemsSold > 0 ? new Intl.NumberFormat('en-US').format(Math.round(kkm.totalSum/numberOfItemsSold)) : 0;

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
    <div className="bg-white dark:text-gray-200 dark:bg-secondary-dark-bg my-3 p-4 justify-center align-center w-[90%] md:w-[55%]  rounded-2xl subtle-border">
          <div className="flex justify-between">
            <p className="font-semibold text-xl">Доходы за день1</p>
            <div className="flex items-center gap-4">
              <p className="flex items-center gap-2 text-green-400 hover:drop-shadow-xl">
                <span>
                  <GoPrimitiveDot />
                </span>
                <span>24 Мая 2024</span>
              </p>
            </div>
          </div>
          
          <div className="mt-10 flex gap-4 flex-col md:flex-row w-[100%] justify-center">

            <div className="w-[40%] md:border-r-1 border-color m-4 md:pr-10">
              
              <div>
                <div className='flex justify-center flex-col text-center'>
                    <p>
                        <span className="text-2xl font-semibold">{totalSum} тг</span>
                        <span className="p-1.5 hover:drop-shadow-xl cursor-pointer rounded-full text-white bg-green-400 ml-3 text-xs">
                            23%
                        </span>
                    </p>
                    <p className="text-gray-500 mt-1">Прибыль</p>
                </div>
              </div>
              <div className="mt-8 gap-7 flex flex-row justify-between">
                <div className='flex justify-center flex-col text-center'>
                    <p className="text-2xl font-semibold">{sales1C.totalNumberSales}</p>
                    <p className="text-gray-500 mt-1">Покупок</p>
                </div>
                <div className='flex justify-center flex-col text-center'>
                    <p className="text-2xl font-semibold">?</p>
                    <p className="text-gray-500 mt-1">Скидок</p>
                </div>
                <div className='flex justify-center flex-col text-center'>
                    <p className="text-2xl font-semibold">?</p>
                    <p className="text-gray-500 mt-1">Cписание</p>
                </div>
              </div>
              <div className="mt-8">
                <div>
                    <div className='flex justify-center flex-col text-center'>
                        <p>
                            <span className="text-2xl font-semibold">{avgCheck} тг</span>
                            <span className="p-1.5 hover:drop-shadow-xl cursor-pointer rounded-full text-white bg-red-400 ml-3 text-xs">
                                7%
                            </span>
                        </p>
                    <p className="text-gray-500 mt-1">Средний чек</p>
                    </div>
                </div>
              </div>
              <div className="mt-8 flex justify-center">
                <Button
                  color="white"
                  bgColor={currentColor}
                  text="Скачать отчет"
                  borderRadius="10px"
                />
              </div>
            </div>

            <div className='w-[60%] flex text-center flex-col align-center justify-center'> 
                <h2>Способы оплат</h2>
                  <Pie id="pie-money-flow" data={pieSeries} legendVisiblity={true} height="200px"  />
            </div>
          </div>
        </div>
  )
}

export default DailyRevenue