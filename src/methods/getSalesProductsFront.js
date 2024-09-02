// import { salesProductDataFormer } from "../data/1C/salesProductDataFormer";
// import { salesProductsData } from '../hoc/shareData';

// interface DateRange {
//     startDate: string;
//     endDate: string;
// }

// const username = 'Алтынбек';
// const password = '5521';

// // Encode credentials to Base64 using TextEncoder
// const encoder = new TextEncoder();
// const credentials = `${username}:${password}`;
// const utf8Credentials = encoder.encode(credentials);

// // Function to convert ArrayBuffer to Base64
// function base64ArrayBuffer(arrayBuffer: ArrayBuffer): string {
//     let binary = '';
//     const bytes = new Uint8Array(arrayBuffer);
//     const len = bytes.byteLength;
//     for (let i = 0; i < len; i++) {
//         binary += String.fromCharCode(bytes[i]);
//     }
//     return btoa(binary);
// }

// const encodedCredentials = base64ArrayBuffer(utf8Credentials);

// async function fetchDataForRange(startDate: string, endDate: string): Promise<ProductsData[]> {
//     // Decode URL-encoded dates and format them by removing potential encoding and replacing hyphens
//     const decodedStartDate = decodeURIComponent(startDate).split(' ')[0].replace(/-/g, '');
//     const decodedEndDate = decodeURIComponent(endDate).split(' ')[0].replace(/-/g, '');

//     const url = `/api/ut_zhezkazgan/hs/sales-kkm-receipts-list/GetSalesReceipts/${decodedStartDate}/${decodedEndDate}`;
//     const response = await fetch(url, {
//         method: 'GET',
//         headers: {
//             'Content-Type': 'application/json',
//             'Authorization': `Basic ${encodedCredentials}`
//         }
//     });

//     if (!response.ok) {
//         console.error('Error fetching sales products list');
//         throw new Error('Network response was not ok');
//     }

//     return await response.json();
// }

// export async function getSalesProductsFront(dateRanges: DateRange[]): Promise<ReturnType<typeof salesProductDataFormer>> {
//     const [dayRange, weekRange, monthRange] = dateRanges;

//     // Fetch data for each time period
//     const [dayData, weekData, monthData] = await Promise.all([
//         fetchDataForRange(dayRange.startDate, dayRange.endDate),
//         fetchDataForRange(weekRange.startDate, weekRange.endDate),
//         fetchDataForRange(monthRange.startDate, monthRange.endDate),
//     ]);

//     // Combine data into the final result
//     const final = {
//         readyMonthData: monthData,
//         readyWeekData: weekData,
//         readyDayData: dayData
//     };

//     salesProductsData(final);
//     const formedSalesProductsData = salesProductDataFormer(final);
//     return formedSalesProductsData;
// }


import { salesProductDataFormer } from "../data/1C/salesProductDataFormer";
import { salesProductsData } from '../hoc/shareData';

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

async function fetchDataForRange(startDate, endDate) {
    // Decode URL-encoded dates and format them by removing potential encoding and replacing hyphens
    const decodedStartDate = decodeURIComponent(startDate).split(' ')[0].replace(/-/g, '');
    const decodedEndDate = decodeURIComponent(endDate).split(' ')[0].replace(/-/g, '');

    const url = `/api/ut_zhezkazgan/hs/sales-kkm-receipts-list/GetSalesReceipts/${decodedStartDate}/${decodedEndDate}`;
    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Basic ${encodedCredentials}`
        }
    });

    if (!response.ok) {
        console.error('Error fetching sales products list');
        throw new Error('Network response was not ok');
    }

    return await response.json();
}

export async function getSalesProductsFront(dateRanges) {
    const [dayRange, weekRange, monthRange] = dateRanges;

    // Fetch data for each time period
    const [dayData, weekData, monthData] = await Promise.all([
        fetchDataForRange(dayRange.startDate, dayRange.endDate),
        fetchDataForRange(weekRange.startDate, weekRange.endDate),
        fetchDataForRange(monthRange.startDate, monthRange.endDate),
    ]);

    // Combine data into the final result
    const final = {
        readyMonthData: monthData,
        readyWeekData: weekData,
        readyDayData: dayData
    };

    salesProductsData(final);
    const formedSalesProductsData = salesProductDataFormer(final);
    return formedSalesProductsData;
}
