package ua.knu.csc.iss.primitivebank;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
public class TestRestController {
  @GetMapping("/test-rest")
  public Object getTest() {
    return Map.of("name", "eee", "age", 6);
  }
}
