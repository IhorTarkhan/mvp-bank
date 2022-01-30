package ua.knu.csc.iss.mvpbank.repository;

import org.springframework.data.jpa.repository.support.JpaRepositoryImplementation;
import org.springframework.stereotype.Repository;
import ua.knu.csc.iss.mvpbank.entity.Client;

import java.util.Optional;

@Repository
public interface ClientRepository extends JpaRepositoryImplementation<Client, Long> {
  Optional<Client> findByEmail(String email);
}
