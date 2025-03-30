package com.accountshop.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ApiResponse<T> {
    
    private Integer code;
    private String message;
    private T data;
    
    public static <T> ApiResponse<T> success(T data) {
        return new ApiResponse<>(200, "操作成功", data);
    }
    
    public static <T> ApiResponse<T> success(String message, T data) {
        return new ApiResponse<>(200, message, data);
    }
    
    public static ApiResponse<?> success() {
        return new ApiResponse<>(200, "操作成功", null);
    }
    
    public static ApiResponse<?> error(String message) {
        return new ApiResponse<>(500, message, null);
    }
    
    public static ApiResponse<?> error(Integer code, String message) {
        return new ApiResponse<>(code, message, null);
    }
} 