import { StyleSheet } from "react-native";

// Stylesheet for the Contact Management App
const styles = StyleSheet.create({
  // Container for the main application view
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 50,
  },
  
  // Header section containing the search bar and add button
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1.5,
    padding: 5,
    paddingBottom: 10,
    borderBottomColor: '#ccc',
  },
  
  // Search bar styling
  searchBar: {
    flex: 1,
  },
  
  // Add Contact button styling
  addContact: {
    width: 40,
    height: 40,
    backgroundColor: '#007AFF',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    marginRight: 7,
  },
  
  // Icon within the Add Contact button
  addContactIcon: {
    width: 40,
    height: 40,
    color: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default styles;