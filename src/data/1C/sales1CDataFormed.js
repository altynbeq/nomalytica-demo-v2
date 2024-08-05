import React from 'react';

export const sales1CDataFormer = (data) => {
  const getEmptySeries = (type) => {
    if (type === 'week') {
      return [
        { x: 'Monday', y: 0 },
        { x: 'Tuesday', y: 0 },
        { x: 'Wednesday', y: 0 },
        { x: 'Thursday', y: 0 },
        { x: 'Friday', y: 0 },
        { x: 'Saturday', y: 0 },
        { x: 'Sunday', y: 0 }
      ];
    } else {
      return Array.from({ length: 31 }, (_, i) => ({ x: (i + 1).toString(), y: 0 }));
    }
  };

  const processData = (items, dateType) => {
    const salesSeries = getEmptySeries(dateType);
    const salesSumSeries = getEmptySeries(dateType);

    const data1CFormed = {
      paidTo: {},
      totalSum: 0,
      KassaKKMName: {},
      salesSeries,
      salesSumSeries,
      totalNumberSales: 0
    };

    items.forEach(item => {
      const terminal = item["ЭквайринговыйТерминалНаименование"] || "Неопределено";
      const amount = parseFloat(item["Сумма"]);
      const cashRegister = item["КассаККМНаименование"];
      const saleDate = new Date(item["Дата"]);
      
      let seriesIndex;
      if (dateType === 'week') {
        // getDay returns 0 for Sunday, so we map it to the last index (6)
        const dayOfWeek = saleDate.getDay();
        seriesIndex = dayOfWeek === 0 ? 6 : dayOfWeek - 1;
      } else {
        const dayOfMonth = saleDate.getDate();
        seriesIndex = dayOfMonth - 1;
      }

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
      data1CFormed.totalNumberSales++;

      data1CFormed.salesSeries[seriesIndex].y++;
      data1CFormed.salesSumSeries[seriesIndex].y += amount;
    });

    return data1CFormed;
  };

  const formedResponse = {
    dayFormedSales1C: processData(data.readyDayData, 'day'),
    weekFormedSales1C: processData(data.readyWeekData, 'week'),
    monthFormedSales1C: processData(data.readyMonthData, 'month'),
  };

  return formedResponse;
};
