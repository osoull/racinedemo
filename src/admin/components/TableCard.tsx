import React from 'react';
import { ChevronLeft } from 'lucide-react';

interface TableCardProps {
  title: string;
  columns: string[];
  data: any[];
  renderRow: (item: any) => React.ReactNode;
}

export default function TableCard({ title, columns, data, renderRow }: TableCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm">
      <div className="p-6 border-b">
        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {columns.map((column, index) => (
                <th
                  key={index}
                  className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  {column}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {data.map((item, index) => renderRow(item))}
          </tbody>
        </table>
      </div>
      <div className="p-4 border-t text-center">
        <button className="text-[#2B227C] hover:text-[#1a1648] text-sm font-medium inline-flex items-center">
          عرض المزيد
          <ChevronLeft className="h-4 w-4 mr-1" />
        </button>
      </div>
    </div>
  );
}