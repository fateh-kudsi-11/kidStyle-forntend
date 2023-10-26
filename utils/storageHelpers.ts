import AsyncStorage from "@react-native-async-storage/async-storage";
import { KEY_NAME } from "./constants";

export const saveTokenToStorage = async (token: string) => {
  try {
    await AsyncStorage.setItem(KEY_NAME, token);
    console.log("Token saved to AsyncStorage.");
  } catch (error) {
    console.error("Error saving token to AsyncStorage:", error);
  }
};

export const retrieveTokenFromStorage = async () => {
  try {
    const token = await AsyncStorage.getItem(KEY_NAME);

    if (token !== null) {
      return token;
    } else {
      return null;
    }
  } catch (error) {
    return null;
  }
};

export const clearTokenFromStorage = async () => {
  try {
    await AsyncStorage.removeItem(KEY_NAME);
    console.log("Token cleared from AsyncStorage.");
  } catch (error) {
    console.error("Error clearing token from AsyncStorage:", error);
  }
};
