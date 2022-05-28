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
      requestSupport: "Запитати допомоги",
    },
    settings: {
      myCabinet: "Мій кабінет",
      logout: "Вихід",
    },
  },
  homeScreen: {
    aboutUs: {
      title: "Про нас",
    },
    login: {
      loginLabel: "Вхід",
      emailLabel: "Email",
      passwordLabel: "Пароль",
      submitLabel: "Увійти",
      errors: {
        required: "Обовязкове поле",
        invalidEmailAddress: "Email некоректно вказаний",
        invalidCredentials: "Неправильні данні для входу",
      },
      recommendSignUpPrefix: "Все ще не маєта акаунту? ",
      recommendSignUpLink: "Зареєструйтесь зараз!",
    },
  },
  registrationScreen: {
    registrationLabel: "Реєстрація",
    emailLabel: "Email",
    firstNameLabel: "Імʼя",
    lastNameLabel: "Фамілія",
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
    recommendLoginPrefix: "Вже маєте акаунт? ",
    recommendLoginLink: "Увійдіть зараз!",
  },
  registrationSuccessScreen: {
    title: "Будь ласка, підтвердьте електронну адресу",
    text: "Ви успішно зареєструвалися в нашій супер програмі MVP Bank. Будь ласка, підтвердьте свою електронну пошту, перейшовши за посиланням, яке ми вам надіслали",
    resendEmail: "Надіслати знову",
    emailSent: "Лист надіслано",
  },
  clientConfirmEmailScreen: {
    invalid:
      "Не вірне посилання для підтвердження вашої пошти, будь ласка, спробуйте ще раз",
  },
  requestSupportScreen: {
    screenTitle: "Запросити допомогу",
    title: "Тема",
    question: "Питання",
    send: "Надіслати",
    requestSent: "Запит надіслано, адміністратор зв'яжиться з вами поштою",
  },
};
