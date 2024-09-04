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


    const processData = (items) => {
      const salesProductsData = {
        itemName: {},
        kassaKKMName: {},
        mostSoldItem: null,
        mostSoldSum: null,
        leastSoldItem: null,
        leastSoldSum: null,
        productsSold: 0,
      };
    
      items.forEach(item => {
        const name = item["НоменклатураНаименование"];
        const quantity = parseFloat(item["Количество"]);
        const price = parseFloat(item["Цена"]);
        const amount = parseFloat(item["Сумма"]);
        const kassa = item["КассаККМНаименование"];
    
        if (!salesProductsData.itemName[name]) {
          salesProductsData.itemName[name] = {
            count: 0,
            price: price,
            totalSum: 0
          };
        }
    
        salesProductsData.itemName[name].count += quantity;
        salesProductsData.itemName[name].totalSum += amount;
    
        if (!salesProductsData.kassaKKMName[kassa]) {
          salesProductsData.kassaKKMName[kassa] = {
            count: 0,
            totalSum: 0
          };
        }
    
        salesProductsData.kassaKKMName[kassa].count += quantity;
        salesProductsData.kassaKKMName[kassa].totalSum += amount;
      });
    
      // Initialize most and least sold items
      let mostSoldItem = { name: null, count: 0, totalSum: 0 };
      let mostSoldSum = { name: null, count: 0, totalSum: 0 };
      let leastSoldItem = null;
      let leastSoldSum = null;
    
      for (const item in salesProductsData.itemName) {
        const currentItem = salesProductsData.itemName[item];
    
        // Update most sold item and sum
        if (currentItem.count > mostSoldItem.count) {
          mostSoldItem = {
            name: item,
            count: currentItem.count,
            totalSum: currentItem.totalSum
          };
        }
        if (currentItem.totalSum > mostSoldSum.totalSum) {
          mostSoldSum = {
            name: item,
            count: currentItem.count,
            totalSum: currentItem.totalSum
          };
        }
    
        // Update least sold item and sum
        if (!leastSoldItem || currentItem.count < leastSoldItem.count) {
          leastSoldItem = {
            name: item,
            count: currentItem.count,
            totalSum: currentItem.totalSum
          };
        }
        if (!leastSoldSum || currentItem.totalSum < leastSoldSum.totalSum) {
          leastSoldSum = {
            name: item,
            count: currentItem.count,
            totalSum: currentItem.totalSum
          };
        }
    
        salesProductsData.productsSold += currentItem.count;
      }
    
      salesProductsData.mostSoldItem = mostSoldItem;
      salesProductsData.mostSoldSum = mostSoldSum;
      salesProductsData.leastSoldItem = leastSoldItem;
      salesProductsData.leastSoldSum = leastSoldSum;
    
      return salesProductsData;
    };

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

export async function getSalesProductsFrontOne(date) {

    // Fetch data for each time period
    const data = await fetchDataForRange(date.startDate, date.endDate);
        
    const formedSalesProductsData = processData(data);
    return formedSalesProductsData;
}
