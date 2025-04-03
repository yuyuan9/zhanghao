package com.zhanghao.service;

import com.zhanghao.entity.Order;

import java.math.BigDecimal;
import javax.servlet.http.HttpSession;

public interface BuyAccountService {
    
    /**
     * 创建订单
     * 
     * @param accountId 账号ID
     * @param quantity 购买数量
     * @param totalPrice 总价
     * @param session HTTP会话
     * @return 创建的订单
     */
    Order createOrder(Long accountId, Integer quantity, BigDecimal totalPrice, HttpSession session);
    
    /**
     * 检查支付状态
     * 
     * @param orderId 订单ID
     * @return 是否已支付
     */
    boolean checkPaymentStatus(String orderId);
}
