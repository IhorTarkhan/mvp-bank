package ua.knu.csc.iss.mvpbank.service.admin.manager;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import ua.knu.csc.iss.mvpbank.dto.response.admin.manager.ManagerTransactionsHistoryByUserResponse;
import ua.knu.csc.iss.mvpbank.dto.response.admin.manager.ManagerTransactionsInfoResponse;
import ua.knu.csc.iss.mvpbank.entity.Client;
import ua.knu.csc.iss.mvpbank.entity.Transaction;
import ua.knu.csc.iss.mvpbank.repository.TransactionRepository;
import ua.knu.csc.iss.mvpbank.service.TransactionService;

import java.math.BigDecimal;
import java.util.*;

@Service
@RequiredArgsConstructor
public class ManagerTransactionService {
  private final TransactionRepository transactionRepository;
  private final TransactionService transactionService;

  public List<ManagerTransactionsInfoResponse> getAllTransactions() {
    var resultMap = new HashMap<Client, ManagerTransactionsInfoResponse>();
    List<Transaction> database = transactionRepository.findAll();
    for (Transaction transaction : database) {
      Client clientFrom = transaction.getClientFrom();
      Client clientTo = transaction.getClientTo();

      var responseFrom =
          resultMap.getOrDefault(
              clientFrom,
              ManagerTransactionsInfoResponse.builder()
                  .userId(clientFrom.getId())
                  .userFullName(clientFrom.getFirstName() + " " + clientFrom.getLastName())
                  .history(new ArrayList<>())
                  .build());
      responseFrom
          .getHistory()
          .add(
              ManagerTransactionsHistoryByUserResponse.builder()
                  .id(transaction.getId())
                  .fromCurrentUser(true)
                  .otherUserId(clientTo.getId())
                  .otherUserFullName(clientTo.getFirstName() + " " + clientTo.getLastName())
                  .amount(transaction.getAmount())
                  .time(transaction.getTime())
                  .accepted(transaction.getAccepted())
                  .build());
      resultMap.put(clientFrom, responseFrom);

      var responseTo =
          resultMap.getOrDefault(
              clientTo,
              ManagerTransactionsInfoResponse.builder()
                  .userId(clientTo.getId())
                  .userFullName(clientTo.getFirstName() + " " + clientTo.getLastName())
                  .history(new ArrayList<>())
                  .build());
      responseTo
          .getHistory()
          .add(
              ManagerTransactionsHistoryByUserResponse.builder()
                  .id(transaction.getId())
                  .fromCurrentUser(false)
                  .otherUserId(clientFrom.getId())
                  .otherUserFullName(clientFrom.getFirstName() + " " + clientFrom.getLastName())
                  .amount(transaction.getAmount())
                  .time(transaction.getTime())
                  .accepted(transaction.getAccepted())
                  .build());
      resultMap.put(clientTo, responseTo);
    }
    return resultMap.entrySet().stream()
        .sorted(Comparator.comparing(o -> o.getKey().getId()))
        .map(Map.Entry::getValue)
        .toList();
  }

  public void accept(Long id) {
    transactionService.process(id);
  }

  public void close(Long id) {
    transactionService.close(id);
  }
}
