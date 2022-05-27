package ua.knu.csc.iss.mvpbank.controller.admin;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;
import ua.knu.csc.iss.mvpbank.dto.request.admin.AdminLoginRequest;
import ua.knu.csc.iss.mvpbank.dto.response.admin.AdminAuthorisationStatusResponse;
import ua.knu.csc.iss.mvpbank.dto.response.JwtResponse;
import ua.knu.csc.iss.mvpbank.service.admin.AdminAuthorisationService;

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
