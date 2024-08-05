export async function getSalesProducts(dateRanges) {
    const fetchSalesProducts = async ({ startDate, endDate }) => {
      const start = startDate.split("%")[0].replace(/-/g, '');
      const end = endDate.split("%")[0].replace(/-/g, '');
      const url = `https://nomalytics-back.onrender.com/romantic_zhez_1c/sales-product?startDate=${start}&endDate=${end}`;
      const response = await fetch(url, { method: 'GET' });
  
      if (!response.ok) {
        console.error('Error fetching sales products');
        throw new Error('Network response was not ok');
      }
  
      return await response.json();
    };
  
    return Promise.all(dateRanges.map(fetchSalesProducts));
  }
  