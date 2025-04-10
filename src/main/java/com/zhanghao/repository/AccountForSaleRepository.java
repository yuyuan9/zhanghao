package com.zhanghao.repository;

import com.zhanghao.entity.AccountForSale;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AccountForSaleRepository extends JpaRepository<AccountForSale, Long> {
    // 根据状态查询并按创建时间降序排序，限制结果数量
    List<AccountForSale> findByStatusOrderByCreateTimeDesc(Integer status, Pageable pageable);

    List<AccountForSale> findByStatusOrderByCreateTimeAsc(Integer status, Pageable pageable);

    // 根据状态查询并按更新时间升序排序，限制结果数量
    List<AccountForSale> findByStatusOrderByUpdateTimeAsc(Integer status, Pageable pageable);

    // 根据状态和类型查询，按创建时间降序升序
    List<AccountForSale> findByStatusAndAccountTypeOrderByCreateTimeAsc(Integer status, String accountType, Pageable pageable);


}
