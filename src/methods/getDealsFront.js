// import { dealsDataCollector } from '../data/Finance/WeekDataFinanceFormer'

// export async function fetchDealsForRange(date) {
//   const webhookUrl = 'https://zhezkazgan-romantic.bitrix24.kz/rest/20509/qyhraw9d6jnfbksc/crm.deal.list.json';
//   const batchSize = 50; // Number of items to fetch per request
//   let allDeals = [];
//   let start = 0;

//   try {
//     while (true) {
//       const response = await fetch(webhookUrl, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({
//           filter: {
//             '>=DATE_CREATE': date.bitrixStartDate,
//             '<=DATE_CREATE': date.bitrixEndDate,
//             STAGE_ID: "WON"
//           },
//           select: [
//             'ASSIGNED_BY_ID', 'BEGINDATE', 'CATEGORY_ID', 'CLOSED', 'CLOSEDATE', 'CONTACT_ID', 'CREATED_BY_ID',
//             'CURRENCY_ID', 'DATE_CREATE', 'DATE_MODIFY', 'ID', 'IS_MANUAL_OPPORTUNITY', 'IS_NEW', 'IS_RECURRING',
//             'IS_REPEATED_APPROACH', 'IS_RETURN_CUSTOMER', 'LAST_ACTIVITY_BY', 'LAST_ACTIVITY_TIME', 'LEAD_ID',
//             'OPENED', 'OPPORTUNITY', 'PROBABILITY', 'STAGE_ID', 'STAGE_SEMANTIC_ID', 'TITLE', 'TYPE_ID'
//           ],
//           start: start,
//           order: { "ID": "ASC" },
//         })
//       });

//       if (!response.ok) {
//         throw new Error(`HTTP error! Status: ${response.status}`);
//       }

//       const data = await response.json();

//       if (data.error) {
//         console.error('Error fetching deals:', data.error);
//         break;
//       } else {
//         allDeals = allDeals.concat(data.result);
//         if (data.result.length < batchSize) {
//           break;
//         }
//         start += batchSize;
//       }
//     }
//     return allDeals;
//   } catch (error) {
//     console.error('Error fetching deals:', error);
//     return []; // Return an empty array in case of error
//   }
// }

// export async function fetchDealsFront(dateRanges) {
//   const dealsPromises = dateRanges.map(date => fetchDealsForRange(date));
//   const allDeals = await Promise.all(dealsPromises);

//   return {
//     day: allDeals[0],
//     week: allDeals[1],
//     month: allDeals[2]
//   };
// }

import { dealsDataCollector } from '../data/Finance/WeekDataFinanceFormer';
import { monthDealsDataCollector } from '../data/Finance/MonthDataFinanceFormer';

export async function fetchDealsForRange(date) {
  const webhookUrl = 'https://zhezkazgan-romantic.bitrix24.kz/rest/20509/qyhraw9d6jnfbksc/crm.deal.list.json';
  const batchSize = 50; // Number of items to fetch per request
  let allDeals = [];
  let start = 0;

  try {
    while (true) {
      const response = await fetch(webhookUrl, {
        // '/.netlify/functions/fetchDeals', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          filter: {
            '>=DATE_CREATE': date.bitrixStartDate,
            '<=DATE_CREATE': date.bitrixEndDate,
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

export async function fetchDealsFront(dateRanges) {
  // Parse and decode date ranges
  const dayStart = new Date(decodeURIComponent(dateRanges[0].startDate));
  const dayEnd = new Date(decodeURIComponent(dateRanges[0].endDate));
  const weekStart = new Date(decodeURIComponent(dateRanges[1].startDate));
  const weekEnd = new Date(decodeURIComponent(dateRanges[1].endDate));

  // Adjust dayEnd and weekEnd to include all times up to the end of the period
  dayEnd.setHours(23, 59, 59, 999);
  weekEnd.setHours(23, 59, 59, 999);

  // Fetch the data for the entire month
  const allDeals = await fetchDealsForRange(dateRanges[2]);

  // Filter data for the day
  const dayDeals = allDeals.filter(item => {
    const itemDate = new Date(item.DATE_CREATE);
    return itemDate >= dayStart && itemDate <= dayEnd;
  });

  // Filter data for the week
  const weekDeals = allDeals.filter(item => {
    const itemDate = new Date(item.DATE_CREATE);
    return itemDate >= weekStart && itemDate <= weekEnd;
  });

  // Process the data for statistics
  const dayStats = dealsDataCollector(dayDeals);
  const weekStats = dealsDataCollector(weekDeals);
  const monthStats = monthDealsDataCollector(allDeals);
  
  return {
    dealsDay: dayStats,
    dealsWeek: weekStats,
    dealsMonth: monthStats
  };
}
