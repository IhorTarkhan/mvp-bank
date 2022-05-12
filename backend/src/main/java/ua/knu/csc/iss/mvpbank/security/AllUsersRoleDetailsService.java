package ua.knu.csc.iss.mvpbank.security;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Service;
import ua.knu.csc.iss.mvpbank.exceptions.NotFoundException;
import ua.knu.csc.iss.mvpbank.repository.AdminRepository;
import ua.knu.csc.iss.mvpbank.repository.ClientRepository;

import java.util.Optional;

@Slf4j
@Service
@RequiredArgsConstructor
public class AllUsersRoleDetailsService implements UserDetailsService {
  private final ClientRepository clientRepository;
  private final AdminRepository adminRepository;

  @Override
  public UserDetails loadUserByUsername(String username) {
    Optional<? extends UserDetails> client = clientRepository.findByEmail(username);
    if (client.isPresent()) {
      return client.get();
    }
    Optional<? extends UserDetails> admin = adminRepository.findByEmail(username);
    if (admin.isPresent()) {
      return admin.get();
    }
    // TODO on add new role - find in one more repository
    throw new NotFoundException("No user with email " + username);
  }
}
