package com.zhanghao.repository;

import com.zhanghao.entity.Account;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.math.BigDecimal;
import java.util.List;

public interface AccountRepository extends JpaRepository<Account, Long> {
    
    // 根据分类查询账号
    Page<Account> findByCategoryAndEnabled(String category, Boolean enabled, Pageable pageable);
    
    // 查询所有启用的账号
    Page<Account> findByEnabled(Boolean enabled, Pageable pageable);
    
    // 根据价格范围查询
    Page<Account> findByEnabledAndPriceBetween(Boolean enabled, BigDecimal minPrice, BigDecimal maxPrice, Pageable pageable);
    
    // 查询热门账号
    List<Account> findTop8ByEnabledAndIsHotOrderBySalesCountDesc(Boolean enabled, Boolean isHot);
    
    // 查询推荐账号
    List<Account> findTop8ByEnabledAndIsRecommendedOrderByCreateTimeDesc(Boolean enabled, Boolean isRecommended);
    
    // 查询新上架账号
    List<Account> findTop8ByEnabledAndIsNewOrderByCreateTimeDesc(Boolean enabled, Boolean isNew);
    
    // 根据分类和价格范围查询
    Page<Account> findByCategoryAndEnabledAndPriceBetween(
            String category, Boolean enabled, BigDecimal minPrice, BigDecimal maxPrice, Pageable pageable);
    
    // 搜索账号
    @Query("SELECT a FROM Account a WHERE a.enabled = :enabled AND " +
           "(a.title LIKE %:keyword% OR a.description LIKE %:keyword% OR a.accountId LIKE %:keyword%)")
    Page<Account> searchAccounts(@Param("keyword") String keyword, @Param("enabled") Boolean enabled, Pageable pageable);
    
    // 查询相关账号（同类别的其他账号）
    @Query("SELECT a FROM Account a WHERE a.category = :category AND a.id != :accountId AND a.enabled = true ORDER BY a.salesCount DESC")
    List<Account> findRelatedAccounts(@Param("category") String category, @Param("accountId") Long accountId, Pageable pageable);
    
    // 根据分类查询热门账号（不分页，直接返回List）
    List<Account> findByCategoryAndEnabledTrueOrderBySalesCountDesc(String category);
    
    // 查询所有启用的账号（不分页）
    List<Account> findByEnabledTrue();
} 