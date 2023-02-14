package com.yuj.exception;

public class CLectureNotFoundException extends  RuntimeException {
    public CLectureNotFoundException(String message, Throwable cause) {
        super(message, cause);
    }

    public CLectureNotFoundException(String message) {
        super(message);
    }

    public CLectureNotFoundException() {
        super();
    }
}
