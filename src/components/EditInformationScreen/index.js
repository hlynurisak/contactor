import React, { useEffect, useState } from 'react';
import { Modal, View, Image, Text, TouchableOpacity, Button, TextInput, Alert } from 'react-native';
import styles from './styles';
import * as ImagePicker from 'expo-image-picker';

export default function EditInformationScreen({
  contact,
  visible,
  onClose,
  onSave
}) {
  const [contactName, setContactName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [photo, setPhoto] = useState('');

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
      Alert.alert('Permission required', 'Permission to access the gallery is required!');
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
            <Text style={styles.modalText}>Edit Contact</Text>
            <TouchableOpacity onPress={onClose}>
              <Text style={styles.cancelButtonText}>Back</Text>
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
