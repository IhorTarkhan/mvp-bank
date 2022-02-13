package ua.knu.csc.iss.mvpbank.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import ua.knu.csc.iss.mvpbank.property.ApplicationProperty;

@Slf4j
@Service
@RequiredArgsConstructor
public class ClientEmailService {
  private final ApplicationProperty applicationProperty;
  private final SendEmailService sendEmailService;

  public void sendConfirmEmail(String email, String token) {
    sendEmailService.sendTextEmailHtml(
        email,
        // TODO i18n this text
        "Mvp Bank welcome you!",
        """
        <h4>Welcome new user of our super bank ;)</h4>
        Please click thi link below to confirm your email:<br/>
        <a href="%s" target="_blank">Confirm email</a>
        """.formatted(applicationProperty.getFrontendUrl() + "/client-confirm-email/" + token)
    );
  }
}
