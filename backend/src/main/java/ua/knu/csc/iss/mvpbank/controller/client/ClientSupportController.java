package ua.knu.csc.iss.mvpbank.controller.client;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import ua.knu.csc.iss.mvpbank.dto.request.client.ClientSupportRequest;
import ua.knu.csc.iss.mvpbank.service.admin.support.SupportRequestService;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping(path = "/client/support")
public class ClientSupportController {
  private final SupportRequestService supportRequestService;

  @PostMapping
  public void createSupportRequest(@RequestBody ClientSupportRequest request) {
    supportRequestService.createSupportRequest(request);
  }
}
