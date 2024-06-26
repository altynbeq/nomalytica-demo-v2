import React, { useState, useEffect } from 'react';
import { getDateRange } from '../../methods/getDateRange';
import { fetchDeals } from '../../methods/getDeals';


export const dealsDataCollector = (list) => {
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
        bestDay: {},
        series: [
            { x: 'Monday', y: 0 },
            { x: 'Tuesday', y: 0 },
            { x: 'Wednesday', y: 0 },
            { x: 'Thursday', y: 0 },
            { x: 'Friday', y: 0 },
            { x: 'Saturday', y: 0 },
            { x: 'Sunday', y: 0 },
        ]
    };
    const workersStats = {};

    list.forEach(lead => {
        // Calculate totalSum
        const opportunity = parseFloat(lead.OPPORTUNITY);
        dealsStats.totalSum += opportunity;
        
        // Date when lead was closed
        const closeDate = new Date(lead.CLOSEDATE);
        // Get day of the week as string
        const dayOfWeek = closeDate.toLocaleDateString('en-US', { weekday: 'long' });

        const dayIndex = dealsStats.series.findIndex(item => item.x === dayOfWeek);
        if (dayIndex !== -1) {
            dealsStats.series[dayIndex].y += opportunity;
        }

        if (lead.CLOSED === 'Y' && lead.STAGE_ID === 'WON' && opportunity !== 0) {
            if (opportunity > dealsStats.maxAmount) {
                dealsStats.maxAmount = opportunity;
                dealsStats.bestSale = lead; // Update the best sale
            }
            if (dealsStats.minAmount === 0 || opportunity < dealsStats.minAmount) {
                dealsStats.minAmount = opportunity;
            }

            const workerId = lead.LAST_ACTIVITY_BY;
            if (workersStats[workerId]) {
                workersStats[workerId].sales += opportunity;
                workersStats[workerId].count += 1;
            } else {
                workersStats[workerId] = { sales: opportunity, count: 1 };
            }
        }
    });

    let bestWorkerId = null;
    let maxWorkerSales = 0;
    let bestWorkerSalesCount = 0;
    for (let workerId in workersStats) {
        if (workersStats[workerId].sales > maxWorkerSales) {
            maxWorkerSales = workersStats[workerId].sales;
            bestWorkerId = workerId;
            bestWorkerSalesCount = workersStats[workerId].count;
        }
    }

    let bestDay = {};
    let maxDaySales = 0;
    dealsStats.series.forEach(day => {
        if (day.y > maxDaySales) {
            maxDaySales = day.y;
            bestDay = day;
        }
    });

    dealsStats.bestWorker = { id: bestWorkerId, salesCount: bestWorkerSalesCount, totalSales: maxWorkerSales };
    dealsStats.workersStats = workersStats;
    dealsStats.bestDay = bestDay;
    dealsStats.maxAmountSeries = dealsStats.maxAmount > 0 ? Math.round(dealsStats.maxAmount * 2) : 0;
    dealsStats.minAmountSeries = dealsStats.minAmount > 0 ? Math.round(dealsStats.minAmount / 2) : 0;
    dealsStats.avgCheck = dealsStats.leadsCount > 0 ? Math.round(dealsStats.totalSum / dealsStats.leadsCount) : 0;

    return dealsStats;
}

