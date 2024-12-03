import React, { useEffect } from 'react';
import { Modal, View, Image, Text, TouchableOpacity, Button, TextInput, Alert } from 'react-native';
import styles from './styles';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';

export default function EditInformationScreen({
    contact,
    visible,
    onClose,
    onSave
}) {
    const [contactName, setContactName] = React.useState('');
    const [phoneNumber, setPhoneNumber] = React.useState('');
    const [photo, setPhoto] = React.useState('');

    useEffect(() => {
        if (contact) {
            setContactName(contact.name || '');
            setPhoneNumber(contact.phoneNumber || '');
            setPhoto(contact.photo || '');
        }
    }, [contact]);

    const pickImage = async () => {
        const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (!permissionResult.granted) {
            alert('Permission to access the gallery is required!');
            return;
        }
    
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });
    
        if (!result.canceled) {
            setPhoto(result.assets[0].uri);
        }
    };
    
    const handleSave = () => {
        if (!contactName || !phoneNumber) {
            alert('Name and Phone number are required');
            return;
        }
        
        setContactName('');
        setPhoneNumber('');
        setPhoto('');
        onClose();
    };

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
                    <View style={styles.headerRow}>
                        <Text style={styles.name}>Edit Contact</Text>
                        <TouchableOpacity onPress={onClose}>
                            <Text style={styles.cancelButtonText}>back</Text>  
                        </TouchableOpacity>
                    </View>
                    {/* Input for contact name */}
                    <TextInput
                        style={styles.input}
                        placeholder="Name"
                        value={contactName}
                        onChangeText={setContactName}
                    />
                    {/* Input for contact phone number */}
                    <TextInput
                        style={styles.input}
                        placeholder="Phone Number"
                        value={phoneNumber}
                        onChangeText={setPhoneNumber}
                        keyboardType="phone-pad"
                    />
                    {/* Change for contact photo */}
                    <TouchableOpacity
                        style={styles.imagePickerButton}
                        onPress={pickImage}
                    >
                        <Text style={styles.imagePickerButtonText}>Pick an Image</Text>
                    </TouchableOpacity>
                    {photo ? (
                        <Image source={{ uri: contact.photo }} style={styles.imagePreview} />
                    ) : null}
                    <Button title="Save" onPress={handleSave} />
                </View>
            </View>
        </Modal>
    )
}