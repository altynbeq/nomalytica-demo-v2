import React from 'react'
import { DailySalesStats, YearStats, MonthlyTotalSalesChart, OverallRevenueChart, WeeklyStats } from '../components/Sales';
import StatsBoxes from '../components/Sales/StatsBoxes';
import PeriodStats from '../components/demo/PeriodStats';
import CardWithBarChart from '../components/demo/CardWithBarChart';
import TableSort from '../components/demo/TablesList';
import CarouselCard from '../components/demo/Slider';

import { FaDollarSign, FaBoxOpen, FaRegThumbsDown, FaMoneyBill, FaBox } from "react-icons/fa";
  
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
    icon: <FaRegThumbsDown />,
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
    icon: <FaBoxOpen />,
    amount: '450',
    title: 'Продано единиц',
    desc: 'Эксклюзивные товары',
    iconBg: '#1d4db7',
    pcColor: 'black-600',
},
];

const Sales = () => {
    return (
        <div className='mt-12 flex flex-col gap-3  justify-center '>
             <div className="flex  w-[100%] flex-wrap  justify-center align-top xs:flex-col    gap-[0.5rem] items-center">
                <DailySalesStats />
                <WeeklyStats idcomp="weekStats" title="Дневная статистика"  />
            </div>
            <div className='flex w-[100%] flex-wrap align-center justify-center gap-[1.5rem] items-center'> 
                <StatsBoxes />
            </div>
            <div className='flex w-[100%] flex-wrap align-center justify-center gap-[1.5rem] items-center'> 
                <TableSort displayStats={true} title="Продано товаров" />
            </div>
            <div className="flex w-[100%]   gap-6 align-center  flex-wrap justify-center   items-center">
                <CarouselCard carousel={true} title="Доли магазинов" />
                <PeriodStats title="Товары" stats={salesStats} statsTwo={salesStatsTwo} statsThree={salesStats} />
            </div> 
            <div className="flex w-[100%] align-center  flex-wrap justify-center gap-[1.5rem]  items-center">
                <CardWithBarChart title="Общие продажи" />
                <CardWithBarChart title="Продажи по магазинам" />
            </div>
            <div className="flex w-[100%] align-center  flex-wrap justify-center gap-[1.5rem]  items-center">
                <MonthlyTotalSalesChart title="Лиды за месяц" type="leads" />
                <MonthlyTotalSalesChart title="Конверсия Bitrix %" type="conversion"/>
            </div>
            <div className="flex mt-5 flex-wrap align-center justify-center gap-[1.5rem] w-[100%] items-center">
                <OverallRevenueChart title="Продажи за год" />
                <YearStats title="Годовая статистика" />
            </div>
        </div>
    )
}

export default Sales