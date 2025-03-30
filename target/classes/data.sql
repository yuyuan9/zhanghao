-- 添加轮播图数据（使用更优化的图片URL和更小的尺寸）
INSERT INTO banner (title, description, image_url, link_url, sort, enabled, create_time, update_time) 
VALUES 
('热门游戏账号', '畅玩各类热门游戏，低价优质账号等你来', '/images/banners/game-banner-small.jpg', '/categories/game', 3, true, NOW(), NOW()),
('社交媒体账号', '快速获取已认证社交媒体账号，助力您的社交营销', '/images/banners/social-banner-small.jpg', '/categories/social', 2, true, NOW(), NOW()),
('流媒体账号特惠', '低至5折，畅享全球流媒体内容', '/images/banners/streaming-banner-small.jpg', '/categories/streaming', 1, true, NOW(), NOW()); 