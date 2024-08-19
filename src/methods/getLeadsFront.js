// import { monthDataSalesFormer } from '../data/Sales/MonthDataSalesFormer';
// import { dealsDataCollector } from '../data/Sales/WeekDataSalesFormer';

// /// Funtion for receiving leads based on given time, use for analytics building, data from bitrix "Romantic Zhez"
// export async function fetchLeadsFront(date) {
//     const webhookUrl = 'https://zhezkazgan-romantic.bitrix24.kz/rest/20509/hp29cpcrgqrsfh2f/crm.lead.list.json'
//   //   'https://zhezkazgan-romantic.bitrix24.kz/rest/20509/7o3luefonm9j1wde/crm.lead.list.json';
    
//     let allLeads = [];
//     let start = 0;
//     const batchSize = 50; // Number of items to fetch per request
  
//       try {
//           while (true) {
//               const response = await fetch(webhookUrl, {
//                   method: 'POST',
//                   headers: {
//                       'Content-Type': 'application/json'
//                   },
//                   body: JSON.stringify({
//                       filter: {
//                           '>=DATE_CREATE': date.bitrixStartDate,
//                           '<=DATE_CREATE': date.bitrixEndDates
//                       },
//                       // select: ['ASSIGNED_BY_ID', 'CURRENCY_ID', 'DATE_CLOSED', 'DATE_CREATE', 'ID', 'IS_RETURN_CUSTOMER', 'NAME', 'OPENED', 'SOURCE_ID', 'STATUS_ID', 'STATUS_SEMANTIC_ID'],
//                       start: start,
//                       order: { "ID": "ASC" } // Ensure consistent ordering for pagination
//                   })
//               });
  
//               if (!response.ok) {
//                   throw new Error(`HTTP error! Status: ${response.status}`);
//               }
  
//               const data = await response.json();
  
//               if (data.error) {
//                   console.error('Error fetching leads:', data.error);
//                   break;
//               } else {
//                   allLeads = allLeads.concat(data.result);
//                   if (data.result.length < batchSize) {
//                       // If the number of results is less than the batch size, we've fetched all leads
//                       break;
//                   }
//                   start += batchSize;
//               }
//           }
//           return allLeads;
//       } catch (error) {
//         console.error('Error fetching leads:', error);
//       }
//   }

import { monthDataSalesFormer } from '../data/Sales/MonthDataSalesFormer';
import { weekDataSalesFormer } from '../data/Sales/WeekDataSalesFormer';

/// Function for receiving leads based on given time, used for analytics building, data from Bitrix "Romantic Zhez"
export async function fetchLeadsForRange(date) {
  const webhookUrl = 'https://zhezkazgan-romantic.bitrix24.kz/rest/20509/hp29cpcrgqrsfh2f/crm.lead.list.json';
  let allLeads = [];
  let start = 0;
  const batchSize = 50; // Number of items to fetch per request

  try {
    while (true) {
      const response = await fetch(webhookUrl, {
        // '/.netlify/functions/fetchLeads', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          filter: {
            '>=DATE_CREATE': date.bitrixStartDate,
            '<=DATE_CREATE': date.bitrixEndDates
          },
          start: start,
          order: { "ID": "ASC" } // Ensure consistent ordering for pagination
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();

      if (data.error) {
        console.error('Error fetching leads:', data.error);
        break;
      } else {
        allLeads = allLeads.concat(data.result);
        if (data.result.length < batchSize) {
          // If the number of results is less than the batch size, we've fetched all leads
          break;
        }
        start += batchSize;
      }
    }
    return allLeads;
  } catch (error) {
    console.error('Error fetching leads:', error);
    return []; // Return an empty array in case of error
  }
}

export async function fetchLeadsFront(dateRanges) {
  // Parse and decode date ranges
  const dayStart = new Date(decodeURIComponent(dateRanges[0].startDate));
  const dayEnd = new Date(decodeURIComponent(dateRanges[0].endDate));
  const weekStart = new Date(decodeURIComponent(dateRanges[1].startDate));
  const weekEnd = new Date(decodeURIComponent(dateRanges[1].endDate));

  // Adjust dayEnd and weekEnd to include all times up to the end of the period
  dayEnd.setHours(23, 59, 59, 999);
  weekEnd.setHours(23, 59, 59, 999);

  // Fetch the data for the entire month
  const allLeads = await fetchLeadsForRange(dateRanges[2]);

  // Filter data for the day
  const dayLeads = allLeads.filter(item => {
    const itemDate = new Date(item.DATE_CREATE);
    return itemDate >= dayStart && itemDate <= dayEnd;
  });

  // Filter data for the week
  const weekLeads = allLeads.filter(item => {
    const itemDate = new Date(item.DATE_CREATE);
    return itemDate >= weekStart && itemDate <= weekEnd;
  });

  // Process the data for statistics
  const dayStats = weekDataSalesFormer(dayLeads);
  const weekStats = weekDataSalesFormer(weekLeads);
  const monthStats = monthDataSalesFormer(allLeads);
  return {
    leadsDay: dayStats,
    leadsWeek: weekStats,
    leadsMonth: monthStats
  };
}
