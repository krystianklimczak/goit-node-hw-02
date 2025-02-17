import { removeContact } from '#service/index.js';

async function deleteContacts(req, res, next) {
  const [user] = res.user;
  const { contactId } = req.params;

  try {
    const result = await removeContact(contactId, user._id);
    if (result) {
      return res.json({
        status: 'success',
        code: 200,
        data: { conact: result },
        message: `Contact with id: '${contactId}' removed`,
      });
    } else {
      return res.status(404).json({
        status: 'error',
        code: 404,
        message: `Not found contact id: '${contactId}'`,
        data: 'Not found',
      });
    }
  } catch (error) {
    console.error(error);
    next(error);
  }
}

export { deleteContacts };
