import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const { seating, guests, date, state, city, phone, email } = data;

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
          <p>Wir haben Ihre Event-Anfrage für den <b>${date}</b> (${guests} Personen) erhalten.</p>
          <p><b>Sitzplatz:</b> ${seating}</p>
          <p><b>Ort:</b> ${city}, ${state}</p>
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
      subject: `Neue Event-Anfrage: ${date} (${guests} Personen)`,
      html: `
        <div style="font-family: sans-serif; color: #353941; padding: 20px;">
          <h2>Neue Catering / Event Anfrage</h2>
          <p><b>Datum:</b> ${date}</p>
          <p><b>Gäste:</b> ${guests}</p>
          <p><b>Sitzplatz:</b> ${seating}</p>
          <p><b>Ort:</b> ${city}, ${state}</p>
          <p><b>Telefon:</b> ${phone}</p>
          <p><b>Email:</b> ${email}</p>
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