import { sales1CDataFormer } from "../data/1C/sales1CDataFormed";
import { salesReportsData } from '../hoc/shareData';

const username = 'Алтынбек';
const password = '5521';

// Encode credentials to Base64 using TextEncoder
const encoder = new TextEncoder();
const credentials = `${username}:${password}`;
const utf8Credentials = encoder.encode(credentials);

// Function to convert ArrayBuffer to Base64
function base64ArrayBuffer(arrayBuffer) {
  let binary = '';
  const bytes = new Uint8Array(arrayBuffer);
  const len = bytes.byteLength;
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
}

const encodedCredentials = base64ArrayBuffer(utf8Credentials);

export async function getSalesReceiptsFront(dateRanges) {
    const startDate = decodeURIComponent(dateRanges[2].startDate);
    const endDate = decodeURIComponent(dateRanges[2].endDate);

    // Convert start and end dates to Date objects
    const startDateObj = new Date(startDate);
    const endDateObj = new Date(endDate);

    // // Subtract one day from the start date
    // const adjustedStartDateObj = new Date(startDateObj);
    // adjustedStartDateObj.setDate(startDateObj.getDate() - 1);

    // Format the adjusted start date and end date
    const formattedStartDate = startDateObj.toISOString().split('T')[0].replace(/-/g, '');
    const formattedEndDate = endDateObj.toISOString().split('T')[0].replace(/-/g, '');

    const url = `/api/ut_zhezkazgan/hs/sales-kkm-receipts/GetSales/${formattedStartDate}/${formattedEndDate}`;
    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Basic ${encodedCredentials}`
        }
    });

    if (!response.ok) {
        console.error('Error fetching KKM list');
        throw new Error('Network response was not ok');
    }

    const data = await response.json();

    // Extract date ranges for filtering
    const dayStart = new Date(decodeURIComponent(dateRanges[0].startDate));
    const dayEnd = new Date(decodeURIComponent(dateRanges[0].endDate));
    const weekStart = new Date(decodeURIComponent(dateRanges[1].startDate));
    const weekEnd = new Date(decodeURIComponent(dateRanges[1].endDate));
    const monthStart = new Date(decodeURIComponent(dateRanges[2].startDate));
    const monthEnd = new Date(decodeURIComponent(dateRanges[2].endDate));

    // Adjust dayEnd to include all times up to the end of the day
    dayEnd.setHours(23, 59, 59, 999);

    // Adjust weekEnd to include all times up to the end of the week
    weekEnd.setHours(23, 59, 59, 999);

    const monthData = data.filter(item => {
        const itemDate = new Date(item.Дата);
        const saleHour = itemDate.getHours();

        if(saleHour < 1){
            itemDate.setDate(itemDate.getDate() - 1);
        }

        return itemDate >= monthStart && itemDate <= monthEnd;
    })

    // Filter data for day
    const dayData = data.filter(item => {
        const itemDate = new Date(item.Дата);
        const saleHour = itemDate.getHours();

        // Adjust date for sales between midnight and 1 AM
        // if (saleHour < 1) {
        //     itemDate.setDate(itemDate.getDate() - 1);
        // }

        return itemDate >= dayStart && itemDate <= dayEnd;
    });

    // Filter data for week
    const weekData = data.filter(item => {
        const itemDate = new Date(item.Дата);
        const saleHour = itemDate.getHours();

        // Adjust date for sales between midnight and 1 AM
        if (saleHour < 1) {
            itemDate.setDate(itemDate.getDate() - 1);
        }

        return itemDate >= weekStart && itemDate <= weekEnd;
    });
    
    const final = {
        readyMonthData: monthData,
        readyWeekData: weekData,
        readyDayData: dayData
    }
    
    salesReportsData(final);
    const formedSalesReceiptsData = sales1CDataFormer(final);
    return formedSalesReceiptsData;
}