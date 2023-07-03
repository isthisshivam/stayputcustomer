import * as React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import assets from "../assets";
import Sign_in from "../screens/Login_Screen";
import Sign_Up from "../screens/Sign_Up";
import User_Type from "../screens/User_Type";
import TimeSchedule from "../screens/User_Type/components/schedule";
import Pass_forgot from "../screens/Forgot_Password";
import Email_otp from "../screens/Forgot_Otp";
import Pass_reset from "../screens/Reset_Password";
import WebLink from "../screens/Webview_Link";

const Stack = createStackNavigator();

const Auth_Stack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name={assets.NavigationConstants.LOG_IN.NAME}
        component={Sign_in}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={assets.NavigationConstants.SIGN_UP.NAME}
        component={Sign_Up}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={assets.NavigationConstants.USER_TYPE.NAME}
        component={User_Type}
      />
      <Stack.Screen
        name={assets.NavigationConstants.USER_TYPE.TIME_SCHEDULE}
        component={TimeSchedule}
      />
      <Stack.Screen
        name={assets.NavigationConstants.FORGOT_PASSWORD.NAME}
        component={Pass_forgot}
      />
      <Stack.Screen
        name={assets.NavigationConstants.FORGOT_PASSWORD_OTP.NAME}
        component={Email_otp}
      />
      <Stack.Screen
        name={assets.NavigationConstants.RESET_PASSWORD.NAME}
        component={Pass_reset}
      />
      <Stack.Screen
        name={assets.NavigationConstants.WEBVIEW.NAME}
        component={WebLink}
      />
    </Stack.Navigator>
  );
};
export default Auth_Stack;
