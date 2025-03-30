package com.accountshop.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
public class PageController {

    @GetMapping("/")
    public String home(Model model) {
        model.addAttribute("title", "首页");
        return "pages/index";
    }
    
    @GetMapping("/login")
    public String login(Model model) {
        model.addAttribute("title", "登录");
        return "pages/login";
    }
    
    @GetMapping("/register")
    public String register(Model model) {
        model.addAttribute("title", "注册");
        return "pages/register";
    }
    
    @GetMapping("/accounts")
    public String accounts(Model model) {
        model.addAttribute("title", "账号商城");
        return "pages/accounts";
    }
    
    @GetMapping("/accounts/{id}")
    public String accountDetail(@PathVariable("id") Long id, Model model) {
        model.addAttribute("title", "账号详情");
        // 在实际项目中，这里应该从数据库中获取账号信息
        return "pages/account-detail";
    }
    
    @GetMapping("/about")
    public String about(Model model) {
        model.addAttribute("title", "关于我们");
        return "pages/about";
    }
    
    @GetMapping("/faq")
    public String faq(Model model) {
        model.addAttribute("title", "常见问题");
        return "pages/faq";
    }
    
    @GetMapping("/contact")
    public String contact(Model model) {
        model.addAttribute("title", "联系我们");
        return "pages/contact";
    }
    @GetMapping("/orders")
    public String orders(Model model) {
        model.addAttribute("title", "订单");
        return "pages/orders";
    }

    @GetMapping("/payment")
    public String payment(Model model) {
        model.addAttribute("title", "支付说明");
        return "pages/payment";
    }
} 