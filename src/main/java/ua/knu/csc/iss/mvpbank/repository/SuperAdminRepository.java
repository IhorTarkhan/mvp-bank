package ua.knu.csc.iss.mvpbank.repository;

import org.springframework.data.jpa.repository.support.JpaRepositoryImplementation;
import org.springframework.stereotype.Repository;
import ua.knu.csc.iss.mvpbank.entity.Customer;
import ua.knu.csc.iss.mvpbank.entity.SuperAdmin;

import java.util.Optional;

@Repository
public interface SuperAdminRepository extends JpaRepositoryImplementation<SuperAdmin, Long> {
  Optional<SuperAdmin> findByEmail(String email);
}
