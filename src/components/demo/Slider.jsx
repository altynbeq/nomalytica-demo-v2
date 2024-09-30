import React, { useRef, useState } from "react";
import { Stepper } from 'primereact/stepper';
import { Dropdown } from 'primereact/dropdown';
import { StepperPanel } from 'primereact/stepperpanel';
import { FaDollarSign, FaMoneyBillAlt, FaMoneyBill, FaBox, FaFilter, FaChartBar } from "react-icons/fa";
import PieChartRe from '../ReCharts/PieChart'

const Slider = ({ idcomp }) => {
    const stepperRef = useRef(null);
    const [ selectedMonth, setSelectedMonth ] = useState('September');
    const months = [  "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
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

    const handleMonthChange = async (e) => {
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
                    <h2 className="text-black font-bold text-1xl">Финансы</h2>
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
            <Stepper ref={stepperRef} style={{ flexBasis: '50rem' }}>
                <StepperPanel header='День' >
                    <div className="h-[300px]">
                        <PieChartRe />
                    </div>
                </StepperPanel>
                <StepperPanel header="Неделя">
                    <div className="h-[300px]">
                        <PieChartRe />
                    </div>
                </StepperPanel>
                <StepperPanel header="Месяц">
                    <div className="h-[300px]">
                        <PieChartRe />
                    </div>
                </StepperPanel>
            </Stepper>
        </div>
    )
}
export default Slider