package com.accountshop.entity;

import java.io.Serializable;
import java.time.LocalDateTime;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.Data;

@Data
@Entity
@Table(name = "user")
public class User implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true, length = 100)
    private String email;

    @Column(nullable = false, length = 100)
    private String password;

    @Column(length = 50)
    private String nickname;

    @Column(length = 255)
    private String avatar;

    @Column(nullable = false)
    private Integer status = 1;

    @Column(nullable = false, length = 20)
    private String role = "USER";

    @Column(name = "last_login_time")
    private LocalDateTime lastLoginTime;

    @Column(name = "last_login_ip", length = 50)
    private String lastLoginIp;

    @Column(name = "register_time", nullable = false)
    private LocalDateTime registerTime = LocalDateTime.now();

    @Column(name = "register_ip", length = 50)
    private String registerIp;

    @Column(name = "update_time", nullable = false)
    private LocalDateTime updateTime = LocalDateTime.now();
} 