import { getContactById } from '#service/index.js';

async function showContacts(req, res, next) {
  const [user] = res.user;
  const { contactId } = req.params;

  try {
    const result = await getContactById(contactId, user._id);

    if (result) {
      return res.status(200).json({
        status: 'success',
        code: 200,
        data: { contact: result },
      });
    } else {
      return res.status(404).json({
        status: 'fail',
        code: 404,
        data: 'none',
        message: 'Contact not found',
      });
    }
  } catch (error) {
    console.error(error);
    next(error);
  }
}

export { showContacts };
