package ua.knu.csc.iss.mvpbank.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import ua.knu.csc.iss.mvpbank.dto.request.ClientEmailConfirmRequest;
import ua.knu.csc.iss.mvpbank.dto.request.ClientLoginRequest;
import ua.knu.csc.iss.mvpbank.dto.request.ClientRegistrationRequest;
import ua.knu.csc.iss.mvpbank.dto.response.ClientAuthorisationStatusResponse;
import ua.knu.csc.iss.mvpbank.dto.response.JwtResponse;
import ua.knu.csc.iss.mvpbank.service.ClientAuthorisationService;

@Slf4j
@RestController
@RequiredArgsConstructor
public class ClientAuthorisationController {
  private final ClientAuthorisationService clientAuthorisationService;

  @PostMapping("/client/register")
  public JwtResponse register(@RequestBody ClientRegistrationRequest request) {
    return clientAuthorisationService.register(request);
  }

  @PostMapping("/client/login")
  public JwtResponse generateToken(@RequestBody ClientLoginRequest request) {
    return clientAuthorisationService.generateToken(request);
  }

  @PostMapping("/client/confirm-email")
  public void confirmEmail(@RequestBody ClientEmailConfirmRequest request) {
    clientAuthorisationService.confirmEmail(request);
  }

  @GetMapping("/client/authorisation-status")
  public ClientAuthorisationStatusResponse getCurrentClient() {
    return clientAuthorisationService.getCurrentClient();
  }
}
