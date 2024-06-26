import React, { useEffect } from 'react'
import { floristList, cusSupportList, tasksList } from '../data/workersData';
import { floristsStats, callCenterStats } from '../data/workersData';

import { FloristList, SupportList, Tasks, WorkerStats } from '../components/Workers';
import { useStateContext } from '../contexts/ContextProvider';
import { fetchLeads } from '../methods/getLeads';

const Workers = () => {
  const { setActiveMenu } = useStateContext();
 
  useEffect(() => {
    // fetchDeals();
    fetchLeads();
    setActiveMenu(false);
  },[]);

  return (
    <div className='mt-12 flex flex-col justify-center align-center '>
      <div className="flex flex-wrap lg:flex-nowrap justify-center flex-col p-10">
        <div className="flex flex-wrap lg:flex-nowrap gap-5 justify-center  ">
          <FloristList data={floristList} title="Список флористов" />
          <SupportList data={cusSupportList} title="Список консультантов" />
          <Tasks data={tasksList} title="Список задач" />
        </div>
        <div className="flex flex-wrap  gap-5 justify-center w-full  ">
          <WorkerStats workersList={floristsStats} mainTitle="Показатели флористов" />
          <WorkerStats workersList={callCenterStats} mainTitle="Показатели call center" />
        </div>
      </div>
    </div>
  )
}

export default Workers