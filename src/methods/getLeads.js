

/// Funtion for receiving leads based on given time, use for analytics building, data from bitrix "Romantic Zhez"
export async function fetchLeads(startDateString, endDateString) {
  const webhookUrl = 'https://zhezkazgan-romantic.bitrix24.kz/rest/20509/7o3luefonm9j1wde/crm.lead.list.json';
  
  let allLeads = [];
  let start = 0;
  const batchSize = 50; // Number of items to fetch per request

    try {
        while (true) {
            const response = await fetch(webhookUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    filter: {
                        '>=DATE_CREATE': startDateString,
                        '<=DATE_CREATE': endDateString
                    },
                    // select: ['ASSIGNED_BY_ID', 'CURRENCY_ID', 'DATE_CLOSED', 'DATE_CREATE', 'ID', 'IS_RETURN_CUSTOMER', 'NAME', 'OPENED', 'SOURCE_ID', 'STATUS_ID', 'STATUS_SEMANTIC_ID'],
                    start: start,
                    order: { "ID": "ASC" } // Ensure consistent ordering for pagination
                })
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();

            if (data.error) {
                console.error('Error fetching leads:', data.error);
                break;
            } else {
                allLeads = allLeads.concat(data.result);
                if (data.result.length < batchSize) {
                    // If the number of results is less than the batch size, we've fetched all leads
                    break;
                }
                start += batchSize;
            }
        }
        return allLeads;
    } catch (error) {
      console.error('Error fetching leads:', error);
    }
}