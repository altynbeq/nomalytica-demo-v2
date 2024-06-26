import React from 'react'
import { GoPrimitiveDot } from 'react-icons/go';
import { Button, Pie } from '../../components';
import { revenueTypesData, weakylRevenue, lineCustomSeries, LinePrimaryXAxis, LinePrimaryYAxis }  from '../../data/financeData'
import { useStateContext } from '../../contexts/ContextProvider';

const formatLeadsSource = (leadsSource) => {
  const formattedData = [];
  const totalLeads = Object.values(leadsSource).reduce((sum, value) => sum + value, 0);

  if (totalLeads === 0) {
      for (const [key, value] of Object.entries(leadsSource)) {
          formattedData.push({
              x: key,
              y: value,
              text: '0.00%'
          });
      }
  } else {
      for (const [key, value] of Object.entries(leadsSource)) {
          const percentage = ((value / totalLeads) * 100).toFixed(2);
          formattedData.push({
              x: key,
              y: value,
              text: `${percentage}%`
          });
      }
  }

  return formattedData;
};

const DailySalesStats = ({dayFinanceData, dayLeadsData}) => {
  const { currentColor, currentMode } = useStateContext();
  const data = dayFinanceData;
  const leadsData = dayLeadsData;

  const conversion = data.leadsCount > 0 ? parseFloat((data.leadsCount / leadsData.leadsCount).toFixed(2)) : 0;
  const revenueTypesDataSales = formatLeadsSource(leadsData.leadsSource);

  return (
    <div className="bg-white  dark:text-gray-200 dark:bg-secondary-dark-bg p-4 rounded-2xl md:w-780  ">
          <div className="flex justify-between">
            <p className="font-semibold text-xl">Продажи за день</p>
            <div className="flex items-center gap-4">
              <p className="flex items-center gap-2 text-green-400 hover:drop-shadow-xl">
                <span>
                  <GoPrimitiveDot />
                </span>
                <span>{leadsData.date}</span>
              </p>
            </div>
          </div>
          
          <div className="mt-10 flex gap-10 flex-row w-fit justify-center">

            <div className=" border-r-1 border-color m-4 pr-10">
              
              <div className='w-[250px]'>
                <div className='flex justify-center flex-col text-center'>
                    <p>
                        <span className="text-3xl font-semibold">{data.leadsCount}</span>
                        <span className="p-1.5 hover:drop-shadow-xl cursor-pointer rounded-full text-white bg-green-400 ml-3 text-xs">
                            36% 
                        </span>
                    </p>
                    <p className="text-gray-500 mt-1">Продаж</p>
                </div>
              </div>
              <div className="mt-8 gap-7 flex flex-row justify-between">
                <div className='flex justify-center flex-col text-center'>
                    <p>
                        <span className="text-3xl font-semibold">{conversion}%</span>
                        <span className="p-1.5 hover:drop-shadow-xl cursor-pointer rounded-full text-white bg-green-400 ml-3 text-xs">
                            36% 
                        </span>
                    </p>
                    <p className="text-gray-500 mt-1">Конверсия</p>
                   
                </div>
                <div className='flex justify-center flex-col text-center'>
                    <p>
                        <span className="text-3xl font-semibold">{leadsData.leadsCount}</span>
                        <span className="p-1.5 hover:drop-shadow-xl cursor-pointer rounded-full text-white bg-red-400 ml-3 text-xs">
                            7%
                        </span>
                    </p>
                    <p className="text-gray-500 mt-1">Лиды</p>
                </div>
              </div>
              <div className="mt-8">
                <div>
                    <div className='flex justify-center flex-col text-center'>
                        <p>
                            <span className="text-3xl font-semibold">??? </span>
                            <span className="p-1.5 hover:drop-shadow-xl cursor-pointer rounded-full text-white bg-red-400 ml-3 text-xs">
                                %
                            </span>
                        </p>
                    <p className="text-gray-500 mt-1">???</p>
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

            <div>
                <div className='flex justify-center'>
                    <h2>Способы оплат</h2>
                </div>
                
              <Pie id="pie-money-flow" data={revenueTypesDataSales} legendVisiblity={false} height="280px" width="350px"/>
              <div className='flex flex-row justify-between'>
                    <p className="flex items-center gap-2 text-gray-600 hover:drop-shadow-xl">
                        <span>
                        <GoPrimitiveDot />
                        </span>
                        <span>WhatsApp</span>
                    </p>
                    <p className="flex items-center gap-2 text-cyan-600 hover:drop-shadow-xl">
                        <span>
                        <GoPrimitiveDot />
                        </span>
                        <span>Instagram</span>
                    </p>
                    <p className="flex items-center gap-2 text-blue-600 hover:drop-shadow-xl">
                        <span>
                        <GoPrimitiveDot />
                        </span>
                        <span>Другое</span>
                    </p>
              </div>
            </div>
          </div>
        </div>
  )
}

export default DailySalesStats