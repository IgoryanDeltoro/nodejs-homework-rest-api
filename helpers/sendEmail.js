const nodemailer = require('nodemailer');

const { META_PASSWORD, META_EMAIL } = process.env;

const config = {
  host: 'smtp.meta.ua',
  port: 465,
  secure: true,
  auth: {
    user: META_EMAIL,
    pass: META_PASSWORD,
  },
};

const transporter = nodemailer.createTransport(config);

const sendEmail = async data => {
  const email = { ...data, from: META_EMAIL };
  await transporter.sendMail(email);
  return true;
};

module.exports = sendEmail;
