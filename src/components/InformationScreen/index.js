import React, { useState } from 'react';
import { Modal, View, Text, Image, TouchableOpacity } from 'react-native';
import styles from './styles';
import EditInformationScreen from '../EditInformationScreen';
import { MaterialIcons } from '@expo/vector-icons';

// Component to display contact information and handle editing
export default function InformationScreen({
  contact,
  visible,
  onClose,
  setContact
}) {
  const [editModalVisible, setEditModalVisible] = useState(false);

  // Save updated contact and close modals
  const handleSave = (updatedContact) => {
    setContact(updatedContact);
    setEditModalVisible(false);
    onClose();
  };

  // Do not render if no contact is provided
  if (!contact) return null;

  return (
    <>
      {/* Modal displaying contact details */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={visible}
        onRequestClose={onClose}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            {/* Button to open edit contact modal */}
            <TouchableOpacity
              style={styles.editContact}
              onPress={() => setEditModalVisible(true)}
            >
              <MaterialIcons name="edit" size={26} color="blue" />
            </TouchableOpacity>

            {/* Display contact photo or initials */}
            {contact.photo ? (
              <Image source={{ uri: contact.photo }} style={styles.image} />
            ) : (
              <View style={styles.placeholder}>
                <Text style={styles.placeholderText}>
                  {contact.name.slice(0, 2).toUpperCase()}
                </Text>
              </View>
            )}

            {/* Contact name */}
            <Text style={styles.name}>{contact.name}</Text>

            {/* Contact phone number */}
            {contact.phoneNumber ? (
              <Text style={styles.phoneNumber}>{contact.phoneNumber}</Text>
            ) : null}

            {/* Button to close the modal */}
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Text style={styles.closeButtonText}>Go Back</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Modal for editing contact information */}
      <EditInformationScreen
        contact={contact}
        visible={editModalVisible}
        onClose={() => setEditModalVisible(false)}
        onSave={handleSave}
      />
    </>
  );
}