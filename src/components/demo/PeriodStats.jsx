import React, { useRef, useState } from "react";
import { Stepper } from 'primereact/stepper';
import { StepperPanel } from 'primereact/stepperpanel';
import { Calendar } from 'primereact/calendar';
import { useStateContext } from "../../contexts/ContextProvider";

const PeriodStats = ({ idcomp, title, stats, statsTwo, statsThree }) => {
    const stepperRef = useRef(null);
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
                    <h2 className="text-black font-bold text-1xl">{title}</h2>
                    <div className="flex flex-wrap border-solid border-1 rounded-xl border-black px-2 gap-1">
                        <Calendar value={dates} onChange={(e) => {
                            handleDateChange(e.value)
                            setDates(e.value)
                            }} selectionMode="range" readOnlyInput hideOnRangeSelection 
                        />
                    </div>
            </div>
            <Stepper ref={stepperRef} style={{ flexBasis: '50rem' }}>
                <StepperPanel header='Алматы'>
                    <div className="mt-2">
                        {stats.map((item) => (
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
                <StepperPanel header="Сатпаева">
                    <div className="">
                        {statsTwo.map((item) => (
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
                <StepperPanel header="Панфилова">
                    <div className="mt-2">
                        {statsThree.map((item) => (
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