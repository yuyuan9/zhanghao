package com.zhanghao.entity;

import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import javax.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Data
@Entity
@Table(name = "account")
public class Account {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(nullable = false)
    private String title;
    
    @Column(name = "account_id", nullable = false)
    private String accountId;
    
    @Column(nullable = false)
    private String category;
    
    @Column(nullable = false, precision = 10, scale = 2)
    private BigDecimal price;
    
    @Column(name = "original_price", precision = 10, scale = 2)
    private BigDecimal originalPrice;
    
    @Column(length = 1000)
    private String description;
    
    @ElementCollection
    @CollectionTable(name = "account_feature", joinColumns = @JoinColumn(name = "account_id"))
    @Column(name = "feature")
    private List<String> features = new ArrayList<>();
    
    @ElementCollection
    @CollectionTable(name = "account_image", joinColumns = @JoinColumn(name = "account_id"))
    @Column(name = "image_url")
    private List<String> images = new ArrayList<>();
    
    @Column(name = "main_image")
    private String mainImage;
    
    @Column(nullable = false)
    private Integer stock;
    
    @Column(name = "sales_count")
    private Integer salesCount = 0;
    
    @Column(name = "is_hot")
    private Boolean isHot = false;
    
    @Column(name = "is_new")
    private Boolean isNew = false;
    
    @Column(name = "is_recommended")
    private Boolean isRecommended = false;
    
    @Column(nullable = false)
    private Boolean enabled = true;
    
    @Column(name = "detail_info", columnDefinition = "TEXT")
    private String detailInfo;
    
    @Column(name = "usage_guide", columnDefinition = "TEXT")
    private String usageGuide;
    
    @Column(name = "faq_content", columnDefinition = "TEXT")
    private String faqContent;
    @Column(name = "short_description", columnDefinition = "TEXT")
    private String shortDescription;

    
    @CreationTimestamp
    @Column(name = "create_time", updatable = false)
    private LocalDateTime createTime;
    
    @UpdateTimestamp
    @Column(name = "update_time")
    private LocalDateTime updateTime;
    
    // 计算折扣率
    @Transient
    public Integer getDiscountRate() {
        if (originalPrice == null || originalPrice.compareTo(BigDecimal.ZERO) <= 0) {
            return 100;
        }
        return price.multiply(new BigDecimal(100)).divide(originalPrice, 0, BigDecimal.ROUND_HALF_UP).intValue();
    }
    
    // 计算节省金额
    @Transient
    public BigDecimal getSavedAmount() {
        if (originalPrice == null) {
            return BigDecimal.ZERO;
        }
        return originalPrice.subtract(price);
    }
} 