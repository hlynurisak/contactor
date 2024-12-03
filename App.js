import React, { useState, useEffect } from 'react';
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import ContactsList from './src/components/ContactsList';
import SearchBar from './src/components/SearchBar';
import NewContactModal from './src/components/NewContactModal';
import InformationScreen from './src/components/InformationScreen';
import * as FileSystem from 'expo-file-system';
import { Ionicons } from '@expo/vector-icons';

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
            id: file, 
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
        id: `${newContact.contactName}-${Date.now()}`, 
        name: newContact.contactName,
        phoneNumber: newContact.phoneNumber,
        photo: newContact.photo,
      },
    ]);
  };

  const handleContactSelect = (contact) => {
    setSelectedContact(contact); 
    setInfoModalVisible(true); 
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
          <View style={styles.addContactIcon}>
            <Ionicons name="add" size={24} color="#fff" />
          </View>
        </TouchableOpacity>
      </View>

      {/* List of contacts */}
      <ContactsList
        search={search}
        contacts={contacts}
        onContactSelect={handleContactSelect} 
      />

      {/* Modal for adding a new contact */}
      <NewContactModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)} 
        onSave={handleAddContact} 
      />

      {/* Modal for displaying detailed contact information */}
      <InformationScreen
        contact={selectedContact}
        visible={infoModalVisible}
        onClose={() => setInfoModalVisible(false)} 
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
    marginRight: 7,
  },
  addContactIcon: {
    width: 40,
    height: 40,
    color: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
