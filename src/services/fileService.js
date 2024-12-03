import * as FileSystem from 'expo-file-system';
import "react-native-get-random-values";
import { v4 as uuidv4 } from 'uuid';

// Function to sanitize contact name for file naming
const sanitizeName = (name) => {
  const sanitizedName = name.replace(/[^a-z0-9]/gi, "_");
  return sanitizedName.toLowerCase();
};

// Function to get the filename of a contact by its ID
const getContactFileById = async (contactId) => {
  try {
    const files = await FileSystem.readDirectoryAsync(FileSystem.documentDirectory);
    const jsonFiles = files.filter((file) => file.endsWith('.json'));
    const file = jsonFiles.find((file) => file.includes(contactId));
    return file;
  } catch (error) {
    console.error('Error finding contact file:', error);
    return null;
  }
};

// Function to load all contacts from the file system
export const getContacts = async () => {
  try {
    const files = await FileSystem.readDirectoryAsync(FileSystem.documentDirectory);
    const jsonFiles = files.filter((file) => file.endsWith('.json'));
    const loadedContacts = [];

    for (const file of jsonFiles) {
      const fileContent = await FileSystem.readAsStringAsync(
        `${FileSystem.documentDirectory}${file}`
      );
      const contact = JSON.parse(fileContent);
      loadedContacts.push({
        id: contact.id,
        name: contact.name,
        phoneNumber: contact.phoneNumber,
        photo: contact.photo,
      });
    }
    return loadedContacts;
  } catch (error) {
    console.error('Error loading contacts:', error);
    return [];
  }
};

// Function to save a new contact to the file system
export const saveNewContact = async (newContact) => {
  try {
    if (!newContact.name || !newContact.phoneNumber) {
      console.error('Name and Phone number are required');
      return false;
    }

    const sanitizedName = sanitizeName(newContact.name);
    const contactId = uuidv4();
    newContact.id = contactId;

    const fileName = `${sanitizedName}-${contactId}.json`;
    const fileUri = `${FileSystem.documentDirectory}${fileName}`;
    const fileContent = JSON.stringify(newContact);

    await FileSystem.writeAsStringAsync(fileUri, fileContent);
    return true;
  } catch (error) {
    console.error('Error saving contact:', error);
    return false;
  }
};

// Function to update an existing contact in the file system
export const updateContact = async (updatedContact) => {
  try {
    const thisId = updatedContact.id;
    if (!thisId) {
      console.error('Contact ID not found');
      return false;
    }
    const contactFile = await getContactFileById(thisId);
    if (!contactFile) {
      console.error('Contact file not found');
      return false;
    }
    const fileUri = `${FileSystem.documentDirectory}${contactFile}`;
    const fileContent = JSON.stringify(updatedContact);
    await FileSystem.writeAsStringAsync(fileUri, fileContent);
    return true;
  } catch (error) {
    console.error('Error updating contact:', error);
    return false;
  }
};
