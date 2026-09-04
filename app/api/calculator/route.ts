import { NextRequest, NextResponse } from "next/server";
import { adminDB } from "@/lib/firebase-admin";
import { sendEmail } from "@/lib/email-sender";
import quotationTableHTML from "@/lib/quotationTableHTML";


type SubmittedCustomField = {
  id?: string;
  label?: string;
  question?: string;
  inputType?: "text" | "number" | "url";
  value?: string;
};

const escapeHTML = (value: unknown) =>
  String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");

const normalizeCustomFields = (fields: unknown): SubmittedCustomField[] => {
  if (!Array.isArray(fields)) return [];

  return fields
    .map((field) => {
      if (!field || typeof field !== "object") return null;

      const item = field as SubmittedCustomField;
      const value = typeof item.value === "string" ? item.value.trim() : "";

      if (!value) return null;

      return {
        id: typeof item.id === "string" ? item.id : "",
        label:
          typeof item.label === "string"
            ? item.label
            : typeof item.question === "string"
              ? item.question
              : "Custom Field",
        inputType:
          item.inputType === "number" || item.inputType === "url"
            ? item.inputType
            : "text",
        value,
      };
    })
    .filter(Boolean) as SubmittedCustomField[];
};

const customFieldsHTML = (fields: SubmittedCustomField[]) => {
  if (!fields.length) return "";

  return `
    <div style="margin-top:16px;">
      <h3>Additional Details</h3>
      ${fields
        .map(
          (field) => `
            <p>
              <strong>${escapeHTML(field.label)}:</strong>
              ${escapeHTML(field.value)}
            </p>
          `
        )
        .join("")}
    </div>
  `;
};
/* =====================================================
   POST: Calculator Form Submit (Draft + Final)
===================================================== */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

   const {
  name,
  phone,
  email,
  message,
  quote,
  total,
  estimateId,
  serviceCalculator,
  finalPrice,
  customFields,
} = body;

const normalizedCustomFields = normalizeCustomFields(customFields);
const additionalDetailsHTML = customFieldsHTML(normalizedCustomFields);

    /* =====================================================
       DETECT FINAL SUBMIT
    ===================================================== */
    const isFinalSubmit =
      typeof name === "string" &&
      name.trim().length > 0 &&
      typeof phone === "string" &&
      phone.trim().length > 0 &&
      typeof email === "string" &&
      email.trim().length > 0;

    /* =====================================================
       BASIC VALIDATION (ALLOW DRAFT)
    ===================================================== */
    const safeQuote = Array.isArray(quote) ? quote : [];
const safeTotal = typeof total === "number" ? total : 0;

if (!serviceCalculator) {
  return NextResponse.json(
    {
      success: false,
      message: "Service calculator is required",
    },
    {
      status: 400,
    }
  );
}

    if (isFinalSubmit && !email) {
      return NextResponse.json(
        { success: false, message: "Email required for final submit" },
        { status: 400 }
      );
    }

    const collectionRef = adminDB.collection("calculatorApplications");

    /* =====================================================
       CREATE / UPDATE FIRESTORE
    ===================================================== */
    let docId = estimateId;

    if (!estimateId) {
      const docRef = await collectionRef.add({
        name: name || "N/A",
        phone: phone || "N/A",
        email: email || "N/A",
        message: message || "N/A",
        quote: safeQuote,
total: safeTotal,
        finalPrice,
        serviceCalculator,
        draftEmailSent: false,
        createdAt: new Date(),
        customFields: normalizedCustomFields,
      });
      docId = docRef.id;
    } else {
      const docRef = collectionRef.doc(estimateId);
      const snap = await docRef.get();

      if (!snap.exists) {
        const newDoc = await collectionRef.add({
          name: name || "N/A",
          phone: phone || "N/A",
          email: email || "N/A",
          message: message || "N/A",
          quote: safeQuote,
total: safeTotal,
          finalPrice,
          serviceCalculator,
          draftEmailSent: false,
          createdAt: new Date(),
          customFields: normalizedCustomFields,
        });
        docId = newDoc.id;
      } else {
        await docRef.update({
          name: name || "N/A",
          phone: phone || "N/A",
          email: email || "N/A",
          message: message || "N/A",
          quote: safeQuote,
total: safeTotal,
          finalPrice,
          serviceCalculator,
          updatedAt: new Date(),
          customFields: normalizedCustomFields,
        });
      }
    }

    /* =====================================================
       FORMAT SERVICE NAME
    ===================================================== */
   const serviceNameTitle = serviceCalculator
  .trim()
  .replace(/[-_]+/g, " ")
  .replace(/\bservices?\b/gi, "")
  .replace(/\s+/g, " ")
  .trim()
  .split(" ")
  .map((w: string) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
  .join(" ");

    /* =====================================================
       ADMIN DRAFT EMAIL (NO CONTACT DETAILS)
    ===================================================== */
   

    /* =====================================================
       USER EMAIL (FINAL SUBMIT ONLY)
    ===================================================== */
    if (isFinalSubmit) {
      await sendEmail({
        to: email,
        subject: `Your ${serviceNameTitle} Quotation From Bombay Blokes`,
        html: `
          <!DOCTYPE html>
<html>
  <head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  </head>

  <body style="margin:0; padding:0; background-color:#ffffff; -webkit-font-smoothing:antialiased;">
    <table width="100%" cellpadding="0" cellspacing="0" border="0" align="center" style="background-color:#ffffff;">
      <tr>
        <td align="center">

          <table width="600" cellpadding="0" cellspacing="0" border="0" align="center" style="
            width:600px;
            max-width:600px;
            font-family: 'Miso', 'Poppins', sans-serif;
            color:#222222;
            border: #fab31e 2px solid;
            border-top-left-radius:20px;
            border-top-right-radius:20px;
          ">

            <tr>
              <td background="https://firebasestorage.googleapis.com/v0/b/bombay-blokes-4c284.firebasestorage.app/o/blogimages%2FEmail-Background.png?alt=media&token=01ed6e19-5b99-4969-bcb3-578c02786d26"
                style="background-position: top center; background-repeat: no-repeat; background-size: cover; padding:30px 16px 20px 16px;">

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


                  <!-- Heading -->
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
                    <td style="padding:6px 0;">
                      <div style="border-top:2px dotted #F4C882; width:100%;"></div>
                    </td>
                  </tr>

                  <!-- Intro -->
                  <tr>
                    <td style="padding-top:14px; padding-bottom:14px;">
                      <p style="margin:0; font-size:14px; color:#333; text-transform: capitalize;">
  Thank you for reaching out to us. We're excited to learn more about your project and help you build something amazing with
  <span style="color:#F7B21A;"> creative ideas, </span>
  expert guidance, and
  <span style="color:#F7B21A;"> complete transparency. </span>
</p>

                    </td>
                  </tr>

                  <!-- dotted separator -->
                  <tr>
                    <td style="padding:6px 0;">
                      <div style="border-top:2px dotted #F4C882; width:100%;"></div>
                    </td>
                  </tr>

                  <!-- Details-->
                  <tr>
                    <td style="padding:8px 0 6px 0;">
                      <h3 style="margin:0; font-size:18px; font-weight:700;">Here’s what details you submitted:</h3>
                    </td>
                  </tr>

                  <tr>
                    <td style="padding-top:5px; padding-bottom:10px;">
                      <table width="100%" style="font-size:14px;">
  <tr>
    <td style="padding:6px 0;">
      <span style="display:inline-block; width:4px; height:4px; background:#000; border-radius:50%; margin-right:10px;"></span>
      <strong>Name:</strong>
      <span style=" color:#555555 ; text-transform: capitalize;" >${name || 'N/A'} </span>
    </td>
  </tr>

  <tr>
    <td style="padding:6px 0;">
      <span style="display:inline-block; width:4px; height:4px; background:#000; border-radius:50%; margin-right:10px;"></span>
      <strong>Phone:</strong>
      <span style=" color:#555555 ; text-transform: capitalize;" >${phone || 'N/A'} </span>
    </td>
  </tr>



  <tr>
 <td style="padding:6px 0; vertical-align:top;">
  <span style="display:inline-block; width:4px; height:4px; background:#000; border-radius:50%; margin-right:10px;"></span>
  <strong>Email:</strong>
  <a style="color:#555555 !important; text-decoration:none !important; margin-left:6px;">
    ${email || 'N/A'}
  </a>
</td>
</tr>

<tr>
 <td style="padding:6px 0; vertical-align:top;">
  <span style="display:inline-block; width:4px; height:4px; background:#000; border-radius:50%; margin-right:10px;"></span>
  <strong>Message/Link:</strong>
  <a style="color:#555555 !important; text-decoration:none !important; margin-left:6px;">
     ${escapeHTML(message || 'N/A')}
  </a>
</td>

</tr>


${normalizedCustomFields
  .map(
    (field) => `
      <tr>
        <td style="padding:6px 0;">
          <span style="display:inline-block; width:4px; height:4px; background:#000; border-radius:50%; margin-right:10px;"></span>
          <strong>${escapeHTML(field.label)}:</strong>
          <span style="color:#555555; text-transform: capitalize;">${escapeHTML(field.value)}</span>
        </td>
      </tr>
    `
  )
  .join("")}

</table>

                    </td>
                  </tr>

                  <!-- dotted separator -->
                  <tr>
                    <td style="padding:6px 0;">
                      <div style="border-top:2px dotted #F4C882; width:100%;"></div>
                    </td>
                  </tr>


${(safeTotal > 0 || safeQuote.length > 0) ? `
                  <!-- Quatation-->
                  <tr>
                    <td style="padding:8px 0 6px 0;">
                      <h3 style="margin:0; font-size:18px; font-weight:700;">Here’s what details you submitted:</h3>
                    </td>
                  </tr>

                  <tr>
                    <td style="padding-top:5px; padding-bottom:10px;">
                      <table width="100%" style="font-size:14px;">
  <tbody>
    ${safeQuote
      .map((item: { type: string; value: string; price: any; }, index: number) => {
        const isLast = index === safeQuote.length - 1;

        return `
          <tr>
           <td style="padding:8px; ${!isLast ? "border-bottom:1px solid #eee;" : ""}">
  ${item.type
    .split(" ")
    .map((w: string) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ")} - 
  ${item.value
    .split(" ")
    .map((w: string) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ")}
</td>


            <td style="padding:8px; text-align:right; ${!isLast ? "border-bottom:1px solid #eee;" : ""}">
              ₹${Number(item.price).toLocaleString("en-IN")}
            </td>
          </tr>
        `;
      })
      .join("")}
  </tbody>
</table>


                    </td>
                  </tr>


                   <!-- dotted separator -->
                  <tr>
                    <td style="padding:6px 0;">
                      <div style="border-top:2px dotted #F4C882; width:100%;"></div>
                    </td>
                  </tr>



                  <tr>
                    <td style="padding:8px 0 6px 0;">
                      <h3 style="margin:0; font-size:18px; font-weight:700;">Estimated Project Cost</h3>
                    </td>
                  </tr>

                  <tr>
                    <td style="padding-top:5px; padding-bottom:10px;">
                      <table width="100%" style="font-size:14px;">
  <tr>
    <td style="padding:6px 0;">
      <td style="padding:8px; text-align:left; font-weight:bold; font-size:20px;">₹${Number(safeTotal).toLocaleString(
              "en-IN"
            )}</td>
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
` : ""}


                  <!-- Work CTA -->
                  <tr>
                     <td style="padding-top:10px; padding-bottom:10px;">
                      <p style="margin:0; font-size:18px; font-weight:700;">Since you’re interested in Website, here is our Portfolio:</p>
                      

                      <table cellpadding="0" cellspacing="0" style="margin-top:6px;">
                        <tr>
                          <td style="background:#F9B31B; padding:0 3px 3px 0; border-radius:5px;">
                            <a href="https://www.bombayblokes.com/work"
                              style="display:block; width:130px; padding:10px 0; text-align:center; background:#000; color:#fff; text-decoration:none; border-radius:5px;">
                              Explore Projects
                            </a>
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


                  <!-- What Happens Next -->
                  <tr>
                     <td style="padding-top:14px; padding-bottom:10px;">
                      <h4 style="font-size:16px; margin:0 0 6px;">What Happens Next?</h4>

                      <p style="margin:0; font-size:14px; color:#333333; line-height:20px;">
                        A member of our team will get in touch with you within 24 hours to:
                      </p>
                      <table style="font-size:14px;">
                        <tr><td style="padding:6px 0;"> <span style="display:inline-block; width:4px; height:4px; background:#000; border-radius:50%; margin-right:10px;"></span> Discuss your requirements</td></tr>
                        <tr><td style="padding:6px 0;"> <span style="display:inline-block; width:4px; height:4px; background:#000; border-radius:50%; margin-right:10px;"></span> Share timelines and strategy</td></tr>
                        <tr><td style="padding:6px 0;"> <span style="display:inline-block; width:4px; height:4px; background:#000; border-radius:50%; margin-right:10px;"></span> Answer any questions</td></tr>
                        <tr><td style="padding:6px 0;"> <span style="display:inline-block; width:4px; height:4px; background:#000; border-radius:50%; margin-right:10px;"></span> Finalise the proposal</td></tr>
                      </table>
                    </td>
                  </tr>

                 
                  

                    <!-- dotted separator -->
                  <tr>
                    <td style="padding:6px 0;">
                      <div style="border-top:2px dotted #F4C882; width:100%;"></div>
                    </td>
                  </tr>

                  

                 <!-- contact quick -->
                  <tr>
                    <td style="padding-top:10px; padding-bottom:14px;">
                      <p style="margin:12px 0 6px 0; font-size:14px; color:#222222;"><strong>If you’d like to move faster, feel free to contact us anytime:: <br/> Reach us anytime:</strong></p>

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

                  <!-- Footer Text -->
                 <tr>
                    <td style="padding-top:10px;">
                      <p style="font-size:14px;">
                        Let’s build something that performs, not just looks good.
                      </p>
                      <p style="font-size:14px;">
                        Cheers,<br/>Team Bombay Blokes<br/>
                        🌐 <a href="https://bombayblokes.com" style="color:#222222 !important; " >bombayblokes.com</a>
                      </p>
                       
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

            <!-- Footer Banner -->
            <tr>
              <td>
                <img src="https://firebasestorage.googleapis.com/v0/b/bombay-blokes-4c284.firebasestorage.app/o/blogimages%2Fbbsignature.png?alt=media&token=8bc93c2d-8a9c-4e1f-81dc-ef8d1cc90499"
                     width="600" style="display:block; width:100%;">
              </td>
            </tr>

          </table>
        </td>
      </tr>
    </table>
  </body>
</html>
        `,
        fromName: "Bombay Blokes",
        fromAddress: "hello@bombayblokes.com",
        replyTo: "hello@bombayblokes.com",
      });
    }

    /* =====================================================
       ADMIN FINAL EMAIL
    ===================================================== */
    if (isFinalSubmit) {
      await sendEmail({
          //  to: "aryankuril09@gmail.com",
          
         to: ["hello@bombayblokes.com", "bdm@bombayblokes.com", "siddique@bombayblokes.com"],
        subject: `New Quotation From - ${name} for ${serviceNameTitle}`,
        html: `
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Phone:</strong> ${phone}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Message/Link:</strong> ${escapeHTML(message || "N/A")}</p>
          <p><strong>Service:</strong> ${serviceNameTitle}</p>
          ${additionalDetailsHTML}
          <p><strong>Final Price:</strong> ₹${Number(finalPrice).toLocaleString(
            "en-IN"
          )}</p>
          ${quotationTableHTML(safeQuote, safeTotal)}
        `,
        fromName: "Calculator Form Submission",
        fromAddress: "hello@bombayblokes.com",
        replyTo: email,
      });
    }

    return NextResponse.json({
      success: true,
      estimateId: docId,
      message: "Form processed successfully",
    });
  } catch (error) {
    console.error("❌ Calculator API Error:", error);
    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
}
