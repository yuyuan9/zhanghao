package com.zhanghao.controller;

import com.zhanghao.dto.ApiResponse;
import com.zhanghao.dto.LoginRequest;
import com.zhanghao.dto.RegisterRequest;
import com.zhanghao.entity.User;
import com.zhanghao.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import javax.validation.Valid;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/user")
public class UserController {

    @Autowired
    private UserService userService;

    /**
     * 用户注册
     */
    @PostMapping("/register")
    public ApiResponse<?> register(@Valid @RequestBody RegisterRequest request,
                                   HttpServletRequest httpRequest) {
        // 设置注册IP
        request.setRegisterIp(httpRequest.getRemoteAddr());
        try {
            User user = userService.register(request);
            return ApiResponse.success("注册成功", user.getEmail());
        } catch (Exception e) {
            return ApiResponse.error(e.getMessage());
        }
    }

    /**
     * 检查邮箱是否已存在
     */
    @GetMapping("/check-email")
    public ApiResponse<?> checkEmail(@RequestParam String email) {
        boolean exists = userService.checkEmailExists(email);
        return ApiResponse.success(exists);
    }

    /**
     * 用户登录
     */
    @PostMapping("/login")
    public ApiResponse<?> login(@Valid @RequestBody LoginRequest request,
                                HttpServletRequest httpRequest,
                                HttpSession session) {
        try {
            // 设置登录IP
            User user = userService.login(request);
            user.setLastLoginIp(httpRequest.getRemoteAddr());

            // 将用户信息存入session
            session.setAttribute("currentUser", user);

            // 返回用户信息
            Map<String, Object> result = new HashMap<>();
            result.put("user", user);

            return ApiResponse.success("登录成功", result);
        } catch (Exception e) {
            return ApiResponse.error(e.getMessage());
        }
    }

    /**
     * 获取当前登录用户信息
     */
    @GetMapping("/current")
    public ApiResponse<?> getCurrentUser(HttpSession session) {
        User user = (User) session.getAttribute("currentUser");
        if (user == null) {
            return ApiResponse.error(401, "未登录");
        }
        return ApiResponse.success(user);
    }

    /**
     * 退出登录
     */
    @PostMapping("/logout")
    public ApiResponse<?> logout(HttpSession session) {
        session.removeAttribute("currentUser");
        return ApiResponse.success("退出成功");
    }
} 