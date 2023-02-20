package com.yuj.exception;

public class CUserLectureScheduleNotFoundException extends  RuntimeException {
    public CUserLectureScheduleNotFoundException(String message, Throwable cause) {
        super(message, cause);
    }

    public CUserLectureScheduleNotFoundException(String message) {
        super(message);
    }

    public CUserLectureScheduleNotFoundException() {
        super();
    }
}
