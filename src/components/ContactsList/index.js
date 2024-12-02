import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Image, Alert } from 'react-native';
import * as Contacts from 'expo-contacts';
import styles from './styles';

const ContactsList = ({ search }) => {
  const [contacts, setContacts] = useState([]);
  const [filteredContacts, setFilteredContacts] = useState([]);

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const { status } = await Contacts.requestPermissionsAsync();
        if (status !== 'granted') {
          Alert.alert('Permission Denied', 'Unable to access contacts.');
          return;
        }

        const { data } = await Contacts.getContactsAsync({
          fields: [Contacts.Fields.Name, Contacts.Fields.Image],
        });

        if (data.length > 0) {
          const sortedContacts = data
            .filter((contact) => contact.name)
            .map((contact) => ({
              id: contact.id,
              name: contact.name,
              initials: getInitials(contact.name),
              thumbnail: contact.imageAvailable ? contact.image.uri : null,
            }))
            .sort((a, b) => a.name.localeCompare(b.name));

          setContacts(sortedContacts);
          setFilteredContacts(sortedContacts); // Initialize filtered list
        }
      } catch (error) {
        console.error('Error fetching contacts:', error);
        Alert.alert('Error', 'Unable to fetch contacts.');
      }
    };

    fetchContacts();
  }, []);

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
          <Text style={styles.initialsText}>{item.initials}</Text>
        </View>
      )}
      <Text style={styles.name}>{item.name}</Text>
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
