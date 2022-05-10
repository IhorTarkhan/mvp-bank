package ua.knu.csc.iss.mvpbank.locales;

public interface Locale {
  Locale en = new EnLocale();
  Locale ua = new UaLocale();


  static Locale getInstance(Language language){
    return switch (language) {
      case EN -> en;
      case UA -> ua;
    };
  }
  String confirmEmailTitle();

  String confirmEmailText();
}
