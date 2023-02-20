package com.yuj.exception;

public class CLectureScheduleNotFoundException extends  RuntimeException {
    public CLectureScheduleNotFoundException(String message, Throwable cause) {
        super(message, cause);
    }

    public CLectureScheduleNotFoundException(String message) {
        super(message);
    }

    public CLectureScheduleNotFoundException() {
        super();
    }
}
