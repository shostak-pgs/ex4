package org.java.training.helpdesk.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import org.java.training.helpdesk.entity.enums.Role;
import org.java.training.helpdesk.entity.enums.State;
import javax.validation.constraints.Pattern;
import java.util.Date;
import java.util.Objects;

public class UserDto {
    private static final String DATE_PATTERN = "dd/MM/yyyy HH:mm";
    private static final String EMAIL_PATTERN = "^.+@.*\\..+$";
    private final static String INVALID_PATTERN = "Please make sure you are using a valid email(///@.///)";

    private Long id;
    private String firstName;
    private String lastName;
    private Role role;

    @Pattern(regexp = EMAIL_PATTERN, message = INVALID_PATTERN)
    private String email;
    private String password;

    @JsonFormat(pattern = DATE_PATTERN)
    private Date registrationDate;

    @JsonFormat(pattern = DATE_PATTERN)
    private Date loginDate;

    private State state;
    private String jwt;

    public UserDto(Long id, String firstName, String lastName, Role role,
                   String email, Date registrationDate, Date loginDate, State state) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.role = role;
        this.email = email;
        this.registrationDate = registrationDate;
        this.loginDate = loginDate;
        this.state = state;
    }

    public UserDto(){}

    public Long getId() {
        return id;
    }

    public String getFirstName() {
        return firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public Role getRole() {
        return role;
    }

    public String getEmail() {
        return email;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public void setRole(Role role) {
        this.role = role;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getJwt() {
        return jwt;
    }

    public void setJwt(String jwt) {
        this.jwt = jwt;
    }

    public Date getRegistrationDate() {
        return registrationDate;
    }

    public void setRegistrationDate(Date registrationDate) {
        this.registrationDate = registrationDate;
    }

    public Date getLoginDate() {
        return loginDate;
    }

    public void setLoginDate(Date loginDate) {
        this.loginDate = loginDate;
    }

    public State getState() {
        return state;
    }

    public void setState(State state) {
        this.state = state;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        UserDto userDto = (UserDto) o;
        return Objects.equals(id, userDto.id) &&
                Objects.equals(firstName, userDto.firstName) &&
                Objects.equals(password, userDto.password) &&
                Objects.equals(lastName, userDto.lastName) &&
                role == userDto.role &&
                loginDate == userDto.loginDate &&
                registrationDate == userDto.registrationDate &&
                state == userDto.state &&
                Objects.equals(email, userDto.email);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, firstName, lastName, role, email, loginDate, registrationDate, state, password);
    }

    @Override
    public String toString() {
        return "UserDto{" +
                "id=" + id +
                ", firstName='" + firstName + '\'' +
                ", lastName='" + lastName + '\'' +
                ", role=" + role +
                ", email='" + email + '\'' +
                ", password='" + "******" + '\'' +
                ", state='" + state + '\'' +
                ", registrationDate='" + registrationDate + '\'' +
                ", loginDate='" + loginDate + '\'' +
                '}';
    }
}