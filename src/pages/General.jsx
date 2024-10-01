import React, { useEffect } from 'react';

import { useStateContext } from '../contexts/ContextProvider';

import { FirstRowStats, SalesDouble, MonthlyRevenueBars, SecondRowPie, ThirdRowTransList, ThirdRowLineChart, LastRowWeaklyStats, LastRowSecondComp, LastRowThirdComp } from '../components/General';
import { ContainerWrapper, StatsBlockFinance, StatsBlockSales } from '../components';
import LoadingSkeleton from '../components/LoadingSkeleton'

import { WeeklyStats, ProductsStats, WeaklyTotalSalesChart } from '../components/Sales'
import { SpisanieStats } from '../components/Sklad';
import { getDataSpisanie } from '../hoc/shareData';
import { PaidToAmount, KassaKKMPie, RevenueByWeekStacked } from '../components/Finance'
import { WeekStats } from '../components/General'
import  CardWithStats  from '../components/demo/ChartsHolder'
import { AreaChart } from 'recharts';
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


const General = ({leads, sales1C, kkm, products1C, deals, spisanie, weekSalesSeries}) => {
  const { skeletonUp, currentColor, currentMode, setActiveMenu } = useStateContext();
  const dataSpisanie = getDataSpisanie();

  // useEffect(()=> {
  //   window.scrollTo(0, 0);
  // }, [])

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
        <CardWithStats />
        <CardWithStats />
        {/* <StatsBlockFinance cal={true} products1C={products1C.products1CMonth} spisanie={spisanie.spisanieMonth} sales1C={sales1C.sales1CMonth} kkm={kkm.kkmMonth} leads={leads.leadsMonth} deals={deals.dealsMonth} idcomp="weekStats" /> */}
      </div>
      {/* <div className="flex mt-5 gap-4  w-[100%] flex-col md:flex-row  justify-center align-top   md:mx-3   items-center">
        <StatsBlockFinance cal={true} products1C={products1C.products1CMonth} spisanie={spisanie.spisanieMonth} sales1C={sales1C.sales1CMonth} kkm={kkm.kkmMonth} leads={leads.leadsMonth} deals={deals.dealsMonth} idcomp="weekStats" />
<StatsBlockSales products1C={products1C.products1CMonth} spisanie={spisanie.spisanieMonth} sales1C={kkm.kkmMonth} kkm={kkm.kkmMonth} leads={leads.leadsMonth} deals={deals.dealsMonth} idcomp="weekStatsSales" />
      </div> */}
      <div className="flex   w-[100%] flex-wrap  justify-center align-top xs:flex-col    gap-4 items-center">
        <PaidToAmount comb={true} id="PaidToWeek" sales1C={sales1C.sales1CWeek} kkm={kkm.kkmWeek} title="Выручка"  />
        <PeriodStats title="Финансы" stats={financeStats} statsTwo={financeStatsTwo} statsThree={financeStatsThree} />
        {/* <PeriodStats title="Товары" stats={salesStats} statsTwo={salesStatsTwo} statsThree={salesStats} /> */}
        {/* <WeekStats products1C={products1C.products1CDay} spisanie={spisanie.spisanieDay} sales1C={sales1C.sales1CDay} kkm={kkm.kkmDay} leads={leads.leadsDay} deals={deals.dealsDay} idcomp="weekStats" title="Дневная статистика"  /> */}
        {/* <SpisanieStats width="27%" rawSpisanie={dataSpisanie.readyDayData} idcomponent="spisanieDay" title="Списания за день" spisanie={spisanie.spisanieDay} /> */}
        {/* <ProductsStats products1C={products1C.products1CDay}  idcomp="weekStatis" title="Товарная статистика" /> */}
      </div>
      <div className="flex w-[100%] mt-5  gap-4  items-center flex-col md:flex-row justify-center">
      <PeriodStats title="Товары" stats={salesStats} statsTwo={salesStatsTwo} statsThree={salesStats} />
        <CarouselCard carousel={true} title="Доли магазинов" />
        {/* <CarouselCard carousel={false} title="Доли магазинов" /> */}
        {/* <PaidToAmount id="PaidToWeek" sales1C={sales1C.sales1CYesterday} kkm={kkm.kkmDay} title="Выручка за вчера"  /> */}
        {/* <KassaKKMPie id="KKMWeek" sales1C={sales1C.sales1CYesterday} title="Фискальный регистратор (вчера)" /> */}
      </div>
      <div className="flex   w-[100%] flex-wrap  justify-center align-top xs:flex-col   gap-4 items-center">
        <TableSort title="Продажи" />
      </div>
    </div>
  );
};
 
export default General;



// return (
//   <div className="mt-12 ">
//     <div className='flex md:mx-3  flex-wrap justify-center gap-[1.5rem] items-center'>
//       <FirstRowStats />
//     </div>
//     <div className="flex gap-1.5 flex-col md:flex-row  justify-center">
//       <SalesDouble />
//       <div className=' flex justify-center align-center flex-col  w-[100%] md:w-[35%]'>
//         <MonthlyRevenueBars />
//         <SecondRowPie />
//       </div>
//     </div>

//     <div className="flex w-[100%] gap-6 m-4 flex-col md:flex-row justify-center">
//       <ThirdRowTransList />
//       <ThirdRowLineChart />
//     </div>

//     <div className="flex flex-col align-center md:flex-row w-[100%]  justify-center">
//       <LastRowWeaklyStats />
//       <LastRowSecondComp />
//       <LastRowThirdComp />
//     </div>
//   </div>
// );