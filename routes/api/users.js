import express from 'express';

import authMiddleware from '#middlewares/jwt.js';
import { verify } from '#controllers/users/verify.js';
import { upload } from '#multerConfig/multerConfig.js';
import { logIn } from '#controllers/users/loginUser.js';
import { signUp } from '#controllers/users/signupUser.js';
import { logOut } from '#controllers/users/logoutUser.js';
import { currentUser } from '#controllers/users/currentUser.js';
import { resendVerifyEmail } from '#controllers/users/resendVerify.js';
import { updateUserAvatar } from '#controllers/users/updateUserAvatar.js';

const router = express.Router();

router.post('/login', logIn);
router.post('/signup', signUp);
router.post('/verify', resendVerifyEmail);
router.get('/logout', authMiddleware, logOut);
router.get('/verify/:verificationToken', verify);
router.get('/current', authMiddleware, currentUser);
router.patch('/avatars', authMiddleware, upload.single('avatar'), updateUserAvatar);

export default router;
