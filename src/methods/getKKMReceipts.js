import { Base64 } from 'js-base64';

export async function getKKMReceipts() {
    try {
      const response = await fetch('http://212.46.56.10:84/ut_zhezkazgan/hs/sales-kkm-receipts-list/GetSalesReceipts', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Basic ' + Base64.encode('Алтынбек:5521')
        }
      });
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      const responseText = await response.text();
      console.log(responseText); // Log the full response

      const data = JSON.parse(responseText);
      return data;
    } catch (error) {
      console.error('Error fetching KKMReceipts:', error);
      return []; // Return an empty array in case of error
    }
  }
