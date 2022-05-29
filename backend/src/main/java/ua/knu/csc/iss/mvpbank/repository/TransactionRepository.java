package ua.knu.csc.iss.mvpbank.repository;

import org.springframework.data.jpa.repository.support.JpaRepositoryImplementation;
import org.springframework.stereotype.Repository;
import ua.knu.csc.iss.mvpbank.entity.Client;
import ua.knu.csc.iss.mvpbank.entity.Transaction;

import java.util.List;

@Repository
public interface TransactionRepository extends JpaRepositoryImplementation<Transaction, Long> {
  List<Transaction> findAllByClientFromOrClientTo(Client from, Client to);
}
