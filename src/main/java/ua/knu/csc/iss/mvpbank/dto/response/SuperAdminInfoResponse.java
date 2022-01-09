package ua.knu.csc.iss.mvpbank.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class SuperAdminInfoResponse {
  private String email;
  private boolean emailVerified;
}
