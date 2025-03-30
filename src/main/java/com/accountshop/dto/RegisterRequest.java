package com.accountshop.dto;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;

import lombok.Data;

@Data
public class RegisterRequest {
    
    @NotBlank(message = "邮箱不能为空")
    @Email(message = "邮箱格式不正确")
    private String email;
    
    @NotBlank(message = "密码不能为空")
    @Size(min = 8, message = "密码长度不能少于8个字符")
    @Pattern(regexp = "^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{8,}$", message = "密码必须包含字母和数字")
    private String password;
    
    @NotBlank(message = "验证码不能为空")
    @Size(min = 4, max = 4, message = "验证码必须是4位")
    private String captcha;
    
    private String registerIp;
} 