package org.java.training.helpdesk.exception;

public class UserNameNotFoundException extends RuntimeException {
        public UserNameNotFoundException(String str){
            super(str);
        }
    }