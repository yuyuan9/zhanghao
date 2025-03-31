package com.zhanghao.service;

import com.zhanghao.entity.Account;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

public interface AccountService {
    
    // 获取账号详情
    Optional<Account> getAccountById(Long id);
    
    // 分页获取所有账号
    Page<Account> getAllAccounts(Pageable pageable);
    
    // 分页获取指定分类的账号
    Page<Account> getAccountsByCategory(String category, Pageable pageable);
    
    // 根据价格范围筛选账号
    Page<Account> getAccountsByPriceRange(BigDecimal minPrice, BigDecimal maxPrice, Pageable pageable);
    
    // 根据分类和价格范围筛选账号
    Page<Account> getAccountsByCategoryAndPriceRange(
            String category, BigDecimal minPrice, BigDecimal maxPrice, Pageable pageable);
    
    // 搜索账号
    Page<Account> searchAccounts(String keyword, Pageable pageable);
    
    // 获取热门账号
    List<Account> getHotAccounts();
    
    // 获取推荐账号
    List<Account> getRecommendedAccounts();
    
    // 获取新上架账号
    List<Account> getNewAccounts();
    
    // 获取相关账号
    List<Account> getRelatedAccounts(Long accountId, int limit);
    
    // 创建账号
    Account createAccount(Account account);
    
    // 更新账号
    Account updateAccount(Account account);
    
    // 删除账号
    void deleteAccount(Long id);
    
    // 更新账号库存
    void updateAccountStock(Long id, int stockChange);
    
    // 检查账号是否有库存
    boolean hasStock(Long id);
    
    /**
     * 根据分类获取热门账号
     * @param category 账号分类
     * @param limit 限制返回数量
     * @return 热门账号列表
     */
    List<Account> findHotAccountsByCategory(String category, int limit);
    
    // 增加分享次数
    void incrementShareCount(Long accountId);
    
    // 获取所有账号（不分页）
    List<Account> getAllAccountsNoPage();
} 