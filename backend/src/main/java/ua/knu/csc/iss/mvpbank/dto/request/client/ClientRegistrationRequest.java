package ua.knu.csc.iss.mvpbank.dto.request.client;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import ua.knu.csc.iss.mvpbank.locales.Language;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ClientRegistrationRequest {
  private String username;
  private String firstName;
  private String lastName;
  private String password;
  private Language language;
}
