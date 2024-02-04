import { getUserById } from '#service/index.js';

async function currentUser(req, res, next) {
  if (res.user.length === 0) {
    return res.status(401).json({ message: 'Not authorized' });
  }

  const id = res.user[0]._id;
  const [user] = await getUserById(id);

  return res.status(200).json({ email: user.email, subscription: user.subscription });
}

export { currentUser };
