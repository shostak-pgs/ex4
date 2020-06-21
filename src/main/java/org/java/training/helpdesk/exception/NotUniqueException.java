package org.java.training.helpdesk.exception;

import org.java.training.helpdesk.entity.User;

public class NotUniqueException extends RuntimeException {
    public NotUniqueException(User user) {
        super("The email must to be unique");
    }

    public NotUniqueException() {
        super("The email must to be unique");
    }
}