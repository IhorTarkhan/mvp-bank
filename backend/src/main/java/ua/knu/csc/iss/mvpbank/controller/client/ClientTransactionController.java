package ua.knu.csc.iss.mvpbank.controller.client;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;
import ua.knu.csc.iss.mvpbank.dto.request.client.ClientTransactionRequest;
import ua.knu.csc.iss.mvpbank.dto.response.TransactionInfoResponse;
import ua.knu.csc.iss.mvpbank.service.client.ClientTransactionService;

import java.util.List;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping(path = "/client/transaction")
public class ClientTransactionController {
  private final ClientTransactionService clientTransactionService;

  @PostMapping
  public void createTransaction(@RequestBody ClientTransactionRequest request) {
    clientTransactionService.createTransaction(request);
  }

  @GetMapping
  public List<TransactionInfoResponse> getMyTransactions() {
    return clientTransactionService.getMyTransactions();
  }
}
