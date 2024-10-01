import React, { useEffect, useState, useRef } from 'react';
import { Skeleton } from '../../components';
import { Calendar } from 'primereact/calendar';
import { useStateContext } from '../../contexts/ContextProvider';
import ProgressCardColored from '../demo/ProgressLine';
import { Stepper } from 'primereact/stepper';
import { StepperPanel } from 'primereact/stepperpanel';

const panelData = [
  {
    header: 'Алматы',
    value: '732,331 тг',
    percentage: 23,
    kaspiStats: [
      { title: 'Kaspi', value: 50, current: 55, total: 120 },
      { title: 'Halyk', value: 50, current: 55, total: 120 },
      { title: 'Jusan', value: 20, current: 55, total: 120 },
      { title: 'Cash', value: 40, current: 55, total: 120 },
      { title: 'Undefined', value: 40, current: 55, total: 120 },
    ]
  },
  {
    header: 'Сатпаева',
    value: '732,331 тг',
    percentage: 37,
    kaspiStats: [
      { title: 'Kaspi', value: 30, current: 55, total: 120 },
      { title: 'Halyk', value: 80, current: 55, total: 120 },
      { title: 'Jusan', value: 80, current: 55, total: 120 },
      { title: 'Cash', value: 80, current: 55, total: 120 },
      { title: 'Undefined', value: 40, current: 55, total: 120 },
    ]
  },
  {
    header: 'Панфилова',
    value: '732,331 тг',
    percentage: 40,
    kaspiStats: [
      { title: 'Kaspi', value: 70, current: 55, total: 120 },
      { title: 'Halyk', value: 40, current: 55, total: 120 },
      { title: 'Jusan', value: 20, current: 55, total: 120 },
      { title: 'Cash', value: 10, current: 55, total: 120 },
      { title: 'Undefined', value: 40, current: 55, total: 120 },
    ]
  }
];

const PaidToAmount = ({ id, comb, title, sales1C, kkm }) => {
  const { dateRanges } = useStateContext();
  const stepperRef = useRef(null);
  
  const [dates, setDates] = useState([
    new Date(dateRanges[1].startDate.replace('%20', ' ')),
    new Date(dateRanges[1].endDate.replace('%20', ' '))
  ]);
  const [ready, setReady] = useState(false);
  const [pieSeries, setSeries] = useState([]);
  const formattedTotalSum = new Intl.NumberFormat().format(Math.round(sales1C.totalSum));

  const handleDateChange = async (e) => {
    if (e[1]) {
      // Handle date change logic here
      console.log('Date changed');
    }
  };

  useEffect(() => {
    if (!sales1C || !sales1C.paidTo) return;

    const { paidTo } = sales1C;
    const total = sales1C.totalSum;

    const seriesCollector = () => {
      const seriesData = Object.entries(paidTo).map(([key, value]) => {
        const roundedValue = Math.round(value);
        const percentage = ((value / total) * 100).toFixed(2) + '%';
        return { x: key, y: roundedValue, text: percentage };
      });

      setSeries(seriesData);
    };

    seriesCollector();
    setReady(true);
  }, [sales1C]);

  if (!ready) {
    return <Skeleton />;
  }

  return (
    <div className={`bg-white dark:text-gray-200 overflow-hidden dark:bg-secondary-dark-bg rounded-2xl w-[90%] md:w-[${comb ? '43%' : '43%'}] p-4 flex flex-col subtle-border`}>
      <div className="flex flex-row justify-between mb-4">
        <p className="text-[1rem] font-semibold">{title}</p>
        <div className="flex flex-wrap border-solid border-1 rounded-xl border-black px-2 gap-1">
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
        </div>
      </div>
      <div className="flex flex-row mb-5">
        <h3>Общая: &nbsp;</h3>
        <p className="text-green-400 text-1xl">{formattedTotalSum} тг</p>
      </div>

      <Stepper ref={stepperRef}>
        {panelData.map((panel, index) => (
          <StepperPanel key={index} header={panel.header}>
            <div>
              <section className="flex flex-wrap mb-4">
                <div className="flex flex-row">
                  <h3>{panel.header}: &nbsp;</h3>
                  <p className="text-1xl">{panel.value}</p>
                  <span className="p-1 hover:drop-shadow-xl cursor-pointer rounded-full text-white bg-green-400 ml-3 text-[10px]">
                    {panel.percentage}%
                  </span>
                </div>
              </section>
              <section className="flex flex-col gap-6">
                {panel.kaspiStats.map((stat, index) => (
                  <div key={index} className="flex flex-col">
                    <div className="flex flex-row gap-2">
                      <h3>{stat.title}</h3>
                      <p>${stat.current}/{stat.total} ({stat.value}%)</p>
                    </div>
                    <ProgressCardColored value={stat.value} />
                  </div>
                ))}
              </section>
            </div>
          </StepperPanel>
        ))}
      </Stepper>
    </div>
  );
};

export default PaidToAmount;
