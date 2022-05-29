package ua.knu.csc.iss.mvpbank.controller.admin.manager;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;
import ua.knu.csc.iss.mvpbank.dto.response.TransactionInfoResponse;
import ua.knu.csc.iss.mvpbank.service.admin.manager.ManagerTransactionService;

import java.util.List;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping(path = "/client-manager/transaction")
public class ManagerTransactionController {
  private final ManagerTransactionService managerTransactionService;

  @GetMapping
  public List<TransactionInfoResponse> getAllTransactions() {
    return managerTransactionService.getAllTransactions();
  }

  @PutMapping("/accept/{id}")
  public void accept(@PathVariable Long id) {
    managerTransactionService.accept(id);
  }

  @PutMapping("/close/{id}")
  public void close(@PathVariable Long id) {
    managerTransactionService.close(id);
  }
}
