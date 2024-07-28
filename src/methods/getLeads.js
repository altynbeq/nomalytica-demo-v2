/// Funtion for receiving leads based on given time, use for analytics building, data from bitrix "Romantic Zhez"
export async function fetchLeads(startDateString, endDateString) {
    const webhookUrl = `https://nomalytics-back.onrender.com/romantic_zhez_bitrix/leads/${startDateString.dateType}-stats?startDate=${startDateString.startDate}&endDate=${startDateString.endDate}`
    //  'https://zhezkazgan-romantic.bitrix24.kz/rest/20509/7o3luefonm9j1wde/crm.lead.list.json';
    // ${startDateString.dateType == 'month' ? 'month' : 'week'}
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