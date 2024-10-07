import React, { useEffect, useState } from 'react'
// import { SpisanieMonthChart } from '../components/Sklad'
import SpisanieMonthChart from '../components/Sklad/SpisanieMonthChart';
// import { ProductsStats } from '../components/Sales'
import LoadingSkeleton from '../components/LoadingSkeleton';
import { useStateContext } from '../contexts/ContextProvider';
import TableSort from '../components/demo/TablesList';
import { ProductsStats,GridSpisanieListRows, GridSpisanieListCols, SpisanieStats, ProductSoldGridList, GridProductListCols, SpisanieBarSeriesByStore } from '../data/MainDataSource';
import ProductStatsComp  from '../components/demo/ProductsStatComp'

const data = [
  {
    name: 'Page A',
    uv: 4000,
  },
  {
    name: 'Page B',
    uv: 3000,
  },
  {
    name: 'Page C',
    uv: 2000,
  },
  {
    name: 'Page D',
    uv: 2780,
  },
  {
    name: 'Page E',
    uv: 1890,
  },
  {
    name: 'Page F',
    uv: 2390,
  },
  {
    name: 'Page G',
    uv: 3490,
  },
];

const Sklad = () => {
  const { skeletonUp, kkm, spisanie } = useStateContext();
  const [ productStats, setProductStats ] = useState({});
  const [ productsGridRows, setProductGridRows ] = useState([]);
  const [ tableRows, setTableRows ] = useState([]);
  const [ spisanieStats, setSpisanieStats ] = useState([]);
  const [ spisanieBarSeries, setSpisanieBarSeries ] = useState([]);

  useEffect(()=> {
    if(kkm.monthFormedKKM && spisanie.monthSpisanie){
      setProductGridRows(ProductSoldGridList(kkm.monthFormedKKM));
      setSpisanieStats(SpisanieStats(spisanie.monthSpisanie));
      setTableRows(GridSpisanieListRows(spisanie.monthSpisanie));
      setProductStats(ProductsStats(kkm.monthFormedKKM));
      setSpisanieBarSeries(SpisanieBarSeriesByStore(spisanie.monthSpisanie));
    }
    window.scrollTo(0, 0);
  }, []);
 
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
    <div className="mt-12 flex w-[100%] flex-col justify-center  align-center gap-8">
      <div className="flex mt-5 w-[100%] flex-wrap xs:flex-col  gap-4 justify-center ">
        <SpisanieMonthChart short={true} title="Списания за месяц" series={spisanieBarSeries} />
        {/* <ProductStatsComp title="Товары" stats={productStats} /> */}
      </div>
      <div className="flex flex-col  md:w-[100%]  md:flex-row gap-2 justify-center align-center  items-center">
        <TableSort displayStats={true} width="25%" spisanieStats={productStats} rows={productsGridRows} columns={GridProductListCols} title="Продано товаров" />
      </div>
      <div className="flex flex-col  md:flex-row gap-2 justify-center align-center  items-center">
        <TableSort title="Списано товаров" spisanieStats={spisanieStats} rows={tableRows} columns={GridSpisanieListCols} />
      </div>
    </div>
  );
}
 
export default Sklad;