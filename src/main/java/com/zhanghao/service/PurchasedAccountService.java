package com.zhanghao.service;

import com.zhanghao.entity.PurchasedAccount;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.Optional;

/**
 * 用户购买的账号服务接口
 */
public interface PurchasedAccountService {



    /**
     * 获取用户购买的所有账号
     *
     * @param userId 用户ID
     * @return 购买的账号列表
     */
    List<PurchasedAccount> getPurchasedAccountsByUserId(Long userId);

    void saveAll(List<PurchasedAccount> purchasedAccounts)    ;


}