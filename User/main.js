// ================== Xử lý Slider Hero ==================
const images = document.querySelectorAll(".hero-img img");
const prevBtn = document.querySelector(".prev");
const nextBtn = document.querySelector(".next");
let currentIndex = 0;
let interval;

function showImage(index) {
    images.forEach((img) => img.classList.remove("active"));
    images[index].classList.add("active");
}

function nextImage() {
    currentIndex = (currentIndex + 1) % images.length;
    showImage(currentIndex);
}

function prevImage() {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    showImage(currentIndex);
}

function startAutoSlide() {
    interval = setInterval(nextImage, 4000);
}

function resetAutoSlide() {
    clearInterval(interval);
    startAutoSlide();
}

nextBtn.addEventListener("click", function () {
    nextImage();
    resetAutoSlide();
});

prevBtn.addEventListener("click", function () {
    prevImage();
    resetAutoSlide();
});

showImage(currentIndex);
startAutoSlide();

const menuBtn = document.querySelector('.menu-btn');
const navBar = document.querySelector('.navigation-bar');

menuBtn.addEventListener('click', () => {
    navBar.classList.toggle('show');
});

// ================== Xử lý Tabs ==================
const tabs = document.querySelectorAll(".discovery-vehicles-tab-item");
const cars = document.querySelectorAll(".car");

function updateDisplay(category) {
    cars.forEach(car => {
        car.style.display = car.classList.contains(category) ? "block" : "none";
    });
}

tabs.forEach(tab => {
    tab.addEventListener("click", function () {
        const category = tab.getAttribute("data-category");

        tabs.forEach(t => t.classList.remove("active"));
        tab.classList.add("active");

        updateDisplay(category);
    });
});

const defaultCategory = document.querySelector(".discovery-vehicles-tab-item.active").getAttribute("data-category");
updateDisplay(defaultCategory);


document.addEventListener('DOMContentLoaded', function() {
    // ================== Khai báo các phần tử DOM ==================
    const searchIcon = document.querySelector('.search-icon');
    const searchContainer = document.querySelector('.search'); 
    const closeSearchButton = document.querySelector('.close-search');
    const searchInput = document.querySelector('.form-search_item input[type="text"]');
    const overlay = document.querySelector('.overlay');
    const body = document.body; // Cần thiết cho việc thêm/bớt class

    // ================== Xử lý Hiển thị/Ẩn Khung Tìm Kiếm ==================
    function openSearch() {
        body.classList.add("show-search");
        // searchContainer.style.display = 'block';
        // overlay.style.display = 'block';   
        searchInput.focus();
    }

    function closeSearch() {
        body.classList.remove("show-search");  
        searchInput.value = '';
    }

    searchIcon.addEventListener('click', function(event) {
        event.preventDefault(); 
        openSearch();
    });

    closeSearchButton.addEventListener('click', function() {
        closeSearch();
    });

    overlay.addEventListener('click', function() {
        closeSearch();
    });

    // ================== Xử lý Logic Tìm Kiếm ==================
    searchInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            event.preventDefault(); 
            const searchTerm = searchInput.value.trim();

            if (searchTerm) {
                const searchMap = {
                    "trang chủ": "TrangChu.html",
                    "giới thiệu": "GioiThieu.html",
                    "trả góp": "TraGop.html",
                    "dự toán chi phí": "DuToanChiPhi.html",
                    "dịch vụ": "DichVu.html",
                    "bảo hành": "BaoHanh.html",
                    "phụ tùng và phụ kiện": "PhuTung&PhuKien.html",
                    "đăng ký lái thử": "DangKyLaiThu.html",
                    "khuyến mãi": "KhuyenMai.html",
                    "tin tức": "TinTuc.html",
                    "liên hệ": "LienHe.html"
                };

                const normalizedSearchTerm = searchTerm.toLowerCase();
                let foundPage = null;

                for (const key in searchMap) {
                    if (key.includes(normalizedSearchTerm)) { // So sánh key đã chuẩn hóa với normalizedSearchTerm
                        foundPage = searchMap[key];
                        break;
                    }
                }

                if (foundPage) {
                    window.location.href = foundPage;
                } else {
                    alert(`Không tìm thấy kết quả cho: "${searchTerm}". Vui lòng thử từ khóa khác.`);
                }
            } else {
                alert("Vui lòng nhập từ khóa tìm kiếm.");
            }
        }
    });
});





// Dữ liệu tin tức: Tiêu đề và đường dẫn tương ứng
const newsData = {
    "HYUNDAI SANTA FE ALL NEW RA MẮT TẠI VIỆT NAM": "Tin1.html",
    "Hệ thống an toàn chủ động trên xe Hyundai SantaFe": "Tin2.html",
    "Hyundai Palisade Đối Thủ Của Ford Explorer": "Tin3.html",
    "Hyundai Ioniq 5 trình diễn công nghệ đi ngang và xoay 360 độ": "Tin4.html",
    "Hyundai Kona đe dọa Ford Ecosport bằng động cơ Turbo": "Tin5.html",
    "Lộ diện hình ảnh đầu tiên của Hyundai Elantra 2019": "Tin6.html",
    "Chi Tiết Hyundai Solati Đối Thủ Lớn Ford Transit": "Tin7.html",
    "Hyundai bổ sung phiên bản “+” cho Sonata 2018": "Tin8.html"
};

const newsSearchInput = document.getElementById('newsSearchInput');

if (newsSearchInput) {
    newsSearchInput.addEventListener('keydown', function(event) {
        if (event.key === 'Enter') {
            const searchTerm = this.value.toLowerCase(); 
            let foundNews = false;

            for (const title in newsData) {
                if (newsData.hasOwnProperty(title)) {
                    if (title.toLowerCase().includes(searchTerm)) {
                        window.location.href = newsData[title];
                        foundNews = true;
                        break; 
                    }
                }
            }

            if (!foundNews) {
                alert('Không tìm thấy tin tức phù hợp. Vui lòng thử lại với từ khóa khác!');
            }
        }
    });
}


// const menuBtn = document.querySelector('.menu-btn');
const navigationBar = document.querySelector('.navigation-bar');

if (menuBtn) {
    menuBtn.addEventListener('click', () => {
        navigationBar.classList.toggle('active');
    });
}


const searchIcon = document.querySelector('.search-icon');
const searchBar = document.querySelector('.search');
const closeSearchBtn = document.querySelector('.close-search');
const overlay = document.querySelector('.overlay');


if (searchIcon) {
    searchIcon.addEventListener('click', (e) => {
        e.preventDefault();
        searchBar.style.display = 'block';
        overlay.style.display = 'block';
    });
}


if (closeSearchBtn) {
    closeSearchBtn.addEventListener('click', () => {
        searchBar.style.display = 'none';
        overlay.style.display = 'none';
    });
}


if (overlay) {
    overlay.addEventListener('click', () => {
        searchBar.style.display = 'none';
        overlay.style.display = 'none';
    });
}

var newBtn = document.querySelector('.newBtn')
if (newBtn) {
    newBtn.addEventListener('click', function(){
        window.location.href = 'TinTuc.html'; 
    });
} else {
    console.error("Không tìm thấy phần tử có class 'newBtn'.");
}


document.querySelector('.dvBtn').addEventListener('click', function(){
    window.location.href = 'DichVu.html'
})