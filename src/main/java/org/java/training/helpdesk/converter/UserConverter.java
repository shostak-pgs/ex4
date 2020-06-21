package org.java.training.helpdesk.converter;

import org.java.training.helpdesk.dto.UserDto;
import org.java.training.helpdesk.entity.User;
import org.java.training.helpdesk.entity.enums.Role;
import org.java.training.helpdesk.entity.enums.State;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
public class UserConverter {

    private final PasswordEncoder passwordEncoder;

    public UserConverter(PasswordEncoder passwordEncoder) {
        this.passwordEncoder = passwordEncoder;
    }

    public UserDto toDto(final User entity) {
        return new UserDto(entity.getId(), entity.getFirstName(), entity.getLastName(), entity.getRole(),
                entity.getEmail(), entity.getRegistrationDate(), entity.getLoginDate(), entity.getState());
    }

    public User fromDto(final UserDto dto) {
        return new User(dto.getFirstName(), dto.getLastName(), Role.EMPLOYEE, dto.getEmail(),
                passwordEncoder.encode(dto.getPassword()), State.UNBLOCKED);
    }
}