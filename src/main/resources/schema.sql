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