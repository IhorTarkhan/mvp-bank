package ua.knu.csc.iss.mvpbank.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import ua.knu.csc.iss.mvpbank.service.SendEmailService;

@RestController
@RequiredArgsConstructor
public class TestRestController {
  private final SendEmailService sendEmailService;

  @GetMapping("/test")
  public String getTest() {
    return "Hello MVP Bank";
  }

  @GetMapping("/sendEmail")
  public String sendTextEmail(
      @RequestParam("to") String to,
      @RequestParam("subject") String subject,
      @RequestParam("text") String text) {
    sendEmailService.sendTextEmail(to, subject, text);
    return "Hello MVP Bank";
  }

  @GetMapping("/sendEmailHtml")
  public String sendTextEmailHtml(
      @RequestParam("to") String to,
      @RequestParam("subject") String subject,
      @RequestParam("text") String text) {
    sendEmailService.sendTextEmailHtml(to, subject, text);
    return "Hello MVP Bank";
  }
}
