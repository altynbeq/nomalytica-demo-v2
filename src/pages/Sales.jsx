import React, { useEffect, useState } from 'react'
import { DailySalesStats, YearStats, MonthlyTotalSalesChart, OverallRevenueChart, WeeklyStats } from '../components/Sales';
import StatsBoxes from '../components/Sales/StatsBoxes';
import PeriodStats from '../components/demo/PeriodStats';
import CardWithBarChart from '../components/demo/CardWithBarChart';
import TableSort from '../components/demo/TablesList';
import CarouselCard from '../components/demo/Slider';
import LoadingSkeleton from '../components/LoadingSkeleton';
import { useStateContext } from '../contexts/ContextProvider';
import { SaleShare, ProductsStats, ProductSoldGridList, GridProductListCols, SalesBarSeriesAll, SalesBarSeriesByStore } from '../data/MainDataSource';
import ProductStatsComp  from '../components/demo/ProductsStatComp'
import { fetchLeads } from '../methods/dataFetches/getLeadsBitrix'

const data = [
  {
    name: 'Page A',
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: 'Page B',
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: 'Page C',
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: 'Page D',
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: 'Page E',
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: 'Page F',
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: 'Page G',
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];

const Sales = () => {
    const [ salesShare, setSalesShare ] = useState([]);
    const { skeletonUp, kkm, receipts, leads, setLeads, dateRanges } = useStateContext();
    const [ ready, setReady ] = useState(false);
    const [ productsGridRows, setProductGridRows ] = useState([]);
    const [ productStats, setProductStats ] = useState({});
    const [ barSeriesAll, setBarSeriesAll ] = useState([]);
    const [ barSeriesByStore, setBarSeriesByStore ] = useState([]);
    const [ leadsSeries, setLeadsSeries ] = useState([]);
    useEffect(() => {
        if(kkm.monthFormedKKM && receipts.monthReceiptsData){
            setSalesShare(SaleShare(kkm.monthFormedKKM));
            setProductGridRows(ProductSoldGridList(kkm.monthFormedKKM));
            setProductStats(ProductsStats(kkm.monthFormedKKM));
            setBarSeriesAll(SalesBarSeriesAll(kkm.monthFormedKKM));
            setBarSeriesByStore(SalesBarSeriesByStore(kkm.monthFormedKKM));
        }
          
        window.scrollTo(0, 0);
    }, [kkm]);
    // console.log("barSeriesAll", barSeriesAll);
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
        <div className='mt-12 flex flex-col gap-3  justify-center '>
             <div className="flex  w-[100%] flex-wrap  justify-center align-top xs:flex-col    gap-[0.5rem] items-center">
                <DailySalesStats />
                <WeeklyStats idcomp="weekStats" title="Дневная статистика"  />
            </div>
            <div className='flex w-[100%] flex-wrap align-center justify-center gap-[1.5rem] items-center'> 
                <StatsBoxes title="Продукты" rows={productsGridRows} columns={GridProductListCols} />
            </div>
            <div className='flex w-[100%] flex-wrap align-center justify-center gap-[1.5rem] items-center'> 
                <TableSort title="Продано товаров" displayStats={true} width="25%" spisanieStats={productStats} rows={productsGridRows} columns={GridProductListCols}  />
            </div>
            <div className="flex w-[100%]   gap-6 align-center  flex-wrap justify-center   items-center">
                <CarouselCard carousel={true} data={salesShare} title="Доли магазинов" />
                <ProductStatsComp title="Товары" stats={productStats} />
                {/* <PeriodStats title="Товары" stats={salesStats} statsTwo={salesStatsTwo} statsThree={salesStats} /> */}
            </div> 
            <div className="flex w-[100%] align-center  flex-wrap justify-center gap-[1.5rem]  items-center">
                {/* <CardWithBarChart title="Общие продажи" series={barSeriesAll} dataKey="Все" /> */}
                <CardWithBarChart title="Продажи по магазинам" series={barSeriesByStore} dataKey="Все" />
            </div>
            <div className="flex w-[100%] align-center  flex-wrap justify-center gap-[1.5rem]  items-center">
                <MonthlyTotalSalesChart leadsSeries={leadsSeries} title="Лиды за месяц" type="leads" />
                <MonthlyTotalSalesChart title="Конверсия Bitrix %" type="conversion"/>
            </div>
            <div className="flex mt-5 flex-wrap align-center justify-center gap-[1.5rem] w-[100%] items-center">
                <OverallRevenueChart series={barSeriesAll} />
                <YearStats title="Годовая статистика" />
            </div>
        </div>
    )
}

export default Sales