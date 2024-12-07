import { StyleSheet } from 'react-native';

// Stylesheet for the ContactsList component
const styles = StyleSheet.create({
  // Container for the entire list
  listContainer: {
    paddingHorizontal: 10,
  },

  // Container for each contact item
  contactContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    paddingVertical: 10,
  },

  // Style for the contact section within each item
  contact: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  // Thumbnail styling for contact's avatar or initials
  thumbnail: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#007AFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },

  // Text style for contact initials
  initialsText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },

  // Text style for contact names
  contactName: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
  },

  // Image styling for contact photos
  image: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },

  // Style for the call button
  callButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#02cd77',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default styles;