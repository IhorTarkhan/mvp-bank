package ua.knu.csc.iss.mvpbank.repository;

import org.springframework.data.jpa.repository.support.JpaRepositoryImplementation;
import org.springframework.stereotype.Repository;
import ua.knu.csc.iss.mvpbank.entity.SupportRequest;

@Repository
public interface SupportRequestRepository
    extends JpaRepositoryImplementation<SupportRequest, Long> {}
