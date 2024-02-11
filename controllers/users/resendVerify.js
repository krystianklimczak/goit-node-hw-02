import { getUserByEmail } from '#service/index.js';
import { sendVerificationEmail } from '#handlers/sendVerificationEmail.js';

async function resendVerifyEmail(req, res, next) {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: 'missing required field email' });
  }

  try {
    const user = await getUserByEmail(email);

    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }

    if (!user.verify) {
      const verificationToken = user.verificationToken;

      await sendVerificationEmail(email, verificationToken);

      return res.status(200).json({ message: 'Check your email' });
    }

    return res.status(400).json({ message: 'Verification has already been passed' });
  } catch (err) {
    console.log(err);
    next(err);
  }
}

export { resendVerifyEmail };
