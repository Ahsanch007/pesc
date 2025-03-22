import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import enJSON from "./assets/lang/en.json";
import hiJSON from "./assets/lang/hi.json";
import frJSON from "./assets/lang/fr.json";


i18n.use(initReactI18next).init({
  resources: {
    en: { ...enJSON },
    hi: { ...hiJSON },
    fr: { ...frJSON },
  },
  lng: "en",
});
