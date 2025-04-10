package com.zhanghao.controller;

import com.zhanghao.entity.Banner;
import com.zhanghao.entity.Account;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import com.zhanghao.service.BannerService;
import com.zhanghao.service.AccountService;

import java.util.List;

@Controller
public class HomeController {
    @Autowired
    BannerService bannerService;

    @Autowired
    AccountService accountService;

    @GetMapping("/")
    public String index(Model model) {
        // 获取轮播图数据
        List<Banner> banners = bannerService.getAllActiveBanners();
        model.addAttribute("banners", banners);
        
        // 获取热门账号数据
        List<Account> gameAccounts = accountService.findHotAccountsByCategory("game", 2);
        List<Account> streamingAccounts = accountService.findHotAccountsByCategory("streaming", 2);
        List<Account> socialAccounts = accountService.findHotAccountsByCategory("social", 2);
        
        model.addAttribute("gameAccounts", gameAccounts);
        model.addAttribute("streamingAccounts", streamingAccounts);
        model.addAttribute("socialAccounts", socialAccounts);
        
        model.addAttribute("title", "账号易购 - 安全可靠的账号交易平台");
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


    @GetMapping("/payment")
    public String payment(Model model) {
        model.addAttribute("title", "支付说明");
        return "pages/payment";
    }

} 