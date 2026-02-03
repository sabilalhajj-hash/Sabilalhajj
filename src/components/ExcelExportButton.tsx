'use client';

import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Download } from 'lucide-react';
import { exportBookingData, exportToExcel } from '@/lib/excelExport';

interface UserData {
  name?: string;
  email?: string;
  phone?: string;
  country?: string;
  city?: string;
  address?: string;
  zip?: string;
}

interface ExcelExportButtonProps {
  data?: any[];
  filename?: string;
  buttonText?: string;
  className?: string;
  // For booking data specifically
  programs?: any[];
  roomTypes?: any[];
  visaTypes?: any[];
  selectedOptions?: {
    program?: string;
    room?: string;
    visa?: string;
  };
  // User data fields
  userData?: UserData;
}

export default function ExcelExportButton({
  data,
  filename = 'export.xlsx',
  buttonText,
  className = '',
  programs,
  roomTypes,
  visaTypes,
  selectedOptions,
  userData
}: ExcelExportButtonProps) {
  const { t } = useTranslation();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const displayButtonText = buttonText || (mounted ? t('common.export_to_excel') : 'Export to Excel');

  const handleExport = () => {
    if (programs && roomTypes && visaTypes) {
      // Export booking data
      exportBookingData(programs, roomTypes, visaTypes, selectedOptions, userData);
    } else if (data) {
      // Export generic data
      exportToExcel(data, { filename });
    } else {
      // Example data for demonstration
      const sampleData = [
        { Name: 'John Doe', Email: 'john@example.com', Age: 30, City: 'New York' },
        { Name: 'Jane Smith', Email: 'jane@example.com', Age: 25, City: 'London' },
        { Name: 'Bob Johnson', Email: 'bob@example.com', Age: 35, City: 'Tokyo' }
      ];
      exportToExcel(sampleData, { filename: 'sample-data.xlsx' });
    }
  };

  return (
    <button
      onClick={handleExport}
      className={`inline-flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-full hover:bg-green-700 transition-colors ${className}`}
    >
      <Download size={16} />
      {displayButtonText}
    </button>
  );
}

// Example usage component
export function ExcelExportExample() {
  const sampleUserData = [
    { id: 1, name: 'Alice', email: 'alice@email.com', status: 'Active', joinDate: '2024-01-15' },
    { id: 2, name: 'Bob', email: 'bob@email.com', status: 'Inactive', joinDate: '2024-02-20' },
    { id: 3, name: 'Charlie', email: 'charlie@email.com', status: 'Active', joinDate: '2024-03-10' }
  ];

  const salesData = [
    { month: 'Jan', sales: 15000, target: 12000, achieved: 'Yes' },
    { month: 'Feb', sales: 18000, target: 15000, achieved: 'Yes' },
    { month: 'Mar', sales: 12000, target: 16000, achieved: 'No' }
  ];

  return (
    <div className="p-6 space-y-4">
      <h2 className="text-xl font-bold mb-4">Excel Export Examples</h2>

      <div className="space-x-4">
        <ExcelExportButton
          data={sampleUserData}
          filename="users-report.xlsx"
          buttonText="Export Users"
        />

        <ExcelExportButton
          data={salesData}
          filename="sales-report.xlsx"
          buttonText="Export Sales"
        />

        <ExcelExportButton
          buttonText="Export Sample Data"
        />
      </div>

      <div className="mt-6 p-4 bg-gray-50 rounded-full">
        <h3 className="font-semibold mb-2">How to use:</h3>
        <pre className="text-sm text-gray-700">
{`// Basic usage
<ExcelExportButton
  data={yourDataArray}
  filename="your-file.xlsx"
  buttonText="Export Data"
/>

// For booking data (with programs, rooms, visas)
<ExcelExportButton
  programs={programs}
  roomTypes={roomTypes}
  visaTypes={visaTypes}
  selectedOptions={{
    program: selectedProgram,
    room: selectedRoom,
    visa: selectedVisa
  }}
  buttonText="Export Booking Options"
/>`}
        </pre>
      </div>
    </div>
  );
}