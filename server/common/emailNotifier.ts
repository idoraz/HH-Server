import nodemailer from 'nodemailer';
import moment from 'moment';

export async function main() {  
  
  let transporter = nodemailer.createTransport({
    host: process.env.EMAIL_SMTP_ADDRESS,
    port: process.env.EMAIL_SMTP_PORT,
    secure: true, // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD
    }
  });

  let info = await transporter.sendMail({
    from: '"Hechtlinger Housing" <hechtlingerrealestate@gmail.com>',
    to: process.env.EMAIL_NOTIFICATION_ADDRESS,
    subject: `Houses Map File (${moment().format('LL')})`,
    text: 'Please find the attached kml file and import it to Google Maps',
    // html: "<b>Hello world?</b>" // html body
  });

  console.log("Message sent: %s", info.messageId);

}

main().catch(console.error);