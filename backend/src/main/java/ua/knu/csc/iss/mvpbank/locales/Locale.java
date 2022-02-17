package ua.knu.csc.iss.mvpbank.locales;

public interface Locale {

  static Locale getInstance(Language language){
    return switch (language) {
      case EN -> new EnLocale();
      case UA -> new UaLocale();
    };
  }
  String confirmEmailTitle();

  String confirmEmailText();
}
