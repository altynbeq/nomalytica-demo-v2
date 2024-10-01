import React, { useRef, useState } from "react";
import { Stepper } from 'primereact/stepper';
import { Dropdown } from 'primereact/dropdown';
import { StepperPanel } from 'primereact/stepperpanel';
import { FaDollarSign, FaMoneyBillAlt, FaMoneyBill, FaBox, FaFilter, FaChartBar } from "react-icons/fa";
import PieChartRe from '../ReCharts/PieChart'

const Slider = ({ idcomp, carousel, title }) => {
    const stepperRef = useRef(null);
    const [ selectedMonth, setSelectedMonth ] = useState('Сентябрь');
    const months = [ "Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"];
    const weeklyStats = [
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

    const data = [
        { name: 'Group A', value: 400, fill: '#8884d8' }, // Purple
        { name: 'Group B', value: 300, fill: '#82ca9d' }, // Green
        { name: 'Group C', value: 300, fill: '#ffc658' }, // Yellow
        { name: 'Group D', value: 200, fill: '#d84f5f' }, // Red
        { name: 'Group E', value: 278, fill: '#ffa07a' }, // Light Salmon
        { name: 'Group F', value: 189, fill: '#8dd1e1' }, // Light Blue
      ];

      const dataStore = [
        { name: 'Алматы', value: 400, fill: '#8884d8' }, // Purple
        { name: 'Сатпаева', value: 200, fill: '#82ca9d' }, // Green
        { name: 'Панфилова', value: 100, fill: '#ffc658' }, // Yellow
      ];
  
    const handleMonthChange = async (e) => {
        setSelectedMonth(e);
        // setSelectedMonth(e);
        // const date = convertMonthToDateRange(e, 2024);
        // const data = await getSalesReceiptsFront(date);
        // const kkmData = await getKKMReceiptsFront(date);

        // setNewTotalSum(new Intl.NumberFormat('en-US').format(kkmData.totalSum));
        // setAvgCheck(kkm.totalSum/kkm.totalNumberSales > 0 ? kkm.totalSum/kkm.totalNumberSales : 0);
        // setSalesSeries(data.salesSumSeries);
    }
    return (
        <div className={`bg-white dark:text-gray-200 justify-center p-5 dark:bg-secondary-dark-bg w-[90%] md:w-[42%] rounded-2xl subtle-border`}>
            <div className="flex flex-row justify-between gap-4 w-[100%]">
                <h2 className="text-black font-bold text-1xl">{title}</h2>
                <div className="flex flex-wrap  pb-6 gap-1 border-solid	 ">
                <Dropdown 
                    value={selectedMonth} 
                    onChange={(e) => handleMonthChange(e.value)} 
                    options={months} 
                    optionLabel="name" 
                    placeholder="Выберите месяц" 
                    className="w-full md:w-14rem" /> 
                </div>
            </div>
            {
                carousel ? 
                <Stepper ref={stepperRef} style={{ flexBasis: '50rem' }}>
                    <StepperPanel header='Алматы' >
                        <div className="h-[300px]">
                            <PieChartRe data={data} />
                        </div>
                    </StepperPanel>
                    <StepperPanel header="Сатпаева">
                        <div className="h-[300px]">
                            <PieChartRe data={data} />
                        </div>
                    </StepperPanel>
                    <StepperPanel header="Панфилова">
                        <div className="h-[300px]">
                            <PieChartRe data={data} />
                        </div>
                    </StepperPanel>
                </Stepper> : 
                <div className="h-[300px]">
                    <PieChartRe data={data} />
                </div>
            }
            
        </div>
    )
}
export default Slider