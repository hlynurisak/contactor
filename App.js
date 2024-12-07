import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, Alert } from 'react-native';
import ContactsList from './src/components/ContactsList';
import SearchBar from './src/components/SearchBar';
import NewContactModal from './src/components/NewContactModal';
import InformationScreen from './src/components/InformationScreen';
import { getContacts, importContacts, saveNewContact, updateContact } from './src/services/fileService';
import { Ionicons } from '@expo/vector-icons';
import styles from './styles';

// Main application component managing contacts
export default function App() {
  // State variables for search, modals, contacts, and selected contact
  const [search, setSearch] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [infoModalVisible, setInfoModalVisible] = useState(false);
  const [contacts, setContacts] = useState([]);
  const [selectedContact, setSelectedContact] = useState(null);

  // Fetch contacts on component mount
  useEffect(() => {
    const fetchContacts = async () => {
      try {
        await importContacts();
        const loadedContacts = await getContacts();
        setContacts(loadedContacts || []);
      } catch (error) {
        console.error('Failed to load contacts:', error);
        setContacts([]);
      }
    };
    fetchContacts();
  }, []);

  // Add a new contact and update state
  const handleAddContact = async (newContact) => {
    const success = await saveNewContact(newContact);
    if (!success) {
      Alert.alert('Error', 'Unable to save contact.');
      return;
    }
    setContacts((prevContacts) => [...prevContacts, newContact]);
    setModalVisible(false);
  };

  // Select a contact and show information modal
  const handleContactSelect = (contact) => {
    setSelectedContact(contact);
    setInfoModalVisible(true);
  };

  // Update an existing contact and refresh state
  const handleUpdateContact = async (updatedContact) => {
    const finalContact = await updateContact(updatedContact);
    if (!finalContact) {
      Alert.alert('Error', 'Unable to save contact.');
      return;
    }

    // Update contacts list with the updated contact
    setContacts((prevContacts) =>
      prevContacts.map((contact) =>
        contact.id === updatedContact.id ? finalContact : contact
      )
    );
    setSelectedContact(finalContact);
  };

  return (
    <View style={styles.container}>
      {/* Header with search bar and add contact button */}
      <View style={styles.header}>
        <SearchBar search={search} setSearch={setSearch} style={styles.searchBar} />
        <TouchableOpacity
          style={styles.addContact}
          onPress={() => setModalVisible(true)}
        >
          <View style={styles.addContactIcon}>
            <Ionicons name="add" size={24} color="#fff" />
          </View>
        </TouchableOpacity>
      </View>

      {/* List of contacts filtered by search */}
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

      {/* Modal for displaying and editing contact information */}
      <InformationScreen
        contact={selectedContact}
        visible={infoModalVisible}
        onClose={() => {
          setInfoModalVisible(false);
          setSelectedContact(null);
        }}
        setContact={handleUpdateContact}
      />
    </View>
  );
}