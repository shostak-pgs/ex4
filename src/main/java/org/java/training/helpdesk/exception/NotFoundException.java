package org.java.training.helpdesk.exception;

public class NotFoundException  extends RuntimeException {
    public NotFoundException(Class clazz, Object obj) {
        super(String.format("%s with id %d not found", clazz, obj));
    }
}