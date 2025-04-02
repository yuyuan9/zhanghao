package com.zhanghao.repository;

import com.zhanghao.entity.Banner;
import com.zhanghao.entity.Transaction;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TransactionRepository extends JpaRepository<Transaction, Long> {
}
