import React from 'react';
import { View, Text, TextInput, Modal, Button, TouchableOpacity, Image } from 'react-native';
import styles from './styles';
import * as ImagePicker from 'expo-image-picker';

export default function NewContactModal ({
    visible,
    onClose,
    onSave
}) {
    const [contactName, setContactName] = React.useState('');
    const [phoneNumber, setPhoneNumber] = React.useState('');
    const [photo, setPhoto] = React.useState('');


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
        console.log(result); // Check what `result` contains

    
        if (!result.canceled) {
            setPhoto(result.assets[0].uri);
        }
    };

    const handleSave = () => {
        if (!contactName && !phoneNumber) {
            alert('Name and Phone number are required');
            return;
        }
        else if (!contactName) {
            alert('Name is required');
            return;
        }
        else if (!phoneNumber) {
            alert('Phone number is required');
            return;
        }
        onSave({ contactName, phoneNumber, photo }); // Pass data to the parent
    };

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
                        <Text style={styles.modalText}>Add New Contact</Text>
                        <TouchableOpacity onPress={onClose}>
                            <Text style={styles.cancelButtonText}>X</Text>
                        </TouchableOpacity>
                    </View>
                    <TextInput
                        style={styles.input}
                        placeholder="Name"
                        value={contactName}
                        onChangeText={setContactName}
                    />
                    <TextInput 
                        style={styles.input}
                        placeholder="Phone Number"
                        value={phoneNumber}
                        onChangeText={setPhoneNumber}
                    />
                    <TextInput 
                        style={styles.input}
                        placeholder="Photo URL (optional)"
                        value={photo || ''}
                        onChangeText={setPhoto}
                    />
                    <TouchableOpacity
                        style={styles.imagePickerButton}
                        onPress={pickImage}
                    >
                        <Text style={styles.imagePickerButtonText}>Pick an Image</Text>
                    </TouchableOpacity>
                    <Button title="Save" onPress={handleSave}/>
                </View>
            </View>
        </Modal>
    );
}