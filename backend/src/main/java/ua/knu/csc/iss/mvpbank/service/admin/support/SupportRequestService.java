package ua.knu.csc.iss.mvpbank.service.admin.support;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ua.knu.csc.iss.mvpbank.dto.request.client.ClientSupportRequest;
import ua.knu.csc.iss.mvpbank.dto.response.admin.support.SupportResponseResponse;
import ua.knu.csc.iss.mvpbank.entity.SupportRequest;
import ua.knu.csc.iss.mvpbank.exceptions.NotFoundException;
import ua.knu.csc.iss.mvpbank.repository.SupportRequestRepository;
import ua.knu.csc.iss.mvpbank.service.UserSecurityService;

import java.time.LocalDateTime;
import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class SupportRequestService {
  private final SupportRequestRepository supportRequestRepository;
  private final UserSecurityService userSecurityService;

  @Transactional
  public void createSupportRequest(ClientSupportRequest request) {
    SupportRequest newEntity =
        SupportRequest.builder()
            .client(userSecurityService.getCurrentClient())
            .title(request.getTitle())
            .question(request.getQuestion())
            .createdAt(LocalDateTime.now())
            .isClosed(false)
            .build();
    supportRequestRepository.save(newEntity);
  }

  @Transactional
  public List<SupportResponseResponse> getSupportRequests() {
    return supportRequestRepository.findAll().stream()
        .map(
            entity ->
                SupportResponseResponse.builder()
                    .id(entity.getId())
                    .title(entity.getTitle())
                    .question(entity.getQuestion())
                    .createdAt(entity.getCreatedAt())
                    .clientEmail(entity.getClient().getEmail())
                    .adminEmail(entity.getAdmin() != null ? entity.getAdmin().getEmail() : null)
                    .build())
        .toList();
  }

  @Transactional
  public void acceptForMeSupportRequest(Long id) {
    SupportRequest supportRequest =
        supportRequestRepository
            .findById(id)
            .orElseThrow(() -> new NotFoundException("No SupportRequest with id = " + id));
    supportRequest.setAdmin(userSecurityService.getCurrentAdmin());
  }

  @Transactional
  public void cancelSupportRequest(Long id) {
    SupportRequest supportRequest =
        supportRequestRepository
            .findById(id)
            .orElseThrow(() -> new NotFoundException("No SupportRequest with id = " + id));
    supportRequest.setClosed(true);
  }
}
