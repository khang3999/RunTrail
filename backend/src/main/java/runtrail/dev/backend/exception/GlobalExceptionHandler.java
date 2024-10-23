package runtrail.dev.backend.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import runtrail.dev.backend.dto.response.ErrorResponse;

@ControllerAdvice
public class GlobalExceptionHandler {


    @ExceptionHandler(ErrorExceptionHandler.class)
    public ResponseEntity<?> handleGlobalExceptionHandler(ErrorExceptionHandler handler) {
        ErrorResponse errorResponse = new ErrorResponse(handler.getMessage(),handler.getStatusCode());
        return new ResponseEntity<>(errorResponse, HttpStatus.valueOf(handler.getStatusCode()));
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<?> handleGlobalException(Exception ex) {
        ErrorResponse errorResponse = new ErrorResponse(ex.getMessage(),400);
        return new ResponseEntity<>(errorResponse, HttpStatus.valueOf(400));
    }
}
