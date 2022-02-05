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
import ua.knu.csc.iss.mvpbank.dto.request.SuperAdminEmailConfirmRequest;
import ua.knu.csc.iss.mvpbank.dto.request.SuperAdminLoginRequest;
import ua.knu.csc.iss.mvpbank.dto.request.SuperAdminRegistrationRequest;
import ua.knu.csc.iss.mvpbank.dto.response.JwtResponse;
import ua.knu.csc.iss.mvpbank.dto.response.SuperAdminAuthorisationStatusResponse;
import ua.knu.csc.iss.mvpbank.service.EmailService;

import java.util.Objects;
import java.util.concurrent.atomic.AtomicReference;

import static org.junit.jupiter.api.Assertions.*;
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
public class SuperAdminAuthorisationIntegrationTest {
  @Autowired TestRestTemplate restTemplate;
  @MockBean EmailService emailService;

  @Test
  void notExistUserLogin_test() {
    String email = "test@email.com";
    String password = "test-password";

    ResponseEntity<JwtResponse> response =
        restTemplate.exchange(
            "/super-admin/login",
            POST,
            new HttpEntity<>(
                SuperAdminLoginRequest.builder().username(email).password(password).build()),
            JwtResponse.class);
    assertEquals(NOT_FOUND, response.getStatusCode());
  }

  @Test
  void newtUserRegister_test() {
    String email = "test@email.com";
    String password = "test-password";

    ResponseEntity<JwtResponse> response =
        restTemplate.exchange(
            "/super-admin/register",
            POST,
            new HttpEntity<>(
                SuperAdminRegistrationRequest.builder().username(email).password(password).build()),
            JwtResponse.class);
    assertEquals(OK, response.getStatusCode());
    assertNotNull(response.getBody());
    assertNotNull(response.getBody().getAuthorization());
    assertEquals("Bearer ", response.getBody().getAuthorization().substring(0, 7));
  }

  @Test
  void existUserTryRegisterAgain_test() {
    String email = "test@email.com";
    String password = "test-password";

    restTemplate.exchange(
        "/super-admin/register",
        POST,
        new HttpEntity<>(
            SuperAdminRegistrationRequest.builder().username(email).password(password).build()),
        JwtResponse.class);
    ResponseEntity<JwtResponse> response =
        restTemplate.exchange(
            "/super-admin/register",
            POST,
            new HttpEntity<>(
                SuperAdminRegistrationRequest.builder().username(email).password(password).build()),
            JwtResponse.class);
    assertEquals(CONFLICT, response.getStatusCode());
  }

  @Test
  void existUserTryLoginWithWrongPassword_test() {
    String email = "test@email.com";
    String invalidPassword = "invalid-password";
    String validPassword = "test-password";

    restTemplate.exchange(
        "/super-admin/register",
        POST,
        new HttpEntity<>(
            SuperAdminRegistrationRequest.builder()
                .username(email)
                .password(validPassword)
                .build()),
        JwtResponse.class);

    ResponseEntity<JwtResponse> response =
        restTemplate.exchange(
            "/super-admin/login",
            POST,
            new HttpEntity<>(
                SuperAdminLoginRequest.builder().username(email).password(invalidPassword).build()),
            JwtResponse.class);
    assertEquals(FORBIDDEN, response.getStatusCode());
  }

  @Test
  void existUserLoginCorrectly_test() {
    String email = "test@email.com";
    String password = "test-password";

    restTemplate.exchange(
        "/super-admin/register",
        POST,
        new HttpEntity<>(
            SuperAdminRegistrationRequest.builder().username(email).password(password).build()),
        JwtResponse.class);

    ResponseEntity<JwtResponse> response =
        restTemplate.exchange(
            "/super-admin/login",
            POST,
            new HttpEntity<>(
                SuperAdminLoginRequest.builder().username(email).password(password).build()),
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
        "/super-admin/register",
        POST,
        new HttpEntity<>(
            SuperAdminRegistrationRequest.builder().username(email).password(password).build()),
        JwtResponse.class);

    HttpHeaders headers = new HttpHeaders();
    headers.set(AUTHORIZATION, invalidBearer);
    ResponseEntity<SuperAdminAuthorisationStatusResponse> response =
        restTemplate.exchange(
            "/super-admin/authorisation-status",
            GET,
            new HttpEntity<>(headers),
            SuperAdminAuthorisationStatusResponse.class);
    assertEquals(FORBIDDEN, response.getStatusCode());
  }

  @Test
  void useValidBearer_test() {
    String email = "test@email.com";
    String password = "test-password";
    String bearer;

    var registration =
        restTemplate.exchange(
            "/super-admin/register",
            POST,
            new HttpEntity<>(
                SuperAdminRegistrationRequest.builder().username(email).password(password).build()),
            JwtResponse.class);
    bearer = Objects.requireNonNull(registration.getBody()).getAuthorization();

    HttpHeaders headers = new HttpHeaders();
    headers.set(AUTHORIZATION, bearer);
    ResponseEntity<SuperAdminAuthorisationStatusResponse> response =
        restTemplate.exchange(
            "/super-admin/authorisation-status",
            GET,
            new HttpEntity<>(headers),
            SuperAdminAuthorisationStatusResponse.class);
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
            "/super-admin/register",
            POST,
            new HttpEntity<>(
                SuperAdminRegistrationRequest.builder().username(email).password(password).build()),
            JwtResponse.class);
    bearer = Objects.requireNonNull(registration.getBody()).getAuthorization();

    HttpHeaders headers = new HttpHeaders();
    headers.set(AUTHORIZATION, bearer);
    ResponseEntity<SuperAdminAuthorisationStatusResponse> response =
        restTemplate.exchange(
            "/client/authorisation-status",
            GET,
            new HttpEntity<>(headers),
            SuperAdminAuthorisationStatusResponse.class);
    assertEquals(FORBIDDEN, response.getStatusCode());
  }

  @Test
  void invalidTokenConfirmEmail_test() {
    String email = "test@email.com";
    String password = "test-password";
    String invalidEmailConfirmToken = "IN-VA-LI-D";

    restTemplate.exchange(
        "/super-admin/register",
        POST,
        new HttpEntity<>(
            SuperAdminRegistrationRequest.builder().username(email).password(password).build()),
        JwtResponse.class);

    ResponseEntity<Object> response =
        restTemplate.exchange(
            "/super-admin/confirm-email",
            POST,
            new HttpEntity<>(
                SuperAdminEmailConfirmRequest.builder().token(invalidEmailConfirmToken).build()),
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
              token.set(invocation.getArgument(0).toString());
              return null;
            })
        .when(emailService)
        .sendConfirmEmail(anyString());

    restTemplate.exchange(
        "/super-admin/register",
        POST,
        new HttpEntity<>(
            SuperAdminRegistrationRequest.builder().username(email).password(password).build()),
        JwtResponse.class);

    ResponseEntity<Object> response =
        restTemplate.exchange(
            "/super-admin/confirm-email",
            POST,
            new HttpEntity<>(SuperAdminEmailConfirmRequest.builder().token(token.get()).build()),
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
              token.set(invocation.getArgument(0).toString());
              return null;
            })
        .when(emailService)
        .sendConfirmEmail(anyString());

    var registration =
        restTemplate.exchange(
            "/super-admin/register",
            POST,
            new HttpEntity<>(
                SuperAdminRegistrationRequest.builder().username(email).password(password).build()),
            JwtResponse.class);
    bearer = Objects.requireNonNull(registration.getBody()).getAuthorization();

    restTemplate.exchange(
        "/super-admin/confirm-email",
        POST,
        new HttpEntity<>(SuperAdminEmailConfirmRequest.builder().token(token.get()).build()),
        Object.class);

    HttpHeaders headers = new HttpHeaders();
    headers.set(AUTHORIZATION, bearer);
    ResponseEntity<SuperAdminAuthorisationStatusResponse> response =
        restTemplate.exchange(
            "/super-admin/authorisation-status",
            GET,
            new HttpEntity<>(headers),
            SuperAdminAuthorisationStatusResponse.class);
    assertEquals(OK, response.getStatusCode());
    assertNotNull(response.getBody());
    assertEquals(email, response.getBody().getEmail());
    assertTrue(response.getBody().isEmailVerified());
  }
}
