import { FaRegUserCircle } from "react-icons/fa";
import { FaTasks } from "react-icons/fa";



export const floristList = [
  {
    icon: <FaRegUserCircle />,
    amount: '+30%',
    title: 'Кайрат Нуртам',
    desc: 'Топ продаж',
    iconBg: '#FB9678',
    pcColor: 'green-600',
  },
  {
    icon: <FaRegUserCircle />,
    amount: '+12%',
    title: 'Акерке Оразали',
    desc: '№2',
    iconBg: 'rgb(254, 201, 15)',
    pcColor: 'green-600',
  },
  {
    icon: <FaRegUserCircle />,
    amount: '+$7',
    title: 'Арай',
    desc: '№3',
    iconBg: '#00C292',
    pcColor: 'green-600',
  },
  {
      icon: <FaRegUserCircle />,
      amount: '-15%',
      title: 'Камилла',
      desc: '№4',
      iconBg: '#FB9678',
      pcColor: 'red-600',
    },
    {
      icon: <FaRegUserCircle />,
      amount: '-36%',
      title: 'Ажар',
      desc: '№5',
      iconBg: 'rgb(254, 201, 15)',
      pcColor: 'red-600',
    },
   
];

export const cusSupportList = [
  {
    icon: <FaRegUserCircle />,
    amount: '+56%',
    title: 'Топ продаж',
    desc: 'Кайрат Нуртам',
    iconBg: '#FB9678',
    pcColor: 'green-600',
  },
  {
    icon: <FaRegUserCircle />,
    amount: '+27%',
    title: 'Лучший продавец',
    desc: 'Саня Сутулый',
    iconBg: 'rgb(254, 201, 15)',
    pcColor: 'green-600',
  },
  {
    icon: <FaRegUserCircle />,
    amount: '+4%',
    title: 'Самые обсуждаемые',
    desc: 'Пепси 0,5',
    iconBg: '#00C292',
    pcColor: 'green-600',
  },
  {
      icon: <FaRegUserCircle />,
      amount: '+2%',
      title: 'Топ продаж',
      desc: 'Кайрат Нуртам',
      iconBg: '#FB9678',
      pcColor: 'green-600',
    },
    {
      icon: <FaRegUserCircle />,
      amount: '-7%',
      title: 'Лучший продавец',
      desc: 'Саня Сутулый',
      iconBg: 'rgb(254, 201, 15)',
      pcColor: 'red-600',
    },
];

export const tasksList = [
  {
    icon: <FaTasks />,
    title: 'Продать 10 роз',
    desc: 'Кайрат Нуртам',
    iconBg: '#FB9678',
  },
  {
    icon: <FaTasks />,
    title: 'Продать 30 тульпанов',
    desc: 'Кайрат Нуртам',
    iconBg: '#FB9678',
  },
  {
    icon: <FaTasks />,
    title: 'Закрыть две акции',
    desc: 'Кайрат Нуртам',
    iconBg: '#FB9678',
  },
  {
    icon: <FaTasks />,
    title: 'Продать 5 упаковок',
    desc: 'Кайрат Нуртам',
    iconBg: '#FB9678',
  },
];

export const floristsStats = [
    {
      id: 1,
      name: 'Кайрат Нуртам',
      itemsSold: 170,
      avgCheck: 11500,
      conversion: 37,
      tasksStats: [
        {
          x: 'Завершенные задачи',
          y: 3,
          text: '64%',
        },
        {
          x: 'Не завершенные задачи',
          y: 2,
          text: '36%',
        },
      ]
    },
    {
      id: 2,
      name: 'Акерке Оразали',
      itemsSold: 162,
      avgCheck: 1700,
      conversion: 12,
      tasksStats: [
        {
          x: 'Завершенные задачи',
          y: 2,
          text: '36%',
        },
        {
          x: 'Не завершенные задачи',
          y: 3,
          text: '64%',
        },
      ]
    },
    {
      id: 3,
      name: 'Арай',
      itemsSold: 145,
      avgCheck: 14500,
      conversion: 70,
      tasksStats: [
        {
          x: 'Завершенные задачи',
          y: 5,
          text: '100%',
        },
        {
          x: 'Не завершенные задачи',
          y: 0,
          text: '0%',
        },
      ]
    },
    {
      id: 4,
      name: 'Камилла',
      itemsSold: 95,
      avgCheck: 200,
      conversion: 39,
      tasksStats: [
        {
          x: 'Завершенные задачи',
          y: 1,
          text: '50%',
        },
        {
          x: 'Не завершенные задачи',
          y: 1,
          text: '50%',
        },
      ]
    },
    {
      id: 5,
      name: 'Ажар',
      itemsSold: 87,
      avgCheck: 9000,
      conversion: 9,
      tasksStats: [
        {
          x: 'Завершенные задачи',
          y: 4,
          text: '80%',
        },
        {
          x: 'Не завершенные задачи',
          y: 1,
          text: '20%',
        },
      ]
    },
]


export const callCenterStats = [
  {
    id: 1,
    name: 'Денис',
    itemsSold: 170,
    avgCheck: 11500,
    conversion: 45,
    tasksStats: [
      {
        x: 'Завершенные задачи',
        y: 2,
        text: '50%',
      },
      {
        x: 'Не завершенные задачи',
        y: 2,
        text: '50%',
      },
    ]
  },
  {
    id: 2,
    name: 'Арай',
    itemsSold: 162,
    avgCheck: 1700,
    conversion: 19,
    tasksStats: [
      {
        x: 'Завершенные задачи',
        y: 1,
        text: '10%',
      },
      {
        x: 'Не завершенные задачи',
        y: 4,
        text: '90%',
      },
    ]
  },
  {
    id: 3,
    name: 'Алишер',
    itemsSold: 145,
    avgCheck: 14500,
    conversion: 44,
    tasksStats: [
      {
        x: 'Завершенные задачи',
        y: 0,
        text: '0%',
      },
      {
        x: 'Не завершенные задачи',
        y: 5,
        text: '100%',
      },
    ]
  },
  {
    id: 4,
    name: 'Камилла Ким',
    itemsSold: 95,
    avgCheck: 200,
    conversion: 37,
    tasksStats: [
      {
        x: 'Завершенные задачи',
        y: 1,
        text: '20%',
      },
      {
        x: 'Не завершенные задачи',
        y: 4,
        text: '80%',
      },
    ]
  },
  {
    id: 5,
    name: 'Данияр',
    itemsSold: 87,
    avgCheck: 9000,
    conversion: 17,
    tasksStats: [
      {
        x: 'Завершенные задачи',
        y: 2,
        text: '40%',
      },
      {
        x: 'Не завершенные задачи',
        y: 3,
        text: '60%',
      },
    ]
  },
]