package ua.knu.csc.iss.mvpbank.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ua.knu.csc.iss.mvpbank.entity.Client;
import ua.knu.csc.iss.mvpbank.entity.Transaction;
import ua.knu.csc.iss.mvpbank.exceptions.BadRequestException;
import ua.knu.csc.iss.mvpbank.exceptions.ConflictException;
import ua.knu.csc.iss.mvpbank.exceptions.NotFoundException;
import ua.knu.csc.iss.mvpbank.repository.TransactionRepository;

@Slf4j
@Service
@RequiredArgsConstructor
public class TransactionService {
  private final TransactionRepository transactionRepository;

  @Transactional
  public void process(Long id) {
    transactionRepository.flush();
    Transaction transaction =
        transactionRepository
            .findById(id)
            .orElseThrow(() -> new NotFoundException("Can non find transaction by id = " + id));
    Client clientFrom = transaction.getClientFrom();
    Client clientTo = transaction.getClientTo();
    if (clientFrom.equals(clientTo)) {
      throw new ConflictException("You can not transfer money to yourself");
    }
    if (clientFrom.getAmount().compareTo(transaction.getAmount()) < 0) {
      throw new BadRequestException("Not enough money");
    }
    if (transaction.getAccepted() != null) {
      throw new BadRequestException("Already process");
    }
    clientFrom.setAmount(clientFrom.getAmount().subtract(transaction.getAmount()));
    clientTo.setAmount(clientTo.getAmount().add(transaction.getAmount()));
    transaction.setAccepted(true);
  }

  @Transactional
  public void close(Long id) {
    Transaction transaction =
        transactionRepository
            .findById(id)
            .orElseThrow(() -> new NotFoundException("Can non find transaction by id = " + id));
    transaction.setAccepted(false);
  }
}
