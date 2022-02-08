import { en } from "./en";

export const ua: typeof en = {
  registrationScreen: {
    registrationLabel: "Регестрація",
    emailLabel: "Email",
    passwordLabel: "Пароль",
    confirmPasswordLabel: "Підтвердити пароль",
    submitLabel: "Підтвердити реєстрауію",
    errors: {
      required: "Обовязкове поле",
      invalidEmailAddress: "Email некоректно вказаний",
      chooseLongerPassword: "Виберіть довший пароль, щонайменьше 8 символів",
      passwordsNotMatch: "Паролі не співпадають",
      duplicatingEmail: "Користувач з таким Email вже існує!",
    },
  },
};
