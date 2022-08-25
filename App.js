

import React from 'react';

import BottomNav from "./src/navigation/BottomNav"
import Camera from './src/components/Camera';
import InputFields from './src/components/InputFields';
import PreviewImage from './src/navigation/PreviewImage';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();
const App = () => {
 

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='BottomNav'>
        <Stack.Screen name="BottomNav" component={BottomNav}  options={{headerShown: false}}/>
        <Stack.Screen name="Camera" component={Camera}  options={{headerShown: false}} />
        <Stack.Screen name="InputFields" component={InputFields} />
        <Stack.Screen name="PreviewImage" component={PreviewImage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
