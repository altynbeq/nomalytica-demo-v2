export async function fetchDeals(date) {
  let webhookUrl = `https://nomalytics-back.onrender.com/romantic_zhez_bitrix/deals/${date.dateType}-stats?start=${date.bitrixStartDate}&end=${date.bitrixEndDate}`

  if(date.dateType == "month"){
    webhookUrl = `https://nomalytics-back.onrender.com/romantic_zhez_bitrix/deals/${date.dateType}-stats?start=${date.bitrixStartDate}&end=${date.bitrixEndDate}`
  }
  
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
    console.log("DEALSDATA:", data)
    return data;
  } catch (error) {
    console.error('Error fetching deals:', error);
    return []; // Return an empty array in case of error
  }
}

// dealsWeek -> 1394 ms, 2.47 KB
// leadsWeek -> 3.31 s, 930 B
// salesReceipts -> 2.21 s, 1.48 MB
// salesProducts -> 4.19s, 9.26 KB
// salesKKM -> 3.55 s, 12.07 KB

// 20-28

// https://nomalytics-back.onrender.com/romantic_zhez_bitrix/deals/week-stats?start=2024-07-20%2000:00:00&end=2024-07-22%2023:59:59
// https://nomalytics-back.onrender.com/romantic_zhez_bitrix/deals/week-stats?start=2024-07-22%2000:00:00&end=2024-07-28%2023:59:59
