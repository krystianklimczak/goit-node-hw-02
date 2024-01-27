import express from 'express';

import authMiddleware from '../../middlewares/jwt.js';
import { signUp } from '../../controllers/users/signupUser.js';
import { logIn } from '../../controllers/users/loginUser.js';
import { logOut } from '../../controllers/users/logoutUser.js';
import { currentUser } from '../../controllers/users/currentUser.js';

const router = express.Router();

router.post('/signup', signUp);
router.post('/login', logIn);
router.get('/logout', authMiddleware, logOut);
router.get('/current', authMiddleware, currentUser);

export default router;
