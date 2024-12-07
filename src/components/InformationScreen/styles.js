import { StyleSheet } from 'react-native';

// Stylesheet for the InformationScreen component
const styles = StyleSheet.create({
  // Background overlay for the modal
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },

  // Container for the modal content
  modalContainer: {
    width: 300,
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    alignItems: 'center',
    elevation: 5,
  },

  // Style for the contact image
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 20,
  },

  // Placeholder view when contact has no photo
  placeholder: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#007AFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },

  // Text style for the placeholder initials
  placeholderText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },

  // Style for the contact name text
  name: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 10,
    textAlign: 'center',
  },

  // Style for the contact phone number text
  phoneNumber: {
    fontSize: 16,
    color: '#555',
    marginBottom: 20,
    textAlign: 'center',
  },

  // Style for text when no phone number is available
  noPhoneNumber: {
    fontSize: 16,
    color: '#aaa',
    marginBottom: 20,
    textAlign: 'center',
  },

  // Style for the close button
  closeButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#007AFF',
    borderRadius: 5,
  },

  // Text style for the close button
  closeButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },

  // Style for the edit contact button
  editContact: {
    position: 'absolute',
    top: 15,
    right: 15,
  },
});

export default styles;