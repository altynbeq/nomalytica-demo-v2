// import React from 'react';

// const sales1CMonthFormer = (data) => {
//   const processedDocuments = new Set();
//   const data1CFormed = {
//     paidTo: {},
//     totalSum: 0,
//     KassaKKMName: {},
//     salesSeries: Array.from({ length: 31 }, (_, i) => ({ x: (i + 1).toString(), y: 0 })),
//     salesSumSeries: Array.from({ length: 31 }, (_, i) => ({ x: (i + 1).toString(), y: 0 })),
//     totalNumberSales: 0
//   };

//   data.forEach(item => {
//     const terminal = item["ЭквайринговыйТерминалНаименование"] || "Неопределено";
//     const amount = item["Сумма"];
//     const cashRegister = item["КассаККМНаименование"];
//     const saleDate = new Date(item["Дата"]);
//     const saleHour = saleDate.getHours();

//     // Adjust date for sales between midnight and 1 AM
//     if (saleHour < 1) {
//       saleDate.setDate(saleDate.getDate() - 1);
//     }

//     const dayOfMonth = saleDate.getDate() - 1; // Subtract 1 to match array index (0-30)
//     const documentNumber = item["Номер"];
//     const totalDocumentAmount = parseFloat(item["СуммаДокумента"]);

//     // Create a unique key for each document on a specific day
//     const uniqueDocKey = `${saleDate.toISOString().split('T')[0]}-${documentNumber}-${totalDocumentAmount}`;

//     if (!data1CFormed.paidTo[terminal]) {
//       data1CFormed.paidTo[terminal] = 0;
//     }

//     if (!data1CFormed.KassaKKMName[cashRegister]) {
//       data1CFormed.KassaKKMName[cashRegister] = 0;
//     }

//     if (!processedDocuments.has(uniqueDocKey)) {
//       // Add unique document key to the set
//       processedDocuments.add(uniqueDocKey);

//       // Update the total sum and sales series
//       data1CFormed.totalSum += totalDocumentAmount;
//       data1CFormed.paidTo[terminal] += totalDocumentAmount;
//       data1CFormed.KassaKKMName[cashRegister] += totalDocumentAmount;
//       data1CFormed.totalNumberSales++; // Increment the total number of sales

//       // Update sales series and sum series
//       data1CFormed.salesSeries[dayOfMonth].y++;
//       data1CFormed.salesSumSeries[dayOfMonth].y += totalDocumentAmount;
//     }
//   });

//   return data1CFormed;
// };

// export const sales1CDataFormer = (data) => {
//   const processData = (items) => {
//     const processedDocuments = new Set();

//     const data1CFormed = {
//       paidTo: {},
//       totalSum: 0,
//       KassaKKMName: {},
//       salesSeries: [
        
//         { x: 'Thursday', y: 0 },
//         { x: 'Friday', y: 0 },
//         { x: 'Saturday', y: 0 },
//         { x: 'Sunday', y: 0 },
//         { x: 'Monday', y: 0 },
//         { x: 'Tuesday', y: 0 },
//         { x: 'Wednesday', y: 0 },
//       ],
//       salesSumSeries: [
        
//         { x: 'Thursday', y: 0 },
//         { x: 'Friday', y: 0 },
//         { x: 'Saturday', y: 0 },
//         { x: 'Sunday', y: 0 },
//         { x: 'Monday', y: 0 },
//         { x: 'Tuesday', y: 0 },
//         { x: 'Wednesday', y: 0 },
//       ],
//       totalNumberSales: 0
//     };

//     items.forEach(item => {
//       const documentNumber = item["Номер"];
//       const cashRegister = item["КассаККМНаименование"];
//       const terminal = item["ЭквайринговыйТерминалНаименование"] || "Неопределено";
//       const amount = parseFloat(item["Сумма"]);
//       const totalDocumentAmount = parseFloat(item["СуммаДокумента"]);
//       const saleDate = new Date(item["Дата"]);
//       const saleHour = saleDate.getHours();

//       // Adjust date for sales between midnight and 1 AM
//       if (saleHour < 1) {
//         saleDate.setDate(saleDate.getDate() - 1);
//       }

//       // Get day of week (0 - Sunday, 1 - Monday, ..., 6 - Saturday)
//       const dayOfWeek = saleDate.getDay();
//       const daysOfWeek = ['Thursday', 'Friday', 'Saturday', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', ];
//       const dayName = daysOfWeek[dayOfWeek];

//       // Create a unique key for each document on a specific day
//       const uniqueDocKey = `${saleDate.toISOString().split('T')[0]}-${documentNumber}-${totalDocumentAmount}`;

//       // Initialize terminal if not already present
//       if (!data1CFormed.paidTo[terminal]) {
//         data1CFormed.paidTo[terminal] = 0;
//       }

//       // Initialize KKM if not already present
//       if (!data1CFormed.KassaKKMName[cashRegister]) {
//         data1CFormed.KassaKKMName[cashRegister] = 0;
//       }

//       // Only count the total document amount if the uniqueDocKey hasn't been processed
//       if (!processedDocuments.has(uniqueDocKey)) {
//         // Add unique document key to the set
//         processedDocuments.add(uniqueDocKey);
  
//         // Update the total sum and sales series
//         data1CFormed.totalSum += totalDocumentAmount;
//         data1CFormed.paidTo[terminal] += totalDocumentAmount;
//         data1CFormed.KassaKKMName[cashRegister] += totalDocumentAmount;
//         data1CFormed.totalNumberSales++; // Increment the total number of sales
        
//         const salesDay = data1CFormed.salesSeries.find(day => day.x === dayName);
//         if (salesDay) {
//           salesDay.y++;
//         }
//         const salesSumDay = data1CFormed.salesSumSeries.find(day => day.x === dayName);
//         if (salesSumDay) {
//           salesSumDay.y += totalDocumentAmount;
//         }
//       }


//       // // Update sales series and salesSumSeries
//       // const salesDay = data1CFormed.salesSeries.find(day => day.x === dayName);
//       // if (salesDay) {
//       //   salesDay.y++;
//       // }
//       // const salesSumDay = data1CFormed.salesSumSeries.find(day => day.x === dayName);
//       // if (salesSumDay) {
//       //   salesSumDay.y += totalDocumentAmount;
//       // }
//     });

//     return data1CFormed;
//   };

//   const formedResponse = {
//     dayFormedSales1C: processData(data.readyDayData),
//     weekFormedSales1C: processData(data.readyWeekData),
//     monthFormedSales1C: sales1CMonthFormer(data.readyMonthData),
//   };
//   return formedResponse;
// };


import React from 'react';

const sales1CMonthFormer = (data) => {
  const processedDocuments = new Set();
  const data1CFormed = {
    paidTo: {},
    totalSum: 0,
    KassaKKMName: {},
    salesSeries: Array.from({ length: 31 }, (_, i) => ({ x: (i + 1).toString(), y: 0 })),
    salesSumSeries: Array.from({ length: 31 }, (_, i) => ({ x: (i + 1).toString(), y: 0 })),
    totalNumberSales: 0
  };

  data.forEach(item => {
    const terminal = item["ЭквайринговыйТерминалНаименование"] || "Неопределено";
    const amount = item["Сумма"];
    const cashRegister = item["КассаККМНаименование"];
    const saleDate = new Date(item["Дата"]);
    const saleHour = saleDate.getHours();

    // Adjust date for sales between midnight and 1 AM
    if (saleHour < 1) {
      saleDate.setDate(saleDate.getDate() - 1);
    }

    const dayOfMonth = saleDate.getDate() - 1; // Subtract 1 to match array index (0-30)
    const documentNumber = item["Номер"];
    const totalDocumentAmount = parseFloat(item["СуммаДокумента"]);

    // Create a unique key for each document on a specific day
    const uniqueDocKey = `${saleDate.toISOString().split('T')[0]}-${documentNumber}-${totalDocumentAmount}`;

    if (!data1CFormed.paidTo[terminal]) {
      data1CFormed.paidTo[terminal] = 0;
    }

    if (!data1CFormed.KassaKKMName[cashRegister]) {
      data1CFormed.KassaKKMName[cashRegister] = 0;
    }

    if (!processedDocuments.has(uniqueDocKey)) {
      processedDocuments.add(uniqueDocKey);

      // Update the total sum and sales series
      data1CFormed.totalSum += totalDocumentAmount;
      data1CFormed.paidTo[terminal] += totalDocumentAmount;
      data1CFormed.KassaKKMName[cashRegister] += totalDocumentAmount;
      data1CFormed.totalNumberSales++; // Increment the total number of sales

      // Update sales series and sum series
      data1CFormed.salesSeries[dayOfMonth].y++;
      data1CFormed.salesSumSeries[dayOfMonth].y += totalDocumentAmount;
    }
  });

  return data1CFormed;
};

export const sales1CDataFormer = (data) => {
  const processData = (items) => {
    const processedDocuments = new Set();

    const data1CFormed = {
      paidTo: {},
      totalSum: 0,
      KassaKKMName: {},
      salesSeries: [
        { x: 'Thursday', y: 0 },
        { x: 'Friday', y: 0 },
        { x: 'Saturday', y: 0 },
        { x: 'Sunday', y: 0 },
        { x: 'Monday', y: 0 },
        { x: 'Tuesday', y: 0 },
        { x: 'Wednesday', y: 0 },
      ],
      salesSumSeries: [
        { x: 'Thursday', y: 0 },
        { x: 'Friday', y: 0 },
        { x: 'Saturday', y: 0 },
        { x: 'Sunday', y: 0 },
        { x: 'Monday', y: 0 },
        { x: 'Tuesday', y: 0 },
        { x: 'Wednesday', y: 0 },
      ],
      totalNumberSales: 0,
    };

    items.forEach(item => {
      const documentNumber = item["Номер"];
      const cashRegister = item["КассаККМНаименование"];
      const terminal = item["ЭквайринговыйТерминалНаименование"] || "Неопределено";
      const totalDocumentAmount = parseFloat(item["СуммаДокумента"]);
      const saleDate = new Date(item["Дата"]);
      const saleHour = saleDate.getHours();

      // Adjust date for sales between midnight and 1 AM
      if (saleHour < 1) {
        saleDate.setDate(saleDate.getDate() - 1);
      }

      // Determine the correct day of the week based on your custom week starting on Thursday
      const dayOfWeek = (saleDate.getDay() + 3) % 7; // Shift Sunday to 6, Monday to 0, ..., Thursday to 4
      const dayName = data1CFormed.salesSeries[dayOfWeek].x;

      // Create a unique key for each document on a specific day
      const uniqueDocKey = `${saleDate.toISOString().split('T')[0]}-${documentNumber}-${totalDocumentAmount}`;

      if (!data1CFormed.paidTo[terminal]) {
        data1CFormed.paidTo[terminal] = 0;
      }

      if (!data1CFormed.KassaKKMName[cashRegister]) {
        data1CFormed.KassaKKMName[cashRegister] = 0;
      }

      if (!processedDocuments.has(uniqueDocKey)) {
        processedDocuments.add(uniqueDocKey);

        // Update the total sum and sales series
        data1CFormed.totalSum += totalDocumentAmount;
        data1CFormed.paidTo[terminal] += totalDocumentAmount;
        data1CFormed.KassaKKMName[cashRegister] += totalDocumentAmount;
        data1CFormed.totalNumberSales++; // Increment the total number of sales

        data1CFormed.salesSeries[dayOfWeek].y++;
        data1CFormed.salesSumSeries[dayOfWeek].y += totalDocumentAmount;
      }
    });

    return data1CFormed;
  };

  const formedResponse = {
    dayFormedSales1C: processData(data.readyDayData),
    weekFormedSales1C: processData(data.readyWeekData),
    yesterdayFromedSales1C: processData(data.readyYesterdayData),
    monthFormedSales1C: sales1CMonthFormer(data.readyMonthData),
  };

  return formedResponse;
};