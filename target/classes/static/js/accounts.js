// 账号商城页面JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // 初始化账号数据
    initAccountData();
    
    // 初始化账号卡片效果
    initAccountCards();
    
    // 初始化分类筛选
    initCategoryFilter();
    
    // 初始化排序功能
    initSorting();
    
//    // 初始化分页功能
//    initPagination();
    
    // 初始化状态筛选复选框
    initStatusCheckboxes();
});

// 全局变量
let allAccounts = []; // 所有账号
let filteredAccounts = []; // 筛选后的账号
let currentPage = 0; // 当前页码
const pageSize = 8; // 每页显示数量
let currentCategory = 'all'; // 当前选中的分类
let currentSort = 'default'; // 当前排序方式

// 初始化账号数据
function initAccountData() {
    // 从页面获取账号数据
    const accountsData = document.getElementById('accounts-data');
    if (accountsData) {
        try {
            console.log('原始账号数据:', accountsData.textContent.substring(0, 100) + '...');
            allAccounts = JSON.parse(accountsData.textContent);
            console.log('解析后账号数量:', allAccounts.length);
            
            // 初始筛选（显示所有账号）
            filterByCategory('all');
            
            // 初始排序（默认按时间降序）
            sortAccounts('default');
            
            // 渲染账号列表
            renderAccounts();
        } catch (e) {
            console.error('解析账号数据出错:', e);
            allAccounts = [];
            filteredAccounts = [];
        }
    } else {
        console.error('未找到账号数据元素');
    }
}

// 根据分类筛选账号
function filterByCategory(category) {
    currentCategory = category;
    
    if (category === 'all') {
        // 显示所有账号
        filteredAccounts = [...allAccounts];
    } else {
        // 按分类筛选
        filteredAccounts = allAccounts.filter(account => account.category === category);
    }
    
    // 重置到第一页
    currentPage = 0;
}

// 排序账号
function sortAccounts(sortType) {
    currentSort = sortType;
    
    switch (sortType) {
        case 'default':
            // 默认排序（创建时间降序）
            filteredAccounts.sort((a, b) => new Date(b.createTime || 0) - new Date(a.createTime || 0));
            break;
        case 'price-asc':
            // 价格升序
            filteredAccounts.sort((a, b) => (a.price || 0) - (b.price || 0));
            break;
        case 'price-desc':
            // 价格降序
            filteredAccounts.sort((a, b) => (b.price || 0) - (a.price || 0));
            break;
        case 'sales':
            // 销量降序
            filteredAccounts.sort((a, b) => (b.salesCount || 0) - (a.salesCount || 0));
            break;
    }
}

// 渲染账号列表
function renderAccounts() {
    const accountGrid = document.querySelector('.account-grid');
    if (!accountGrid) return;
    
    // 计算当前页的账号
    const start = currentPage * pageSize;
    const end = start + pageSize;
    const currentAccounts = filteredAccounts.slice(start, end);
    
    // 清空现有内容
    accountGrid.innerHTML = '';
    
    if (currentAccounts.length === 0) {
        // 没有账号时显示提示
        const noDataMessage = document.createElement('div');
        noDataMessage.className = 'no-data-message';
        noDataMessage.innerHTML = `
            <i class="fas fa-info-circle"></i>
            <p>暂无符合条件的账号</p>
        `;
        accountGrid.appendChild(noDataMessage);
    } else {
        // 渲染账号卡片
        currentAccounts.forEach(account => {
            // 使用现有的HTML结构创建卡片
            const card = document.createElement('div');
            card.className = 'account-card';
            card.setAttribute('data-category', account.category);
            
            if (account.stock <= 0) {
                card.classList.add('sold-out');
            }
            
            let badgesHtml = '';
            if (account.isHot) {
                badgesHtml += '<div class="account-badge">热销</div>';
            }
            if (account.isNew) {
                badgesHtml += '<div class="account-badge new">新品</div>';
            }
            if (account.originalPrice && account.originalPrice > account.price) {
                badgesHtml += '<div class="account-badge discount">折扣</div>';
            }
            
            card.innerHTML = `
                ${badgesHtml}
                <div class="account-image">
                    <img src="${account.mainImage}" alt="${account.title}">
                </div>
                <div class="account-info">
                    <h3>${account.title}</h3>
                    <p class="account-desc">${account.shortDescription || ''}</p>
                    <div class="account-meta">
                        <span class="account-price">¥${account.price.toFixed(2)}</span>
                        <div class="account-stats">
                            <span class="account-sales">已售 ${account.salesCount || 0}</span>
                            <span class="account-stock ${account.stock <= 3 && account.stock > 0 ? 'stock-low' : (account.stock <= 0 ? 'stock-critical' : '')}">
                                库存 ${account.stock}
                            </span>
                        </div>
                    </div>
                    <a href="/accounts/${account.id}" class="btn btn-primary btn-sm ${account.stock <= 0 ? 'btn-disabled' : ''}" 
                       ${account.stock <= 0 ? 'disabled' : ''}>
                        ${account.stock > 0 ? '立即购买' : '已售罄'}
                    </a>
                </div>
            `;
            
            accountGrid.appendChild(card);
        });
    }
    
//    // 更新分页
//    updatePagination();
    
    // 重新初始化账号卡片效果
    initAccountCards();
}

// 更新分页
//function updatePagination() {
//    const pagination = document.querySelector('.pagination');
//    if (!pagination) return;
//
//    // 计算总页数
//    const totalPages = Math.ceil(filteredAccounts.length / pageSize);
//
//    // 清空现有内容
//    pagination.innerHTML = '';
//
//    // 如果只有一页，不显示分页
//    if (totalPages <= 1) return;
//
//    // 上一页按钮
//    if (currentPage > 0) {
//        const prevBtn = document.createElement('a');
//        prevBtn.href = 'javascript:void(0)';
//        prevBtn.className = 'prev';
//        prevBtn.innerHTML = '<i class="fas fa-chevron-left"></i> 上一页';
//        prevBtn.addEventListener('click', () => {
//            currentPage--;
//            renderAccounts();
//        });
//        pagination.appendChild(prevBtn);
//    }
//
//    // 页码按钮
//    for (let i = 0; i < totalPages; i++) {
//        // 只显示当前页附近的页码
//        if (i >= currentPage - 2 && i <= currentPage + 2) {
//            const pageBtn = document.createElement('a');
//            pageBtn.href = 'javascript:void(0)';
//            pageBtn.textContent = i + 1;
//
//            if (i === currentPage) {
//                pageBtn.className = 'active';
//            }
//
//            pageBtn.addEventListener('click', () => {
//                currentPage = i;
//                renderAccounts();
//            });
//
//            pagination.appendChild(pageBtn);
//        }
//    }
//
//    // 下一页按钮
//    if (currentPage < totalPages - 1) {
//        const nextBtn = document.createElement('a');
//        nextBtn.href = 'javascript:void(0)';
//        nextBtn.className = 'next';
//        nextBtn.innerHTML = '下一页 <i class="fas fa-chevron-right"></i>';
//        nextBtn.addEventListener('click', () => {
//            currentPage++;
//            renderAccounts();
//        });
//        pagination.appendChild(nextBtn);
//    }
//}

// 初始化账号卡片效果
function initAccountCards() {
    const accountCards = document.querySelectorAll('.account-card');
    
    accountCards.forEach(card => {
        // 添加鼠标悬停效果
        card.addEventListener('mouseenter', function() {
            this.classList.add('hover');
        });
        
        card.addEventListener('mouseleave', function() {
            this.classList.remove('hover');
        });
        
        // 添加点击效果
        card.addEventListener('click', function(e) {
            // 如果点击的是按钮或表单元素，不执行跳转
            if (e.target.closest('.btn') || e.target.closest('form')) {
                return;
            }
            
            // 获取卡片中的链接地址
            const link = this.querySelector('a.btn').getAttribute('href');
            if (link && !this.querySelector('a.btn').hasAttribute('disabled')) {
                window.location.href = link;
            }
        });
    });
}

// 初始化分类筛选
function initCategoryFilter() {
    const categoryLinks = document.querySelectorAll('.category-filter a');
    
    console.log('找到分类链接数量:', categoryLinks.length);
    
    categoryLinks.forEach(link => {
        const category = link.getAttribute('data-category');
        console.log('分类链接:', category);
        
        link.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('点击分类:', category);
            
            // 移除所有链接的活动状态
            categoryLinks.forEach(l => l.classList.remove('active'));
            
            // 添加当前链接的活动状态
            this.classList.add('active');
            
            // 筛选账号
            filterByCategory(category);
            
            // 应用当前排序
            sortAccounts(currentSort);
            
            // 渲染账号
            renderAccounts();
        });
    });
}

// 初始化排序功能
function initSorting() {
    const sortLinks = document.querySelectorAll('.sort-filter a');
    
    console.log('找到排序链接数量:', sortLinks.length);
    
    sortLinks.forEach(link => {
        const sortType = link.getAttribute('data-sort');
        console.log('排序链接:', sortType);
        
        link.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('点击排序:', sortType);
            
            // 移除所有链接的活动状态
            sortLinks.forEach(l => l.classList.remove('active'));
            
            // 添加当前链接的活动状态
            this.classList.add('active');
            
            // 排序账号
            sortAccounts(sortType);
            
            // 渲染账号
            renderAccounts();
        });
    });
}

// 初始化状态筛选复选框
function initStatusCheckboxes() {
    const statusCheckboxes = document.querySelectorAll('.status-filter input[type="checkbox"]');
    
    // 当任何复选框状态改变时，重新筛选
    statusCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            // 应用状态筛选
            applyStatusFilters();
            
            // 应用当前排序
            sortAccounts(currentSort);
            
            // 渲染账号
            renderAccounts();
        });
    });
}

// 应用状态筛选
function applyStatusFilters() {
    // 获取筛选条件
    const inStock = document.getElementById('in-stock-checkbox')?.checked || false;
    const isPromotion = document.getElementById('promotion-checkbox')?.checked || false;
    const isNew = document.getElementById('new-checkbox')?.checked || false;
    
    // 先按分类筛选
    filterByCategory(currentCategory);
    
    // 再应用状态筛选
    if (inStock) {
        filteredAccounts = filteredAccounts.filter(account => account.stock > 0);
    }
    
    if (isPromotion) {
        filteredAccounts = filteredAccounts.filter(account => 
            account.originalPrice && account.originalPrice > account.price
        );
    }
    
    if (isNew) {
        filteredAccounts = filteredAccounts.filter(account => account.isNew);
    }
} 