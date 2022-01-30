package ua.knu.csc.iss.mvpbank.security;

import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.BeanIds;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import ua.knu.csc.iss.mvpbank.entity.Client;
import ua.knu.csc.iss.mvpbank.entity.SuperAdmin;
import ua.knu.csc.iss.mvpbank.security.filter.ClientSecurityFilter;
import ua.knu.csc.iss.mvpbank.security.filter.SuperAdminSecurityFilter;

import static org.springframework.http.HttpMethod.OPTIONS;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
@EnableGlobalMethodSecurity(prePostEnabled = true, jsr250Enabled = true, securedEnabled = true)
public class SecurityConfiguration extends WebSecurityConfigurerAdapter {
  private final ClientSecurityFilter clientSecurityFilter;
  private final SuperAdminSecurityFilter superAdminSecurityFilter;
  private final UserDetailsService userService;

  @Override
  public void configure(AuthenticationManagerBuilder authenticationManagerBuilder)
      throws Exception {
    authenticationManagerBuilder.userDetailsService(userService).passwordEncoder(passwordEncoder());
  }

  @Override
  protected void configure(HttpSecurity http) throws Exception {
    http
        // disable csrf
        .csrf()
        .disable()
        // make stateless
        .sessionManagement()
        .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
        .and()
        // add filters
        .addFilterBefore(clientSecurityFilter, UsernamePasswordAuthenticationFilter.class)
        .addFilterBefore(superAdminSecurityFilter, UsernamePasswordAuthenticationFilter.class)
        // permit OPTIONS request
        .authorizeRequests()
        .antMatchers(OPTIONS, "/**")
        .permitAll()
        // set access to "CLIENT" role
        .antMatchers("/client/register", "/client/login", "/client/confirm-email")
        .permitAll()
        .antMatchers("/client/**")
        .hasRole(Client.ROLE)
        // set access to "SUPER_ADMIN" role
        .antMatchers("/super-admin/register", "/super-admin/login", "/super-admin/confirm-email")
        .permitAll()
        .antMatchers("/super-admin/**")
        .hasRole(SuperAdmin.ROLE)
        // permit all left request
        .anyRequest()
        .permitAll();
  }

  @Bean
  public PasswordEncoder passwordEncoder() {
    return new BCryptPasswordEncoder();
  }

  @Bean(BeanIds.AUTHENTICATION_MANAGER)
  @Override
  public AuthenticationManager authenticationManagerBean() throws Exception {
    return super.authenticationManagerBean();
  }
}
