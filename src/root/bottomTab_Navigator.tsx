import * as React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Feather from "react-native-vector-icons/Feather";
import Home_Screen from "../screens/Home_Page";
import Shop_Screen from "../screens/Shop_Screen";
import Order_Screen from "../screens/Order_Screen";
import More_Screen from "../screens/More_Screen";

import assets from "../assets";

const Tab = createBottomTabNavigator();

const Tab_Navigator = () => {
  return (
    <Tab.Navigator
      initialRouteName={assets.NavigationConstants.HOME_SCREEN.NAME}
      screenOptions={{
        tabBarActiveTintColor: assets.Colors.SIGN_IN_COLOR,
        headerShown: false,
      }}
    >
      <Tab.Screen
        name={assets.NavigationConstants.HOME_SCREEN.NAME}
        component={Home_Screen}
        options={{
          tabBarLabel: "HOME",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="home-outline"
              color={color}
              size={size}
            />
          ),
        }}
      />
      <Tab.Screen
        name={assets.NavigationConstants.SHOP_SCREEN.NAME}
        component={Shop_Screen}
        options={{
          tabBarLabel: "SHOP",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="tools" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name={assets.NavigationConstants.ORDER_SCREEN.NAME}
        component={Order_Screen}
        options={{
          tabBarLabel: "ORDER",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="truck-delivery-outline"
              color={color}
              size={size}
            />
          ),
        }}
      />
      <Tab.Screen
        name={assets.NavigationConstants.MORE_SCREEN.NAME}
        component={More_Screen}
        options={{
          tabBarLabel: "MORE",
          tabBarIcon: ({ color, size }) => (
            <Feather name="more-horizontal" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};
export default Tab_Navigator;
