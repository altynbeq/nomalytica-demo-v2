import React, { useEffect, useState, useRef } from 'react'
import { Skeleton } from '../../components';
import { Calendar } from 'primereact/calendar';
import { useStateContext } from "../../contexts/ContextProvider";
import ProgressCardColored from '../demo/ProgressLine';
import { Stepper } from 'primereact/stepper';
import { StepperPanel } from 'primereact/stepperpanel'

const PaidToAmount = ({id, comb, title, sales1C, kkm }) => {
  const { dateRanges } = useStateContext();
  const stepperRef = useRef(null);

  const [dates, setDates] = useState([new Date(dateRanges[1].startDate.replace('%20', ' ')), new Date(dateRanges[1].endDate.replace('%20', ' '))]);
  const [ ready, setReady ] = useState(false);
  const [ pieSeries, setSeries ] = useState([]);
  const formattedTotalSum =  new Intl.NumberFormat().format(Math.round(sales1C.totalSum));
  
  const handleDateChange = async (e) => {
    if(e[1]){
     console.log("hellooo")
    }
  }

  useEffect(()=>{
    if (!sales1C || !sales1C.paidTo) {
      return;
    }
    const { paidTo } = sales1C;
    const total = sales1C.totalSum; // Assuming total is directly available in sales1C

    function seriesCollector() {
      const seriesData = Object.entries(paidTo).map(([key, value]) => {
        const roundedValue = Math.round(value);
        const percentage = ((value / total) * 100).toFixed(2) + '%';
        return {
          x: key,
          y: roundedValue,
          text: percentage
        };
      });

      setSeries(seriesData);
    }

    seriesCollector();
    setReady(true);
  }, [])

  if(!ready){
    return(
      <Skeleton />
    )
  }
  const height = '150px';

  return (
    <div className={`bg-white dark:text-gray-200 overflow-hidden dark:bg-secondary-dark-bg rounded-2xl w-[90%] md:w-[${comb ? '43%' : '43%'}] p-4  flex flex-col   subtle-border`}>
        <div className='flex flex-row justify-between mb-4 '>
          <div className=''>
            <p className="text-[1rem] font-semibold ">{title}</p>
          </div>
          <div className="flex flex-wrap border-solid border-1 rounded-xl border-black px-2 gap-1">
                    <Calendar value={dates} onChange={(e) => {
                  handleDateChange(e.value)
                  setDates(e.value)
                }} selectionMode="range" readOnlyInput hideOnRangeSelection />
          </div>
        </div>
        <div className='flex flex-row mb-5'>
          <h3>Общая: &nbsp;</h3> 
          <p className="text-green-400 text-1xl">  { formattedTotalSum} тг</p>
        </div>

        <Stepper ref={stepperRef} >
            <StepperPanel header='Магазин'>
              <section className='flex flex-wrap mb-4'>
                <div className='flex flex-row'>
                  <h3>Магазин Абая: &nbsp;</h3> 
                  <p className=" text-1xl"> 732,331 тг</p>
                  <span className="p-1 hover:drop-shadow-xl cursor-pointer rounded-full text-white bg-green-400 ml-3 text-[10px]">
                    23%
                  </span>
                </div>
              </section>
              <section className='flex flex-col gap-6'>
                <div className='flex flex-col'>
                  <div className='flex flex-col'>
                    <div className='flex flex-row gap-2'>
                      <h3>Kaspi</h3>
                      <p>$55/$120 (30%)</p>
                    </div>
                    <ProgressCardColored value={30} />
                  </div>
                </div>
                <div className='flex flex-col'>
                  <div className='flex flex-col'>
                    <div className='flex flex-row gap-2'>
                      <h3>Kaspi</h3>
                      <p >$55/$120 (30%)</p>
                    </div>
                    <ProgressCardColored value={80} />
                  </div>
                </div>
                <div className='flex flex-col'>
                  <div className='flex flex-col'>
                    <div className='flex flex-row gap-2'>
                      <h3>Kaspi</h3>
                      <p >$55/$120 (30%)</p>
                    </div>
                    <ProgressCardColored value={80} />
                  </div>
                </div>
                <div className='flex flex-col'>
                  <div className='flex flex-col'>
                    <div className='flex flex-row gap-2'>
                      <h3>Kaspi</h3>
                      <p >$55/$120 (30%)</p>
                    </div>
                    <ProgressCardColored value={80} />
                  </div>
                </div>
                <div className='flex flex-col'>
                  <div className='flex flex-col'>
                    <div className='flex flex-row gap-2'>
                      <h3>Kaspi</h3>
                      <p >$55/$120 (30%)</p>
                    </div>
                    <ProgressCardColored value={80} />
                  </div>
                </div>
              </section>
            </StepperPanel>
            <StepperPanel header='Магазин'>
              <section className='flex flex-col mb-4'>
                <div className='flex flex-row'>
                  <h3>Магазин Абая: &nbsp;</h3> 
                  <p className=" text-1xl"> 732,331 тг</p>
                  <span className="p-1 hover:drop-shadow-xl cursor-pointer rounded-full text-white bg-green-400 ml-3 text-[10px]">
                    23%
                  </span>
                </div>
              </section>
              <section className='flex flex-col gap-6'>
                <div className='flex flex-col'>
                  <div className='flex flex-col'>
                    <div className='flex flex-row gap-2'>
                      <h3>Kaspi</h3>
                      <p>$55/$120 (30%)</p>
                    </div>
                    <ProgressCardColored value={30} />
                  </div>
                </div>
                <div className='flex flex-col'>
                  <div className='flex flex-col'>
                    <div className='flex flex-row gap-2'>
                      <h3>Kaspi</h3>
                      <p >$55/$120 (30%)</p>
                    </div>
                    <ProgressCardColored value={80} />
                  </div>
                </div>
                <div className='flex flex-col'>
                  <div className='flex flex-col'>
                    <div className='flex flex-row gap-2'>
                      <h3>Kaspi</h3>
                      <p >$55/$120 (30%)</p>
                    </div>
                    <ProgressCardColored value={80} />
                  </div>
                </div>
                <div className='flex flex-col'>
                  <div className='flex flex-col'>
                    <div className='flex flex-row gap-2'>
                      <h3>Kaspi</h3>
                      <p >$55/$120 (30%)</p>
                    </div>
                    <ProgressCardColored value={80} />
                  </div>
                </div>
                <div className='flex flex-col'>
                  <div className='flex flex-col'>
                    <div className='flex flex-row gap-2'>
                      <h3>Kaspi</h3>
                      <p >$55/$120 (30%)</p>
                    </div>
                    <ProgressCardColored value={80} />
                  </div>
                </div>
              </section>
            </StepperPanel>
            <StepperPanel header='Магазин'>
              <section className='flex flex-col mb-4'>
                <div className='flex flex-row'>
                  <h3>Магазин Абая: &nbsp;</h3> 
                  <p className=" text-1xl"> 732,331 тг</p>
                  <span className="p-1 hover:drop-shadow-xl cursor-pointer rounded-full text-white bg-green-400 ml-3 text-[10px]">
                    23%
                  </span>
                </div>
              </section>
              <section className='flex flex-col gap-6'>
                <div className='flex flex-col'>
                  <div className='flex flex-col'>
                    <div className='flex flex-row gap-2'>
                      <h3>Kaspi</h3>
                      <p>$55/$120 (30%)</p>
                    </div>
                    <ProgressCardColored value={30} />
                  </div>
                </div>
                <div className='flex flex-col'>
                  <div className='flex flex-col'>
                    <div className='flex flex-row gap-2'>
                      <h3>Kaspi</h3>
                      <p >$55/$120 (30%)</p>
                    </div>
                    <ProgressCardColored value={80} />
                  </div>
                </div>
                <div className='flex flex-col'>
                  <div className='flex flex-col'>
                    <div className='flex flex-row gap-2'>
                      <h3>Kaspi</h3>
                      <p >$55/$120 (30%)</p>
                    </div>
                    <ProgressCardColored value={80} />
                  </div>
                </div>
                <div className='flex flex-col'>
                  <div className='flex flex-col'>
                    <div className='flex flex-row gap-2'>
                      <h3>Kaspi</h3>
                      <p >$55/$120 (30%)</p>
                    </div>
                    <ProgressCardColored value={80} />
                  </div>
                </div>
                <div className='flex flex-col'>
                  <div className='flex flex-col'>
                    <div className='flex flex-row gap-2'>
                      <h3>Kaspi</h3>
                      <p >$55/$120 (30%)</p>
                    </div>
                    <ProgressCardColored value={80} />
                  </div>
                </div>
              </section>
            </StepperPanel>
        </Stepper>
    </div>
  )
}

export default PaidToAmount