package ua.knu.csc.iss.mvpbank.authorisation;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.test.annotation.DirtiesContext;
import ua.knu.csc.iss.mvpbank.dto.request.ClientEmailConfirmRequest;
import ua.knu.csc.iss.mvpbank.dto.request.ClientLoginRequest;
import ua.knu.csc.iss.mvpbank.dto.request.ClientRegistrationRequest;
import ua.knu.csc.iss.mvpbank.dto.response.ClientAuthorisationStatusResponse;
import ua.knu.csc.iss.mvpbank.dto.response.JwtResponse;
import ua.knu.csc.iss.mvpbank.service.ClientEmailService;

import java.util.Objects;
import java.util.concurrent.atomic.AtomicReference;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.doAnswer;
import static org.springframework.boot.test.context.SpringBootTest.WebEnvironment.RANDOM_PORT;
import static org.springframework.http.HttpHeaders.AUTHORIZATION;
import static org.springframework.http.HttpMethod.GET;
import static org.springframework.http.HttpMethod.POST;
import static org.springframework.http.HttpStatus.*;
import static org.springframework.test.annotation.DirtiesContext.ClassMode.BEFORE_EACH_TEST_METHOD;

@SpringBootTest(webEnvironment = RANDOM_PORT)
@DirtiesContext(classMode = BEFORE_EACH_TEST_METHOD)
public class ClientAuthorisationIntegrationTest {
  @Autowired TestRestTemplate restTemplate;
  @MockBean ClientEmailService clientEmailService;

  @Test
  void notExistUserLogin_test() {
    String email = "test@email.com";
    String password = "test-password";

    ResponseEntity<JwtResponse> response =
        restTemplate.exchange(
            "/client/login",
            POST,
            new HttpEntity<>(
                ClientLoginRequest.builder().username(email).password(password).build()),
            JwtResponse.class);
    assertEquals(NOT_FOUND, response.getStatusCode());
  }

  @Test
  void newtUserRegister_test() {
    String email = "test@email.com";
    String password = "test-password";

    ResponseEntity<JwtResponse> response =
        restTemplate.exchange(
            "/client/register",
            POST,
            new HttpEntity<>(
                ClientRegistrationRequest.builder().username(email).password(password).build()),
            JwtResponse.class);
    assertEquals(OK, response.getStatusCode());
    assertNotNull(response.getBody());
    assertNotNull(response.getBody().getAuthorization());
    String authorization = response.getBody().getAuthorization();
    assertEquals(2, authorization.length() - authorization.replaceAll("\\.", "").length());
  }

  @Test
  void existUserTryRegisterAgain_test() {
    String email = "test@email.com";
    String password = "test-password";

    restTemplate.exchange(
        "/client/register",
        POST,
        new HttpEntity<>(
            ClientRegistrationRequest.builder().username(email).password(password).build()),
        JwtResponse.class);
    ResponseEntity<JwtResponse> response =
        restTemplate.exchange(
            "/client/register",
            POST,
            new HttpEntity<>(
                ClientRegistrationRequest.builder().username(email).password(password).build()),
            JwtResponse.class);
    assertEquals(CONFLICT, response.getStatusCode());
  }

  @Test
  void existUserTryLoginWithWrongPassword_test() {
    String email = "test@email.com";
    String invalidPassword = "invalid-password";
    String validPassword = "test-password";

    restTemplate.exchange(
        "/client/register",
        POST,
        new HttpEntity<>(
            ClientRegistrationRequest.builder().username(email).password(validPassword).build()),
        JwtResponse.class);

    ResponseEntity<JwtResponse> response =
        restTemplate.exchange(
            "/client/login",
            POST,
            new HttpEntity<>(
                ClientLoginRequest.builder().username(email).password(invalidPassword).build()),
            JwtResponse.class);
    assertEquals(FORBIDDEN, response.getStatusCode());
  }

  @Test
  void existUserLoginCorrectly_test() {
    String email = "test@email.com";
    String password = "test-password";

    restTemplate.exchange(
        "/client/register",
        POST,
        new HttpEntity<>(
            ClientRegistrationRequest.builder().username(email).password(password).build()),
        JwtResponse.class);

    ResponseEntity<JwtResponse> response =
        restTemplate.exchange(
            "/client/login",
            POST,
            new HttpEntity<>(
                ClientLoginRequest.builder().username(email).password(password).build()),
            JwtResponse.class);

    assertEquals(OK, response.getStatusCode());
    assertNotNull(response.getBody());
    assertNotNull(response.getBody().getAuthorization());
  }

  @Test
  void useInvalidBearer_test() {
    String email = "test@email.com";
    String password = "test-password";
    String invalidBearer = "Bearer invalid.invalid.invalid";

    restTemplate.exchange(
        "/client/register",
        POST,
        new HttpEntity<>(
            ClientRegistrationRequest.builder().username(email).password(password).build()),
        JwtResponse.class);

    HttpHeaders headers = new HttpHeaders();
    headers.set(AUTHORIZATION, invalidBearer);
    ResponseEntity<ClientAuthorisationStatusResponse> response =
        restTemplate.exchange(
            "/client/authorisation-status",
            GET,
            new HttpEntity<>(headers),
            ClientAuthorisationStatusResponse.class);
    assertEquals(FORBIDDEN, response.getStatusCode());
  }

  @Test
  void useValidBearer_test() {
    String email = "test@email.com";
    String password = "test-password";
    String bearer;

    var registration =
        restTemplate.exchange(
            "/client/register",
            POST,
            new HttpEntity<>(
                ClientRegistrationRequest.builder().username(email).password(password).build()),
            JwtResponse.class);
    bearer = Objects.requireNonNull(registration.getBody()).getAuthorization();

    HttpHeaders headers = new HttpHeaders();
    headers.set(AUTHORIZATION, "Bearer " + bearer);
    ResponseEntity<ClientAuthorisationStatusResponse> response =
        restTemplate.exchange(
            "/client/authorisation-status",
            GET,
            new HttpEntity<>(headers),
            ClientAuthorisationStatusResponse.class);
    assertEquals(OK, response.getStatusCode());
    assertNotNull(response.getBody());
    assertEquals(email, response.getBody().getEmail());
    assertFalse(response.getBody().isEmailVerified());
  }

  @Test
  void useValidBearerToAnotherRole_test() {
    String email = "test@email.com";
    String password = "test-password";
    String bearer;

    var registration =
        restTemplate.exchange(
            "/client/register",
            POST,
            new HttpEntity<>(
                ClientRegistrationRequest.builder().username(email).password(password).build()),
            JwtResponse.class);
    bearer = Objects.requireNonNull(registration.getBody()).getAuthorization();

    HttpHeaders headers = new HttpHeaders();
    headers.set(AUTHORIZATION, bearer);
    ResponseEntity<ClientAuthorisationStatusResponse> response =
        restTemplate.exchange(
            "/super-admin/authorisation-status",
            GET,
            new HttpEntity<>(headers),
            ClientAuthorisationStatusResponse.class);
    assertEquals(FORBIDDEN, response.getStatusCode());
  }

  @Test
  void invalidTokenConfirmEmail_test() {
    String email = "test@email.com";
    String password = "test-password";
    String invalidEmailConfirmToken = "IN-VA-LI-D";

    restTemplate.exchange(
        "/client/register",
        POST,
        new HttpEntity<>(
            ClientRegistrationRequest.builder().username(email).password(password).build()),
        JwtResponse.class);

    ResponseEntity<Object> response =
        restTemplate.exchange(
            "/client/confirm-email",
            POST,
            new HttpEntity<>(
                ClientEmailConfirmRequest.builder().token(invalidEmailConfirmToken).build()),
            Object.class);
    assertEquals(NOT_FOUND, response.getStatusCode());
  }

  @Test
  void validTokenConfirmEmail_test() {
    String email = "test@email.com";
    String password = "test-password";
    AtomicReference<String> token = new AtomicReference<>("TEST-UUID-TEST-UUID");

    doAnswer(
            invocation -> {
              // get second argument (index in `getArgument`, starting from 0)
              String newValue = invocation.getArgument(1).toString();
              token.set(newValue);
              return null;
            })
        .when(clientEmailService)
        .sendConfirmEmail(any(), anyString(), anyString());

    restTemplate.exchange(
        "/client/register",
        POST,
        new HttpEntity<>(
            ClientRegistrationRequest.builder().username(email).password(password).build()),
        JwtResponse.class);

    ResponseEntity<Object> response =
        restTemplate.exchange(
            "/client/confirm-email",
            POST,
            new HttpEntity<>(ClientEmailConfirmRequest.builder().token(token.get()).build()),
            Object.class);
    assertEquals(OK, response.getStatusCode());
  }

  @Test
  void emailConfirmed_test() {
    String email = "test@email.com";
    String password = "test-password";
    AtomicReference<String> token = new AtomicReference<>("TEST-UUID-TEST-UUID");
    String bearer;

    doAnswer(
            invocation -> {
              // get second argument (index in `getArgument`, starting from 0)
              String newValue = invocation.getArgument(1).toString();
              token.set(newValue);
              return null;
            })
        .when(clientEmailService)
        .sendConfirmEmail(any(), anyString(), anyString());

    var registration =
        restTemplate.exchange(
            "/client/register",
            POST,
            new HttpEntity<>(
                ClientRegistrationRequest.builder().username(email).password(password).build()),
            JwtResponse.class);
    bearer = Objects.requireNonNull(registration.getBody()).getAuthorization();

    restTemplate.exchange(
        "/client/confirm-email",
        POST,
        new HttpEntity<>(ClientEmailConfirmRequest.builder().token(token.get()).build()),
        Object.class);

    HttpHeaders headers = new HttpHeaders();
    headers.set(AUTHORIZATION, "Bearer " + bearer);
    ResponseEntity<ClientAuthorisationStatusResponse> response =
        restTemplate.exchange(
            "/client/authorisation-status",
            GET,
            new HttpEntity<>(headers),
            ClientAuthorisationStatusResponse.class);
    assertEquals(OK, response.getStatusCode());
    assertNotNull(response.getBody());
    assertEquals(email, response.getBody().getEmail());
    assertTrue(response.getBody().isEmailVerified());
  }
}
