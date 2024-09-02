// import { monthDataSalesFormer } from '../data/Sales/MonthDataSalesFormer';
// import { weekDataSalesFormer } from '../data/Sales/WeekDataSalesFormer';

// interface FetchLeadsForRangeParams {
//   bitrixStartDate: string;
//   bitrixEndDates: string;
// }

// interface Lead {
//   [key: string]: any;
// }

// interface DateRange {
//   startDate: string;
//   endDate: string;
//   bitrixStartDate: string;
//   bitrixEndDates: string;
// }

// interface FetchLeadsResult {
//   leadsDay: ReturnType<typeof weekDataSalesFormer>;
//   leadsWeek: ReturnType<typeof weekDataSalesFormer>;
//   leadsMonth: ReturnType<typeof monthDataSalesFormer>;
// }

// export async function fetchLeadsForRange({ bitrixStartDate, bitrixEndDates }: FetchLeadsForRangeParams) {
//   const webhookUrl = 'https://zhezkazgan-romantic.bitrix24.kz/rest/20509/hp29cpcrgqrsfh2f/crm.lead.list.json';
//   let allLeads: Lead[] = [];
//   let start: number = 0;
//   const batchSize: number = 50; // Number of items to fetch per request

//   try {
//     while (true) {
//       const response = await fetch(webhookUrl, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({
//           filter: {
//             '>=DATE_CREATE': bitrixStartDate,
//             '<=DATE_CREATE': bitrixEndDates
//           },
//           start: start,
//           order: { "ID": "ASC" } // Ensure consistent ordering for pagination
//         })
//       });

//       if (!response.ok) {
//         throw new Error(`HTTP error! Status: ${response.status}`);
//       }

//       const data = await response.json();

//       if (data.error) {
//         console.error('Error fetching leads:', data.error);
//         break;
//       } else {
//         allLeads = allLeads.concat(data.result);
//         if (data.result.length < batchSize) {
//           break; // If the number of results is less than the batch size, we've fetched all leads
//         }
//         start += batchSize;
//       }
//     }
//     return allLeads;
//   } catch (error) {
//     console.error('Error fetching leads:', error);
//     return []; // Return an empty array in case of error
//   }
// }

// export async function fetchLeadsFront(dateRanges: DateRange[]): Promise<FetchLeadsResult> {
//   // Fetch the data for each period separately
//   const dayLeads = await fetchLeadsForRange(dateRanges[0]);
//   const weekLeads = await fetchLeadsForRange(dateRanges[1]);
//   const monthLeads = await fetchLeadsForRange(dateRanges[2]);

//   // Process the data for statistics
//   const dayStats = weekDataSalesFormer(dayLeads);
//   const weekStats = weekDataSalesFormer(weekLeads);
//   const monthStats = monthDataSalesFormer(monthLeads);

//   return {
//     leadsDay: dayStats,
//     leadsWeek: weekStats,
//     leadsMonth: monthStats
//   };
// }

import { monthDataSalesFormer } from '../data/Sales/MonthDataSalesFormer';
import { weekDataSalesFormer } from '../data/Sales/WeekDataSalesFormer';

async function fetchLeadsForRange({ bitrixStartDate, bitrixEndDates }) {
  const webhookUrl = 'https://zhezkazgan-romantic.bitrix24.kz/rest/20509/hp29cpcrgqrsfh2f/crm.lead.list.json';
  let allLeads = [];
  let start = 0;
  const batchSize = 50; // Number of items to fetch per request

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
            '<=DATE_CREATE': bitrixEndDates
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
          break; // If the number of results is less than the batch size, we've fetched all leads
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
  // Fetch the data for each period separately
  const dayLeads = await fetchLeadsForRange(dateRanges[0]);
  const weekLeads = await fetchLeadsForRange(dateRanges[1]);
  const monthLeads = await fetchLeadsForRange(dateRanges[2]);

  // Process the data for statistics
  const dayStats = weekDataSalesFormer(dayLeads);
  const weekStats = weekDataSalesFormer(weekLeads);
  const monthStats = monthDataSalesFormer(monthLeads);

  return {
    leadsDay: dayStats,
    leadsWeek: weekStats,
    leadsMonth: monthStats
  };
}
