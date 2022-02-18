import { en } from "./en";

export const ua: typeof en = {
  header: {
    language: {
      languageLabel: "Мова",
      english: "Англійська",
      ukrainian: "Українська",
    },
    pages: {
      about: "Про нас",
    },
    settings: {
      myCabinet: "Мій кабінет",
      logout: "Вихід",
    },
  },
  registrationScreen: {
    registrationLabel: "Реєстрація",
    emailLabel: "Email",
    passwordLabel: "Пароль",
    confirmPasswordLabel: "Підтвердити пароль",
    submitLabel: "Підтвердити реєстрацію",
    errors: {
      required: "Обовязкове поле",
      invalidEmailAddress: "Email некоректно вказаний",
      chooseLongerPassword: "Виберіть довший пароль, щонайменше 8 символів",
      passwordsNotMatch: "Паролі не співпадають",
      duplicatingEmail: "Користувач з таким Email вже існує!",
    },
  },
  loginScreen: {
    loginLabel: "Вхід",
    emailLabel: "Email",
    passwordLabel: "Пароль",
    submitLabel: "Ввійти",
    errors: {
      required: "Обовязкове поле",
      invalidEmailAddress: "Email некоректно вказаний",
      invalidCredentials: "Неправильні данні для входу",
    },
  },
  registrationSuccessScreen: {
    title: "Будь ласка, підтвердьте електронну адресу",
    text: "Ви успішно зареєструвалися в нашій супер програмі MVP Bank. Будь ласка, підтвердьте свою електронну пошту, перейшовши за посиланням, яке ми вам надіслали",
    resendEmail: "Надіслати знову",
  },
  aboutUsScreen: {
    title: "Про нас",
  },
};
