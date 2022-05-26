package ua.knu.csc.iss.mvpbank.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.I_AM_A_TEAPOT)
public class IAmATeapotException extends RuntimeException {
  public IAmATeapotException(String message) {
    super(message);
  }
}
