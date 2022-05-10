package ua.knu.csc.iss.mvpbank.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import ua.knu.csc.iss.mvpbank.locales.Language;
import ua.knu.csc.iss.mvpbank.locales.Locale;
import ua.knu.csc.iss.mvpbank.property.ApplicationProperty;

@Slf4j
@Service
@RequiredArgsConstructor
public class ClientEmailService {
  private final ApplicationProperty applicationProperty;
  private final EmailService emailService;

  public void sendConfirmEmail(Language language, String email, String token) {
    Locale locale = Locale.getInstance(language);
    String confirmLink = applicationProperty.getFrontendUrl() + "/client-confirm-email/" + token;
    emailService.sendTextEmailHtml(
        email, locale.confirmEmailTitle(), locale.confirmEmailText().formatted(confirmLink));
  }
}
