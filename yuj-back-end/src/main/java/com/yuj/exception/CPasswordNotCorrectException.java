package com.yuj.exception;

public class CPasswordNotCorrectException extends  RuntimeException {
    public CPasswordNotCorrectException(String message, Throwable cause) {
        super(message, cause);
    }

    public CPasswordNotCorrectException(String message) {
        super(message);
    }

    public CPasswordNotCorrectException() {
        super();
    }
}
