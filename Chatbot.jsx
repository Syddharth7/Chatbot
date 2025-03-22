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
} from 'react-native';
import tw from 'twrnc';
import axios from 'axios';
import { WebView } from 'react-native-webview';

const ChatScreen = () => {
  const [messages, setMessages] = useState([]);
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
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={tw`flex-1 bg-gray-50`}
    >
      <View style={tw`bg-indigo-600 p-4 pt-10 flex-row justify-between items-center`}>
        <Text style={tw`text-white text-2xl font-bold`}>Chatbot</Text>
        <TouchableOpacity onPress={() => setMessages([])}>
          <Text style={tw`text-white text-sm`}>Clear</Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        ref={scrollViewRef}
        style={tw`flex-1 p-4`}
        contentContainerStyle={tw`pb-4`}
      >
        {messages.length === 0 ? (
          <View style={tw`flex-1 justify-center items-center mt-20`}>
            <Text style={tw`text-gray-500 text-lg`}>Start chatting!</Text>
          </View>
        ) : (
          messages.map((msg, index) => (
            <View
              key={index}
              style={tw`mb-4 flex-row ${
                msg.role === 'user' ? 'justify-end' : 'justify-start'
              }`}
            >
              <View
                style={tw`max-w-[75%] p-3 rounded-2xl shadow-md ${
                  msg.role === 'user'
                    ? 'bg-indigo-500'
                    : 'bg-white border border-gray-200'
                }`}
              >
                <Text
                  style={tw`${
                    msg.role === 'user' ? 'text-white' : 'text-gray-800'
                  }`}
                >
                  {msg.content}
                </Text>
              </View>
            </View>
          ))
        )}
      </ScrollView>

      <View style={tw`p-4 bg-white border-t border-gray-200 flex-row items-center`}>
        <TextInput
          style={tw`flex-1 p-3 border border-gray-300 rounded-full mr-2 bg-gray-100 text-gray-800`}
          value={input}
          onChangeText={setInput}
          placeholder="Type or speak a message..."
          placeholderTextColor={tw.color('gray-500')}
        />
        <TouchableOpacity
          onPress={() => setIsRecording(true)}
          style={tw`p-3 ${isRecording ? 'bg-red-500' : 'bg-indigo-500'} rounded-full mr-2`}
        >
          {isRecording ? (
            <ActivityIndicator size="small" color="white" />
          ) : (
            <Text style={tw`text-white font-semibold`}>🎙️</Text>
          )}
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => sendMessage()}
          style={tw`p-3 bg-indigo-500 rounded-full`}
        >
          <Text style={tw`text-white font-semibold`}>Send</Text>
        </TouchableOpacity>
      </View>

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
    </KeyboardAvoidingView>
  );
};

export default ChatScreen;