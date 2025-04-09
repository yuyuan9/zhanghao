package com.zhanghao.entity;

import lombok.Data;

import javax.persistence.*;
import java.io.Serializable;
import java.time.LocalDateTime;

/**
 * 用户购买的账号实体类
 */
@Data
@Entity
@Table(name = "purchased_account")
public class PurchasedAccount implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    private Long id;

    /**
     * 账号名称
     */
    @Column(name = "account_name", nullable = false, length = 100)
    private String accountName;

    /**
     * 账号密码
     */
    @Column(name = "account_password", nullable = false, length = 100)
    private String accountPassword;

    /**
     * 辅助邮箱
     */
    @Column(name = "auxiliary_email", length = 100)
    private String auxiliaryEmail;

    /**
     * 账号类型ID
     */
    @Column(name = "account_type", length = 100)
    private String accountType;

    /**
     * 订单号
     */
    @Column(name = "order_number", nullable = false, length = 50)
    private String orderNumber;

    /**
     * 购买时间
     */
    @Column(name = "purchase_time", nullable = false)
    private LocalDateTime purchaseTime;

    /**
     * 用户ID
     */
    @Column(name = "user_id", nullable = false)
    private Long userId;

    /**
     * 备注信息
     */
    @Column(name = "remarks", length = 255)
    private String remarks;


}