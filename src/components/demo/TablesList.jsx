import { useState, useRef } from 'react';
// import { IconSelector, IconChevronDown, IconChevronUp, IconSearch } from '@tabler/icons-react';
import { FaChevronDown, FaChevronUp, FaFileDownload, FaCheckCircle, FaSearch } from "react-icons/fa";
import { Calendar } from 'primereact/calendar';
import { useStateContext } from "../../contexts/ContextProvider";
import DataGridMaterial from './DataGrid';

function Th({ children, reversed, sorted, onSort }) {
  const Icon = sorted ? (reversed ? FaChevronDown : FaChevronUp) : FaChevronDown;
  return (
    <th className="p-0">
      <button onClick={onSort} className="w-full p-2 hover:bg-gray-100 dark:hover:bg-gray-800 flex justify-between">
        <span className="font-medium text-sm">{children}</span>
        <span className="w-[21px] h-[21px] rounded-full flex justify-center items-center">
          <Icon className="w-4 h-4" stroke={1.5} />
        </span>
      </button>
    </th>
  );
}

function filterData(data, search) {
  const query = search.toLowerCase().trim();
  return data.filter((item) =>
    Object.keys(data[0]).some((key) => item[key].toLowerCase().includes(query))
  );
}

function sortData(data, { sortBy, reversed, search }) {
  if (!sortBy) {
    return filterData(data, search);
  }
  return filterData(
    [...data].sort((a, b) => (reversed ? b[sortBy].localeCompare(a[sortBy]) : a[sortBy].localeCompare(b[sortBy]))),
    search
  );
}

const data = [
  {
    id: 1,
    name: 'Apple iPhone 15',
    company: 'Apple Inc.',
    email: 'support@apple.com',
    price: '1200',
  },
  {
    id: 2,
    name: 'Samsung Galaxy S23',
    company: 'Samsung Electronics',
    email: 'support@samsung.com',
    price: '1000',
  },
  {
    id: 3,
    name: 'Dell XPS 13',
    company: 'Dell Technologies',
    email: 'support@dell.com',
    price: '1500',
  },
  {
    id: 4,
    name: 'Sony WH-1000XM5 Headphones',
    company: 'Sony Corporation',
    email: 'support@sony.com',
    price: '400',
  },
  {
    id: 5,
    name: 'Apple MacBook Pro 14"',
    company: 'Apple Inc.',
    email: 'support@apple.com',
    price: '2500',
  },
  {
    id: 6,
    name: 'Logitech MX Master 3 Mouse',
    company: 'Logitech International',
    email: 'support@logitech.com',
    price: '100',
  },
  {
    id: 7,
    name: 'Google Pixel 8',
    company: 'Google LLC',
    email: 'support@google.com',
    price: '900',
  },
  {
    id: 8,
    name: 'Microsoft Surface Pro 9',
    company: 'Microsoft Corporation',
    email: 'support@microsoft.com',
    price: '1400',
  },
  {
    id: 9,
    name: 'Sony PlayStation 5',
    company: 'Sony Corporation',
    email: 'support@sony.com',
    price: '500',
  },
  {
    id: 10,
    name: 'Amazon Echo Dot',
    company: 'Amazon.com Inc.',
    email: 'support@amazon.com',
    price: '50',
  },
  {
    id: 11,
    name: 'Nvidia RTX 4090 Graphics Card',
    company: 'Nvidia Corporation',
    email: 'support@nvidia.com',
    price: '1800',
  },
  {
    id: 12,
    name: 'Asus ROG Strix Gaming Laptop',
    company: 'AsusTek Computer Inc.',
    email: 'support@asus.com',
    price: '2200',
  },
];



const TableSort = ({title, displayStats}) => {
  const [search, setSearch] = useState('');
  const [sortedData, setSortedData] = useState(data);
  const [sortBy, setSortBy] = useState(null);
  const [reverseSortDirection, setReverseSortDirection] = useState(false);
  const { dateRanges } = useStateContext();
  const stepperRef = useRef(null);
  const handleDateChange = (e) => {

  }
  const [dates, setDates] = useState([new Date(dateRanges[1].startDate.replace('%20', ' ')), new Date(dateRanges[1].endDate.replace('%20', ' '))]);
  const setSorting = (field) => {
    const reversed = field === sortBy ? !reverseSortDirection : false;
    setReverseSortDirection(reversed);
    setSortBy(field);
    setSortedData(sortData(data, { sortBy: field, reversed, search }));
  };

  const handleSearchChange = (event) => {
    const value = event.currentTarget.value;
    setSearch(value);
    setSortedData(sortData(data, { sortBy, reversed: reverseSortDirection, search: value }));
  };

  const rows = sortedData.map((row) => (
    <tr key={row.name}>
      <td className="py-2 px-4">{row.name}</td>
      <td className="py-2 px-4">{row.email}</td>
      <td className="py-2 px-4">{row.company}</td>
      <td className="py-2 px-4">{row.price}</td>
    </tr>
  ));

  return (
    <div className="bg-white w-[85%] p-5 subtle-border  dark:bg-gray-900 overflow-auto">
      <div className='flex flex-row justify-between mb-4 '>
        <div className=''>
            <p className="text-[1rem] font-semibold ">{title}</p>
        </div>
        <div className="flex flex-wrap border-solid border-1 rounded-xl border-black px-2 gap-1">
            <Calendar value={dates} onChange={(e) => {
              handleDateChange(e.value)
              setDates(e.value)
              }} selectionMode="range" readOnlyInput hideOnRangeSelection 
            />
        </div>
      </div>
      {
        displayStats ? 
        <div className=" w-[100%] py-2 border-t-1  pr-2  flex flex-col  md:flex-row md:w-[100%]  md:gap-8 justify-center ">
          <div className='md:flex md:flex-row mb-1'>
            <div className='flex justify-start md:justify-center gap-2  mb-1 border-color flex-row md:flex-col text-start md:mr-5'>
                <p className="text-gray-500 ">Сумма:</p>
                <span className="text-1xl text-green-500">13 500 400 тг</span>
            </div>
            <div className='flex md:border-l-1 justify-start md:justify-center gap-2 md:pl-2 flex-row md:flex-col text-start'>
                <p className="text-gray-500 ">Покупок:</p>
                <p className="text-1xl font-semibold">84</p>
            </div>
          </div>
          <div className='md:flex md:flex-row'>
            <div className='flex justify-start md:border-l-1 mb-1  md:pl-2 flex-col text-start '>
                <p className="text-gray-500 md:mt-1">Сред.выручка за товаров:</p>
                <p className="text-1xl font-semibold mt-1">14 700тг</p>
            </div>
          </div>
          <div className='md:flex md:flex-row'>
            <div className='flex flex-start md:justify-center gap-2 mb-1 md:border-l-1 md:pl-2  border-color flex-row md:flex-col text-start md:mr-5'>
                <p className="text-gray-500">Сумма:</p>
                <span className="text-1xl ">13 500 400 тг</span>
            </div>
          </div>
          <div className='md:flex md:flex-row'>
            <div className='flex justify-start md:justify-center md:border-l-1  gap-2 md:pl-2 flex-row md:flex-col text-start md:mr-5'>
                <p className="text-gray-500">Продано товаров:</p>
                <p className="text-1xl font-semibold">32</p>
            </div>
          </div>
        </div> : 
        <div className=" w-[100%] py-2 border-t-1  pr-2 mb-4 flex flex-col md:flex-row  gap-8 justify-evenly  ">
          <div className='md:flex md:flex-row md:justify-evenly'>
            <div className='flex justify-start  border-color flex-row gap-2 md:gap-0  md:flex-col text-start md:mr-5'>
                <p className="text-gray-500 md:mt-1">На сумму:</p>
                <span className="text-1xl text-green-500">13 500 400 тг</span>
            </div>
            <div className='flex md:border-l-1 mt-2 md:mt-0 md:pl-2 pr-2 gap-2 md:gap-0 flex-row md:flex-col justify-start text-start'>
                <p className="text-gray-500 md:mt-1">Количество списаний:</p>
                <p className="text-[1rem] font-semibold">84</p>
            </div>
            <div className='flex justify-start mt-2 md:mt-0 md:justify-center md:border-l-1  md:pl-2 flex-col text-start md:mr-5'>
                <p className="text-gray-500 mt-1">Основная причина:</p>
                <p className="text-1xl font-semibold">Срок годности (73%)</p>
            </div>
            <div className='flex justify-start mt-2 md:mt-0 md:justify-center md:border-l-1 gap-2 md:gap-0  md:pl-2 flex-row md:flex-col text-start md:mr-5'>
                <p className="text-gray-500 md:mt-1">Списано товара:</p>
                <p className="text-1xl font-semibold">920</p>
            </div>
            <div className='flex justify-start  border-color flex-row gap-2 md:gap-0 md:border-l-1 md:pl-2 md:flex-col text-start md:mr-5'>
                <p className="text-gray-500 md:mt-1">На сумму:</p>
                <span className="text-1xl text-green-500">13 500 400 тг</span>
            </div>
          </div>
        </div>
      }
      <div className="mb-4 relative">
        <DataGridMaterial rows={data} />
      </div>
    </div>
  );
}

export default TableSort;