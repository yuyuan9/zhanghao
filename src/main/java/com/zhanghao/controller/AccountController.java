package com.zhanghao.controller;

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
import java.util.List;
import java.util.Optional;

@Controller
@RequestMapping("/accounts")
public class AccountController {
    
    @Autowired
    private AccountService accountService;
    
    // 账号列表页面
    @GetMapping
    public String listAccounts(
            @RequestParam(required = false) String category,
            @RequestParam(required = false) BigDecimal minPrice,
            @RequestParam(required = false) BigDecimal maxPrice,
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false, defaultValue = "0") int page,
            @RequestParam(required = false, defaultValue = "12") int size,
            @RequestParam(required = false, defaultValue = "createTime") String sort,
            @RequestParam(required = false, defaultValue = "desc") String direction,
            Model model) {
        
        // 创建分页和排序
        Sort.Direction sortDirection = "asc".equalsIgnoreCase(direction) ? Sort.Direction.ASC : Sort.Direction.DESC;
        Pageable pageable = PageRequest.of(page, size, Sort.by(sortDirection, sort));
        
        // 根据不同条件查询账号
        Page<Account> accounts;
        
        if (keyword != null && !keyword.isEmpty()) {
            // 搜索
            accounts = accountService.searchAccounts(keyword, pageable);
            model.addAttribute("keyword", keyword);
        } else if (category != null && !category.isEmpty() && minPrice != null && maxPrice != null) {
            // 分类和价格范围
            accounts = accountService.getAccountsByCategoryAndPriceRange(category, minPrice, maxPrice, pageable);
            model.addAttribute("category", category);
            model.addAttribute("minPrice", minPrice);
            model.addAttribute("maxPrice", maxPrice);
        } else if (minPrice != null && maxPrice != null) {
            // 价格范围
            accounts = accountService.getAccountsByPriceRange(minPrice, maxPrice, pageable);
            model.addAttribute("minPrice", minPrice);
            model.addAttribute("maxPrice", maxPrice);
        } else if (category != null && !category.isEmpty()) {
            // 分类
            accounts = accountService.getAccountsByCategory(category, pageable);
            model.addAttribute("category", category);
        } else {
            // 所有账号
            accounts = accountService.getAllAccounts(pageable);
        }
        
        model.addAttribute("accounts", accounts);
        model.addAttribute("sort", sort);
        model.addAttribute("direction", direction);
        model.addAttribute("title", "账号商城");
        
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
} 