package ua.knu.csc.iss.mvpbank.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ua.knu.csc.iss.mvpbank.entity.SuperAdmin;
import ua.knu.csc.iss.mvpbank.entity.SuperAdminOneTimeAccessToken;
import ua.knu.csc.iss.mvpbank.exceptions.BadRequestException;
import ua.knu.csc.iss.mvpbank.exceptions.NotFoundException;
import ua.knu.csc.iss.mvpbank.repository.SuperAdminOneTimeAccessTokenRepository;

import java.time.ZonedDateTime;
import java.time.temporal.ChronoUnit;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class SuperAdminOneTimeAccessTokenService {
  private final SuperAdminOneTimeAccessTokenRepository tokenRepository;

  @Transactional
  public SuperAdminOneTimeAccessToken generateVerifyEmailToken(SuperAdmin superAdmin) {
    return tokenRepository.saveAndFlush(
        SuperAdminOneTimeAccessToken.builder()
            .token(UUID.randomUUID().toString())
            .expiresAt(ZonedDateTime.now().plus(1, ChronoUnit.DAYS))
            .superAdmin(superAdmin)
            .build());
  }

  public void checkIfValid(SuperAdminOneTimeAccessToken token) {
    if (ZonedDateTime.now().isAfter(token.getExpiresAt())) {
      throw new BadRequestException("Your token is expired!");
    }
  }

  public SuperAdminOneTimeAccessToken findOneTimeAccessToken(String token) {
    return tokenRepository
        .findByToken(token)
        .orElseThrow(() -> new NotFoundException("Your token is broken!"));
  }
}
