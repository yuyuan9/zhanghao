// 账号商城页面JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // 初始化账号卡片效果
    initAccountCards();
    
    // 初始化筛选功能
    initFilters();
    
    // 初始化排序功能
    initSorting();
    
    // 初始化分页功能
    initPagination();
});

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
            // 如果是已售罄状态或点击的是按钮，不执行跳转
            if (this.classList.contains('sold-out') || e.target.closest('.btn')) {
                return;
            }
            
            // 否则跳转到详情页
            const link = this.querySelector('a.btn').getAttribute('href');
            window.location.href = link;
        });
        
        // 处理库存显示
        const stockEl = card.querySelector('.account-stock');
        if (stockEl) {
            const stockNum = parseInt(stockEl.textContent.match(/\d+/)[0]);
            
            // 根据库存数量添加不同的类名
            if (stockNum <= 5 && stockNum > 0) {
                stockEl.classList.add('stock-low');
            } else if (stockNum === 0) {
                stockEl.classList.add('stock-critical');
                card.classList.add('sold-out');
                
                // 修改按钮文本
                const btn = card.querySelector('.btn');
                if (btn) {
                    btn.textContent = '已售罄';
                    btn.classList.remove('btn-primary');
                    btn.classList.add('btn-disabled');
                    btn.setAttribute('disabled', 'disabled');
                }
            }
        }
    });
}

// 初始化筛选功能
function initFilters() {
    // 分类筛选
    const categoryLinks = document.querySelectorAll('.category-filter a');
    const accountCards = document.querySelectorAll('.account-card');
    
    categoryLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // 移除所有链接的活动状态
            categoryLinks.forEach(l => l.classList.remove('active'));
            
            // 添加当前链接的活动状态
            this.classList.add('active');
            
            // 获取当前分类
            const category = this.dataset.category;
            
            // 显示或隐藏账号卡片
            accountCards.forEach(card => {
                if (category === 'all' || card.dataset.category === category) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
    
    // 价格筛选
    const priceFilterBtn = document.getElementById('price-filter-btn');
    const minPriceInput = document.getElementById('min-price');
    const maxPriceInput = document.getElementById('max-price');
    
    priceFilterBtn.addEventListener('click', function() {
        const minPrice = parseInt(minPriceInput.value) || 0;
        const maxPrice = parseInt(maxPriceInput.value) || Infinity;
        
        accountCards.forEach(card => {
            const priceEl = card.querySelector('.account-price');
            const price = parseInt(priceEl.textContent.replace(/[^\d]/g, ''));
            
            if (price >= minPrice && price <= maxPrice) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    });
    
    // 状态筛选
    const statusCheckboxes = document.querySelectorAll('.status-filter input');
    
    statusCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            // 这里可以根据复选框的状态进行筛选
            // 例如，如果"有库存"复选框被选中，则隐藏已售罄的账号
            if (this.checked && this.parentElement.textContent.includes('有库存')) {
                accountCards.forEach(card => {
                    if (card.classList.contains('sold-out')) {
                        card.style.display = 'none';
                    }
                });
            } else {
                accountCards.forEach(card => {
                    card.style.display = 'block';
                });
            }
        });
    });
}

// 初始化排序功能
function initSorting() {
    const sortLinks = document.querySelectorAll('.sort-filter a');
    const accountGrid = document.querySelector('.account-grid');
    const accountCards = Array.from(document.querySelectorAll('.account-card'));
    
    sortLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // 移除所有链接的活动状态
            sortLinks.forEach(l => l.classList.remove('active'));
            
            // 添加当前链接的活动状态
            this.classList.add('active');
            
            // 获取排序方式
            const sortType = this.dataset.sort;
            
            // 根据排序方式对账号卡片进行排序
            const sortedCards = [...accountCards].sort((a, b) => {
                if (sortType === 'price-asc') {
                    const priceA = parseInt(a.querySelector('.account-price').textContent.replace(/[^\d]/g, ''));
                    const priceB = parseInt(b.querySelector('.account-price').textContent.replace(/[^\d]/g, ''));
                    return priceA - priceB;
                } else if (sortType === 'price-desc') {
                    const priceA = parseInt(a.querySelector('.account-price').textContent.replace(/[^\d]/g, ''));
                    const priceB = parseInt(b.querySelector('.account-price').textContent.replace(/[^\d]/g, ''));
                    return priceB - priceA;
                } else if (sortType === 'sales') {
                    const salesA = parseInt(a.querySelector('.account-sales').textContent.match(/\d+/)[0]);
                    const salesB = parseInt(b.querySelector('.account-sales').textContent.match(/\d+/)[0]);
                    return salesB - salesA;
                }
                return 0;
            });
            
            // 重新添加排序后的卡片
            accountGrid.innerHTML = '';
            sortedCards.forEach(card => {
                accountGrid.appendChild(card);
            });
        });
    });
}

// 初始化分页功能
function initPagination() {
    const paginationLinks = document.querySelectorAll('.pagination a');
    
    paginationLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // 移除所有链接的活动状态
            paginationLinks.forEach(l => l.classList.remove('active'));
            
            // 添加当前链接的活动状态（除了"下一页"按钮）
            if (!this.classList.contains('next')) {
                this.classList.add('active');
            }
            
            // 获取页码
            const page = this.dataset.page;
            
            // 这里可以添加页面切换逻辑
            // 例如，通过AJAX加载新的账号数据
            console.log(`切换到第${page}页`);
        });
    });
} 