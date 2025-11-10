import nodemailer, { SendMailOptions } from 'nodemailer'
import AppError from './appError'

const sendEmail = async (options: SendMailOptions) => {
  try {
    const host = process.env.EMAIL_HOST
    const port = Number(process.env.EMAIL_PORT)
    const user = process.env.EMAIL_USER
    const pass = process.env.EMAIL_PASS

    if (!host || !port || !user || !pass)
      throw new AppError('No credentials defined!', 500)

    const transporter = nodemailer.createTransport({
      host: host,
      port: port,
      auth: {
        user: user,
        pass: pass,
      },
    })

    const mailOptions = {
      from: 'Saveat <help@saveat.com>',
      to: options.to,
      subject: options.subject,
      text: options.text,
    }

    await transporter.sendMail(mailOptions)
  } catch (err) {
    console.log(err)
  }
}

export default sendEmail
