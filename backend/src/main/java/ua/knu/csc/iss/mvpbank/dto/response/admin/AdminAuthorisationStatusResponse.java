package ua.knu.csc.iss.mvpbank.dto.response.admin;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import ua.knu.csc.iss.mvpbank.entity.AdminRoles;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AdminAuthorisationStatusResponse {
  private String email;
  private List<AdminRoles> roles;
}
