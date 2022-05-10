package ua.knu.csc.iss.mvpbank.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;
import ua.knu.csc.iss.mvpbank.dto.request.SuperAdminLoginRequest;
import ua.knu.csc.iss.mvpbank.dto.response.JwtResponse;
import ua.knu.csc.iss.mvpbank.dto.response.SuperAdminAuthorisationStatusResponse;
import ua.knu.csc.iss.mvpbank.service.SuperAdminAuthorisationService;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping(path = "/super-admin")
public class SuperAdminAuthorisationController {
  private final SuperAdminAuthorisationService superAdminAuthorisationService;

  @PostMapping("/login")
  public JwtResponse generateToken(@RequestBody SuperAdminLoginRequest request) {
    return superAdminAuthorisationService.generateToken(request);
  }

  @GetMapping("/authorisation-status")
  public SuperAdminAuthorisationStatusResponse getCurrentSuperAdmin() {
    return superAdminAuthorisationService.getCurrentSuperAdmin();
  }
}
