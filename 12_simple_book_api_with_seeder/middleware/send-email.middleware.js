const nodemailer = require("nodemailer");
const pug = require("pug");
const path = require("path");

const sendEmail = async (options) => {
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: process.env.EMAIL_PORT == 465,
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  const html = pug.renderFile(
    path.join(__dirname, "../views/bookCreated.pug"),
    {
      title: options.book.title,
      author: options.book.author,
      yearPublished: options.book.yearPublished,
    }
  );

  const mailOptions = {
    from: '"Book API" <noreply@bookapi.com>',
    to: process.env.RECIPIENT_EMAIL,
    subject: "A New Book Has Been Added",
    html,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent: " + info.response);
  } catch (error) {
    console.error("Error sending email:", error);
  }
};

module.exports = sendEmail;