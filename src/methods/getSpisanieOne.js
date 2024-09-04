import { setDataSpisanie } from '../hoc/shareData';

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

async function calculateSpisanieData(dataFinal) {
    const spisanieFormer = async (items) => {
        const spisanieData = {
            itemsSpisanie: {},
            totalAmountSpisanie: 0,
            series: Array.from({ length: 31 }, (_, i) => ({ x: (i + 1).toString(), y: 0 })),
        };
    
        items.forEach(item => {
            const name = item.НоменклатураНаименование;
            const amount = item.Количество;
            const date = new Date(item.Дата);
            const dayOfMonth = date.getDate();
    
            // Add the amount to the corresponding item in itemsSpisanie
            if (spisanieData.itemsSpisanie[name]) {
                spisanieData.itemsSpisanie[name] += amount;
            } else {
                spisanieData.itemsSpisanie[name] = amount;
            }
    
            // Add the amount to the total amount
            spisanieData.totalAmountSpisanie += amount;
    
            // Add the amount to the corresponding day in the series
            spisanieData.series[dayOfMonth - 1].y += amount;
        });
    
        return spisanieData;
    };
    
    const formerSpisanieData =  await spisanieFormer(dataFinal)
     
    return formerSpisanieData;
}


export async function getSpisanie(date) {
    
    const startDate = decodeURIComponent(date.startDate);
    const endDate = decodeURIComponent(date.endDate);

    // Format dates by removing potential encoding and replacing hyphens
    const formattedStartDate = startDate.split(' ')[0].replace(/-/g, '');
    const formattedEndDate = endDate.split(' ')[0].replace(/-/g, '');

    const url = `/api/ut_zhezkazgan/hs/sales-product/GetSales/${formattedStartDate}/${formattedEndDate}`;
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

    const formedSpisanieData = await calculateSpisanieData(data);
    
    return formedSpisanieData;
}