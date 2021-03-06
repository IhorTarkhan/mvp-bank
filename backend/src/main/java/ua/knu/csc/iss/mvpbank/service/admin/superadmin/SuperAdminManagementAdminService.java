package ua.knu.csc.iss.mvpbank.service.admin.superadmin;

import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ua.knu.csc.iss.mvpbank.dto.request.admin.superadmin.AdminCreateRequest;
import ua.knu.csc.iss.mvpbank.dto.request.admin.superadmin.AdminUpdateRequest;
import ua.knu.csc.iss.mvpbank.dto.response.admin.superadmin.AdminInfoResponse;
import ua.knu.csc.iss.mvpbank.entity.Admin;
import ua.knu.csc.iss.mvpbank.exceptions.IAmATeapotException;
import ua.knu.csc.iss.mvpbank.exceptions.NotFoundException;
import ua.knu.csc.iss.mvpbank.repository.AdminRepository;
import ua.knu.csc.iss.mvpbank.service.UserSecurityService;

import java.util.Comparator;
import java.util.List;

@Service
@RequiredArgsConstructor
public class SuperAdminManagementAdminService {
  private final AdminRepository adminRepository;
  private final PasswordEncoder passwordEncoder;
  private final UserSecurityService userSecurityService;

  public List<AdminInfoResponse> getAdmins() {
    return adminRepository.findAll().stream()
        .sorted(Comparator.comparing(Admin::getId))
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
            .password(passwordEncoder.encode(request.getPassword()))
            .build();
    adminRepository.save(newAdmin);
  }

  @Transactional
  public void updateAdmin(AdminUpdateRequest request) {
    Admin admin =
        adminRepository
            .findById(request.getId())
            .orElseThrow(() -> new NotFoundException("Admin not found with id " + request.getId()));
    admin.setRoles(request.getRoles());
    admin.setPassword(passwordEncoder.encode(request.getPassword()));
  }

  @Transactional
  public void deleteAdmin(Long id) {
    if (userSecurityService.getCurrentAdmin().getId().equals(id)) {
      throw new IAmATeapotException("You can not remove yourself");
    }
    adminRepository.deleteById(id);
  }
}
