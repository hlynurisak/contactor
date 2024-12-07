import { StyleSheet } from "react-native";

// Stylesheet for the NewContactModal component
const styles = StyleSheet.create({
  // Background overlay for the modal
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    alignItems: 'center',
    justifyContent: 'center',
  },

  // Container for the modal content
  modalContainer: {
    width: 300,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },

  // Header row with title and close button
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },

  // Text style for the modal title
  modalText: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },

  // Text style for the cancel button
  cancelButtonText: {
    color: 'grey',
    fontSize: 18,
  },

  // Input field styling
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 4,
    padding: 8,
    marginBottom: 10,
    backgroundColor: '#fff',
  },

  // Button styling for image picker actions
  imagePickerButton: {
    backgroundColor: '#007AFF',
    padding: 10,
    borderRadius: 5,
    marginVertical: 10,
    alignItems: 'center',
  },

  // Text style for image picker buttons
  imagePickerButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },

  // Style for the image preview
  imagePreview: {
    width: "100%",
    height: 200,
    borderRadius: 10,
    marginVertical: 10,
  },

  // Text style when no image is selected
  noImageText: {
    fontSize: 12,
    color: 'gray',
    marginVertical: 10,
  },
});

export default styles;