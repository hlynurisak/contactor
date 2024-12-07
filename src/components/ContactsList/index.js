import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image } from 'react-native';
import styles from './styles';
import * as Linking from 'expo-linking';
import { Ionicons } from '@expo/vector-icons';

// Component to display and manage the list of contacts
const ContactsList = ({ search, contacts, onContactSelect }) => {
  const [filteredContacts, setFilteredContacts] = useState([]);

  // Function to filter and sort contacts based on the search query
  const filterContacts = (contacts, search) => {
    return contacts
      .filter((contact) =>
        contact.name.toLowerCase().includes(search.toLowerCase())
      )
      .sort((a, b) => a.name.localeCompare(b.name));
  };

  // Update the filtered contacts when search input or contacts change
  useEffect(() => {
    if (contacts) {
      setFilteredContacts(filterContacts(contacts, search));
    }
  }, [search, contacts]);

  // Render each contact item in the list
  const renderContact = ({ item }) => (
    <View style={styles.contactContainer}>
      <TouchableOpacity
        style={styles.contact}
        onPress={() => onContactSelect(item)}
      >
        <View style={styles.thumbnail}>
          {item.photo ? (
            <Image source={{ uri: item.photo }} style={styles.image} />
          ) : (
            <Text style={styles.initialsText}>
              {item.name.slice(0, 2).toUpperCase()}
            </Text>
          )}
        </View>
        <Text style={styles.contactName}>{item.name}</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => Linking.openURL(`tel:${item.phoneNumber}`)}
      >
        <View style={styles.callButton}>
          <Ionicons name="call" size={24} color="#fff" />
        </View>
      </TouchableOpacity>
    </View>
  );

  return (
    <FlatList
      data={filteredContacts}
      keyExtractor={(item) => item.id}
      renderItem={renderContact}
      contentContainerStyle={styles.listContainer}
    />
  );
};

export default ContactsList;