import express from 'express';
import logger from 'morgan';
import cors from 'cors';
import dotenv from 'dotenv';

import { router as contactsRouter } from './routes/api/contacts.js';

import usersRouter from './routes/api/users.js';
import setJWTStrategy from './config/jwt.js';
import authMiddleware from './middlewares/jwt.js';

dotenv.config();

const app = express();

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short';

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());
app.use(express.static('public/avatars'));

setJWTStrategy();

app.use('/api/users', usersRouter);

app.use('/api/contacts', authMiddleware, contactsRouter);

app.use((req, res) => {
  return res.status(404).json({ message: 'Not found' });
});

app.use((err, req, res, next) => {
  return res.status(500).json({ message: err.message });
});

export { app };
