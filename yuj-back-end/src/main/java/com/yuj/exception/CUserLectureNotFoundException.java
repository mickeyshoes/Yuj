package com.yuj.exception;

public class CUserLectureNotFoundException extends  RuntimeException {
    public CUserLectureNotFoundException(String message, Throwable cause) {
        super(message, cause);
    }

    public CUserLectureNotFoundException(String message) {
        super(message);
    }

    public CUserLectureNotFoundException() {
        super();
    }
}