import React, { createContext, useContext, useEffect, useState } from 'react';
import { useDataFinance } from '../data/Finance/DataFinance';

export const DataContextProvider = () => {
    const [weeklyDeals, setWeeklyDeals] = useState([]);
    const [dailyDeals, setDailyDeals] = useState([]);
    const [monthlyDeals, setMonthlyDeals] = useState([]);

    const weekDealsData = useDataFinance({type: 'week'});

    
}