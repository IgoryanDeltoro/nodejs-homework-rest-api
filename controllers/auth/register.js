const bcrypt = require('bcrypt');

const gravatar = require('gravatar');

const { nanoid } = require('nanoid');

const { User } = require('../../models');

const { HttpError, sendEmail } = require('../../helpers');

const { BASE_URL } = process.env;

const userRegister = async (req, res) => {
  const { email, password } = req.body;

  const validEmail = await User.findOne({ email });

  if (validEmail) {
    throw HttpError(409, 'Email in use');
  }

  const avatarURL = gravatar.url(email, { s: '250' }, false);

  const hashedPassword = await bcrypt.hash(password, 10);

  const verificationToken = nanoid();

  const newUser = await User.create({
    ...req.body,
    avatarURL,
    password: hashedPassword,
    verificationToken,
  });

  const verifyEmail = {
    to: email,
    subject: 'Verify email',
    html: `<a target="_blank" href="${BASE_URL}/api/users/verify/${verificationToken}">Click to verify email</a>`,
  };

  await sendEmail(verifyEmail);

  return res.status(201).json({
    user: {
      email: newUser.email,
      subscription: newUser.subscription,
    },
  });
};

module.exports = userRegister;
