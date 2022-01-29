package ua.knu.csc.iss.mvpbank.configuration;

import ch.qos.logback.access.servlet.TeeFilter;
import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.Collections;

@Configuration
public class FilterConfiguration {
  @Bean
  public FilterRegistrationBean<TeeFilter> requestResponseFilter() {
    var filterRegBean = new FilterRegistrationBean<>(new TeeFilter());
    filterRegBean.setUrlPatterns(Collections.singleton("*"));
    filterRegBean.setAsyncSupported(Boolean.TRUE);
    return filterRegBean;
  }
}
