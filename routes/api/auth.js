const express = require('express');

const router = express.Router();

const { validateBody } = require('../../decorators');

const {
  authSchema,
  subscriptionSchema,
  verifySchema,
} = require('../../schemas');

const userAuth = require('../../controllers/auth');

const { authenticate, upload } = require('../../middlewares');

router.post('/register', validateBody(authSchema), userAuth.userRegister);

router.get('/verify/:verificationToken', userAuth.verifyEmail);

router.post('/verify', validateBody(verifySchema), userAuth.resendVerify);

router.post('/login', validateBody(authSchema), userAuth.userLogin);

router.get('/current', authenticate, userAuth.getCurrent);

router.post('/logout', authenticate, userAuth.logout);

router.patch(
  '/avatars',
  authenticate,
  upload.single('avatar'),
  userAuth.uploadAvatar
);

router.patch(
  '/',
  authenticate,
  validateBody(subscriptionSchema),
  userAuth.updateSubscription
);

module.exports = router;
