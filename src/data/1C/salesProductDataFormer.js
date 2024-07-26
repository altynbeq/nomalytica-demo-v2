import React from "react";

export const salesProductDataFormer = (data) => {
    const salesProductsData = {
        itemName: {},
        kassaKKMName: {},
        mostSoldItem: null,
        mostSoldSum: null
      };
      
    data.forEach(item => {
        const name = item["НоменклатураНаименование"];
        const quantity = item["Количество"];
        const price = item["Цена"];
        const amount = item["Сумма"];
        const kassa = item["КассаККМНаименование"];
        
        if (!salesProductsData.itemName[name]) {
            salesProductsData.itemName[name] = {
                count: 0,
                price: price,
                totalSum: 0
            };
        } 
        
        salesProductsData.itemName[name].count += quantity;
        salesProductsData.itemName[name].totalSum += amount;
        
        if (!salesProductsData.kassaKKMName[kassa]) {
            salesProductsData.kassaKKMName[kassa] = {
                count: 0,
                totalSum: 0
            };
        }
        
        salesProductsData.kassaKKMName[kassa].count += quantity;
        salesProductsData.kassaKKMName[kassa].totalSum += amount;
        });
        
        // Determine the mostSoldItem and mostSoldSum
        let mostSoldItem = { name: null, count: 0, totalSum: 0 };
        let mostSoldSum = { name: null, count: 0, totalSum: 0 };
        
        for (const item in salesProductsData.itemName) {
        const currentItem = salesProductsData.itemName[item];
        if (currentItem.count > mostSoldItem.count) {
            mostSoldItem = {
                name: item,
                count: currentItem.count,
                totalSum: currentItem.totalSum
            };
        }
        if (currentItem.totalSum > mostSoldSum.totalSum) {
            mostSoldSum = {
                name: item,
                count: currentItem.count,
                totalSum: currentItem.totalSum
            };
        }
    }
    
    salesProductsData.mostSoldItem = mostSoldItem;
    salesProductsData.mostSoldSum = mostSoldSum;

    return salesProductsData;
}