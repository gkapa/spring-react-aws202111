package com.carma.hanppopen.config.jwt;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.GenericFilterBean;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.regex.Pattern;

//public class JwtAuthenticationFilter extends GenericFilterBean {
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private final JwtTokenProvider jwtTokenProvider;

    @Autowired
    public JwtAuthenticationFilter(JwtTokenProvider jwtTokenProvider) {
        this.jwtTokenProvider = jwtTokenProvider;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response,
                                    FilterChain filterChain) throws ServletException, IOException {
//        System.out.println("Filter: httpRequest.......");
        System.out.println(request.getRequestURI());
        if (Pattern.matches("^/api", request.getRequestURI())) {
            String[] jwtTokens = jwtTokenProvider.resolveToken((HttpServletRequest) request);
            String accessToken = jwtTokens[0];
            String refreshToken = jwtTokens[1];
            System.out.println("accessToken: " + accessToken);
            System.out.println("refreshToken: " + refreshToken);
            if (accessToken != null && jwtTokenProvider.validateToken(accessToken)) {
                String newAccessToken = jwtTokenProvider.reIssueAccessTokenFromRefreshToken(response, refreshToken);
                Authentication authentication = jwtTokenProvider.getAuthentication(newAccessToken);
                SecurityContextHolder.getContext().setAuthentication(authentication);
            } else if (refreshToken != null && jwtTokenProvider.validateToken(refreshToken)) {
                String newAccessToken = jwtTokenProvider.reIssueAccessTokenFromRefreshToken(response, refreshToken);
                Authentication authentication = jwtTokenProvider.getAuthentication(newAccessToken);
                SecurityContextHolder.getContext().setAuthentication(authentication);
            }
        }
        filterChain.doFilter(request, response);
    }

//    @Override
//    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException, ServletException {
//
//        String[] jwtTokens = jwtTokenProvider.resolveToken((HttpServletRequest) request);
//        String accessToken = jwtTokens[0];
//        String refreshToken = jwtTokens[1];
//        System.out.println("accessToken: " + accessToken);
//        System.out.println("refreshToken: " + refreshToken);
//
//        if (accessToken != null && jwtTokenProvider.validateToken(accessToken)) {
//            Authentication authentication = jwtTokenProvider.getAuthentication(accessToken);
//            SecurityContextHolder.getContext().setAuthentication(authentication);
//        } else if (refreshToken != null && jwtTokenProvider.validateToken(refreshToken)) {
//
//        }
//
//
//
//        chain.doFilter(request, response);
//    }
}