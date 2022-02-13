package ua.knu.csc.iss.mvpbank.property;

import lombok.Data;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
@Data
public class ApplicationProperty {
  @Value("${application.frontendUrl}")
  private String frontendUrl;
}
