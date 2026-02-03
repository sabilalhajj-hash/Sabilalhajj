          import * as XLSX from 'xlsx';

interface ExcelExportOptions {
  filename?: string;
  sheetName?: string;
}

export function exportToExcel<T extends Record<string, any>>(
  data: T[],
  options: ExcelExportOptions = {}
): void {
  const { filename = 'export.xlsx', sheetName = 'Sheet1' } = options;

  // Create a new workbook
  const wb = XLSX.utils.book_new();

  // Convert data to worksheet
  const ws = XLSX.utils.json_to_sheet(data);

  // Add the worksheet to the workbook
  XLSX.utils.book_append_sheet(wb, ws, sheetName);

  // Write the workbook and trigger download
  XLSX.writeFile(wb, filename);
}

// Passenger data interface
interface PassengerData {
  name?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  healthCondition?: string;
}

// Export booking data to Excel
export function exportBookingData(
  programs: any[],
  roomTypes: any[],
  visaTypes: any[],
  selectedOptions?: {
    program?: string;
    room?: string;
    visa?: string;
  },
  passengersData?: PassengerData | PassengerData[]
): void {
  const passengers = Array.isArray(passengersData) ? passengersData : passengersData ? [passengersData] : [];
  const exportData = [
    // Passengers (if provided)
    ...passengers.map((p, i) => ({
      'Type': 'Passenger',
      'Passenger #': i + 1,
      'Name': [p.name, p.lastName].filter(Boolean).join(' ') || '',
      'Email': p.email || '',
      'Phone': p.phone || '',
      'Health Condition': p.healthCondition || '',
      'ID': '',
      'Selected': ''
    })),

    // Programs Sheet Data
    ...programs.map(program => ({
      'Type': 'Program',
      'ID': program.id,
      'Name': program.name,
      'Duration': program.ApproximateDuration,
      'Departure': program.departure,
      'Return': program.return,
      'From': program.from,
      'To': program.to,
      'Description': program.description,
      'Selected': selectedOptions?.program === program.id ? 'Yes' : 'No'
    })),

    // Room Types Sheet Data
    ...roomTypes.map(room => ({
      'Type': 'Room',
      'ID': room.id,
      'Name': room.name,
      'Size': room.size,
      'Capacity': room.capacity,
      'View': room.view,
      'Description': room.description,
      'Selected': selectedOptions?.room === room.id ? 'Yes' : 'No'
    })),

    // Visa Types Sheet Data
    ...visaTypes.map(visa => ({
      'Type': 'Visa',
      'ID': visa.id,
      'Name': visa.name,
      'Processing Time': visa.processing_time ?? visa.processingTime ?? '',
      'Description': visa.description,
      'Selected': selectedOptions?.visa === visa.id ? 'Yes' : 'No'
    }))
  ];

  const filename = `umrah-booking-options-${new Date().toISOString().split('T')[0]}.xlsx`;
  exportToExcel(exportData, { filename, sheetName: 'Booking Options' });
}

export function exportMultipleSheets(
  sheetsData: Array<{
    data: Record<string, any>[];
    sheetName: string;
  }>,
  filename: string = 'export.xlsx'
): void {
  // Create a new workbook
  const wb = XLSX.utils.book_new();

  // Add each sheet to the workbook
  sheetsData.forEach(({ data, sheetName }) => {
    const ws = XLSX.utils.json_to_sheet(data);
    XLSX.utils.book_append_sheet(wb, ws, sheetName);
  });

  // Write the workbook and trigger download
  XLSX.writeFile(wb, filename);
}

// Utility function to format dates for Excel
export function formatDateForExcel(date: Date): string {
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  });
}

// Utility function to format currency for Excel
export function formatCurrencyForExcel(amount: number, currency: string = 'SAR'): string {
  return `${currency} ${amount.toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  })}`;
}