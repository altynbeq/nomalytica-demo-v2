import React, { useState, useEffect } from 'react';
import { getDateRange } from '../../methods/getDateRange';
import { fetchDeals } from '../../methods/getDeals';

export const weekDataSalesFormer = (list) => {
    let leadsStats = {
        leadsCount: list.length,
        leadsSource: {
            'Instagram': 0,
            'WhatsApp': 0,
            'Другое': 0,
        },
        IS_RETURN_CUSTOMER: {
            'Y': 0,
            'N': 0
        },
        workersStats: {},
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
        // Date when lead was created
        const createDate = new Date(lead.DATE_CREATE);
        // Get day of the week as string
        const dayOfWeek = createDate.toLocaleDateString('en-US', { weekday: 'long' });

        const dayIndex = leadsStats.series.findIndex(item => item.x === dayOfWeek);
        if (dayIndex !== -1) {
            leadsStats.series[dayIndex].y += 1;
        }
        if(lead.IS_RETURN_CUSTOMER == 'Y'){
            leadsStats.IS_RETURN_CUSTOMER['Y']++;
        } else {
            leadsStats.IS_RETURN_CUSTOMER['N']++;
        }
        
        if(lead.SOURCE_ID == "1|WZ_WHATSAPP_C114153D8D9A4291B1327806CA4BC2DBF"){
            leadsStats.leadsSource['WhatsApp']++;
        } else if(lead.SOURCE_ID == "1|FBINSTAGRAMDIRECT"){
            leadsStats.leadsSource['Instagram']++;
        } else {
            leadsStats.leadsSource['Другое']++;
        }

        const workerId = lead.LAST_ACTIVITY_BY;
        if (workersStats[workerId]) {
            workersStats[workerId].count += 1;
        } else {
            workersStats[workerId] = { count: 1 };
        }
    });

    leadsStats.workersStats = workersStats;

    return leadsStats;
}

