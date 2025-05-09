package com.zhanghao.repository;

import com.zhanghao.entity.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {
    // 根据oid查询
    Order findByOid(String oid);
}
