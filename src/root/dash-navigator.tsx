import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import User_Type from "../screens/User_Type";
import Add_Payment from "../screens/add_Payment";
import Payment_method from "../screens/Payment_method";

import assets from "../assets";
const stack = createStackNavigator();
export default () => {
  return (
    <stack.Navigator
      initialRouteName={assets.NavigationConstants.ADD_PAYMENT.NAME}
      screenOptions={{ headerShown: false }}
    >
      <stack.Screen
        name={assets.NavigationConstants.ADD_PAYMENT.NAME}
        component={Add_Payment}
        options={{ headerShown: false }}
      />

      <stack.Screen
        name={assets.NavigationConstants.PAYMENT_METHOD.NAME}
        component={Payment_method}
        options={{ headerShown: false }}
      />
    </stack.Navigator>
  );
};
