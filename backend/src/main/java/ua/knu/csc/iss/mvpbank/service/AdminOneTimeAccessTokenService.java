package ua.knu.csc.iss.mvpbank.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ua.knu.csc.iss.mvpbank.entity.Admin;
import ua.knu.csc.iss.mvpbank.entity.AdminOneTimeAccessToken;
import ua.knu.csc.iss.mvpbank.exceptions.NotFoundException;
import ua.knu.csc.iss.mvpbank.repository.AdminOneTimeAccessTokenRepository;

import java.util.UUID;

@Service
@RequiredArgsConstructor
public class AdminOneTimeAccessTokenService {
  private final AdminOneTimeAccessTokenRepository tokenRepository;

  @Transactional
  public AdminOneTimeAccessToken generateVerifyEmailToken(Admin admin) {
    return tokenRepository.saveAndFlush(
        AdminOneTimeAccessToken.builder().token(UUID.randomUUID().toString()).admin(admin).build());
  }

  public AdminOneTimeAccessToken findOneTimeAccessToken(String token) {
    return tokenRepository
        .findByToken(token)
        .orElseThrow(() -> new NotFoundException("Your token is broken!"));
  }
}
