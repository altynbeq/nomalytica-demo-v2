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

const sales1CMonthFormer = (data) => {
    const processedDocuments = new Set();
    const data1CFormed = {
      paidTo: {},
      totalSum: 0,
      KassaKKMName: {},
      salesSeries: Array.from({ length: 31 }, (_, i) => ({ x: (i + 1).toString(), y: 0 })),
      salesSumSeries: Array.from({ length: 31 }, (_, i) => ({ x: (i + 1).toString(), y: 0 })),
      totalNumberSales: 0
    };
  
    data.forEach(item => {
      const terminal = item["ЭквайринговыйТерминалНаименование"] || "Неопределено";
      const amount = item["Сумма"];
      const cashRegister = item["КассаККМНаименование"];
      const saleDate = new Date(item["Дата"]);
      const saleHour = saleDate.getHours();
  
      // Adjust date for sales between midnight and 1 AM
      if (saleHour < 1) {
        saleDate.setDate(saleDate.getDate() - 1);
      }
  
      const dayOfMonth = saleDate.getDate() - 1; // Subtract 1 to match array index (0-30)
      const documentNumber = item["Номер"];
      const totalDocumentAmount = parseFloat(item["СуммаДокумента"]);
  
      // Create a unique key for each document on a specific day
      const uniqueDocKey = `${saleDate.toISOString().split('T')[0]}-${documentNumber}-${totalDocumentAmount}`;
  
      if (!data1CFormed.paidTo[terminal]) {
        data1CFormed.paidTo[terminal] = 0;
      }
  
      if (!data1CFormed.KassaKKMName[cashRegister]) {
        data1CFormed.KassaKKMName[cashRegister] = 0;
      }
  
      if (!processedDocuments.has(uniqueDocKey)) {
        processedDocuments.add(uniqueDocKey);
  
        // Update the total sum and sales series
        data1CFormed.totalSum += totalDocumentAmount;
        data1CFormed.paidTo[terminal] += totalDocumentAmount;
        data1CFormed.KassaKKMName[cashRegister] += totalDocumentAmount;
        data1CFormed.totalNumberSales++; // Increment the total number of sales
  
        // Update sales series and sum series
        data1CFormed.salesSeries[dayOfMonth].y++;
        data1CFormed.salesSumSeries[dayOfMonth].y += totalDocumentAmount;
      }
    });
  
    return data1CFormed;
  };

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

export async function getSalesReceiptsFront(date) {
    const data = await fetchDataForRange(date.startDate, date.endDate)

    const formedSalesReceiptsData = sales1CMonthFormer(data);
    return formedSalesReceiptsData;
}
