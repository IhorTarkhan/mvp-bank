package ua.knu.csc.iss.mvpbank.controller.client;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;
import ua.knu.csc.iss.mvpbank.dto.request.client.ClientEmailConfirmRequest;
import ua.knu.csc.iss.mvpbank.dto.request.client.ClientLoginRequest;
import ua.knu.csc.iss.mvpbank.dto.request.client.ClientRegistrationRequest;
import ua.knu.csc.iss.mvpbank.dto.request.client.ClientResendConfirmEmailRequest;
import ua.knu.csc.iss.mvpbank.dto.response.client.ClientAuthorisationStatusResponse;
import ua.knu.csc.iss.mvpbank.dto.response.JwtResponse;
import ua.knu.csc.iss.mvpbank.service.client.ClientAuthorisationService;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping(path = "/client")
public class ClientAuthorisationController {
  private final ClientAuthorisationService clientAuthorisationService;

  @PostMapping("/register")
  public JwtResponse register(@RequestBody ClientRegistrationRequest request) {
    return clientAuthorisationService.register(request);
  }

  @PostMapping("/login")
  public JwtResponse generateToken(@RequestBody ClientLoginRequest request) {
    return clientAuthorisationService.generateToken(request);
  }

  @PostMapping("/confirm-email")
  public void confirmEmail(@RequestBody ClientEmailConfirmRequest request) {
    clientAuthorisationService.confirmEmail(request);
  }

  @PostMapping("/resend-email")
  public void resendConfirmEmail(@RequestBody ClientResendConfirmEmailRequest request) {
    clientAuthorisationService.resendConfirmEmail(request);
  }

  @GetMapping("/authorisation-status")
  public ClientAuthorisationStatusResponse getCurrentClient() {
    return clientAuthorisationService.getCurrentClient();
  }
}
