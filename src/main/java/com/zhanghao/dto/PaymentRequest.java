package com.zhanghao.dto;

import lombok.Data;

import java.math.BigDecimal;

@Data
public class PaymentRequest {
    private String way;        // 支付方式
    private String name;        // 收款地址
    private String type;       // 货币类型
    private String product;     // 产品类型
    private BigDecimal value;     // 金额
    private String jump;      // 跳转地址
}
