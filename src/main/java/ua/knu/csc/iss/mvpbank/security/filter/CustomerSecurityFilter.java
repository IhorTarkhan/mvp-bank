package ua.knu.csc.iss.mvpbank.security.filter;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ua.knu.csc.iss.mvpbank.repository.CustomerRepository;
import ua.knu.csc.iss.mvpbank.security.JwtTokenProvider;

@Service
public class CustomerSecurityFilter extends AbstractSecurityFilter {
  public CustomerSecurityFilter(
      @Autowired CustomerRepository customerRepository,
      @Autowired JwtTokenProvider jwtTokenProvider) {
    super(customerRepository, jwtTokenProvider);
  }
}
