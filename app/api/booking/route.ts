import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { validateBooking, escapeHtml } from "../../../lib/bookingValidation";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const result = validateBooking(body);

    if (!result.valid) {
      return NextResponse.json({ error: result.error }, { status: 400 });
    }

    const { seating, guests, date, state, city, phone, email } = result.data;
    const safeDate = escapeHtml(date);
    const safeSeating = escapeHtml(seating);
    const safeState = escapeHtml(state);
    const safeCity = escapeHtml(city);
    const safePhone = escapeHtml(phone);
    const safeEmail = escapeHtml(email);

    // Configure SMTP Transporter using Gmail App Password
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    });

    // 1. Thank You Email to Customer
    const customerMailOptions = {
      from: `"MainBar Schweinfurt" <${process.env.GMAIL_USER}>`,
      to: email,
      subject: "Ihre Anfrage bei MainBar Event & Catering",
      html: `
        <div style="font-family: sans-serif; color: #353941; padding: 20px;">
          <h2>Vielen Dank für Ihre Anfrage!</h2>
          <p>Wir haben Ihre Event-Anfrage für den <b>${safeDate}</b> (${guests} Personen) erhalten.</p>
          <p><b>Sitzplatz:</b> ${safeSeating}</p>
          <p><b>Ort:</b> ${safeCity}, ${safeState}</p>
          <br/>
          <p>Unser Team prüft aktuell die Verfügbarkeit und meldet sich in Kürze bei Ihnen.</p>
          <p><i>Ihr MainBar Team</i></p>
        </div>
      `,
    };

    // 2. Alert Email to Owner
    const ownerMailOptions = {
      from: `"MainBar Website" <${process.env.GMAIL_USER}>`,
      to: process.env.GMAIL_USER, // Sends directly to the owner email
      subject: `Neue Event-Anfrage: ${safeDate} (${guests} Personen)`,
      html: `
        <div style="font-family: sans-serif; color: #353941; padding: 20px;">
          <h2>Neue Catering / Event Anfrage</h2>
          <p><b>Datum:</b> ${safeDate}</p>
          <p><b>Gäste:</b> ${guests}</p>
          <p><b>Sitzplatz:</b> ${safeSeating}</p>
          <p><b>Ort:</b> ${safeCity}, ${safeState}</p>
          <p><b>Telefon:</b> ${safePhone}</p>
          <p><b>Email:</b> ${safeEmail}</p>
        </div>
      `,
    };

    // Send both emails simultaneously
    await Promise.all([
      transporter.sendMail(customerMailOptions),
      transporter.sendMail(ownerMailOptions),
    ]);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Email send error:", error);
    return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
  }
}