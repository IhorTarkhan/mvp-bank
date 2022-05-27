package ua.knu.csc.iss.mvpbank.service.client;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import ua.knu.csc.iss.mvpbank.dto.request.client.ClientEmailConfirmRequest;
import ua.knu.csc.iss.mvpbank.dto.request.client.ClientLoginRequest;
import ua.knu.csc.iss.mvpbank.dto.request.client.ClientRegistrationRequest;
import ua.knu.csc.iss.mvpbank.dto.request.client.ClientResendConfirmEmailRequest;
import ua.knu.csc.iss.mvpbank.dto.response.client.ClientAuthorisationStatusResponse;
import ua.knu.csc.iss.mvpbank.dto.response.JwtResponse;
import ua.knu.csc.iss.mvpbank.entity.Client;
import ua.knu.csc.iss.mvpbank.entity.ClientOneTimeAccessToken;
import ua.knu.csc.iss.mvpbank.exceptions.ConflictException;
import ua.knu.csc.iss.mvpbank.exceptions.NotFoundException;
import ua.knu.csc.iss.mvpbank.repository.ClientRepository;
import ua.knu.csc.iss.mvpbank.security.JwtTokenProvider;
import ua.knu.csc.iss.mvpbank.service.UserSecurityService;
import ua.knu.csc.iss.mvpbank.service.client.ClientEmailService;
import ua.knu.csc.iss.mvpbank.service.client.ClientOneTimeAccessTokenService;

@Slf4j
@Service
@RequiredArgsConstructor
public class ClientAuthorisationService {
  private final AuthenticationManager authenticationManager;
  private final JwtTokenProvider jwtTokenProvider;
  private final PasswordEncoder passwordEncoder;
  private final ClientRepository clientRepository;
  private final UserSecurityService userSecurityService;
  private final ClientOneTimeAccessTokenService clientOneTimeAccessTokenService;
  private final ClientEmailService clientEmailService;

  public JwtResponse register(ClientRegistrationRequest request) {
    if (clientRepository.findByEmail(request.getUsername()).isPresent())
      throw new ConflictException("Client with such email already exist");
    Client newClient =
        Client.builder()
            .email(request.getUsername())
            .password(passwordEncoder.encode(request.getPassword()))
            .emailVerified(false)
            .build();
    Client savedClient = clientRepository.save(newClient);
    ClientOneTimeAccessToken clientOneTimeAccessToken =
        clientOneTimeAccessTokenService.generateVerifyEmailToken(savedClient);
    clientEmailService.sendConfirmEmail(
        request.getLanguage(), savedClient.getEmail(), clientOneTimeAccessToken.getToken());
    return JwtResponse.builder()
        .authorization(jwtTokenProvider.generateToken(savedClient.getId().toString()))
        .build();
  }

  public JwtResponse generateToken(ClientLoginRequest request) {
    authenticationManager.authenticate(
        new UsernamePasswordAuthenticationToken(request.getUsername(), request.getPassword()));
    Client client =
        clientRepository
            .findByEmail(request.getUsername())
            .orElseThrow(() -> new NotFoundException("Client doesn't exists"));
    return JwtResponse.builder()
        .authorization(jwtTokenProvider.generateToken(client.getId().toString()))
        .build();
  }

  public void confirmEmail(ClientEmailConfirmRequest request) {
    ClientOneTimeAccessToken oneTimeAccessToken =
        clientOneTimeAccessTokenService.findOneTimeAccessToken(request.getToken());
    Client currentClient = oneTimeAccessToken.getClient();
    currentClient.setEmailVerified(true);
    clientRepository.save(currentClient);
  }

  public void resendConfirmEmail(ClientResendConfirmEmailRequest request) {
    Client currentClient = userSecurityService.getCurrentClient();
    ClientOneTimeAccessToken clientOneTimeAccessToken =
        clientOneTimeAccessTokenService.generateVerifyEmailToken(currentClient);
    clientEmailService.sendConfirmEmail(
        request.getLanguage(), currentClient.getEmail(), clientOneTimeAccessToken.getToken());
  }

  public ClientAuthorisationStatusResponse getCurrentClient() {
    Client currentClient = userSecurityService.getCurrentClient();
    return ClientAuthorisationStatusResponse.builder()
        .email(currentClient.getEmail())
        .emailVerified(currentClient.isEmailVerified())
        .build();
  }
}
