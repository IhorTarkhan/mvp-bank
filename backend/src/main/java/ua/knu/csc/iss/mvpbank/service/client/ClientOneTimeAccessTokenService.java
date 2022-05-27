package ua.knu.csc.iss.mvpbank.service.client;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ua.knu.csc.iss.mvpbank.entity.Client;
import ua.knu.csc.iss.mvpbank.entity.ClientOneTimeAccessToken;
import ua.knu.csc.iss.mvpbank.exceptions.NotFoundException;
import ua.knu.csc.iss.mvpbank.repository.ClientOneTimeAccessTokenRepository;

import java.util.UUID;

@Service
@RequiredArgsConstructor
public class ClientOneTimeAccessTokenService {
  private final ClientOneTimeAccessTokenRepository tokenRepository;

  @Transactional
  public ClientOneTimeAccessToken generateVerifyEmailToken(Client client) {
    return tokenRepository.saveAndFlush(
        ClientOneTimeAccessToken.builder()
            .token(UUID.randomUUID().toString())
            .client(client)
            .build());
  }

  public ClientOneTimeAccessToken findOneTimeAccessToken(String token) {
    return tokenRepository
        .findByToken(token)
        .orElseThrow(() -> new NotFoundException("Your token is broken!"));
  }
}
