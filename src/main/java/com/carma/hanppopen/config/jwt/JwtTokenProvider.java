package com.carma.hanppopen.config.jwt;

import com.carma.hanppopen.infra.entity.MUser;
import com.carma.hanppopen.infra.repository.MUserRepo;
import io.jsonwebtoken.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;
import javax.servlet.ServletResponse;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.*;

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

    private UserDetailsService userDetailsService;
    private MUserRepo mUserRepo;

    @Autowired
    public JwtTokenProvider(UserDetailsService userDetailsService, MUserRepo mUserRepo) {
        this.userDetailsService = userDetailsService;
        this.mUserRepo = mUserRepo;
    }

    @PostConstruct
    protected void init() {
        //객체 초기화. secretKey를 Base64로 인코딩
        secretKey = Base64.getEncoder().encodeToString(secretKey.getBytes());
    }

    public String createAccessToken(MUser user) {
        Claims claims = Jwts.claims().setSubject(Long.toString(user.getUserId())); //JWT payload에 저장되는 정보단위
        claims.put("roles", user.getRole()); //key - value 쌍으로 저장
        claims.put("username", user.getUsername());
        Date now = new Date();
        return Jwts.builder()
                .setClaims(claims) //정보 저장
                .setIssuedAt(now) //토큰 발행 시간
                .setExpiration(new Date(now.getTime() + ACCESS_TOKEN_VALID_TIME)) //토큰 만료 시간
                .signWith(SignatureAlgorithm.HS256, secretKey) //사용할 암호화 알고리즘
                .compact();
    }

    //JWT refresh token 생성
    public String createAndSaveRefreshToken(MUser user) {
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
        mUserRepo.save(user);
        return refreshToken;
    }

    public String reIssueAccessTokenFromRefreshToken(HttpServletResponse response, String refreshToken) throws JwtException {
        Long userId = Long.parseLong(getUserPk(refreshToken));
        MUser mUser = mUserRepo.findByUserId(userId);
        System.out.println("---------....");
        System.out.println(getClaims(refreshToken, "value"));
        System.out.println(mUser.getRefreshToken());
        if (!mUser.getRefreshToken().equals(getClaims(refreshToken, "value"))) {
          return null;
        }
        System.out.println("---------..xxxxx..");
        String newAccessToken = createAccessToken(mUser);
        String newRefreshToken = createAndSaveRefreshToken(mUser);
        setCookieToClient(response, newAccessToken, newRefreshToken);
        return newAccessToken;
    }

    public void setCookieToClient(HttpServletResponse response, String accessToken, String refreshToken) {
        Cookie accessCookie = new Cookie(ACCESS_TOKEN_NAME, accessToken);
//        accessCookie.setSecure(true);
        accessCookie.setPath("/");
        accessCookie.setMaxAge((int)((long)ACCESS_TOKEN_VALID_TIME / 1000) + 1);
        response.addCookie(accessCookie);
        Cookie refreshCookie = new Cookie(REFRESH_TOKEN_NAME, refreshToken);
//        refreshCookie.setSecure(true);
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
        String refreshToken = Arrays.stream(request.getCookies())
                .filter(c -> c.getName().equals(REFRESH_TOKEN_NAME))
                .findFirst()
                .map(Cookie::getValue)
                .orElse(null);
        return new String[]{accessToken, refreshToken};
    }

    public boolean validateToken(String jwtToken) {
        try {
            Jws<Claims> claims = Jwts.parser().setSigningKey(secretKey).parseClaimsJws(jwtToken);
            return !claims.getBody().getExpiration().before(new Date()); //만료일자
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
