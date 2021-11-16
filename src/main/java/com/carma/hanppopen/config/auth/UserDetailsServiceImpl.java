package com.carma.hanppopen.config.auth;

import com.carma.hanppopen.infra.entity.MUserEntity;
import com.carma.hanppopen.infra.repository.MUserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Arrays;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {

    private MUserRepository mUserRepository;

    @Autowired
    public UserDetailsServiceImpl(MUserRepository mUserRepository) {
        this.mUserRepository = mUserRepository;
    }

    // 참고:
    // https://www.devdiaries.net/blog/Spring-Boot-2-PostgreSQL-JWT-React-Part-3/
    // https://oingdaddy.tistory.com/206
    @Override
    public UserDetails loadUserByUsername(String userName) throws UsernameNotFoundException {
        MUserEntity user = mUserRepository.findByUsername(userName)
                .orElseThrow(() -> new UsernameNotFoundException("User: " + userName + " not found"));
        return new org.springframework.security.core.userdetails.User(user.getUsername(), user.getPassword(),
                Arrays.asList(new SimpleGrantedAuthority("user")));
    }
}