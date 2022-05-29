package ua.knu.csc.iss.mvpbank.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class TransactionInfoResponse {
  private Long id;
  private Long idFrom;
  private String usernameFrom;
  private Long idTo;
  private String usernameTo;
  private BigDecimal amount;
  private LocalDateTime time;
  private Boolean accepted;
}
