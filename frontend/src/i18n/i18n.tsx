import { useEffect, useState } from "react";
import { en } from "./locale/en";
import { useCookies } from "react-cookie";
import { LOCALE_COOKIE } from "../constant/cookie";
import { ua } from "./locale/ua";

export enum Language {
  EN = "EN",
  UA = "UA",
}

export const useLocale = (): [typeof en, (language: Language) => void] => {
  const YEAR_IN_MS = 31_536_000_000;
  const [cookie, setCookie] = useCookies([LOCALE_COOKIE]);
  const [language, setLanguage] = useState<Language>(Language.EN);
  const [locale, setLocale] = useState<typeof en>(en);

  const setLocaleToCookie = (language: Language) => {
    const currentDate = new Date();
    setCookie(LOCALE_COOKIE, language, {
      path: "/",
      expires: new Date(currentDate.getTime() + YEAR_IN_MS),
    });
  };

  useEffect(() => {
    if (Object.keys(Language).indexOf(cookie[LOCALE_COOKIE]) !== -1) {
      setLanguage(cookie[LOCALE_COOKIE]);
    } else {
      const currentDate = new Date();
      setCookie(LOCALE_COOKIE, Language.EN, {
        path: "/",
        expires: new Date(currentDate.getTime() + YEAR_IN_MS),
      });
    }
  }, [cookie, setCookie]);

  useEffect(() => {
    if (!language) {
      return;
    }
    switch (language) {
      case Language.EN:
        setLocale(en);
        break;
      case Language.UA:
        setLocale(ua);
        break;
    }
  }, [language]);

  return [locale, setLocaleToCookie];
};
