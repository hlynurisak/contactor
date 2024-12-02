import React from 'react';
import { Modal, View, Image } from 'react-native';
import styles from './styles';

export default function InformationScreen({
    visible,
    onClose,
    onSave
}) {
    return(
        <Modal
        animationType="slide"
        transparent={true}
        visible={visible}
        onRequestClose={onClose}
        >
            <View style={styles.modalBackground}>
                <View style={styles.modalContainer}>
                    <View style={styles.headerRow}>
                        <TouchableOpacity onPress={onClose}>
                            <Text style={styles.cancelButtonText}>go back</Text>  
                        </TouchableOpacity>
                        <Text style={styles.name}>Name</Text>
                    </View>
                    <Text style={styles.phoneNumber}>Phone Number</Text>
                    <Image style={styles.image}/>
                </View>
            </View>
        </Modal>
    );
}