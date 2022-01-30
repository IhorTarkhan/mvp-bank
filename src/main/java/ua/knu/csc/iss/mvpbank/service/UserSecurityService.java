package ua.knu.csc.iss.mvpbank.service;

import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import ua.knu.csc.iss.mvpbank.entity.Client;
import ua.knu.csc.iss.mvpbank.entity.SuperAdmin;

@Service
public class UserSecurityService {
  public Client getCurrentClient() {
    Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
    return (Client) principal;
  }

  public SuperAdmin getCurrentSuperAdmin() {
    Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
    return (SuperAdmin) principal;
  }
}
