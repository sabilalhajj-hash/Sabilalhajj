"use server";

import { Resend } from "resend";

const RESEND_API_KEY = process.env.NEXT_PUBLIC_RESEND_API_KEY;
if (!RESEND_API_KEY) {
  throw new Error('RESEND_API_KEY is not set');
}

const resend = new Resend(RESEND_API_KEY);

export const sendBookingEmail = async (bookingData: any) => {
  try {
    console.log('📧 Sending booking email from server action...');

    // Create professional HTML email content
    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
          <meta charset="utf-8">
          <title>New Booking Request</title>
          <style>
              body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
              .container { max-width: 600px; margin: 0 auto; padding: 20px; }
              .header { color: #1B3C33; border-bottom: 2px solid #1B3C33; padding-bottom: 10px; }
              .section { margin: 20px 0; }
              .performer { background: #f8f9fa; padding: 10px; border-radius: 5px; margin: 10px 0; }
          </style>
      </head>
      <body>
          <div class="container">
              <h1 class="header">🕋 New Umrah Booking Request</h1>

              <div class="section">
                  <h2>Package Details</h2>
                  <p><strong>Package:</strong> ${bookingData.packageName}</p>
                  <p><strong>Dates:</strong> ${bookingData.dates}</p>
                  <p><strong>Price:</strong> €${bookingData.pricePerPerson} per person</p>
                  <p><strong>Program:</strong> ${bookingData.program}</p>
                  <p><strong>Room Type:</strong> ${bookingData.room}</p>
                  <p><strong>Visa Service:</strong> ${bookingData.visa}</p>
                  <p><strong>Adults:</strong> ${bookingData.adults}</p>
              </div>

              <div class="section">
                  <h2>Contact Information</h2>
                  <p><strong>Phone:</strong> ${bookingData.phone}</p>
                  <p><strong>Email:</strong> ${bookingData.email}</p>
              </div>

              <div class="section">
                  <h2>Performer Details</h2>
                  ${bookingData.performers?.map((performer: any, index: number) => `
                      <div class="performer">
                          <strong>Performer ${index + 1}:</strong><br>
                          Name: ${performer.firstName} ${performer.lastName}<br>
                          Nationality: ${performer.nationality}<br>
                          Document Type: ${performer.documentType}
                      </div>
                  `).join('') || 'No performers'}
              </div>

              <div class="section">
                  <p><strong>Submitted At:</strong> ${new Date(bookingData.submittedAt).toLocaleString()}</p>
                  <p><strong>Status:</strong> ${bookingData.status}</p>
              </div>

              <div style="background: #f8f9fa; padding: 15px; border-radius: 5px; margin-top: 20px;">
                  <p><strong>⚠️ Action Required:</strong> Please review this booking request and contact the customer within 24 hours.</p>
              </div>
          </div>
      </body>
      </html>
    `;

    // IMPORTANT: Using Resend's verified domain because Gmail domains need verification
    // To use your Gmail as sender: Go to https://resend.com/domains and verify gmail.com
    const response = await resend.emails.send({
      from: 'Sabil Al Hajj <onboarding@resend.dev>', // Resend's pre-verified domain
      to: 'ymoukhlij@gmail.com', // You receive booking notifications here
      subject: `New Umrah Booking - ${bookingData.packageName}`,
      html: htmlContent,
    });

    console.log('✅ Booking email sent successfully:', response.data?.id);
    return { success: true, emailId: response.data?.id };

  } catch (error) {
    console.error('❌ Failed to send booking email:', error);
    throw error;
  }
};
