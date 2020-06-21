package org.java.training.helpdesk.controller;

import org.java.training.helpdesk.dto.UserCredentialDto;
import org.java.training.helpdesk.dto.UserDto;
import org.java.training.helpdesk.service.AuthenticationService;
import org.java.training.helpdesk.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import javax.validation.Valid;

@RestController
@RequestMapping("/app")
public class AuthenticationController {

    private final AuthenticationService authService;
    private final UserService userService;

    public AuthenticationController(AuthenticationService authService, UserService userService) {
        this.authService = authService;
        this.userService = userService;
    }

    @PostMapping(value = "/login")
    public ResponseEntity<UserDto> login(@Valid @RequestBody final UserCredentialDto credentialDto) {
        UserDto dto = userService.setActive(authService.authenticate(credentialDto));
        return ResponseEntity.ok(dto);
    }

    @GetMapping(value = "/logoutSuccessfull")
    public ResponseEntity logout() {
        SecurityContextHolder.clearContext();
        return ResponseEntity.ok().build();
    }
}