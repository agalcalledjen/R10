import React from 'react';
import { View, Text } from 'react-native';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import About from '../screens/About';

const AppNavigator = createStackNavigator({
  About: {
    screen: About
  }
});

export default createAppContainer(AppNavigator);
