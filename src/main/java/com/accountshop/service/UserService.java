package com.accountshop.service;

import com.accountshop.dto.LoginRequest;
import com.accountshop.dto.RegisterRequest;
import com.accountshop.entity.User;

public interface UserService {
    
    User register(RegisterRequest request);
    
    boolean checkEmailExists(String email);
    
    User login(LoginRequest request);
} 