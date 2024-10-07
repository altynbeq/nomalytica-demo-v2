import React, { useState } from 'react'
import { useStateContext } from "../../contexts/ContextProvider";
import { Dropdown } from 'primereact/dropdown';
import { Calendar } from 'primereact/calendar';
import BarChartRe from '../demo/BarChart';

const SpisanieMonthChart = ({ title, series, short }) => {
  const { dateRanges } = useStateContext();
  const [ selectedMonth, setSelectedMonth ] = useState('September');
  const [ selectedStore, setSelectedStore ] = useState('Все магазины');
  const [dates, setDates] = useState([new Date(dateRanges[1].startDate.replace('%20', ' ')), new Date(dateRanges[1].endDate.replace('%20', ' '))]);
  const cities = [  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"];
  const stores = [ "Все магазины", "Алматы", "Сатпаева", "Панфилова",];
  const handleMonthChange = async (e) => {
    setSelectedMonth(e);
  }
  const handleStoreChange = async (e) => {
    setSelectedStore(e);
  };
  const handleDateChange = (e) => {

  }

  return (
    <div className={`bg-white dark:text-gray-200 dark:bg-secondary-dark-bg p-6 w-[90%] md:w-[${ short ? 65 : 53}%] rounded-2xl subtle-border`}>
        <div className="flex justify-between items-center gap-2 mb-10">
        <p className="text-xl font-semibold">{title}</p>
        <div className="flex flex-col md:flex-row gap-2">
          <div className='border-solid border-1'>
            <Dropdown 
              value={selectedStore} 
              onChange={(e) => handleStoreChange(e.value)} 
              options={stores} 
              optionLabel="name" 
              placeholder="Выберите магазин" 
              className="w-full md:w-14rem" /> 
          </div>
          <div className="flex flex-row border-solid border-1 rounded-xl border-black px-2 gap-1">
            <Calendar value={dates} onChange={(e) => {
              handleDateChange(e.value)
              setDates(e.value)
              }} selectionMode="range" readOnlyInput hideOnRangeSelection 
            />
          </div>
        </div>
        </div>
        <div className="w-[100%] h-[400px]">
          <BarChartRe data={series} />
        </div>
    </div>
  )
}

export default SpisanieMonthChart