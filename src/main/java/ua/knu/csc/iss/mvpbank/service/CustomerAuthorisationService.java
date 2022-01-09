package ua.knu.csc.iss.mvpbank.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import ua.knu.csc.iss.mvpbank.dto.request.CustomerEmailConfirmRequest;
import ua.knu.csc.iss.mvpbank.dto.request.CustomerLoginRequest;
import ua.knu.csc.iss.mvpbank.dto.request.CustomerRegistrationRequest;
import ua.knu.csc.iss.mvpbank.dto.response.CustomerInfoResponse;
import ua.knu.csc.iss.mvpbank.dto.response.JwtResponse;
import ua.knu.csc.iss.mvpbank.entity.Customer;
import ua.knu.csc.iss.mvpbank.entity.CustomerOneTimeAccessToken;
import ua.knu.csc.iss.mvpbank.exceptions.ConflictException;
import ua.knu.csc.iss.mvpbank.exceptions.NotFoundException;
import ua.knu.csc.iss.mvpbank.repository.CustomerRepository;
import ua.knu.csc.iss.mvpbank.security.JwtTokenProvider;

@Slf4j
@Service
@RequiredArgsConstructor
public class CustomerAuthorisationService {
  private final AuthenticationManager authenticationManager;
  private final JwtTokenProvider jwtTokenProvider;
  private final PasswordEncoder passwordEncoder;
  private final CustomerRepository customerRepository;
  private final UserSecurityService userSecurityService;
  private final CustomerOneTimeAccessTokenService customerOneTimeAccessTokenService;
  private final EmailService emailService;

  public JwtResponse register(CustomerRegistrationRequest request) {
    if (customerRepository.findByEmail(request.getUsername()).isPresent())
      throw new ConflictException("Customer with such email already exist");
    Customer newCustomer =
        Customer.builder()
            .email(request.getUsername())
            .password(passwordEncoder.encode(request.getPassword()))
            .emailVerified(false)
            .build();
    Customer savedCustomer = customerRepository.save(newCustomer);
    CustomerOneTimeAccessToken customerOneTimeAccessToken =
        customerOneTimeAccessTokenService.generateVerifyEmailToken(savedCustomer);
    emailService.sendConfirmEmail(customerOneTimeAccessToken.getToken());
    return JwtResponse.builder()
        .authorization("Bearer " + jwtTokenProvider.generateToken(savedCustomer.getId().toString()))
        .build();
  }

  public JwtResponse generateToken(CustomerLoginRequest request) {
    authenticationManager.authenticate(
        new UsernamePasswordAuthenticationToken(request.getUsername(), request.getPassword()));
    Customer customer =
        customerRepository
            .findByEmail(request.getUsername())
            .orElseThrow(() -> new NotFoundException("Customer doesn't exists"));
    return JwtResponse.builder()
        .authorization("Bearer " + jwtTokenProvider.generateToken(customer.getId().toString()))
        .build();
  }

  public void confirmEmail(CustomerEmailConfirmRequest request) {
    CustomerOneTimeAccessToken oneTimeAccessToken =
        customerOneTimeAccessTokenService.findOneTimeAccessToken(request.getToken());
    customerOneTimeAccessTokenService.checkIfValid(oneTimeAccessToken);
    Customer currentCustomer = oneTimeAccessToken.getCustomer();
    currentCustomer.setEmailVerified(true);
    customerRepository.save(currentCustomer);
  }

  public CustomerInfoResponse getCurrentCustomer() {
    Customer currentCustomer = userSecurityService.getCurrentCustomer();
    return CustomerInfoResponse.builder()
        .email(currentCustomer.getEmail())
        .emailVerified(currentCustomer.isEmailVerified())
        .build();
  }
}
