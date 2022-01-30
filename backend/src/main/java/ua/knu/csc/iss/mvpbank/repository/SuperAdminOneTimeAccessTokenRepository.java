package ua.knu.csc.iss.mvpbank.repository;

import org.springframework.data.jpa.repository.support.JpaRepositoryImplementation;
import org.springframework.stereotype.Repository;
import ua.knu.csc.iss.mvpbank.entity.SuperAdminOneTimeAccessToken;

import java.util.Optional;

@Repository
public interface SuperAdminOneTimeAccessTokenRepository
    extends JpaRepositoryImplementation<SuperAdminOneTimeAccessToken, Long> {
  Optional<SuperAdminOneTimeAccessToken> findByToken(String token);
}
