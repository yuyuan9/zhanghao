package com.zhanghao.controller;

import com.zhanghao.service.BuyAccountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 * 购买账号controller
 */
@Controller
@RequestMapping("/buy")
public class BuyAccountController {

    @Autowired
    BuyAccountService buyAccountService;

    /**
     * 创建订单
     *
     * @return
     */
    @RequestMapping("/createOrder")
    public String createOrder() {
//        buyAccountService.createOrder();
        return "";
    }
}
