import React from 'react';
import {  FiBarChart, FiCreditCard, FiStar, FiShoppingCart } from 'react-icons/fi';
import {  BsBoxSeam, BsCurrencyDollar, BsShield, BsChatLeft } from 'react-icons/bs';
import { MdOutlineSupervisorAccount } from 'react-icons/md';
import { HiOutlineRefresh } from 'react-icons/hi';
import { TiTick } from 'react-icons/ti';
import avatar from './avatar.jpg';
import avatar2 from './avatar2.jpg';
import avatar3 from './avatar3.png';
import avatar4 from './avatar4.jpg';


export const earningData = [
    {
      icon: <MdOutlineSupervisorAccount />,
      amount: '39,354',
      percentage: '-4%',
      title: 'Клиенты',
      iconColor: '#03C9D7',
      iconBg: '#E5FAFB',
      pcColor: 'red-600',
    },
    {
      icon: <BsBoxSeam />,
      amount: '4,396',
      percentage: '+23%',
      title: 'Продукты',
      iconColor: 'rgb(255, 244, 229)',
      iconBg: 'rgb(254, 201, 15)',
      pcColor: 'green-600',
    },
    {
      icon: <FiBarChart />,
      amount: '423,39',
      percentage: '+38%',
      title: 'Продажи',
      iconColor: 'rgb(228, 106, 118)',
      iconBg: 'rgb(255, 244, 229)',
      pcColor: 'green-600',
    },
    {
      icon: <HiOutlineRefresh />,
      amount: '39,354',
      percentage: '-12%',
      title: 'Возвраты',
      iconColor: 'rgb(0, 194, 146)',
      iconBg: 'rgb(235, 250, 242)',
      pcColor: 'red-600',
    },
  ];


export const medicalproBranding = {
    data: [
      {
        title: 'Срок завершения',
        desc: '23 октября 2021',
      },
      {
        title: 'Бюджет',
        desc: '$98,500',
      },
      {
        title: 'Расходы',
        desc: '$63,000',
      },
    ],
    teams: [
      {
        name: 'Bootstrap',
        color: 'orange',
      },
      {
        name: 'Angular',
        color: '#FB9678',
      },
    ],
    leaders: [
      {
        image: avatar2,
      },
      {
        image: avatar3,
      },
      {
        image: avatar2,
      },
      {
        image: avatar4,
      },
      {
        image: avatar,
      },
    ],
  };


export const recentTransactions = [
    {
      icon: <BsCurrencyDollar />,
      amount: '+$350',
      title: 'Перевод PayPal',
      desc: 'Деньги зачислены',
      iconColor: '#03C9D7',
      iconBg: '#E5FAFB',
      pcColor: 'green-600',
    },
    {
      icon: <BsShield />,
      amount: '-$560',
      desc: 'Оплата счета',
      title: 'Кошелек',
      iconColor: 'rgb(0, 194, 146)',
      iconBg: 'rgb(235, 250, 242)',
      pcColor: 'red-600',
    },
    {
      icon: <FiCreditCard />,
      amount: '+$350',
      title: 'Кредитная карта',
      desc: 'Деньги возвращены',
      iconColor: 'rgb(255, 244, 229)',
      iconBg: 'rgb(254, 201, 15)',
      pcColor: 'green-600',
    },
    {
      icon: <TiTick />,
      amount: '+$350',
      title: 'Банковский перевод',
      desc: 'Деньги зачислены',
      iconColor: 'rgb(228, 106, 118)',
      iconBg: 'rgb(255, 244, 229)',
      pcColor: 'green-600',
    },
    {
      icon: <BsCurrencyDollar />,
      amount: '-$50',
      percentage: '+38%',
      title: 'Возврат',
      desc: 'Платеж отправлен',
      iconColor: '#03C9D7',
      iconBg: '#E5FAFB',
      pcColor: 'red-600',
    },
  ];


export const weeklyStats = [
    {
      icon: <FiShoppingCart />,
      amount: '-$560',
      title: 'Топ продаж',
      desc: 'Кайрат Нуртам',
      iconBg: '#FB9678',
      pcColor: 'red-600',
    },
    {
      icon: <FiStar />,
      amount: '-$560',
      title: 'Лучший продавец',
      desc: 'Саня Сутулый',
      iconBg: 'rgb(254, 201, 15)',
      pcColor: 'red-600',
    },
    {
      icon: <BsChatLeft />,
      amount: '+$560',
      title: 'Самые обсуждаемые',
      desc: 'Пепси 0,5',
      iconBg: '#00C292',
      pcColor: 'green-600',
    },
  ];


export const dropdownData = [
    {
      Id: '1',
      Time: 'March 2021',
    },
    {
      Id: '2',
      Time: 'April 2021',
    }, {
      Id: '3',
      Time: 'May 2021',
    },
  ];

export const SparklineAreaData = [
    { x: 1, yval: 2 },
    { x: 2, yval: 6 },
    { x: 3, yval: 8 },
    { x: 4, yval: 5 },
    { x: 5, yval: 10 },
];

export const ecomPieChartData = [
    { x: '2018', y: 18, text: '10%' },
    { x: '2019', y: 18, text: '10%' },
    { x: '2020', y: 18, text: '10%' },
    { x: '2021', y: 18, text: '10%' },
    { x: '2022', y: 18, text: '10%' },
    { x: '2023', y: 18, text: '10%' },
    { x: '2024', y: 18, text: '10%' },
  ];