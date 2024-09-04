// import { dealsDataCollector } from '../data/Finance/WeekDataFinanceFormer';
// import { monthDealsDataCollector } from '../data/Finance/MonthDataFinanceFormer';

// interface DateForRequest{
//   bitrixStartDate: string,
//   bitrixEndDate: string
// }

// interface Deal{
//   [key: string]: any,
// }

// interface DateRange{
//   startDate: string,
//   endDate: string,
//   bitrixStartDate: string,
//   bitrixEndDate: string
// }

// interface FetchDealsResults{
//   dealsDay: ReturnType<typeof dealsDataCollector>;
//   dealsWeek: ReturnType<typeof dealsDataCollector>;
//   dealsMonth: ReturnType<typeof monthDealsDataCollector>;
// }

// export async function fetchDealsForRange({bitrixStartDate, bitrixEndDate}: DateForRequest) {
//   const webhookUrl = 'https://zhezkazgan-romantic.bitrix24.kz/rest/20509/qyhraw9d6jnfbksc/crm.deal.list.json';
//   const batchSize: number = 50; // Number of items to fetch per request
//   let allDeals: Deal[] = [];
//   let start:number = 0;

//   try {
//     while (true) {
//       const response = await fetch(webhookUrl, {
//         // '/.netlify/functions/fetchDeals', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({
//           filter: {
//             '>=DATE_CREATE': bitrixStartDate,
//             '<=DATE_CREATE': bitrixEndDate,
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

// export async function fetchDealsFront(dateRanges: DateRange[]): Promise<FetchDealsResults> {
//     // Фетч данных за день
//     const dayDeals = await fetchDealsForRange(dateRanges[0]);
    
//     // Фетч данных за неделю
//     const weekDeals = await fetchDealsForRange(dateRanges[1]);
  
//     // Фетч данных за месяц
//     const monthDeals = await fetchDealsForRange(dateRanges[2]);
  
//     // Обработка данных для статистики
//     const dayStats = dealsDataCollector(dayDeals);
//     const weekStats = dealsDataCollector(weekDeals);
//     const monthStats = monthDealsDataCollector(monthDeals);
    
//     return {
//       dealsDay: dayStats,
//       dealsWeek: weekStats,
//       dealsMonth: monthStats
//     };
//   }
  
import { dealsDataCollector } from '../data/Finance/WeekDataFinanceFormer';
import { monthDealsDataCollector } from '../data/Finance/MonthDataFinanceFormer';

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

export async function fetchDealsFront(dateRanges) {
  // Fetch data for day
  const dayDeals = await fetchDealsForRange(dateRanges[0]);
  
  // Fetch data for week
  const weekDeals = await fetchDealsForRange(dateRanges[1]);

  // Fetch data for month
  const monthDeals = await fetchDealsForRange(dateRanges[2]);

  // Process data for statistics
  const dayStats = dealsDataCollector(dayDeals);
  const weekStats = dealsDataCollector(weekDeals);
  const monthStats = monthDealsDataCollector(monthDeals);
  
  return {
    dealsDay: dayStats,
    dealsWeek: weekStats,
    dealsMonth: monthStats
  };
}
