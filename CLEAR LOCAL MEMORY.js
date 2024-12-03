/*
* Copy this file into App.js and run to clear the local memory of the device.
*/
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Button, Alert } from 'react-native';
import * as FileSystem from 'expo-file-system';

export default function App() {
  const [cleared, setCleared] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const clearDeviceMemory = async () => {
      try {
        const files = await FileSystem.readDirectoryAsync(FileSystem.documentDirectory);
        for (const file of files) {
          await FileSystem.deleteAsync(`${FileSystem.documentDirectory}${file}`, { idempotent: true });
        }
        setCleared(true);
      } catch (error) {
        Alert.alert('Error', 'Failed to clear device memory.');
        console.error('Error clearing device memory:', error);
      } finally {
        setLoading(false);
      }
    };

    clearDeviceMemory();
  }, []);

  const handleExit = () => {
    // Implement any exit logic if necessary
    // For example, navigate to another screen or close the app
  };

  return (
    <View style={styles.container}>
      {loading ? (
        <>
          <ActivityIndicator size="large" color="#0000ff" />
          <Text style={styles.text}>Clearing device memory...</Text>
        </>
      ) : cleared ? (
        <>
          <Text style={styles.text}>Device memory has been cleared.</Text>
          <Button title="Exit" onPress={handleExit} />
        </>
      ) : (
        <Text style={styles.text}>Failed to clear device memory.</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  text: {
    marginTop: 20,
    fontSize: 18,
    textAlign: 'center',
  },
});

