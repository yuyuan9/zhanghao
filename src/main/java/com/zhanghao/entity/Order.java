package com.zhanghao.entity;


import lombok.Data;

import javax.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
@Entity
@Table(name = "user_order")
public class Order {

    @Id
    private Long id;

    @Column(name = "oid", nullable = false, length = 32)
    private String oid;

    @Column(name = "name", nullable = false, length = 64)
    private String name;

    @Column(name = "type", nullable = false, length = 16)
    private String type;

    @Column(name = "value", nullable = false, precision = 18, scale = 8)
    private BigDecimal value;

    @Column(name = "product", nullable = false, length = 32)
    private String product;

    @Column(name = "tim", nullable = false)
    private Long tim;

    @Column(name = "jump", length = 128)
    private String jump;

    @Column(name = "auto", length = 8, columnDefinition = "varchar(8) default 'no'")
    private String auto = "no";

    @Column(name = "status", columnDefinition = "tinyint default 0")
    private Integer status = 0;

    @Column(name = "txid", length = 128, columnDefinition = "varchar(128) default 'none'")
    private String txid = "none";

    @Column(name = "ad", length = 64)
    private String ad;

    @Lob
    @Column(name = "qrcode")
    private String qrcode;

    @Column(name = "qrcodeurl", length = 255)
    private String qrcodeurl;

    @Column(name = "developer_support", length = 128)
    private String developerSupport;
    @Column(name = "user_id", length = 20)
    private Long userId;
    @Column(name = "quantity", length = 20)
    private Integer quantity;
    @Column(name = "account_id", length = 20)
    private Long accountId;
}
