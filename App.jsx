import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import WelcomeScreen from './screens/landingPage'
import HelpScreen from './screens/aidbotChooseScreen'
import chatbot from './screens/Chatbot'
import Manual from './screens/FirstAidScreen'
import SnakeBiteTreatmentScreen from 'screens/snakeBite';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator 
        initialRouteName="Welcome"
        screenOptions={{ 
          headerShown: false,
          animation: 'slide_from_right'
        }}
      >
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        <Stack.Screen name="Help" component={HelpScreen} />
        <Stack.Screen name="Chatbot" component={chatbot} />
        <Stack.Screen name="Manual" component={Manual} />
        <Stack.Screen name="SnakeBite" component={SnakeBiteTreatmentScreen} />
        {/* Add more screens here as you create them */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}