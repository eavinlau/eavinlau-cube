package com.eavinlau.cube.exception;

public class AJCubeException extends RuntimeException {

    public AJCubeException(String message) {
        super(message);
    }

    public AJCubeException(String message, Throwable cause) {
        super(message, cause);
    }
}
