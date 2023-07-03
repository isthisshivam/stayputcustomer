import AsyncStorage from "@react-native-async-storage/async-storage";
export const ACCESS_TOKEN = "access_token";
export const LOGIN_KEY = "LOG_IN";
export const LOCATION_ID = "LOCATION_ID";
export const NAME = "name";
export const LASTNAME = "lastname";
export const EMAIL = "email";
export const PHONE = "phone";
export const USERID = "id";
export const FCM_TOKEN = "fcm_token";
export const DEVICE_ID = "device_id";
export const OS_TYPE = "os_type";
export const LOGIN_TYPE_TOKEN_KEY = "LoginTypeTokenKey";

export const setData = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, value);
    return true;
  } catch (error) {
    return false;
  }
};

export const getData = async (key) => {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value !== null) {
      return value;
    }
    return null;
  } catch (error) {
    return "";
  }
};

export const saveToken = async (value) => {
  try {
    await AsyncStorage.setItem(ACCESS_TOKEN, value);
    return true;
  } catch (error) {
    return false;
  }
};

export const clearToken = async () => saveToken(null);

export const getToken = async () => {
  try {
    const value = await AsyncStorage.getItem(ACCESS_TOKEN);
    if (value !== null) {
      return value;
    }
    return null;
  } catch (error) {
    return null;
  }
};

export const clearAsyncStorage = async () => {
  AsyncStorage.clear();
};
export const storeData2 = async (ID, value) => {
  try {
    await AsyncStorage.setItem(ID, value);
  } catch (e) {}
};
