package ua.knu.csc.iss.mvpbank.service;

import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import ua.knu.csc.iss.mvpbank.entity.Customer;
import ua.knu.csc.iss.mvpbank.entity.SuperAdmin;

@Service
public class UserSecurityService {
  public Customer getCurrentCustomer() {
    Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
    return (Customer) principal;
  }

  public SuperAdmin getCurrentSuperAdmin() {
    Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
    return (SuperAdmin) principal;
  }
}
