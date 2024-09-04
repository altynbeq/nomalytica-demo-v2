import { weekDataSalesFormer } from '../data/Sales/WeekDataSalesFormer';

const monthDataSalesFormer = (list) => {
    let leadsStats = {
        leadsCount: list.length,
        leadsSource: {
            'Instagram': 0,
            'WhatsApp': 0,
            'Другое': 0,
        },
        IS_RETURN_CUSTOMER: {
            'Y': 0,
            'N': 0
        },
        workersStats: {},
        series: Array.from({ length: 31 }, (_, index) => ({ x: `${index + 1}`, y: 0 }))
    };
    const workersStats = {};

    const today = new Date();
    list.forEach(lead => {
        // Date when lead was created
        const createDate = new Date(lead.DATE_CREATE);

        // Get day of the month
        const dayOfMonth = createDate.getDate();

        // Only process dates up to today
        if (createDate <= today) {
            const dayIndex = dayOfMonth - 1; // Adjust day index
            if (dayIndex >= 0 && dayIndex < 31) {
              leadsStats.series[dayIndex].y += 1;
            }
        }

        if(lead.IS_RETURN_CUSTOMER == 'Y'){
            leadsStats.IS_RETURN_CUSTOMER['Y']++;
        } else {
            leadsStats.IS_RETURN_CUSTOMER['N']++;
        }
        
        if(lead.SOURCE_ID == "1|WZ_WHATSAPP_C114153D8D9A4291B1327806CA4BC2DBF"){
          leadsStats.leadsSource['WhatsApp']++;
        } else if(lead.SOURCE_ID == "1|FBINSTAGRAMDIRECT"){
          leadsStats.leadsSource['Instagram']++;
        } else {
          leadsStats.leadsSource['Другое']++;
        }

        const workerId = lead.LAST_ACTIVITY_BY;
        if (workersStats[workerId]) {
            workersStats[workerId].count += 1;
        } else {
            workersStats[workerId] = { count: 1 };
        }
    });

    leadsStats.workersStats = workersStats;

    return leadsStats;
}

async function fetchLeadsForRange({ bitrixStartDate, bitrixEndDates }) {
  const webhookUrl = 'https://zhezkazgan-romantic.bitrix24.kz/rest/20509/99kb8whz37as3yxw/crm.lead.list.json';
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

export async function fetchLeadsFront(date) {
  // Fetch the data for each period separately
  const propDate = convertMonthToBitrixDates(date, 2024);

  const data = await fetchLeadsForRange(propDate);
  
  const formedData = monthDataSalesFormer(data);

  return formedData;
}
