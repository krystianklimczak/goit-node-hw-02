import { getAllContacts } from '#service/index.js';

async function indexContacts(req, res, next) {
  const [user] = res.user;

  try {
    const results = await getAllContacts();
    const newResults = results.filter(element => element.owner.equals(user._id));

    return res.json({
      status: 'succes',
      code: 200,
      data: {
        contacts: newResults,
        contactsCount: newResults.length,
      },
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
}

export { indexContacts };
