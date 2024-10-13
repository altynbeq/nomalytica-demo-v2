import React, { useEffect } from 'react';

import { useStateContext } from '../contexts/ContextProvider';
import LoadingSkeleton from '../components/LoadingSkeleton'
import { PaidToAmount } from '../components/Finance'
import  CardWithStats  from '../components/demo/ChartsHolder'
import PeriodStats from '../components/demo/PeriodStats';
import CarouselCard from '../components/demo/Slider';
import  TableSort  from '../components/demo/TablesList';

import { FaDollarSign, FaMoneyBillAlt, FaBoxOpen, FaRegThumbsDown, FaMoneyBill, FaBox, FaFilter, FaChartBar } from "react-icons/fa";

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
      id: '4',
      icon: <FaBox />,
      amount: '600 шт',
      title: 'Списаний',
      desc: '70 товар',
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
      id: '4',
      icon: <FaBox />,
      amount: '350 шт',
      title: 'Списаний',
      desc: '70 товар',
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
      id: '4',
      icon: <FaBox />,
      amount: '650 шт',
      title: 'Списаний',
      desc: '70 товар',
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

const salesStats = [
  {
      id: '1',
      icon: <FaDollarSign />,
      amount: '3 400 000 тг',
      title: 'Топ выручка',
      desc: 'Розы',
      iconBg: '#1d4db7',
      pcColor: 'black-600',
  },
  {
      id: '2',
      icon: <FaMoneyBill />,
      amount: '344 шт',
      title: 'Топ продаж',
      desc: `Торт `,
      iconBg: '#1d4db7',
      pcColor: 'black-600',
  },
  {
      id: '3',
      icon: <FaRegThumbsDown />,
      amount: '12',
      title: 'Худший продаж',
      desc: `Шарики`,
      iconBg: '#1d4db7',
      pcColor: 'black-600',
  },
  {
      id: '4',
      icon: <FaRegThumbsDown />,
      amount: '12 400 тг',
      title: 'Худшая выручка',
      desc: 'Конфеты',
      iconBg: '#1d4db7',
      pcColor: 'black-600',
  },
  {
      id: '5',
      icon: <FaBoxOpen />,
      amount: '320',
      title: "Продано товаров",
      desc: 'Уникальных товаров',
      iconBg: '#1d4db7',
      pcColor: 'black-600',
  },
  ];

const salesStatsTwo = [
  {
    id: '1',
    icon: <FaDollarSign />,
    amount: '5 200 000 тг',
    title: 'Топ доход',
    desc: 'Лилии',
    iconBg: '#1d4db7',
    pcColor: 'black-600',
  },
  {
    id: '2',
    icon: <FaMoneyBill />,
    amount: '500 шт',
    title: 'Топ продажи',
    desc: 'Шоколад',
    iconBg: '#1d4db7',
    pcColor: 'black-600',
  },
  {
    id: '3',
    icon: <FaMoneyBillAlt />,
    amount: '6',
    title: 'Худшие продажи',
    desc: 'Мороженое',
    iconBg: '#1d4db7',
    pcColor: 'black-600',
  },
  {
    id: '4',
    icon: <FaBox />,
    amount: '9 000 тг',
    title: 'Худший доход',
    desc: 'Книги',
    iconBg: '#1d4db7',
    pcColor: 'black-600',
  },
  {
    id: '5',
    icon: <FaFilter />,
    amount: '450',
    title: 'Продано единиц',
    desc: 'Эксклюзивные товары',
    iconBg: '#1d4db7',
    pcColor: 'black-600',
  },
];


const General = () => {
  const { skeletonUp } = useStateContext();

  useEffect(()=> {
    window.scrollTo(0, 0);
  }, [])

  if(skeletonUp){
    return(
      <div className='flex m-10 flex-col gap-6 justify-evenly align-center text-center w-[100%]'>
        <LoadingSkeleton />
        <LoadingSkeleton />
        <LoadingSkeleton />
      </div>
    )
  }
  return ( 
    <div className="mt-12 flex flex-col gap-6 align-center  justify-center">
      <div className="flex mt-5 gap-4  w-[100%] flex-col md:flex-row  justify-center align-top      items-center">
        <CardWithStats title="Финансы" />
        <CardWithStats title="Продажи" />
      </div>
     
      <div className="flex   w-[100%] flex-wrap  justify-center align-top xs:flex-col    gap-4 items-center">
        <PaidToAmount comb={true} id="PaidToWeek" title="Выручка"  />
        <PeriodStats title="Финансы" stats={financeStats} statsTwo={financeStatsTwo} statsThree={financeStatsThree} />
      </div>
      <div className="flex w-[100%] mt-5  gap-4  items-center flex-col md:flex-row justify-center">
        <PeriodStats title="Товары" stats={salesStats} statsTwo={salesStatsTwo} statsThree={salesStats} />
        <CarouselCard carousel={true} title="Доли магазинов" />
      </div>
      <div className="flex   w-[100%] flex-wrap  justify-center align-top xs:flex-col   gap-4 items-center">
        <TableSort title="Продажи" />
      </div>
    </div>
  );
};
 
export default General;