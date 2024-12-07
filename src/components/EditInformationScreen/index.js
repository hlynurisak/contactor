import React, { useEffect, useState } from 'react';
import { Modal, View, Image, Text, TouchableOpacity, Button, TextInput, Alert } from 'react-native';
import styles from './styles';
import * as ImagePicker from 'expo-image-picker';

// Component for editing contact information
export default function EditInformationScreen({
  contact,
  visible,
  onClose,
  onSave
}) {
  // State variables for contact details
  const [contactName, setContactName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [photo, setPhoto] = useState('');

  // Initialize state with contact data when contact changes
  useEffect(() => {
    if (contact) {
      setContactName(contact.name || '');
      setPhoneNumber(contact.phoneNumber || '');
      setPhoto(contact.photo || '');
    }
  }, [contact]);

  // Function to select an image from the gallery
  const pickImage = async () => {
    const libraryPermissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!libraryPermissionResult.granted) {
      Alert.alert('Permission required', 'Permission to access the gallery is required!');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setPhoto(result.assets[0].uri);
    }
  };

  // Function to take a new photo using the camera
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

  // Handle saving the updated contact information
  const handleSave = () => {
    if (!contactName || !phoneNumber) {
      Alert.alert('Validation error', 'Name and Phone number are required');
      return;
    }

    const updatedContact = {
      ...contact,
      name: contactName,
      phoneNumber,
      photo,
    };

    onSave(updatedContact);
    onClose();
  };

  // Do not render if no contact is provided
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
          {/* Header with title and close button */}
          <View style={styles.headerRow}>
            <Text style={styles.modalText}>Edit Contact</Text>
            <TouchableOpacity onPress={onClose}>
              <Text style={styles.cancelButtonText}>Back</Text>
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

          {/* Save button to apply changes */}
          <Button title="Save" onPress={handleSave} />
        </View>
      </View>
    </Modal>
  );
}