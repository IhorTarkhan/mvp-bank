import { Language } from "../../../i18n/i18n";

export type ClientRegistrationRequest = {
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  language: Language;
};
