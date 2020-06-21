package org.java.training.helpdesk.dto;

import javax.validation.constraints.*;
import java.util.Objects;

public class UserCredentialDto {
    private static final String EMAIL_PATTERN = "^.+@.*\\..+$";
    private final static String INVALID_CREDENTIALS = " Please make sure you are using a valid email or password";
    private final static String INVALID_PATTERN = "Please make sure you are using a valid email(///@.///)";

    @NotNull(message = INVALID_CREDENTIALS)
    @Pattern(regexp = EMAIL_PATTERN, message = INVALID_PATTERN)
    private String email;

    @NotNull(message = INVALID_CREDENTIALS)
    private String password;

    public UserCredentialDto(String email, String password) {
        this.email = email;
        this.password = password;
    }

    public UserCredentialDto() {}

    public String getEmail() {
        return email;
    }

    public String getPassword() {
        return password;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        UserCredentialDto userDto = (UserCredentialDto) o;
        return Objects.equals(email, userDto.email) &&
                Objects.equals(password, userDto.password);
    }

    @Override
    public int hashCode() {
        return Objects.hash(email, password);
    }

    @Override
    public String toString() {
        return "UserCredentialDto{" +
                "email='" + email + '\'' +
                ", password='" + "******" + '\'' +
                '}';
    }
}