import getAvatar from '../handlers/getAvatar.js';
import { Contact } from './schemas/contact.js';
import { User } from './schemas/users.js';

const getAllContacts = async () => {
  return Contact.find();
};

const getContactById = async (contactId, userId) => {
  return Contact.findOne({ _id: contactId, owner: userId });
};

const getContactByName = async (name, userId) => {
  return Contact.findOne({ name: name, owner: userId });
};

const createContact = async ({ name, email, phone, favorite, owner }) => {
  return Contact.create({ name, email, phone, favorite, owner });
};

const updateContact = async (id, fields, userId) => {
  return Contact.findOneAndUpdate({ _id: id, owner: userId }, fields, { new: true });
};

const removeContact = async (contactId, userId) => {
  return Contact.findOneAndDelete({ _id: contactId, owner: userId });
};

const getUserByEmail = async email => {
  return User.findOne({ email });
};

const getUserById = async id => {
  return User.find({ _id: id });
};

const createUser = async ({ email, password }) => {
  const newUser = new User({ email, avatarURL: getAvatar(email) });
  await newUser.setPassword(password);
  await newUser.save();
  return newUser;
};

const updateUser = async (id, fields) => {
  await User.findByIdAndUpdate({ _id: id }, fields, { new: true });
};

export {
  getAllContacts,
  getContactById,
  getContactByName,
  createContact,
  updateContact,
  removeContact,
  getUserByEmail,
  createUser,
  updateUser,
  getUserById,
};
