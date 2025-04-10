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

-- 文章表结构
CREATE TABLE IF NOT EXISTS articles (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(200) NOT NULL,
    summary VARCHAR(500) NOT NULL,
    content TEXT NOT NULL,
    category VARCHAR(50) NOT NULL,
    thumbnail VARCHAR(255) NOT NULL,
    create_time TIMESTAMP NOT NULL,
    update_time TIMESTAMP NOT NULL,
    view_count INT NOT NULL DEFAULT 0,
    is_published BOOLEAN NOT NULL DEFAULT TRUE,
    seo_title VARCHAR(200),
    seo_description VARCHAR(500),
    seo_keywords VARCHAR(200),
    slug VARCHAR(200) NOT NULL UNIQUE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='文章表';

-- 添加示例文章数据
INSERT INTO articles (title, summary, content, category, thumbnail, create_time, update_time, view_count, is_published, seo_title, seo_description, seo_keywords, slug)
VALUES
('免费升级Gmail账号容量的5种方法', '想要更多的Gmail存储空间？本文介绍5种免费增加Gmail容量的方法，无需支付额外费用。', '<h2>为什么需要更多Gmail空间？</h2><p>随着电子邮件使用频率的增加，Gmail的15GB免费存储空间可能很快就会用完。特别是如果您使用Gmail进行工作或学习，收发大量附件，这个问题会更加明显。</p><h2>方法一：清理不必要的邮件</h2><p>最简单的方法是删除不再需要的邮件，特别是那些带有大型附件的邮件。Gmail提供了搜索工具来帮助您找到大型邮件：</p><ol><li>在Gmail搜索框中输入"larger:10M"（查找大于10MB的邮件）</li><li>按大小排序，删除不需要的大型邮件</li><li>别忘了清空垃圾箱，彻底释放空间</li></ol><h2>方法二：使用Google One临时免费试用</h2><p>Google One提供额外的存储空间，通常需要付费，但您可以利用免费试用期：</p><ol><li>访问Google One网站(one.google.com)</li><li>选择一个付费计划并开始免费试用</li><li>在试用期结束前取消订阅</li></ol><h2>方法三：创建多个Gmail账号</h2><p>如果您需要管理大量邮件，可以创建多个Gmail账号，并使用Gmail的邮件转发功能将所有邮件集中到一个主账号：</p><ol><li>创建新的Gmail账号</li><li>在新账号中设置邮件转发到主账号</li><li>在主账号中设置过滤器，对转发来的邮件进行分类</li></ol><h2>方法四：使用Google Photos分离存储</h2><p>Gmail、Google Drive和Google Photos共享15GB的免费空间。通过以下设置，可以优化存储空间：</p><ol><li>访问photos.google.com</li><li>选择"高质量"而非"原始质量"存储照片</li><li>这样存储的照片不会计入15GB的配额</li></ol><h2>方法五：使用第三方邮件客户端</h2><p>通过POP3/IMAP协议将Gmail连接到第三方邮件客户端，可以在本地存储邮件：</p><ol><li>设置Thunderbird等邮件客户端</li><li>配置为下载邮件到本地，并从服务器删除</li><li>这样可以保留邮件的同时释放Gmail空间</li></ol><p>通过以上方法，您可以有效管理和扩展Gmail的存储空间，而无需支付额外费用。如果您经常需要处理大量邮件，建议考虑使用我们提供的专业Gmail账号，这些账号提供更大的存储空间和更多高级功能。</p>', 'tips', 'https://example.com/images/gmail-storage.jpg', '2023-12-01 10:00:00', '2023-12-01 10:00:00', 245, TRUE, '5种免费增加Gmail存储空间的方法 - 无需付费扩容', '学习如何免费增加Gmail存储空间，5种实用技巧帮助您管理邮件存储而无需支付额外费用', 'Gmail存储空间,免费扩容,邮件管理,Google账号技巧', 'free-gmail-storage-upgrade'),

('如何创建Gmail账号并设置安全选项', '详细图文教程：从零开始创建Gmail账号，并设置双重验证等安全选项，保护您的邮箱安全。', '<h2>为什么选择Gmail？</h2><p>Gmail是目前全球最受欢迎的电子邮件服务之一，提供15GB免费存储空间、强大的垃圾邮件过滤和出色的搜索功能。无论是个人使用还是商务需求，Gmail都是一个理想的选择。</p><h2>创建Gmail账号的步骤</h2><ol><li><strong>访问Gmail注册页面</strong>：打开浏览器，访问accounts.google.com/signup</li><li><strong>填写个人信息</strong>：输入您的姓名、用户名（将成为您的邮箱地址@gmail.com）、密码</li><li><strong>验证手机号</strong>：输入您的手机号码接收验证码</li><li><strong>完成注册</strong>：填写生日、性别等其他必要信息，同意服务条款</li></ol><h2>设置双重验证</h2><p>双重验证是保护Gmail账号安全的重要措施，即使密码泄露，未授权用户也无法登录您的账号。</p><ol><li><strong>访问安全设置</strong>：登录Gmail后，点击右上角头像 > 管理您的Google账号 > 安全性</li><li><strong>开启双重验证</strong>：找到"双重验证"选项并点击"开始使用"</li><li><strong>验证身份</strong>：输入您的密码</li><li><strong>添加手机</strong>：输入您的手机号码，选择接收短信或电话验证</li><li><strong>完成设置</strong>：输入收到的验证码，确认开启双重验证</li></ol><h2>设置恢复选项</h2><p>设置恢复选项可以帮助您在忘记密码或账号被盗时找回账号控制权。</p><ol><li><strong>添加恢复邮箱</strong>：在安全设置中找到"恢复电子邮件"，添加一个备用邮箱</li><li><strong>添加恢复电话</strong>：在安全设置中找到"恢复电话"，确认您的手机号码</li><li><strong>设置安全问题</strong>：某些情况下，您可能需要回答安全问题来验证身份</li></ol><h2>其他安全建议</h2><ul><li><strong>定期更改密码</strong>：建议每3-6个月更换一次密码</li><li><strong>检查登录活动</strong>：定期查看账号的登录活动，发现可疑活动及时处理</li><li><strong>小心钓鱼邮件</strong>：不要点击来源不明的链接或下载可疑附件</li><li><strong>使用强密码</strong>：密码应包含大小写字母、数字和特殊字符</li></ul><p>通过以上步骤，您可以创建一个安全的Gmail账号。如果您觉得注册过程繁琐，或者需要多个Gmail账号用于不同目的，可以考虑从我们的平台购买现成的Gmail账号，省时省力。</p>', 'tutorial', 'https://example.com/images/gmail-security.jpg', '2023-12-05 14:30:00', '2023-12-05 14:30:00', 312, TRUE, 'Gmail账号注册完整指南：创建和保护您的Google邮箱', '详细步骤教您如何创建Gmail账号并设置双重验证等安全措施，保护您的电子邮件安全', 'Gmail注册,Google账号创建,邮箱安全设置,双重验证', 'create-gmail-account-security-setup'),

('Gmail邮箱被封禁怎么办？完整恢复指南', '账号被封是很多Gmail用户遇到的问题，本文提供详细的Gmail账号恢复步骤和预防措施。', '<h2>为什么Gmail账号会被封禁？</h2><p>Google可能因多种原因暂时或永久封禁Gmail账号，常见原因包括：</p><ul><li>违反Google服务条款或政策</li><li>发送垃圾邮件或恶意内容</li><li>账号被黑客入侵并用于不当活动</li><li>长时间不活跃</li><li>使用可疑IP地址或VPN登录</li><li>频繁创建多个账号</li></ul><h2>如何判断账号是否被封禁</h2><p>当您尝试登录Gmail时，可能会看到以下错误信息：</p><ul><li>"此账号已被暂时停用"</li><li>"您的Google账号已被停用"</li><li>"此账号已被封禁"</li></ul><p>这些都表明您的账号已被Google限制或封禁。</p><h2>Gmail账号恢复步骤</h2><h3>1. 临时封禁恢复</h3><p>如果是临时封禁，通常等待24-48小时后可以自动恢复。在此期间，您可以：</p><ol><li>尝试使用账号恢复表单：访问<a href="https://accounts.google.com/signin/recovery">accounts.google.com/signin/recovery</a></li><li>输入您的Gmail地址，按照提示进行操作</li><li>提供尽可能多的账号相关信息，如创建日期、常用联系人等</li></ol><h3>2. 申诉永久封禁</h3><p>如果账号被永久封禁，您需要提交申诉：</p><ol><li>访问<a href="https://support.google.com/accounts/contact/suspended">Google账号申诉页面</a></li><li>填写申诉表单，详细说明情况</li><li>提供身份证明和账号所有权证明</li><li>耐心等待Google审核，通常需要1-5个工作日</li></ol><h2>预防Gmail账号被封禁的措施</h2><ul><li><strong>遵守服务条款</strong>：熟悉并遵守Google的服务条款和政策</li><li><strong>保持账号活跃</strong>：定期登录并使用您的Gmail账号</li><li><strong>保护账号安全</strong>：启用双重验证，使用强密码</li><li><strong>避免可疑活动</strong>：不要发送大量相似邮件或使用自动化工具</li><li><strong>谨慎使用VPN</strong>：频繁更换IP地址可能触发Google的安全机制</li></ul><h2>无法恢复账号怎么办？</h2><p>如果尝试了所有方法仍无法恢复账号，您可能需要考虑以下选择：</p><ol><li><strong>创建新账号</strong>：重新注册一个Gmail账号</li><li><strong>使用备用邮箱</strong>：如果有备用邮箱，可以暂时使用</li><li><strong>购买现成账号</strong>：如果需要立即使用Gmail，可以考虑从可靠的平台购买现成账号</li></ol><p>账号被封是令人沮丧的经历，但通过正确的步骤，您有机会恢复账号。如果您经常需要多个Gmail账号，或者担心账号安全问题，可以考虑从我们平台购买安全可靠的Gmail账号，避免注册和维护的麻烦。</p>', 'faq', 'https://example.com/images/gmail-recovery.jpg', '2023-12-10 09:15:00', '2023-12-10 09:15:00', 478, TRUE, 'Gmail账号被封禁的完整解决方案：恢复步骤与预防措施', '详细指南帮助您解决Gmail账号被封禁问题，包括恢复方法、申诉流程和预防措施', 'Gmail账号恢复,邮箱被封,Google账号申诉,账号安全', 'gmail-account-recovery-guide'),

('Google账号双重验证详细设置教程', '保护您的Google账号安全，本教程详细介绍如何设置和使用双重验证，防止账号被盗。', '<h2>什么是双重验证？</h2><p>双重验证（2-Step Verification）是Google提供的一项安全功能，它要求用户在登录时提供两种不同的验证方式：通常是密码（您知道的信息）和手机验证码（您拥有的设备）。这大大提高了账号的安全性，即使密码泄露，未授权用户也无法登录您的账号。</p><h2>为什么需要开启双重验证？</h2><ul><li>密码可能被猜测或在数据泄露中被盗</li><li>保护您的个人信息和隐私</li><li>防止未授权访问您的Gmail、Google Drive等服务</li><li>减少账号被黑客入侵的风险</li></ul><h2>开启双重验证的详细步骤</h2><ol><li><strong>登录Google账号</strong>：访问<a href="https://myaccount.google.com/">myaccount.google.com</a></li><li><strong>进入安全设置</strong>：点击左侧菜单的"安全性"</li><li><strong>找到双重验证</strong>：滚动到"登录Google"部分，找到"双重验证"选项</li><li><strong>开始设置</strong>：点击"开始使用"按钮</li><li><strong>验证身份</strong>：输入您的Google账号密码</li><li><strong>添加手机</strong>：输入您的手机号码，选择接收短信或语音电话</li><li><strong>输入验证码</strong>：在手机上接收验证码并输入</li><li><strong>开启功能</strong>：确认开启双重验证</li></ol><h2>备用验证方式</h2><p>为了确保在手机不可用时仍能登录账号，建议设置以下备用验证方式：</p><h3>1. 备用手机号码</h3><ol><li>在双重验证设置页面，点击"备用选项"</li><li>选择"备用手机"</li><li>添加另一个手机号码</li></ol><h3>2. 备份码</h3><ol><li>在双重验证设置页面，点击"备份码"</li><li>生成一组10个备份码</li><li>将这些码保存在安全的地方（如打印出来）</li><li>每个备份码只能使用一次</li></ol><h3>3. Google Authenticator应用</h3><ol><li>在双重验证设置页面，点击"Authenticator应用"</li><li>在手机上下载Google Authenticator应用</li><li>按照屏幕指示设置应用</li><li>此应用可在离线状态下生成验证码</li></ol><h2>使用双重验证登录</h2><p>开启双重验证后，登录Google账号的步骤如下：</p><ol><li>输入您的电子邮件地址和密码</li><li>系统会要求您输入验证码</li><li>根据您的设置，通过短信接收验证码或使用Authenticator应用获取验证码</li><li>输入验证码完成登录</li></ol><h2>在新设备上信任登录</h2><p>在某些设备上，您可以选择信任该设备，这样在30天内不需要再次输入验证码：</p><ol><li>登录时输入验证码后，会看到"信任此设备"的选项</li><li>勾选该选项，然后点击"确认"</li><li>注意：只在自己的私人设备上使用此功能，公共设备请勿勾选</li></ol><p>通过设置双重验证，您的Google账号安全性将大大提高。如果您觉得设置过程繁琐，或者需要多个已设置好安全选项的账号，可以考虑从我们平台购买已配置好双重验证的Google账号。</p>', 'security', 'https://example.com/images/2fa-setup.jpg', '2023-12-15 16:45:00', '2023-12-15 16:45:00', 356, TRUE, 'Google双重验证完整设置指南：保护您的账号安全', '学习如何为Google账号设置双重验证，包括备用验证方式和安全建议，全面提升账号安全性', 'Google双重验证,账号安全,2FA设置,Gmail安全', 'google-two-factor-authentication-guide'),

('如何解决Gmail邮件发送失败问题', '遇到Gmail无法发送邮件？本文详细分析常见原因并提供解决方案，帮您快速恢复邮件功能。', '<h2>Gmail发送邮件失败的常见原因</h2><p>Gmail是全球最受欢迎的电子邮件服务之一，但有时您可能会遇到邮件发送失败的问题。以下是最常见的原因：</p><ul><li>网络连接问题</li><li>Gmail服务器暂时故障</li><li>账号权限受限</li><li>达到发送限制</li><li>收件人地址错误</li><li>邮件内容被判定为垃圾邮件</li><li>附件过大</li></ul><h2>如何诊断和解决问题</h2><h3>1. 检查错误信息</h3><p>Gmail通常会显示具体的错误信息，这是诊断问题的第一步：</p><ul><li><strong>"发送配额已用尽"</strong>：您已达到Gmail的发送限制</li><li><strong>"无法连接到服务器"</strong>：网络连接问题</li><li><strong>"收件人地址无效"</strong>：邮箱地址格式错误或不存在</li><li><strong>"邮件被拒绝"</strong>：可能被收件人服务器拒绝</li></ul><h3>2. 解决网络连接问题</h3><ol><li>检查您的互联网连接是否正常</li><li>尝试刷新页面或重启浏览器</li><li>清除浏览器缓存和Cookie</li><li>尝试使用不同的浏览器或设备</li><li>如果使用VPN，尝试关闭后再发送</li></ol><h3>3. 处理发送限制问题</h3><p>Gmail对免费账号有发送限制：</p><ul><li>每天最多发送500封邮件</li><li>一次最多添加500个收件人</li></ul><p>解决方法：</p><ol><li>等待24小时后限制会自动重置</li><li>将大型邮件列表分成小批次发送</li><li>考虑升级到Google Workspace获取更高限制</li></ol><h3>4. 解决附件问题</h3><ol><li>Gmail附件大小限制为25MB</li><li>对于大文件，使用Google Drive分享链接</li><li>压缩大型文件后再发送</li><li>检查附件格式是否受支持</li></ol><h3>5. 避免被标记为垃圾邮件</h3><ol><li>避免使用过多大写字母或感叹号</li><li>不要在邮件中包含过多链接</li><li>避免使用垃圾邮件常见词汇</li><li>不要发送相同内容给大量收件人</li></ol><h2>高级故障排除</h2><h3>1. 检查Gmail状态</h3><p>有时问题可能是Gmail服务器端的：</p><ol><li>访问<a href="https://www.google.com/appsstatus">Google Workspace状态控制台</a></li><li>检查Gmail服务是否有报告的中断</li></ol><h3>2. 检查账号安全状态</h3><ol><li>访问<a href="https://myaccount.google.com/security">Google账号安全设置</a></li><li>检查是否有可疑活动警告</li><li>查看是否有针对您账号的限制</li></ol><h3>3. 使用Gmail离线模式</h3><ol><li>启用Gmail离线模式</li><li>撰写邮件并保存为草稿</li><li>恢复网络连接后再发送</li></ol><h2>预防措施</h2><ul><li>定期更改密码增强账号安全性</li><li>启用双重验证保护账号</li><li>保持Gmail应用和浏览器更新到最新版本</li><li>定期清理邮箱，删除不必要的邮件</li><li>遵守Gmail的使用政策，避免发送垃圾邮件</li></ul><p>如果您经常遇到Gmail发送问题，或者需要更可靠的邮件发送功能，可以考虑从我们平台购买专业Gmail账号，这些账号通常有更高的发送限制和更好的服务器优先级。</p>', 'faq', 'https://example.com/images/gmail-sending-issues.jpg', '2023-12-20 11:20:00', '2023-12-20 11:20:00', 289, TRUE, 'Gmail邮件发送失败完全解决指南：原因分析与解决方案', '全面分析Gmail邮件发送失败的原因，并提供详细的故障排除步骤，帮助您快速恢复邮件功能', 'Gmail发送失败,邮件问题,Gmail故障排除,邮箱限制', 'fix-gmail-sending-issues');