import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { TooltipComponent } from '@syncfusion/ej2-react-popups';
import { GoBell } from "react-icons/go";
import { Navbar, Footer, Sidebar, ThemeSettings } from './components';
import { General, Sales, NoAccess, LogInForm, ComingSoon, Sklad, Finance, Workers, Loader, TechProb } from './pages';
import './App.css';
import { useStateContext } from './contexts/ContextProvider';
import { getSpisanie } from './methods/products&spisanie/getSpisanieFront';
import { getKKMReceiptsFront } from './methods/kkmReceipts/getKKMReceiptsFront';
import { getSalesReceiptsFront } from './methods/salesReceipts/getSalesReceiptsFront';
import { getSalesProductsFront } from './methods/products&spisanie/getSalesProductsFront';
import { fetchDealsFront } from './methods/bitrixDeals/getDealsFront';
import { fetchLeadsFront } from './methods/bitrixLeads/getLeadsFront';
import { Avatar, Button, Container, Flex, Grid, Indicator, Menu, Text, ThemeIcon, Title } from '@mantine/core';
import { TbAdjustmentsDollar } from "react-icons/tb";
import { FaMailBulk } from "react-icons/fa";
import { IoPersonOutline } from "react-icons/io5";

import { chatData } from './data/dummy';
import avatar from './data/avatar.jpg';

const App = () => {
  const { skeletonUp, handleSkeleton, dateRanges, isLoggedIn, setCurrentColor, setCurrentMode, currentMode, activeMenu, currentColor, themeSettings, setThemeSettings } = useStateContext();
  const [ hasAccess, setHasAccess ] = useState(false);
  const [ loading, setLoading ] = useState(true);
  const [ techProblem, setTechProblem ] = useState(false);
  const userType = JSON.parse(localStorage.getItem('nomalyticsTokenAuth'));
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
          deals,
          leads,
          kkmFront,
          salesReceiptsFront,
          salesProducts,
          spisanie
        ] = await Promise.all([
          fetchDealsFront(dateRanges),
          fetchLeadsFront(dateRanges),
          getKKMReceiptsFront(dateRanges),
          getSalesReceiptsFront(dateRanges),
          getSalesProductsFront(dateRanges),
          getSpisanie(dateRanges),
        ]);
        if (!leads || !deals || !kkmFront || !salesReceiptsFront || !salesProducts || !spisanie) {
          // console.error("Data is missing or undefined");
          setTechProblem(true);
          setLoading(false);
          return;
        }

        const monthLeadsSeries = leads.leadsMonth.series;
        const monthDealsSeries = deals.dealsMonth.salesSeries;
        const salesSeries = kkmFront.weekFormedKKM.salesSeries;
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

            const dayNames = ['Thursday', 'Friday', 'Saturday', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', ];
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
            sales1CYesterday: salesReceiptsFront.yesterdayFromedSales1C,
            sales1CMonth: salesReceiptsFront.monthFormedSales1C
          },
          products1C: {
            products1CDay: salesProducts.dayFormedSalesProduct,
            products1CWeek: salesProducts.weekFormedSalesProduct,
            products1CMonth: salesProducts.monthFormedSalesProduct
          },
          conversionSeries: {
            series: conversionSeriesCounter
          },
          weekSalesSeries: {
            series: weekSalesSeriesCounter
          }
      });
      } catch (error) {
        // console.error('Error during data fetching and processing:', error);
        setTechProblem(true);
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
              <Container fluid h={60}>
                <Flex gap="md" justify="flex-end" align="center" direction="row">
                  <Menu position="bottom-end" offset={16} shadow="md">
                    <Menu.Target>
                      <Indicator inline withBorder radius="md" size={12}>
                        <ThemeIcon variant="light" size="md" radius="lg">
                          <GoBell size="xl" />
                        </ThemeIcon>
                      </Indicator>
                    </Menu.Target>
                    <Menu.Dropdown>
                      <Menu.Label>
                        <Text size="xl" fw={700}>
                          Notifications
                        </Text>
                      </Menu.Label>
                      {
                        chatData.map((note, index) => {
                          return (
                            <Menu.Item  key={index}>
                              <Flex direction="row" gap={16}>
                                  <Avatar radius="xl" src={note.image} alt={note.message} />
                                <Flex direction="column">
                                  <Text fw={700}>{note.message}</Text>
                                  <Text size="sm">{note.desc}</Text>
                                </Flex>
                              </Flex>
                            </Menu.Item>
                          )
                        })
                      }
                      <Menu.Item>
                        <Button fullWidth>See all notifications</Button>
                      </Menu.Item>
                    </Menu.Dropdown>
                  </Menu>

                  <Menu position="bottom-end" offset={16} shadow="md">
                    <Menu.Target>
                  <Flex direction="row" gap={8} justify="center" align="center">
                    <Avatar radius="xl" src={avatar} alt="it's me" />
                    <Text>Hi,</Text><Text fw={700}>Romantic</Text>
                  </Flex>
                  </Menu.Target>
                    <Menu.Dropdown>
                      <Menu.Label>

                        <Text size="xl" fw={700}>
                          Профиль
                        </Text>

                      </Menu.Label>
                       <Menu.Item>
                        <Flex direction="row" gap={16} justify="flex-start" align="center">
                          <ThemeIcon variant="light" size="md" radius="lg">
                            <IoPersonOutline size="md" />
                          </ThemeIcon>
                          <Flex direction="column">
                            <Text fw={700}>Профиль  </Text>
                            <Text size="sm">Настройка аккаунта</Text>
                          </Flex>
                        </Flex>
                      </Menu.Item>
                      <Menu.Item>
                        <Flex direction="row" gap={16} justify="flex-start" align="center">
                          <ThemeIcon variant="light" size="md" radius="lg">
                            <FaMailBulk size="md" />
                          </ThemeIcon>
                          <Flex direction="column">
                            <Text fw={700}>Почта</Text>
                            <Text size="sm">Messages & Emails</Text>
                          </Flex>
                        </Flex>
                      </Menu.Item>
                      <Menu.Item>
                        <Flex direction="row" gap={16} justify="flex-start" align="center">
                          <ThemeIcon variant="light" size="md" radius="lg">
                            <TbAdjustmentsDollar size="xl" />
                          </ThemeIcon>
                          <Flex direction="column">
                            <Text fw={700}>Подписка</Text>
                            <Text size="sm">Оплаты и сроки</Text>
                          </Flex>
                        </Flex>
                      </Menu.Item>
                      <Menu.Item>
                        <Button fullWidth>Выйти</Button>
                      </Menu.Item>
                    </Menu.Dropdown>
                  </Menu>

                </Flex>
              </Container>
              <div>
                <Routes>
                  {/* dashboard  */}
                  <Route path="/" element={(techProblem ? <TechProb /> : userType.userRole == 'admin' ?
                      <General
                        deals={data.deals}
                        leads={data.leads}
                        spisanie={data.spisanie}
                        sales1C={data.sales1C}
                        products1C={data.products1C}
                        kkm={data.kkm}
                        weekSalesSeries={data.weekSalesSeries}
                      /> : userType.userRole == 'rop' ? <Sales
                      deals={data.deals}
                      leads={data.leads}
                      sales1C={data.sales1C}
                      kkm={data.kkm}
                      products1C={data.products1C}
                      spisanie={data.spisanie}
                      conversionSeries={data.conversionSeries}
                      weekSalesSeries={data.weekSalesSeries}
                    /> : <Sklad spisanie={data.spisanie} products1C={data.products1C}/> )} />
                  <Route path="/general" element={(techProblem ? <TechProb /> :
                    <General
                      deals={data.deals}
                      leads={data.leads}
                      spisanie={data.spisanie}
                      sales1C={data.sales1C}
                      products1C={data.products1C}
                      kkm={data.kkm}
                      weekSalesSeries={data.weekSalesSeries}
                    />)} />
                  <Route path="/finance" element={( techProblem ? <TechProb /> :
                      <Finance
                        deals={data.deals}
                        leads={data.leads}
                        spisanie={data.spisanie}
                        sales1C={data.sales1C}
                        products1C={data.products1C}
                        kkm={data.kkm}
                      />)}
                  />
                  <Route path="/sales" element={( techProblem ? <TechProb /> :
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
                  <Route path="/workers" element={(techProblem ? <TechProb /> : <Workers />)} />
                  <Route path="/sklad" element={(techProblem ? <TechProb /> : <Sklad spisanie={data.spisanie} products1C={data.products1C}/>)} />

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