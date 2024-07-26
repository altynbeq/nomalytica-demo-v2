import React from 'react';

export const sales1CDataFormer = (data) => {
    // main object to return 
    const data1CFormed = {
        paidTo: {},
        totalSum: 0,
        KassaKKMName: {}
      };
    
    data.forEach(item => {
    const terminal = item["ЭквайринговыйТерминалНаименование"] || "Неопределено";
    const amount = item["Сумма"];
    const cashRegister = item["КассаККМНаименование"];
    //if the terminal is undefined
    if (!data1CFormed.paidTo[terminal]) {
        data1CFormed.paidTo[terminal] = 0;
    }
    // if KKM is undefined
    if (!data1CFormed.KassaKKMName[cashRegister]) {
        data1CFormed.KassaKKMName[cashRegister] = 0;
    }
    
    data1CFormed.paidTo[terminal] += amount;
    data1CFormed.KassaKKMName[cashRegister] += amount;
    data1CFormed.totalSum += amount;
    });

    return data1CFormed;
}