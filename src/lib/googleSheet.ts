import { google } from 'googleapis';

const MAX_PASSENGERS = 10;

export interface PassengerRow {
  name?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  healthCondition?: string;
}

export interface BookingRowInput {
  bookingId: string;
  bookingDate: string;
  packageSlug: string;
  programName: string;
  roomName: string;
  visaName: string;
  passengers: PassengerRow[];
}

function getAuthClient() {
  const json = process.env.GOOGLE_SERVICE_ACCOUNT_JSON;
  if (!json) {
    throw new Error('GOOGLE_SERVICE_ACCOUNT_JSON is not set');
  }
  let credentials: object;
  try {
    credentials = JSON.parse(json) as object;
  } catch {
    throw new Error('GOOGLE_SERVICE_ACCOUNT_JSON is invalid JSON');
  }
  const auth = new google.auth.GoogleAuth({
    credentials,
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  });
  return auth;
}

/**
 * Build one row for the sheet: [Booking ID, Date, Package, Program, Room, Visa, P1 Name, P1 Email, P1 Phone, P1 Health, P2 ...]
 */
function bookingToRow(data: BookingRowInput): string[] {
  const base = [
    data.bookingId,
    data.bookingDate,
    data.packageSlug,
    data.programName,
    data.roomName,
    data.visaName,
  ];
  const passengerCells: string[] = [];
  for (let i = 0; i < MAX_PASSENGERS; i++) {
    const p = data.passengers[i];
    if (p) {
      passengerCells.push(
        [p.name, p.lastName].filter(Boolean).join(' ').trim() || '',
        p.email ?? '',
        p.phone ?? '',
        p.healthCondition ?? ''
      );
    } else {
      passengerCells.push('', '', '', '');
    }
  }
  return [...base, ...passengerCells];
}

function getHeaderRow(): string[] {
  const base = ['Booking ID', 'Date', 'Package', 'Program', 'Room', 'Visa'];
  const passengerHeaders: string[] = [];
  for (let i = 1; i <= MAX_PASSENGERS; i++) {
    passengerHeaders.push(`P${i} Name`, `P${i} Email`, `P${i} Phone`, `P${i} Health`);
  }
  return [...base, ...passengerHeaders];
}

/**
 * Append a booking as one row to the Google Sheet. If GOOGLE_SHEET_ID is not set, does nothing.
 * Set GOOGLE_SHEET_ID and GOOGLE_SERVICE_ACCOUNT_JSON in env. Share the sheet with the service account email.
 */
export async function appendBookingToSheet(data: BookingRowInput): Promise<void> {
  const sheetId = process.env.GOOGLE_SHEET_ID;
  if (!sheetId) {
    return;
  }
  const sheetName = process.env.GOOGLE_SHEET_NAME || 'Bookings';

  try {
    const auth = getAuthClient();
    const sheets = google.sheets({ version: 'v4', auth });

    // Check if sheet has any data (need headers?)
    const range = `${sheetName}!A1:Z1`;
    const getRes = await sheets.spreadsheets.values.get({
      spreadsheetId: sheetId,
      range,
    });
    const firstRow = getRes.data.values?.[0];
    if (!firstRow || firstRow.length === 0) {
      // Append header row first
      await sheets.spreadsheets.values.append({
        spreadsheetId: sheetId,
        range: `${sheetName}!A1`,
        valueInputOption: 'USER_ENTERED',
        insertDataOption: 'INSERT_ROWS',
        requestBody: {
          values: [getHeaderRow()],
        },
      });
    }

    const row = bookingToRow(data);
    await sheets.spreadsheets.values.append({
      spreadsheetId: sheetId,
      range: `${sheetName}!A:A`,
      valueInputOption: 'USER_ENTERED',
      insertDataOption: 'INSERT_ROWS',
      requestBody: {
        values: [row],
      },
    });
  } catch (err) {
    console.error('Failed to append booking to Google Sheet:', err);
    // Do not throw - booking is already saved in DB; Sheets is optional
  }
}
