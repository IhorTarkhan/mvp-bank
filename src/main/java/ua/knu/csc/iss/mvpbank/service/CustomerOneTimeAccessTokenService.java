package ua.knu.csc.iss.mvpbank.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ua.knu.csc.iss.mvpbank.entity.Customer;
import ua.knu.csc.iss.mvpbank.entity.CustomerOneTimeAccessToken;
import ua.knu.csc.iss.mvpbank.exceptions.BadRequestException;
import ua.knu.csc.iss.mvpbank.exceptions.NotFoundException;
import ua.knu.csc.iss.mvpbank.repository.CustomerOneTimeAccessTokenRepository;

import java.time.ZonedDateTime;
import java.time.temporal.ChronoUnit;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class CustomerOneTimeAccessTokenService {
  private final CustomerOneTimeAccessTokenRepository tokenRepository;

  @Transactional
  public CustomerOneTimeAccessToken generateVerifyEmailToken(Customer customer) {
    return tokenRepository.saveAndFlush(
        CustomerOneTimeAccessToken.builder()
            .token(UUID.randomUUID().toString())
            .expiresAt(ZonedDateTime.now().plus(1, ChronoUnit.DAYS))
            .customer(customer)
            .build());
  }

  public void checkIfValid(CustomerOneTimeAccessToken token) {
    if (ZonedDateTime.now().isAfter(token.getExpiresAt())) {
      throw new BadRequestException("Your token is expired!");
    }
  }

  public CustomerOneTimeAccessToken findOneTimeAccessToken(String token) {
    return tokenRepository
        .findByToken(token)
        .orElseThrow(() -> new NotFoundException("Your token is broken!"));
  }
}
