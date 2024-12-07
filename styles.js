import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      paddingTop: 50,
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      borderBottomWidth: 1.5,
      padding: 5,
      paddingBottom: 10,
      borderBottomColor: '#ccc',
    },
    searchBar: {
      flex: 1,
    },
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
    addContactIcon: {
      width: 40,
      height: 40,
      color: '#fff',
      justifyContent: 'center',
      alignItems: 'center',
    },
});
  