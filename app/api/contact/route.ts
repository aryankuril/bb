import { NextRequest, NextResponse } from "next/server";
import { sendEmail } from "@/lib/email-sender";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, phone, message, services } = body;

    if (!name || !email || !phone) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Email template for contact form
    const htmlTemplate = `
<!DOCTYPE html>
<html>
  <head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
  </head>
  <body>
    <p>Hi ${name}!</p>
    <p>Thank you for considering the Blokes to help you on your digital journey. We have got your contact details and one of us will connect with you right away.</p>

    <hr class="solid">
    <table cellspacing="0" cellpadding="0" border="0">
      <tbody>
        <tr>
          <td valign="top" style="padding-left: 0px; padding-top: 0px; padding-bottom: 0px; padding-right: 0px;">
            <span style="text-align: left; color: #000000; font-family: 'Arial', sans-serif; font-size: 10pt; font-weight: bold">Bombay Blokes</span><br />
            <span style="text-align: left; margin-top: 0px; margin-bottom: 0px; color: #000000; font-family: 'Arial', sans-serif; font-weight: normal; font-size: 9pt;">Digital Solutions LLP</span><br />
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
              21 B, Madhu Estate, 1st Floor, Pandurang Budhkar Marg, Next to Ikea, <br />
              Lower Parel <font size="1" color="#B9B9B9">|</font> Mumbai, Maharashtra 400013<br />
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
            <a href="https://www.instagram.com/bombay_blokes/?hl=en"><img src="https://bombayblokes.com/wp-content/uploads/2022/12/Frame-1-1.png" nosend="1" border="0" width="25" height="25" alt="Instagram"/></a>
            <a href="https://www.facebook.com/bombayblokes/"><img src="https://bombayblokes.com/wp-content/uploads/2022/12/Frame-2.png" nosend="1" border="0" width="25" height="25" alt="Facebook"/></a>
            <a href="https://www.linkedin.com/company/bombay-blokes-digital-solutions-llp/?originalSubdomain=in"><img src="https://bombayblokes.com/wp-content/uploads/2022/12/Frame-3.png" nosend="1" border="0" width="25" height="25" alt="LinkedIn"/></a>
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

    // Send email to user
    const result = await sendEmail({
      to: email,
      subject: "The blokes are excited to work with you.",
      html: htmlTemplate,
      fromName: "Bombay Blokes",
      fromAddress: "hello@bombayblokes.com",
    });

    if (result.error) {
      return NextResponse.json(
        { error: result.error.message },
        { status: 500 }
      );
    }

    // notification to team
    const teamNotification = `
      <h3>New Contact Form Submission</h3>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Phone:</strong> ${phone}</p>
      <p><strong>Services:</strong> ${
        services ? services.join(", ") : "None"
      }</p>
      <p><strong>Message:</strong> ${message || "No message"}</p>
    `;

    await sendEmail({
      to: ["hello@bombayblokes.com", "bdm@bombayblokes.com"],
      subject: `New Contact Form - ${name}`,
      html: teamNotification,
      fromName: "Website Contact Form",
      fromAddress: "hello@bombayblokes.com",
    });

    return NextResponse.json({
      success: true,
      message: "Email sent successfully",
    });
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { error: "Failed to send email" },
      { status: 500 }
    );
  }
}
