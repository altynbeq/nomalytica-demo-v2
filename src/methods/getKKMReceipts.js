const url = '/api/ut_zhezkazgan/hs/sales-kkm-receipts-list/GetSalesReceipts';
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

export async function getKKMReceipts(){
    const response  = await fetch(url, 
        {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Basic ${encodedCredentials}`
            }
        }
    );
    
    if (!response.ok) {
      console.error('Error fetching KKM list');
      throw new Error('Network response was not ok');
    }

    const contentType = response.headers.get("content-type");
    
    if (contentType && contentType.includes("application/json")) {
      const data = await response.json();
      return data;
  } else if (contentType && contentType.includes("text/plain")) {
      const text = await response.text();
      try {
          const data = JSON.parse(text); // Attempt to parse as JSON
          return data;
      } catch (e) {
          console.error('Error parsing JSON:', e);
          throw new Error('Error parsing JSON');
      }
  } else {
      const text = await response.text(); // Get the text response for debugging
      console.error('Received non-JSON response:', text);
      throw new Error('Received non-JSON response');
  }
}