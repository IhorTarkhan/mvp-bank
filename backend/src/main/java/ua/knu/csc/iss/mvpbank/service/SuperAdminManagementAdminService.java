package ua.knu.csc.iss.mvpbank.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ua.knu.csc.iss.mvpbank.dto.request.AdminCreateRequest;
import ua.knu.csc.iss.mvpbank.dto.request.AdminUpdateRequest;
import ua.knu.csc.iss.mvpbank.dto.response.AdminInfoResponse;
import ua.knu.csc.iss.mvpbank.entity.Admin;
import ua.knu.csc.iss.mvpbank.exceptions.NotFoundException;
import ua.knu.csc.iss.mvpbank.repository.AdminRepository;

import java.util.List;

@Service
@RequiredArgsConstructor
public class SuperAdminManagementAdminService {
  private final AdminRepository adminRepository;

  public List<AdminInfoResponse> getAdmins() {
    return adminRepository.findAll().stream()
        .map(
            entity ->
                AdminInfoResponse.builder()
                    .id(entity.getId())
                    .email(entity.getEmail())
                    .username(entity.getUsername())
                    .roles(entity.getRoles())
                    .build())
        .toList();
  }

  @Transactional
  public void createAdmin(AdminCreateRequest request) {
    Admin newAdmin =
        Admin.builder()
            .email(request.getEmail())
            .username(request.getUsername())
            .roles(request.getRoles())
            .build();
    adminRepository.save(newAdmin);
  }

  @Transactional
  public void updateAdmin(AdminUpdateRequest request) {
    Admin admin =
        adminRepository
            .findById(request.getId())
            .orElseThrow(() -> new NotFoundException("Admin not found with id " + request.getId()));
    admin.setEmail(request.getEmail());
    admin.setUsername(request.getUsername());
    admin.setRoles(request.getRoles());
  }

  @Transactional
  public void deleteAdmin(Long id) {
    adminRepository.deleteById(id);
  }
}
