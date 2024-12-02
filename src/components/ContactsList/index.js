import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Image, Alert } from 'react-native';
import * as Contacts from 'expo-contacts';
import styles from './styles'; // Import the styles

const ContactsList = () => {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        // Request permissions
        const { status } = await Contacts.requestPermissionsAsync();
        if (status !== 'granted') {
          Alert.alert('Permission Denied', 'Unable to access contacts.');
          return;
        }

        // Fetch contacts
        const { data } = await Contacts.getContactsAsync({
          fields: [Contacts.Fields.Name, Contacts.Fields.Image],
        });

        if (data.length > 0) {
          // Process and sort contacts alphabetically
          const sortedContacts = data
            .filter((contact) => contact.name) // Filter out contacts without a name
            .map((contact) => ({
              id: contact.id,
              name: contact.name,
              initials: getInitials(contact.name), // Generate initials
              thumbnail: contact.imageAvailable ? contact.image.uri : null,
            }))
            .sort((a, b) => a.name.localeCompare(b.name));

          setContacts(sortedContacts);
        }
      } catch (error) {
        console.error('Error fetching contacts:', error);
        Alert.alert('Error', 'Unable to fetch contacts.');
      }
    };

    fetchContacts();
  }, []);

  // Function to extract initials from a name
  const getInitials = (name) => {
    const nameParts = name.split(' ');
    const initials = nameParts
      .map((part) => part[0]?.toUpperCase())
      .join('');
    return initials.slice(0, 2); // Limit to 2 initials
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
      data={contacts}
      keyExtractor={(item) => item.id}
      renderItem={renderContact}
      contentContainerStyle={styles.listContainer}
    />
  );
};

export default ContactsList;
