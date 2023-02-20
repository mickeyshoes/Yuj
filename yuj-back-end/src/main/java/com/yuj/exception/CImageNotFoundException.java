package com.yuj.exception;

public class CImageNotFoundException extends  RuntimeException {
    public CImageNotFoundException(String message, Throwable cause) {
        super(message, cause);
    }

    public CImageNotFoundException(String message) {
        super(message);
    }

    public CImageNotFoundException() {
        super();
    }
}
