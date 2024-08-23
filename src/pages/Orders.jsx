import React from 'react';
import { GridComponent, ColumnsDirective, ColumnDirective, Resize, Sort, ContextMenu, Filter, Page, ExcelExport, PdfExport, Edit, Inject } from '@syncfusion/ej2-react-grids';

import { ordersData, contextMenuItems, ordersGrid } from '../data/ordersData';
import { Header, Button } from '../components';
import { useStateContext } from '../contexts/ContextProvider';
import { FaEdit } from "react-icons/fa";
import { OrdersEditModal, ExcelReader } from '../components/Sklad';
import { useState } from 'react';

const Orders = ({ordersData, defVal, title, width }) => {
  const { currentColor, currentMode } = useStateContext();
  const [ editClicked, setEditClicked ] = useState(false);
  const editing = { allowDeleting: true, allowEditing: true };
  if(!defVal){
    const orders = Object.entries(ordersData).map(([name, details], index) => {
      return {
        Count: details.count,
        Price: details.price + ' тг',
        TotalAmount: Math.round(details.totalSum) + ' тг',
        OrderItems: name,
        Status: 'Продано',      // Example static value, replace with dynamic if needed
        StatusBg: '#8BE78B',    // Example static value, replace with dynamic if needed
        // ProductImage: 'product6',  // Placeholder for product image if needed
      };
    });
    
    ordersData = orders;
  }
  return (
    <div className={`md:p-5 bg-white w-${width} dark:text-black dark:bg-secondary-dark-bg  rounded-3xl subtle-border`}>
      <div className='flex flex-row justify-between h-12 m-5'>
        <Header  title={title} />
        {/* <button 
          type="button" 
          // onClick={() => setEditClicked(!editClicked)} 
          style={{ backgroundColor: currentColor, color:"white", borderRadius:"24px" }} 
          className={`text-xs  p-3 hover:drop-shadow-xl hover:bg-${currentColor}   xs:text-[10px] xs:p-1`}
        >
          Скачать отчет
        </button> */}
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