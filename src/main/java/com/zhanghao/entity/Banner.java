package com.zhanghao.entity;

import lombok.Data;

import javax.persistence.*;
import java.io.Serializable;
import java.time.LocalDateTime;

@Data
@Entity
@Table(name = "banner")
public class Banner implements Serializable {
    
    private static final long serialVersionUID = 1L;
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(nullable = false, length = 100)
    private String title;
    
    @Column(length = 255)
    private String description;
    
    @Column(nullable = false, length = 255)
    private String imageUrl;
    
    @Column(length = 255)
    private String linkUrl;
    
    @Column(nullable = false)
    private Integer sort = 0;
    
    @Column(nullable = false)
    private Boolean enabled = true;
    
    @Column(nullable = false)
    private LocalDateTime createTime = LocalDateTime.now();
    
    @Column(nullable = false)
    private LocalDateTime updateTime = LocalDateTime.now();
} 