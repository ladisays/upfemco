import nodemailer from 'nodemailer';

import { htmlTemplate, textTemplate } from './templates';

export const buildConfirmationMail = (to, link) => ({
  to,
  subject: `Confirm your support for the Feminist Coalition`,
  html: htmlTemplate(link),
  text: textTemplate(link)
});

const sendMail = async ({ to, subject, text, html }) => {
  const auth = {
    user: process.env.MAIL_SENDER,
    pass: process.env.MAIL_SENDER_PASS
  };
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    port: 465,
    secure: true,
    host: 'smtp.gmail.com',
    auth
  });

  const info = await transporter.sendMail({
    from: `"Up FemCo" <${auth.user}>`,
    to,
    subject,
    text,
    html
  });
  return info;
};

export default sendMail;
