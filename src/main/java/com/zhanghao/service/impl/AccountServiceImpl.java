package com.zhanghao.service.impl;

import com.zhanghao.entity.Account;
import com.zhanghao.repository.AccountRepository;
import com.zhanghao.service.AccountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class AccountServiceImpl implements AccountService {

    @Autowired
    private AccountRepository accountRepository;

    @Override
    public Optional<Account> getAccountById(Long id) {
        return accountRepository.findById(id);
    }

    @Override
    public Page<Account> getAllAccounts(Pageable pageable) {
        return accountRepository.findByEnabled(true, pageable);
    }

    @Override
    public Page<Account> getAccountsByCategory(String category, Pageable pageable) {
        return accountRepository.findByCategoryAndEnabled(category, true, pageable);
    }

    @Override
    public Page<Account> getAccountsByPriceRange(BigDecimal minPrice, BigDecimal maxPrice, Pageable pageable) {
        return accountRepository.findByEnabledAndPriceBetween(true, minPrice, maxPrice, pageable);
    }

    @Override
    public Page<Account> getAccountsByCategoryAndPriceRange(
            String category, BigDecimal minPrice, BigDecimal maxPrice, Pageable pageable) {
        return accountRepository.findByCategoryAndEnabledAndPriceBetween(category, true, minPrice, maxPrice, pageable);
    }

    @Override
    public Page<Account> searchAccounts(String keyword, Pageable pageable) {
        return accountRepository.searchAccounts(keyword, true, pageable);
    }

    @Override
    public List<Account> getHotAccounts() {
        return accountRepository.findTop8ByEnabledAndIsHotOrderBySalesCountDesc(true, true);
    }

    @Override
    public List<Account> getRecommendedAccounts() {
        return accountRepository.findTop8ByEnabledAndIsRecommendedOrderByCreateTimeDesc(true, true);
    }

    @Override
    public List<Account> getNewAccounts() {
        return accountRepository.findTop8ByEnabledAndIsNewOrderByCreateTimeDesc(true, true);
    }

    @Override
    public List<Account> getRelatedAccounts(Long accountId, int limit) {
        Optional<Account> accountOpt = accountRepository.findById(accountId);
        if (!accountOpt.isPresent()) {
            return List.of();
        }

        Account account = accountOpt.get();
        return accountRepository.findRelatedAccounts(
                account.getCategory(), accountId, PageRequest.of(0, limit));
    }

    @Override
    @Transactional
    public Account createAccount(Account account) {
        return accountRepository.save(account);
    }

    @Override
    @Transactional
    public Account updateAccount(Account account) {
        return accountRepository.save(account);
    }

    @Override
    @Transactional
    public void deleteAccount(Long id) {
        accountRepository.deleteById(id);
    }

    @Override
    public void updateAccountStock(Long id, int stockChange) {
        Optional<Account> accountOpt = accountRepository.findById(id);
        if (accountOpt.isPresent()) {
            Account account = accountOpt.get();
            int newStock = account.getStock() + stockChange;
            if (newStock < 0) {
                throw new IllegalArgumentException("库存不足");
            }
            account.setStock(newStock);

            // 如果是减少库存（购买），增加销量
            if (stockChange < 0) {
                account.setSalesCount(account.getSalesCount() - stockChange);
            }

            accountRepository.save(account);
        }
    }

    @Override
    public boolean hasStock(Long id) {
        Optional<Account> accountOpt = accountRepository.findById(id);
        return accountOpt.map(account -> account.getStock() > 0).orElse(false);
    }

    @Override
    public List<Account> findHotAccountsByCategory(String category, int limit) {
        // 使用分页查询，但直接返回内容列表
        return accountRepository.findByCategoryAndEnabledTrueOrderBySalesCountDesc(category);
    }

    @Override
    public void incrementShareCount(Long accountId) {
        Optional<Account> accountOpt = accountRepository.findById(accountId);
        if (accountOpt.isPresent()) {
            Account account = accountOpt.get();
//            account.setShareCount(account.getShareCount() + 1);
            accountRepository.save(account);
        }
    }

    @Override
    public List<Account> getAllAccountsNoPage() {
        return accountRepository.findByEnabledTrue();
    }
} 