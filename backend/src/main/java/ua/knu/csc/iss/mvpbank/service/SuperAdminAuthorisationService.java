package ua.knu.csc.iss.mvpbank.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import ua.knu.csc.iss.mvpbank.dto.request.SuperAdminEmailConfirmRequest;
import ua.knu.csc.iss.mvpbank.dto.request.SuperAdminLoginRequest;
import ua.knu.csc.iss.mvpbank.dto.request.SuperAdminRegistrationRequest;
import ua.knu.csc.iss.mvpbank.dto.response.JwtResponse;
import ua.knu.csc.iss.mvpbank.dto.response.SuperAdminAuthorisationStatusResponse;
import ua.knu.csc.iss.mvpbank.entity.SuperAdmin;
import ua.knu.csc.iss.mvpbank.entity.SuperAdminOneTimeAccessToken;
import ua.knu.csc.iss.mvpbank.exceptions.ConflictException;
import ua.knu.csc.iss.mvpbank.exceptions.NotFoundException;
import ua.knu.csc.iss.mvpbank.repository.SuperAdminRepository;
import ua.knu.csc.iss.mvpbank.security.JwtTokenProvider;

@Slf4j
@Service
@RequiredArgsConstructor
public class SuperAdminAuthorisationService {
  private final AuthenticationManager authenticationManager;
  private final JwtTokenProvider jwtTokenProvider;
  private final PasswordEncoder passwordEncoder;
  private final SuperAdminRepository superAdminRepository;
  private final UserSecurityService userSecurityService;
  private final SuperAdminOneTimeAccessTokenService superAdminOneTimeAccessTokenService;
  private final EmailService emailService;

  public JwtResponse register(SuperAdminRegistrationRequest request) {
    if (superAdminRepository.findByEmail(request.getUsername()).isPresent())
      throw new ConflictException("Super Admin with such email already exist");
    SuperAdmin newSuperAdmin =
        SuperAdmin.builder()
            .email(request.getUsername())
            .password(passwordEncoder.encode(request.getPassword()))
            .emailVerified(false)
            .build();
    SuperAdmin savedSuperAdmin = superAdminRepository.save(newSuperAdmin);
    SuperAdminOneTimeAccessToken superAdminOneTimeAccessToken =
        superAdminOneTimeAccessTokenService.generateVerifyEmailToken(savedSuperAdmin);
    emailService.sendConfirmEmail(superAdminOneTimeAccessToken.getToken());
    return JwtResponse.builder()
        .authorization(jwtTokenProvider.generateToken(savedSuperAdmin.getId().toString()))
        .build();
  }

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

  public void confirmEmail(SuperAdminEmailConfirmRequest request) {
    SuperAdminOneTimeAccessToken oneTimeAccessToken =
        superAdminOneTimeAccessTokenService.findOneTimeAccessToken(request.getToken());
    superAdminOneTimeAccessTokenService.checkIfValid(oneTimeAccessToken);
    SuperAdmin currentSuperAdmin = oneTimeAccessToken.getSuperAdmin();
    currentSuperAdmin.setEmailVerified(true);
    superAdminRepository.save(currentSuperAdmin);
  }

  public SuperAdminAuthorisationStatusResponse getCurrentSuperAdmin() {
    SuperAdmin currentSuperAdmin = userSecurityService.getCurrentSuperAdmin();
    return SuperAdminAuthorisationStatusResponse.builder()
        .email(currentSuperAdmin.getEmail())
        .emailVerified(currentSuperAdmin.isEmailVerified())
        .build();
  }
}
