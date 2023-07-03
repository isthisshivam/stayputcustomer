import { LogBox } from "react-native";
import React, { useEffect, useRef } from "react";
import Root from "./src/root";
import { NavigationContainer } from "@react-navigation/native";
import { Provider } from "react-redux";
import store from "./src/redux/store";
import crashlytics from "@react-native-firebase/crashlytics";
import BranchIoAnalytics from "./src/utils/branchIOAnalytics";
import firebase from "@react-native-firebase/app";
import Geocoder from "react-native-geocoding";
import auth from "@react-native-firebase/auth";
import { Secrets } from "./src/assets/Secrets";

LogBox.ignoreLogs([
  "[react-native-gesture-handler] Seems like you're using an old API with gesture components, check out new Gestures system!",
]);

global.UserId = null;
global.fullAddressRoute = false;
global.deliveryAuthStack = false;

const App = () => {
  const logCrash = async (user) => {
    crashlytics().crash();
  };
  //Firebase Init
  useEffect(() => {
    //logCrash();
    if (!firebase.apps.length) {
      const firebaseConfig = {
        apiKey: Secrets.FIR_APIKEY,
        authDomain: Secrets.FIRE_AUTH_DOMAIN,
        databaseURL: Secrets.FIR_DB_URL,
        projectId: Secrets.FIR_PROJECT_ID,
        storageBucket: Secrets.FIR_STORAGE,
        messagingSenderId: Secrets.FIR_MESSENGER,
        appId: Secrets.FIR_APPID,
        measurementId: Secrets.FIR_MEAS_ID,
      };
      firebase.initalizing(firebaseConfig);
    }
    Geocoder.init(Secrets.GOOGLE_MAPS.MAP_KEY);

    signInAnonymously();
  }, []);
  useEffect(() => {
    intiBranchIo();
  }, []);
  const signInAnonymously = async () => {
    try {
      await auth().signInAnonymously();
    } catch (e) {
      console.error(e);
    }
  };

  const intiBranchIo = async () => {
    try {
      let branchObj = await BranchIoAnalytics.isInstance().init();
      global.branchIo = branchObj;
    } catch (e) {
      console.log("error==>", e);
    }
  };

  return (
    <Provider store={store}>
      <NavigationContainer>
        <Root />
      </NavigationContainer>
    </Provider>
  );
};
export default App;
