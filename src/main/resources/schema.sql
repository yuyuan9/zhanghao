-- 用户表设计
create TABLE IF NOT EXISTS `user` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT comment '用户ID',
  `email` varchar(100) NOT NULL comment '邮箱（登录账号）',
  `password` varchar(100) NOT NULL comment '密码（加密存储）',
  `nickname` varchar(50) DEFAULT NULL comment '昵称',
  `avatar` varchar(255) DEFAULT NULL comment '头像URL',
  `status` tinyint(1) NOT NULL DEFAULT '1' comment '状态：0-禁用，1-正常',
  `role` varchar(20) NOT NULL DEFAULT 'USER' comment '角色：USER-普通用户，ADMIN-管理员',
  `last_login_time` datetime DEFAULT NULL comment '最后登录时间',
  `last_login_ip` varchar(50) DEFAULT NULL comment '最后登录IP',
  `register_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP comment '注册时间',
  `register_ip` varchar(50) DEFAULT NULL comment '注册IP',
  `update_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON update CURRENT_TIMESTAMP comment '更新时间',
  PRIMARY KEY (`id`),
  UNIQUE KEY `uk_email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 comment='用户表';

-- 轮播图表设计
create TABLE banner (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(100) NOT NULL comment '轮播图标题',
    description VARCHAR(255) comment '轮播图描述',
    image_url VARCHAR(255) NOT NULL comment '图片URL',
    link_url VARCHAR(255) comment '点击跳转URL',
    sort INT DEFAULT 0 comment '排序字段，数字越小越靠前',
    enabled BOOLEAN DEFAULT TRUE comment '是否启用',
    create_time DATETIME NOT NULL comment '创建时间',
    update_time DATETIME NOT NULL comment '更新时间'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 comment='轮播图表';

-- 账号表
CREATE TABLE IF NOT EXISTS account (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    account_id VARCHAR(100) NOT NULL,
    category VARCHAR(50) NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    original_price DECIMAL(10, 2),
    description VARCHAR(1000),
    main_image VARCHAR(255),
    stock INT NOT NULL,
    sales_count INT DEFAULT 0,
    is_hot BOOLEAN DEFAULT FALSE,
    is_new BOOLEAN DEFAULT FALSE,
    is_recommended BOOLEAN DEFAULT FALSE,
    enabled BOOLEAN DEFAULT TRUE,
    detail_info TEXT,
    usage_guide TEXT,
    faq_content TEXT,
    create_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    update_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- 账号特性表
CREATE TABLE IF NOT EXISTS account_feature (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    account_id BIGINT NOT NULL,
    feature VARCHAR(255) NOT NULL,
    FOREIGN KEY (account_id) REFERENCES account(id) ON DELETE CASCADE
);

-- 账号图片表
CREATE TABLE IF NOT EXISTS account_image (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    account_id BIGINT NOT NULL,
    image_url VARCHAR(255) NOT NULL,
    FOREIGN KEY (account_id) REFERENCES account(id) ON DELETE CASCADE
);

-- 账号类型表
CREATE TABLE IF NOT EXISTS account_type (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    type_code VARCHAR(50) NOT NULL,
    type_name VARCHAR(50) NOT NULL,
    description VARCHAR(255),
    sort_order INT,
    enabled BOOLEAN NOT NULL DEFAULT TRUE,
    
    CONSTRAINT uk_account_type_code UNIQUE (type_code),
    CONSTRAINT uk_account_type_name UNIQUE (type_name)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='账号类型表';

-- 用户购买的账号表
CREATE TABLE IF NOT EXISTS purchased_account (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    account_name VARCHAR(100) NOT NULL,
    account_password VARCHAR(100) NOT NULL,
    auxiliary_email VARCHAR(100),
    account_type VARCHAR(100) NOT NULL,
    order_number VARCHAR(50) NOT NULL,
    purchase_time DATETIME NOT NULL,
    user_id BIGINT NOT NULL,
    remarks VARCHAR(255),

    INDEX idx_purchased_account_user_id (user_id),
    INDEX idx_purchased_account_order_number (order_number),
    INDEX idx_purchased_account_purchase_time (purchase_time)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='用户购买的账号表';