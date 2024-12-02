import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import ContactsList from './src/components/ContactsList'; 
import SearchBar from './src/components/SearchBar';
import NewContactModal from './src/components/NewContactModal';

export default function App() {
  const [search, setSearch] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View style={styles.container}>
        <View style={styles.header}>
          {/* Search bar */}
          <SearchBar 
            search={search} 
            setSearch={setSearch} 
            style={styles.searchBar}
          />

          {/* Add contact button */}
          <TouchableOpacity 
            style={styles.addContact}
            onPress={() => setModalVisible(true)}>
            <Text style={styles.addContactText}>+</Text>
          </TouchableOpacity>
        </View>

        {/* List of contacts */}
        <ContactsList search={search} /> 

        {/* Modal for adding a new contact */}
      <NewContactModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)} // Close the modal
        onSave={() => setModalVisible(false)} // Close after saving
        contactName=""
        setContactName={() => {}}
        phoneNumber=""
        setphoneNumber={() => {}}
        photo=""
        setPhoto={() => {}}
      />
      <StatusBar style="auto" />
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
