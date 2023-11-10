import * as Localization from "expo-localization";

import {
  setStoreLanguageKey,
  getStoreLanguageKey,
} from "../utils/asyncStorage";

const languageDetectorPlugin = {
  type: "languageDetector",
  async: true,
  init: () => {},
  detect: async function (callback) {
    try {
      await getStoreLanguageKey().then((language) => {
        if (language) {
          return callback(language);
        } else {
          return callback(Localization.locale);
        }
      });
    } catch (error) {
      console.log("Error reading language", error);
    }
  },
  cacheUserLanguage: async function (language) {
    try {
      await setStoreLanguageKey(language);
    } catch (error) {}
  },
};

module.exports = { languageDetectorPlugin };
