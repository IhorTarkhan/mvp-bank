package ua.knu.csc.iss.mvpbank.dto.response;

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
public class AdminInfoResponse {
  private Long id;
  private String username;
  private String email;
  private List<AdminRoles> roles;
}
