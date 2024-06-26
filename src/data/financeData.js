
// данные по типу поступлений денег (чем платят клиенты)
export const revenueTypesData = [
    { x: 'Наличные', y: 30, text: '30%', color: "red" },
    { x: 'Kaspi QR', y: 60, text: '60%' },
    { x: 'Halyk QR', y: 5, text: '5%' },
    { x: 'Другое', y: 5, text: '5%' },
];

// данные по доходу за неделю
export const weakylRevenue = [
    { x: 1, yval: 350000 },
    { x: 2, yval: 400000 },
    { x: 3, yval: 500000 },
    { x: 4, yval: 250000 },
    { x: 5, yval: 420000 },
    { x: 6, yval: 600000 },
    { x: 7, yval: 420000 },
];

// данные по доходу за месяц
export const ecomPieChartData = [
    { x: '2018', y: 18, text: '10%' },
    { x: '2019', y: 18, text: '10%' },
    { x: '2020', y: 18, text: '10%' },
    { x: '2021', y: 18, text: '10%' },
    { x: '2022', y: 18, text: '10%' },
    { x: '2023', y: 18, text: '10%' },
    { x: '2024', y: 18, text: '10%' },
];


export const stackedChartData = [
    [
      { x: 'Jan', y: 350 },
      { x: 'Feb', y: 440 },
      { x: 'Mar', y: 700 },
      { x: 'Apr', y: 200 },
      { x: 'May', y: 600 },
      { x: 'Jun', y: 159.9 },
      { x: 'July', y: 159.9 },
    ],
    [
      { x: 'Jan', y: 111.1 },
      { x: 'Feb', y: 127.3 },
      { x: 'Mar', y: 143.4 },
      { x: 'Apr', y: 159.9 },
      { x: 'May', y: 159.9 },
      { x: 'Jun', y: 159.9 },
      { x: 'July', y: 159.9 },
    ],
  ];

export const stackedCustomSeries = [
    { dataSource: stackedChartData[0],
    xName: 'x',
    yName: 'y',
    name: 'Продажи',
    type: 'StackingColumn',
    background: 'blue',

    },
    { dataSource: stackedChartData[1],
    xName: 'x',
    yName: 'y',
    name: 'Списание',
    type: 'StackingColumn',
    background: 'red',

    },
];


export const stackedPrimaryXAxis = {
    majorGridLines: { width: 0 },
    minorGridLines: { width: 0 },
    majorTickLines: { width: 0 },
    minorTickLines: { width: 0 },
    interval: 1,
    lineStyle: { width: 0 },
    labelIntersectAction: 'Rotate45',
    valueType: 'Category',
};

export const stackedPrimaryYAxis = {
    lineStyle: { width: 0 },
    minimum: 100,
    maximum: 1000,
    interval: 100,
    majorTickLines: { width: 0 },
    majorGridLines: { width: 1 },
    minorGridLines: { width: 1 },
    minorTickLines: { width: 0 },
    labelFormat: '{value}',
};

// { x: new Date(2024, 2, 2), y: 24 },
// данные для общего финасового показателя
export const lineChartData = [
    [
        { x: new Date(2024, 2, 2), y: 24 },
        { x: new Date(2024, 2, 2), y: 24 },
        { x: new Date(2024, 2, 2), y: 24 },
        { x: new Date(2024, 2, 2), y: 24 },
        { x: new Date(2024, 2, 2), y: 24 },
    ],
    [
        { x: new Date(2024, 2, 2), y: 24 },
        { x: new Date(2024, 2, 2), y: 24 },
        { x: new Date(2024, 2, 2), y: 24 },
        { x: new Date(2024, 2, 2), y: 24 },
        { x: new Date(2024, 2, 2), y: 24 },
    ],
    [
        { x: new Date(2024, 2, 2), y: 24 },
        { x: new Date(2024, 2, 2), y: 24 },
        { x: new Date(2024, 2, 2), y: 24 },
        { x: new Date(2024, 2, 2), y: 24 },
        { x: new Date(2024, 2, 2), y: 24 },
    ],
];

export const lineCustomSeries = [
    { 
        dataSource: lineChartData[0],
        xName: 'x',
        yName: 'y',
        name: 'Выручка',
        width: '2',
        marker: { visible: true, width: 10, height: 10 },
        type: 'Line' 
    },
    { 
        dataSource: lineChartData[1],
        xName: 'x',
        yName: 'y',
        name: 'Средний чек',
        width: '2',
        marker: { visible: true, width: 10, height: 10 },
        type: 'Line'
    },
    { 
        dataSource: lineChartData[2],
        xName: 'x',
        yName: 'y',
        name: 'Продажи',
        width: '2',
        marker: { visible: true, width: 10, height: 10 },
        type: 'Line' 
    },
];


export const LinePrimaryXAxis = {
    valueType: 'DateTime',
    labelFormat: 'y',
    intervalType: 'Years',
    edgeLabelPlacement: 'Shift',
    majorGridLines: { width: 0 },
    background: 'white',
};

export const LinePrimaryYAxis = {
    labelFormat: '{value}%',
    rangePadding: 'None',
    minimum: 0,
    maximum: 100,
    interval: 20,
    lineStyle: { width: 0 },
    majorTickLines: { width: 0 },
    minorTickLines: { width: 0 },
};
