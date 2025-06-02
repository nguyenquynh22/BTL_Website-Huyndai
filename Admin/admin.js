 // Hàm xử lý tìm kiếm tổng thể trên thanh search-bar
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

        // Kiểm tra xem từ khóa tìm kiếm có trong tên trang hoặc trong đường dẫn href
        if (pageName.includes(searchTerm) || targetHref.includes(searchTerm)) {
            window.location.href = targetHref; // Chuyển hướng đến trang phù hợp
            foundMatch = true;
        }
    });

    if (!foundMatch) {
        alert(`Không tìm thấy trang nào phù hợp với từ khóa "${searchTerm}".`);
    }
}

// Gắn sự kiện cho nút tìm kiếm tổng thể
const globalSearchButton = document.getElementById('global-search-button');
if (globalSearchButton) {
    globalSearchButton.addEventListener('click', handleGlobalSearch);
}

// Gắn sự kiện cho phím Enter trong input tìm kiếm tổng thể
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