import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Animated,
  Dimensions,
  Platform,
} from 'react-native';
import tw from 'twrnc';
import { FontAwesome, MaterialIcons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

const SnakeBiteTreatmentScreen = ({ navigation }) => {
  const [activeStep, setActiveStep] = useState(0);
  const scrollRef = useRef(null);
  const animatedValues = useRef([...Array(5)].map(() => new Animated.Value(1))).current;

  const steps = [
    {
      title: 'Keep the victim calm',
      image: require('../assets/1.png'),
      description: 'Keep the person calm and reassure them. Anxiety increases heart rate which can spread venom faster through the body.',
      tips: ['Have them lie down', 'Keep them still', 'Speak in a calm voice'],
    },
    {
      title: 'Call emergency services',
      image: require('../assets/2.png'),
      description: 'Call local emergency number (911) immediately. Time is critical. If possible, note the time of the bite and the snakes appearance.',
      tips: ['Call 911', 'Note bite time', 'Describe the snake if possible'],
    },
    {
      title: 'Position the wound',
      image: require('../assets/3.png'),
      description: 'Position the bite below the level of the heart if possible. Remove any jewelry or tight clothing near the bite area.',
      tips: ['Keep bite below heart level', 'Remove rings, watches, tight clothing'],
    },
    {
      title: 'Clean the wound',
      image: require('../assets/4.png'),
      description: 'Gently wash the area with soap and water. Cover with a clean, dry bandage.',
      tips: ['Use mild soap and water', 'Pat dry gently', 'Apply clean bandage'],
    },
    {
      title: 'DONT do these things',
      image: require('../assets/1.png'),
      description: 'Do not cut the bite, suck out venom, apply ice, apply tourniquet, or give the victim anything to eat or drink.',
      tips: ['No cutting or sucking', 'No ice or tourniquets', 'No food or drinks', 'No caffeine or alcohol'],
    },
  ];

  const handleScroll = (event) => {
    const scrollPosition = event.nativeEvent.contentOffset.x;
    const index = Math.round(scrollPosition / width);
    if (index !== activeStep) {
      setActiveStep(index);
    }
  };

  const goToStep = (index) => {
    scrollRef.current?.scrollTo({
      x: index * width,
      animated: true,
    });
    setActiveStep(index);
  };

  const handlePressIn = (index) => {
    Animated.spring(animatedValues[index], {
      toValue: 0.95,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = (index) => {
    Animated.spring(animatedValues[index], {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  return (
    <SafeAreaView style={tw`flex-1 bg-white`}>
      {/* Header */}
      <View style={tw`flex-row items-center p-4 border-b border-gray-200`}>
        <TouchableOpacity 
          onPress={() => navigation.goBack()}
          style={tw`w-10 h-10 justify-center items-center`}
        >
          <FontAwesome name="arrow-left" size={22} color="black" />
        </TouchableOpacity>
        
        <Text style={tw`flex-1 text-center text-xl font-bold`}>Snake Bite Treatment</Text>
        
        <TouchableOpacity style={tw`w-10 h-10 justify-center items-center`}>
          <FontAwesome name="bookmark-o" size={22} color="black" />
        </TouchableOpacity>
      </View>

      {/* Emergency Call Banner */}
  

      {/* Main Content Area */}
      <View style={tw`flex-1`}>
        {/* Step Carousel */}
        <ScrollView
          ref={scrollRef}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onMomentumScrollEnd={handleScroll}
          scrollEventThrottle={16}
          style={tw`flex-1`}
        >
          {steps.map((step, index) => (
            <View key={index} style={[tw`p-4`, { width }]}>
              <View style={tw`bg-gray-50 rounded-3xl overflow-hidden shadow-sm`}>
                {/* Step Title */}
                <View style={tw`bg-blue-500 p-4`}>
                  <Text style={tw`text-white text-xl font-bold text-center`}>
                    {index + 1}. {step.title}
                  </Text>
                </View>

                {/* Step Image */}
                <View style={tw`items-center justify-center p-6`}>
                  <Image
                    source={step.image}
                    style={tw`w-full h-48 rounded-xl`}
                    resizeMode="contain"
                  />
                </View>

                {/* Step Description */}
                <View style={tw`px-6 pb-4`}>
                  <Text style={tw`text-gray-800 text-lg mb-4`}>
                    {step.description}
                  </Text>

                  {/* Tips */}
                  <View style={tw`bg-blue-50 p-4 rounded-xl mb-2`}>
                    <Text style={tw`text-blue-800 font-bold text-base mb-2`}>Key Points:</Text>
                    {step.tips.map((tip, tipIndex) => (
                      <View key={tipIndex} style={tw`flex-row items-center mb-1`}>
                        <MaterialIcons name="check-circle" size={18} color="#3b82f6" style={tw`mr-2`} />
                        <Text style={tw`text-gray-700 text-base`}>{tip}</Text>
                      </View>
                    ))}
                  </View>
                </View>
              </View>
            </View>
          ))}
        </ScrollView>

        {/* Step Indicators */}
        <View style={tw`flex-row justify-center items-center py-4`}>
          {steps.map((_, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => goToStep(index)}
              style={tw`mx-1`}
            >
              <View
                style={[
                  tw`w-3 h-3 rounded-full`,
                  activeStep === index ? tw`bg-blue-500` : tw`bg-gray-300`,
                ]}
              />
            </TouchableOpacity>
          ))}
        </View>

        {/* Quick Access Buttons */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={tw`p-4`}
        >
          {steps.map((step, index) => (
            <Animated.View 
              key={index}
              style={{
                transform: [{ scale: animatedValues[index] }]
              }}
            >
              <TouchableOpacity
                onPress={() => goToStep(index)}
                onPressIn={() => handlePressIn(index)}
                onPressOut={() => handlePressOut(index)}
                style={tw`mr-3 bg-white shadow-md rounded-xl overflow-hidden border border-gray-200 ${activeStep === index ? 'border-blue-500' : ''}`}
              >
                <View style={tw`w-24 h-16 justify-center items-center p-2`}>
                  <Text style={tw`text-center text-xs font-medium ${activeStep === index ? 'text-blue-500' : 'text-gray-700'}`}>
                    {index + 1}. {step.title.length > 12 ? step.title.substring(0, 12) + '...' : step.title}
                  </Text>
                </View>
              </TouchableOpacity>
            </Animated.View>
          ))}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default SnakeBiteTreatmentScreen;