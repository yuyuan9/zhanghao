package com.zhanghao.service.impl;

import cn.hutool.core.util.ObjectUtil;
import com.zhanghao.dto.PaymentRequest;
import com.zhanghao.entity.Order;
import com.zhanghao.entity.User;
import com.zhanghao.repository.OrderRepository;
import com.zhanghao.service.AccountService;
import com.zhanghao.service.BuyAccountService;
import com.zhanghao.util.PaymentApiClient;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.servlet.http.HttpSession;
import java.math.BigDecimal;

@Service
public class BuyAccountServiceImpl implements BuyAccountService {


    @Autowired
    private AccountService accountService;

    @Autowired
    OrderRepository orderRepository;

    @Override
    @Transactional
    public Order createOrder(Long accountId, Integer quantity, BigDecimal totalPrice, HttpSession session) {
        // 获取当前登录用户
        User currentUser = (User) session.getAttribute("currentUser");
        PaymentRequest paymentRequest = new PaymentRequest();
        paymentRequest.setWay("pay");
        paymentRequest.setName("TFwLF8JRn6YbEquqMMX5jfXWGYxCwaP8ob");
        paymentRequest.setType("ustd");
        paymentRequest.setProduct("buy acounts");
        paymentRequest.setValue(totalPrice);
        paymentRequest.setJump("/#");
        Order order = PaymentApiClient.tronusdtPay(paymentRequest);
        if(ObjectUtil.isNotEmpty(order)){
            order.setUserId(currentUser.getId());
            order.setQuantity(quantity);
            order.setAccountId(accountId);
            orderRepository.save(order);
        }
        // 保存订单
        return order;
    }


    @Override
    public boolean checkPaymentStatus(String orderId) {
        // 在实际应用中，这里应该调用支付网关API检查支付状态
        // 这里简单模拟，随机返回支付状态
        return Math.random() > 0.7; // 30%概率返回支付成功
    }

    /**
     * 生成订单ID
     */
    private String generateOrderId() {
        // 生成格式为：时间戳+4位随机数
        long timestamp = System.currentTimeMillis();
        int random = (int) (Math.random() * 10000);
        return timestamp + String.format("%04d", random);
    }
}
