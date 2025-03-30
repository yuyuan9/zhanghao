package com.zhanghao.service;

import com.zhanghao.dto.LoginRequest;
import com.zhanghao.dto.RegisterRequest;
import com.zhanghao.entity.User;

public interface UserService {
    
    User register(RegisterRequest request);
    
    boolean checkEmailExists(String email);
    
    User login(LoginRequest request);
} 