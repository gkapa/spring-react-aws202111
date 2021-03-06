package com.carma.hanppopen.config;

import com.carma.hanppopen.config.jwt.JwtAuthenticationFilter;
import com.carma.hanppopen.config.jwt.JwtTokenProvider;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.factory.PasswordEncoderFactories;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.CorsUtils;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Arrays;
import java.util.Collections;

@Configuration
@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    private JwtTokenProvider jwtTokenProvider;

    @Value("${aws.domain-home}")
    private String DOMAIN_HOME;

    @Value("${app.mode}")
    private String APP_MODE;

    @Autowired
    public SecurityConfig(JwtTokenProvider jwtTokenProvider) {
        this.jwtTokenProvider = jwtTokenProvider;
    }

    @Bean
    public PasswordEncoder passwordEncoder(){
        return PasswordEncoderFactories.createDelegatingPasswordEncoder();
    }

    @Bean
    @Override
    public AuthenticationManager authenticationManagerBean() throws Exception{
        return super.authenticationManagerBean();
    }

    @Override
    protected void configure(HttpSecurity httpSecurity) throws Exception {
        httpSecurity
                .authorizeRequests() //????????? ?????? ?????? ??????
                .requestMatchers(CorsUtils::isPreFlightRequest).permitAll()
                .and()
                .cors()
                .and()
                .httpBasic().disable()
                .csrf().disable()
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS) //?????? ?????? ???????????? ????????? ???????????? ??????
                .and()
                .authorizeRequests()
                .antMatchers("/static/**", "/favicon.ico", "/index.html", "/logo192.png",
                        "/logo512.png", "/manifest.json", "/robots.txt").permitAll()
                .and()
                .authorizeRequests()
//                .antMatchers("/error").permitAll()
                .antMatchers("/", "/error").permitAll()
                .antMatchers("/api/user/**").permitAll()
                .antMatchers("/auth/**").permitAll()
                .antMatchers("/_/**").permitAll()
                .antMatchers("/NotFound").permitAll()
                .anyRequest().authenticated()
//                .anyRequest().permitAll()
                .and()
                .addFilterBefore(new JwtAuthenticationFilter(jwtTokenProvider),
                        UsernamePasswordAuthenticationFilter.class); //JwtAuthenticationFilter??? UsernamePasswordAuthenticationFilter ?????? ??????

        //                .antMatchers("/api/user/**").hasRole("ADMIN")
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        if (APP_MODE.equals("prod")) {
            configuration.setAllowedOrigins(Arrays.asList(DOMAIN_HOME)); // CORS??????????????????????????????????????????
        } else {
            configuration.setAllowedOrigins(Arrays.asList("*"));
//            configuration.setAllowedOrigins(Arrays.asList("localhost:5000", "localhost:3000"));
        }
        configuration.setAllowedMethods(Arrays.asList("GET", "POST"));
        configuration.setAllowedHeaders(Arrays.asList("*"));
//        configuration.setAllowedHeaders(Arrays.asList("Authorization", "content-type", "credentials", JWT_HEADER, "ref-token"));
        configuration.setExposedHeaders(Arrays.asList("*"));
//        configuration.setExposedHeaders(Arrays.asList(JWT_HEADER, "Set-Cookie"));
        configuration.setAllowCredentials(true);  // CORS??????????????????cookie?????????????????????????????????
        configuration.setMaxAge(3600L); //preflight ????????? 1???????????? ????????? ??????
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }

    //    @Value("${jwt.header-name}")
//    private String HEADER_NAME;
//
//    @Bean
//    public PasswordEncoder passwordEncoder() {
//        return PasswordEncoderFactories.createDelegatingPasswordEncoder();
//    }
//
//    @Bean
//    @Override
//    public AuthenticationManager authenticationManagerBean() throws Exception {
//        return super.authenticationManagerBean();
//    }
//
//    @Override
//    protected void configure(HttpSecurity http) throws Exception {
//        // (1)
//        // CORS preflight ????????? ??????????????? ?????? ???????????? ?????????, CORS semantic ????????? CORS prefight??????
//        // Authorization ????????? ??? ????????? ???????????? CORS preflight ????????? ???????????? 401 ????????? ?????? ?????????.
//        // ??? ????????? ????????? ????????? spring-security ????????? ????????? CORS preflight ????????? ??????????????? ???????????? ?????????
//        // ?????? CORS ????????? ??????????????? ??????????????? ?????????. (https://oddpoet.net/blog/2017/04/27/cors-with-spring-security/)
//        //
//        // (2)
//        // spring-security?????? cors??? ??????????????? ????????????. ?????? ?????? ????????? ???????????? Origin ????????? ?????? ?????? ????????? ??????
//        // CORS ????????? ????????? ????????? ?????????.
//
//        http
//                .csrf().disable()  // https://returnbliss.tistory.com/14
//                .formLogin().disable()
//                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)  // https://returnbliss.tistory.com/13?category=467847
//                .and()
//                .authorizeRequests()
//                .requestMatchers(CorsUtils::isPreFlightRequest).permitAll() // (1)
//                .and()
//                .cors() // (2)
//                .and()
//                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
//                .and()
//                .authorizeRequests()
//                .antMatchers("/admin/**").hasRole("ADMIN")
//                .and()
//                .authorizeRequests()
//                .antMatchers(HttpMethod.POST, "/user/sign-up").permitAll()
//                .antMatchers(HttpMethod.POST, "/user/sign-in").permitAll()
//                .antMatchers(HttpMethod.POST, "/user/find-info/**").permitAll()
//                .antMatchers(HttpMethod.POST, "/user/refresh-tokens").permitAll()
//                .antMatchers("/user/check-email-token/**").permitAll()
//                .and()
//                .authorizeRequests()
//                .antMatchers(HttpMethod.POST, "/order/update-progress").permitAll()
//                .antMatchers(HttpMethod.POST, "/admin/**").permitAll()
//                .antMatchers(HttpMethod.POST, "/menu/**").permitAll()
//                .and()
//                .authorizeRequests()
//                .antMatchers(HttpMethod.POST, "/user/change-pw").hasRole("USER")
//                .antMatchers(HttpMethod.POST, "/user/sign-out").hasRole("USER")
//                .antMatchers(HttpMethod.POST, "/user/no-show-count").hasRole("USER")
//                .antMatchers(HttpMethod.POST, "/history/**").hasRole("USER")
//                .antMatchers(HttpMethod.POST, "/my-menu/**").hasRole("USER")
//                .antMatchers(HttpMethod.POST, "/order/add").hasRole("USER")
//                .antMatchers(HttpMethod.POST, "/order/get-progress").hasRole("USER")
//                .anyRequest().authenticated()
//                .and()
//                .addFilterBefore(jwtTokenFilter, UsernamePasswordAuthenticationFilter.class);
//
//    }
//
}