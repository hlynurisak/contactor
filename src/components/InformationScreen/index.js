import React, { useState, useEffect } from 'react';
import { Modal, View, Text, Image, TouchableOpacity } from 'react-native';
import styles from './styles';
import EditInformationScreen from '../EditInformationScreen';

export default function InformationScreen({ 
    contact, 
    visible, 
    onClose,
    setContacts  // Passed from App.js
}) {
  // Return null if no contact is provided
    if (!contact) return null;
    const [editModalVisible, setEditModalVisible] = useState(false); // State for edit modal

    const handleSave = (updatedContact) => {
        setContacts(updatedContact); // Use the passed prop to update contacts
    };

    return (
        <>
            <Modal
                animationType="slide"
                transparent={true}
                visible={visible}
                onRequestClose={onClose}
            >
                <View style={styles.modalBackground}>
                    <View style={styles.modalContainer}>
                        <TouchableOpacity 
                            style={styles.editContact}
                            onPress={() => setEditModalVisible(true)}
                        >
                            <Text>Edit</Text>
                        </TouchableOpacity>
                        {/* Display contact image or placeholder */}
                        {contact.photo ? (
                            <Image source={{ uri: contact.photo }} style={styles.image} />
                        ) : (
                            <View style={styles.placeholder}>
                                <Text style={styles.placeholderText}>{contact.name.slice(0, 2).toUpperCase()}</Text>
                            </View>
                        )}

                        {/* Contact Name */}
                        <Text style={styles.name}>{contact.name}</Text>

                        {/* Contact Phone Number */}
                        {contact.phoneNumber ? (
                            <Text style={styles.phoneNumber}>{contact.phoneNumber}</Text>
                        ) : ( null )}

                        {/* Close Button */}
                        <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                            <Text style={styles.closeButtonText}>Go Back</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
            {/* Edit Information Modal */}
            <EditInformationScreen
                contact={contact}
                visible={editModalVisible}
                onClose={() => setEditModalVisible(false)} // Close the edit modal
                onSave={(updatedContact) => {
                    setEditModalVisible(false); // Close edit modal after saving
                    handleSave(updatedContact); // Save the updated contact locally
                }}                
            />
        </>
    );
}
