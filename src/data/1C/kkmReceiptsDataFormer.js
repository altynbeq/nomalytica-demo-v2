import React from 'react';

export const kkmReceiptsDataFormer = (data) => {
  const processData = (items) => {
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

    items.forEach(item => {
      // Update total sum
      response.totalSum += parseInt(item['Сумма'], 10);

      const itemName = item['НоменклатураНаименование'];
      const itemQuantity = parseInt(item['Количество'], 10);
      const itemSum = parseInt(item['Сумма'], 10);

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
      if (response.itemsSold[item].totalSum > response.bestSoldItemSum.totalSum) {
        response.bestSoldItemSum = response.itemsSold[item];
      }
    }

    return response;
  };

  const formedResponse = {
    dayFormedKKM: processData(data.readyDayData),
    weekFormedKKM: processData(data.readyWeekData),
    monthFormedKKM: processData(data.readyMonthData),
  };
  return formedResponse;
};
