package org.java.training.helpdesk.controller;

import org.hibernate.service.spi.ServiceException;
import org.java.training.helpdesk.dto.ActionDto;
import org.java.training.helpdesk.dto.UserDto;
import org.java.training.helpdesk.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.Set;

@RestController
@RequestMapping("/app/users")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/{id}")
    public ResponseEntity<UserDto> getUser(@PathVariable final Long id) throws ServiceException {
        return ResponseEntity.ok(userService.getUserById(id));
    }

    @GetMapping
    public ResponseEntity<Set<UserDto>> getUsers() {
        return ResponseEntity.ok(userService.getUsers());
    }

    @PutMapping
    public ResponseEntity<Set<UserDto>> update(final HttpServletRequest request,
                                               @RequestBody final ActionDto dto) throws URISyntaxException {
        return ResponseEntity.ok().location(new URI(request.getRequestURI())).body(userService.updateUsers(dto));
    }

    @PostMapping
    public ResponseEntity<UserDto> create(final HttpServletRequest request,
                                          @Valid @RequestBody final UserDto dto) throws URISyntaxException {
        UserDto created = userService.create(dto);
        return ResponseEntity.ok().location(new URI(request.getRequestURI())).body(created);
    }

    @DeleteMapping
    public ResponseEntity<Set<UserDto>> delete(@RequestHeader final Set<Long> data) {
        return ResponseEntity.ok(userService.deleteUsers(data));
    }
}