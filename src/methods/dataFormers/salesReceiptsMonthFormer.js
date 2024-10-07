export const sales1CMonthFormer = (data) => {
    const stats = {};

    data.forEach(item => {
        const cashRegisterFullName = item["КассаККМНаименование"];
        const cashRegister = cashRegisterFullName.replace(/.*Склад\s*([^\s)]+).*/, '$1'); // Extract the part after "Склад"
        
        const terminalNames = item["ЭквайринговыйТерминалНаименование"] || "Неопределено";
        const terminals = terminalNames.split(",").map(term => term.trim()); // Split by commas and trim spaces

        const totalDocumentAmount = parseFloat(item["СуммаДокумента"].toString());
        const saleDate = new Date(item["Дата"]);
        const dayOfMonth = saleDate.getDate() - 1; // 0-indexed day of the month
        
        // Initialize store object if it doesn't exist
        if (!stats[cashRegister]) {
            stats[cashRegister] = {
                paidTo: {},
                totalSum: 0,
                totalNumberSales: 0,
                salesSeries: Array.from({ length: 31 }, (_, i) => ({ x: (i + 1).toString(), y: 0 })),
                salesSumSeries: Array.from({ length: 31 }, (_, i) => ({ x: (i + 1).toString(), y: 0 })),
            };
        }

        const storeStats = stats[cashRegister];

        // Calculate how much each terminal gets
        const amountPerTerminal = totalDocumentAmount / terminals.length;

        terminals.forEach(terminal => {
            // Initialize terminal object if it doesn't exist
            if (!storeStats.paidTo[terminal]) {
                storeStats.paidTo[terminal] = 0;
            }

            // Update totals for the terminal
            storeStats.paidTo[terminal] += Math.round(amountPerTerminal);
        });

        // Update store-level totals
        storeStats.totalSum += totalDocumentAmount;
        storeStats.totalNumberSales++;

        // Update sales series
        storeStats.salesSeries[dayOfMonth].y++;
        storeStats.salesSumSeries[dayOfMonth].y += totalDocumentAmount;
    });

    return stats;
};
