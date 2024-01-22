import { updateContact } from '#service/index.js';

async function updateContacts(req, res, next) {
  const { contactId } = req.params;
  const fields = req.body;
  try {
    const result = await updateContact(contactId, fields);
    if (result) {
      return res.json({
        status: 'success',
        code: 200,
        data: { contact: result },
      });
    } else {
      return res.status(404).json({
        status: 'error',
        code: 404,
        message: `Not found contact id: ${contactId}`,
        data: 'Not found',
      });
    }
  } catch (error) {
    console.error(error);
    next(error);
  }
}

export { updateContacts };
