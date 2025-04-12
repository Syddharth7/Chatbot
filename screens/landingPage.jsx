import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, StatusBar } from 'react-native';
import { useFonts } from 'expo-font';
import { LinearGradient } from 'expo-linear-gradient';

export default function landingPage({ navigation }) {
  // Load the font with the exact name it will be referenced by
  const [fontsLoaded] = useFonts({
    'Jaldi-Bold': require('../assets/Jaldi-Bold.ttf'),
  });

  // Show loading indicator or return null while fonts are loading
  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.background}>
        {/* Logo and Title */}
        <View style={styles.logoContainer}>
          <View style={styles.medkitContainer}>
            <Text style={styles.medkitIcon}>🇨🇭</Text>
          </View>
          <Text style={styles.titleText}>AID ME</Text>
        </View>

        {/* Avatar Circle */}
        <View style={styles.avatarContainer}>
          <Image
            source={require('../assets/doctor.png')}
            style={styles.avatarImage}
            resizeMode="cover"
          />
        </View>

        {/* Subtitle Text */}
        <View style={styles.subtitleContainer}>
          <Text style={styles.subtitleText}>YOUR AI FIRST AID KIT</Text>
          <Text style={styles.assistantText}>ASSISTANT</Text>
        </View>

        {/* Start Button */}
        <TouchableOpacity 
          style={styles.startButton}
          onPress={() => navigation.navigate('Help')}
        >
          <Text style={styles.startButtonText}>GET STARTED</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  background: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingVertical: 50,
    backgroundColor: 'white',
  },
  logoContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  medkitContainer: {
    backgroundColor: 'red',
    width: 40,
    height: 40,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  medkitIcon: {
    fontSize: 20,
    color: 'white',
  },
  titleText: {
    fontSize: 30,
    fontFamily: 'Jaldi-Bold',
    letterSpacing: 1,
    color: '#333',
    // Removed fontWeight: 'bold'
  },
  avatarContainer: {
    width: 280,
    height: 280,
    borderRadius: 160,
    overflow: 'hidden',
    marginTop: 30,
    marginBottom: 40,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarImage: {
    width: '100%',
    height: '100%',
  },
  subtitleContainer: {
    alignItems: 'center',
    marginBottom: 50,
  },
  subtitleText: {
    fontSize: 30,
    color: '#333',
    fontFamily: 'Jaldi-Bold',
    textAlign: 'center',
    // Removed fontWeight: 'bold'
    marginBottom: 5,
  },
  assistantText: {
    fontSize: 30,
    color: '#333',
    fontFamily: 'Jaldi-Bold',
    textAlign: 'center',
    // Removed fontWeight: 'bold'
  },
  startButton: {
    backgroundColor: '#6495ED',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
    marginTop: 20,
  },
  startButtonText: {
    color: 'white',
    fontSize: 16,
    fontFamily: 'Jaldi-Bold',
    letterSpacing: 1,
    // Removed fontWeight: 'bold'
  },
});