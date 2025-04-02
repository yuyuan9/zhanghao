package com.zhanghao.dto;

import lombok.Data;

import javax.validation.constraints.NotBlank;

/***
 *
 * 创建订单参数
 */
@Data
public class OrderRequest {
    @NotBlank(message = "邮箱不能为空")
    private String email;

    @NotBlank(message = "密码不能为空")
    private String password;

}
