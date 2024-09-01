import { salesProductDataFormer } from "../data/1C/salesProductDataFormer";
import { salesProductsData } from '../hoc/shareData'

const username = 'Алтынбек';
const password = '5521';

// Encode credentials to Base64 using TextEncoder
const encoder = new TextEncoder();
const credentials = `${username}:${password}`;
const utf8Credentials = encoder.encode(credentials);

interface DateRangesInt{
    startDate: string;
    endDate: string;
}

interface ProductsData{
    [key: string] : any
}

// Function to convert ArrayBuffer to Base64
function base64ArrayBuffer(arrayBuffer: ArrayBuffer) {
  let binary = '';
  const bytes = new Uint8Array(arrayBuffer);
  const len = bytes.byteLength;
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
}

const encodedCredentials = base64ArrayBuffer(utf8Credentials);

export async function getSalesProductsFront(dateRanges: DateRangesInt[]): Promise<ReturnType<typeof salesProductDataFormer>> {
    const startDate = decodeURIComponent(dateRanges[2].startDate);
    const endDate = decodeURIComponent(dateRanges[2].endDate);

    // Format dates by removing potential encoding and replacing hyphens
    const formattedStartDate = startDate.split(' ')[0].replace(/-/g, '');
    const formattedEndDate = endDate.split(' ')[0].replace(/-/g, '');

    const url = `/api/ut_zhezkazgan/hs/sales-kkm-receipts-list/GetSalesReceipts/${formattedStartDate}/${formattedEndDate}`;
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

    const data: ProductsData[] = await response.json();

    // Extract date ranges for filtering
    const dayStart = new Date(decodeURIComponent(dateRanges[0].startDate));
    const dayEnd = new Date(decodeURIComponent(dateRanges[0].endDate));
    const weekStart = new Date(decodeURIComponent(dateRanges[1].startDate));
    const weekEnd = new Date(decodeURIComponent(dateRanges[1].endDate));

    // Filter data for day
    const dayData = data.filter(item => {
        const itemDate = new Date(item.Дата);
        return itemDate >= dayStart && itemDate <= dayEnd;
    });

    // Filter data for week
    const weekData = data.filter(item => {
        const itemDate = new Date(item.Дата);
        return itemDate >= weekStart && itemDate <= weekEnd;
    });

    const final = {
        readyMonthData: data,
        readyWeekData: weekData,
        readyDayData: dayData
    }
    salesProductsData(final);
    
    const formedSalesProductsData = salesProductDataFormer(final);
    return formedSalesProductsData;
}