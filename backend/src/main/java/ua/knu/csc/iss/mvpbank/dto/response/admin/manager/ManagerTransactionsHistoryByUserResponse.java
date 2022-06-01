package ua.knu.csc.iss.mvpbank.dto.response.admin.manager;

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
public class ManagerTransactionsHistoryByUserResponse {
  private Long id;
  private boolean fromCurrentUser;
  private Long otherUserId;
  private String otherUserFullName;
  private BigDecimal amount;
  private LocalDateTime time;
  private Boolean accepted;
}
