package ua.knu.csc.iss.mvpbank.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;
import ua.knu.csc.iss.mvpbank.dto.request.AdminLoginRequest;
import ua.knu.csc.iss.mvpbank.dto.response.JwtResponse;
import ua.knu.csc.iss.mvpbank.dto.response.AdminAuthorisationStatusResponse;
import ua.knu.csc.iss.mvpbank.service.AdminAuthorisationService;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping(path = "/admin")
public class AdminAuthorisationController {
  private final AdminAuthorisationService adminAuthorisationService;

  @PostMapping("/login")
  public JwtResponse generateToken(@RequestBody AdminLoginRequest request) {
    return adminAuthorisationService.generateToken(request);
  }

  @GetMapping("/authorisation-status")
  public AdminAuthorisationStatusResponse getCurrentAdmin() {
    return adminAuthorisationService.getCurrentAdmin();
  }
}
