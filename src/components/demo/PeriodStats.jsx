import React, { useRef, useState } from "react";
import { Stepper } from 'primereact/stepper';
import { StepperPanel } from 'primereact/stepperpanel';
import { FaDollarSign, FaMoneyBillAlt, FaMoneyBill, FaBox, FaFilter, FaChartBar } from "react-icons/fa";
import { Calendar } from 'primereact/calendar';
import { useStateContext } from "../../contexts/ContextProvider";

const PeriodStats = ({ idcomp }) => {
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
    const { dateRanges } = useStateContext();
    const [dates, setDates] = useState([new Date(dateRanges[1].startDate.replace('%20', ' ')), new Date(dateRanges[1].endDate.replace('%20', ' '))]);
    
    const handleDateChange = async (e) => {
        if(e[1]){
         console.log("hellooo")
        }
    }
    
    return (
        <div className={`bg-white dark:text-gray-200 justify-center p-5 dark:bg-secondary-dark-bg w-[90%] md:w-[42%]  rounded-2xl subtle-border`}>
            <div className="flex flex-row justify-between gap-4 w-[100%]">
                    <h2 className="text-black font-bold text-1xl">Финансы</h2>
                    <div className="flex flex-wrap border-solid border-1 rounded-xl border-black px-2 gap-1">
                        <Calendar value={dates} onChange={(e) => {
                            handleDateChange(e.value)
                            setDates(e.value)
                            }} selectionMode="range" readOnlyInput hideOnRangeSelection 
                        />
                    </div>
            </div>
            <Stepper ref={stepperRef} style={{ flexBasis: '50rem' }}>
                <StepperPanel header='День'>
                    <div className="mt-2">
                        {weeklyStats.map((item) => (
                            <div key={idcomp + item.id} className="flex justify-between mt-4 w-full">
                                <div className="flex gap-4">
                                <button
                                    type="button"
                                    style={{ background: item.iconBg }}
                                    className="text-2xl hover:drop-shadow-xl text-white rounded-full p-3"
                                >
                                    {item.icon}
                                </button>
                                <div>
                                    <p className="text-md font-semibold">{item.title}</p>
                                    <p className="text-sm text-gray-400">{item.desc}</p>
                                </div>
                                </div>

                                <p className={`text-${item.pcColor}`}>{item.amount}</p>
                            </div>
                        ))}
                    </div>
                </StepperPanel>
                <StepperPanel header="Неделя">
                    <div className="mt-2">
                        {weeklyStats.map((item) => (
                            <div key={idcomp + item.id} className="flex justify-between mt-4 w-full">
                                <div className="flex gap-4">
                                <button
                                    type="button"
                                    style={{ background: item.iconBg }}
                                    className="text-2xl hover:drop-shadow-xl text-white rounded-full p-3"
                                >
                                    {item.icon}
                                </button>
                                <div>
                                    <p className="text-md font-semibold">{item.title}</p>
                                    <p className="text-sm text-gray-400">{item.desc}</p>
                                </div>
                                </div>

                                <p className={`text-${item.pcColor}`}>{item.amount}</p>
                            </div>
                        ))}
                    </div>
                </StepperPanel>
                <StepperPanel header="Месяц">
                    <div className="mt-2">
                        {weeklyStats.map((item) => (
                            <div key={idcomp + item.id} className="flex justify-between mt-4 w-full">
                                <div className="flex gap-4">
                                <button
                                    type="button"
                                    style={{ background: item.iconBg }}
                                    className="text-2xl hover:drop-shadow-xl text-white rounded-full p-3"
                                >
                                    {item.icon}
                                </button>
                                <div>
                                    <p className="text-md font-semibold">{item.title}</p>
                                    <p className="text-sm text-gray-400">{item.desc}</p>
                                </div>
                                </div>

                                <p className={`text-${item.pcColor}`}>{item.amount}</p>
                            </div>
                        ))}
                    </div>
                </StepperPanel>
            </Stepper>
        </div>
    )
}
export default PeriodStats