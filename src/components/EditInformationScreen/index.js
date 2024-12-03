import React from 'react';
import { Modal, View, Image } from 'react-native';
import styles from './styles';

export default function EditInformationScreen({
    contact,
    visible,
    onClose,
    onSave
}) {
    // const
    const handleSave = () => {
        if (!contactName || !phoneNumber) {
            alert('Name and Phone number are required');
            return;
        }

        const newContact = {
            contactName,
            phoneNumber,
            photo,
        };

          // Save contact to the file system
        saveToFileSystem(newContact);

          // Pass the data to the parent component
        onSave(newContact);

          // Reset the form and close the modal
        setContactName('');
        setPhoneNumber('');
        setPhoto('');
        onClose();
    }

    return (
        <Modal
        animationType="slide"
        transparent={true}
        visible={visible}
        onRequestClose={onClose}
        >
            <View style={styles.modalBackground}>
                <View style={styles.modalContainer}>
                    <View style={styles.headerRow}>
                        <Text style={styles.name}>Name</Text>
                        <TouchableOpacity onPress={onClose}>
                            <Text style={styles.cancelButtonText}>X</Text>  
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    )
}