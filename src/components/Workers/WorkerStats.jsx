import React from 'react'
import { Pie } from '../';


const WorkerStats = ({workersList, mainTitle}) => {
  return (
    <div className='flex flex-col z-1 mt-10 gap-5 justify-center bg-white dark:text-gray-200 dark:bg-secondary-dark-bg rounded-2xl  '>
        <h2 className='flex justify-center mt-5 text-2xl xs:text-base'>{mainTitle}</h2>
        <div className="flex flex-row justify-center bg-white dark:text-gray-200 dark:bg-secondary-dark-bg mx-3 p-4 rounded-2xl flex-wrap ">
        {
                workersList.map((worker) => (
                    <div className='flex z-1 justify-center flex-col align-center'>
                        <Pie title={worker.name} data={worker.tasksStats} legendVisiblity="false" height="250px" width="250px" />
                        <div className='flex flex-col align-center gap-2 text-center justify-center text-1xl'>
                            <p className={`${worker.itemsSold < 100 ? 'text-red-400' : 'text-green-400'}`}>Продано товаров: {worker.itemsSold}</p>
                            <p className={`${worker.avgCheck < 12000 ? 'text-red-400' : 'text-green-400'}`}>Средний чек: {worker.avgCheck}</p>
                            <p className={`${worker.conversion < 30 ? 'text-red-400' : 'text-green-400'}`}>Конверсия: {worker.conversion}% </p>
                        </div>
                    </div>
                ))
        }
        </div>
    </div>
    
  )
}

export default WorkerStats
