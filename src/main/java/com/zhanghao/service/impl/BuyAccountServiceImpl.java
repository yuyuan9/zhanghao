package com.zhanghao.service.impl;

import com.zhanghao.entity.Transaction;
import com.zhanghao.repository.TransactionRepository;
import com.zhanghao.service.BuyAccountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;


import java.math.BigDecimal;

@Service
public class BuyAccountServiceImpl implements BuyAccountService {
    @Autowired
    TransactionRepository transactionRepository;
    private final RestTemplate restTemplate;

    public BuyAccountServiceImpl(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    @Override
    public String createOrder(String name, String type, String product, BigDecimal value, String jumpUrl) {
        // 1. 调用支付接口
        String url = String.format("https://tronusdt.xyz/?way=pay&name=%s&type=%s&product=%s&value=%s&jump=%s",
                name, type, product, value.toPlainString(), jumpUrl);
        Transaction response = restTemplate.postForObject(url, null, Transaction.class);
        // 2. 保存到数据库
        if (response != null) {
            transactionRepository.save(response);
        }
        return response.getOid();
    }
}
