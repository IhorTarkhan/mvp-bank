package ua.knu.csc.iss.mvpbank.repository;

import org.springframework.data.jpa.repository.support.JpaRepositoryImplementation;
import org.springframework.stereotype.Repository;
import ua.knu.csc.iss.mvpbank.entity.Admin;

import java.util.Optional;

@Repository
public interface AdminRepository extends JpaRepositoryImplementation<Admin, Long> {
  Optional<Admin> findByEmail(String email);
}
