import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Image } from 'react-native';
import styles from './styles';

const ContactsList = ({ search, contacts }) => {
  const [filteredContacts, setFilteredContacts] = useState([]);

  useEffect(() => {
    if (search) {
      const filtered = contacts.filter((contact) =>
        contact.name.toLowerCase().includes(search.toLowerCase())
      );
      setFilteredContacts(filtered);
    } else {
      setFilteredContacts(contacts);
    }
  }, [search, contacts]);

  const getInitials = (name) => {
    const nameParts = name.split(' ');
    const initials = nameParts.map((part) => part[0]?.toUpperCase()).join('');
    return initials.slice(0, 2);
  };

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
