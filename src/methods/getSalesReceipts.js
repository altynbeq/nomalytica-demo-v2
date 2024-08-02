export async function getSalesReceipts(dateRanges) {
    const fetchSalesReceipts = async ({ startDate, endDate, dateType }) => {
      const start = startDate.split("%")[0].replace(/-/g, '');
      const end = endDate.split("%")[0].replace(/-/g, '');
      const localDateType = dateType + 'ly';
      const url = `https://nomalytics-back.onrender.com/romantic_zhez_1c/sales/${localDateType}?startDate=${start}&endDate=${end}`;
      const response = await fetch(url, { method: 'GET' });
  
      if (!response.ok) {
        console.error('Error fetching Sales Receipts list');
        throw new Error('Network response was not ok');
      }
  
      return response.json();
    };
  
    return Promise.all(dateRanges.map(fetchSalesReceipts));
  }
  