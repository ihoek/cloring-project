import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import MyPage from '../pages/private_page';
import MainPage from '../pages/main_page';
import ClothesPage from '../pages/clothes_page';

const Stack = createStackNavigator();


const StackNavigator = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerStyle: {
                    backgroundColor: "#36251b"
                },
                headerTitleAlign: 'left',
                headerTintColor: "#fff",
                headerBackTitleVisible: false
            }}
        >
            <Stack.Screen name="Cloring" component={MainPage} />
            <Stack.Screen name="PrivatePage" component={MyPage} />
            <Stack.Screen name="ClothesPage" component={ClothesPage} />
            
        </Stack.Navigator>
    );
}

export default StackNavigator;
