import React, { useEffect, useState } from 'react'
import { Dropdown } from 'primereact/dropdown';
import LineChartRe from '../../components/demo/LineChart'
import { useStateContext } from '../../contexts/ContextProvider';
import { fetchLeads } from '../../methods/dataFetches/getLeadsBitrix';

const MonthlyTotalSalesChart = ({title, leadsSeries}) => {
  const [ selectedMonth, setSelectedMonth ] = useState('September');
  const { leads, dateRanges } = useStateContext();
  const [ series, setSeries ] = useState(leads.series);
  useEffect(() => {
    const dateToday = new Date();
    const getter = async () => {
      if (dateRanges[0]) {
        const data = await fetchLeads(dateRanges[2], leads.dateSaved);
        setSeries(data.series);
      }
    };
    const savedDate = new Date(leads.dateSaved); 

    if (dateToday > savedDate) {
      getter();
    }
    setSeries(leads.series);
  }, [leads]);

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

  const handleMonthChange = async (e) => {
    setSelectedMonth(e);
  }

  return (
    <div className="bg-white dark:text-gray-200 dark:bg-secondary-dark-bg p-6 md:w-[42%] w-[90%] rounded-2xl subtle-border">
        <div className="flex justify-between items-center gap-2 mb-10">
        <p className="text-xl font-semibold">{title}</p>
        <div className="flex items-center gap-4">
          <Dropdown value={selectedMonth} onChange={(e) => handleMonthChange(e.value)} options={cities} optionLabel="name"
                placeholder="Выберите месяц" className="w-full md:w-14rem" />
        </div>
        </div>
        <div className="w-[100%] h-[250px]">
          <LineChartRe data={series} />
        </div>
    </div>
  )
}

export default MonthlyTotalSalesChart