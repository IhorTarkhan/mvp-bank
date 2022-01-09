package ua.knu.csc.iss.mvpbank.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import ua.knu.csc.iss.mvpbank.dto.request.CustomerEmailConfirmRequest;
import ua.knu.csc.iss.mvpbank.dto.request.CustomerLoginRequest;
import ua.knu.csc.iss.mvpbank.dto.request.CustomerRegistrationRequest;
import ua.knu.csc.iss.mvpbank.dto.response.CustomerInfoResponse;
import ua.knu.csc.iss.mvpbank.dto.response.JwtResponse;
import ua.knu.csc.iss.mvpbank.service.CustomerAuthorisationService;

@Slf4j
@RestController
@RequiredArgsConstructor
public class CustomerAuthorisationController {
  private final CustomerAuthorisationService customerAuthorisationService;

  @PostMapping("/customer/register")
  public JwtResponse register(@RequestBody CustomerRegistrationRequest request) {
    return customerAuthorisationService.register(request);
  }

  @PostMapping("/customer/login")
  public JwtResponse generateToken(@RequestBody CustomerLoginRequest request) {
    return customerAuthorisationService.generateToken(request);
  }

  @PostMapping("/customer/confirm-email")
  public void confirmEmail(@RequestBody CustomerEmailConfirmRequest request) {
    customerAuthorisationService.confirmEmail(request);
  }

  @GetMapping("/customer/get-current-customer")
  public CustomerInfoResponse getCurrentCustomer() {
    return customerAuthorisationService.getCurrentCustomer();
  }
}
