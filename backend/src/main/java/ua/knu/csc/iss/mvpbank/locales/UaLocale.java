package ua.knu.csc.iss.mvpbank.locales;

public class UaLocale implements Locale {
    @Override
    public String confirmEmailTitle() {
        return "Mvp Bank вітає вас!";
    }

    @Override
    public String confirmEmailText() {
        return """
        <h4>Вітаємо нового користувача нашого супербанку ;)</h4>
        Натисніть це посилання нижче, щоб підтвердити свою електронну адресу:<br/>
        <a href="%s" target="_blank">Підтвердити електронну адресу</a>
        """;
    }
}
