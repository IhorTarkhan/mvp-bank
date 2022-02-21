import { Language } from "../../i18n/i18n";

export type ClientRegistrationRequest = {
  username: string;
  password: string;
  language: Language;
};
