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
      {item.thumbnail ? (
        <Image source={{ uri: item.thumbnail }} style={styles.thumbnail} />
      ) : (
        <View style={styles.initialsPlaceholder}>
          <Text style={styles.initialsText}>{getInitials(item.name)}</Text>
        </View>
      )}
      <Text style={styles.name}>{item.name}</Text>
      {item.phoneNumber && <Text style={styles.phoneNumber}>{item.phoneNumber}</Text>}
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
