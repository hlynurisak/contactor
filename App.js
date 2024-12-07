import React, { useState, useEffect } from 'react';
import { StyleSheet, View, TouchableOpacity, Alert } from 'react-native';
import ContactsList from './src/components/ContactsList';
import SearchBar from './src/components/SearchBar';
import NewContactModal from './src/components/NewContactModal';
import InformationScreen from './src/components/InformationScreen';
import { getContacts, importContacts, saveNewContact, updateContact } from './src/services/fileService';
import { Ionicons } from '@expo/vector-icons';

export default function App() {
  const [search, setSearch] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [infoModalVisible, setInfoModalVisible] = useState(false);
  const [contacts, setContacts] = useState([]);
  const [selectedContact, setSelectedContact] = useState(null);

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

  const handleAddContact = async (newContact) => {
    const success = await saveNewContact(newContact);
    if (!success) {
      Alert.alert('Error', 'Unable to save contact.');
      return;
    }
    setContacts((prevContacts) => [...prevContacts, newContact]);
    setModalVisible(false);
  };

  const handleContactSelect = (contact) => {
    setSelectedContact(contact);
    setInfoModalVisible(true);
  };

  const handleUpdateContact = async (updatedContact) => {
    const finalContact = await updateContact(updatedContact);
    if (!finalContact) {
      Alert.alert('Error', 'Unable to save contact.');
      return;
    }
  
    // Use the returned finalContact (with the new id) to update state
    setContacts((prevContacts) =>
      prevContacts.map((contact) =>
        contact.id === updatedContact.id ? finalContact : contact
      )
    );
    setSelectedContact(finalContact);
  };

  return (
    <View style={styles.container}>
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
      <ContactsList
        search={search}
        contacts={contacts}
        onContactSelect={handleContactSelect}
      />
      <NewContactModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onSave={handleAddContact}
      />
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
