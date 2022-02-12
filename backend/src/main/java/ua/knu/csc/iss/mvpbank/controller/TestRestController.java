package ua.knu.csc.iss.mvpbank.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import ua.knu.csc.iss.mvpbank.service.SendEmailService;

import java.util.Map;

@RestController
@RequiredArgsConstructor
public class TestRestController {
  private final SendEmailService sendEmailService;

  @GetMapping("/test")
  public String getTest() {
    return "Hello MVP Bank";
  }

  @GetMapping("/sendEmail")
  public String getTest(
      @RequestParam("to") String to,
      @RequestParam("subject") String subject,
      @RequestParam("text") String text) {
    sendEmailService.sendTextEmail(to, subject, text);
    return "Hello MVP Bank";
  }

  @PostMapping("/sendEmail")
  public String getTest(@RequestBody Map<String, String> request) {
    sendEmailService.sendTextEmail(request.get("to"), request.get("subject"), request.get("text"));
    return "Hello MVP Bank";
  }
}
