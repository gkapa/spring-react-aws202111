package com.carma.hanppopen.config.jwt;

import com.carma.hanppopen.infra.entity.TUser;
import com.carma.hanppopen.infra.repository.TUserRepo;
import io.jsonwebtoken.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.*;
import java.util.stream.Collectors;

@Component
public class JwtTokenProvider {

    @Value("${jwt.secret-key}")
    private String secretKey;

    @Value("${jwt.expiration-ms}")
    private long ACCESS_TOKEN_VALID_TIME;

    @Value("${jwt.refresh-ms}")
    private long REFRESH_TOKEN_VALID_TIME;

    @Value("${jwt.token-header}")
    private String JWT_HEADER;

    @Value("${jwt.access-token-name}")
    private String ACCESS_TOKEN_NAME;

    @Value("${jwt.refresh-token-name}")
    private String REFRESH_TOKEN_NAME;

    @Value("${app.mode}")
    private String APP_MODE;

    private UserDetailsService userDetailsService;
    private TUserRepo tUserRepo;

    @Autowired
    public JwtTokenProvider(UserDetailsService userDetailsService, TUserRepo tUserRepo) {
        this.userDetailsService = userDetailsService;
        this.tUserRepo = tUserRepo;
    }

    @PostConstruct
    protected void init() {
        //객체 초기화. secretKey를 Base64로 인코딩
        secretKey = Base64.getEncoder().encodeToString(secretKey.getBytes());
    }

    public String createAccessToken(TUser user) {
        Claims claims = Jwts.claims().setSubject(Long.toString(user.getUserId())); //JWT payload에 저장되는 정보단위
        claims.put("roles", user.getRole());
        claims.put("email", user.getEmail());
        claims.put("username", user.getUsername());
        Date now = new Date();
        return Jwts.builder()
                .setClaims(claims) //정보 저장
                .setIssuedAt(now) //토큰 발행 시간
                .setExpiration(new Date(now.getTime() + ACCESS_TOKEN_VALID_TIME)) //토큰 만료 시간
                .signWith(SignatureAlgorithm.HS256, secretKey) //사용할 암호화 알고리즘
                .compact();
    }

    public String createAndSaveRefreshToken(TUser user) {
        Claims claims = Jwts.claims().setSubject(Long.toString(user.getUserId()));
        String value = UUID.randomUUID().toString().replace("-", "");
        claims.put("value", value);
        Date now = new Date();

        String refreshToken = Jwts.builder()
                .setClaims(claims) //정보 저장
                .setIssuedAt(now) //토큰 발행 시간
                .setExpiration(new Date(now.getTime() + REFRESH_TOKEN_VALID_TIME)) //토큰 만료 시간
                .signWith(SignatureAlgorithm.HS256, secretKey) //사용할 암호화 알고리즘
                .compact();
        user.setRefreshToken(value);
        tUserRepo.save(user);
        return refreshToken;
    }

    public void expireAccessAndRefreshToken(HttpServletResponse response) {
        Cookie accessCookie = new Cookie(ACCESS_TOKEN_NAME, "0");
        accessCookie.setPath("/");
        accessCookie.setMaxAge(0);
        response.addCookie(accessCookie);
        Cookie refreshCookie = new Cookie(REFRESH_TOKEN_NAME, "0");
        refreshCookie.setHttpOnly(true);
        refreshCookie.setPath("/");
        refreshCookie.setMaxAge(0);
        response.addCookie(refreshCookie);
    }

    public String reIssueAccessTokenFromRefreshToken(HttpServletResponse response, String refreshToken) throws JwtException {
        Long userId = Long.parseLong(getUserPk(refreshToken));
        TUser tUser = tUserRepo.findByUserId(userId);
        if (!tUser.getRefreshToken().equals(getClaims(refreshToken, "value"))) {
          return null;
        }
        String newAccessToken = createAccessToken(tUser);
        String newRefreshToken = createAndSaveRefreshToken(tUser);
        setCookieToClient(response, newAccessToken, newRefreshToken);
        return newAccessToken;
    }

    public void setCookieToClient(HttpServletResponse response, String accessToken, String refreshToken) {
        Cookie accessCookie = new Cookie(ACCESS_TOKEN_NAME, accessToken);
        if (APP_MODE.equals("prod")) {
            accessCookie.setSecure(true);
        }
        accessCookie.setPath("/");
        accessCookie.setMaxAge((int)((long)ACCESS_TOKEN_VALID_TIME / 1000) + 1);
        response.addCookie(accessCookie);
        Cookie refreshCookie = new Cookie(REFRESH_TOKEN_NAME, refreshToken);
        if (APP_MODE.equals("prod")) {
            refreshCookie.setSecure(true);
        }
        refreshCookie.setHttpOnly(true);
        refreshCookie.setPath("/");
        refreshCookie.setMaxAge((int)((long)REFRESH_TOKEN_VALID_TIME / 1000) + 1);
        response.addCookie(refreshCookie);
    }

    public Authentication getAuthentication(String token) {
        UserDetails userDetails = userDetailsService.loadUserByUsername(this.getUserPk(token));
        return new UsernamePasswordAuthenticationToken(userDetails, "", userDetails.getAuthorities());
    }

    public String[] resolveToken(HttpServletRequest request) {
        // 1. 액세스토큰은 헤더로 받아온다
        // 2. 리프레시토큰은 httponly 쿠키로 받아온다
        String accessToken = request.getHeader(JWT_HEADER);
        String refreshToken = null;

        if (request.getCookies() != null) {
//            Map<String, String> cookieMap = Arrays.stream(request.getCookies())
//                    .collect(Collectors.toMap(Cookie::getName, Cookie::getValue));
//            System.out.println(cookieMap.toString());
//            refreshToken = cookieMap.getOrDefault(REFRESH_TOKEN_NAME, null);

            refreshToken = Arrays.stream(request.getCookies())
                .filter(c -> c.getName().equals(REFRESH_TOKEN_NAME))
                .findFirst()
                .map(Cookie::getValue)
                .orElse(null);
        }


        return new String[]{accessToken, refreshToken};
    }

    public boolean validateToken(String jwtToken) {
        try {
            Jws<Claims> claims = Jwts.parser().setSigningKey(secretKey).parseClaimsJws(jwtToken);
            return !claims.getBody().getExpiration().before(new Date());
        } catch (Exception e) {
            return false;
        }
    }

    private String getUserPk(String token) {
        return Jwts.parser().setSigningKey(secretKey).parseClaimsJws(token).getBody().getSubject();
    }

    public String getClaims(String jwtToken, String key) throws JwtException {
        return Jwts.parser().setSigningKey(secretKey).parseClaimsJws(jwtToken).getBody().get(key, String.class);
    }
}
