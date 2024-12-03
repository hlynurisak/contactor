import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import styles from './styles';

const ContactsList = ({ search, contacts }) => {
  const [filteredContacts, setFilteredContacts] = useState([]);

  useEffect(() => {
    const sortedContacts = [...contacts].sort((a, b) =>
      a.name.localeCompare(b.name)
    );

    if (search) {
      const filtered = sortedContacts.filter((contact) =>
        contact.name.toLowerCase().includes(search.toLowerCase())
      );
      setFilteredContacts(filtered);
    } else {
      setFilteredContacts(sortedContacts);
    }
  }, [search, contacts]);

  const renderContact = ({ item }) => (
    <View style={styles.contactContainer}>
      <View style={styles.initialsCircle}>
        <Text style={styles.initialsText}>{item.name.slice(0, 2).toUpperCase()}</Text>
      </View>
      <Text style={styles.contactName}>{item.name}</Text>
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
