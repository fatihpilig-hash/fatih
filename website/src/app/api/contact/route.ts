import { NextRequest, NextResponse, after } from "next/server";
import { Resend } from "resend";

const MAX_FIELD_LENGTH = 2000;

const MAKE_WEBHOOK_URL =
  "https://hook.eu1.make.com/uit2exd27lsoc7535lrgxdk5ukqp5p6m";

function notifyMakeWebhook(data: {
  name: string;
  email: string;
  telefon: string;
  nachricht: string;
}) {
  fetch(MAKE_WEBHOOK_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  }).catch((error) => {
    console.error("Contact form: Make webhook failed.", error);
  });
}

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function sanitize(value: unknown): string {
  return typeof value === "string" ? value.trim().slice(0, MAX_FIELD_LENGTH) : "";
}

export async function POST(request: NextRequest) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Ungültige Anfrage." }, { status: 400 });
  }

  // Honeypot: real users never fill this hidden field, bots usually do.
  if (sanitize(body.website)) {
    return NextResponse.json({ ok: true });
  }

  const name = sanitize(body.name);
  const email = sanitize(body.email);
  const phone = sanitize(body.phone);
  const company = sanitize(body.company);
  const message = sanitize(body.message);

  if (!name || !email || !phone || !message) {
    return NextResponse.json(
      { error: "Bitte Name, E-Mail, Telefonnummer und Nachricht ausfüllen." },
      { status: 400 }
    );
  }
  if (!isValidEmail(email)) {
    return NextResponse.json(
      { error: "Bitte eine gültige E-Mail-Adresse angeben." },
      { status: 400 }
    );
  }

  // Runs after the response is sent, so a failure here can never delay or
  // block the Resend send / the client's response, and it fires regardless
  // of whether the Resend send below succeeds.
  after(() =>
    notifyMakeWebhook({ name, email, telefon: phone, nachricht: message })
  );

  const apiKey = process.env.RESEND_API_KEY;
  const toEmail = process.env.CONTACT_TO_EMAIL;
  const fromEmail = process.env.CONTACT_FROM_EMAIL ?? "onboarding@resend.dev";

  if (!apiKey || !toEmail) {
    console.error(
      "Contact form: RESEND_API_KEY or CONTACT_TO_EMAIL is not configured."
    );
    return NextResponse.json(
      { error: "Der Kontaktversand ist derzeit nicht verfügbar." },
      { status: 503 }
    );
  }

  const resend = new Resend(apiKey);

  const { error } = await resend.emails.send({
    from: `Website-Kontaktformular <${fromEmail}>`,
    to: toEmail,
    replyTo: email,
    subject: `Erstgespräch-Anfrage von ${name}${company ? ` (${company})` : ""}`,
    text: [
      `Name: ${name}`,
      `E-Mail: ${email}`,
      `Telefon: ${phone}`,
      `Unternehmen: ${company || "-"}`,
      "",
      message,
    ].join("\n"),
  });

  if (error) {
    console.error("Contact form: Resend send failed.", error);
    return NextResponse.json(
      { error: "Nachricht konnte nicht gesendet werden. Bitte später erneut versuchen." },
      { status: 502 }
    );
  }

  return NextResponse.json({ ok: true });
}
