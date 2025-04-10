package com.zhanghao.entity;

import lombok.Data;

import javax.persistence.*;
import java.time.LocalDateTime;

/**
 * 待销售账号表
 */
@Data
@Entity
@Table(name = "account_for_sale")
public class AccountForSale {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
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


    @Column(name = "account_type", nullable = false, length = 20)
    private String accountType; // 账号类型，如游戏账号、社交账号等

    @Column(name = "status", columnDefinition = "tinyint default 1")
    private Integer status; // 状态：1：待售 2：已售 3:下架等

    @Column(name = "create_time", nullable = false)
    private LocalDateTime createTime; // 创建时间

    @Column(name = "update_time", nullable = false)
    private LocalDateTime updateTime; // 更新时间
}
