package ua.knu.csc.iss.mvpbank.controller.admin.support;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
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
}
