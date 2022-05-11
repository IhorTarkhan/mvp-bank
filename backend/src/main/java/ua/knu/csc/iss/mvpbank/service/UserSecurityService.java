package ua.knu.csc.iss.mvpbank.service;

import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import ua.knu.csc.iss.mvpbank.entity.Client;
import ua.knu.csc.iss.mvpbank.entity.Admin;

@Service
public class UserSecurityService {
  public Client getCurrentClient() {
    Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
    return (Client) principal;
  }

  public Admin getCurrentAdmin() {
    Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
    return (Admin) principal;
  }
}
