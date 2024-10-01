import React, { useEffect, useState } from 'react'
import { useStateContext } from '../contexts/ContextProvider';
import { DailySalesStats, YearStats, WeaklyStatistics, ProductsStats, BestSalesStats, BoxTotalStats, WeaklyTotalSalesChart, MonthlyTotalSalesChart, OverallRevenueChart, WeeklyStats } from '../components/Sales';
import { FirstRowStats } from '../components/General';
import LoadingSkeleton from '../components/LoadingSkeleton'
import { getSalesReportsData, getSalesProductsData } from '../hoc/shareData';
import { StatsBlockSales } from '../components'
import StatsBoxes from '../components/Sales/StatsBoxes';
import PeriodStats from '../components/demo/PeriodStats';
import CardWithBarChart from '../components/demo/CardWithBarChart';
import TableSort from '../components/demo/TablesList';
import CarouselCard from '../components/demo/Slider';

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

const Sales = ({ leads, sales1C, kkm, products1C, deals, spisanie, conversionSeries, weekSalesSeries}) => {
    const { dateRanges, skeletonUp, currentColor, currentMode,setActiveMenu } = useStateContext(); 
    const excelSalesReport = getSalesReportsData();
    const [ ready, setReady ] = useState(false);
    const [ excelSalesReportDay, setexcelSalesReportDay ] = useState([]);
    const [ excelSalesReportWeek, setexcelSalesReportWeek ] = useState([]);
    const [ excelSalesReportMonth, setexcelSalesReportMonth ] = useState([]);
    useEffect(()=> {
        window.scrollTo(0, 0);
        if(excelSalesReport){
            setexcelSalesReportDay(excelSalesReport.readyDayData);
            setexcelSalesReportWeek(excelSalesReport.readyWeekData);
            setexcelSalesReportMonth(excelSalesReport.readyMonthData);
        }
    },[excelSalesReport]);

    if(skeletonUp && !ready){
        return(
        <div className='flex mx-10 flex-col gap-6 justify-evenly align-center text-center w-[100%]'>
            <LoadingSkeleton />
            <LoadingSkeleton />
            <LoadingSkeleton />
        </div>
        )
    } 
    return (
        <div className='mt-12 flex flex-col gap-3  justify-center '>
           
             <div className="flex  w-[100%] flex-wrap  justify-center align-top xs:flex-col    gap-[0.5rem] items-center">
                <DailySalesStats spisanie={spisanie.spisanieDay}  sales1C={sales1C.sales1CDay} products1C={products1C.products1CDay} kkm={kkm.kkmDay} />
                <WeeklyStats spisanie={spisanie.spisanieDay} products1C={products1C.products1CDay} sales1C={sales1C.sales1CDay} kkm={kkm.kkmDay} leads={leads.leadsDay} deals={deals.dealsDay} idcomp="weekStats" title="Дневная статистика"  />
            </div>
            <div className='flex w-[100%] flex-wrap align-center justify-center gap-[1.5rem] items-center'> 
                <StatsBoxes />
                {/* <FirstRowStats /> */}
            </div>
            <div className='flex w-[100%] flex-wrap align-center justify-center gap-[1.5rem] items-center'> 
                <TableSort displayStats={true} title="Продано товаров" />
            </div>
            <div className="flex w-[100%]   gap-6 align-center  flex-wrap justify-center   items-center">
                {/* <PeriodStats title="Финансы" stats={financeStats} statsTwo={financeStatsTwo} statsThree={financeStatsThree} />
                 */}
                 <CarouselCard carousel={true} title="Доли магазинов" />
                <PeriodStats title="Товары" stats={salesStats} statsTwo={salesStatsTwo} statsThree={salesStats} />
                {/* <WeaklyStatistics products1C={products1C.products1CWeek} sales1C={sales1C.sales1CWeek} kkm={kkm.kkmWeek} leads={leads.leadsWeek} deals={deals.dealsWeek}  excelData={excelSalesReportWeek} idcomp="weekStatis" title="Недельная статистика"  />
                <WeaklyStatistics products1C={products1C.products1CMonth} sales1C={sales1C.sales1CMonth} kkm={kkm.kkmMonth} leads={leads.leadsMonth} deals={deals.dealsMonth} excelData={excelSalesReportMonth} idcomp="monthStatis" title="Месячная статистика"  />
                <ProductsStats products1C={products1C.products1CMonth} idcomp="weekStatis" title="Товарная статистика" /> */}
            </div> 
            <div className="flex w-[100%] align-center  flex-wrap justify-center gap-[1.5rem]  items-center">
                <CardWithBarChart kkm={kkm.kkmMonth} deals={deals.dealsMonth} title="Общие продажи" />
                <CardWithBarChart kkm={kkm.kkmMonth} deals={deals.dealsMonth} title="Продажи по магазинам" />
                {/* {/* <StatsBlockSales idcomp="weekStatsSales" products1C={products1C.products1CWeek} spisanie={spisanie.spisanieWeek} sales1C={weekSalesSeries} kkm={kkm.kkmWeek} leads={leads.leadsWeek} deals={deals.dealsWeek} /> */}
                {/* <StatsBlockSales cal="drop" idcomp="monthStatsSales" products1C={products1C.products1CMonth} spisanie={spisanie.spisanieMonth} sales1C={kkm.kkmMonth} kkm={kkm.kkmMonth} leads={leads.leadsMonth} deals={deals.dealsMonth} /> */}
            </div>
            <div className="flex w-[100%] align-center  flex-wrap justify-center gap-[1.5rem]  items-center">
                <MonthlyTotalSalesChart sales1C={leads.leadsMonth} title="Лиды за месяц" type="leads" />
                <MonthlyTotalSalesChart sales1C={conversionSeries} title="Конверсия Bitrix %" type="conversion"/>
            </div>
            <div className="flex mt-5 flex-wrap align-center justify-center gap-[1.5rem] w-[100%] items-center">
                <OverallRevenueChart />
                <YearStats title="Годовая статистика" />
            </div>
        </div>
    )
}

export default Sales

{/* <div className="flex m-3 mt-5 flex-row md:flex-row sm:flex-col xs:flex-col justify-center gap-[1.5rem] w-[100%] items-center">
                <MonthlyTotalSalesChart />
            </div> */}