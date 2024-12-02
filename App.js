import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import ContactsList from './src/components/ContactsList'; 
export default function App() {
  return (
    <View style={styles.container}>
      <ContactsList /> 
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 50, // Adjust for status bar
  },
});
