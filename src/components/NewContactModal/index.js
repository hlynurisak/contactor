import React from 'react';
import { View, Text, TextInput, Modal, Button, TouchableOpacity, Image } from 'react-native';
import styles from '@/src/NewContactModal/styles';
import * as ImagePicker from 'expo-image-picker';

export default function NewContactModal ({
    visible,
    onClose,
    onSave,
    contactName,
    setName,
    phoneNumber,
    setphoneNumber,
    photo,
    setPhoto,
}) {
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
            setBoardPhoto(result.assets[0].uri);
        }
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
                        onChangeText={setBoardName}
                    />
                    <TextInput 
                        style={styles.input}
                        placeholder="Phone Number"
                        value={phoneNumber}
                        onChangeText={setphoneNumber}
                    />
                    <TextInput 
                        style={styles.input}
                        placeholder="Photo URL (optional)"
                        value={photo}
                        onChangeText={setPhoto}
                    />
                    <TouchableOpacity
                        style={styles.imagePickerButton}
                        onPress={pickImage}
                    >
                        <Text style={styles.imagePickerButtonText}>Pick an Image</Text>
                    </TouchableOpacity>
                    {/* Display selected image or a placeholder message */}
                    {boardPhoto ? (
                        <Image source={{ uri: boardPhoto }} style={styles.imagePreview} />
                    ) : (
                        <Text style={styles.noImageText}>
                        No Image Selected or URL Entered
                        </Text>
                    )}
                    <Button title="Add New Contact" onPress={onSave}/>
                </View>
            </View>
        </Modal>
    );
}