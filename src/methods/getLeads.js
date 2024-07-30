/// Funtion for receiving leads based on given time, use for analytics building, data from bitrix "Romantic Zhez"
export async function fetchLeads(date) {
    const webhookUrl = `https://nomalytics-back.onrender.com/romantic_zhez_bitrix/leads/${date.dateType}-stats?startDate=${date.startDate}&endDate=${date.endDate}`
    
    try {
        const response = await fetch(webhookUrl, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
      console.error('Error fetching leads:', error);
    }
}