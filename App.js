import React, { useState, useEffect } from 'react';
import { StyleSheet, View, TouchableOpacity, Text, Alert } from 'react-native';
import ContactsList from './src/components/ContactsList';
import SearchBar from './src/components/SearchBar';
import NewContactModal from './src/components/NewContactModal';
import InformationScreen from './src/components/InformationScreen';
import { getContacts, saveNewContact, updateContact } from './src/services/fileService';
import { Ionicons } from '@expo/vector-icons';

export default function App() {
  const [search, setSearch] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [infoModalVisible, setInfoModalVisible] = useState(false);
  const [contacts, setContacts] = useState([]);
  const [selectedContact, setSelectedContact] = useState(null);

  // Load saved contacts from the file system on mount
  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const loadedContacts = await getContacts();
        setContacts(loadedContacts || []);
      } catch (error) {
        console.error('Failed to load contacts:', error);
        setContacts([]); // Ensure contacts is an array even on failure
      }
    };
    fetchContacts();
  }, []);

  // Function to handle adding a new contact
  const handleAddContact = async (newContact) => {
    const success = await saveNewContact(newContact);
    if (!success) {
      Alert.alert('Error', 'Unable to save contact.');
      return;
    }
    setContacts((prevContacts) => [...prevContacts, newContact]);
    setModalVisible(false);
  };

  // Function to handle selecting a contact
  const handleContactSelect = (contact) => {
    setSelectedContact(contact); 
    setInfoModalVisible(true); 
  };

  // Function to handle updating a contact
  const handleUpdateContact = async (updatedContact) => {
    const success = await updateContact(updatedContact);
    if (!success) {
      Alert.alert('Error', 'Unable to save contact.');
      return;
    }
    setContacts((prevContacts) =>
      prevContacts.map((contact) =>
        contact.id === updatedContact.id ? updatedContact : contact
      )
    );
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
        setContact={handleUpdateContact}
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
