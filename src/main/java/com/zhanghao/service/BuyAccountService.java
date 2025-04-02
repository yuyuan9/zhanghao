package com.zhanghao.service;


import java.math.BigDecimal;

public interface BuyAccountService {
    String createOrder(String name, String type, String product, BigDecimal value, String jumpUrl);
}
