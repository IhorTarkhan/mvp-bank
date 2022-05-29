package ua.knu.csc.iss.mvpbank.service.client;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ua.knu.csc.iss.mvpbank.dto.request.client.ClientTransactionRequest;
import ua.knu.csc.iss.mvpbank.dto.response.TransactionInfoResponse;
import ua.knu.csc.iss.mvpbank.entity.Client;
import ua.knu.csc.iss.mvpbank.entity.Transaction;
import ua.knu.csc.iss.mvpbank.exceptions.BadRequestException;
import ua.knu.csc.iss.mvpbank.exceptions.ConflictException;
import ua.knu.csc.iss.mvpbank.exceptions.NotFoundException;
import ua.knu.csc.iss.mvpbank.repository.ClientRepository;
import ua.knu.csc.iss.mvpbank.repository.TransactionRepository;
import ua.knu.csc.iss.mvpbank.service.TransactionService;
import ua.knu.csc.iss.mvpbank.service.UserSecurityService;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.concurrent.Executors;

@Slf4j
@Service
@RequiredArgsConstructor
public class ClientTransactionService {
  private final TransactionRepository transactionRepository;
  private final UserSecurityService userSecurityService;
  private final ClientRepository clientRepository;
  private final TransactionService transactionService;

  @Transactional
  public void createTransaction(ClientTransactionRequest request) {
    Client currentClient = userSecurityService.getCurrentClient();
    if (currentClient.getCardNumber().equals(request.getToCard())) {
      throw new ConflictException("You can not transfer money to yourself");
    }
    Client toClient =
        clientRepository
            .findByCardNumber(request.getToCard())
            .orElseThrow(() -> new NotFoundException("Can non create client card number"));
    if (toClient.getAmount().compareTo(request.getAmount()) < 0) {
      throw new BadRequestException("Not enough money");
    }
    Transaction newTransaction =
        Transaction.builder()
            .clientFrom(currentClient)
            .clientTo(toClient)
            .time(LocalDateTime.now())
            .amount(request.getAmount())
            .build();
    Transaction savedTransaction = transactionRepository.save(newTransaction);
    transactionRepository.flush();
    tryToAccept(savedTransaction);
  }

  public List<TransactionInfoResponse> getMyTransactions() {
    Client currentClient = userSecurityService.getCurrentClient();
    return transactionRepository
        .findAllByClientFromOrClientTo(currentClient, currentClient)
        .stream()
        .sorted((o1, o2) -> o2.getTime().compareTo(o1.getTime()))
        .map(
            e ->
                TransactionInfoResponse.builder()
                    .id(e.getId())
                    .idFrom(e.getClientFrom().getId())
                    .usernameFrom(
                        e.getClientFrom().getFirstName() + " " + e.getClientFrom().getLastName())
                    .idTo(e.getClientTo().getId())
                    .usernameTo(
                        e.getClientTo().getFirstName() + " " + e.getClientTo().getLastName())
                    .amount(e.getAmount())
                    .time(e.getTime())
                    .accepted(e.getAccepted())
                    .build())
        .toList();
  }

  void tryToAccept(Transaction savedTransaction) {
    Executors.newSingleThreadExecutor()
        .execute(
            () -> {
              if (savedTransaction.getAmount().compareTo(BigDecimal.valueOf(1000)) > 0) {
                return;
              }
              try {
                Thread.sleep(savedTransaction.getAmount().longValue() / 100 * 1000);
                transactionService.process(savedTransaction.getId());
              } catch (InterruptedException e) {
                log.error("ERROR", e);
                throw new RuntimeException(e);
              }
            });
  }
}
