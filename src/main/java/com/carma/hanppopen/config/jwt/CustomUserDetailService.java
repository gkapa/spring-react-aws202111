package com.carma.hanppopen.config.jwt;

import com.carma.hanppopen.infra.entity.MUser;
import com.carma.hanppopen.infra.repository.MUserRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Arrays;

@Service
public class CustomUserDetailService implements UserDetailsService {

    private final MUserRepo mUserRepo;

    @Autowired
    public CustomUserDetailService(MUserRepo mUserRepo) {
        this.mUserRepo = mUserRepo;
    }

    @Override
    public UserDetails loadUserByUsername(String userId) throws UsernameNotFoundException {
        MUser user = mUserRepo.findByUserId(Long.parseLong(userId));
        if (user == null) {
            throw new UsernameNotFoundException("User: " + userId + " not found");
        }
//        MUser user = mUserRepo.findByEmail(userId)
//                .orElseThrow(() -> new UsernameNotFoundException("User: " + userId + " not found"));
        return new org.springframework.security.core.userdetails.User(user.getEmail(), user.getPassword(),
                Arrays.asList(new SimpleGrantedAuthority("user")));
    }
}