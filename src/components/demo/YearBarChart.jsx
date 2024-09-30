import React, { useRef, useState } from 'react'
import { Calendar } from 'primereact/calendar';
import { useStateContext } from "../../contexts/ContextProvider";
import BarChartWide from '../ReCharts/BarChartWide';

const YearBarChart = () => {
    const { dateRanges } = useStateContext();
    const stepperRef = useRef(null);
    const handleDateChange = (e) => {

    }
    const [dates, setDates] = useState([new Date(dateRanges[1].startDate.replace('%20', ' ')), new Date(dateRanges[1].endDate.replace('%20', ' '))]);
    return (
        <div className="bg-white dark:text-gray-200 dark:bg-secondary-dark-bg my-3 p-4 text-center justify-center align-center w-[90%] md:w-[87%]  rounded-2xl subtle-border">
            <div className='flex flex-row justify-between mb-4 '>
                <div className=''>
                    <p className="text-[1rem] font-semibold ">Финансы за год</p>
                </div>
                <div className="flex flex-wrap border-solid border-1 rounded-xl border-black px-2 gap-1">
                            <Calendar value={dates} onChange={(e) => {
                        handleDateChange(e.value)
                        setDates(e.value)
                        }} selectionMode="range" readOnlyInput hideOnRangeSelection />
                </div>
            </div>

            <div className='flex h-[400px]'>
                <BarChartWide />
            </div>
        </div>
    )
}

export default YearBarChart