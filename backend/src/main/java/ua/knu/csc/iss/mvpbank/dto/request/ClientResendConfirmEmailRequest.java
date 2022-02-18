package ua.knu.csc.iss.mvpbank.dto.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import ua.knu.csc.iss.mvpbank.locales.Language;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ClientResendConfirmEmailRequest {
  private Language language;
}
