import { StyleSheet } from "react-native";

// Stylesheet for the SearchBar component
const styles = StyleSheet.create({
  // Container view for the search bar
  view: {
    backgroundColor: 'transparent',
    flex: 1,
  },

  // Style for the search bar container
  sbContainerStyle: {
    backgroundColor: 'white',
    borderWidth: 0,
    shadowColor: 'white',
    borderBottomColor: 'transparent',
    borderTopColor: 'transparent',
  },

  // Style for the search bar input container
  sbInputContainerStyle: {
    backgroundColor: 'transparent',
    height: 40,
    flex: 1,
  },
});

export default styles;