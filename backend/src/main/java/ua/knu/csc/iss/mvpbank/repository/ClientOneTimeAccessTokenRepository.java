package ua.knu.csc.iss.mvpbank.repository;

import org.springframework.data.jpa.repository.support.JpaRepositoryImplementation;
import org.springframework.stereotype.Repository;
import ua.knu.csc.iss.mvpbank.entity.ClientOneTimeAccessToken;

import java.util.Optional;

@Repository
public interface ClientOneTimeAccessTokenRepository
    extends JpaRepositoryImplementation<ClientOneTimeAccessToken, Long> {
  Optional<ClientOneTimeAccessToken> findByToken(String token);
}
