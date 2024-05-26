import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { ImageProvider } from './pages/ImageContext';
import { ProductProvider  } from './pages/contentcontext';
import DrawerNavigator from './navigation/DrawerNavigator';

export default function App() {
    console.disableYellowBox = true;

    return (
        <ProductProvider>
        <ImageProvider>
            <NavigationContainer>
                <StatusBar style="black" />
                <DrawerNavigator />
            </NavigationContainer>
        </ImageProvider>
        </ProductProvider>
    );
}
