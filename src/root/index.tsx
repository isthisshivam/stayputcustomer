import React, { useState, useEffect, useRef } from "react";
import { NavigationContainer } from "@react-navigation/native";
import {
  createStackNavigator,
  TransitionPreset,
  CardStyleInterpolators,
} from "@react-navigation/stack";
import assets from "../assets";
import Auth_Stack from "./authStack_navigator";
import Tab_Navigator from "./bottomTab_Navigator";
import All_Products from "../screens/All_Products";
import Location_Change from "../screens/Change_Location";
import Cart from "../screens/Cart_Screen";
import Chatting from "../screens/Chatting";
import Check_Out from "../screens/CheckOut_Screen/index";
import Schedule from "../screens/Schedule_Change";
import Product_Detail from "../screens/Product_Details";
import About_Product from "../screens/About_Product";
import My_Favourite_Products from "../screens/My_Favourite_Products";
import Account_Edit from "../screens/Edit_Account";
import Edit_deliveryAddrs from "../screens/Edit_DeliveryAddress";
import Full_Addrs from "../screens/Full_Address";
import Calender_view from "../screens/Calender";
import dashboard_stack from "./dash-navigator";
import LocationPermission from "../screens/LocationPermission";
import Payment_method from "../screens/Payment_method";
import SEarch_deliveryAddrs from "../screens/Search_Address";
import orderDetails from "../screens/Order_Details";
import Products_search from "../screens/Search_Products";
import Need_Help from "../screens/Help_Center";
import HelpWebView from "../screens/Help_Center/Help_Webview";
import View_order from "../screens/Order_Reciept";
import Splash from "../screens/Splash";
import ChangeStoreLocation from "../screens/Change_Store_Location";
const Stack = createStackNavigator();
import Order_Screen from "../screens/Order_Screen";
import { useNavigation } from "@react-navigation/native";
const Root = () => {
  const navigation = useNavigation();

  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{ headerShown: false }}
        component={Splash}
        name={assets.NavigationConstants.SPLASH.NAME}
      ></Stack.Screen>
      <Stack.Screen
        name={assets.NavigationConstants.AUTH_STACK.NAME}
        component={Auth_Stack}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name={assets.NavigationConstants.STACKS.HOME_STACK}
        component={Tab_Navigator}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name={assets.NavigationConstants.PRODUCT_LIST.NAME}
        component={All_Products}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name={assets.NavigationConstants.CHANGE_LOCATION.NAME}
        component={Location_Change}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name={assets.NavigationConstants.MY_CART.NAME}
        component={Cart}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name={assets.NavigationConstants.CHECK_OUT_SCREEN.NAME}
        component={Check_Out}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name={assets.NavigationConstants.DELIVERY_SCHEDULE.NAME}
        component={Schedule}
        options={{
          headerShown: false,
          gestureEnabled: true,
          gestureDirection: "vertical",
          cardStyleInterpolator: CardStyleInterpolators.forBottomSheetAndroid,
        }}
      />

      <Stack.Screen
        name={assets.NavigationConstants.PRODUCT_DETAIL.NAME}
        component={Product_Detail}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name={assets.NavigationConstants.DASHBOARD_STACK.NAME}
        component={dashboard_stack}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name={assets.NavigationConstants.PAYMENT_METHOD.NAME}
        component={Payment_method}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name={assets.NavigationConstants.ABOUT_PRODUCT.NAME}
        component={About_Product}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name={assets.NavigationConstants.EDIT_ACCOUNT.NAME}
        component={Account_Edit}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name={assets.NavigationConstants.EDIT_DELIVERY_ADDRESS.NAME}
        component={Edit_deliveryAddrs}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name={assets.NavigationConstants.SEARCH_ADDRESS.NAME}
        component={SEarch_deliveryAddrs}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name={assets.NavigationConstants.FULL_DELIVERY_ADDRESS.NAME}
        component={Full_Addrs}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name={assets.NavigationConstants.CALENDER_VIEW.NAME}
        component={Calender_view}
        options={{
          headerShown: false,
          gestureEnabled: true,
          gestureDirection: "vertical",
          cardStyleInterpolator: CardStyleInterpolators.forBottomSheetAndroid,
        }}
      />

      <Stack.Screen
        name={assets.NavigationConstants.ORDER_DETAILS.NAME}
        component={orderDetails}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name={assets.NavigationConstants.PRODUCT_SEARCH.NAME}
        component={Products_search}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name={assets.NavigationConstants.HELP_CENTER.NAME}
        component={Need_Help}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={assets.NavigationConstants.HELP_CENTER.KEY}
        component={HelpWebView}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name={assets.NavigationConstants.ORDER_RECIEPT.NAME}
        component={View_order}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name={assets.NavigationConstants.CHATTING.NAME}
        component={Chatting}
      ></Stack.Screen>
      <Stack.Screen
        options={{ headerShown: false }}
        name={assets.NavigationConstants.LOCATION_PERMISSION.NAME}
        component={LocationPermission}
      ></Stack.Screen>
      <Stack.Screen
        options={{ headerShown: false }}
        name={assets.NavigationConstants.My_FAV_PRODUCTS.NAME}
        component={My_Favourite_Products}
      ></Stack.Screen>
      <Stack.Screen
        options={{ headerShown: false }}
        name={assets.NavigationConstants.CHANGE_STORE_LOCATION.NAME}
        component={ChangeStoreLocation}
      ></Stack.Screen>
    </Stack.Navigator>
  );
};
export default Root;
