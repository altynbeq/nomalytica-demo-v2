import React from "react";

export const salesProductDataFormer = (data) => {
  const processData = (items) => {
    const salesProductsData = {
      itemName: {},
      kassaKKMName: {},
      mostSoldItem: null,
      mostSoldSum: null,
      leastSoldItem: null,
      leastSoldSum: null,
      productsSold: 0,
    };
  
    items.forEach(item => {
      const name = item["НоменклатураНаименование"];
      const quantity = parseFloat(item["Количество"]);
      const price = parseFloat(item["Цена"]);
      const amount = parseFloat(item["Сумма"]);
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
  
    // Initialize most and least sold items
    let mostSoldItem = { name: null, count: 0, totalSum: 0 };
    let mostSoldSum = { name: null, count: 0, totalSum: 0 };
    let leastSoldItem = null;
    let leastSoldSum = null;
  
    for (const item in salesProductsData.itemName) {
      const currentItem = salesProductsData.itemName[item];
  
      // Update most sold item and sum
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
  
      // Update least sold item and sum
      if (!leastSoldItem || currentItem.count < leastSoldItem.count) {
        leastSoldItem = {
          name: item,
          count: currentItem.count,
          totalSum: currentItem.totalSum
        };
      }
      if (!leastSoldSum || currentItem.totalSum < leastSoldSum.totalSum) {
        leastSoldSum = {
          name: item,
          count: currentItem.count,
          totalSum: currentItem.totalSum
        };
      }
  
      salesProductsData.productsSold += currentItem.count;
    }
  
    salesProductsData.mostSoldItem = mostSoldItem;
    salesProductsData.mostSoldSum = mostSoldSum;
    salesProductsData.leastSoldItem = leastSoldItem;
    salesProductsData.leastSoldSum = leastSoldSum;
  
    return salesProductsData;
  };
  

  const formedResponse = {
    dayFormedSalesProduct: processData(data.readyDayData),
    weekFormedSalesProduct: processData(data.readyWeekData),
    monthFormedSalesProduct: processData(data.readyMonthData),
  };

  return formedResponse;
};
