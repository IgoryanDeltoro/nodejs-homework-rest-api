const { User } = require('../../models');

const { nanoid } = require('nanoid');

const { HttpError, sendEmail } = require('../../helpers');

const { BASE_URL } = process.env;

const resendVerify = async (req, res) => {
  const { email } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    throw HttpError(404, 'user not found');
  }

  if (user.verify) {
    throw HttpError(400, 'Verification has already passed');
  }

  const verificationToken = nanoid();

  const verifyEmail = {
    to: email,
    subject: 'Verify email',
    html: `<a target="_blank" href="${BASE_URL}/api/users/verify/${verificationToken}">Click to verify email</a>`,
  };

  await sendEmail(verifyEmail);

  res.status(200).json({ message: 'Verification email sent' });
};

module.exports = resendVerify;
