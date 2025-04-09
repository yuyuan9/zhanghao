package com.zhanghao.repository;

import com.zhanghao.entity.PurchasedAccount;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * 用户购买的账号数据访问接口
 */
@Repository
public interface PurchasedAccountRepository extends JpaRepository<PurchasedAccount, Long> {

    /**
     * 根据用户ID查询购买的账号
     *
     * @param userId 用户ID
     * @return 购买的账号列表
     */
    List<PurchasedAccount> findByUserId(Long userId);


}