import React, { useState, useEffect } from 'react';
import { getDateRange } from '../../methods/getDateRange';
import { fetchDeals } from '../../methods/getDeals';


export const monthDealsDataCollector = (list) => {
    let dealsStats = {
        leadsCount: list.length,
        totalSum: 0,
        avgCheck: 0,
        maxAmount: 0,
        minAmount: 0,
        maxAmountSeries: 0,
        minAmountSeries: 0,
        bestSale: {},
        bestWorker: {},
        workersStats: {},
        series: Array.from({ length: 31 }, (_, index) => ({ x: `${index + 1}`, y: 0 }))
    };
    const workersStats = {};

    const today = new Date();

    list.forEach(lead => {
        // Calculate totalSum
        dealsStats.totalSum += parseFloat(lead.OPPORTUNITY);
        // Date when lead was closed
        const closeDate = new Date(lead.CLOSEDATE);
        // Get day of the month
        const dayOfMonth = closeDate.getDate();

        // Only process dates up to today
        if (closeDate <= today) {
            const dayIndex = dayOfMonth - 1; // Adjust day index
            if (dayIndex >= 0 && dayIndex < 31) {
                dealsStats.series[dayIndex].y += parseFloat(lead.OPPORTUNITY);
            }
        }

        const opportunity = parseFloat(lead.OPPORTUNITY);

        if (lead.CLOSED === 'Y' && opportunity !== 0) {
            if (opportunity > dealsStats.maxAmount) {
                dealsStats.maxAmount = opportunity;
            }
            if (dealsStats.minAmount === 0 || opportunity < dealsStats.minAmount) {
                dealsStats.minAmount = opportunity;
            }
            // Check for the best deal
            if (opportunity === dealsStats.maxAmount) {
                dealsStats.bestSale = lead; // Push the best deal into the bestSale array
            } else if (!dealsStats.bestSale) {
                dealsStats.bestSale = lead; // If bestSale is empty, push the first deal
            }
            
            const workerId = lead.LAST_ACTIVITY_BY;
            if (workersStats[workerId]) {
                workersStats[workerId]++;
            } else {
                workersStats[workerId] = 1;
            }
        }
    });
   
    let bestId = null;
    let maxSales = 0;
    
    for (let workerId in workersStats) {
        if (workersStats[workerId] > maxSales) {
            maxSales = workersStats[workerId];
            bestId = workerId;
        }
    }
    
    dealsStats.bestWorker = { id: bestId, sales: maxSales };
    dealsStats.workersStats = workersStats;
    dealsStats.maxAmountSeries = dealsStats.maxAmount > 0 ? Math.round(dealsStats.maxAmount * 2) : 0;
    dealsStats.minAmountSeries = dealsStats.minAmount > 0 ? Math.round(dealsStats.minAmount / 2) : 0;
    dealsStats.avgCheck = Math.round(dealsStats.totalSum / dealsStats.leadsCount);


    return dealsStats;
}
