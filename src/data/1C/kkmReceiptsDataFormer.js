import React from 'react';

export const kkmReceiptsDataFormer = (data) => {
  const response = {
    totalSum: 0,
    bestSoldItemAmount: {
      name: '',
      amount: 0,
      totalSum: 0
    },
    bestSoldItemSum: {
      name: '',
      amount: 0,
      totalSum: 0
    },
    itemsSold: {}
  };

  data.forEach(item => {
    // Update total sum
    response.totalSum += parseInt(item['Сумма']);

    const itemName = item['НоменклатураНаименование'];
    const itemQuantity = parseInt(item['Количество']);
    const itemSum = parseInt(item['Сумма']);
    if(itemSum.length > 4){
      console.log(itemSum)
    }
    // If the item is not already in itemsSold, initialize it
    if (!response.itemsSold[itemName]) {
      response.itemsSold[itemName] = {
        name: itemName,
        amount: 0,
        totalSum: 0
      };
    }

    // Update the item's quantity and total sum
    response.itemsSold[itemName].amount += itemQuantity;
    response.itemsSold[itemName].totalSum += itemSum;
  });

  // Find the best sold item
  for (const item in response.itemsSold) {
    if (response.itemsSold[item].amount > response.bestSoldItemAmount.amount) {
      response.bestSoldItemAmount = response.itemsSold[item];
    }
    if(response.itemsSold[item].totalSum > response.bestSoldItemSum.totalSum){
      response.bestSoldItemSum = response.itemsSold[item];
    }
  }

  return response;
};
