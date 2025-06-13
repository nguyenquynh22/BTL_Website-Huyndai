function handleGlobalSearch() {
    const searchInput = document.getElementById('global-search-input');
    const searchTerm = searchInput.value.toLowerCase().trim();

    if (searchTerm === '') {
        alert('Vui lòng nhập từ khóa tìm kiếm.');
        return;
    }

    const navLinks = document.querySelectorAll('.admin-main_left .load-content');
    let foundMatch = false;

    navLinks.forEach(link => {
        const pageName = link.dataset.pageName ? link.dataset.pageName.toLowerCase() : '';
        const targetHref = link.getAttribute('href');
        if (pageName.includes(searchTerm) || targetHref.includes(searchTerm)) {
            window.location.href = targetHref; 
            foundMatch = true;
        }
    });

    if (!foundMatch) {
        alert(`Không tìm thấy trang nào phù hợp với từ khóa "${searchTerm}".`);
    }
}

const globalSearchButton = document.getElementById('global-search-button');
if (globalSearchButton) {
    globalSearchButton.addEventListener('click', handleGlobalSearch);
}

//Enter
const globalSearchInput = document.getElementById('global-search-input');
if (globalSearchInput) {
    globalSearchInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            handleGlobalSearch();
        }
    });
}
var logOut = document.querySelector('.log-out')
logOut.addEventListener('click', function(){
    window.location.href = 'log_in.html'
})


var donHangElement = document.querySelector('#donhang');
var khachHangElement = document.querySelector('#khachhang');
var doanhThuElement = document.querySelector('#doanhthu');

// Keys của localStorage mà bạn đã sử dụng ở các file JS khác
const LOCAL_STORAGE_SELL_BILL_KEY = 'sellBillData';
const LOCAL_STORAGE_CLIENT_KEY = 'clientData';

// Hàm để lấy và hiển thị số lượng hóa đơn bán
function updateSellBillCount() {
    const storedSellBillData = localStorage.getItem(LOCAL_STORAGE_SELL_BILL_KEY);
    let sellBillCount = 0;

    if (storedSellBillData) {
        try {
            const sellBillData = JSON.parse(storedSellBillData);
            sellBillCount = sellBillData.length;
        } catch (e) {
            console.error('Không thể chuyển đổi dữ liệu hoá đơn bán:', e);
        }
    }

    if (donHangElement) {
        donHangElement.textContent = sellBillCount.toString();
    }
}

// Hàm để lấy và hiển thị số lượng khách hàng
function updateClientCount() {
    const storedClientData = localStorage.getItem(LOCAL_STORAGE_CLIENT_KEY);
    let clientCount = 0;

    if (storedClientData) {
        try {
            const clientData = JSON.parse(storedClientData);
            clientCount = clientData.length;
        } catch (e) {
            console.error('Không thể chuyển đổi dữ liệu khách hàng:', e);
        }
    }

    if (khachHangElement) {
        khachHangElement.textContent = clientCount.toString();
    }
}

// HÀM MỚI: Để lấy và hiển thị tổng doanh thu
function updateTotalRevenue() {
    const storedSellBillData = localStorage.getItem(LOCAL_STORAGE_SELL_BILL_KEY);
    let totalRevenue = 0;

    if (storedSellBillData) {
        try {
            const sellBillData = JSON.parse(storedSellBillData);

            totalRevenue = sellBillData.reduce((sum, item) => {
                const itemTongTien = parseFloat(item.TongTien);
                return sum + (isNaN(itemTongTien) ? 0 : itemTongTien);
            }, 0);
        } catch (e) {
            console.error('Không thể chuyển đổi dữ liệu hoá đơn bán:', e);
        }
    }
    if (doanhThuElement) {
        doanhThuElement.textContent = totalRevenue.toLocaleString('vi-VN') + ' VNĐ';
    }
}

window.addEventListener('load', function() {
    updateSellBillCount();
    updateClientCount();
    updateTotalRevenue(); 

    window.addEventListener('storage', function(event) {
        if (event.key === LOCAL_STORAGE_SELL_BILL_KEY) {
            updateSellBillCount();
            updateTotalRevenue(); 
        }
        if (event.key === LOCAL_STORAGE_CLIENT_KEY) {
            updateClientCount();
        }
    });
});