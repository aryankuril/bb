import { NextRequest, NextResponse } from "next/server";
import { sendEmail } from "@/lib/email-sender";
import { uploadFileToFirebase, base64ToBuffer } from "@/lib/firebase-upload";

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

    console.log("📋 Application details:", {
      ticketName,
      email,
      jobTitle,
      hasCv: !!cv,
    });

    if (!ticketName || !email || !phone) {
      console.error("❌ Missing required fields");
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Upload CV to Firebase Storage if provided
    let cvUrl = "";
    let cvFilename = "";
    let cvSize = 0;

    if (cv && cv.data && cv.filename) {
      console.log("📤 Uploading CV to Firebase:", cv.filename);
      try {
        const cvBuffer = base64ToBuffer(cv.data);
        console.log(
          "✓ Converted CV to buffer, size:",
          cvBuffer.length,
          "bytes"
        );

        const uploadedFile = await uploadFileToFirebase(
          cvBuffer,
          cv.filename,
          "cvs"
        );

        cvUrl = uploadedFile.url;
        cvFilename = uploadedFile.filename;
        cvSize = uploadedFile.size;
        console.log("✓ CV uploaded successfully:", cvUrl);
      } catch (uploadError) {
        console.error("❌ CV upload error:", uploadError);
        const errorMessage =
          uploadError instanceof Error ? uploadError.message : "Unknown error";
        console.error("Error details:", errorMessage);
        return NextResponse.json(
          {
            error: `Failed to upload CV: ${errorMessage}. Please check Firebase configuration.`,
          },
          { status: 500 }
        );
      }
    } else {
      console.log("ℹ️ No CV provided");
    }

    // Email template for career form
    const htmlTemplate = `
<!DOCTYPE html>
<html>
  <head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
  </head>
  <body>
    <p>Hi ${ticketName}!</p>
    <p>Thank you for showing interest in working with us.</p>
    
    <p>To quicken the process a bit more, could you help us with some more basic information.</p>
    <ol>
      <li>Current/Last place of work and designation.</li>
      <li>Expected joining date.</li>
      <li>Current & Expected CTC.</li>
    </ol>

    <p>While we check out your resume you can check us out at - <a href="https://www.instagram.com/bombay_blokes" style="color: #F77A1E;">www.instagram.com/bombay_blokes</a></p>

    <hr class="solid">
    <table cellspacing="0" cellpadding="0" border="0">
      <tbody>
        <tr>
          <td valign="top" style="padding-left: 0px; padding-top: 0px; padding-bottom: 0px; padding-right: 0px;">
            <span style="text-align: left; color: #000000; font-family: 'Arial', sans-serif; font-size: 10pt; font-weight: bold">Bombay Blokes Digital Solutions LLP</span><br />
            <span style="text-align: left; margin-top: 0px; margin-bottom: 0px; color: #000000; font-family: 'Arial', sans-serif; font-weight: normal; font-size: 9pt;"></span><br />
          </td>
        </tr>

        <tr>
          <td valign="top" style="padding-left: 0px; padding-top: 7px; padding-bottom: 4px; padding-right: 0px;">
            <a href="http://www.bombayblokes.com/">
              <img src="https://bombayblokes.com/wp-content/uploads/2021/12/bblogo.png" nosend="1" border="0" width="148" height="26" alt="Bombay Blokes" title="Bombay Blokes" />
            </a>
          </td>
        </tr>

        <tr>
          <td valign="top" style="padding-left: 0px; padding-top: 0px; padding-bottom: 0px; padding-right: 0px;">
            <span style="text-align: left; color: #000000; font-family: Arial; font-size: 9pt; font-style: normal; font-weight: normal;">
              21-B, Madhu Estate, 1st FLoor, Pandurang Budhkar Marg, Near IKEA, <br />
              Lower Parel <font size="1" color="#B9B9B9">|</font> Mumbai - 400013<br />
              tel +91 981-916-7856<br />
            </span>
          </td>
        </tr>

        <tr>
          <td valign="top" style="padding-left: 0px; padding-top: 5px; padding-bottom: 0px; padding-right: 0px;">
            <span style="text-align: left; margin-top: 0px; color: #FCB315; font-size: 8pt; font-weight: bold; font-family: 'Calibri', sans-serif;">
              <a style="text-decoration: none; color: #F77A1E" href="http://www.bombayblokes.com/"><font color="#FCB315">website</font></a>
              <font size="1" color="#FCB315">|</font>
              <a style="text-decoration: none; color: #F77A1E" href="http://maps.google.com/maps?q=Bombay+Blokes+Digital+Solutions+LLP/@18.9994787,72.8277556,17z/data=!4m9!1m2!2m1!1sbombay+blokes,+1041,+1B,+Benefice+Business+House,+Mathuradas+Mill+Compound,+126,+NM+Joshi+Marg,+Lower+Parel+%7C+Mumbai,+Maharashtra"><font color="#FCB315">map</font></a>
              <font size="1" color="#FCB315">|</font>
              <a style="text-decoration: none; color: #F77A1E" href="mailto:bdm@bombayblokes.com"><font color="#FCB315">email</font></a>
            </span>
          </td>
        </tr>

        <tr>
          <td valign="top" style="padding-left:0px; padding-top: 7px; padding-bottom: 0px; padding-right: 0px; color: #FCB315;">
            <a href="https://www.instagram.com/bombay_blokes/?hl=en"><img src="http://bombayblokes.com/wp-content/uploads/2022/01/1024px-Instagram_icon.png" nosend="1" border="0" width="25" height="25" alt="Instagram"/></a>
            <a href="https://www.facebook.com/bombayblokes/"><img src="http://bombayblokes.com/wp-content/uploads/2022/01/640px-Facebook_icon.svg_.png" nosend="1" border="0" width="25" height="25" alt="Facebook"/></a>
            <a href="https://www.linkedin.com/company/bombay-blokes-digital-solutions-llp/?originalSubdomain=in"><img src="http://bombayblokes.com/wp-content/uploads/2022/01/174857.png" nosend="1" border="0" width="25" height="25" alt="LinkedIn"/></a>
          </td>
        </tr>

        <tr>
          <td valign="top" style="padding-left: 0px; padding-top: 8px; padding-bottom: 0px; padding-right: 0px;">
            <span style="color: #8A8A8A; font-family: 'Calibri', sans-serif; font-size: 8pt; font-weight: regular;">
              <b>Confidentiality Note: </b> This email may contain confidential and/or private information. If you received this email in error please delete and notify sender.
            </span>
          </td>
        </tr>
      </tbody>
    </table>

    <style>
      a { color: #f77a1e; }
      hr.solid { border-top: 1px #bbb; }
    </style>
  </body>
</html>`;

    // Send email to applicant
    console.log("📧 Sending confirmation email to:", email);
    const result = await sendEmail({
      to: email,
      subject: "You've made a smart choice. #BeABloke",
      html: htmlTemplate,
      fromName: "Bombay Blokes",
      fromAddress: "careers@bombayblokes.com",
    });

    if (result.error) {
      console.error("❌ Failed to send confirmation email:", result.error);
      return NextResponse.json(
        { error: `Failed to send confirmation email: ${result.error.message}` },
        { status: 500 }
      );
    }
    console.log("✓ Confirmation email sent successfully");

    // Prepare CV information for team notification
    let cvInfo = "Not provided";
    if (cvUrl && cvFilename) {
      cvInfo = `<a href="${cvUrl}" download="${cvFilename}">${cvFilename}</a> (${(
        cvSize / 1024
      ).toFixed(2)} KB)`;
    }

    // Send notification to team
    const teamNotification = `
      <h3>New Career Application</h3>
      <p><strong>Position:</strong> ${jobTitle || "Not specified"}</p>
      <p><strong>Name:</strong> ${ticketName}</p>
      <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
      <p><strong>Phone:</strong> ${phone}</p>
      <p><strong>CV:</strong> ${cvInfo}</p>
      <p><strong>Portfolio:</strong> ${
        portfolio
          ? `<a href="${portfolio}" target="_blank">${portfolio}</a>`
          : "Not provided"
      }</p>
      <p><strong>Availability:</strong> ${availability || "Not specified"}</p>
      <p><strong>Message:</strong> ${message || "No message"}</p>
    `;

    console.log("📧 Sending team notification email");
    const teamResult = await sendEmail({
      // to: "careers@bombayblokes.com",
      to: "yashyerunkar8@gmail.com",
      subject: `New Application - ${ticketName} for ${jobTitle || "Position"}`,
      html: teamNotification,
      fromName: "Careers Form",
      fromAddress: "careers@bombayblokes.com",
    });

    if (teamResult.error) {
      console.error(
        "⚠️ Failed to send team notification (non-critical):",
        teamResult.error
      );
      // Don't fail the request if team email fails
    } else {
      console.log("✓ Team notification sent successfully");
    }

    console.log("✅ Application submitted successfully");
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
