package com.accountshop.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.mindrot.jbcrypt.BCrypt;

import com.accountshop.dto.RegisterRequest;
import com.accountshop.entity.User;
import com.accountshop.repository.UserRepository;
import com.accountshop.service.UserService;
import com.accountshop.dto.LoginRequest;
import java.time.LocalDateTime;

@Service
public class UserServiceImpl implements UserService {
    
    @Autowired
    private UserRepository userRepository;
    
    @Override
    @Transactional
    public User register(RegisterRequest request) {
        // 检查邮箱是否已存在
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new RuntimeException("该邮箱已被注册");
        }
        
        // 创建新用户
        User user = new User();
        user.setEmail(request.getEmail());
        // 使用昵称作为邮箱前缀
        user.setNickname(request.getEmail().split("@")[0]);
        // 加密密码
        user.setPassword(BCrypt.hashpw(request.getPassword(), BCrypt.gensalt()));
        user.setRegisterIp(request.getRegisterIp());
        
        // 保存用户
        return userRepository.save(user);
    }
    
    @Override
    public boolean checkEmailExists(String email) {
        return userRepository.existsByEmail(email);
    }

    @Override
    public User login(LoginRequest request) {
        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("用户不存在"));
        
        // 验证密码
        if (!BCrypt.checkpw(request.getPassword(), user.getPassword())) {
            throw new RuntimeException("密码错误");
        }
        
        // 更新最后登录时间和IP
        user.setLastLoginTime(LocalDateTime.now());
        return userRepository.save(user);
    }
} 