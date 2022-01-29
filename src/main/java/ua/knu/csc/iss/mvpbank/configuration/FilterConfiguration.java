package ua.knu.csc.iss.mvpbank.configuration;

import ch.qos.logback.access.servlet.TeeFilter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.List;

@Configuration
public class FilterConfiguration {

    @Bean
    public FilterRegistrationBean requestResponseFilter() {

        final FilterRegistrationBean filterRegBean = new FilterRegistrationBean();
        TeeFilter filter = new TeeFilter();
        filterRegBean.setFilter(filter);
        filterRegBean.setUrlPatterns(List.of("*"));
        filterRegBean.setName("Request Response Filter");
        filterRegBean.setAsyncSupported(Boolean.TRUE);
        return filterRegBean;
    }
}
