import { NextResponse } from "next/server";

type EnquiryPayload = {
  name?: string;
  phone?: string;
  email?: string;
  brand?: string;
  website?: string;
  instagram?: string;
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
    `Date: ${payload.date || "-"}`,
    `Time: ${payload.time || "-"}`,
    `Source: ${payload.source || "landing-page"}`,
  ];
  return lines.join("\n");
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
      date: body.date || now.toLocaleDateString("en-IN", { dateStyle: "medium" }),
      time: body.time || now.toLocaleTimeString("en-IN", { timeStyle: "short" }),
      source: body.source || "ads-landing",
    };

    const message = buildEmailBody(payload);

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
