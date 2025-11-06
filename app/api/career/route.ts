import { NextRequest, NextResponse } from "next/server";
import { sendEmail } from "@/lib/email-sender";
import { uploadFileToFirebase, base64ToBuffer } from "@/lib/firebase-upload";
import { db } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

export async function POST(request: NextRequest) {
  try {
    console.log("📝 Career API: Received application request");
    const body = await request.json();
    const {
      ticketName,
      email,
      phone,
      cv,
      portfolio,
      message,
      jobTitle,
      availability,
    } = body;

    if (!ticketName || !email || !phone) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // ===== Upload CV to Firebase Storage =====
    let cvUrl = "";
    let cvFilename = "";
    let cvSize = 0;

    if (cv && cv.data && cv.filename) {
      try {
        const cvBuffer = base64ToBuffer(cv.data);
        const uploadedFile = await uploadFileToFirebase(
          cvBuffer,
          cv.filename,
          "cvs"
        );
        cvUrl = uploadedFile.url;
        cvFilename = uploadedFile.filename;
        cvSize = uploadedFile.size;
      } catch (uploadError) {
        console.error("❌ CV upload error:", uploadError);
        const errorMessage =
          uploadError instanceof Error ? uploadError.message : "Unknown error";
        return NextResponse.json(
          { error: `Failed to upload CV: ${errorMessage}` },
          { status: 500 }
        );
      }
    }

    // ===== Send confirmation email to user =====
    const htmlTemplate = `
      <p>Hi ${ticketName},</p>
      <p>Thank you for applying for the position of <b>${jobTitle || "our team"}</b>.</p>
      <p>We have received your application and will get back to you soon.</p>
      <p>— Bombay Blokes</p>
    `;

    await sendEmail({
      to: email,
      subject: "Thank you for applying to Bombay Blokes",
      html: htmlTemplate,
      fromName: "Bombay Blokes",
      fromAddress: "careers@bombayblokes.com",
    });

    // ===== Send notification email to team =====
    const teamNotification = `
      <h3>New Career Application</h3>
      <p><b>Position:</b> ${jobTitle || "Not specified"}</p>
      <p><b>Name:</b> ${ticketName}</p>
      <p><b>Email:</b> ${email}</p>
      <p><b>Phone:</b> ${phone}</p>
      <p><b>Portfolio:</b> ${portfolio || "Not provided"}</p>
      <p><b>Availability:</b> ${availability || "Not specified"}</p>
      <p><b>Message:</b> ${message || "No message"}</p>
      ${
        cvUrl
          ? `<p><b>CV:</b> <a href="${cvUrl}" target="_blank">${cvFilename}</a></p>`
          : "<p><b>CV:</b> Not provided</p>"
      }
    `;

    await sendEmail({
      to: "aryankuril09@gmail.com",
      subject: `New Application - ${ticketName} for ${jobTitle}`,
      html: teamNotification,
      fromName: "Careers Form",
      fromAddress: "careers@bombayblokes.com",
    });

    // ===== Save to Firestore =====
    await addDoc(collection(db, "careerApplications"), {
      name: ticketName,
      email,
      phone,
      jobTitle,
      message,
      portfolio,
      availability,
      cvUrl,
      cvFilename,
      cvSize,
      createdAt: serverTimestamp(),
    });

    console.log("✅ Application saved in Firestore and emails sent");
    return NextResponse.json({
      success: true,
      message: "Application submitted successfully",
    });
  } catch (error) {
    console.error("❌ Career form error:", error);
    const errorMessage =
      error instanceof Error ? error.message : "Failed to submit application";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
