package ua.knu.csc.iss.mvpbank.controller.admin.superadmin;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;
import ua.knu.csc.iss.mvpbank.dto.request.admin.superadmin.AdminCreateRequest;
import ua.knu.csc.iss.mvpbank.dto.request.admin.superadmin.AdminUpdateRequest;
import ua.knu.csc.iss.mvpbank.dto.response.admin.superadmin.AdminInfoResponse;
import ua.knu.csc.iss.mvpbank.service.admin.superadmin.SuperAdminManagementAdminService;

import java.util.List;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping(path = "/super-admin/admin")
public class SuperAdminManagementAdminController {
  private final SuperAdminManagementAdminService superAdminManagementAdminService;

  @GetMapping
  public List<AdminInfoResponse> getAdmins() {
    return superAdminManagementAdminService.getAdmins();
  }

  @PostMapping
  public void createAdmin(@RequestBody AdminCreateRequest request) {
    superAdminManagementAdminService.createAdmin(request);
  }

  @PutMapping
  public void updateAdmin(@RequestBody AdminUpdateRequest request) {
    superAdminManagementAdminService.updateAdmin(request);
  }

  @DeleteMapping("/{id}")
  public void deleteAdmin(@PathVariable Long id) {
    superAdminManagementAdminService.deleteAdmin(id);
  }
}
