import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import { languageDetectorPlugin } from "../utils/languageDetectorPlugin";

import en from "../../locales/en.json";
import ru from "../../locales/ru.json";
import zh from "../../locales/zh.json";
import ky from "../../locales/ky.json";
import kk from "../../locales/kk.json";
import ko from "../../locales/ko.json";

export const languageResources = {
  ru: { translation: ru },
  en: { translation: en },
  zh: { translation: zh },
  ky: { translation: ky },
  kk: { translation: kk },
  ko: { translation: ko },
};

i18next.use(initReactI18next).use(languageDetectorPlugin).init({
  compatibilityJSON: "v3",
  fallbackLng: "ru",
  resources: languageResources,
});

export default i18next;
