package ua.knu.csc.iss.mvpbank.service.admin;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.stereotype.Service;
import ua.knu.csc.iss.mvpbank.dto.request.admin.AdminLoginRequest;
import ua.knu.csc.iss.mvpbank.dto.response.admin.AdminAuthorisationStatusResponse;
import ua.knu.csc.iss.mvpbank.dto.response.JwtResponse;
import ua.knu.csc.iss.mvpbank.entity.Admin;
import ua.knu.csc.iss.mvpbank.exceptions.NotFoundException;
import ua.knu.csc.iss.mvpbank.repository.AdminRepository;
import ua.knu.csc.iss.mvpbank.security.JwtTokenProvider;
import ua.knu.csc.iss.mvpbank.service.UserSecurityService;

@Slf4j
@Service
@RequiredArgsConstructor
public class AdminAuthorisationService {
  private final AuthenticationManager authenticationManager;
  private final JwtTokenProvider jwtTokenProvider;
  private final AdminRepository adminRepository;
  private final UserSecurityService userSecurityService;

  public JwtResponse generateToken(AdminLoginRequest request) {
    authenticationManager.authenticate(
        new UsernamePasswordAuthenticationToken(request.getUsername(), request.getPassword()));
    Admin admin =
        adminRepository
            .findByEmail(request.getUsername())
            .orElseThrow(() -> new NotFoundException("Admin doesn't exists"));
    return JwtResponse.builder()
        .authorization(jwtTokenProvider.generateToken(admin.getId().toString()))
        .build();
  }

  public AdminAuthorisationStatusResponse getCurrentAdmin() {
    Admin currentAdmin = userSecurityService.getCurrentAdmin();
    return AdminAuthorisationStatusResponse.builder()
        .id(currentAdmin.getId())
        .email(currentAdmin.getEmail())
        .roles(currentAdmin.getRoles())
        .build();
  }
}
