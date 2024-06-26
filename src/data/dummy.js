import React from 'react';
import { FiCreditCard } from 'react-icons/fi';
import { BsCurrencyDollar, BsShield } from 'react-icons/bs';
import { FaShoppingBasket } from 'react-icons/fa';
import { FaDollarSign } from "react-icons/fa";
import { FaQuestionCircle } from "react-icons/fa";
import { FaUserTie } from "react-icons/fa";
import { FaBook } from "react-icons/fa";
import { FaPhotoVideo } from "react-icons/fa";
import { FaBoxOpen } from "react-icons/fa";
import { FaChartLine } from "react-icons/fa";
import { FaHeadset } from "react-icons/fa";
import avatar from './avatar.jpg';
import avatar2 from './avatar2.jpg';
import avatar3 from './avatar3.png';
import avatar4 from './avatar4.jpg';
import product4 from './product4.jpg';
import product5 from './product5.jpg';
import product6 from './product6.jpg';
import product7 from './product7.jpg';



export const kanbanGrid = [
  { headerText: 'To Do',
    keyField: 'Open',
    allowToggle: true },

  { headerText: 'In Progress',
    keyField: 'InProgress',
    allowToggle: true },

  { headerText: 'Testing',
    keyField: 'Testing',
    allowToggle: true,
    isExpanded: false },

  { headerText: 'Done',
    keyField: 'Close',
    allowToggle: true },
];

export const areaPrimaryXAxis = {
  valueType: 'DateTime',
  labelFormat: 'y',
  majorGridLines: { width: 0 },
  intervalType: 'Years',
  edgeLabelPlacement: 'Shift',
  labelStyle: { color: 'gray' },
};

export const areaPrimaryYAxis = {
  labelFormat: '{value}%',
  lineStyle: { width: 0 },
  maximum: 4,
  interval: 1,
  majorTickLines: { width: 0 },
  minorTickLines: { width: 0 },
  labelStyle: { color: 'gray' },
};
export const barPrimaryXAxis = {
  valueType: 'Category',
  interval: 1,
  majorGridLines: { width: 0 },
};

export const barPrimaryYAxis = {
  majorGridLines: { width: 0 },
  majorTickLines: { width: 0 },
  lineStyle: { width: 0 },
  labelStyle: { color: 'transparent' },
};

const areaChartData = [
  [
    { x: new Date(2002, 0, 1), y: 2.2 },
    { x: new Date(2003, 0, 1), y: 3.4 },
    { x: new Date(2004, 0, 1), y: 2.8 },
    { x: new Date(2005, 0, 1), y: 1.6 },
    { x: new Date(2006, 0, 1), y: 2.3 },
    { x: new Date(2007, 0, 1), y: 2.5 },
    { x: new Date(2008, 0, 1), y: 2.9 },
    { x: new Date(2009, 0, 1), y: 3.8 },
    { x: new Date(2010, 0, 1), y: 1.4 },
    { x: new Date(2011, 0, 1), y: 3.1 },
  ],
  [
    { x: new Date(2002, 0, 1), y: 2 },
    { x: new Date(2003, 0, 1), y: 1.7 },
    { x: new Date(2004, 0, 1), y: 1.8 },
    { x: new Date(2005, 0, 1), y: 2.1 },
    { x: new Date(2006, 0, 1), y: 2.3 },
    { x: new Date(2007, 0, 1), y: 1.7 },
    { x: new Date(2008, 0, 1), y: 1.5 },
    { x: new Date(2009, 0, 1), y: 2.8 },
    { x: new Date(2010, 0, 1), y: 1.5 },
    { x: new Date(2011, 0, 1), y: 2.3 },
  ],
  [
    { x: new Date(2002, 0, 1), y: 0.8 },
    { x: new Date(2003, 0, 1), y: 1.3 },
    { x: new Date(2004, 0, 1), y: 1.1 },
    { x: new Date(2005, 0, 1), y: 1.6 },
    { x: new Date(2006, 0, 1), y: 2 },
    { x: new Date(2007, 0, 1), y: 1.7 },
    { x: new Date(2008, 0, 1), y: 2.3 },
    { x: new Date(2009, 0, 1), y: 2.7 },
    { x: new Date(2010, 0, 1), y: 1.1 },
    { x: new Date(2011, 0, 1), y: 2.3 },
  ],
];

export const areaCustomSeries = [
  {
    dataSource: areaChartData[0],
    xName: 'x',
    yName: 'y',
    name: 'USA',
    opacity: '0.8',
    type: 'SplineArea',
    width: '2',

  },
  {
    dataSource: areaChartData[1],
    xName: 'x',
    yName: 'y',
    name: 'France',
    opacity: '0.8',
    type: 'SplineArea',
    width: '2',
  },
  {
    dataSource: areaChartData[2],
    xName: 'x',
    yName: 'y',
    name: 'Germany',
    opacity: '0.8',
    type: 'SplineArea',
    width: '2',
  },
];

export const barChartData = [
  [
    { x: 'USA', y: 46 },
    { x: 'GBR', y: 27 },
    { x: 'CHN', y: 26 },
  ],
  [
    { x: 'USA', y: 37 },
    { x: 'GBR', y: 23 },
    { x: 'CHN', y: 18 },
  ],
  [
    { x: 'USA', y: 38 },
    { x: 'GBR', y: 17 },
    { x: 'CHN', y: 26 },
  ],
];

export const barCustomSeries = [
  {
    dataSource: barChartData[0],
    xName: 'x',
    yName: 'y',
    name: 'Gold',
    type: 'Column',
    marker: {
      dataLabel: {
        visible: true,
        position: 'Top',
        font: { fontWeight: '600', color: '#ffffff' },
      },
    },
  },
  {
    dataSource: barChartData[1],
    xName: 'x',
    yName: 'y',
    name: 'Silver',
    type: 'Column',
    marker: {
      dataLabel: {
        visible: true,
        position: 'Top',
        font: { fontWeight: '600', color: '#ffffff' },
      },
    },
  },
  {
    dataSource: barChartData[2],
    xName: 'x',
    yName: 'y',
    name: 'Bronze',
    type: 'Column',
    marker: {
      dataLabel: {
        visible: true,
        position: 'Top',
        font: { fontWeight: '600', color: '#ffffff' },
      },
    },
  },
];
export const colorMappingData = [
  [
    { x: 'Jan', y: 6.96 },
    { x: 'Feb', y: 8.9 },
    { x: 'Mar', y: 12 },
    { x: 'Apr', y: 17.5 },
    { x: 'May', y: 22.1 },
    { x: 'June', y: 25 },
    { x: 'July', y: 29.4 },
    { x: 'Aug', y: 29.6 },
    { x: 'Sep', y: 25.8 },
    { x: 'Oct', y: 21.1 },
    { x: 'Nov', y: 15.5 },
    { x: 'Dec', y: 9.9 },
  ],
  ['#FFFF99'],
  ['#FFA500'],
  ['#FF4040'],
];

export const rangeColorMapping = [
  { label: '1°C to 10°C',
    start: '1',
    end: '10',
    colors: colorMappingData[1] },

  { label: '11°C to 20°C',
    start: '11',
    end: '20',
    colors: colorMappingData[2] },

  { label: '21°C to 30°C',
    start: '21',
    end: '30',
    colors: colorMappingData[3] },

];

export const ColorMappingPrimaryXAxis = {
  valueType: 'Category',
  majorGridLines: { width: 0 },
  title: 'Months',
};

export const ColorMappingPrimaryYAxis = {
  lineStyle: { width: 0 },
  majorTickLines: { width: 0 },
  minorTickLines: { width: 0 },
  labelFormat: '{value}°C',
  title: 'Temperature',
};

export const FinancialPrimaryXAxis = {
  valueType: 'DateTime',
  minimum: new Date('2016, 12, 31'),
  maximum: new Date('2017, 9, 30'),
  crosshairTooltip: { enable: true },
  majorGridLines: { width: 0 },
};

export const FinancialPrimaryYAxis = {
  title: 'Price',
  minimum: 100,
  maximum: 180,
  interval: 20,
  lineStyle: { width: 0 },
  majorTickLines: { width: 0 },
};

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

export const links = [
    {
      title: 'аналитика',
      links: [
        {
          name: 'general',
          text: 'Общий обзор',
          icon: <FaChartLine />,
        },
        {
          name: 'finance',
          text: 'Финансы',
          icon: <FaDollarSign />,
        },
        {
          name: 'sales',
          text: 'Продажи',
          icon: <FaShoppingBasket />,
        },
        {
          name: 'workers',
          text: 'Работники',
          icon: <FaUserTie />,
        },
        {
          name: 'sklad',
          text: 'Склад',
          icon: <FaBoxOpen />,
        },
      ],
    },
    {
      title: 'Информация',
      links: [
        {
          name: 'docs',
          text: 'Документация',
          icon: <FaBook />,
        },
        {
          name: 'resources',
          text: 'Обучение',
          icon: <FaPhotoVideo />,
        },
      ],
    },
    {
      title: 'Помощь',
      links: [
        {
          name: 'support',
          text: 'Служка поддержки',
          icon: <FaHeadset />
        },
        {
          name: 'Q&A',
          text: 'Q&A',
          icon: <FaQuestionCircle />,
        }
      ]
    }
];

export const cartData = [
  {
    image:
      product5,
    name: 'butterscotch ice-cream',
    category: 'Milk product',
    price: '$250',
  },
  {
    image:
      product6,
    name: 'Supreme fresh tomato',
    category: 'Vegetable Item',
    price: '$450',
  },
  {
    image:
      product7,
    name: 'Red color candy',
    category: 'Food Item',
    price: '$190',
  },
];

export const chatData = [
  {
    image:
      avatar2,
    message: 'Roman Joined the Team!',
    desc: 'Congratulate him',
    time: '9:08 AM',
  },
  {
    image:
      avatar3,
    message: 'New message received',
    desc: 'Salma sent you new message',
    time: '11:56 AM',
  },
  {
    image:
      avatar4,
    message: 'New Payment received',
    desc: 'Check your earnings',
    time: '4:39 AM',
  },
  {
    image:
      avatar,
    message: 'Jolly completed tasks',
    desc: 'Assign her new tasks',
    time: '1:12 AM',
  },
];

export const productsPerformance = [
  {
    image: product5,
    title: 'Мороженое "Изысканный карамельный вкус"',
    desc: 'Мороженое, Молоко, Порошок',
    rating: 'Хорошее',
    itemSold: '65%',
    earningAmount: '$546,000',
  },
  {
    image: product6,
    title: 'Свежие томаты "Суприм"',
    desc: 'Рынок, Торговый центр',
    rating: 'Отличное',
    itemSold: '98%',
    earningAmount: '$780,000',
  },
  {
    image: product7,
    title: 'Красные конфеты от Gucci',
    desc: 'Шоколад, Вкусняшки',
    rating: 'Среднее',
    itemSold: '46%',
    earningAmount: '$457,000',
  },
  {
    image: product4,
    title: 'Стильная ночная лампа для вашего уюта',
    desc: 'Электричество, Провод, Лампочка',
    rating: 'Плохое',
    itemSold: '23%',
    earningAmount: '$123,000',
  },
];

export const themeColors = [
  {
    name: 'blue-theme',
    color: '#1A97F5',
  },
  {
    name: 'green-theme',
    color: '#03C9D7',
  },
  {
    name: 'purple-theme',
    color: '#7352FF',
  },
  {
    name: 'red-theme',
    color: '#FF5C8E',
  },
  {
    name: 'indigo-theme',
    color: '#1E4DB7',
  },
  {
    color: '#FB9678',
    name: 'orange-theme',
  },
];

export const userProfileData = [
  {
    icon: <BsCurrencyDollar />,
    title: 'My Profile',
    desc: 'Account Settings',
    iconColor: '#03C9D7',
    iconBg: '#E5FAFB',
  },
  {
    icon: <BsShield />,
    title: 'My Inbox',
    desc: 'Messages & Emails',
    iconColor: 'rgb(0, 194, 146)',
    iconBg: 'rgb(235, 250, 242)',
  },
  {
    icon: <FiCreditCard />,
    title: 'My Tasks',
    desc: 'To-do and Daily Tasks',
    iconColor: 'rgb(255, 244, 229)',
    iconBg: 'rgb(254, 201, 15)',
  },
];

export const lineChartData = [
  [
    { x: new Date(2005, 0, 1), y: 21 },
    { x: new Date(2006, 0, 1), y: 24 },
    { x: new Date(2007, 0, 1), y: 36 },
    { x: new Date(2008, 0, 1), y: 38 },
    { x: new Date(2009, 0, 1), y: 54 },
    { x: new Date(2010, 0, 1), y: 57 },
    { x: new Date(2011, 0, 1), y: 70 },
  ],
  [
    { x: new Date(2005, 0, 1), y: 28 },
    { x: new Date(2006, 0, 1), y: 44 },
    { x: new Date(2007, 0, 1), y: 48 },
    { x: new Date(2008, 0, 1), y: 50 },
    { x: new Date(2009, 0, 1), y: 66 },
    { x: new Date(2010, 0, 1), y: 78 },
    { x: new Date(2011, 0, 1), y: 84 },
  ],

  [
    { x: new Date(2005, 0, 1), y: 10 },
    { x: new Date(2006, 0, 1), y: 20 },
    { x: new Date(2007, 0, 1), y: 30 },
    { x: new Date(2008, 0, 1), y: 39 },
    { x: new Date(2009, 0, 1), y: 50 },
    { x: new Date(2010, 0, 1), y: 70 },
    { x: new Date(2011, 0, 1), y: 100 },
  ],
];

export const lineCustomSeries = [
  { dataSource: lineChartData[0],
    xName: 'x',
    yName: 'y',
    name: 'Germany',
    width: '2',
    marker: { visible: true, width: 10, height: 10 },
    type: 'Line' },

  { dataSource: lineChartData[1],
    xName: 'x',
    yName: 'y',
    name: 'England',
    width: '2',
    marker: { visible: true, width: 10, height: 10 },
    type: 'Line' },

  { dataSource: lineChartData[2],
    xName: 'x',
    yName: 'y',
    name: 'India',
    width: '2',
    marker: { visible: true, width: 10, height: 10 },
    type: 'Line' },

];

export const pieChartData = [
  { x: 'Labour', y: 18, text: '18%' },
  { x: 'Legal', y: 8, text: '8%' },
  { x: 'Production', y: 15, text: '15%' },
  { x: 'License', y: 11, text: '11%' },
  { x: 'Facilities', y: 18, text: '18%' },
  { x: 'Taxes', y: 14, text: '14%' },
  { x: 'Insurance', y: 16, text: '16%' },
];

export const stackedChartData = [
  [
    { x: 'Jan', y: 111.1 },
    { x: 'Feb', y: 127.3 },
    { x: 'Mar', y: 143.4 },
    { x: 'Apr', y: 159.9 },
    { x: 'May', y: 159.9 },
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
    name: 'Budget',
    type: 'StackingColumn',
    background: 'blue',

  },

  { dataSource: stackedChartData[1],
    xName: 'x',
    yName: 'y',
    name: 'Expense',
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
  maximum: 400,
  interval: 100,
  majorTickLines: { width: 0 },
  majorGridLines: { width: 1 },
  minorGridLines: { width: 1 },
  minorTickLines: { width: 0 },
  labelFormat: '{value}',
};

export const kanbanData = [
  {
    Id: 'Task 1',
    Title: 'Task - 29001',
    Status: 'Open',
    Summary: 'Analyze the new requirements gathered from the customer.',
    Type: 'Story',
    Priority: 'Low',
    Tags: 'Analyze,Customer',
    Estimate: 3.5,
    Assignee: 'Nancy Davloio',
    RankId: 1,
    Color: '#02897B',
    ClassName: 'e-story, e-low, e-nancy-davloio',
  },
  {
    Id: 'Task 2',
    Title: 'Task - 29002',
    Status: 'InProgress',
    Summary: 'Improve application performance',
    Type: 'Improvement',
    Priority: 'Normal',
    Tags: 'Improvement',
    Estimate: 6,
    Assignee: 'Andrew Fuller',
    RankId: 1,
    Color: '#673AB8',
    ClassName: 'e-improvement, e-normal, e-andrew-fuller',
  },
  {
    Id: 'Task 3',
    Title: 'Task - 29003',
    Status: 'Open',
    Summary: 'Arrange a web meeting with the customer to get new requirements.',
    Type: 'Others',
    Priority: 'Critical',
    Tags: 'Meeting',
    Estimate: 5.5,
    Assignee: 'Janet Leverling',
    RankId: 2,
    Color: '#1F88E5',
    ClassName: 'e-others, e-critical, e-janet-leverling',
  },
  {
    Id: 'Task 4',
    Title: 'Task - 29004',
    Status: 'InProgress',
    Summary: 'Fix the issues reported in the IE browser.',
    Type: 'Bug',
    Priority: 'Critical',
    Tags: 'IE',
    Estimate: 2.5,
    Assignee: 'Janet Leverling',
    RankId: 2,
    Color: '#E64A19',
    ClassName: 'e-bug, e-release, e-janet-leverling',
  },
  {
    Id: 'Task 5',
    Title: 'Task - 29005',
    Status: 'Review',
    Summary: 'Fix the issues reported by the customer.',
    Type: 'Bug',
    Priority: 'Low',
    Tags: 'Customer',
    Estimate: '3.5',
    Assignee: 'Steven walker',
    RankId: 1,
    Color: '#E64A19',
    ClassName: 'e-bug, e-low, e-steven-walker',
  },
  {
    Id: 'Task 6',
    Title: 'Task - 29007',
    Status: 'Validate',
    Summary: 'Validate new requirements',
    Type: 'Improvement',
    Priority: 'Low',
    Tags: 'Validation',
    Estimate: 1.5,
    Assignee: 'Robert King',
    RankId: 1,
    Color: '#673AB8',
    ClassName: 'e-improvement, e-low, e-robert-king',
  },
  {
    Id: 'Task 7',
    Title: 'Task - 29009',
    Status: 'Review',
    Summary: 'Fix the issues reported in Safari browser.',
    Type: 'Bug',
    Priority: 'Critical',
    Tags: 'Fix,Safari',
    Estimate: 1.5,
    Assignee: 'Nancy Davloio',
    RankId: 2,
    Color: '#E64A19',
    ClassName: 'e-bug, e-release, e-nancy-davloio',
  },
  {
    Id: 'Task 8',
    Title: 'Task - 29010',
    Status: 'Close',
    Summary: 'Test the application in the IE browser.',
    Type: 'Story',
    Priority: 'Low',
    Tags: 'Review,IE',
    Estimate: 5.5,
    Assignee: 'Margaret hamilt',
    RankId: 3,
    Color: '#02897B',
    ClassName: 'e-story, e-low, e-margaret-hamilt',
  },
  {
    Id: 'Task 9',
    Title: 'Task - 29011',
    Status: 'Validate',
    Summary: 'Validate the issues reported by the customer.',
    Type: 'Story',
    Priority: 'High',
    Tags: 'Validation,Fix',
    Estimate: 1,
    Assignee: 'Steven walker',
    RankId: 1,
    Color: '#02897B',
    ClassName: 'e-story, e-high, e-steven-walker',
  },
  {
    Id: 'Task 10',
    Title: 'Task - 29015',
    Status: 'Open',
    Summary: 'Show the retrieved data from the server in grid control.',
    Type: 'Story',
    Priority: 'High',
    Tags: 'Database,SQL',
    Estimate: 5.5,
    Assignee: 'Margaret hamilt',
    RankId: 4,
    Color: '#02897B',
    ClassName: 'e-story, e-high, e-margaret-hamilt',
  },
  {
    Id: 'Task 11',
    Title: 'Task - 29016',
    Status: 'InProgress',
    Summary: 'Fix cannot open user’s default database SQL error.',
    Priority: 'Critical',
    Type: 'Bug',
    Tags: 'Database,Sql2008',
    Estimate: 2.5,
    Assignee: 'Janet Leverling',
    RankId: 4,
    Color: '#E64A19',
    ClassName: 'e-bug, e-critical, e-janet-leverling',
  },
  {
    Id: 'Task 12',
    Title: 'Task - 29017',
    Status: 'Review',
    Summary: 'Fix the issues reported in data binding.',
    Type: 'Story',
    Priority: 'Normal',
    Tags: 'Databinding',
    Estimate: '3.5',
    Assignee: 'Janet Leverling',
    RankId: 4,
    Color: '#02897B',
    ClassName: 'e-story, e-normal, e-janet-leverling',
  },
  {
    Id: 'Task 13',
    Title: 'Task - 29018',
    Status: 'Close',
    Summary: 'Analyze SQL server 2008 connection.',
    Type: 'Story',
    Priority: 'Critical',
    Tags: 'Grid,Sql',
    Estimate: 2,
    Assignee: 'Andrew Fuller',
    RankId: 4,
    Color: '#02897B',
    ClassName: 'e-story, e-release, e-andrew-fuller',
  },
  {
    Id: 'Task 14',
    Title: 'Task - 29019',
    Status: 'Validate',
    Summary: 'Validate databinding issues.',
    Type: 'Story',
    Priority: 'Low',
    Tags: 'Validation',
    Estimate: 1.5,
    Assignee: 'Margaret hamilt',
    RankId: 1,
    Color: '#02897B',
    ClassName: 'e-story, e-low, e-margaret-hamilt',
  },
  {
    Id: 'Task 15',
    Title: 'Task - 29020',
    Status: 'Close',
    Summary: 'Analyze grid control.',
    Type: 'Story',
    Priority: 'High',
    Tags: 'Analyze',
    Estimate: 2.5,
    Assignee: 'Margaret hamilt',
    RankId: 5,
    Color: '#02897B',
    ClassName: 'e-story, e-high, e-margaret-hamilt',
  },
  {
    Id: 'Task 16',
    Title: 'Task - 29021',
    Status: 'Close',
    Summary: 'Stored procedure for initial data binding of the grid.',
    Type: 'Others',
    Priority: 'Critical',
    Tags: 'Databinding',
    Estimate: 1.5,
    Assignee: 'Steven walker',
    RankId: 6,
    Color: '#1F88E5',
    ClassName: 'e-others, e-release, e-steven-walker',
  },
  {
    Id: 'Task 17',
    Title: 'Task - 29022',
    Status: 'Close',
    Summary: 'Analyze stored procedures.',
    Type: 'Story',
    Priority: 'Critical',
    Tags: 'Procedures',
    Estimate: 5.5,
    Assignee: 'Janet Leverling',
    RankId: 7,
    Color: '#02897B',
    ClassName: 'e-story, e-release, e-janet-leverling',
  },
  {
    Id: 'Task 18',
    Title: 'Task - 29023',
    Status: 'Validate',
    Summary: 'Validate editing issues.',
    Type: 'Story',
    Priority: 'Critical',
    Tags: 'Editing',
    Estimate: 1,
    Assignee: 'Nancy Davloio',
    RankId: 1,
    Color: '#02897B',
    ClassName: 'e-story, e-critical, e-nancy-davloio',
  },
  {
    Id: 'Task 19',
    Title: 'Task - 29024',
    Status: 'Review',
    Summary: 'Test editing functionality.',
    Type: 'Story',
    Priority: 'Normal',
    Tags: 'Editing,Test',
    Estimate: 0.5,
    Assignee: 'Nancy Davloio',
    RankId: 5,
    Color: '#02897B',
    ClassName: 'e-story, e-normal, e-nancy-davloio',
  },
  {
    Id: 'Task 20',
    Title: 'Task - 29025',
    Status: 'Open',
    Summary: 'Enhance editing functionality.',
    Type: 'Improvement',
    Priority: 'Low',
    Tags: 'Editing',
    Estimate: 3.5,
    Assignee: 'Andrew Fuller',
    RankId: 5,
    Color: '#673AB8',
    ClassName: 'e-improvement, e-low, e-andrew-fuller',
  },
  {
    Id: 'Task 21',
    Title: 'Task - 29026',
    Status: 'InProgress',
    Summary: 'Improve the performance of the editing functionality.',
    Type: 'Epic',
    Priority: 'High',
    Tags: 'Performance',
    Estimate: 6,
    Assignee: 'Nancy Davloio',
    RankId: 5,
    Color: '#e91e64',
    ClassName: 'e-epic, e-high, e-nancy-davloio',
  },
  {
    Id: 'Task 22',
    Title: 'Task - 29027',
    Status: 'Open',
    Summary: 'Arrange web meeting with the customer to show editing demo.',
    Type: 'Others',
    Priority: 'High',
    Tags: 'Meeting,Editing',
    Estimate: 5.5,
    Assignee: 'Steven walker',
    RankId: 6,
    Color: '#1F88E5',
    ClassName: 'e-others, e-high, e-steven-walker',
  },
  {
    Id: 'Task 23',
    Title: 'Task - 29029',
    Status: 'Review',
    Summary: 'Fix the editing issues reported by the customer.',
    Type: 'Bug',
    Priority: 'Low',
    Tags: 'Editing,Fix',
    Estimate: '3.5',
    Assignee: 'Janet Leverling',
    RankId: 6,
    Color: '#E64A19',
    ClassName: 'e-bug, e-low, e-janet-leverling',
  },
  {
    Id: 'Task 24',
    Title: 'Task - 29030',
    Status: 'Testing',
    Summary: 'Fix the issues reported by the customer.',
    Type: 'Bug',
    Priority: 'Critical',
    Tags: 'Customer',
    Estimate: '3.5',
    Assignee: 'Steven walker',
    RankId: 1,
    Color: '#E64A19',
    ClassName: 'e-bug, e-critical, e-steven-walker',
  },
  {
    Id: 'Task 25',
    Title: 'Task - 29031',
    Status: 'Testing',
    Summary: 'Fix the issues reported in Safari browser.',
    Type: 'Bug',
    Priority: 'Critical',
    Tags: 'Fix,Safari',
    Estimate: 1.5,
    Assignee: 'Nancy Davloio',
    RankId: 2,
    Color: '#E64A19',
    ClassName: 'e-bug, e-release, e-nancy-davloio',
  },
];

export const financialChartData = [
  {
    x: new Date('2012-04-02'),
    open: 85.9757,
    high: 90.6657,
    low: 85.7685,
    close: 90.5257,
    volume: 660187068,
  },
  {
    x: new Date('2012-04-09'),
    open: 89.4471,
    high: 92,
    low: 86.2157,
    close: 86.4614,
    volume: 912634864,
  },
  {
    x: new Date('2012-04-16'),
    open: 87.1514,
    high: 88.6071,
    low: 81.4885,
    close: 81.8543,
    volume: 1221746066,
  },
  {
    x: new Date('2012-04-23'),
    open: 81.5157,
    high: 88.2857,
    low: 79.2857,
    close: 86.1428,
    volume: 965935749,
  },
  {
    x: new Date('2012-04-30'),
    open: 85.4,
    high: 85.4857,
    low: 80.7385,
    close: 80.75,
    volume: 615249365,
  },
  {
    x: new Date('2012-05-07'),
    open: 80.2143,
    high: 82.2685,
    low: 79.8185,
    close: 80.9585,
    volume: 541742692,
  },
  {
    x: new Date('2012-05-14'),
    open: 80.3671,
    high: 81.0728,
    low: 74.5971,
    close: 75.7685,
    volume: 708126233,
  },
  {
    x: new Date('2012-05-21'),
    open: 76.3571,
    high: 82.3571,
    low: 76.2928,
    close: 80.3271,
    volume: 682076215,
  },
  {
    x: new Date('2012-05-28'),
    open: 81.5571,
    high: 83.0714,
    low: 80.0743,
    close: 80.1414,
    volume: 480059584,
  },
  {
    x: new Date('2012-06-04'),
    open: 80.2143,
    high: 82.9405,
    low: 78.3571,
    close: 82.9028,
    volume: 517577005,
  },
  {
    x: new Date('2012-06-11'),
    open: 83.96,
    high: 84.0714,
    low: 80.9571,
    close: 82.0185,
    volume: 499693120,
  },
  {
    x: new Date('2012-06-18'),
    open: 81.5657,
    high: 84.2857,
    low: 81.4814,
    close: 83.1571,
    volume: 442172142,
  },
  {
    x: new Date('2012-06-25'),
    open: 82.4714,
    high: 83.4285,
    low: 80.8014,
    close: 83.4285,
    volume: 371529102,
  },
  {
    x: new Date('2017-07-31'),
    open: 149.9,
    high: 159.75,
    low: 148.13,
    close: 156.39,
    volume: 170204830,
  },
  {
    x: new Date('2017-08-07'),
    open: 157.06,
    high: 161.83,
    low: 154.63,
    close: 157.48,
    volume: 149860480,
  },
  {
    x: new Date('2017-08-14'),
    open: 159.32,
    high: 162.51,
    low: 156.72,
    close: 157.5,
    volume: 133829670,
  },
  {
    x: new Date('2017-08-21'),
    open: 157.5,
    high: 160.74,
    low: 155.1101,
    close: 159.86,
    volume: 112238670,
  },
  {
    x: new Date('2017-08-28'),
    open: 160.14,
    high: 164.94,
    low: 159.93,
    close: 164.05,
    volume: 125610990,
  },
  {
    x: new Date('2017-09-04'),
    open: 163.75,
    high: 164.25,
    low: 158.53,
    close: 158.63,
    volume: 101419110,
  },
  {
    x: new Date('2017-09-11'),
    open: 160.5,
    high: 163.96,
    low: 157.91,
    close: 159.88,
    volume: 220431100,
  },
  {
    x: new Date('2017-09-18'),
    open: 160.11,
    high: 160.5,
    low: 157.995,
    close: 158.67,
    volume: 27939544,
  },
];

export const PyramidData = [
  { x: 'Sweet Treats', y: 120, text: '120 cal' },
  { x: 'Milk, Youghnut, Cheese', y: 435, text: '435 cal' },
  { x: 'Vegetables', y: 470, text: '470 cal' },
  { x: 'Meat, Poultry, Fish', y: 475, text: '475 cal' },
  { x: 'Fruits', y: 520, text: '520 cal' },
  { x: 'Bread, Rice, Pasta', y: 930, text: '930 cal' },
];