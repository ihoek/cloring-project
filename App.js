import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
//import MainPage from './pages/main_page';
//import MyPage from './pages/private_page';
import {NavigationContainer} from '@react-navigation/native';
import StackNavigator from './navigation/StackNavigator'

export default function App() {
  console.disableYellowBox = true;


  return ( 
    
  <NavigationContainer>
    <StatusBar style="black" />
    <StackNavigator/>
 </NavigationContainer>);
  
}