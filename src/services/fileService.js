import * as FileSystem from 'expo-file-system';
import * as Contacts from 'expo-contacts';
import "react-native-get-random-values";
import { v4 as uuidv4 } from 'uuid';

const sanitizeName = (name) => {
  const sanitizedName = name.replace(/[^a-z0-9]/gi, "_");
  return sanitizedName.toLowerCase();
};

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

export const getContacts = async (importFlag) => {
  if (importFlag) {
    console.log('Importing contacts');
    await importContacts();
  }

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
        imported: contact.imported, // Include the imported attribute
      });
    }
    return loadedContacts;
  } catch (error) {
    console.error('Error loading contacts:', error);
    return [];
  }
};

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

export const deleteContact = async (contactId) => {
  try {
    const contactFile = await getContactFileById(contactId);
    if (!contactFile) {
      console.error('Contact file not found');
      return false;
    }
    const fileUri = `${FileSystem.documentDirectory}${contactFile}`;
    await FileSystem.deleteAsync(fileUri);
    return true;
  } catch (error) {
    console.error('Error deleting contact:', error);
    return false;
  }
};

export const updateContact = async (updatedContact) => {
  try {
    const contactId = updatedContact.id;
    if (!contactId) {
      console.error('Contact ID not found');
      return false;
    }

    // Remove the ID from the updated contact
    const { id, ...contactWithoutId } = updatedContact;
    const contact = contactWithoutId;

    // Delete the old contact
    const deleteResult = await deleteContact(contactId);
    if (!deleteResult) {
      console.error('Failed to delete old contact');
      return false;
    }

    // Save the new contact
    const saveResult = await saveNewContact(contact);
    if (!saveResult) {
      console.error('Failed to save updated contact');
      return false;
    }

    return true;
  } catch (error) {
    console.error('Error updating contact:', error);
    return false;
  }
};

const importContacts = async () => {
  // Get permission to access contacts
  const { status } = await Contacts.requestPermissionsAsync();
  if (status !== 'granted') {
    console.error('Permission to access contacts was denied');
    return false;
  }

  // Get existing contacts to delete imported ones
  const contacts = await getContacts(false); // Correctly await the async function
  if (contacts.length > 0) {
    for (const contact of contacts) {
      if (contact.imported) {
        await deleteContact(contact.id); // Await the delete operation
      }
    }
  }

  // Now import contacts from device
  const { data } = await Contacts.getContactsAsync({
    fields: [Contacts.Fields.Name, Contacts.Fields.PhoneNumbers],
  });

  if (data.length > 0) {
    for (const contact of data) {
      if (!contact.name || !contact.phoneNumbers || contact.phoneNumbers.length === 0) {
        continue;
      }
      const newContact = {
        name: contact.name,
        phoneNumber: contact.phoneNumbers[0]?.number || '',
        photo: '',
        imported: true,
      };
      await saveNewContact(newContact);
    }
    return true;
  }
  return false;
};