package com.zhanghao.controller;

import com.zhanghao.entity.PurchasedAccount;
import com.zhanghao.entity.User;
import com.zhanghao.service.PurchasedAccountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

import javax.servlet.http.HttpSession;
import java.util.List;

/**
 * 用户购买的账号控制器
 */
@Controller
public class PurchasedAccountController {

    @Autowired
    private PurchasedAccountService purchasedAccountService;

    /**
     * 我的账号页面
     *
     * @param model   模型
     * @param session 会话
     * @return 视图名称
     */
    @GetMapping("/orders")
    public String ordersList(Model model, HttpSession session) {
        // 获取当前登录用户
        User user = (User) session.getAttribute("currentUser");
        // 如果用户已登录，获取用户购买的账号列表
        if (user != null) {
            List<PurchasedAccount> purchasedAccounts = purchasedAccountService.getPurchasedAccountsByUserId(user.getId());
            model.addAttribute("purchasedAccounts", purchasedAccounts);
        } else {
            return "pages/login";
        }
        return "pages/orders";
    }

}