const express = require('express');

const router = express.Router();

const contactsControllers = require('../../controllers/contacts');

const { isValidId, authenticate } = require('../../middlewares');

const { validateBody } = require('../../decorators');

const {
  contactAddSchema,
  contactUpdateFavoriteSchema,
} = require('../../schemas');

router.use(authenticate);

router.get('/', contactsControllers.getAllContacts);

router.get('/:contactId', isValidId, contactsControllers.getContactById);

router.post(
  '/',
  validateBody(contactAddSchema),
  contactsControllers.addContact
);

router.delete('/:contactId', isValidId, contactsControllers.deleteContactById);

router.put(
  '/:contactId',
  isValidId,
  validateBody(contactAddSchema),
  contactsControllers.updateContactById
);

router.patch(
  '/:contactId/favorite',
  isValidId,
  validateBody(contactUpdateFavoriteSchema),
  contactsControllers.updateStatusContact
);

module.exports = router;
