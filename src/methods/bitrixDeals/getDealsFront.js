// function for working with data on "Сделки/Deals" from bitrix24

import { dealsDataCollector } from '../../data/Finance/WeekDataFinanceFormer'
import { monthDealsDataCollector } from '../../data/Finance/MonthDataFinanceFormer';

export async function fetchDealsForRange({ bitrixStartDate, bitrixEndDate }) {
  const webhookUrl = 'https://zhezkazgan-romantic.bitrix24.kz/rest/20509/9gd0f1jaied8rkt4/crm.deal.list.json';
  const batchSize = 50; // Number of items to fetch per request
  let allDeals = [];
  let start = 0;

  try {
    while (true) {
      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          filter: {
            '>=DATE_CREATE': bitrixStartDate,
            '<=DATE_CREATE': bitrixEndDate,
            STAGE_ID: "WON"
          },
          select: [
            'ASSIGNED_BY_ID', 'BEGINDATE', 'CATEGORY_ID', 'CLOSED', 'CLOSEDATE', 'CONTACT_ID', 'CREATED_BY_ID',
            'CURRENCY_ID', 'DATE_CREATE', 'DATE_MODIFY', 'ID', 'IS_MANUAL_OPPORTUNITY', 'IS_NEW', 'IS_RECURRING',
            'IS_REPEATED_APPROACH', 'IS_RETURN_CUSTOMER', 'LAST_ACTIVITY_BY', 'LAST_ACTIVITY_TIME', 'LEAD_ID',
            'OPENED', 'OPPORTUNITY', 'PROBABILITY', 'STAGE_ID', 'STAGE_SEMANTIC_ID', 'TITLE', 'TYPE_ID'
          ],
          start: start,
          order: { "ID": "ASC" },
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();

      if (data.error) {
        console.error('Error fetching deals:', data.error);
        break;
      } else {
        allDeals = allDeals.concat(data.result);
        if (data.result.length < batchSize) {
          break;
        }
        start += batchSize;
      }
    }
    return allDeals;
  } catch (error) {
    console.error('Error fetching deals:', error);
    return []; // Return an empty array in case of error
  }
}


function convertMonthToBitrixDates(monthName, year) {
  const months = [
      'January', 'February', 'March', 'April', 'May', 'June', 'July',
      'August', 'September', 'October', 'November', 'December'
  ];

  const monthIndex = months.indexOf(monthName);

  if (monthIndex === -1) {
      throw new Error("Invalid month name");
  }

  const startDate = new Date(year, monthIndex, 1); // First day of the month
  const endDate = new Date(year, monthIndex + 1, 0); // Last day of the month

  // Convert start and end dates to the desired format
  const bitrixStartDate = formatDate(startDate) + ' 00:00';
  const bitrixEndDate = formatDate(endDate) + ' 23:59';

  return {
      bitrixStartDate,
      bitrixEndDate
  };
}

function formatDate(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based
  const day = String(date.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
}

export async function fetchDealsFront(dateRanges) {
  if(dateRanges[0]){
    const dayDeals = await fetchDealsForRange(dateRanges[0]);
    const weekDeals = await fetchDealsForRange(dateRanges[1]);
    const monthDeals = await fetchDealsForRange(dateRanges[2]);

    const dayStats = dealsDataCollector(dayDeals);
    const weekStats = dealsDataCollector(weekDeals);
    const monthStats = monthDealsDataCollector(monthDeals);

    return {
      dealsDay: dayStats,
      dealsWeek: weekStats,
      dealsMonth: monthStats
    };
  } else {
    const dateProp = !dateRanges.bitrixStartDate ? convertMonthToBitrixDates(dateRanges, 2024) : dateRanges;
    const data = await fetchDealsForRange(dateProp);
    const formedData =  monthDealsDataCollector(data);
    return formedData;
  }
}
