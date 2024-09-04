import { setKkmData } from '../hoc/shareData';

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

const kkmReceiptsDataFormer = (data) => {
    const processData = (items) => {
      const processedDocuments = new Set();
      const response = {
        totalSum: 0,
        bestSoldItemAmount: {
          name: '',
          amount: 0,
          totalSum: 0
        },
        bestSoldItemSum: {
          name: '',
          amount: 0,
          totalSum: 0
        },
        itemsSold: {},
        totalNumberSales: 0,
        salesSeries: Array.from({ length: 31 }, (_, i) => ({ x: (i + 1).toString(), y: 0 })),
      };
  
      items.forEach(item => {
        // Update total sum
        response.totalSum += parseInt(item['Сумма'], 10);
  
        const itemName = item['НоменклатураНаименование'];
        const itemQuantity = parseInt(item['Количество'], 10);
        const itemSum = parseInt(item['Сумма'], 10);
        const saleDate = new Date(item["Дата"]);
        const saleHour = saleDate.getHours();
        const dayOfMonth = saleDate.getDate() - 1;
        const totalDocumentAmount = parseFloat(item["СуммаДокумента"]);
        const uniqueDocKey = `${saleDate.toISOString().split('T')[0]}-${totalDocumentAmount}`;
  
        // if (saleHour < 1) {
        //   saleDate.setDate(saleDate.getDate() - 1);
        // }
  
        if (!response.itemsSold[itemName]) {
          response.itemsSold[itemName] = {
            name: itemName,
            amount: 0,
            totalSum: 0
          };
        }
  
        if (!processedDocuments.has(uniqueDocKey)) {
          // Add unique document key to the set
          processedDocuments.add(uniqueDocKey);
    
          // Update the total sum and sales series
          // data1CFormed.totalSum += totalDocumentAmount;
          // data1CFormed.paidTo[terminal] += totalDocumentAmount;
          // data1CFormed.KassaKKMName[cashRegister] += totalDocumentAmount;
          response.totalNumberSales++; // Increment the total number of sales
    
          // Update sales series and sum series
          response.salesSeries[dayOfMonth].y++;
          // response.salesSumSeries[dayOfMonth].y += totalDocumentAmount;
        }
        // Update the item's quantity and total sum
        response.itemsSold[itemName].amount += itemQuantity;
        response.itemsSold[itemName].totalSum += itemSum;
      });
  
      // Find the best sold item
      for (const item in response.itemsSold) {
        if (response.itemsSold[item].amount > response.bestSoldItemAmount.amount) {
          response.bestSoldItemAmount = response.itemsSold[item];
        }
        if (response.itemsSold[item].totalSum > response.bestSoldItemSum.totalSum) {
          response.bestSoldItemSum = response.itemsSold[item];
        }
      }
  
      return response;
    };
  
    const formedResponse =  processData(data);
    return formedResponse;
  };

  
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
        console.error('Error fetching KKM list');
        throw new Error('Network response was not ok');
    }

    return await response.json();
}

export async function getKKMReceiptsFront(date) {
    const data = await fetchDataForRange(date.startDate, date.endDate)

    const formedKKMData = kkmReceiptsDataFormer(data);
    return formedKKMData;
}
