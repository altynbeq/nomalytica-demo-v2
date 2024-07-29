export async function getSalesReceipts(dateDay){
    const startDemo = dateDay.startDate.split(" ")[0];
    const endDemo = dateDay.endDate.split(" ")[0];
    const start = startDemo.replace(/-/g, '');
    const end = endDemo.replace(/-/g, '');

    const url = `https://nomalytics-back.onrender.com/romantic_zhez_1c/sales?startDate=${start}&endDate=${end}`
    
    const response  = await fetch(url, { method: 'GET' });
    
    if (!response.ok) {
        console.error('Error fetching KKM list');
        throw new Error('Network response was not ok');
    }
  
    const data  = await response.json();
    return data;
  }