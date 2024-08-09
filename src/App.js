import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { FiSettings } from 'react-icons/fi';
import { TooltipComponent } from '@syncfusion/ej2-react-popups';

import { Navbar, Footer, Sidebar, ThemeSettings } from './components';
import { General, Sales, NoAccess, LogInForm, ComingSoon, Sklad, Finance, Workers, Loader } from './pages';
import { Skeleton } from '@mui/material';
import './App.css';

import { useStateContext } from './contexts/ContextProvider';

import { fetchDeals } from './methods/getDeals';
import { fetchLeads } from './methods/getLeads';

import { getSalesProducts } from './methods/getSalesProducts';
import { getSpisanie } from './methods/getSpisanie';

import { getKKMReceiptsFront } from './methods/getKKMReceiptsFront';
import { getSalesReceiptsFront } from './methods/getSalesReceiptsFront';
import { getSalesProductsFront } from './methods/getSalesProductsFront';

const App = () => {
  const { skeletonUp, handleSkeleton, dateRanges, isLoggedIn, setCurrentColor, setCurrentMode, currentMode, activeMenu, currentColor, themeSettings, setThemeSettings } = useStateContext();
  const [ hasAccess, setHasAccess ] = useState(false);
  const [ loading, setLoading ] = useState(true);

  const [data, setData] = useState({
    kkm: { kkmDay: {}, kkmWeek: {}, kkmMonth: {} },
    sales1C: { sales1CDay: {}, sales1CWeek: {}, sales1CMonth: {} },
    products1C: { products1CDay: {}, products1CWeek: {}, products1CMonth: {} },
    deals: { dealsDay: [], dealsWeek: [], dealsMonth: [] },
    leads: { leadsDay: [], leadsWeek: [], leadsMonth: [] },
    spisanie: { spisanieDay: [], spisanieWeek: [], spisanieMonth: [] },
    weekSalesSeries: {},
    conversionSeries: {},
  });

  useEffect(() => {
    async function collector() {
      handleSkeleton(true);
      setLoading(false);
      try {
        const currentThemeColor = localStorage.getItem('colorMode');
        const currentThemeMode = localStorage.getItem('themeMode');
        if (currentThemeColor && currentThemeMode) {
          setCurrentColor(currentThemeColor);
          setCurrentMode(currentThemeMode);
        }
        const [
          kkmFront,
          salesReceiptsFront,
          salesProducts,
          deals,
          leads,
          spisanie
        ] = await Promise.all([
          getKKMReceiptsFront(dateRanges),
          getSalesReceiptsFront(dateRanges),
          getSalesProducts(dateRanges),
          fetchDeals(dateRanges),
          fetchLeads(dateRanges),
          getSpisanie(dateRanges),
        ]);

        const monthLeadsSeries = leads.leadsMonth.series;
        const monthDealsSeries = deals.dealsMonth.salesSeries;
        const salesSeries = kkmFront.monthFormedKKM.salesSeries;
        const weekStartDate = new Date(dateRanges[1].bitrixStartDate);
        const weekEndDate = new Date(dateRanges[1].bitrixEndDate);

        const conversionSeriesCounter = monthLeadsSeries.map((lead, index) => {
            const deal = monthDealsSeries[index];
            if (deal) {
            const conversion = lead.y !== 0 ? Math.round((deal.y / lead.y) * 100) : 0;
            return { x: lead.x, y: conversion };
            }
            return { x: lead.x, y: 0 };
        });

        const weekSalesSeriesCounter = Array.from({ length: 7 }, (_, i) => {
            const currentDay = new Date(weekStartDate);
            currentDay.setDate(weekStartDate.getDate() + i);

            const dayIndex = currentDay.getDate() - 1; // Adjust to align with 0-based index
            const sales = salesSeries[dayIndex] ? salesSeries[dayIndex].y : 0;

            const dayNames = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
            return { x: dayNames[i], y: sales };
        });

        setData({
          deals: {
            dealsDay: deals.dealsDay,
            dealsWeek: deals.dealsWeek,
            dealsMonth: deals.dealsMonth
          },
          leads: {
            leadsDay: leads.leadsDay,
            leadsWeek: leads.leadsWeek,
            leadsMonth: leads.leadsMonth
          },
          kkm: {
            kkmDay: kkmFront.dayFormedKKM,
            kkmWeek: kkmFront.weekFormedKKM,
            kkmMonth: kkmFront.monthFormedKKM
          },
          spisanie: {
            spisanieDay: spisanie.spisanieDay,
            spisanieWeek: spisanie.spisanieWeek,
            spisanieMonth: spisanie.spisanieMonth
          },
          sales1C: {
            sales1CDay: salesReceiptsFront.dayFormedSales1C,
            sales1CWeek: salesReceiptsFront.weekFormedSales1C,
            sales1CMonth: salesReceiptsFront.monthFormedSales1C
          },
          products1C: {
            products1CDay: salesProducts[0],
            products1CWeek: salesProducts[1],
            products1CMonth: salesProducts[2]
          },
          conversionSeries: {
            series: conversionSeriesCounter
          },
          weekSalesSeries: {
            series: weekSalesSeriesCounter
          }
      });
      } catch (error) {
        console.error('Error during data fetching and processing:', error);
      } finally {
        setLoading(false); 
        handleSkeleton(false);
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
                        deals={data.deals}
                        leads={data.leads}
                        spisanie={data.spisanie}
                        sales1C={data.sales1C}
                        products1C={data.products1C}
                        kkm={data.kkm}
                      />)} 
                  />
                  <Route path="/sales" element={(
                      <Sales 
                        deals={data.deals}
                        leads={data.leads}
                        sales1C={data.sales1C}
                        kkm={data.kkm}
                        products1C={data.products1C}
                        spisanie={data.spisanie}
                        conversionSeries={data.conversionSeries}
                        weekSalesSeries={data.weekSalesSeries}
                      />)} 
                  />
                  <Route path="/workers" element={(<Workers />)} />
                  <Route path="/sklad" element={(<Sklad spisanie={data.spisanie}/>)} />

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