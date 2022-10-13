const path = require('path');
const jsonFileData = path.join(__dirname, 'contacts.json')
const fs = require('fs').promises
const shortid = require('shortid');


async function listContacts() {
  try {
    console.log(JSON.parse(await fs.readFile(jsonFileData, 'utf-8')))
  } catch (e) {
    console.log(e.message)
  }
}
async function getContactById(id) {
  try{
    console.log(JSON.parse(await fs.readFile(jsonFileData, 'utf-8')).find(i => i.id === id))
  }catch(e){
    console.log(e.message)
  }
}
async function removeContact(id) {
  try {
  const filter = JSON.parse(await fs.readFile(jsonFileData, 'utf-8')).filter(i => i.id !== id);
  await fs.writeFile(jsonFileData, JSON.stringify(filter))
  console.log(filter);
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
    console.log(writeToFile);
    await fs.writeFile(jsonFileData, JSON.stringify(writeToFile));
  } catch (e) {
    console.log(e.message);
  }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact
}