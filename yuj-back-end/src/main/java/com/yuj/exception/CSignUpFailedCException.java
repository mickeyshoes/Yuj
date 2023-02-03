package com.yuj.exception;

public class CSignUpFailedCException extends RuntimeException {
    public CSignUpFailedCException() {}

    public CSignUpFailedCException(String message) {
        super(message);
    }

    public CSignUpFailedCException(String message, Throwable cause) {
        super(message, cause);
    }
}
