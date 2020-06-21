package org.java.training.helpdesk.config.security;

import org.java.training.helpdesk.dao.UserRepository;
import org.java.training.helpdesk.entity.User;
import org.java.training.helpdesk.exception.UserNameNotFoundException;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Service;

@Service
public class CustomUserDetailsService implements UserDetailsService {
    private final UserRepository userRepository;

    public CustomUserDetailsService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public CustomUserPrincipal loadUserByUsername(final String email) {
        final User user = userRepository.findUserByEmail(email)
                .orElseThrow(() -> new UserNameNotFoundException(String.format("User with email %d not found", email)));
        return new CustomUserPrincipal(user);
    }
}