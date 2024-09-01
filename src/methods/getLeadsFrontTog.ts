
import { monthDataSalesFormer } from '../data/Sales/MonthDataSalesFormer';
import { weekDataSalesFormer } from '../data/Sales/WeekDataSalesFormer';

interface FetchLeadsForRangeParams{
  bitrixStartDate: string,
  bitrixEndDates: string,
}

interface Lead{
  [key: string]: any;
}

interface DateRange{
  startDate: string;
  endDate: string;
  bitrixStartDate: string;
  bitrixEndDates: string;
}

interface FetchLeadsResult{
  leadsDay: ReturnType<typeof weekDataSalesFormer>;
  leadsWeek: ReturnType<typeof weekDataSalesFormer>;
  leadsMonth: ReturnType<typeof monthDataSalesFormer>;
}

export async function fetchLeadsForRange({ bitrixStartDate, bitrixEndDates} : FetchLeadsForRangeParams) {
  const webhookUrl = 'https://zhezkazgan-romantic.bitrix24.kz/rest/20509/hp29cpcrgqrsfh2f/crm.lead.list.json';
  let allLeads: Lead[] = [];
  let start: number = 0;
  const batchSize: number = 50; // Number of items to fetch per request

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

export async function fetchLeadsFront(dateRanges: DateRange[]): Promise<FetchLeadsResult> {
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
