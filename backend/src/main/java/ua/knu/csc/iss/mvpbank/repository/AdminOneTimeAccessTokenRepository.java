package ua.knu.csc.iss.mvpbank.repository;

import org.springframework.data.jpa.repository.support.JpaRepositoryImplementation;
import org.springframework.stereotype.Repository;
import ua.knu.csc.iss.mvpbank.entity.AdminOneTimeAccessToken;

import java.util.Optional;

@Repository
public interface AdminOneTimeAccessTokenRepository
    extends JpaRepositoryImplementation<AdminOneTimeAccessToken, Long> {
  Optional<AdminOneTimeAccessToken> findByToken(String token);
}
