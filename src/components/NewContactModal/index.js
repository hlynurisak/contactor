import React from 'react';
import { View, Text, TextInput, Modal, Button, TouchableOpacity, Image, Alert } from 'react-native';
import styles from './styles';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';

export default function NewContactModal({ visible, onClose, onSave }) {
  const [contactName, setContactName] = React.useState('');
  const [phoneNumber, setPhoneNumber] = React.useState('');
  const [photo, setPhoto] = React.useState('');

  // Unique ID generator
  const generateUniqueId = () => `${Date.now()}-${Math.floor(Math.random() * 1000)}`;

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

  const saveToFileSystem = async (contact) => {
    try {
      const fileName = `${contact.contactName}-${generateUniqueId()}.json`; // Use custom unique ID
      const fileUri = `${FileSystem.documentDirectory}${fileName}`;

      const fileContent = JSON.stringify(contact);

      await FileSystem.writeAsStringAsync(fileUri, fileContent);
      Alert.alert('File content: ' + JSON.parse(FileSystem.readAsStringAsync(fileUri)));
    } catch (error) {
      console.error('Error saving contact:', error);
      Alert.alert('Error', 'Unable to save contact.');
    }
  };

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
            keyboardType="phone-pad"
          />
          <TouchableOpacity
            style={styles.imagePickerButton}
            onPress={pickImage}
          >
            <Text style={styles.imagePickerButtonText}>Pick an Image</Text>
          </TouchableOpacity>
          {photo ? (
            <Image source={{ uri: photo }} style={styles.imagePreview} />
          ) : null}
          <Button title="Save" onPress={handleSave} />
        </View>
      </View>
    </Modal>
  );
}
