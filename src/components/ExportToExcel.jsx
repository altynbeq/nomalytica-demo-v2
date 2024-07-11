import React from 'react';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import 'tailwindcss/tailwind.css';

const jsonData = [
  { name: "John Doe", age: 30, email: "john@example.com" },
  { name: "Jane Doe", age: 25, email: "jane@example.com" },
];

const ExportToExcel = () => {
  const handleExport = () => {
    const worksheet = XLSX.utils.json_to_sheet(jsonData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const data = new Blob([excelBuffer], { type: 'application/octet-stream' });
    saveAs(data, 'data.xlsx');
  };

  return (
    <div className="flex justify-center items-center ">
      <button
        onClick={handleExport}
        className="bg-blue-700 text-white p-3 px-4 rounded-2xl hover:bg-blue-500 focus:outline-none"
      >
        Скачать отчет
      </button>
    </div>
  );
};

export default ExportToExcel;