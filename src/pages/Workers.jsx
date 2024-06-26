import React from 'react'
import { floristList, cusSupportList, tasksList } from '../data/workersData';
import { floristsStats, callCenterStats } from '../data/workersData';

import { WorkersList, Tasks, WorkerStats } from '../components/Workers';

const Workers = () => {

  return (
    <div className='mt-12 flex flex-col justify-center align-center'>
      <div className="flex flex-wrap lg:flex-nowrap justify-center flex-col p-10">
        <div className="flex flex-wrap lg:flex-nowrap gap-5 justify-center ">
          <WorkersList data={floristList} title="Список флористов" />
          <WorkersList data={cusSupportList} title="Список консультантов" />
          <Tasks data={tasksList} title="Список задач" />
        </div>
        <div className="flex flex-wrap  gap-5 justify-center w-full">
          <WorkerStats workersList={floristsStats} mainTitle="Показатели флористов" />
          <WorkerStats workersList={callCenterStats} mainTitle="Показатели call center" />
        </div>
      </div>
    </div>
  )
}

export default Workers