import { leadsDataFormer } from '../dataFormers/bitrix/leadsDataFormer';
import { leadsMonthDataFormer } from '../dataFormers/bitrix/leadsMonthDataFormer';

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const fetchLeadsForRange = async ({ bitrixStartDate, bitrixEndDates }) => {
  const webhookUrl = 'https://romantic-uralsk.bitrix24.kz/rest/164016/42x8fer22r9hfhwk/crm.lead.list.json';
  let allLeads = [];
  let start = 0;
  const batchSize = 50; // Number of items to fetch per request
  let hasMoreLeads = true;

  try {
    while (hasMoreLeads) {
      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          filter: {
            '>=DATE_CREATE': bitrixStartDate,
            '<=DATE_CREATE': bitrixEndDates,
            '!STATUS_ID': 'JUNK',
          },
          // select: [
          //   'ASSIGNED_BY_ID', 'CREATED_BY_ID', 'HAS_EMAIL', 'ID', 'IS_MANUAL_OPPORTUNITY', 'IS_RETURN_CUSTOMER',
          //   'LAST_ACTIVITY_BY', 'LAST_ACTIVITY_TIME', 'NAME', 'OPENED', 'SOURCE_ID', 'STATUS_ID', 'TITLE'
          // ],
          start: start,
          order: { "ID": "ASC" } // Ensure consistent ordering for pagination
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();

      if (data.error) {
        hasMoreLeads = false;
        console.error('Error fetching leads:', data.error);
        break;
      } else {
        allLeads = allLeads.concat(data.result);

        if (data.result.length < batchSize) {
          hasMoreLeads = false;
          break; // If the number of results is less than the batch size, we've fetched all leads
        }
        
        // Delay the next request
        await delay(100); // Add a 1 second delay between each request
        start += batchSize;
      }
    }
    return allLeads;
  } catch (error) {
    console.error('Error fetching leads:', error);
    return []; // Return an empty array in case of error
  }
}


function formatDate(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based
  const day = String(date.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
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

export async function fetchLeads(dateRanges, dateSaved) {
  // Convert dateSaved string to a Date object
  const savedDate = new Date(dateSaved);
  
  if (dateRanges[0] && typeof dateRanges != 'string') {
    // Fetch the data for each period separately
    const [dayLeads, weekLeads, monthLeads] = await Promise.all([
      fetchLeadsForRange(dateRanges[0]),
      fetchLeadsForRange(dateRanges[1]),
      fetchLeadsForRange(dateRanges[2])
    ]);

    // Process the data for statistics
    const dayStats = leadsDataFormer(dayLeads);
    const weekStats = leadsDataFormer(weekLeads);
    const monthStats = leadsMonthDataFormer(monthLeads);

    return {
      leadsDay: dayStats,
      leadsWeek: weekStats,
      leadsMonth: monthStats
    };
  } else {
    const dateProp = !dateRanges.bitrixStartDate ? convertMonthToBitrixDates(dateRanges, 2024) : dateRanges;

    // Convert date ranges to Date objects
    const startDate = new Date(dateProp.bitrixStartDate);
    const endDate = new Date(dateProp.bitrixEndDate);
    
    // Adjust the start date to be after the saved date if needed
    if (startDate <= savedDate) {
      startDate.setDate(savedDate.getDate() + 1); // Start fetching from the day after dateSaved
    }

    // Split date range into two-day increments and fetch leads for each range
    const splitRangeByTwoDays = (start, end) => {
      const intervals = [];
      let currentStart = new Date(start);

      while (currentStart <= end) {
        const nextEnd = new Date(currentStart);
        nextEnd.setDate(nextEnd.getDate() + 1); // Fetch two-day data
        
        if (nextEnd > end) {
          nextEnd.setDate(end.getDate()); // Ensure the end date doesn't exceed the range
        }

        intervals.push({
          bitrixStartDate: formatDate(currentStart) + ' 00:00',
          bitrixEndDate: formatDate(nextEnd) + ' 23:59',
        });

        // Move the start date forward by 2 days
        currentStart.setDate(currentStart.getDate() + 2);
      }

      return intervals;
    };

    // Function to delay the execution for a specified time (in ms)
    const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

    // Use the split function to create intervals
    const intervals = splitRangeByTwoDays(startDate, endDate);

    // Fetch data sequentially with a delay between requests
    let allLeads = [];
    for (const interval of intervals) {
      const data = await fetchLeadsForRange(interval);
      allLeads = allLeads.concat(data); // Merge the fetched data
      await delay(3000); // Add a delay between each request to avoid overloading Bitrix
    }

    const formedData = leadsMonthDataFormer(allLeads);

    return formedData;
  }
}
