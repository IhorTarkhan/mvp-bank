package ua.knu.csc.iss.mvpbank.service;

import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class SendEmailService {
  private final JavaMailSender mailSender;

  @Value("${spring.mail.username}")
  private String mailFrom;

  @SneakyThrows
  public void sendTextEmail(String to, String subject, String text) {
    SimpleMailMessage message = new SimpleMailMessage();

    message.setFrom(mailFrom);
    message.setTo(to);
    message.setSubject(subject);
    message.setText(text);

    mailSender.send(message);
  }
}
