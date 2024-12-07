import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Modal, Button, TouchableOpacity, Image, Alert } from 'react-native';
import styles from './styles';
import * as ImagePicker from 'expo-image-picker';

// Component for adding a new contact
export default function NewContactModal({ visible, onClose, onSave }) {
  const [contactName, setContactName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [photo, setPhoto] = useState('');

  // Reset input fields when the modal becomes visible
  useEffect(() => {
    if (visible) {
      setContactName('');
      setPhoneNumber('');
      setPhoto('');
    }
  }, [visible]);

  // Select an image from the gallery
  const pickImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permissionResult.granted) {
      Alert.alert('Permission required', 'Permission to access the gallery is required!');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setPhoto(result.assets[0].uri);
    }
  };

  // Capture a new photo using the camera
  const takePhoto = async () => {
    const cameraPermissionResult = await ImagePicker.requestCameraPermissionsAsync();
    if (!cameraPermissionResult.granted) {
      Alert.alert('Permission required', 'Permission to access the camera is required!');
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setPhoto(result.assets[0].uri);
    }
  };

  // Save the new contact and close the modal
  const handleSave = () => {
    if (!contactName || !phoneNumber) {
      Alert.alert('Validation error', 'Name and Phone number are required');
      return;
    }

    const newContact = {
      name: contactName,
      phoneNumber,
      photo,
    };

    onSave(newContact);
    onClose();
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalBackground}>
        <View style={styles.modalContainer}>
          {/* Header with title and close button */}
          <View style={styles.headerRow}>
            <Text style={styles.modalText}>Add New Contact</Text>
            <TouchableOpacity onPress={onClose}>
              <Text style={styles.cancelButtonText}>X</Text>
            </TouchableOpacity>
          </View>

          {/* Input for contact name */}
          <TextInput
            style={styles.input}
            placeholder="Name"
            value={contactName}
            onChangeText={setContactName}
          />

          {/* Input for phone number */}
          <TextInput
            style={styles.input}
            placeholder="Phone Number"
            value={phoneNumber}
            onChangeText={setPhoneNumber}
            keyboardType="phone-pad"
          />

          {/* Button to pick an image from the gallery */}
          <TouchableOpacity
            style={styles.imagePickerButton}
            onPress={pickImage}
          >
            <Text style={styles.imagePickerButtonText}>Pick an Image</Text>
          </TouchableOpacity>

          {/* Button to take a new photo */}
          <TouchableOpacity
            style={styles.imagePickerButton}
            onPress={takePhoto}
          >
            <Text style={styles.imagePickerButtonText}>Take a Photo</Text>
          </TouchableOpacity>

          {/* Display the selected or captured photo */}
          {photo ? (
            <Image source={{ uri: photo }} style={styles.imagePreview} />
          ) : null}

          {/* Save button to add the new contact */}
          <Button title="Save" onPress={handleSave} />
        </View>
      </View>
    </Modal>
  );
}