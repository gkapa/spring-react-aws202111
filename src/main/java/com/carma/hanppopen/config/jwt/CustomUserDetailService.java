package com.carma.hanppopen.config.jwt;

import com.carma.hanppopen.infra.entity.TUser;
import com.carma.hanppopen.infra.repository.TUserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Arrays;

@Service
public class CustomUserDetailService implements UserDetailsService {

    private final TUserRepo tUserRepo;

    @Autowired
    public CustomUserDetailService(TUserRepo tUserRepo) {
        this.tUserRepo = tUserRepo;
    }

    @Override
    public UserDetails loadUserByUsername(String userId) throws UsernameNotFoundException {
        TUser user = tUserRepo.findByUserId(Long.parseLong(userId));
        if (user == null) {
            throw new UsernameNotFoundException("User: " + userId + " not found");
        }
//        MUser user = mUserRepo.findByEmail(userId)
//                .orElseThrow(() -> new UsernameNotFoundException("User: " + userId + " not found"));
        return new org.springframework.security.core.userdetails.User(user.getEmail(), user.getPassword(),
                Arrays.asList(new SimpleGrantedAuthority("user")));
    }
}