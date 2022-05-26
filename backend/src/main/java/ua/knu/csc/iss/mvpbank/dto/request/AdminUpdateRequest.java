package ua.knu.csc.iss.mvpbank.dto.request;

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
public class AdminUpdateRequest {
  private Long id;
  private List<AdminRoles> roles;
  private String password;
}
