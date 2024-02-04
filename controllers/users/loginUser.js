import jwt from 'jsonwebtoken';
import { getUserByEmail, updateUser } from '#service/index.js';

async function logIn(req, res, next) {
  const { email, password } = req.body;
  const user = await getUserByEmail(email);

  if (!user) {
    return res.status(401).json({ message: 'Email or password is wrong' });
  }

  const id = user._id;
  const isPasswordCorrect = await user.validatePassword(password);

  if (isPasswordCorrect) {
    const payload = {
      id: user._id,
      email: user.email,
    };
    const token = jwt.sign(payload, process.env.SECRET, { expiresIn: '12h' });

    await updateUser(id, { token });

    return res.status(200).json({
      token: token,
      user: {
        email: user.email,
        subscription: user.subscription,
      },
    });
  } else {
    return res.status(401).json({ message: 'Email or password is wrong' });
  }
}

export { logIn };
