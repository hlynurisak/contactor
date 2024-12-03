import React, { useState, useEffect } from 'react';
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import ContactsList from './src/components/ContactsList';
import SearchBar from './src/components/SearchBar';
import NewContactModal from './src/components/NewContactModal';
import InformationScreen from './src/components/InformationScreen';
import * as FileSystem from 'expo-file-system';

export default function App() {
  const [search, setSearch] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [infoModalVisible, setInfoModalVisible] = useState(false);
  const [contacts, setContacts] = useState([]);
  const [selectedContact, setSelectedContact] = useState(null);

  // Load saved contacts from the file system on mount
  useEffect(() => {
    const loadSavedContacts = async () => {
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
            id: file, // Use the filename as the unique ID
            name: contact.contactName,
            phoneNumber: contact.phoneNumber,
            photo: contact.photo,
          });
        }

        setContacts(loadedContacts);
      } catch (error) {
        console.error('Error loading contacts:', error);
      }
    };

    loadSavedContacts();
  }, []);

  const handleAddContact = (newContact) => {
    setContacts((prevContacts) => [
      ...prevContacts,
      {
        id: `${newContact.contactName}-${Date.now()}`, // Generate a unique ID for UI purposes
        name: newContact.contactName,
        phoneNumber: newContact.phoneNumber,
        photo: newContact.photo,
      },
    ]);
  };

  const handleContactSelect = (contact) => {
    setSelectedContact(contact); // Set the selected contact
    setInfoModalVisible(true); // Show the InformationScreen modal
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        {/* Search bar */}
        <SearchBar search={search} setSearch={setSearch} style={styles.searchBar} />

        {/* Add contact button */}
        <TouchableOpacity
          style={styles.addContact}
          onPress={() => setModalVisible(true)}
        >
          <Text style={styles.addContactText}>+</Text>
        </TouchableOpacity>
      </View>

      {/* List of contacts */}
      <ContactsList
        search={search}
        contacts={contacts}
        onContactSelect={handleContactSelect} // Pass the contact selection handler
      />

      {/* Modal for adding a new contact */}
      <NewContactModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)} // Close the modal
        onSave={handleAddContact} // Update state after saving
      />

      {/* Modal for displaying detailed contact information */}
      <InformationScreen
        contact={selectedContact}
        visible={infoModalVisible}
        onClose={() => setInfoModalVisible(false)} // Close the InformationScreen modal
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 50,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1.5,
    padding: 5,
    paddingBottom: 10,
    borderBottomColor: '#ccc',
  },
  searchBar: {
    flex: 1,
  },
  addContact: {
    width: 40,
    height: 40,
    backgroundColor: '#007AFF',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
  },
  addContactText: {
    color: '#fff',
    fontSize: 25,
    fontWeight: 'bold',
  },
});
