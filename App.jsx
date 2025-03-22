import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import ChatScreen from './Chatbot';

import './global.css'

export default function App() {
  return (
    <SafeAreaProvider>
      <ChatScreen />
    </SafeAreaProvider>
  );
}