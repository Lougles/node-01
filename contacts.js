const path = require('path');
const jsonFileData = path.join(__dirname, 'contacts.json')
const fs = require('fs').promises
const fsSync = require('fs');
const shortid = require('shortid');

function listContactsSync() {
  try {
    console.table(JSON.parse(fsSync.readFileSync(jsonFileData, 'utf-8')))
  } catch (e) {
    console.log(e.message);
  }
}
function getContactByIdSync(id) {
  try {
    console.table(JSON.parse(fsSync.readFileSync(jsonFileData, 'utf-8')).find(i => i.id === id))
  } catch (e) {
    console.log(e.message);
  }
}
function removeContactSync(id){
  try {
    const filter = JSON.parse(fsSync.readFileSync(jsonFileData, 'utf-8')).filter(i => i.id !== id);
    fsSync.writeFileSync(jsonFileData, JSON.stringify(filter))
    listContactsSync();
  } catch (e) {
    console.log(e.message);
  }
}
function addContactSync(name, email, phone){
  try {
    const user = {
      id: shortid.generate(), name, email, phone
    }
    const data = JSON.parse(fsSync.readFileSync(jsonFileData, 'utf-8'));
    fsSync.writeFileSync(jsonFileData, JSON.stringify([...data, user]));
    listContactsSync();
  } catch (e) {
    console.log(e.message);
  }
}
async function listContacts() {
  try {
    console.table(JSON.parse(await fs.readFile(jsonFileData, 'utf-8')))
  } catch (e) {
    console.log(e.message)
  }
}
async function getContactById(id) {
  try{
    console.table(JSON.parse(await fs.readFile(jsonFileData, 'utf-8')).find(i => i.id === id))
  }catch(e){
    console.log(e.message)
  }
}
async function removeContact(id) {
  try {
  const filter = JSON.parse(await fs.readFile(jsonFileData, 'utf-8')).filter(i => i.id !== id);
  await fs.writeFile(jsonFileData, JSON.stringify(filter))
  console.table(filter);
  } catch (e) {
    console.log(e.message);
  }
}
async function addContact(name, email, phone) {
  try {
    const user = {
      id: shortid.generate(),name,email,phone
    }
    const data = JSON.parse(await fs.readFile(jsonFileData, 'utf-8'));
    const writeToFile = [...data, user];
    console.table(writeToFile);
    await fs.writeFile(jsonFileData, JSON.stringify(writeToFile));
  } catch (e) {
    console.log(e.message);
  }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  listContactsSync,
  getContactByIdSync,
  removeContactSync,
  addContactSync
}