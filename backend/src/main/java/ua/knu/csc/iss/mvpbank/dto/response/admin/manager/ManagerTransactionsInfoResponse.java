package ua.knu.csc.iss.mvpbank.dto.response.admin.manager;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ManagerTransactionsInfoResponse {
  private Long userId;
  private String userFullName;
  private List<ManagerTransactionsHistoryByUserResponse> history;
}
