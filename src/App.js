import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { FiSettings } from 'react-icons/fi';
import { TooltipComponent } from '@syncfusion/ej2-react-popups';

import { Navbar, Footer, Sidebar, ThemeSettings } from './components';
import { General, Sales, NoAccess, LogInForm, ComingSoon, Sklad, Finance, Workers, Loader } from './pages';
import './App.css';

import { useStateContext } from './contexts/ContextProvider';

import { dealsDataCollector } from './data/Finance/WeekDataFinanceFormer';
import { monthDealsDataCollector } from './data/Finance/MonthDataFinanceFormer';
import { weekDataSalesFormer } from './data/Sales/WeekDataSalesFormer';
import { monthDataSalesFormer } from './data/Sales/MonthDataSalesFormer';

import { fetchDeals } from './methods/getDeals';
import { fetchLeads } from './methods/getLeads';

import { fetchDealsFront } from './methods/getDealsFront';
import { fetchLeadsFront } from './methods/getLeadsFront';

import { getDateRange } from './methods/getDateRange';

import { getKKMReceipts } from './methods/getKKMReceipts';
import { getSalesReceipts } from './methods/getSalesReceipts';
import { getSalesProducts } from './methods/getSalesProducts';

const App = () => {
  const { isLoggedIn, setCurrentColor, setCurrentMode, currentMode, activeMenu, currentColor, themeSettings, setThemeSettings } = useStateContext();
  const [ hasAccess, setHasAccess ] = useState(false);
  const [ loading, setLoading ] = useState(true);

  // deals data for periods
  const [ dayFinanceData, setDayDealsData ] = useState([]);
  const [ weekFinanceData, setWeekDealsData ] = useState([]);
  const [ monthFinanceData, setMonthDealsData ] = useState([]);

  // leads data for periods
  const [ dayLeadsData, setDayLeadsData ] = useState([]);
  const [ weekLeadsData, setWeekLeadsData ] = useState([]);
  const [ monthLeadsData, setMonthLeadsData ] = useState([]);


  //sales KKM Receipts 
  const [ kkm, setKkm ] = useState({
    kkmDay: {},
    kkmWeek: {},
    kkmMonth: {}
  })
  const [ sales1C, setSales1C ] = useState({
    sales1CDay: {},
    sales1CWeek: {},
    sales1CMonth: {}
  });

  const [ products1C, setProducts1C ] = useState({
    products1CDay: {},
    products1CWeek: {},
    products1CMonth: {},
  });
  
  useEffect(() => {
    async function collector() {
      setLoading(true); // Start by setting loading to true
      try {
        const currentThemeColor = localStorage.getItem('colorMode');
        const currentThemeMode = localStorage.getItem('themeMode');
        if (currentThemeColor && currentThemeMode) {
          setCurrentColor(currentThemeColor);
          setCurrentMode(currentThemeMode);
        }

        const dateDay = getDateRange('today');
        const dateWeek = getDateRange('week');
        const dateMonth = getDateRange('month');
        const dateYear = getDateRange('year');

        const [
          dealsDataDay,
          dealsDataWeek,
          dealsDataMonth,

          leadsDataDay,
          leadsDataWeek,
          leadsDataMonth,

          kkmReceiptsDay,
          kkmReceiptsWeek,
          kkmReceiptsMonth,

          salesProductsDay,
          salesProductsWeek,
          salesProductsMonth,

          salesReceiptsDay,
          salesReceiptsWeek,
          salesReceiptsMonth,
        ] = await Promise.all([
          fetchDealsFront(dateWeek),
          fetchDealsFront(dateWeek),
          fetchDealsFront(dateMonth),

          fetchLeadsFront(dateDay),
          fetchLeadsFront(dateWeek),
          fetchLeadsFront(dateMonth),

          getKKMReceipts(dateDay),
          getKKMReceipts(dateWeek),
          getKKMReceipts(dateMonth),

          getSalesProducts(dateDay),
          getSalesProducts(dateWeek),
          getSalesProducts(dateMonth),

          getSalesReceipts(dateDay),
          getSalesReceipts(dateWeek),
          getSalesReceipts(dateMonth),
        ]);

        if (!dealsDataDay || !dealsDataWeek || !dealsDataMonth) {
          throw new Error('Failed to fetch data at deals');
        } else if(!leadsDataDay || !leadsDataWeek || !leadsDataMonth){
          throw new Error('Failed to fetch data at leads');
        } 
        // else if(!salesReceiptsDay){
        //   throw new Error('Failed to fetch data at data from 1C');
        // } else if(!kkmReceiptsDay){
        //   throw new Error('Failed to fetch data at data from 1C');
        // }
        
        // formedDataDay.date = dayDate;
        // formedDataWeek.date = weekDate;
        // formedDataMonth.date = monthDate;
        
        const formedDealsDay = dealsDataCollector(dealsDataDay);
        const formedDealsWeek = dealsDataCollector(dealsDataWeek);
        const formedDealsMonth = monthDealsDataCollector(dealsDataMonth);

        setDayDealsData(formedDealsDay);
        setWeekDealsData(formedDealsWeek);
        setMonthDealsData(formedDealsMonth);

        const formedLeadsDay = weekDataSalesFormer(leadsDataDay);
        const formedLeadsWeek = weekDataSalesFormer(leadsDataWeek);
        const formedLeadsMonth = monthDataSalesFormer(leadsDataMonth);

        setDayLeadsData(formedLeadsDay);
        setWeekLeadsData(formedLeadsWeek);
        setMonthLeadsData(formedLeadsMonth);

        // // // leadsDataDay.date = dayDate,
        // // // leadsDataWeek.date = weekDate;
        // // // leadsDataMonth.date = monthDate;

        setKkm({
          kkmDay: kkmReceiptsDay,
          kkmWeek: kkmReceiptsWeek,
          kkmMonth: kkmReceiptsMonth
        })

        setSales1C({
          sales1CDay: salesReceiptsDay,
          sales1CWeek: salesReceiptsWeek,
          sales1CMonth: salesReceiptsMonth
        });

        setProducts1C({
          products1CDay: salesProductsDay,
          products1CWeek: salesProductsWeek,
          products1CMonth: salesProductsMonth,
        });

      } catch (error) {
        console.error('Error during data fetching and processing:', error);
      } finally {
        setLoading(false); // Ensure loading is set to false after processing
      }
    }
    collector();
  }, []);

  return (
   
      <div className={currentMode === 'Dark' ? 'dark' : ''}>
        {loading  ? (
          <Loader />
        ) : (
        <BrowserRouter>
         { isLoggedIn === true ? (<>
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
                        sales1C={sales1C}
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
