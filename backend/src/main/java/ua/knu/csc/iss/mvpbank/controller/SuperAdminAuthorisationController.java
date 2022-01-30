package ua.knu.csc.iss.mvpbank.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import ua.knu.csc.iss.mvpbank.dto.request.SuperAdminEmailConfirmRequest;
import ua.knu.csc.iss.mvpbank.dto.request.SuperAdminLoginRequest;
import ua.knu.csc.iss.mvpbank.dto.request.SuperAdminRegistrationRequest;
import ua.knu.csc.iss.mvpbank.dto.response.JwtResponse;
import ua.knu.csc.iss.mvpbank.dto.response.SuperAdminInfoResponse;
import ua.knu.csc.iss.mvpbank.service.SuperAdminAuthorisationService;

@Slf4j
@RestController
@RequiredArgsConstructor
public class SuperAdminAuthorisationController {
  private final SuperAdminAuthorisationService superAdminAuthorisationService;

  @PostMapping("/super-admin/register")
  public JwtResponse register(@RequestBody SuperAdminRegistrationRequest request) {
    return superAdminAuthorisationService.register(request);
  }

  @PostMapping("/super-admin/login")
  public JwtResponse generateToken(@RequestBody SuperAdminLoginRequest request) {
    return superAdminAuthorisationService.generateToken(request);
  }

  @PostMapping("/super-admin/confirm-email")
  public void confirmEmail(@RequestBody SuperAdminEmailConfirmRequest request) {
    superAdminAuthorisationService.confirmEmail(request);
  }

  @GetMapping("/super-admin/get-current-super-admin")
  public SuperAdminInfoResponse getCurrentSuperAdmin() {
    return superAdminAuthorisationService.getCurrentSuperAdmin();
  }
}
