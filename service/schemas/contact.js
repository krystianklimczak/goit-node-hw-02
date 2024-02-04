import mongoose from 'mongoose';
import { Schema } from 'mongoose';
import getAvatar from '../../handlers/getAvatar.js';

const contacts = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Set name for contact'],
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
    avatarURL: {
      type: String,
    },
  },
  { versionKey: false, timestamps: true }
);

const Contact = mongoose.model('contacts', contacts);

export { Contact };
