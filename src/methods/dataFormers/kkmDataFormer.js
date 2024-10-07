export const kkmReceiptsDataFormer = (receipts) => {
    const storeStats = {};

    receipts.forEach(receipt => {
        const storeName = receipt.КассирНаименование.split(' ')[1]; 
        const kkmName = receipt.КассаККМНаименование.replace(/ОФД Фискальный регистратор |\(Склад.*\)/g, '').trim(); // Simplify KKM name

        if (!storeStats[storeName]) {
            storeStats[storeName] = {
                totalSum: 0,
                totalNumberSales: 0,
                bestSoldItemAmount: { name: '', amount: 0, totalSum: 0 },
                bestSoldItemSum: { name: '', amount: 0, totalSum: 0 },
                leastSoldItemAmount: { name: '', amount: Infinity, totalSum: 0 },
                leastSoldItemSum: { name: '', amount: 0, totalSum: Infinity },
                itemsSold: {},
                kkmStats: {}, // Initialize KKM stats
                salesSeries: Array.from({ length: 31 }, (_, i) => ({ x: (i + 1).toString(), y: 0 })), // For counting sales number
                salesSumSeries: Array.from({ length: 31 }, (_, i) => ({ x: (i + 1).toString(), y: 0 })) // For sales amount
            };
        }

        const store = storeStats[storeName];
        const itemName = receipt.НоменклатураНаименование;
        const itemQuantity = receipt.Количество;
        const itemSum = receipt.Сумма;
        const totalDocumentAmount = receipt.СуммаДокумента;
        const day = new Date(receipt.Дата).getDate(); // Extract the day from the receipt's date

        store.totalSum += totalDocumentAmount;
        store.totalNumberSales++;

        if (!store.itemsSold[itemName]) {
            store.itemsSold[itemName] = { name: itemName, amount: 0, totalSum: 0 };
        }

        store.itemsSold[itemName].amount += itemQuantity;
        store.itemsSold[itemName].totalSum += itemSum;

        // Update sales series (sales count and sales sum series)
        store.salesSeries[day - 1].y += itemQuantity;
        store.salesSumSeries[day - 1].y += itemSum;

        // Update best sold item by amount
        if (store.itemsSold[itemName].amount > store.bestSoldItemAmount.amount) {
            store.bestSoldItemAmount = { 
                name: itemName, 
                amount: store.itemsSold[itemName].amount, 
                totalSum: store.itemsSold[itemName].totalSum 
            };
        }

        // Update best sold item by total sum
        if (store.itemsSold[itemName].totalSum > store.bestSoldItemSum.totalSum) {
            store.bestSoldItemSum = { 
                name: itemName, 
                amount: store.itemsSold[itemName].amount, 
                totalSum: store.itemsSold[itemName].totalSum 
            };
        }

        // Update least sold item by amount
        if (store.itemsSold[itemName].amount < store.leastSoldItemAmount.amount) {
            store.leastSoldItemAmount = { 
                name: itemName, 
                amount: store.itemsSold[itemName].amount, 
                totalSum: store.itemsSold[itemName].totalSum 
            };
        }

        // Update least sold item by total sum
        if (store.itemsSold[itemName].totalSum < store.leastSoldItemSum.totalSum) {
            store.leastSoldItemSum = { 
                name: itemName, 
                amount: store.itemsSold[itemName].amount, 
                totalSum: store.itemsSold[itemName].totalSum 
            };
        }

        // Update KKM stats
        if (!store.kkmStats[kkmName]) {
            store.kkmStats[kkmName] = { count: 0, totalSum: 0 };
        }

        store.kkmStats[kkmName].count += totalDocumentAmount; // or use itemQuantity if needed
        store.kkmStats[kkmName].totalSum += totalDocumentAmount; // or use itemSum if needed
    });

    return storeStats;
};
