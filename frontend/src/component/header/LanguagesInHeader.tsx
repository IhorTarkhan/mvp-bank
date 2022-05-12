import * as React from "react";
import { ReactElement } from "react";
import { Language, useLocale } from "../../i18n/i18n";
import { AriaWithPopupMenu } from "../AriaWithPopupMenu";

export const LanguagesInHeader = (): ReactElement => {
  const [locale, setLanguage] = useLocale();

  const languages = [
    {
      name: locale.header.language.english,
      onClick: () => setLanguage(Language.EN),
    },
    {
      name: locale.header.language.ukrainian,
      onClick: () => setLanguage(Language.UA),
    },
  ];

  return (
    <AriaWithPopupMenu fields={languages}>
      <>{locale.header.language.languageLabel}</>
    </AriaWithPopupMenu>
  );
};
