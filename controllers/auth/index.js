const userRegister = require('./register');

const userLogin = require('./login');

const logout = require('./logout');

const getCurrent = require('./getCurrent');

const updateSubscription = require('./updateSubscription');

const uploadAvatar = require('./uploadAvatar');

const verifyEmail = require('./verifyEmail');

const resendVerify = require('./resendVerify');

const { ctrlWrapper } = require('../../decorators');

module.exports = {
  userRegister: ctrlWrapper(userRegister),
  verifyEmail: ctrlWrapper(verifyEmail),
  resendVerify: ctrlWrapper(resendVerify),
  userLogin: ctrlWrapper(userLogin),
  logout: ctrlWrapper(logout),
  getCurrent: ctrlWrapper(getCurrent),
  updateSubscription: ctrlWrapper(updateSubscription),
  uploadAvatar: ctrlWrapper(uploadAvatar),
};
