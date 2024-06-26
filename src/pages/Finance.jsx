import React, { useEffect, useState } from 'react';
import { useStateContext } from '../contexts/ContextProvider';
import { RevenueByMonthsStacked, EarlyRevenueStats, DailyRevenue, WeaklyRevenueOverviewStacked, TotalRevenuePie, WeaklyStatistics, TotalRevenueChart } from '../components/Finance';
import { OverallRevenueChart , MonthlyRevenueChart} from '../components/Finance';

const Finance = ({dayFinanceData, weekFinanceData, monthFinanceData}) => {
  const { currentColor, currentMode } = useStateContext();
  const [loading, setLoading] = useState(true);
  
  return (
    <div className="mt-12">
        <div>
          <div className="flex flex-wrap lg:flex-nowrap gap-5 justify-center">
              <RevenueByMonthsStacked 
                weekFinanceData={weekFinanceData} 
              />
              <EarlyRevenueStats 
                weekFinanceData={weekFinanceData} 
              />
          </div>

          <div className="flex gap-4 flex-wrap justify-center">
            <DailyRevenue 
              dayFinanceData={dayFinanceData} 
            />
            <div>
              <WeaklyRevenueOverviewStacked />
              <TotalRevenuePie />
            </div>
          </div>

          <div className="flex gap-8 m-4 flex-wrap justify-center">
            <WeaklyStatistics 
              weekFinanceData={weekFinanceData} 
            />
            <OverallRevenueChart />
          </div>
          <div className="flex gap-8 m-4 flex-wrap justify-center">
            <MonthlyRevenueChart 
              monthFinanceData={monthFinanceData} 
            />
          </div>
        </div>
    </div>
  );
};

export default Finance;