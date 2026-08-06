import { NextResponse } from "next/server";
import { sendEmail } from "@/lib/email-sender";

type EnquiryPayload = {
  name?: string;
  phone?: string;
  email?: string;
  brand?: string;
  website?: string;
  instagram?: string;
  budget?: string;
  challenge?: string;
  goals?: string;
  date?: string;
  time?: string;
  source?: string;
};

function buildEmailBody(payload: EnquiryPayload) {
  const lines = [
    "New Audit Request — Bombay Blokes",
    "",
    `Name: ${payload.name || "-"}`,
    `Phone: ${payload.phone || "-"}`,
    `Email: ${payload.email || "-"}`,
    `Brand: ${payload.brand || "-"}`,
    `Website: ${payload.website || "-"}`,
    `Instagram: ${payload.instagram || "-"}`,
    `Monthly ad budget: ${payload.budget || "-"}`,
    `Biggest marketing challenge: ${payload.challenge || "-"}`,
    `Growth goals: ${payload.goals || "-"}`,
    `Date: ${payload.date || "-"}`,
    `Time: ${payload.time || "-"}`,
    `Source: ${payload.source || "landing-page"}`,
  ];
  return lines.join("\n");
}

function escapeHtml(value: string) {
  return value.replace(/[&<>"]/g, (character) => {
    const entities: Record<string, string> = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
    };
    return entities[character];
  });
}

function buildUserEmail(payload: EnquiryPayload) {
  const name = escapeHtml(payload.name || "there");
  const brand = escapeHtml(payload.brand || payload.website || payload.instagram || "-");

  return `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Bombay Blokes - Ads Audit Request Received</title>
  </head>
  <body style="margin:0; padding:0; background:#f5f5f5; color:#222222; font-family:Arial, Helvetica, sans-serif;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#f5f5f5; padding:24px 12px;">
      <tr>
        <td align="center">
          <table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0" style="width:600px; max-width:600px; background:#ffffff; border:2px solid #fab31e; border-radius:20px 20px 0 0; overflow:hidden;">
            <tr>
              <td style="padding:32px 32px 24px; background:#fff9eb;">
                <p style="margin:0 0 8px; color:#f7b21a; font-size:26px; font-weight:700; line-height:1.2;">Hey ${name},</p>
                <h1 style="margin:0; color:#111111; font-size:32px; line-height:1.2;">Bombay Blokes here...</h1>
              </td>
            </tr>
            <tr>
              <td style="padding:28px 32px 12px;">
                <p style="margin:0; font-size:15px; line-height:23px;">Thanks for requesting your free ads audit. Our team has received your details and will review your current marketing setup.</p>
                <p style="margin:16px 0 0; font-size:15px; line-height:23px;"><strong>A strategist will get in touch within 24 working hours.</strong></p>
              </td>
            </tr>
            <tr>
              <td style="padding:20px 32px;">
                <div style="border-top:2px dotted #f4c882;"></div>
              </td>
            </tr>
            <tr>
              <td style="padding:0 32px 8px;">
                <h2 style="margin:0; font-size:19px; line-height:1.3;">Here's what you submitted</h2>
              </td>
            </tr>
            <tr>
              <td style="padding:8px 32px 20px;">
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="font-size:14px; line-height:22px; color:#444444;">
                  <tr><td style="padding:5px 0; width:170px;"><strong>Name</strong></td><td style="padding:5px 0;">${name}</td></tr>
                  <tr><td style="padding:5px 0;"><strong>Email</strong></td><td style="padding:5px 0;">${escapeHtml(payload.email || "-")}</td></tr>
                  <tr><td style="padding:5px 0;"><strong>Phone</strong></td><td style="padding:5px 0;">${escapeHtml(payload.phone || "-")}</td></tr>
                  <tr><td style="padding:5px 0; vertical-align:top;"><strong>Brand / link</strong></td><td style="padding:5px 0; word-break:break-word;">${brand}</td></tr>
                  <tr><td style="padding:5px 0;"><strong>Monthly ad budget</strong></td><td style="padding:5px 0;">${escapeHtml(payload.budget || "-")}</td></tr>
                  <tr><td style="padding:5px 0; vertical-align:top;"><strong>Marketing challenge</strong></td><td style="padding:5px 0; word-break:break-word;">${escapeHtml(payload.challenge || "-")}</td></tr>
                  <tr><td style="padding:5px 0; vertical-align:top;"><strong>Growth goals</strong></td><td style="padding:5px 0; word-break:break-word;">${escapeHtml(payload.goals || "-")}</td></tr>
                </table>
              </td>
            </tr>
            <tr>
              <td style="padding:20px 32px;">
                <div style="border-top:2px dotted #f4c882;"></div>
              </td>
            </tr>
            <tr>
              <td style="padding:0 32px 28px;">
                <h2 style="margin:0 0 10px; font-size:19px; line-height:1.3;">What happens next?</h2>
                <p style="margin:0; font-size:14px; line-height:22px; color:#444444;">We'll review your enquiry, identify the biggest opportunities, and reach out to discuss the next steps. If we need anything else before the audit, we'll contact you directly.</p>
                <p style="margin:20px 0 0; font-size:14px; line-height:22px;"><strong>Need to speak sooner?</strong><br /><a href="tel:+919819167856" style="color:#222222; text-decoration:none;">+91 981-916-7856</a> &nbsp;|&nbsp; <a href="mailto:hello@bombayblokes.com" style="color:#222222; text-decoration:none;">hello@bombayblokes.com</a></p>
                <p style="margin:24px 0 0; font-size:14px; line-height:22px;">Warm regards,<br /><strong>Bombay Blokes</strong><br /><a href="https://www.bombayblokes.com" style="color:#222222;">bombayblokes.com</a></p>
              </td>
            </tr>
            <tr>
              <td style="padding:0; margin:0;">
                <img src="https://firebasestorage.googleapis.com/v0/b/bombay-blokes-4c284.firebasestorage.app/o/blogimages%2Fbbsignature.png?alt=media&token=8bc93c2d-8a9c-4e1f-81dc-ef8d1cc90499" alt="Bombay Blokes" width="600" style="display:block; width:100%; max-width:600px; height:auto; border:0;" />
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>
  `;
}

function buildAdminEmail(payload: EnquiryPayload) {
  return `
    <h3>New Ads Audit Request</h3>
    <p><strong>Name:</strong> ${escapeHtml(payload.name || "-")}</p>
    <p><strong>Phone:</strong> ${escapeHtml(payload.phone || "-")}</p>
    <p><strong>Email:</strong> ${escapeHtml(payload.email || "-")}</p>
    <p><strong>Brand / website / Instagram:</strong> ${escapeHtml(payload.brand || payload.website || payload.instagram || "-")}</p>
    <p><strong>Monthly ad budget:</strong> ${escapeHtml(payload.budget || "-")}</p>
    <p><strong>Biggest marketing challenge:</strong> ${escapeHtml(payload.challenge || "-")}</p>
    <p><strong>Growth goals:</strong> ${escapeHtml(payload.goals || "-")}</p>
    <p><strong>Date:</strong> ${escapeHtml(payload.date || "-")}</p>
    <p><strong>Time:</strong> ${escapeHtml(payload.time || "-")}</p>
    <p><strong>Source:</strong> ${escapeHtml(payload.source || "ads-landing")}</p>
  `;
}

export async function POST(req: Request) {
  try {
    const body: EnquiryPayload = await req.json();

    if (!body.name?.trim() || !body.email?.trim() || !body.phone?.trim()) {
      return NextResponse.json(
        { ok: false, error: "Name, email and phone are required." },
        { status: 400 }
      );
    }

    const emailPattern = /^[\w-.+]+@[\w-]+\.[a-z]{2,}$/i;
    if (!emailPattern.test(body.email)) {
      return NextResponse.json({ ok: false, error: "Invalid email address." }, { status: 400 });
    }

    const now = new Date();
    const payload: EnquiryPayload = {
      name: body.name.trim(),
      phone: body.phone.trim(),
      email: body.email.trim(),
      brand: body.brand?.trim() || "",
      website: body.website?.trim() || "",
      instagram: body.instagram?.trim() || "",
      budget: body.budget?.trim() || "",
      challenge: body.challenge?.trim() || "",
      goals: body.goals?.trim() || "",
      date: body.date || now.toLocaleDateString("en-IN", { dateStyle: "medium" }),
      time: body.time || now.toLocaleTimeString("en-IN", { timeStyle: "short" }),
      source: body.source || "ads-landing",
    };

    const message = buildEmailBody(payload);

    await sendEmail({
      to: payload.email as string,
      subject: "Your free ads audit request is received | Bombay Blokes",
      html: buildUserEmail(payload),
      fromName: "Bombay Blokes",
      fromAddress: "hello@bombayblokes.com",
    });

    await sendEmail({
      //  to: "aryankuril09@gmail.com",
      to: ["hello@bombayblokes.com", "bdm@bombayblokes.com", "siddique@bombayblokes.com"],
      subject: `New Ads Audit Request - ${payload.name}`,
      html: buildAdminEmail(payload),
      fromName: "Ads Audit Form",
      fromAddress: "hello@bombayblokes.com",
      replyTo: payload.email,
    });

    const ONE_SIGNAL_API_KEY = process.env.ONE_SIGNAL_API_KEY;
    const ONE_SIGNAL_APP_ID = process.env.ONE_SIGNAL_APP_ID;
    const ONE_SIGNAL_EMAIL_SEGMENT = process.env.ONE_SIGNAL_EMAIL_SEGMENT || "Employees";

    if (ONE_SIGNAL_API_KEY && ONE_SIGNAL_APP_ID) {
      const response = await fetch("https://onesignal.com/api/v1/notifications", {
        method: "POST",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
          Authorization: `Basic ${ONE_SIGNAL_API_KEY}`,
        },
        body: JSON.stringify({
          app_id: ONE_SIGNAL_APP_ID,
          headings: { en: "New Audit Request — Bombay Blokes" },
          contents: { en: message },
          included_segments: [ONE_SIGNAL_EMAIL_SEGMENT],
          data: payload,
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error("OneSignal notification failed:", errorText);
      }
    } else {
      console.warn("OneSignal env vars not configured — enquiry logged only.");
      console.info(message);
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("ads-enquiry error:", err);
    return NextResponse.json(
      { ok: false, error: err instanceof Error ? err.message : "Unknown error" },
      { status: 500 }
    );
  }
}
