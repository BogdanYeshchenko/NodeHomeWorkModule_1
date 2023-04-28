const fs = require("fs/promises");
const path = require("path");
const { nanoid } = require("nanoid");

const contactsPath = path.join(__dirname, "db/contacts.json");

async function listContacts() {
  const contacts = await fs.readFile(contactsPath);
  return JSON.parse(contacts);
}

async function getContactById(contactId) {
  const contacts = await listContacts();
  const result = contacts.find((el) => el.id === contactId);
  return result || null;
}

async function removeContact(contactId) {
  const contacts = await listContacts();
  const searchContactIndex = contacts.findIndex((el) => el.id === contactId);
  if (searchContactIndex === -1) {
    return null;
  }
  const newContacts = contacts.filter((el) => el.id !== contactId);

  await fs.writeFile(contactsPath, JSON.stringify(newContacts, null, 2));
  return contacts[searchContactIndex];
}

async function addContact(name, email, phone) {
  const contacts = await listContacts();
  const addContact = { id: nanoid(), name, email, phone };
  const newContacts = [...contacts, addContact];

  await fs.writeFile(contactsPath, JSON.stringify(newContacts, null, 2));
  return addContact;
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
