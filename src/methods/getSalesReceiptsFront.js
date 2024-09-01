import { sales1CDataFormer } from "../data/1C/sales1CDataFormed";
import { salesReportsData } from '../hoc/shareData';

const username = 'Алтынбек';
const password = '5521';

// Encode credentials to Base64
function encodeBase64(string) {
    return btoa(unescape(encodeURIComponent(string)));
}

const credentials = `${username}:${password}`;
const encodedCredentials = encodeBase64(credentials);

async function fetchDataForRange(startDate, endDate) {
    // Decode URL-encoded dates
    const decodedStartDate = decodeURIComponent(startDate).split(' ')[0].replace(/-/g, '');
    const decodedEndDate = decodeURIComponent(endDate).split(' ')[0].replace(/-/g, '');

    const url = `/api/ut_zhezkazgan/hs/sales-kkm-receipts/GetSales/${decodedStartDate}/${decodedEndDate}`;
    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Basic ${encodedCredentials}`
        }
    });

    if (!response.ok) {
        console.error('Error fetching sales receipts');
        throw new Error('Network response was not ok');
    }

    return await response.json();
}

export async function getSalesReceiptsFront(dateRanges) {
    const [dayRange, weekRange, monthRange] = dateRanges;

    // Fetch data for each time period
    const [dayData, weekData, monthData] = await Promise.all([
        fetchDataForRange(dayRange.startDate, dayRange.endDate),
        fetchDataForRange(weekRange.startDate, weekRange.endDate),
        fetchDataForRange(monthRange.startDate, monthRange.endDate),
    ]);

    // Extract date ranges for filtering
    const dayStart = new Date(decodeURIComponent(dayRange.startDate));
    const dayEnd = new Date(decodeURIComponent(dayRange.endDate));
    const weekStart = new Date(decodeURIComponent(weekRange.startDate));
    const weekEnd = new Date(decodeURIComponent(weekRange.endDate));
    const monthStart = new Date(decodeURIComponent(monthRange.startDate));
    const monthEnd = new Date(decodeURIComponent(monthRange.endDate));

    // Adjust end times to include all times up to the end of the day/week
    dayEnd.setHours(23, 59, 59, 999);
    weekEnd.setHours(23, 59, 59, 999);

    // Calculate yesterday's date range
    const yesterdayStart = new Date(dayStart);
    yesterdayStart.setDate(dayStart.getDate() - 1);
    const yesterdayEnd = new Date(yesterdayStart);
    yesterdayEnd.setHours(23, 59, 59, 999);

    // Filter data for each period
    function filterData(data, startDate, endDate) {
        return data.filter(item => {
            const itemDate = new Date(item.Дата);
            if (itemDate.getHours() < 1) {
                itemDate.setDate(itemDate.getDate() - 1);
            }
            return itemDate >= startDate && itemDate <= endDate;
        });
    }

    const final = {
        readyMonthData: filterData(monthData, monthStart, monthEnd),
        readyWeekData: filterData(weekData, weekStart, weekEnd),
        readyDayData: filterData(dayData, dayStart, dayEnd),
        readyYesterdayData: filterData(dayData, yesterdayStart, yesterdayEnd) // Use dayData for yesterday
    };

    salesReportsData(final);
    const formedSalesReceiptsData = sales1CDataFormer(final);
    return formedSalesReceiptsData;
}
