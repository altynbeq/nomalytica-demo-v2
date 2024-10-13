import { useState } from 'react';
import { Card, Group } from '@mantine/core';
import Example from '../ReCharts/AreaChart'
import { Calendar } from 'primereact/calendar';
import { useStateContext } from "../../contexts/ContextProvider";
import { Button } from '../';
import { FaShare, FaFileDownload } from "react-icons/fa";

const  CardWithStats = ({title}) => {
    const { dateRanges } = useStateContext();

    const [dates, setDates] = useState([new Date(dateRanges[1].startDate.replace('%20', ' ')), new Date(dateRanges[1].endDate.replace('%20', ' '))]);
   
    const handleDateChange = async (e) => {
        if(e[1]){
         console.log("hellooo")
        }
    }
    
    return (
        <Card withBorder padding="lg" className="bg-white dark:text-gray-200 dark:bg-secondary-dark-bg my-3 p-4 text-center justify-center align-center w-[90%] md:w-[42%]  rounded-2xl subtle-border">
            <div className="flex flex-row justify-between mb-2 gap-4 w-[100%]">
                <div className='flex flex-row gap-2 text-center'>
                    <h2 className="text-black font-bold text-1xl">{title}</h2>
                </div>
                <div className="flex flex-wrap border-solid border-1 rounded-xl border-black px-2 gap-1">
                    <div className="relative z-0 w-54"> {/* Un-commented and added width for layout */}
                        {/* <BorderBeam size={100} duration={10} colorFrom="#ff0000" colorTo="#00ff00"> */}
                            <Calendar 
                                value={dates} 
                                onChange={(e) => {
                                    handleDateChange(e.value);
                                    setDates(e.value);
                                }} 
                                selectionMode="range" 
                                readOnlyInput 
                                hideOnRangeSelection 
                            />
                        {/* </BorderBeam> */}
                    </div>
                </div>

            </div>
            <div className='w-[100%] h-[300px] pr-4 mb-2'>
                <Example />
            </div>
            <div className="  border-t-1 pr-2 flex py-2 flex-row md:w-[100%] gap-8 justify-center ">
                <div className='flex justify-center  border-color  flex-col text-start '>
                    <p className="text-gray-500 mt-1">Выручка</p>
                    <span className="text-1xl ">25 671 177тг</span>
                </div>
                <div className='flex md:border-l-1 pl-2 flex-col text-start'>
                    <p className="text-gray-500 mt-1">Средний чек</p>
                    <p className="text-[1rem] font-semibold">17 540 тг</p>
                </div>
                <div className='flex justify-center border-l-1  pl-2 flex-col text-start '>
                    <p className="text-gray-500 mt-1">Продано</p>
                    <p className="text-1xl font-semibold">121</p>
                </div>
            </div>

            <Card.Section className="flex justify-between py-2 px-4 border-t border-gray-200 dark:border-gray-700">
            </Card.Section>
            <Group justify="space-between" mt="xl" />
            <div className='flex flex-row gap-5 justify-center'>
                <Button text="Download" bgColor="#1e4db6" borderRadius="24px" icon={<FaFileDownload />} />
                <Button text="Share" bgColor="#1e4db6" borderRadius="24px" icon={<FaShare />} />
            </div>
        </Card>
    );
    }

export default CardWithStats