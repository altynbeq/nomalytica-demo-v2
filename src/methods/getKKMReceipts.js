import { Base64 } from 'js-base64';

export async function getKKMReceipts() {
    try {
        while (true) {
            const response = await fetch('http://212.46.56.10:84/ut_zhezkazgan/hs/sales-kkm-receipts-list/GetSalesReceipts', {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': {
                        "Username": 'Алтынбек',
                        "Password": '5521'
                    }
                }
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            console.log(data);
            return data;
        }
    } catch (error) {
        console.error('Error fetching KKMReceipts:', error);
        return []; // Return an empty array in case of error
    }
}
