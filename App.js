import React from 'react';
import { StyleSheet, Text, View, TextInput, ScrollView, Image } from 'react-native';
import ContactScreen from "./src/components/ContactsScreen"

export default function App() {
  return (
    <View style={styles.container}>
      <ContactScreen/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    
    alignItems: 'center',
    paddingTop: 65,
  },
});
