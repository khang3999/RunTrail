package runtrail.dev.backend.dto.response;


public class Response<T>{
    private T metadata;
    private int statusCode;
    private String message;
}
