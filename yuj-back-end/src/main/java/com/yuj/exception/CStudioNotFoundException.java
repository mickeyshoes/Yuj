package com.yuj.exception;

public class CStudioNotFoundException extends  RuntimeException {
    public CStudioNotFoundException(String message, Throwable cause) {
        super(message, cause);
    }

    public CStudioNotFoundException(String message) {
        super(message);
    }

    public CStudioNotFoundException() {
        super();
    }
}
