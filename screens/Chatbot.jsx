import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  Image,
  SafeAreaView,
} from 'react-native';
import tw from 'twrnc';
import axios from 'axios';
import { WebView } from 'react-native-webview';
import { FontAwesome } from '@expo/vector-icons';

const ChatScreen = ({ navigation }) => {
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'Hi!' }
  ]);
  const [input, setInput] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const scrollViewRef = useRef(null);

  useEffect(() => {
    scrollViewRef.current?.scrollToEnd({ animated: true });
  }, [messages]);

  const sendMessage = async (text = input) => {
    if (!text.trim()) return;

    const userMessage = { role: 'user', content: text };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');

    try {
      const response = await axios.post(
        'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=AIzaSyABQTWyheZ8u3kSifAkUy8Ewu_wMaITUP8',
        {
          contents: [{ parts: [{ text }] }],
        },
        {
          headers: { 'Content-Type': 'application/json' },
        }
      );

      const botMessage = {
        role: 'assistant',
        content: response.data.candidates[0].content.parts[0].text,
      };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error('Error:', error);
      const errorMessage = { role: 'assistant', content: 'Oops, something went wrong!' };
      setMessages((prev) => [...prev, errorMessage]);
    }
  };

  const handleSpeechResult = (text) => {
    setInput(text);
    sendMessage(text);
    setIsRecording(false);
  };

  const injectedJavaScript = `
    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.lang = 'en-US';
    recognition.onresult = (event) => {
      const text = event.results[0][0].transcript;
      window.ReactNativeWebView.postMessage(text);
    };
    recognition.onerror = (event) => {
      window.ReactNativeWebView.postMessage('Speech Error: ' + event.error);
    };
    recognition.onend = () => {
      window.ReactNativeWebView.postMessage('END');
    };
    document.getElementById('start').addEventListener('click', () => recognition.start());
    true;
  `;

  return (
    <SafeAreaView style={tw`flex-1 bg-white`}>
      {/* Header */}
      <View style={tw`p-4`}>
        <TouchableOpacity 
          onPress={() => navigation.goBack()}
          style={tw`w-8 h-8 justify-center`}
        >
          <FontAwesome name="arrow-left" size={24} color="black" />
        </TouchableOpacity>
      </View>

      {/* Chat Area */}
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={tw`flex-1`}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
      >
        <ScrollView
          ref={scrollViewRef}
          style={tw`flex-1 px-4`}
          contentContainerStyle={tw`pb-4`}
        >
          {/* Doctor Character and Welcome Message */}
          <View style={tw`items-center justify-center mb-6`}>
            <View style={tw`w-40 h-40 rounded-full border-4 border-blue-400 overflow-hidden mb-4`}>
              <Image
                source={require('../assets/doctor.png')}
                style={tw`w-full h-full`}
                resizeMode="cover"
              />
            </View>
            
            <Text style={tw`text-xl font-bold text-black`}>
              {messages[0].content}
            </Text>
          </View>

          {/* Messages (excluding the first welcome message) */}
          {messages.slice(1).map((msg, index) => (
            <View
              key={index}
              style={tw`mb-4 flex-row ${
                msg.role === 'user' ? 'justify-end' : 'justify-start'
              }`}
            >
              <View
                style={tw`max-w-[75%] p-3 rounded-2xl ${
                  msg.role === 'user'
                    ? 'bg-blue-500'
                    : 'bg-gray-200'
                }`}
              >
                <Text
                  style={tw`${
                    msg.role === 'user' ? 'text-white' : 'text-black'
                  }`}
                >
                  {msg.content}
                </Text>
              </View>
            </View>
          ))}
        </ScrollView>

        {/* Input Area */}
        <View style={tw`p-4 pb-6`}>
          <View style={tw`flex-row items-center bg-gray-200 rounded-full`}>
            <TextInput
              style={tw`flex-1 py-3 px-5 text-black rounded-l-full`}
              value={input}
              onChangeText={setInput}
              placeholder="Ask me anything..."
              placeholderTextColor={tw.color('gray-500')}
            />
            
            <TouchableOpacity
              onPress={() => setIsRecording(true)}
              style={tw`px-4`}
            >
              {isRecording ? (
                <ActivityIndicator size="small" color="#4d8bf5" />
              ) : (
                <FontAwesome name="microphone" size={20} color="gray" />
              )}
            </TouchableOpacity>
            
            <TouchableOpacity
              onPress={() => sendMessage()}
              style={tw`bg-blue-500 h-10 w-10 rounded-full justify-center items-center mr-1`}
            >
              <FontAwesome name="arrow-right" size={16} color="white" />
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>

      {isRecording && (
        <WebView
          source={{ html: '<button id="start" style="display:none;">Start</button>' }}
          injectedJavaScript={injectedJavaScript}
          onMessage={(event) => {
            const data = event.nativeEvent.data;
            if (data === 'END') setIsRecording(false);
            else if (data.startsWith('Speech Error')) setIsRecording(false);
            else handleSpeechResult(data);
          }}
          style={tw`absolute h-0 w-0`}
        />
      )}
    </SafeAreaView>
  );
};

export default ChatScreen;