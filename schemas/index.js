const { authSchema, subscriptionSchema, verifySchema } = require('./users');
const { contactAddSchema, contactUpdateFavoriteSchema } = require('./contacts');

module.exports = {
  authSchema,
  subscriptionSchema,
  contactAddSchema,
  verifySchema,
  contactUpdateFavoriteSchema,
};
