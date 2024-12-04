import React, { useState } from 'react';
import { Modal, View, Text, Image, TouchableOpacity } from 'react-native';
import styles from './styles';
import EditInformationScreen from '../EditInformationScreen';
import { MaterialIcons } from '@expo/vector-icons';

export default function InformationScreen({
    contact,
    visible,
    onClose,
    setContact
}) {
    const [editModalVisible, setEditModalVisible] = useState(false);

    const handleSave = (updatedContact) => {
        setContact(updatedContact);
        setEditModalVisible(false);
        onClose();
    };

    if (!contact) return null;

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
                            <MaterialIcons name="edit" size={26} color="blue" />
                        </TouchableOpacity>
                        {contact.photo ? (
                            <Image source={{ uri: contact.photo }} style={styles.image} />
                        ) : (
                            <View style={styles.placeholder}>
                                <Text style={styles.placeholderText}>{contact.name.slice(0, 2).toUpperCase()}</Text>
                            </View>
                        )}
                        <Text style={styles.name}>{contact.name}</Text>
                        {contact.phoneNumber ? (
                            <Text style={styles.phoneNumber}>{contact.phoneNumber}</Text>
                        ) : null}
                            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                                <Text style={styles.closeButtonText}>Go Back</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
            <EditInformationScreen
                contact={contact}
                visible={editModalVisible}
                onClose={() => setEditModalVisible(false)}
                onSave={handleSave}
            />
        </>
    );
}
