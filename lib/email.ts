import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)
const FROM = 'Creator Program Index <hello@creatorprogramindex.com>'

export async function sendMagicLinkEmail(to: string, firstName: string, magicLinkUrl: string): Promise<void> {
  const { error } = await resend.emails.send({
    from: FROM,
    to,
    subject: 'Your sign-in link for The Creator Program Index',
    html: `
      <div style="font-family: Georgia, serif; max-width: 560px; margin: 0 auto; padding: 40px 24px; color: #0f1729;">
        <p style="margin: 0 0 24px; font-size: 16px; line-height: 1.6;">Hi ${firstName},</p>
        <p style="margin: 0 0 24px; font-size: 16px; line-height: 1.6;">
          Click the link below to access The Creator Program Index. This link expires in 15 minutes.
        </p>
        <p style="margin: 0 0 32px;">
          <a href="${magicLinkUrl}"
             style="display: inline-block; background: #0f1729; color: #ffffff; text-decoration: none;
                    padding: 14px 28px; font-family: Georgia, serif; font-size: 16px; border-radius: 4px;">
            Access the Index →
          </a>
        </p>
        <p style="margin: 0; font-size: 13px; color: #6b7280; line-height: 1.6;">
          If you didn't request this link, you can safely ignore this email.
        </p>
      </div>
    `,
    text: `Hi ${firstName},\n\nClick the link below to access The Creator Program Index. This link expires in 15 minutes.\n\n${magicLinkUrl}\n\nIf you didn't request this link, you can safely ignore this email.`,
  })

  if (error) throw error
}
