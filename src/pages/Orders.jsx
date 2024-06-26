import React from 'react';
import { GridComponent, ColumnsDirective, ColumnDirective, Resize, Sort, ContextMenu, Filter, Page, ExcelExport, PdfExport, Edit, Inject } from '@syncfusion/ej2-react-grids';

import { ordersData, contextMenuItems, ordersGrid } from '../data/ordersData';
import { Header, Button } from '../components';
import { useStateContext } from '../contexts/ContextProvider';
import { FaEdit } from "react-icons/fa";
import { OrdersEditModal, ExcelReader } from '../components/Sklad';
import { useState } from 'react';

const Orders = () => {
  const { currentColor, currentMode } = useStateContext();
  const [ editClicked, setEditClicked ] = useState(false);
  const editing = { allowDeleting: true, allowEditing: true };
  return (
    <div className="md:p-10 bg-white dark:text-black dark:bg-secondary-dark-bg  rounded-3xl">
      <div className='flex flex-row justify-between h-12 m-5'>
        <Header  title="Список заказов" />
        <button 
          type="button" 
          onClick={() => setEditClicked(!editClicked)} 
          style={{ backgroundColor: currentColor, color:"white", borderRadius:"24px" }} 
          className={`text-xs sm:text-xl p-3 hover:drop-shadow-xl hover:bg-${currentColor}   xs:text-[10px] xs:p-1`}
        >
          Редактировать
        </button>
      </div>
        <div className="flex w-full justify-end">
          { editClicked && <OrdersEditModal active={editClicked} setActive={setEditClicked} /> }
        </div>
      <GridComponent
        id="gridcomp"
        dataSource={ordersData}
        allowPaging
        allowSorting
        allowExcelExport
        allowPdfExport
        contextMenuItems={contextMenuItems}
        editSettings={editing}
      >
        <ColumnsDirective>
          {/* eslint-disable-next-line react/jsx-props-no-spreading */}
          {ordersGrid.map((item, index) => <ColumnDirective key={index} {...item} />)}
        </ColumnsDirective>
        <Inject services={[Resize, Sort, ContextMenu, Filter, Page, ExcelExport, Edit, PdfExport]} />
      </GridComponent>
    </div>
  );
};
export default Orders;