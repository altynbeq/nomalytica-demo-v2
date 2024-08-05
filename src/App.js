import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { FiSettings } from 'react-icons/fi';
import { TooltipComponent } from '@syncfusion/ej2-react-popups';

import { Navbar, Footer, Sidebar, ThemeSettings } from './components';
import { General, Sales, NoAccess, LogInForm, ComingSoon, Sklad, Finance, Workers, Loader } from './pages';
import { Skeleton } from '@mui/material';
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

import { getKKMReceiptsFront } from './methods/getKKMReceiptsFront';
import { getSalesReceiptsFront } from './methods/getSalesReceiptsFront';

const App = () => {
  const { skeletonUp, handleSkeleton, dateRanges, isLoggedIn, setCurrentColor, setCurrentMode, currentMode, activeMenu, currentColor, themeSettings, setThemeSettings } = useStateContext();
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

  const [data, setData] = useState({
    kkm: { kkmDay: {}, kkmWeek: {}, kkmMonth: {} },
    sales1C: { sales1CDay: {}, sales1CWeek: {}, sales1CMonth: {} },
    products1C: { products1CDay: {}, products1CWeek: {}, products1CMonth: {} }
  });
  useEffect(() => {
    async function collector() {
      setLoading(false); // Start by setting loading to true
      try {
        const currentThemeColor = localStorage.getItem('colorMode');
        const currentThemeMode = localStorage.getItem('themeMode');
        if (currentThemeColor && currentThemeMode) {
          setCurrentColor(currentThemeColor);
          setCurrentMode(currentThemeMode);
        }

        // try to optimise fetch 
        const [
          // kkmFront,
          // kkmReceiptsFront,
          kkmReceipts,
          salesProducts,
          salesReceipts
        ] = await Promise.all([
          // getKKMReceiptsFront(dateRanges),
          // getSalesReceiptsFront(dateRanges),
          getKKMReceipts(dateRanges),
          getSalesProducts(dateRanges),
          getSalesReceipts(dateRanges)
        ]);

        setData({
          // ...data,
          kkm: {
            kkmDay: kkmReceipts[0],
            kkmWeek: kkmReceipts[1],
            kkmMonth: kkmReceipts[2]
          },
          sales1C: {
            sales1CDay: salesReceipts[0],
            sales1CWeek: salesReceipts[1],
            sales1CMonth: salesReceipts[2]
          },
          products1C: {
            products1CDay: salesProducts[0],
            products1CWeek: salesProducts[1],
            products1CMonth: salesProducts[2]
          }
        });
      } catch (error) {
        console.error('Error during data fetching and processing:', error);
      } finally {
        // setLoading(false); // Ensure loading is set to false after processing
        handleSkeleton();
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
                {/* <button
                  type="button"
                  onClick={() => setThemeSettings(true)}
                  style={{ background: currentColor, borderRadius: '50%' }}
                  className="text-3xl text-white p-3 hover:drop-shadow-xl hover:bg-light-gray"
                >
                  <FiSettings />
                </button> */}

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
                {/* {themeSettings && (<ThemeSettings />)} */}

                <Routes>
                  {/* dashboard  */}
                  <Route path="/" element={(<General />)} />
                  <Route path="/general" element={(<General />)} />
                  <Route path="/finance" element={(
                      <Finance 
                        weekFinanceData={weekFinanceData} 
                        dayFinanceData={dayFinanceData} 
                        monthFinanceData={monthFinanceData}
                        sales1C={data.sales1C}
                        products1C={data.products1C}
                        kkm={data.kkm}
                      />)} 
                  />
                  <Route path="/sales" element={(
                      <Sales 
                        dayFinanceData={dayFinanceData} 
                        weekFinanceData={weekFinanceData} 
                        monthFinanceData={monthFinanceData}
                        weekLeadsData={weekLeadsData} 
                        dayLeadsData={dayLeadsData}  
                        sales1C={data.sales1C}
                        kkm={data.kkm}
                        products1C={data.products1C}
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
