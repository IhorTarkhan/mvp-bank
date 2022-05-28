package ua.knu.csc.iss.mvpbank.dto.response.admin.support;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class SupportResponseResponse {
  private Long id;
  private String title;
  private String question;
  private LocalDateTime createdAt;
  private String clientEmail;
  private String adminEmail;
  private boolean isClosed;
}
