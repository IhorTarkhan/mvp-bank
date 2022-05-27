package ua.knu.csc.iss.mvpbank.dto.response.admin.support;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class SupportResponseResponse {
  private Long id;
  private String title;
  private String question;
  private Long clientId;
  private Long adminId;
}
