package com.zhanghao.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import com.zhanghao.entity.Account;
import com.zhanghao.service.AccountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

@Controller
@RequestMapping("/accounts")
public class AccountController {
    
    @Autowired
    private AccountService accountService;
    
    // 账号列表页面
    @GetMapping
    public String listAccounts(Model model) {
        try {
            // 获取所有账号
            List<Account> allAccounts = accountService.getAllAccountsNoPage();
            
            // 添加数据到模型
            model.addAttribute("accounts", allAccounts);
            model.addAttribute("title", "账号商城 - 账号易购");
            
            // 确保账号数据可以被序列化
            ObjectMapper mapper = new ObjectMapper();
            mapper.registerModule(new JavaTimeModule());
            mapper.disable(SerializationFeature.WRITE_DATES_AS_TIMESTAMPS);
            String accountsJson = mapper.writeValueAsString(allAccounts);
            model.addAttribute("accountsJson", accountsJson);
            
        } catch (Exception e) {
            // 记录错误
            e.printStackTrace();
            
            // 返回空列表
            model.addAttribute("accounts", new ArrayList<Account>());
            model.addAttribute("accountsJson", "[]");
            model.addAttribute("error", "查询出错: " + e.getMessage());
        }
        
        return "pages/accounts";
    }
    
    // 账号详情页面
    @GetMapping("/{id}")
    public String accountDetail(@PathVariable Long id, Model model) {
        Optional<Account> accountOpt = accountService.getAccountById(id);
        
        if (accountOpt.isPresent()) {
            Account account = accountOpt.get();
            model.addAttribute("account", account);
            
            // 获取相关账号
            List<Account> relatedAccounts = accountService.getRelatedAccounts(id, 4);
            model.addAttribute("relatedAccounts", relatedAccounts);
            
            model.addAttribute("title", account.getTitle() + " - 账号易购");
            return "pages/account-detail";
        } else {
            // 账号不存在，重定向到账号列表页
            return "redirect:/accounts";
        }
    }
    
    // API接口：获取账号详情
    @GetMapping("/api/{id}")
    @ResponseBody
    public Account getAccountById(@PathVariable Long id) {
        return accountService.getAccountById(id).orElse(null);
    }
    
    // API接口：检查账号库存
    @GetMapping("/api/{id}/stock")
    @ResponseBody
    public boolean checkStock(@PathVariable Long id) {
        return accountService.hasStock(id);
    }
    
    // 分享账号
    @PostMapping("/{id}/share")
    @ResponseBody
    public Map<String, Object> shareAccount(@PathVariable Long id) {
        Map<String, Object> result = new HashMap<>();
        
        try {
            // 获取账号信息
            Optional<Account> accountOpt = accountService.getAccountById(id);
            
            if (accountOpt.isPresent()) {
                Account account = accountOpt.get();
                
                // 生成分享链接
                String shareLink = generateShareLink(account);
                
                // 更新分享次数
                accountService.incrementShareCount(id);
                
                result.put("success", true);
                result.put("shareLink", shareLink);
                result.put("message", "分享成功");
            } else {
                result.put("success", false);
                result.put("message", "账号不存在");
            }
        } catch (Exception e) {
            result.put("success", false);
            result.put("message", "分享失败: " + e.getMessage());
        }
        
        return result;
    }
    
    // 生成分享链接
    private String generateShareLink(Account account) {
        // 这里可以根据需要生成不同的分享链接
        return "/share/account/" + account.getId() + "?utm_source=share";
    }
} 