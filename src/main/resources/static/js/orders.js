// 订单查询页面JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // 检查用户是否登录
    checkLoginStatus();
    
    // 初始化账号信息交互
    initAccountInteractions();
    
    // 初始化筛选和排序功能
    initFilterAndSort();
    
    // 初始化导出Excel功能
    initExportExcel();
});

// 检查用户登录状态
function checkLoginStatus() {
    // 这里应该是实际检查用户是否登录的代码
    // 为了演示，我们假设用户已登录
    const isLoggedIn = true;
    
    if (isLoggedIn) {
        // 已登录，显示账号列表
        document.getElementById('user-accounts').style.display = 'block';
        document.getElementById('not-logged-in').style.display = 'none';
        
        // 检查是否有账号
        const accountRows = document.querySelectorAll('#accounts-list-body tr');
        if (accountRows.length === 0) {
            document.getElementById('no-accounts').style.display = 'block';
        }
    } else {
        // 未登录，显示登录提示
        document.getElementById('user-accounts').style.display = 'none';
        document.getElementById('not-logged-in').style.display = 'block';
    }
}

// 初始化账号信息交互
function initAccountInteractions() {
    // 密码显示/隐藏切换
    const togglePasswordBtns = document.querySelectorAll('.toggle-password-btn');
    togglePasswordBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const passwordCell = this.closest('.password-cell');
            const maskedPassword = passwordCell.querySelector('.masked-password');
            const password = this.getAttribute('data-password');
            
            if (maskedPassword.textContent === '••••••••') {
                maskedPassword.textContent = password;
                this.innerHTML = '<i class="far fa-eye-slash"></i>';
            } else {
                maskedPassword.textContent = '••••••••';
                this.innerHTML = '<i class="far fa-eye"></i>';
            }
        });
    });
    
    // 复制信息按钮
    const copyAllBtns = document.querySelectorAll('.copy-all-btn');
    copyAllBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const account = this.getAttribute('data-account');
            const password = this.getAttribute('data-password');
            const copyText = `账号: ${account}\n密码: ${password}`;
            
            copyToClipboard(copyText);
            
            // 显示复制成功提示
            const originalHTML = this.innerHTML;
            this.innerHTML = '<i class="fas fa-check"></i> 已复制';
            
            setTimeout(() => {
                this.innerHTML = originalHTML;
            }, 1500);
        });
    });
}

// 初始化筛选和排序功能
function initFilterAndSort() {
    const accountTypeFilter = document.getElementById('account-type-filter');
    const sortOrder = document.getElementById('sort-order');
    
    // 账号类型筛选
    if (accountTypeFilter) {
        accountTypeFilter.addEventListener('change', function() {
            const selectedType = this.value;
            const accountRows = document.querySelectorAll('#accounts-list-body tr');
            
            accountRows.forEach(row => {
                if (selectedType === 'all' || row.getAttribute('data-type') === selectedType) {
                    row.style.display = '';
                } else {
                    row.style.display = 'none';
                }
            });
        });
    }
    
    // 排序功能
    if (sortOrder) {
        sortOrder.addEventListener('change', function() {
            sortAccountsByDate(this.value);
        });
    }
}

// 初始化导出Excel功能
function initExportExcel() {
    const exportExcelBtn = document.getElementById('export-excel-btn');
    
    if (exportExcelBtn) {
        exportExcelBtn.addEventListener('click', function() {
            exportAccountsToExcel();
        });
    }
}

// 导出账号列表为Excel
function exportAccountsToExcel() {
    // 获取当前可见的账号行（考虑筛选）
    const accountRows = Array.from(document.querySelectorAll('#accounts-list-body tr')).filter(row => {
        return row.style.display !== 'none';
    });
    
    if (accountRows.length === 0) {
        alert('没有可导出的账号数据');
        return;
    }
    
    // 创建工作表数据
    let csvContent = "账号,密码,辅助邮箱,账号类型,订单号,购买时间\n";
    
    accountRows.forEach(row => {
        const account = row.querySelector('td:nth-child(1)').textContent;
        const password = row.querySelector('.toggle-password-btn').getAttribute('data-password');
        const email = row.querySelector('td:nth-child(3)').textContent;
        const type = row.querySelector('td:nth-child(4)').textContent;
        const orderId = row.querySelector('td:nth-child(5)').textContent;
        const purchaseTime = row.querySelector('td:nth-child(6)').textContent;
        
        // 添加到CSV内容
        csvContent += `${account},${password},${email},${type},${orderId},${purchaseTime}\n`;
    });
    
    // 创建Blob对象
    const blob = new Blob(["\uFEFF" + csvContent], { type: 'text/csv;charset=utf-8;' });
    
    // 创建下载链接
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    
    // 设置下载属性
    link.setAttribute('href', url);
    link.setAttribute('download', `我的账号列表_${formatDate(new Date())}.csv`);
    link.style.visibility = 'hidden';
    
    // 添加到文档并触发点击
    document.body.appendChild(link);
    link.click();
    
    // 清理
    document.body.removeChild(link);
    
    // 显示成功提示
    const exportBtn = document.getElementById('export-excel-btn');
    const originalHTML = exportBtn.innerHTML;
    
    exportBtn.innerHTML = '<i class="fas fa-check"></i> 导出成功';
    exportBtn.disabled = true;
    
    setTimeout(() => {
        exportBtn.innerHTML = originalHTML;
        exportBtn.disabled = false;
    }, 1500);
}

// 按日期排序账号列表
function sortAccountsByDate(order) {
    const accountsListBody = document.getElementById('accounts-list-body');
    const rows = Array.from(accountsListBody.querySelectorAll('tr'));
    
    rows.sort((a, b) => {
        const dateA = new Date(a.querySelector('td:nth-child(6)').textContent);
        const dateB = new Date(b.querySelector('td:nth-child(6)').textContent);
        
        return order === 'asc' ? dateA - dateB : dateB - dateA;
    });
    
    // 清空表格并添加排序后的行
    accountsListBody.innerHTML = '';
    rows.forEach(row => {
        accountsListBody.appendChild(row);
    });
}

// 格式化日期为YYYYMMDD格式
function formatDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    
    return `${year}${month}${day}`;
}

// 复制文本到剪贴板
function copyToClipboard(text) {
    // 创建临时文本区域
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.style.position = 'fixed'; // 防止滚动到底部
    document.body.appendChild(textarea);
    textarea.select();
    
    try {
        // 执行复制命令
        document.execCommand('copy');
    } catch (err) {
        console.error('复制失败:', err);
    }
    
    // 移除临时元素
    document.body.removeChild(textarea);
} 