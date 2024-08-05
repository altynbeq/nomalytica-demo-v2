import React from 'react';

export const sales1CDataFormer = (data) => {
  const processData = (items) => {
    const data1CFormed = {
      paidTo: {},
      totalSum: 0,
      KassaKKMName: {}
    };

    items.forEach(item => {
      const terminal = item["ЭквайринговыйТерминалНаименование"] || "Неопределено";
      const amount = parseFloat(item["Сумма"]);
      const cashRegister = item["КассаККМНаименование"];

      // Initialize terminal if not already present
      if (!data1CFormed.paidTo[terminal]) {
        data1CFormed.paidTo[terminal] = 0;
      }

      // Initialize KKM if not already present
      if (!data1CFormed.KassaKKMName[cashRegister]) {
        data1CFormed.KassaKKMName[cashRegister] = 0;
      }

      // Update terminal and KKM amounts
      data1CFormed.paidTo[terminal] += amount;
      data1CFormed.KassaKKMName[cashRegister] += amount;
      data1CFormed.totalSum += amount;
    });

    return data1CFormed;
  };

  const formedResponse = {
    dayFormedSales1C: processData(data.readyDayData),
    weekFormedSales1C: processData(data.readyWeekData),
    monthFormedSales1C: processData(data.readyMonthData),
  };

  return formedResponse;
};
