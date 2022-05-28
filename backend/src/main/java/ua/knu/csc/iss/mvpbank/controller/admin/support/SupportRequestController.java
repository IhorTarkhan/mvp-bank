package ua.knu.csc.iss.mvpbank.controller.admin.support;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;
import ua.knu.csc.iss.mvpbank.dto.response.admin.support.SupportResponseResponse;
import ua.knu.csc.iss.mvpbank.service.admin.support.SupportRequestService;

import java.util.List;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping(path = "/support/request")
public class SupportRequestController {
  private final SupportRequestService supportRequestService;

  @GetMapping
  public List<SupportResponseResponse> createSupportRequest() {
    return supportRequestService.getSupportRequests();
  }

  @PutMapping("/accept-for-me/{id}")
  public void acceptForMeSupportRequest(@PathVariable Long id) {
    supportRequestService.acceptForMeSupportRequest(id);
  }

  @PutMapping("/cancel/{id}")
  public void cancelSupportRequest(@PathVariable Long id) {
    supportRequestService.cancelSupportRequest(id);
  }
}
