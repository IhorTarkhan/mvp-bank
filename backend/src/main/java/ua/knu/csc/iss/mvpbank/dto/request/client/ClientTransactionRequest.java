package ua.knu.csc.iss.mvpbank.dto.request.client;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ClientTransactionRequest {
  private String toCard;
  private BigDecimal amount;
}
