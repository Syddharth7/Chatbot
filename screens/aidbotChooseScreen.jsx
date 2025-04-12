import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, StatusBar } from 'react-native';
import { useFonts } from 'expo-font';
import { MaterialCommunityIcons, FontAwesome } from '@expo/vector-icons';

export default function aidbotChooseScreen({ navigation }) { 
  // In a real app, you would load custom fonts
  const [loaded] = useFonts({
    // Replace with actual font files in your project
    'Jaldi-Bold': require('../assets/Jaldi-Bold.ttf'),
  });

  if (!loaded) {
    return null; // Return null while fonts are loading
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      {/* Back button */}
      <TouchableOpacity 
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <MaterialCommunityIcons name="arrow-left" size={24} color="black" />
      </TouchableOpacity>
      
      {/* Character Image */}
      <View style={styles.characterContainer}>
        <Image
          source={require('../assets/doctor.png')} // Replace with your character image
          style={styles.characterImage}
          resizeMode="contain"
        />
      </View>
      
      {/* Title */}
      <Text style={styles.titleText}>HOW CAN I HELP YOU?</Text>
      
      {/* Action Buttons */}
      <View style={styles.actionButtons}>
        <TouchableOpacity 
          style={styles.actionButton}
          onPress={() => navigation.navigate('Chatbot')}
        >
          <MaterialCommunityIcons name="chat-outline" size={70} color="#000000" />
          <Text style={styles.buttonText}>Use Chat?</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.actionButton}
          onPress={() => navigation.navigate('Manual')}
        >
          <Image
            source={require('../assets/book.png')} // Replace with your book icon
            style={styles.manualIcon}
            resizeMode="contain"
          />
          <Text style={styles.buttonText}>First Aid Manual</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 20,
    zIndex: 10,
  },
  characterContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 30,
  },
  characterImage: {
    width: 250,
    height: 250,
    borderRadius: 75, // Make it circular
  },
  titleText: {
    fontSize: 30,
    marginBottom: 40,
    textAlign: 'center',
    fontFamily: 'Jaldi-Bold',
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 10,
  },
  actionButton: {
    backgroundColor: '#6495ED', // Light blue color
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    width: '45%',
    height: 150,
  },
  buttonText: {
    color: 'white',
    marginTop: 10,
    fontSize: 14,
    fontWeight: '500',
    textAlign: 'center',
  },
  manualIcon: {
    width: 70,
    height: 70,
  },
});