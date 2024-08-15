export async function calculateSpisanieData(dataFinal) {
    const spisanieFormer = async (items) => {
        const spisanieData = {
            itemsSpisanie: {},
            totalAmountSpisanie: 0,
            series: Array.from({ length: 31 }, (_, i) => ({ x: (i + 1).toString(), y: 0 })),
        };
    
        items.forEach(item => {
            const name = item.НоменклатураНаименование;
            const amount = item.Количество;
            const date = new Date(item.Дата);
            const dayOfMonth = date.getDate();
    
            // Add the amount to the corresponding item in itemsSpisanie
            if (spisanieData.itemsSpisanie[name]) {
                spisanieData.itemsSpisanie[name] += amount;
            } else {
                spisanieData.itemsSpisanie[name] = amount;
            }
    
            // Add the amount to the total amount
            spisanieData.totalAmountSpisanie += amount;
    
            // Add the amount to the corresponding day in the series
            spisanieData.series[dayOfMonth - 1].y += amount;
        });
    
        return spisanieData;
    };
    
    const formerSpisanieData = {
        spisanieDay: await spisanieFormer(dataFinal.readyDayData),
        spisanieWeek: await spisanieFormer(dataFinal.readyWeekData),
        spisanieMonth:  await spisanieFormer(dataFinal.readyMonthData),
    };
    return formerSpisanieData;
}
