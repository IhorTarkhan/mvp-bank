package ua.knu.csc.iss.mvpbank.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
public class TestRestController {
  @GetMapping("/test")
  public String getTest() {
    return "Hello MVP Bank";
  }
}
