-- 添加轮播图数据（使用更优化的图片URL和更小的尺寸）
INSERT INTO banner (title, description, image_url, link_url, sort, enabled, create_time, update_time) 
VALUES 
('热门游戏账号', '畅玩各类热门游戏，低价优质账号等你来', '/images/banners/game-banner-small.jpg', '/categories/game', 3, true, NOW(), NOW()),
('社交媒体账号', '快速获取已认证社交媒体账号，助力您的社交营销', '/images/banners/social-banner-small.jpg', '/categories/social', 2, true, NOW(), NOW()),
('流媒体账号特惠', '低至5折，畅享全球流媒体内容', '/images/banners/streaming-banner-small.jpg', '/categories/streaming', 1, true, NOW(), NOW()); 

-- 插入示例账号数据
INSERT INTO account (title, account_id, category, price, original_price, description, main_image, stock, sales_count, is_hot, is_new, is_recommended, enabled, detail_info, usage_guide, faq_content)
VALUES 
('王者荣耀账号', 'WZ123456789', 'game', 299.00, 399.00, '这是一个高级王者荣耀账号，拥有100个英雄和80个皮肤，段位为钻石I。账号已稳定使用3年，绑定了手机和微信，安全可靠。', 'https://images.unsplash.com/photo-1560253023-3ec5d502959f?w=800&h=600&fit=crop', 8, 328, TRUE, FALSE, TRUE, TRUE, 
'<h3>账号详细信息</h3><p>这是一个高级王者荣耀账号，拥有以下特点：</p><ul><li>英雄数量：100个</li><li>皮肤数量：80个</li><li>段位：钻石I</li><li>战力：高</li><li>使用年限：3年</li><li>绑定信息：手机+微信</li></ul><p>账号内含多个限定英雄和皮肤，是一个非常稀有的账号。</p>',
'<h3>使用指南</h3><p>购买后，您将收到以下信息：</p><ol><li>账号登录名和密码</li><li>绑定手机验证码获取方式</li><li>安全问题答案</li></ol><p>请在收到账号信息后，立即修改密码和安全问题，以确保账号安全。</p>',
'<h3>常见问题</h3><div class="faq-item"><h4>Q: 账号会被找回吗？</h4><p>A: 不会。我们的账号来源安全可靠，且已经稳定使用3年，不存在被找回的风险。</p></div><div class="faq-item"><h4>Q: 账号可以更换绑定信息吗？</h4><p>A: 可以更换绑定手机，但微信绑定无法更换。</p></div><div class="faq-item"><h4>Q: 购买后遇到问题怎么办？</h4><p>A: 我们提供7天售后服务，如有任何问题，可以联系客服处理。</p></div>');

-- 插入账号特性
INSERT INTO account_feature (account_id, feature) VALUES 
(1, '拥有多个限定英雄和皮肤'),
(1, '战力高，胜率稳定'),
(1, '信誉等级高，无违规记录'),
(1, '赠送完整的登录信息和使用教程');

-- 插入账号图片
INSERT INTO account_image (account_id, image_url) VALUES 
(1, 'https://images.unsplash.com/photo-1560253023-3ec5d502959f?w=150&h=100&fit=crop'),
(1, 'https://images.unsplash.com/photo-1612287230202-1ff1d85d1bdf?w=150&h=100&fit=crop'),
(1, 'https://images.unsplash.com/photo-1612287230559-e9c4b3d534fe?w=150&h=100&fit=crop'),
(1, 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=150&h=100&fit=crop'); 

-- 账号类型初始数据
INSERT INTO account_type (type_code, type_name, description, sort_order, enabled) VALUES
('game', '游戏账号', '各类游戏平台的账号，如王者荣耀、英雄联盟等', 1, true),
('social', '社交媒体账号', '各类社交媒体平台的账号，如Instagram、Twitter等', 2, true),
('streaming', '流媒体账号', '各类流媒体平台的账号，如Netflix、Disney+等', 3, true),
('other', '其他账号', '其他类型的账号，如Office365等', 4, true);

-- 示例购买账号数据
INSERT INTO purchased_account (account_name, account_password, auxiliary_email, account_type, order_number, purchase_time, user_id, remarks) VALUES
('wangzhe_123456', 'game2023!', 'wangzhe@example.com', 'game', 'ORD20230615001', '2023-06-15 14:30:25', 2, '王者荣耀账号，已验证'),
('netflix_premium', 'netflix2023', 'netflix@example.com', 'streaming', 'ORD20230610001', '2023-06-10 09:15:42', 2, 'Netflix高级会员账号'),
('instagram_verified', 'insta2023!', 'insta@example.com',  'social', 'ORD20230528001', '2023-05-28 16:45:10', 2, '已认证的Instagram账号'),
('lol_diamond', 'lol2023!', 'lol@example.com',  'game', 'ORD20230520001', '2023-05-20 11:22:33', 2, '英雄联盟钻石段位账号'),
('office365_pro', 'office2023!', 'office@example.com', 'other', 'ORD20230515001', '2023-05-15 08:30:15', 2, 'Office365专业版账号');