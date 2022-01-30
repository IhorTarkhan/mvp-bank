package ua.knu.csc.iss.mvpbank.security.filter;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ua.knu.csc.iss.mvpbank.repository.ClientRepository;
import ua.knu.csc.iss.mvpbank.security.JwtTokenProvider;

@Service
public class ClientSecurityFilter extends AbstractSecurityFilter {
  public ClientSecurityFilter(
      @Autowired ClientRepository clientRepository,
      @Autowired JwtTokenProvider jwtTokenProvider) {
    super(clientRepository, jwtTokenProvider);
  }
}
