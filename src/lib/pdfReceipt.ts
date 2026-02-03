import { jsPDF } from 'jspdf';

export interface PassengerData {
  name?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  healthCondition?: string;
}

export interface BookingReceiptData {
  title?: string;
  subtitle?: string;
  /** Optional logo URL (same-origin, e.g. /sabilalhajj-removebg.png). Logo is drawn in the header. */
  logoUrl?: string;
  packageSlug: string;
  packageName?: string;
  programName: string;
  roomName: string;
  visaName: string;
  passengers: PassengerData[];
  bookingId?: string;
  bookingDate: string;
  labels?: {
    receipt?: string;
    package?: string;
    program?: string;
    room?: string;
    visa?: string;
    passengers?: string;
    passenger?: string;
    name?: string;
    email?: string;
    phone?: string;
    health?: string;
    date?: string;
    bookingId?: string;
    thankYou?: string;
    bookingDetails?: string;
    infoEnteredByUser?: string;
  };
}

const defaultLabels = {
  receipt: 'Reçu de réservation / Reservation Receipt',
  package: 'Package',
  program: 'Program',
  room: 'Room',
  visa: 'Visa',
  passengers: 'Passengers',
  passenger: 'Passenger',
  name: 'Name',
  email: 'Email',
  phone: 'Phone',
  health: 'Health condition',
  date: 'Date',
  bookingId: 'Booking reference',
  thankYou: 'Thank you. We will contact you via WhatsApp.',
  bookingDetails: 'Booking details',
  infoEnteredByUser: 'Information entered by the user',
};

const DEFAULT_LOGO_URL = '/sabilalhajj-removebg.png';
const HEADER_HEIGHT_MM = 32;
const LOGO_MAX_WIDTH_MM = 24;
const LOGO_MAX_HEIGHT_MM = 22;

function loadImageAsDataUrl(url: string): Promise<string | null> {
  return fetch(url)
    .then((r) => (r.ok ? r.blob() : Promise.reject(new Error('Failed to load image'))))
    .then(
      (blob) =>
        new Promise<string>((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () => resolve(reader.result as string);
          reader.onerror = reject;
          reader.readAsDataURL(blob);
        })
    )
    .catch(() => null);
}

export async function generateBookingReceiptPdf(data: BookingReceiptData): Promise<void> {
  const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
  const labels = { ...defaultLabels, ...data.labels };
  const margin = 20;
  const pageWidth = 210;
  let y = margin;
  const lineHeight = 7;
  const smallLine = 5;
  const contentWidth = pageWidth - 2 * margin;

  const addText = (text: string, fontSize: number = 11, isBold: boolean = false, maxWidth?: number) => {
    doc.setFontSize(fontSize);
    doc.setFont('helvetica', isBold ? 'bold' : 'normal');
    const w = maxWidth ?? contentWidth;
    const lines = doc.splitTextToSize(text, w);
    lines.forEach((line: string) => {
      doc.text(line, margin, y);
      y += lineHeight;
    });
  };

  // ----- Header: logo + website name -----
  doc.setFillColor(27, 60, 51); // #1B3C33
  doc.rect(0, 0, pageWidth, HEADER_HEIGHT_MM, 'F');
  doc.setTextColor(255, 255, 255);

  const logoUrl = data.logoUrl ?? (typeof window !== 'undefined' ? DEFAULT_LOGO_URL : undefined);
  let logoDataUrl: string | null = null;
  if (logoUrl && typeof window !== 'undefined') {
    logoDataUrl = await loadImageAsDataUrl(logoUrl.startsWith('http') ? logoUrl : `${window.location.origin}${logoUrl}`);
  }

  if (logoDataUrl) {
    try {
      const imgW = LOGO_MAX_WIDTH_MM;
      const imgH = LOGO_MAX_HEIGHT_MM;
      const logoX = 18;
      const logoY = (HEADER_HEIGHT_MM - imgH) / 2;
      doc.addImage(logoDataUrl, 'PNG', logoX, logoY, imgW, imgH);
    } catch {
      // ignore image errors
    }
  }

  const titleX = logoDataUrl ? margin + LOGO_MAX_WIDTH_MM + 10 : margin;
  const titleW = pageWidth - titleX - margin;
  doc.setFontSize(18);
  doc.setFont('helvetica', 'bold');
  doc.text(data.title || 'Sabil Al-Hajj', titleX + titleW / 2, 12, { align: 'center' });
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.text(data.subtitle || labels.receipt, titleX + titleW / 2, 20, { align: 'center' });
  doc.setTextColor(0, 0, 0);
  y = HEADER_HEIGHT_MM + 14;

  // ----- Booking details (package, program, room, visa, ref, date) -----
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.text(labels.bookingDetails ?? defaultLabels.bookingDetails, margin, y);
  y += lineHeight;

  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  addText(`${labels.package}: ${data.packageName || data.packageSlug}`, 10, true);
  y += smallLine;
  addText(`${labels.program}: ${data.programName}`, 10);
  addText(`${labels.room}: ${data.roomName}`, 10);
  addText(`${labels.visa}: ${data.visaName}`, 10);
  y += smallLine;
  if (data.bookingId) {
    addText(`${labels.bookingId}: ${data.bookingId}`, 10, true);
    y += smallLine;
  }
  addText(`${labels.date}: ${data.bookingDate}`, 10);
  y += lineHeight;

  // ----- Passengers: names and all info entered by the user -----
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.text(labels.passengers, margin, y);
  y += smallLine;
  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  const infoSubtitle = labels.infoEnteredByUser ?? defaultLabels.infoEnteredByUser;
  doc.setTextColor(80, 80, 80);
  doc.text(infoSubtitle, margin, y);
  doc.setTextColor(0, 0, 0);
  y += lineHeight;

  data.passengers.forEach((p, i) => {
    if (y > 265) {
      doc.addPage();
      y = 20;
    }
    const fullName = [p.name, p.lastName].filter(Boolean).join(' ');
    doc.setFontSize(10);
    doc.setFont('helvetica', 'bold');
    doc.text(`${labels.passenger} ${i + 1}: ${fullName || '—'}`, margin, y);
    y += smallLine;
    doc.setFont('helvetica', 'normal');
    if (p.email) {
      doc.text(`  ${labels.email}: ${p.email}`, margin, y);
      y += smallLine;
    }
    if (p.phone) {
      doc.text(`  ${labels.phone}: ${p.phone}`, margin, y);
      y += smallLine;
    }
    if (p.healthCondition) {
      doc.text(`  ${labels.health}: ${p.healthCondition}`, margin, y);
      y += smallLine;
    }
    y += smallLine;
  });

  if (y > 250) {
    doc.addPage();
    y = 20;
  }
  y += lineHeight;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  const thankYou = doc.splitTextToSize(labels.thankYou, contentWidth);
  thankYou.forEach((line: string) => {
    doc.text(line, margin, y);
    y += lineHeight;
  });

  const filename = `recu-reservation-${data.packageSlug}-${new Date().toISOString().slice(0, 10)}.pdf`;
  doc.save(filename);
}
