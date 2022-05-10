package ua.knu.csc.iss.mvpbank.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.stereotype.Service;
import ua.knu.csc.iss.mvpbank.dto.request.SuperAdminLoginRequest;
import ua.knu.csc.iss.mvpbank.dto.response.JwtResponse;
import ua.knu.csc.iss.mvpbank.dto.response.SuperAdminAuthorisationStatusResponse;
import ua.knu.csc.iss.mvpbank.entity.SuperAdmin;
import ua.knu.csc.iss.mvpbank.exceptions.NotFoundException;
import ua.knu.csc.iss.mvpbank.repository.SuperAdminRepository;
import ua.knu.csc.iss.mvpbank.security.JwtTokenProvider;

@Slf4j
@Service
@RequiredArgsConstructor
public class SuperAdminAuthorisationService {
  private final AuthenticationManager authenticationManager;
  private final JwtTokenProvider jwtTokenProvider;
  private final SuperAdminRepository superAdminRepository;
  private final UserSecurityService userSecurityService;

  public JwtResponse generateToken(SuperAdminLoginRequest request) {
    authenticationManager.authenticate(
        new UsernamePasswordAuthenticationToken(request.getUsername(), request.getPassword()));
    SuperAdmin superAdmin =
        superAdminRepository
            .findByEmail(request.getUsername())
            .orElseThrow(() -> new NotFoundException("Super Admin doesn't exists"));
    return JwtResponse.builder()
        .authorization(jwtTokenProvider.generateToken(superAdmin.getId().toString()))
        .build();
  }

  public SuperAdminAuthorisationStatusResponse getCurrentSuperAdmin() {
    SuperAdmin currentSuperAdmin = userSecurityService.getCurrentSuperAdmin();
    return SuperAdminAuthorisationStatusResponse.builder()
        .email(currentSuperAdmin.getEmail())
        .build();
  }
}
