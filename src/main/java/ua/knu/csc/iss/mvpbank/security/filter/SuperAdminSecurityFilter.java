package ua.knu.csc.iss.mvpbank.security.filter;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import ua.knu.csc.iss.mvpbank.repository.SuperAdminRepository;
import ua.knu.csc.iss.mvpbank.security.JwtTokenProvider;

@Component
public class SuperAdminSecurityFilter extends AbstractSecurityFilter {
  public SuperAdminSecurityFilter(
      @Autowired SuperAdminRepository superAdminRepository,
      @Autowired JwtTokenProvider jwtTokenProvider) {
    super(superAdminRepository, jwtTokenProvider);
  }
}
