package ua.knu.csc.iss.mvpbank.dto.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class SuperAdminRegistrationRequest {
  private String username;
  private String password;
}
