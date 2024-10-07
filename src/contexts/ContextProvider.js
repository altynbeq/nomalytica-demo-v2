import React, { createContext, useContext, useState, useEffect } from 'react';
import { getDateRange } from '../methods/getDateRange';

const StateContext = createContext();

const initialState = {
  chat: false,
  cart: false,
  userProfile: false,
  notification: false,
};

export const ContextProvider = ({ children }) => {
  
  const [screenSize, setScreenSize] = useState(undefined);
  const [currentColor, setCurrentColor] = useState('#1E4DB7');
  const [currentMode, setCurrentMode] = useState('Light');
  const [themeSettings, setThemeSettings] = useState(false);
  const [activeMenu, setActiveMenu] = useState(false);
  const [isClicked, setIsClicked] = useState(initialState);
  const [ skeletonUp, setSkeletonUp ] = useState(true);
  const [ isLoading, setLoading ] = useState(true);
  const [ kkm, setKKM ] = useState({});
  const [ receipts, setReceipts ] = useState({});
  const [ spisanie, setSpisanie ] = useState({});
  const [ leads, setLeads ] = useState({
    dateSaved: '2024-10-05',
    IS_RETURN_CUSTOMER: {
      N: 2567,
      Y: 2137
    },
    leadsCount: 4704,
    leadsSource: {
      Instagram: 0,
      WhatsApp: 0,
      Другое: 4704
    },
    series: [
      { x: '1', y: 531 },
      { x: '2', y: 955 },
      { x: '3', y: 1704 },
      { x: '4', y: 1034 },
      { x: '5', y: 480 },
      { x: '6', y: 0 },
      { x: '7', y: 0 },
      { x: '8', y: 0 },
      { x: '9', y: 0 },
      { x: '10', y: 0 },
      { x: '11', y: 0 },
      { x: '12', y: 0 },
      { x: '13', y: 0 },
      { x: '14', y: 0 },
      { x: '15', y: 0 },
      { x: '16', y: 0 },
      { x: '17', y: 0 },
      { x: '18', y: 0 },
      { x: '19', y: 0 },
      { x: '20', y: 0 },
      { x: '21', y: 0 },
      { x: '22', y: 0 },
      { x: '23', y: 0 },
      { x: '24', y: 0 },
      { x: '25', y: 0 },
      { x: '26', y: 0 },
      { x: '27', y: 0 },
      { x: '28', y: 0 },
      { x: '29', y: 0 },
      { x: '30', y: 0 },
      { x: '31', y: 0 }
    ],
    workersStats: {
      1: { count: 3543 },
      1078: { count: 9 },
      1154: { count: 50 },
      1181: { count: 839 },
      4786: { count: 9 },
      58510: { count: 1 },
      70040: { count: 72 },
      74254: { count: 3 },
      76344: { count: 23 },
      87212: { count: 3 },
      91144: { count: 6 },
      109038: { count: 18 },
      155510: { count: 2 },
      165536: { count: 48 },
      171292: { count: 2 },
      172030: { count: 9 },
      175226: { count: 5 },
      182396: { count: 2 },
      187358: { count: 6 },
      198362: { count: 42 },
      204676: { count: 1 },
      208046: { count: 11 }
    },
  });
  const [ deals, setDeals ] = useState({});

  const setMode = (e) => {
    setCurrentMode(e.target.value);
    localStorage.setItem('themeMode', e.target.value);
  };
  
  const dateDay = getDateRange('today');
  const dateWeek = getDateRange('week');
  const dateMonth = getDateRange('month');

  const dateRanges = [dateDay, dateWeek, dateMonth];



  const setColor = (color) => {
    setCurrentColor(color);
    localStorage.setItem('colorMode', color);
  };

  const handleClick = (clicked) => setIsClicked({ ...initialState, [clicked]: true });

  return (
    // eslint-disable-next-line react/jsx-no-constructed-context-values
    <StateContext.Provider value={{ leads, setLeads, deals, setDeals, receipts, setReceipts, spisanie, setSpisanie, isLoading, setLoading, kkm, setKKM, skeletonUp, setSkeletonUp, dateRanges, currentColor, currentMode, activeMenu, screenSize, setScreenSize, handleClick, isClicked, initialState, setIsClicked, setActiveMenu, setCurrentColor, setCurrentMode, setMode, setColor, themeSettings, setThemeSettings }}>
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
