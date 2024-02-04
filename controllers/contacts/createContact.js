import { createContact, getContactByName } from '#service/index.js';

async function createContacts(req, res, next) {
  const [user] = res.user;
  const owner = user._id;
  const { name, email, phone, favorite } = req.body;

  try {
    const existingContact = await getContactByName(name, owner);

    if (existingContact) {
      return res.status(400).json({
        status: 'failed',
        code: 400,
        data: 'Not found',
        message: `Contact with name: '${name}' already exsist`,
      });
    } else {
      const result = await createContact({ name, email, phone, favorite, owner });
      return res.status(201).json({
        status: 'success',
        code: 201,
        data: { contact: result },
      });
    }
  } catch (error) {
    console.error(error);
    next(error);
  }
}

export { createContacts };
