import mongoose, { Schema } from 'mongoose';
import bCrypt from 'bcrypt';

const users = new Schema(
  {
    password: {
      type: String,
      required: [true, 'Password is required'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
    },
    subscription: {
      type: String,
      enum: ['starter', 'pro', 'business'],
      default: 'starter',
    },
    token: {
      type: String,
      default: null,
    },
  },
  { versionKey: false, timestamps: true }
);

users.methods.setPassword = async function (password) {
  this.password = await bCrypt.hash(password, 10);
};

users.methods.validatePassword = async function (password) {
  return bCrypt.compare(password, this.password);
};

const User = mongoose.model('users', users);

export { User };
