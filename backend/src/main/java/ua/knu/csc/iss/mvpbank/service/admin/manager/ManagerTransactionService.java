package ua.knu.csc.iss.mvpbank.service.admin.manager;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import ua.knu.csc.iss.mvpbank.dto.response.TransactionInfoResponse;
import ua.knu.csc.iss.mvpbank.repository.TransactionRepository;
import ua.knu.csc.iss.mvpbank.service.TransactionService;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ManagerTransactionService {
  private final TransactionRepository transactionRepository;
  private final TransactionService transactionService;

  public List<TransactionInfoResponse> getAllTransactions() {
    return transactionRepository.findAll().stream()
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

  public void accept(Long id) {
    transactionService.process(id);
  }

  public void close(Long id) {
    transactionService.close(id);
  }
}
