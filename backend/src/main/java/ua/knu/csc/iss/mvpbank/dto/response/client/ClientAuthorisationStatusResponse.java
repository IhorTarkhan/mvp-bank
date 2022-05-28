package ua.knu.csc.iss.mvpbank.dto.response.client;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ClientAuthorisationStatusResponse {
  private Long id;
  private String email;
  private String firstNme;
  private String lastName;
  private boolean emailVerified;
}
