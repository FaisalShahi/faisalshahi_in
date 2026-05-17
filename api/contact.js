import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({
      message: "Method not allowed",
    });
  }

  try {
    const { name, email, message } = req.body;

    await resend.emails.send({
      from: "faisalshahi.in <onboarding@resend.dev>",
      to: "shahifaisal132@gmail.com",
      subject: "New Portfolio Contact",
      html: `
        <div style="font-family: Arial, sans-serif; background:#f4f4f4; padding:40px 20px;">
    
    <div style="
      max-width:600px;
      margin:auto;
      background:#ffffff;
      border-radius:12px;
      overflow:hidden;
      box-shadow:0 4px 20px rgba(0,0,0,0.08);
    ">

      <div style="
        background:linear-gradient(135deg,#4f46e5,#10b981);
        padding:30px;
        text-align:center;
        color:white;
      ">
        <h1 style="margin:0; font-size:28px;">
          Faisal Shahi Portfolio
        </h1>

        <p style="margin-top:10px; opacity:0.9;">
          New Contact Form Submission
        </p>
      </div>

      <div style="padding:30px; color:#333;">

        <div style="margin-bottom:20px;">
          <p style="margin:0; font-size:14px; color:#777;">
            Name
          </p>

          <p style="margin:5px 0 0; font-size:16px; font-weight:bold;">
            ${name}
          </p>
        </div>

        <div style="margin-bottom:20px;">
          <p style="margin:0; font-size:14px; color:#777;">
            Email
          </p>

          <p style="margin:5px 0 0; font-size:16px; font-weight:bold;">
            ${email}
          </p>
        </div>

        <div>
          <p style="margin:0; font-size:14px; color:#777;">
            Message
          </p>

          <div style="
            margin-top:10px;
            padding:20px;
            background:#f8fafc;
            border-radius:8px;
            line-height:1.7;
          ">
            ${message}
          </div>
        </div>

      </div>

      <div style="
        border-top:1px solid #eee;
        padding:20px;
        text-align:center;
        font-size:13px;
        color:#888;
      ">
        Sent from faisalshahi.in
      </div>

    </div>

  </div>
      `,
    });

    return res.status(200).json({
      success: true,
    });

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
}