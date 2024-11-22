import React from 'react';
import { formatCurrency, formatNumber } from '../utils/formatters';

interface ProjectFinancialsProps {
  metrics: {
    [year: string]: {
      revenue: number;
      profit: number;
      roi: number;
      debtRatio: number;
    };
  };
  isEditing?: boolean;
  canEdit?: boolean;
  onUpdate?: (year: string, field: string, value: number) => void;
}

export default function ProjectFinancials({ 
  metrics, 
  isEditing = false,
  canEdit = false,
  onUpdate 
}: ProjectFinancialsProps) {
  return (
    <div className="bg-white rounded-2xl p-8 shadow-sm">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">المؤشرات المالية</h2>
      <div className="grid grid-cols-2 gap-8">
        {Object.entries(metrics)
          .sort((a, b) => Number(b[0]) - Number(a[0]))
          .map(([year, data]) => (
            <div key={year} className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">{year}</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-500">الإيرادات</p>
                  {isEditing && canEdit ? (
                    <input
                      type="number"
                      value={data.revenue}
                      onChange={(e) => onUpdate?.(year, 'revenue', Number(e.target.value))}
                      className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#2B227C]"
                    />
                  ) : (
                    <p className="text-lg font-bold">{formatCurrency(data.revenue)}</p>
                  )}
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-500">صافي الربح</p>
                  {isEditing && canEdit ? (
                    <input
                      type="number"
                      value={data.profit}
                      onChange={(e) => onUpdate?.(year, 'profit', Number(e.target.value))}
                      className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#2B227C]"
                    />
                  ) : (
                    <p className="text-lg font-bold">{formatCurrency(data.profit)}</p>
                  )}
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-500">العائد على الاستثمار</p>
                  {isEditing && canEdit ? (
                    <input
                      type="number"
                      value={data.roi}
                      onChange={(e) => onUpdate?.(year, 'roi', Number(e.target.value))}
                      className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#2B227C]"
                    />
                  ) : (
                    <p className="text-lg font-bold">{formatNumber(data.roi)}%</p>
                  )}
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-500">نسبة الدين</p>
                  {isEditing && canEdit ? (
                    <input
                      type="number"
                      value={data.debtRatio * 100}
                      onChange={(e) => onUpdate?.(year, 'debtRatio', Number(e.target.value) / 100)}
                      className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#2B227C]"
                    />
                  ) : (
                    <p className="text-lg font-bold">{formatNumber(data.debtRatio * 100)}%</p>
                  )}
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}