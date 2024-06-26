import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { FiSettings } from 'react-icons/fi';
import { TooltipComponent } from '@syncfusion/ej2-react-popups';

import { Navbar, Footer, Sidebar, ThemeSettings } from './components';
import { General, Sales, NoAccess, LogInForm, ComingSoon, Sklad, Finance, Workers, Loader } from './pages';
import './App.css';

import { useStateContext } from './contexts/ContextProvider';

import { fetchDeals } from './methods/getDeals';
import { fetchLeads } from './methods/getLeads';
import { formatDateRange } from './methods/dateFormat';
import { getDateRange } from './methods/getDateRange';
import { dealsDataCollector } from './data/Finance/WeekDataFinanceFormer';
import { monthDealsDataCollector } from './data/Finance/MonthDataFinanceFormer';
import { weekDataSalesFormer } from './data/Sales/WeekDataSalesFormer';
import { monthDataSalesFormer } from './data/Sales/MonthDataSalesFormer';


const App = () => {
  const { isLoggedIn, setCurrentColor, setCurrentMode, currentMode, activeMenu, currentColor, themeSettings, setThemeSettings } = useStateContext();
  const [ hasAccess, setHasAccess ] = useState(false);
  const [ loading, setLoading ] = useState(true);

  // deals data for periods
  const [dayFinanceData, setDayFinanceData] = useState([]);
  const [weekFinanceData, setWeekFinanceData] = useState([]);
  const [monthFinanceData, setMonthFinanceData] = useState([]);

  // leads data for periods
  const [dayLeadsData, setDayLeadsData] = useState([]);
  const [weekLeadsData, setWeekLeadsData] = useState([]);
  const [monthLeadsData, setMonthLeadsData] = useState([]);

  useEffect(() => {
    const currentThemeColor = localStorage.getItem('colorMode');
    const currentThemeMode = localStorage.getItem('themeMode');
    if (currentThemeColor && currentThemeMode) {
      setCurrentColor(currentThemeColor);
      setCurrentMode(currentThemeMode);
    }

    async function collector(){
      // deals bitrix 24

      const dateDay = await getDateRange('today');
      const dataDay = await fetchDeals(dateDay);
      const formedDataDay = await dealsDataCollector(dataDay);
      const dayDate = await formatDateRange('day', dateDay);
      formedDataDay.date = dayDate;
      setDayFinanceData(formedDataDay);

      const dateWeek = await getDateRange('week');
      const dataWeek = await fetchDeals(dateWeek);
      const formedDataWeek = await dealsDataCollector(dataWeek);
      const weekDate = await formatDateRange('week', dateDay);
      formedDataWeek.date = weekDate;
      setWeekFinanceData(formedDataWeek);

      const dateMonth = await getDateRange('month');
      const dataMonth = await fetchDeals(dateMonth);
      const formedDataMonth = await monthDealsDataCollector(dataMonth);
      const monthDate = await formatDateRange('month', dateMonth);
      formedDataMonth.date = monthDate;
      setMonthFinanceData(formedDataMonth);

      const leadsDataDay = await fetchLeads(dateDay);
      const formedDayLeadsData = await weekDataSalesFormer(leadsDataDay);
      const formatedDate = await formatDateRange('day', dateDay);
      formedDayLeadsData.date = formatedDate;
      setDayLeadsData(formedDayLeadsData);

      const leadsDataWeek = await fetchLeads(dateWeek);
      const formedWeekLeadsData = await weekDataSalesFormer(leadsDataWeek);
      formedWeekLeadsData.date = weekDate;
      setWeekLeadsData(formedWeekLeadsData);

      const leadsDataMonth = await fetchLeads(dateMonth);
      const formedMonthLeadsData = await monthDataSalesFormer(leadsDataMonth);
      formedMonthLeadsData.data = monthDate;
      setMonthLeadsData(formedMonthLeadsData);

      setLoading(false);
    }
    collector();
  }, []);

  return (
   
      <div className={currentMode === 'Dark' ? 'dark' : ''}>
        {loading  ? (
          <Loader />
        ) : (
        <BrowserRouter>
         { isLoggedIn == true ? (<>
          <div className="flex relative dark:bg-main-dark-bg">
            <div className="fixed right-4 bottom-4" style={{ zIndex: '1000' }}>
              <TooltipComponent
                content="Settings"
                position="Top"
              >
                <button
                  type="button"
                  onClick={() => setThemeSettings(true)}
                  style={{ background: currentColor, borderRadius: '50%' }}
                  className="text-3xl text-white p-3 hover:drop-shadow-xl hover:bg-light-gray"
                >
                  <FiSettings />
                </button>

              </TooltipComponent>
            </div>
            {activeMenu ? (
              <div className="w-72 fixed sidebar dark:bg-secondary-dark-bg bg-white ">
                <Sidebar />
              </div>
            ) : (
              <div className="w-0 dark:bg-secondary-dark-bg">
                <Sidebar />
              </div>
            )}
            <div
              className={
                activeMenu
                  ? 'dark:bg-main-dark-bg  bg-main-bg min-h-screen md:ml-72 w-full  '
                  : 'bg-main-bg dark:bg-main-dark-bg  w-full min-h-screen flex-2 '
              }
            >
              <div className="fixed md:static bg-main-bg dark:bg-main-dark-bg navbar w-full ">
                <Navbar />
              </div>
              <div>
                {themeSettings && (<ThemeSettings />)}

                <Routes>
                  {/* dashboard  */}
                  <Route path="/" element={(<General />)} />
                  <Route path="/general" element={(<General />)} />
                  <Route path="/finance" element={(
                      <Finance 
                        weekFinanceData={weekFinanceData} 
                        dayFinanceData={dayFinanceData} 
                        monthFinanceData={monthFinanceData} 
                      />)} 
                  />
                  <Route path="/sales" element={(
                      <Sales 
                        dayFinanceData={dayFinanceData} 
                        weekFinanceData={weekFinanceData} 
                        monthFinanceData={monthFinanceData}
                        weekLeadsData={weekLeadsData} 
                        dayLeadsData={dayLeadsData}  
                      />)} 
                  />
                  <Route path="/workers" element={(<Workers />)} />
                  <Route path="/sklad" element={(<Sklad />)} />

                  {/* pages  */}
                  {/* <Route path="/orders" element={<Orders />} /> */}
                  <Route path="/docs" element={<ComingSoon />} />
                  <Route path="/resources" element={<ComingSoon />} />
                  <Route path="/support" element={<ComingSoon />} />
                  <Route path="/Q&A" element={<ComingSoon />} />


                  {/* apps  */}
                  {/* <Route path="/kanban" element={<Kanban />} />
                  <Route path="/editor" element={<Editor />} />
                  <Route path="/calendar" element={<Calendar />} />
                  <Route path="/color-picker" element={<ColorPicker />} /> */}

                  {/* charts  */}
                  {/* <Route path="/line" element={<Line />} />
                  <Route path="/area" element={<Area />} />
                  <Route path="/bar" element={<Bar />} />
                  <Route path="/pie" element={<Pie />} />
                  <Route path="/financial" element={<Financial />} />
                  <Route path="/color-mapping" element={<ColorMapping />} />
                  <Route path="/pyramid" element={<Pyramid />} />
                  <Route path="/stacked" element={<Stacked />} /> */}

                </Routes>
              </div>
              <Footer />
            </div>
          </div>
         </>) :  <LogInForm /> }
        </BrowserRouter>
        )}
      </div>
  )
};

export default App;
