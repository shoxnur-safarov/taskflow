import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendPasswordResetEmail = async (email: string, resetToken: string) => {
  const resetUrl = `${process.env.CLIENT_URL}/reset-password?token=${resetToken}`;

  await resend.emails.send({
    from: "TaskFlow <onboarding@resend.dev>",
    to: email,
    subject: "Parolni tiklash — TaskFlow",
    html: `
      <div style="font-family: sans-serif; max-width: 480px; margin: 0 auto;">
        <h2>Parolni tiklash so'rovi</h2>
        <p>Hisobingiz uchun parolni tiklash so'ralgan. Quyidagi tugmani bosing:</p>
        <a href="${resetUrl}" style="display: inline-block; background: #4f46e5; color: white; padding: 12px 24px; border-radius: 8px; text-decoration: none; margin: 16px 0;">
          Parolni tiklash
        </a>
        <p style="color: #64748b; font-size: 14px;">
          Agar siz bu so'rovni yubormagan bo'lsangiz, bu xabarni e'tiborsiz qoldiring. Havola 1 soatdan keyin amal qilmaydi.
        </p>
      </div>
    `,
  });
};