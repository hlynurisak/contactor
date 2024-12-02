import React from 'react';
import { Modal, View, Image } from 'react-native';
import styles from './styles';

export default function InformationScreen({ contact, visible, onClose }) {
    visible,
    onClose,
    onSave
    return(
        <Modal
        animationType="slide"
        transparent={true}
        visible={visible}
        onRequestClose={onClose}
        >
            <View style={styles.modalBackground}>
                <View style={styles.modalContainer}>
                    {contact.photo && <Image source={{ uri: contact.photo }} style={styles.image} />}
                <View style={styles.headerRow}>
                    <TouchableOpacity onPress={onClose}>
                        <Text style={styles.cancelButtonText}>Go Back</Text>
                    </TouchableOpacity>
                    <Text style={styles.name}>{contact.name}</Text>
                </View>
                    <Text style={styles.phoneNumber}>{contact.phoneNumber}</Text>
                </View>
            </View>
        </Modal>
    );
}