document.addEventListener('DOMContentLoaded', function() {
    const mainContent = document.getElementById('main-content');
    const sidebarLinks = document.querySelectorAll('.sidebar ul li a');

    // Hàm để tải nội dung
    function loadContent(pageName) {
        fetch(`${pageName}.html`) // Tải file HTML tương ứng
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.text();
            })
            .then(html => {
                mainContent.innerHTML = html;
            })
            .catch(error => {
                console.error('Lỗi khi tải nội dung:', error);
                mainContent.innerHTML = `<p style="color: red;">Không thể tải nội dung trang "${pageName}".</p>`;
            });
    }

    // Gắn sự kiện click cho các link sidebar
    sidebarLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault(); // Ngăn chặn hành vi mặc định của thẻ <a> (chuyển hướng trang)
            const pageName = this.dataset.page; // Lấy giá trị từ data-page
            if (pageName) {
                loadContent(pageName);
                // Tùy chọn: Cập nhật URL trình duyệt (HTML5 History API)
                history.pushState({ page: pageName }, '', `?page=${pageName}`);
            }
        });
    });

    // Xử lý khi người dùng nhấn nút back/forward của trình duyệt
    window.addEventListener('popstate', function(event) {
        if (event.state && event.state.page) {
            loadContent(event.state.page);
        } else {
            // Tải trang mặc định khi không có state (ví dụ, khi truy cập trực tiếp lần đầu)
            loadContent('dashboard');
        }
    });

    // Tải trang dashboard mặc định khi tải trang lần đầu
    // Kiểm tra query parameter để tải đúng trang nếu có
    const urlParams = new URLSearchParams(window.location.search);
    const initialPage = urlParams.get('page') || 'dashboard';
    loadContent(initialPage);
});
