package ua.knu.csc.iss.mvpbank.security.filter;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import ua.knu.csc.iss.mvpbank.repository.AdminRepository;
import ua.knu.csc.iss.mvpbank.security.JwtTokenProvider;

@Component
public class AdminSecurityFilter extends AbstractSecurityFilter {
  public AdminSecurityFilter(
      @Autowired AdminRepository adminRepository,
      @Autowired JwtTokenProvider jwtTokenProvider) {
    super(adminRepository, jwtTokenProvider);
  }
}
