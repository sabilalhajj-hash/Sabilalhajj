import { google } from 'googleapis';

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

/** Header: one row per passenger, so columns are booking info + one passenger's details. */
function getHeaderRow(): string[] {
  return [
    'Booking ID',
    'Date',
    'Package',
    'Program',
    'Room',
    'Visa',
    'Passenger #',
    'Name',
    'Last Name',
    'Email',
    'Phone',
    'Health',
  ];
}

/**
 * Build one row per passenger. Number of rows = number of passengers entered (e.g. 2 passengers → 2 rows).
 */
function bookingToRows(data: BookingRowInput): string[][] {
  const base = [
    data.bookingId,
    data.bookingDate,
    data.packageSlug,
    data.programName,
    data.roomName,
    data.visaName,
  ];
  const rows: string[][] = [];
  const passengers = data.passengers ?? [];
  for (let i = 0; i < passengers.length; i++) {
    const p = passengers[i];
    rows.push([
      ...base,
      String(i + 1),
      String(p?.name ?? ''),
      String(p?.lastName ?? ''),
      String(p?.email ?? ''),
      String(p?.phone ?? ''),
      String(p?.healthCondition ?? ''),
    ]);
  }
  return rows;
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

    const rows = bookingToRows(data);
    if (rows.length === 0) return;

    await sheets.spreadsheets.values.append({
      spreadsheetId: sheetId,
      range: `${sheetName}!A:L`,
      valueInputOption: 'USER_ENTERED',
      insertDataOption: 'INSERT_ROWS',
      requestBody: {
        values: rows,
      },
    });
  } catch (err) {
    console.error('Failed to append booking to Google Sheet:', err);
    // Do not throw - booking is already saved in DB; Sheets is optional
  }
}
