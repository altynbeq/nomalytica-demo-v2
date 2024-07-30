export async function fetchDeals(date) {
  const webhookUrl = `https://nomalytics-back.onrender.com/romantic_zhez_bitrix/deals/${date.dateType}-stats?start=${date.startDate}&end=${date.endDate}`
  
  try {
    const response = await fetch(webhookUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching deals:', error);
    return []; // Return an empty array in case of error
  }
}
