export async function fetchDeals(dateRanges) {
  const dealsGet = async (date) => {
    let webhookUrl = `https://nomalytics-back.onrender.com/romantic_zhez_bitrix/deals/${date.dateType}-stats?start=${date.bitrixStartDate}&end=${date.bitrixEndDate}`;

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
  };
  
  const formedDealsData = {
    dealsDay: await dealsGet(dateRanges[0]),
    dealsWeek: await dealsGet(dateRanges[1]),
    dealsMonth: await dealsGet(dateRanges[2])
  };
  console.log("formedDealsData", formedDealsData)
  return formedDealsData;
}