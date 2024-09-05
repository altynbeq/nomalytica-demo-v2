import React, { useState } from "react";
import { Stacked } from '../components'
import { FaDollarSign, FaMoneyBillAlt, FaMoneyBill, FaBox, FaFilter, FaChartBar } from "react-icons/fa";
import { Dropdown } from 'primereact/dropdown';
import { Calendar } from 'primereact/calendar';
import { getSalesReceiptsFront } from '../methods/getSalesReceiptsOne'
import { getKKMReceiptsFront } from '../methods/getKKMOne'
import { fetchDealsFront } from '../methods/getDealsOne'
import { useStateContext } from "../contexts/ContextProvider";

function convertMonthToDateRange(monthName, year) {
    const monthIndex = new Date(`${monthName} 1, ${year}`).getMonth(); // Get the month index (0-based)
    const startDate = new Date(year, monthIndex, 1, 0, 0, 0); // Start of the month
    const endDate = new Date(year, monthIndex + 1, 0, 23, 59, 59); // End of the month
  
    const formatDate = (date) => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        const seconds = String(date.getSeconds()).padStart(2, '0');
  
        return `${year}-${month}-${day}%20${hours}:${minutes}:${seconds}`;
    };
  
    return {
        startDate: formatDate(startDate),
        endDate: formatDate(endDate)
    };
}
function formatDates(dates) {
  const formatDate = (date, includeSpace = true) => {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
      const day = String(date.getDate()).padStart(2, '0');
      const hours = String(date.getHours()).padStart(2, '0');
      const minutes = String(date.getMinutes()).padStart(2, '0');
      const seconds = String(date.getSeconds()).padStart(2, '0');

      const space = includeSpace ? "%20" : " ";

      return `${year}-${month}-${day}${space}${hours}:${minutes}:${seconds}`;
  };

  return {
      startDate: formatDate(dates[0]),
      endDate: formatDate(dates[1]),
      bitrixStartDate: formatDate(new Date(dates[0].setHours(0, 0, 0, 0)), false),
      bitrixEndDate: formatDate(new Date(dates[1].setHours(23, 59, 59, 999)), false)
  };
}

const StatsBlockSales = ({ idcomp, cal, title, excelData, kkm, sales1C, products1C, deals, leads, spisanie }) => {
    const { dateRanges } = useStateContext();
    const [ selectedMonth, setSelectedMonth ] = useState('September');
    const [dates, setDates] = useState([new Date(dateRanges[1].startDate.replace('%20', ' ')), new Date(dateRanges[1].endDate.replace('%20', ' '))]);
    const [ salesSeries, setSalesSeries ] = useState(sales1C.salesSeries ? sales1C.salesSeries : sales1C.series);
    const [ salesNumber, setSalesNumber ] = useState(kkm.totalNumberSales);
    const [ dealsCount, setDealsCount ] = useState(deals.leadsCount);
    const cities = [  "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    
    const handleMonthChange = async (e) => {
        setSelectedMonth(e);
        const date = convertMonthToDateRange(e, 2024);
        
        const [data, dealsData] = await Promise.all([getKKMReceiptsFront(date), fetchDealsFront(e)])
        setDealsCount(dealsData.leadsCount);
        setSalesSeries(data.salesSeries);
        setSalesNumber(data.totalNumberSales);
    }
    const weeklyStats = [
        {
            id: '3',
            icon: <FaMoneyBillAlt />,
            amount: salesNumber,
            title: 'Продаж',
            // desc: `?`,
            iconBg: '#00C292',
            pcColor: 'green-600',
        },
        {
            icon: <FaChartBar />,
            amount: dealsCount,
            title: 'Онлайн продаж',
            desc: 'Bitrix',
            iconBg: 'rgb(254, 201, 15)',
            pcColor: 'green-600',
        },
    ];

    let  maxSeriesVal = salesSeries.reduce((acc, item) => {
        return Math.max(acc, item.y);
    }, 0);

    let  minSeriesVal = salesSeries.reduce((acc, item) => {
        if (item.y !== 0 || acc === Infinity) {
          return Math.min(acc, item.y);
        }
        return acc;
    }, Infinity);

    let  finalMinSeriesVal = minSeriesVal === Infinity ? 0 : minSeriesVal / 2;
    const range = maxSeriesVal - finalMinSeriesVal;
    let interval;
    if (range <= 10) {
      interval = 1;
    } else if (range <= 100) {
      interval = 10;
    } else if (range <= 1000) {
      interval = 100;
    } else if (range <= 10000) {
      interval = 1000;
    } else if (range <= 100000) {
      interval = 50000;
    } else {
      interval = 100000;
    }
    let stackedCustomSeriesYearly = [
        { 
          dataSource: salesSeries,
          xName: 'x',
          yName: 'y',
          name: 'Продажи',
          type: 'StackingColumn',
          background: 'blue',
        },
    ];
    let stackedPrimaryXAxisYearly = {
      lineStyle: { width: 0 },
      minimum: minSeriesVal > 0 ? minSeriesVal / 2 : 0,
      // data.minAmountSeries > 0 ? data.minAmountSeries : 10,
      maximum: maxSeriesVal > 0 ? maxSeriesVal * 1.3 : 10,
      // data.maxAmountSeries > 0 ? data.maxAmountSeries * 1.1 : 100,
      interval: 10 ,
      // data.maxAmountSeries > 0 ? 50000 : 100,
      majorTickLines: { width: 0 },
      majorGridLines: { width: 1 },
      minorGridLines: { width: 1 },
      minorTickLines: { width: 0 },
      labelFormat: '{value}',
    };
    let stackedPrimaryYAxisYearly = {
        majorGridLines: { width: 0 },
        minorGridLines: { width: 0 },
        majorTickLines: { width: 0 },
        minorTickLines: { width: 0 },
        interval: 1,
        lineStyle: { width: 0 },
        labelIntersectAction: 'Rotate45',
        valueType: 'Category',
    };
    
    const handleDateChange = async (e) => {
      if(e[1]){
        const date = formatDates(e);
        const [dataKKM, dealsData] = await Promise.all([getKKMReceiptsFront(date), fetchDealsFront(date)])
        setDealsCount(dealsData.leadsCount);
        setSalesNumber(dataKKM.totalNumberSales);
        setSalesSeries(dataKKM.salesSeries);
      }
    }

    return (
      <div className="bg-white rounded-lg flex flex-col overflow-hidden p-9 relative w-[90%] md:w-[40%] ">
        <div className="flex flex-col pb-6 w-full">
          <div className="flex flex-row justify-between gap-4 w-[100%]">
            <h2 className="text-black font-bold text-1xl">Продажи</h2>
            <div className="flex flex-wrap  pb-6 gap-1 ">
              {
                cal == 'drop' ? <Dropdown value={selectedMonth} onChange={(e) => handleMonthChange(e.value)} options={cities} optionLabel="name" 
                placeholder="Выберите месяц" className="w-full md:w-14rem" /> : <Calendar value={dates} onChange={(e) => {
                  handleDateChange(e.value)
                  setDates(e.value)
                }} selectionMode="range" readOnlyInput hideOnRangeSelection />
              }
            </div>
          </div>
          {/* <div className="flex items-center space-x-3">
              <div className="bg-green-100 text-green-600 font-bold text-lg rounded-md px-3 py-1">
                {data.percentageChange}
              </div>
              <p className="text-gray-500 text-lg mt-2">{data.comparisonText}</p>
            </div> */}
        </div>
  
        <div className=" rounded-lg my-6">
            <Stacked id={idcomp} stackedCustomSeries={stackedCustomSeriesYearly} stackedPrimaryXAxis={stackedPrimaryYAxisYearly} stackedPrimaryYAxis={stackedPrimaryXAxisYearly}    />
        </div>
  
        {/* <div className="flex justify-between pb-6 text-xl font-bold">
          <span>Orders</span>
          <span>Customers</span>
        </div> */}
  
        <div className="flex flex-col space-y-3 pb-6">
          {weeklyStats.map((order, index) => (
            <div
              key={index}
              className="flex justify-between items-center text-lg"
            >
            <div className="flex flex-row gap-2">
                <button
                    type="button"
                    style={{ background: '#1e4db6' }}
                    className="text-1xl hover:drop-shadow-xl text-white rounded-full p-3"
                >
                    {order.icon}
                </button>
                <div className="flex flex-col">
                    <span className="">{order.title}</span>
                    <span className="text-gray-500">{order.desc}</span>
                </div>
            </div>

              <span className="text-gray-800">{order.amount}</span>
            </div>
          ))}
        </div>
  
        <button className="bg-gray-200 text-gray-600 text-lg rounded-md py-2 w-full">
          Скачать отчет
        </button>
      </div>
    );
};

export default StatsBlockSales;