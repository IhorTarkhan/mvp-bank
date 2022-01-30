package ua.knu.csc.iss.mvpbank.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@RequiredArgsConstructor
public class EmailService {
  public void sendConfirmEmail(String token) {
    // TODO send email
    System.out.println("_______________________________________________________________");
    System.out.println(token);
    System.out.println(token);
    System.out.println(token);
    System.out.println("_______________________________________________________________");
  }
}
