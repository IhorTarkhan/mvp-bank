package ua.knu.csc.iss.mvpbank.repository;

import org.springframework.data.jpa.repository.support.JpaRepositoryImplementation;
import org.springframework.stereotype.Repository;
import ua.knu.csc.iss.mvpbank.entity.CustomerOneTimeAccessToken;

import java.util.Optional;

@Repository
public interface CustomerOneTimeAccessTokenRepository
    extends JpaRepositoryImplementation<CustomerOneTimeAccessToken, Long> {
  Optional<CustomerOneTimeAccessToken> findByToken(String token);
}
