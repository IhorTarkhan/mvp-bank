package ua.knu.csc.iss.mvpbank.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;
import ua.knu.csc.iss.mvpbank.dto.request.AdminCreateRequest;
import ua.knu.csc.iss.mvpbank.dto.request.AdminUpdateRequest;
import ua.knu.csc.iss.mvpbank.dto.response.AdminInfoResponse;
import ua.knu.csc.iss.mvpbank.service.SuperAdminManagementAdminService;

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
