package ua.knu.csc.iss.mvpbank;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.http.ResponseEntity;
import org.springframework.test.annotation.DirtiesContext;
import ua.knu.csc.iss.mvpbank.repository.CustomerRepository;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.springframework.boot.test.context.SpringBootTest.WebEnvironment.RANDOM_PORT;
import static org.springframework.http.HttpMethod.GET;
import static org.springframework.http.HttpStatus.OK;
import static org.springframework.test.annotation.DirtiesContext.ClassMode.BEFORE_EACH_TEST_METHOD;

@SpringBootTest(webEnvironment = RANDOM_PORT)
@DirtiesContext(classMode = BEFORE_EACH_TEST_METHOD)
public class SpringBootJPAIntegrationTest {
  @Autowired TestRestTemplate restTemplate;
  @Autowired private CustomerRepository customerRepository;

  @Test
  public void repositoryTest() {
    assertEquals(0, customerRepository.count());
  }

  @Test
  public void restTest() {
    ResponseEntity<String> response = restTemplate.exchange("/test", GET, null, String.class);
    assertEquals(OK, response.getStatusCode());
    assertEquals("Hello MVP Bank", response.getBody());
  }
}
