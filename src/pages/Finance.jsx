import React, { useEffect } from 'react';
import { useStateContext } from '../contexts/ContextProvider';
import { PaidToAmount, DailyRevenue, WeaklyRevenueOverviewStacked, TotalRevenuePie } from '../components/Finance';
import LoadingSkeleton from '../components/LoadingSkeleton';
import CardWithStats from '../components/demo/ChartsHolder'
import YearBarChart from '../components/demo/YearBarChart'
import PeriodStats from '../components/demo/PeriodStats';
import CarouselCard from '../components/demo/Slider';

import { FaDollarSign, FaMoneyBillAlt, FaMoneyBill, FaFilter, FaChartBar } from "react-icons/fa";

const financeStats = [
  {
      id: '1',
      icon: <FaDollarSign />,
      amount: '12 333 000 тг',
      title: 'Выручка',
      // desc: 'XX',
      iconBg: '#1d4db7',
      pcColor: 'black-600',
  },
  {
      id: '2',
      icon: <FaMoneyBill />,
      amount: '42 000тг',
      title: 'Средний чек',
      // desc: `Сотрудник ${data.bestWorker && data.bestWorker.id ? data.bestWorker.id : 'Пусто'}`,
      iconBg: '#1d4db7',
      pcColor: 'black-600',
  },
  {
      id: '3',
      icon: <FaMoneyBillAlt />,
      amount: '120',
      title: 'Продаж',
      // desc: `?`,
      iconBg: '#1d4db7',
      pcColor: 'black-600',
  },
  {
      id: '5',
      icon: <FaFilter />,
      amount: '30%',
      title: 'Конверсия',
      desc: 'Bitrix',
      iconBg: '#1d4db7',
      pcColor: 'black-600',
  },
  {
      icon: <FaChartBar />,
      amount: 21,
      title: 'Онлайн продаж',
      desc: 'Bitrix',
      iconBg: '#1d4db7',
      pcColor: 'black-600',
  },
];

const financeStatsTwo = [
  {
      id: '1',
      icon: <FaDollarSign />,
      amount: '9 333 000 тг',
      title: 'Выручка',
      // desc: 'XX',
      iconBg: '#1d4db7',
      pcColor: 'black-600',
  },
  {
      id: '2',
      icon: <FaMoneyBill />,
      amount: '33 000тг',
      title: 'Средний чек',
      // desc: `Сотрудник ${data.bestWorker && data.bestWorker.id ? data.bestWorker.id : 'Пусто'}`,
      iconBg: '#1d4db7',
      pcColor: 'black-600',
  },
  {
      id: '3',
      icon: <FaMoneyBillAlt />,
      amount: '10',
      title: 'Продаж',
      // desc: `?`,
      iconBg: '#1d4db7',
      pcColor: 'black-600',
  },
  {
      id: '5',
      icon: <FaFilter />,
      amount: '32%',
      title: 'Конверсия',
      desc: 'Bitrix',
      iconBg: '#1d4db7',
      pcColor: 'black-600',
  },
  {
      icon: <FaChartBar />,
      amount: 17,
      title: 'Онлайн продаж',
      desc: 'Bitrix',
      iconBg: '#1d4db7',
      pcColor: 'black-600',
  },
];

const financeStatsThree = [
  {
      id: '1',
      icon: <FaDollarSign />,
      amount: '19 333 000 тг',
      title: 'Выручка',
      // desc: 'XX',
      iconBg: '#1d4db7',
      pcColor: 'black-600',
  },
  {
      id: '2',
      icon: <FaMoneyBill />,
      amount: '58 400тг',
      title: 'Средний чек',
      // desc: `Сотрудник ${data.bestWorker && data.bestWorker.id ? data.bestWorker.id : 'Пусто'}`,
      iconBg: '#1d4db7',
      pcColor: 'black-600',
  },
  {
      id: '3',
      icon: <FaMoneyBillAlt />,
      amount: '74',
      title: 'Продаж',
      // desc: `?`,
      iconBg: '#1d4db7',
      pcColor: 'black-600',
  },
  {
      id: '5',
      icon: <FaFilter />,
      amount: '62%',
      title: 'Конверсия',
      desc: 'Bitrix',
      iconBg: '#1d4db7',
      pcColor: 'black-600',
  },
  {
      icon: <FaChartBar />,
      amount: 32,
      title: 'Онлайн продаж',
      desc: 'Bitrix',
      iconBg: '#1d4db7',
      pcColor: 'black-600',
  },
];

const Finance = () => {
  const { skeletonUp } = useStateContext();
  
  useEffect(()=>{
    window.scrollTo(0, 0);
  }, [])
  
  if(skeletonUp){
    return(
      <div className='flex mx-10 flex-col gap-6 justify-evenly align-center text-center w-[100%]'>
        <LoadingSkeleton />
        <LoadingSkeleton />
        <LoadingSkeleton />
      </div>
    )
  }
  return (
    <div className="mt-12 flex flex-col justify-center align-center gap-8">
      <div className="flex mt-5 w-[100%] align-center gap-4 flex-wrap md:flex-row justify-center">
        <DailyRevenue/>
        <div className=' flex justify-center gap-4 align-center flex-col w-[100%] md:w-[30%]'>
          <WeaklyRevenueOverviewStacked />
          <TotalRevenuePie />
        </div>
      </div>
      <div className="flex gap-4 w-[100%] items-center align-center flex-col md:flex-row justify-center">
          <CardWithStats />
          <PaidToAmount comb={true} id="PaidToWeek"  title="Выручка"  />
      </div>
      <div className="flex gap-4 w-[100%] items-center align-center flex-col md:flex-row justify-center">
        <PeriodStats title="Финансы" stats={financeStats} statsTwo={financeStatsTwo} statsThree={financeStatsThree} />
        <CarouselCard carousel={true} title="Доли магазинов" />
      </div>
      <div className='flex gap-8 w-[100%] items-center align-center flex-col md:flex-row justify-center'>
        <YearBarChart />
      </div>
    </div>
  );
};

export default Finance;