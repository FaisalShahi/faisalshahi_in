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
            from: "Portfolio <onboarding@resend.dev>",
            to: "shahifaisal132@gmail.com",
            subject: "New Portfolio Contact",
            html: `
        <div>
          <h2>New Contact Form Submission</h2>

          <p><strong>Name:</strong> ${name}</p>

          <p><strong>Email:</strong> ${email}</p>

          <p><strong>Message:</strong></p>

          <p>${message}</p>
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