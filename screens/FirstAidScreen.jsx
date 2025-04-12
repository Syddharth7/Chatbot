import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, SafeAreaView, StatusBar } from 'react-native';

export default function FirstAidManualScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      {/* Header with back button */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image 
            source={require('../assets/image.png')} 
            style={styles.backIcon}
          />
        </TouchableOpacity>
      </View>
      
      {/* Title */}
      <Text style={styles.title}>First Aid Kit Manual</Text>
      
      {/* Main first aid kit image */}
      <View style={styles.kitImageContainer}>
        <Image 
          source={require('../assets/firstaid.png')} 
          style={styles.kitImage}
          resizeMode="contain"
        />
      </View>
      
      {/* Grid of first aid options */}
      <View style={styles.optionsGrid}>
        {/* Row 1 */}
        <View style={styles.optionsRow}>
          {/* Snake Bite */}
          <TouchableOpacity 
            style={styles.optionButton}
            onPress={() => navigation.navigate('SnakeBite')}
          >
            <Image 
              source={require('../assets/snakebite.png')} 
              style={styles.optionImage}
              resizeMode="contain"
            />
            <Text style={styles.optionText}>Snake Bite</Text>
          </TouchableOpacity>
          
          {/* Wound */}
          <TouchableOpacity 
            style={styles.optionButton}
            onPress={() => navigation.navigate('WoundScreen')}
          >
            <Image 
              source={require('../assets/wound.png')} 
              style={styles.optionImage}
              resizeMode="contain"
            />
            <Text style={styles.optionText}>Wound</Text>
          </TouchableOpacity>
        </View>
        
        {/* Row 2 */}
        <View style={styles.optionsRow}>
          {/* Headache */}
          <TouchableOpacity 
            style={styles.optionButton}
            onPress={() => navigation.navigate('HeadacheScreen')}
          >
            <Image 
              source={require('../assets/headache.png')} 
              style={styles.optionImage}
              resizeMode="contain"
            />
            <Text style={styles.optionText}>Headache</Text>
          </TouchableOpacity>
          
          {/* Nosebleed */}
          <TouchableOpacity 
            style={styles.optionButton}
            onPress={() => navigation.navigate('NosebleedScreen')}
          >
            <Image 
              source={require('../assets/nosebleed.png')} 
              style={styles.optionImage}
              resizeMode="contain"
            />
            <Text style={styles.optionText}>Nosebleed</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingHorizontal: 16,
  },
  header: {
    paddingTop: 10,
    paddingBottom: 5,
  },
  backIcon: {
    width: 24,
    height: 24,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  kitImageContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 30,
  },
  kitImage: {
    width: 200,
    height: 200,
  },
  optionsGrid: {
    flex: 1,
    justifyContent: 'flex-start',
  },
  optionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  optionButton: {
    width: '48%',
    aspectRatio: 1,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
  },
  optionImage: {
    width: '70%',
    height: '70%',
    marginBottom: 10,
  },
  optionText: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});