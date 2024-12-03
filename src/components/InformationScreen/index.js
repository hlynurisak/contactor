import React from 'react';
import { Modal, View, Text, Image, TouchableOpacity } from 'react-native';
import styles from './styles';

export default function InformationScreen({ 
    contact, 
    visible, 
    onClose 
}) {
  // Return null if no contact is provided
    if (!contact) return null;

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={visible}
            onRequestClose={onClose}
        >
            <View style={styles.modalBackground}>
                <View style={styles.modalContainer}>
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
                    ) : (
                        <Text style={styles.noPhoneNumber}>Phone number not available</Text>
                    )}

                    {/* Close Button */}
                    <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                        <Text style={styles.closeButtonText}>Go Back</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
}
