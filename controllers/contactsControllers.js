const {
  Contact,
  contactAddSchema,
  contactUpdateFavoriteSchema,
} = require('../models/contact');

const { HttpError } = require('../helpers');

const { ctrlWrapper } = require('../decorators');

const getAllContacts = async (req, res) => {
  const allContacts = await Contact.find({}, '-createdAt -updatedAt');
  res.json(allContacts);
};

const getContactsById = async (req, res) => {
  const { contactId } = req.params;
  const contactByID = await Contact.findById(contactId);
  if (!contactByID) {
    throw HttpError(404);
  }
  res.json(contactByID);
};

const addContact = async (req, res) => {
  const { error } = contactAddSchema.validate(req.body);
  if (error) {
    throw HttpError(400, `missing required name field ${error.message}`);
  }
  const addContact = await Contact.create(req.body);
  res.status(201).json(addContact);
};

const deleteContactById = async (req, res) => {
  const { contactId } = req.params;
  const contactByID = await Contact.findByIdAndRemove({ _id: contactId });
  if (!contactByID) {
    throw HttpError(404);
  }
  res.json({ message: 'contact deleted' });
};

const updateContactById = async (req, res) => {
  const { error } = contactAddSchema.validate(req.body);
  if (error) {
    throw HttpError(400, 'missing fields');
  }
  const { contactId } = req.params;
  const contactByID = await Contact.findByIdAndUpdate(
    { _id: contactId },
    req.body,
    { new: true }
  );
  if (!contactByID) {
    throw HttpError(404);
  }
  res.json(contactByID);
};

const updateStatusContact = async (req, res) => {
  const { error } = contactUpdateFavoriteSchema.validate(req.body);
  if (error) {
    throw HttpError(400, 'missing field favorite');
  }
  const { contactId } = req.params;
  const contactByID = await Contact.findByIdAndUpdate(
    { _id: contactId },
    req.body,
    { new: true }
  );
  if (!contactByID) {
    throw HttpError(404);
  }
  res.json(contactByID);
};

module.exports = {
  getAllContacts: ctrlWrapper(getAllContacts),
  getContactsById: ctrlWrapper(getContactsById),
  addContact: ctrlWrapper(addContact),
  deleteContactById: ctrlWrapper(deleteContactById),
  updateContactById: ctrlWrapper(updateContactById),
  updateStatusContact: ctrlWrapper(updateStatusContact),
};
