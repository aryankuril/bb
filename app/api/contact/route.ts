import { NextRequest, NextResponse } from "next/server";
import { sendEmail } from "@/lib/email-sender";
import { adminDB } from "@/lib/firebase-admin";
import { FieldValue } from "firebase-admin/firestore";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, phone, message, services, company } = body;

    if (!name || !email || !phone) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // ============================
    // 🔥 SAVE TO FIRESTORE
    // ============================
    await adminDB.collection("contactSubmissions").add({
      name,
      email,
      phone,
      company: company || "",
      message: message || "",
      services: services || [],
      createdAt: FieldValue.serverTimestamp(),
    });

    // ============================
    // FORMAT SERVICES
    // ============================
    const formattedServices =
      services && services.length
        ? services.length === 1
          ? services[0]
          : services.slice(0, -1).join(", ") +
            " & " +
            services[services.length - 1]
        : "None";

    // ============================
    // EMAIL TEMPLATE (USER)
    // ============================
    const htmlTemplate = `
<!DOCTYPE html>
<html>
  <head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    <title>Bombay Blokes — Thanks for reaching out</title>

    
  </head>
  <body style="margin:0; padding:0; background-color:#ffffff; -webkit-font-smoothing:antialiased;">
    <!-- outer wrapper -->
    <table width="100%" cellpadding="0" cellspacing="0" border="0" align="center" style="background-color:#ffffff;">
      <tr>
        <td align="center">

          <!-- container (max width for email clients) -->
          <table width="600" cellpadding="0" cellspacing="0" border="0" align="center" style="
            width:600px;
            max-width:600px;
            font-family: 'Miso', 'Poppins', sans-serif;

            color:#222222;
            border: #fab31e 2px solid;
  border-top-left-radius:20px;
  border-top-right-radius:20px;
  border-bottom-left-radius:0;
  border-bottom-right-radius:0;
          ">

            <!-- background area with subtle sketch (use a light artwork/bg image) -->
            <tr>
            <td background="https://blokesarea.com/wp-content/uploads/2025/12/Email-Background.png"
    style="
      background-position: top center;
      background-repeat: no-repeat;
      background-size: cover;
      -webkit-background-size: cover;
      -moz-background-size: cover;
      -o-background-size: cover;
      padding:30px 16px 20px 16px;
    "
  >

                <!-- Top heading -->
                <table width="100%" cellpadding="0" cellspacing="0" border="0">
                <style type="text/css">
  @font-face {
    font-family: 'Miso';
    font-style: normal;
    font-weight: 400;
    src: url('https://fonts.cdnfonts.com/s/14095/Miso.woff') format('woff');
  }
  @font-face {
    font-family: 'Miso';
    font-style: normal;
    font-weight: 700;
    src: url('https://fonts.cdnfonts.com/s/14095/Miso-Bold.woff') format('woff');
  }

  @font-face {
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 400;
    src: url('https://fonts.gstatic.com/s/poppins/v20/pxiEyp8kv8JHgFVrJJfedA.woff2') format('woff2');
  }
  @font-face {
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 600;
    src: url('https://fonts.gstatic.com/s/poppins/v20/pxiByp8kv8JHgFVrLEj6.woff2') format('woff2');
  }
</style>


                 <tr>
  <td style="padding-bottom:10px;">
 <span style="display:block; font-size:34px; line-height:36px; color:#F7B21A; font-weight:700; font-family: 'Miso', Arial, sans-serif;">
      Hey!!
    </span>
    <span style="display:block; font-size:40px; line-height:44px; color:#000000; font-weight:700; letter-spacing:1px; font-family: 'Miso', 'Poppins', sans-serif;">
      Bombay Blokes Here...
    </span>
  </td>
</tr>


                   <!-- dotted separator -->
                  <tr>
                    <td style="padding:14px 0;">
                      <div style="border-top:2px dotted #F4C882; width:100%;"></div>
                    </td>
                  </tr>

                  <!-- small thank you -->
                  <tr>
                    <td style="padding-top:10px; padding-bottom:18px;">
                      <p style="margin:0; font-size:14px; line-height:20px; color:#333333;">
                        <strong>Thank You For Reaching Out! 👋</strong><br />
                        We’ve Received Your Message And Our Team Will Get Back To You Shortly.
                      </p>
                    </td>
                  </tr>

                  <!-- dotted separator -->
                  <tr>
                    <td style="padding:14px 0;">
                      <div style="border-top:2px dotted #F4C882; width:100%;"></div>
                    </td>
                  </tr>

                  <!-- "Here's What You Submitted:" -->
                  <tr>
                    <td style="padding:8px 0 6px 0;">
                      <h3 style="margin:0; font-size:18px; color:#222222; font-weight:700;">Here's What You Submitted:</h3>
                    </td>
                  </tr>

                  <tr>
                    <td style="padding-top:10px; padding-bottom:10px;">
                      <table cellpadding="0" cellspacing="0" border="0" width="100%" style="font-size:14px; color:#444444;">
                        <tr>
                          <td style="padding:6px 0; vertical-align:top;">
                            <span style="display:inline-block; width:4px; height:4px; background:#000; border-radius:50%; margin-right:10px;"></span>
                            <strong>Name:</strong>
                          <span style="color:#555555; margin-left:6px; text-transform: capitalize;">
  ${name 
    ? name
        .toLowerCase()
        .split(" ")
        .map((word: string) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ")
    : ""}
</span>


                          </td>
                        </tr>
                    <tr>
 <td style="padding:6px 0; vertical-align:top;">
  <span style="display:inline-block; width:4px; height:4px; background:#000; border-radius:50%; margin-right:10px;"></span>
  <strong>Email:</strong>
  <a style="color:#555555 !important; text-decoration:none !important; margin-left:6px;">
    ${email}
  </a>
</td>
</tr>
                        <tr>
                          <td style="padding:6px 0; vertical-align:top;">
                             <span style="display:inline-block; width:4px; height:4px; background:#000; border-radius:50%; margin-right:10px;"></span>
                            <strong>Phone:</strong>
                            <span style="color:#555555; margin-left:6px;">${phone}</span>
                          </td>
                        </tr>
                        <tr>
                          <td style="padding:6px 0; vertical-align:top;">
                             <span style="display:inline-block; width:4px; height:4px; background:#000; border-radius:50%; margin-right:10px;"></span>
                            <strong>Service Interested In:</strong>
                           <span style="color:#555555; margin-left:6px;">
    ${formattedServices}
  </span>

                          </td>
                        </tr>
                        <tr>
                          <td style="padding:6px 0 2px 0; vertical-align:top;">
                             <span style="display:inline-block; width:4px; height:4px; background:#000; border-radius:50%; margin-right:10px;"></span>
                            <strong>Message:</strong>
                          <span style="color:#555555; margin-left:6px; text-transform: capitalize;">
  ${
    (message || "No message")
      .toLowerCase()
      .split(" ")
      .map((word: string) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ")
  }
</span>


                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>

                  <!-- dotted separator -->
                  <tr>
                    <td style="padding:14px 0;">
                      <div style="border-top:2px dotted #F4C882; width:100%;"></div>
                    </td>
                  </tr>

                  <!-- Portfolio CTA -->
                  <tr>
                    <td style="padding:8px 0 18px 0;">
                      <p style="margin:0 0 8px 0; font-size:15px; color:#222222;">
                        Since You’re Interested In <strong>  ${formattedServices}</strong>, Here Are Some Of Our Portfolio:
                      </p>

                      <!-- button (pill) -->
                      <table cellpadding="0" cellspacing="0" border="0" style="margin-top:6px;">
                        <tr>
                         <td style="background:#F9B31B; padding:0 3px 3px 0; border-radius:5px;">
  <a href="https://www.bombayblokes.com/work"
    style="
      display:inline-block;
      width:130px;
      padding:10px 0;
      text-align:center;
      background:#000;
      color:#fff;
      text-decoration:none;
      font-weight:500;
      border-radius:5px;
      border:2px solid #000;
      font-size:14px;
      display:block;
    ">
    Explore Projects
  </a>
</td>


                        </tr>
                      </table>
                    </td>
                  </tr>

                  <!-- dotted separator -->
                  <tr>
                    <td style="padding:18px 0;">
                      <div style="border-top:2px dotted #F4C882; width:100%;"></div>
                    </td>
                  </tr>

                  <!-- What happens next -->
                  <tr>
                    <td style="padding:6px 0;">
                      <h4 style="margin:0 0 8px 0; font-size:18px; color:#222222;">What Happens Next?</h4>
                      <p style="margin:0; font-size:14px; color:#333333; line-height:20px;">
                        Our Team Will Review Your Inquiry And Get Back To You Within 24 Hours.
                        We May Reach Out For A Few More Details To Understand Your Requirements Better.
                      </p>
                    </td>
                  </tr>

                  <!-- contact quick -->
                  <tr>
                    <td style="padding-top:14px; padding-bottom:14px;">
                      <div style="border-top:1px dashed #F2CFA0; padding-top:12px;"></div>

                      <p style="margin:12px 0 6px 0; font-size:14px; color:#222222;"><strong>If It’s Urgent, Feel Free To Call Us:</strong></p>

                      <table cellpadding="0" cellspacing="0" border="0" style="font-size:14px; color:#444444;">
                        <tr>
                          <td style="vertical-align:top; padding-bottom:6px;">
                            <span style="font-size:16px;">📞</span>
                          </td>
                          <td style="padding-left:8px; vertical-align:middle;">
                            <a href="tel:\${phone || '+919819167856'}" style="color:#222222; text-decoration:none;">+91 981-916-7856</a>
                          </td>
                        </tr>
                        <tr>
                          <td style="vertical-align:top; padding-bottom:6px;">
                            <span style="font-size:16px;">✉️</span>
                          </td>
                          <td style="padding-left:8px; vertical-align:middle;">
                            <a href="mailto:\${email || 'hello@bombayblokes.com'}" style="color:#222222; text-decoration:none;">hello@bombayblokes.com</a>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>

                  <!-- dotted separator -->
                  <tr>
                    <td style="padding:6px 0;">
                      <div style="border-top:2px dotted #F4C882; width:100%;"></div>
                    </td>
                  </tr>

                  <!-- Thank you + signature -->
                  <tr>
                    <td style="padding-top:14px;">
                      <p style="margin:0; font-size:14px; color:#222222;">
                        Thanks Again For Contacting Us, We Look Forward To Working With You!
                      </p>

                      <p style="margin:10px 0 0 0; font-size:14px; color:#222222;">
                        Warm Regards,<br />
                        Bombay Blokes<br />
                         <span style="font-size:14px;">
  🌐 <a href="https://bombayblokes.com" style="color:#222222 !important; ">Bombayblokes.Com</a>
</span>

                      </p>
                      <div style="padding-top:8px;">
                      </div>
                      <span style="font-size:12px;">
                        <a href="https://www.instagram.com/bombay_blokes/?hl=en" style=" color:#222222 !important;">Instagram</a> &nbsp; | &nbsp;
                        <a href="https://www.facebook.com/bombayblokes/" style=" color:#222222 !important; ">Facebook</a> &nbsp; | &nbsp;
                        <a href="https://www.linkedin.com/company/bombay-blokes-digital-solutions-llp/?originalSubdomain=in" style=" color:#222222 !important;">LinkedIn</a>
                      </span>
                    </td>
                  </tr>

                </table>

              </td>
            </tr>

            <!-- footer banner image (big gold 10 years banner from site) -->
            <tr>
              <td style="padding:0; margin:0;">
                <img src="https://blokesarea.com/wp-content/uploads/2025/12/email-signature-2.png"
                  alt="Bombay Blokes - 10 years" width="600" style="display:block; width:100%; max-width:600px; height:auto; border:0;"/>
              </td>
            </tr>

          </table>
          <!-- /container -->

        </td>
      </tr>
    </table>
  </body>
</html>
`;


    // ============================
    // SEND EMAIL TO USER
    // ============================
    await sendEmail({
      to: email,
      subject: "The Blokes Are Excited To Work With You",
      html: htmlTemplate,
      fromName: "Bombay Blokes",
      fromAddress: "hello@bombayblokes.com",
    });

    // ============================
    // SEND EMAIL TO ADMIN TEAM
    // ============================
    const teamNotification = `
      <h3>New Contact Form Submission</h3>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Phone:</strong> ${phone}</p>
      <p><strong>Company:</strong> ${company || "-"}</p>
      <p><strong>Services:</strong> ${services?.join(", ") || "None"}</p>
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
      message: "Form submitted successfully",
    });
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { error: "Failed to submit contact form" },
      { status: 500 }
    );
  }
}
