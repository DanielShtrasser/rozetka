import AsyncStorage from "@react-native-async-storage/async-storage";

// для автоавторизации

export const setUserPhoneToStorage = async (phone) => {
  try {
    await AsyncStorage.setItem("userPhone", phone);
  } catch (e) {
    console.log("setUserPhoneToStorage: ", e);
  }
};

export const getUserPhonefromStorage = async (key) => {
  try {
    return await AsyncStorage.getItem(key);
  } catch (e) {
    console.log("getUserPhonefromStorage error utils: ", e);
  }
};

export const removeValue = async (key) => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (e) {
    console.log("removeValue error: ", e);
  }
};

// для показа инструкции

export const setInstructionShownFlag = async () => {
  try {
    await AsyncStorage.setItem("bb", "bb");
  } catch (e) {
    console.log("setInstructionShownFlag: ", e);
  }
};

export const getInstructionShownFlagFromStorage = async () => {
  try {
    return await AsyncStorage.getItem("bb");
  } catch (e) {
    console.log("getInstructionShownFlagFromStorage error: ", e);
  }
};

// для определения языка

export const setStoreLanguageKey = async (language) => {
  try {
    return await AsyncStorage.setItem("settings.lang", language);
  } catch (error) {
    console.log("Error writing language", error);
  }
};

export const getStoreLanguageKey = async () => {
  try {
    return await AsyncStorage.getItem("settings.lang");
  } catch (error) {
    console.log("Error reading language", error);
  }
};
