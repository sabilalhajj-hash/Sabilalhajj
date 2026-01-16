# Excel Export Functionality

This guide explains how to use the Excel export functionality in your Next.js application.

## Installation

The `xlsx` library has been installed and is ready to use.

```bash
npm install xlsx
```

## Basic Usage

### 1. Export Simple Data Array

```tsx
import ExcelExportButton from '@/components/ExcelExportButton';

const userData = [
  { name: 'John Doe', email: 'john@example.com', age: 30 },
  { name: 'Jane Smith', email: 'jane@example.com', age: 25 }
];

<ExcelExportButton
  data={userData}
  filename="users.xlsx"
  buttonText="Export Users"
/>
```

### 2. Export Booking Data (Programs, Rooms, Visas)

```tsx
<ExcelExportButton
  programs={programs}
  roomTypes={roomTypes}
  visaTypes={visaTypes}
  selectedOptions={{
    program: selectedProgram,
    room: selectedRoom,
    visa: selectedVisa
  }}
  buttonText="Export Package Options"
/>
```

## Utility Functions

### exportToExcel(data, options)

Basic function to export any array of objects to Excel.

```typescript
import { exportToExcel } from '@/lib/excelExport';

const data = [
  { name: 'Product A', price: 100, category: 'Electronics' },
  { name: 'Product B', price: 200, category: 'Books' }
];

exportToExcel(data, {
  filename: 'products.xlsx',
  sheetName: 'Product List'
});
```

### exportMultipleSheets(sheetsData, filename)

Export multiple sheets in one Excel file.

```typescript
import { exportMultipleSheets } from '@/lib/excelExport';

const sheetsData = [
  {
    data: usersData,
    sheetName: 'Users'
  },
  {
    data: ordersData,
    sheetName: 'Orders'
  }
];

exportMultipleSheets(sheetsData, 'report.xlsx');
```

### exportBookingData(programs, roomTypes, visaTypes, selectedOptions)

Specialized function for exporting Umrah booking data.

```typescript
import { exportBookingData } from '@/lib/excelExport';

exportBookingData(programs, roomTypes, visaTypes, {
  program: 'ramadan-journey',
  room: 'twin',
  visa: 'express'
});
```

## Component Props

### ExcelExportButton Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `data` | `any[]` | - | Array of objects to export |
| `filename` | `string` | `'export.xlsx'` | Name of the exported file |
| `buttonText` | `string` | `'Export to Excel'` | Text shown on the button |
| `className` | `string` | - | Additional CSS classes |
| `programs` | `any[]` | - | Programs data for booking export |
| `roomTypes` | `any[]` | - | Room types data for booking export |
| `visaTypes` | `any[]` | - | Visa types data for booking export |
| `selectedOptions` | `object` | - | Currently selected options |

## Examples

### Example 1: Sales Report

```tsx
const salesData = [
  { month: 'Jan', revenue: 15000, expenses: 8000, profit: 7000 },
  { month: 'Feb', revenue: 18000, expenses: 9000, profit: 9000 }
];

<ExcelExportButton
  data={salesData}
  filename="monthly-sales-report.xlsx"
  buttonText="Download Sales Report"
/>
```

### Example 2: User Management

```tsx
const userData = [
  { id: 1, name: 'Alice', role: 'Admin', status: 'Active' },
  { id: 2, name: 'Bob', role: 'User', status: 'Inactive' }
];

<ExcelExportButton
  data={userData}
  filename="user-management.xlsx"
  buttonText="Export Users"
/>
```

### Example 3: Inventory Data

```tsx
const inventoryData = [
  { item: 'Laptop', stock: 50, price: 1200, category: 'Electronics' },
  { item: 'Book', stock: 200, price: 20, category: 'Education' }
];

<ExcelExportButton
  data={inventoryData}
  filename="inventory-report.xlsx"
  buttonText="Export Inventory"
/>
```

## Advanced Usage

### Custom Data Formatting

```typescript
import { exportToExcel, formatDateForExcel, formatCurrencyForExcel } from '@/lib/excelExport';

const formattedData = orders.map(order => ({
  'Order ID': order.id,
  'Customer': order.customerName,
  'Date': formatDateForExcel(new Date(order.date)),
  'Total': formatCurrencyForExcel(order.total, 'SAR'),
  'Status': order.status
}));

exportToExcel(formattedData, { filename: 'orders.xlsx' });
```

### Multiple Sheets Export

```typescript
import { exportMultipleSheets } from '@/lib/excelExport';

const workbookData = [
  {
    data: customers,
    sheetName: 'Customers'
  },
  {
    data: products,
    sheetName: 'Products'
  },
  {
    data: orders,
    sheetName: 'Orders'
  }
];

exportMultipleSheets(workbookData, 'complete-report.xlsx');
```

## File Location

The Excel files will be automatically downloaded to the user's default download folder. The filename will include a timestamp for uniqueness.

## Browser Compatibility

This functionality works in all modern browsers that support the File API:
- Chrome 14+
- Firefox 20+
- Safari 10+
- Edge 12+

## Error Handling

The export functions include error handling and will show console warnings if something goes wrong. Make sure to check the browser console for any issues.

## Integration in Your App

The ExcelExportButton component can be used anywhere in your React components. It automatically handles the file creation and download process.