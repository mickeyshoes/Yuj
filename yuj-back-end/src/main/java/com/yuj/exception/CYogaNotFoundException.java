package com.yuj.exception;

public class CYogaNotFoundException extends  RuntimeException {
    public CYogaNotFoundException(String message, Throwable cause) {
        super(message, cause);
    }

    public CYogaNotFoundException(String message) {
        super(message);
    }

    public CYogaNotFoundException() {
        super();
    }
}
