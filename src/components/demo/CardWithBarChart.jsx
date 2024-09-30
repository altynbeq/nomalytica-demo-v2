import { useState } from 'react';
import { Card, Image, Text, Group, RingProgress } from '@mantine/core';
import Example from '../ReCharts/AreaChart'
import { Calendar } from 'primereact/calendar';
import { useStateContext } from "../../contexts/ContextProvider";
// import ButtonCopy from './MantineBtns'
import { Button } from '../';
import BarChartRe from './BarChart'
import { FaShare, FaFileDownload } from "react-icons/fa";

const  CardWithBarChart = ({kkm, deals}) => {
    const { dateRanges } = useStateContext();
    const [ salesNumber, setSalesNumber ] = useState(kkm.totalNumberSales);
    const [ dealsCount, setDealsCount ] = useState(deals.leadsCount);

    const [dates, setDates] = useState([new Date(dateRanges[1].startDate.replace('%20', ' ')), new Date(dateRanges[1].endDate.replace('%20', ' '))]);
    
    const stats = [
        { title: 'Выручка', value: '25 671 177тг' },
        { title: 'Средний чек', value: '15 446тг' },
        { title: 'Score', value: '88/100' },
    ];
    const handleDateChange = async (e) => {
        if(e[1]){
         console.log("hellooo")
        }
    }

    const list = [
        { "x": "Thursday", "y": 1678900 },
        { "x": "Friday", "y": 1345670 },
        { "x": "Saturday", "y": 1593450 },
        { "x": "Sunday", "y": 1427500 },
        { "x": "Monday", "y": 1489200 },
        { "x": "Tuesday", "y": 1100000 },
        { "x": "Wednesday", "y": 1900000 }
    ]
    
    let stackedCustomSeries = [
        { 
        dataSource: list,
        xName: 'x',
        yName: 'y',
        name: 'Продажи',
        type: 'StackingColumn',
        background: 'blue',
        },
    ];
    
    let stackedPrimaryYAxis = {
        lineStyle: { width: 0 },
        minimum: 400000,
        maximum: 2500000,
        interval: 100000,
        majorTickLines: { width: 0 },
        majorGridLines: { width: 1 },
        minorGridLines: { width: 1 },
        minorTickLines: { width: 0 },
        labelFormat: '{value}',
    };
    
    let stackedPrimaryXAxis = {
    majorGridLines: { width: 0 },
    minorGridLines: { width: 0 },
    majorTickLines: { width: 0 },
    minorTickLines: { width: 0 },
    interval: 1,
    lineStyle: { width: 0 },
    labelIntersectAction: 'Rotate45',
    valueType: 'Category',
    };

    const items = stats.map((stat) => (
        <div key={stat.title} className='border-t-1 pr-2'>
            <Text size="xs" color="dimmed">
            {stat.title}
            </Text>
            <Text fw={500} size="sm">
            {stat.value}
            </Text>
        </div>
    ));

        return (
            <Card withBorder padding="lg" className="bg-white dark:text-gray-200 dark:bg-secondary-dark-bg my-3 p-4 text-center justify-center align-center w-[90%] md:w-[42%]  rounded-2xl subtle-border">
                <div className="flex flex-row justify-between mb-2 gap-4 w-[100%]">
                    <div className='flex flex-row gap-2 text-center'>
                        <h2 className="text-black font-bold text-1xl">Продажи</h2>
                    </div>
                    <div className="flex flex-wrap border-solid border-1 rounded-xl border-black px-2 gap-1">
                        <Calendar value={dates} onChange={(e) => {
                            handleDateChange(e.value)
                            setDates(e.value)
                            }} selectionMode="range" readOnlyInput hideOnRangeSelection 
                        />
                    
                    </div>
                </div>
               
            <div className='w-[100%] h-[300px] mt-6 '>
                <BarChartRe />
            </div>
            {/* <Card.Section >
                <Example />
            </Card.Section> */}
             
                
             <div className="  border-t-1 pr-2 flex py-2 flex-row md:w-[100%] gap-8 justify-center ">
                <div className='flex justify-center  border-color  flex-col text-start '>
                    <p className="text-gray-500 mt-1">Продаж</p>
                    <span className="text-1xl ">{salesNumber}</span>
                </div>
                <div className='flex md:border-l-1 pl-2 flex-col text-start'>
                    <p className="text-gray-500 mt-1">Онлайн продаж</p>
                    <p className="text-[1rem] font-semibold">{dealsCount}</p>
                </div>
                <div className='flex justify-center border-l-1  pl-2 flex-col text-start '>
                    <p className="text-gray-500 mt-1">Доля онлайн</p>
                    <p className="text-1xl font-semibold">{Math.round((dealsCount  * 100)/salesNumber)}%</p>
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

export default CardWithBarChart