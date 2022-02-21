package ua.knu.csc.iss.mvpbank.locales;

public class EnLocale implements Locale {
    @Override
    public String confirmEmailTitle() {
        return "Mvp Bank welcome you!";
    }

    @Override
    public String confirmEmailText() {
        return """
        <h4>Welcome new user of our super bank ;)</h4>
        Please click thi link below to confirm your email:<br/>
        <a href="%s" target="_blank">Confirm email</a>
        """;
    }
}
