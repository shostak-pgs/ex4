package org.java.training.helpdesk.service;

import org.java.training.helpdesk.converter.UserConverter;
import org.java.training.helpdesk.dao.UserRepository;
import org.java.training.helpdesk.dto.ActionDto;
import org.java.training.helpdesk.dto.UserCredentialDto;
import org.java.training.helpdesk.dto.UserDto;
import org.java.training.helpdesk.entity.User;
import org.java.training.helpdesk.entity.enums.State;
import org.java.training.helpdesk.exception.NotFoundException;
import org.java.training.helpdesk.exception.NotUniqueException;
import org.java.training.helpdesk.exception.StateException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.Date;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@Transactional(readOnly = true)
public class UserService {

    private final UserRepository userRepository;
    private final UserConverter userConverter;
    private final AuthenticationService authenticationService;

    public UserService(UserRepository userRepository, UserConverter userConverter, AuthenticationService authenticationService) {
        this.userRepository = userRepository;
        this.userConverter = userConverter;
        this.authenticationService = authenticationService;
    }

    public UserDto getUserById(Long id) {
        User user = userRepository.findById(id).orElseThrow(() -> new NotFoundException(User.class, id));
        return userConverter.toDto(user);
    }

    public UserDto getUser(String email) {
        User user = userRepository.findUserByEmail(email).orElseThrow(() -> new NotFoundException(User.class, email));
        return userConverter.toDto(user);
    }

    public Set<UserDto> getUsers() {
        return userRepository.findAll()
                .stream()
                .map(userConverter::toDto)
                .collect(Collectors.toSet());
    }

    @Transactional(noRollbackFor = StateException.class)
    public Set<UserDto> updateUsers(ActionDto dto) {
        State state = State.fromAction(dto.getAction()).orElseThrow(() -> new NotFoundException(State.class,
                dto.getSelected()));
        dto.getSelected()
                .forEach((key, value) -> userRepository.findById(key).ifPresent(user -> {
                    user.setState(state);
                    userRepository.save(user);
                }));
        if (state.equals(State.BLOCKED)) {
            if(authenticationService.logoutIfBlocked(dto.getSelected().keySet())) {
                throw new StateException("User was blocked");
            }
        }
        return getUsers();
    }

    @Transactional
    public UserDto create(UserDto dto) {
        userRepository.findUserByEmail(dto.getEmail()).ifPresent(NotUniqueException::new);
        userRepository.save(userConverter.fromDto(dto));
        UserDto created  = authenticationService.authenticate(new UserCredentialDto(dto.getEmail(), dto.getPassword()));
        return setActive(created);
    }

    @Transactional(noRollbackFor = StateException.class)
    public Set<UserDto> deleteUsers(Set<Long> idSet) {
        idSet.forEach(userRepository::deleteById);
        if(authenticationService.logoutIfBlocked(idSet)) {

            throw new StateException("User was removed");
        }
        return getUsers();
    }

    @Transactional
    public UserDto setActive(UserDto dto) {
        User user = userRepository.findById(dto.getId()).orElseThrow(() -> new NotFoundException(User.class, dto.getId()));
        user.setLoginDate(new Date());
        user.setState(State.UNBLOCKED);
        dto.setLoginDate(new Date());
        dto.setState(State.UNBLOCKED);
        userRepository.save(user);
        return dto;
    }
}