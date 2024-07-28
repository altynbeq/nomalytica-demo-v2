export async function fetchDeals(startDateString, endDateString) {
  const webhookUrl = `https://nomalytics-back.onrender.com/romantic_zhez_bitrix/deals/${startDateString.dateType}-stats?start=${startDateString.startDate}&end=${startDateString.endDate}`
  // 'https://zhezkazgan-romantic.bitrix24.kz/rest/20509/7f0u8kwqgtgae2kw/crm.deal.list.json';
  // ${startDateString.dateType == 'month' ? 'month' : 'week'}
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
