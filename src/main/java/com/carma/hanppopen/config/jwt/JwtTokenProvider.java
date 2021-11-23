package com.carma.hanppopen.config.jwt;

import io.jsonwebtoken.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;
import javax.servlet.http.HttpServletRequest;
import java.util.Base64;
import java.util.Date;
import java.util.List;

@Component
public class JwtTokenProvider {

    @Value("${jwt.secret-key}")
    private String secretKey;

    @Value("${jwt.expiration-ms}")
    private long ACCESS_TOKEN_VALID_TIME;

    @Value("${jwt.refresh-ms}")
    private long REFRESH_TOKEN_VALID_TIME;

    @Value("${jwt.header-name}")
    private String HEADER_NAME;

    private UserDetailsService userDetailsService;

    @Autowired
    public JwtTokenProvider(UserDetailsService userDetailsService) {
        this.userDetailsService = userDetailsService;
    }

    //객체 초기화. secretKey를 Base64로 인코딩
    @PostConstruct
    protected void init() {
        secretKey = Base64.getEncoder().encodeToString(secretKey.getBytes());
    }

    //JWT access token 생성
    public String createAccessToken(String userPk, List<String> roles) {
        Claims claims = Jwts.claims().setSubject(userPk); //JWT payload에 저장되는 정보단위
        claims.put("roles", roles); //key - value 쌍으로 저장
        Date now = new Date();
        return Jwts.builder()
                .setClaims(claims) //정보 저장
                .setIssuedAt(now) //토큰 발행 시간
                .setExpiration(new Date(now.getTime() + ACCESS_TOKEN_VALID_TIME)) //토큰 만료 시간
                .signWith(SignatureAlgorithm.HS256, secretKey) //사용할 암호화 알고리즘
                .compact();
    }

    //JWT refresh token 생성
    public String createRefreshToken(String value){
        Claims claims = Jwts.claims();
        claims.put("value", value);
        Date now = new Date();
        return Jwts.builder()
                .setClaims(claims) //정보 저장
                .setIssuedAt(now) //토큰 발행 시간
                .setExpiration(new Date(now.getTime() + REFRESH_TOKEN_VALID_TIME)) //토큰 만료 시간
                .signWith(SignatureAlgorithm.HS256, secretKey) //사용할 암호화 알고리즘
                .compact();
    }

    //JWT 토큰에서 인증 정보 조회
    public Authentication getAuthentication(String token) {
        UserDetails userDetails = userDetailsService.loadUserByUsername(this.getUserPk(token));
        return new UsernamePasswordAuthenticationToken(userDetails, "", userDetails.getAuthorities());
    }

    //토큰에서 회원 정보 얻어내기
    private String getUserPk(String token) {
        return Jwts.parser().setSigningKey(secretKey).parseClaimsJws(token).getBody().getSubject();
    }

    //Request의 Header에서 token 값 가져오기. "X-AUTH-TOKEN" : "TOKEN값"
    public String resolveToken(HttpServletRequest request) {
        return request.getHeader(HEADER_NAME);
    }

    //토큰의 유효성과 만료일자 확인
    public boolean validateToken(String jwtToken) {
        try {
            Jws<Claims> claims = Jwts.parser().setSigningKey(secretKey).parseClaimsJws(jwtToken);
            return !claims.getBody().getExpiration().before(new Date()); //만료일자
        } catch (Exception e) { //유효성
            return false;
        }
    }

    //refresh token 정보 얻어내기
    public Claims getClaimsFromJwtToken(String jwtToken) throws JwtException {
        return Jwts.parser().setSigningKey(secretKey).parseClaimsJws(jwtToken).getBody();
    }
}
