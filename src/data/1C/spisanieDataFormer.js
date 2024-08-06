export async function calculateSpisanieData(dataFinal) {
    const spisanieFormer = async (items) => {
        const spisanieData = {
        itemsSpisanie: {},
        totalAmountSpisanie: 0
        };
    
        items.forEach(item => {
        const name = item.НоменклатураНаименование;
        const amount = item.Количество;
    
        // Add the amount to the corresponding item in itemsSpisanie
        if (spisanieData.itemsSpisanie[name]) {
            spisanieData.itemsSpisanie[name] += amount;
        } else {
            spisanieData.itemsSpisanie[name] = amount;
        }
    
        // Add the amount to the total amount
        spisanieData.totalAmountSpisanie += amount;
    });
    return spisanieData;
    }
    
    const formerSpisanieData = {
        spisanieDay: await spisanieFormer(dataFinal.readyDayData),
        spisanieWeek: await spisanieFormer(dataFinal.readyWeekData),
        spisanieMonth:  await spisanieFormer(dataFinal.readyMonthData),
    }
    return formerSpisanieData;
}