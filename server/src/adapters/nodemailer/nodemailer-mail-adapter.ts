import { MailAdapter, SendMailData } from "../mail-adapter";
import nodemailer from 'nodemailer'

const transport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "a164923c0ac36a",
    pass: "8a6184ecd708ba"
  }
});


export class NodeMailerMailAdapter implements MailAdapter {
  async sendMail({ subject, body }: SendMailData) {
    await transport.sendMail({
    from: 'Equipe feedget <oi@feedget.com>',
    to: 'Sávio Bueno <souzasavio@outlook.com>',
    subject,
    html: body
  })
  
  }
}