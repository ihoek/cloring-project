import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import StackNavigator from "./StackNavigator";
import TopClothesPage from '../pages/top_clothes_page';
import BottomClothesPage from '../pages/bottom_clothes_page';
import AccessoriesClothesPage from '../pages/accessories_clothes_page';

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator initialRouteName="MainPage">
      <Drawer.Screen name=" " component={StackNavigator} options={{ drawerLabel: 'Main Page' }} />
      <Drawer.Screen name="상의 페이지" component={TopClothesPage} options={{ drawerLabel: '상의' }} />
      <Drawer.Screen name="하의 페이지" component={BottomClothesPage} options={{ drawerLabel: '하의' }} />
      <Drawer.Screen name="악세사리 페이지" component={AccessoriesClothesPage} options={{ drawerLabel: '악세사리' }} />
    </Drawer.Navigator>
  );
}

export default DrawerNavigator;
