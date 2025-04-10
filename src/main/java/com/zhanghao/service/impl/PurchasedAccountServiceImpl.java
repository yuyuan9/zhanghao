package com.zhanghao.service.impl;

import com.zhanghao.entity.PurchasedAccount;
import com.zhanghao.repository.PurchasedAccountRepository;
import com.zhanghao.service.PurchasedAccountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

/**
 * 用户购买的账号服务实现类
 */
@Service
public class PurchasedAccountServiceImpl implements PurchasedAccountService {

    @Autowired
    private PurchasedAccountRepository purchasedAccountRepository;

    @Override
    public List<PurchasedAccount> getPurchasedAccountsByUserId(Long userId) {

        return purchasedAccountRepository.findByUserId(userId);
    }

    @Override
    public void saveAll(List<PurchasedAccount> purchasedAccounts) {

    }

}