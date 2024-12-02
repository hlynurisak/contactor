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
      <SearchBar search={search} setSearch={setSearch} />
      <ContactsList search={search} /> 
      <TouchableOpacity 
      style={styles.addContact}
      onPress={() => setModalVisible(true)}>
        <Text>+</Text>
      </TouchableOpacity>
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
    paddingTop: 50, // Adjust for status bar
  },
  addContact: {
    margin: 5,
    alignItems: 'center',
    paddingBottom: 20,
  }
});
