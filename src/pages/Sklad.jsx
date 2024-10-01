import React, { useEffect } from 'react'
// import { SpisanieMonthChart } from '../components/Sklad'
import { ProductsStats } from '../components/Sales'
import TableSort from '../components/demo/TablesList';

const Sklad = () => {
  useEffect(()=> {
    window.scrollTo(0, 0);
  }, []);
  
  return (
    <div className="mt-12 flex w-[100%] flex-col justify-center  align-center gap-8">
      <div className="flex mt-5 w-[100%] flex-wrap xs:flex-col  gap-4 justify-center ">
        {/* <SpisanieMonthChart title="Списания за месяц" /> */}
        <ProductsStats idcomp="weekStatis" title="Товарная статистика" />
      </div>
      <div className="flex flex-col  md:w-[100%]  md:flex-row gap-2 justify-center align-center  items-center">
        <TableSort displayStats={true} title="Продано товаров" />
      </div>
      <div className="flex flex-col  md:flex-row gap-2 justify-center align-center  items-center">
        <TableSort displayStats={false} title="Списания" />
      </div>
    </div>
  );
}

export default Sklad;