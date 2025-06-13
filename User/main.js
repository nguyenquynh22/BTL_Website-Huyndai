const menuBtns = document.querySelectorAll('.menu-btn');
const navBars = document.querySelectorAll('.navigation-bar'); 

menuBtns.forEach((menuBtn, index) => {
    menuBtn.addEventListener('click', () => {
        if (navBars[index]) {
            navBars[index].classList.toggle('show');
        }
    });
});
// ================== Xử lý Slider Hero ==================
const images = document.querySelectorAll(".hero-img img");
const prevBtn = document.querySelector(".prev");
const nextBtn = document.querySelector(".next");
let currentIndex = 0;
let interval;

function showImage(index) {
    if(images.length>0){
        images.forEach((img) => img.classList.remove("active"));
        images[index].classList.add("active");
    }
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

if(nextBtn){
    nextBtn.addEventListener("click", function () {
        nextImage();
        resetAutoSlide();
    });
}
if(prevBtn){
    prevBtn.addEventListener("click", function () {
        prevImage();
        resetAutoSlide();
    });
}

showImage(currentIndex);
startAutoSlide();
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
const activeTab = document.querySelector(".discovery-vehicles-tab-item.active");
if (activeTab) {
    const defaultCategory = activeTab.getAttribute("data-category");
    updateDisplay(defaultCategory);
}


document.addEventListener('DOMContentLoaded', function() {
    // ================== Khai báo các phần tử DOM ==================
    const searchIcon = document.querySelector('.search-icon');
    const searchContainer = document.querySelector('.search'); 
    const closeSearchButton = document.querySelector('.close-search');
    const searchInput = document.querySelector('.form-search_item input[type="text"]');
    const overlay = document.querySelector('.overlay');
    const body = document.body; 

    // ================== Xử lý Hiển thị/Ẩn Khung Tìm Kiếm ==================
    function openSearch() {
        body.classList.add("show-search"); 
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

//===============xử lý search=================
const searchIcons = document.querySelectorAll('.search-icon');
const searchBars = document.querySelectorAll('.search');
const closeSearchBtns = document.querySelectorAll('.close-search');
const overlays = document.querySelectorAll('.overlay');


// === PHẦN 1: MỞ THANH TÌM KIẾM KHI NHẤN ICON ===
if (searchIcons.length > 0) {
    searchIcons.forEach((searchIcon, index) => {
        searchIcon.addEventListener('click', (e) => {
            e.preventDefault();

            // Hiển thị thanh tìm kiếm và overlay tương ứng với icon được nhấn
            if (searchBars[index]) {
                searchBars[index].style.display = 'block';
            }
            if (overlays[index]) {
                overlays[index].style.display = 'block';
            }
        });
    });
}

// === PHẦN 2: ĐÓNG THANH TÌM KIẾM KHI NHẤN NÚT "CLOSE" ===
if (closeSearchBtns.length > 0) {
    closeSearchBtns.forEach((closeBtn, index) => {
        closeBtn.addEventListener('click', () => {
            if (searchBars[index]) {
                searchBars[index].style.display = 'none';
            }
            if (overlays[index]) {
                overlays[index].style.display = 'none';
            }
        });
    });
}

// === PHẦN 3: ĐÓNG THANH TÌM KIẾM KHI NHẤN VÀO OVERLAY ===
if (overlays.length > 0) {
    overlays.forEach((overlay, index) => {
        overlay.addEventListener('click', () => {
            // Tái sử dụng logic bằng cách giả lập một cú click vào nút đóng tương ứng
            if (closeSearchBtns[index]) {
                closeSearchBtns[index].click();
            }
        });
    });
}

var newBtn = document.querySelector('.newBtn')
if (newBtn) {
    newBtn.addEventListener('click', function(){
        window.location.href = 'TinTuc.html'; 
    });
} else {
    console.error("Không tìm thấy phần tử có class " + newBtn);
}

var dichVuBtn = document.querySelector('.dvBtn')
if(dichVuBtn){
    dichVuBtn.addEventListener('click', function(){
        window.location.href = 'DichVu.html' 
    })
}

var formContact = document.querySelector('.section-form-contact');
var fullNameInput = document.querySelector('#full-name');
var phoneInput = document.querySelector('#phone');
var emailInput = document.querySelector('#email');
var checkBox = document.querySelector('#agreement');
var submitBtn = document.querySelector('.submit');

if(formContact){
    formContact.addEventListener('mouseover', () => {
        formContact.style.boxShadow = '0 5px 10px rgba(0 , 0, 0, 0.3)';
    });
    formContact.addEventListener('mouseout', () => {
        formContact.style.boxShadow = 'none';
    });

}

const fullNameRegex = /^[a-zA-Z\s]+$/; // Cho phép chữ cái và khoảng trắng
const phoneNumberRegex = /^0\d{9}$/;
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


function reloadInput(){
    fullNameInput.value = ''
    phoneInput.value = ''
    emailInput.value = ''
    checkBox.checked = false;
}
if(phoneInput){
    phoneInput.addEventListener('input', () => {
        if (phoneInput.value.trim() !== '' && !phoneNumberRegex.test(phoneInput.value)) {
            alert('Bạn đã nhập sai định dạng số điện thoại (phải có 10 chữ số và bắt đầu bằng 0).');
            phoneInput.value = ''
        }
    });
}

if(fullNameInput){
    fullNameInput.addEventListener('input', () => {
        if (fullNameInput.value.trim() !== '' && !fullNameRegex.test(fullNameInput.value)) {
            alert('Bạn đã nhập sai định dạng tên (chỉ được chứa chữ cái và khoảng trắng).');
            fullNameInput.value =''
        }
    });
}

if(emailInput){
    emailInput.addEventListener('input', () => {
        if (emailInput.value.trim() !== '' && !emailRegex.test(emailInput.value)) {
            alert('Bạn đã nhập sai định dạng email.');
            emailInput.value = ''
        }
    });
}

if(submitBtn){
    submitBtn.addEventListener('click', (e) => {
        e.preventDefault();

        let hasError = false; 

        if (fullNameInput.value.trim() === '' || phoneInput.value.trim() === '' || emailInput.value.trim() === '') {
            alert("không được bỏ trống.");
            hasError = true;
        } 

        if (!checkBox.checked) {
            alert("Bạn phải đồng ý với các quy định và chính sách của Hyundai.");
            hasError = true;
        }

        // Nếu không có lỗi nào được tìm thấy
        if (!hasError) {
            alert('Gửi thành công!');
            reloadInput()
        } else {
        }
    });
}


// ================== Xử lý Slider Cơ Sở Hạ Tầng ==================
const slider = document.querySelector('.slider');
const prevSliderBtn = document.querySelector('.slider-btn.prev');
const nextSliderBtn = document.querySelector('.slider-btn.next');
const dots = document.querySelectorAll('.slider-dots .dot');
const galleryInner = document.querySelector('.gallery_inner');

const galleryContainer = document.querySelector('.zoom');
const galleryCloseBtn = document.querySelector('.zoom .close'); 
const galleryImage = document.querySelector('.gallery_inner img');
const galleryPrevBtn = document.querySelector('.zoom .control.prev'); 
const galleryNextBtn = document.querySelector('.zoom .control.next'); 

const imgs = document.querySelectorAll('.slider_1 img');
let slideWidth = 0;
if (document.querySelector('.slider_1')) {
    slideWidth = document.querySelector('.slider_1').offsetWidth;
}
let sliderIndex = 0;

function updateSlider() {
    if (slider) {
        slider.style.transform = `translateX(-${sliderIndex * slideWidth}px)`;
    }
    dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === sliderIndex);
    });
}

if (prevSliderBtn) {
    prevSliderBtn.addEventListener('click', () => {
        sliderIndex = (sliderIndex - 1 + dots.length) % dots.length;
        updateSlider();
    });
}

if (nextSliderBtn) {
    nextSliderBtn.addEventListener('click', () => {
        sliderIndex = (sliderIndex + 1) % dots.length;
        updateSlider();
    });
}

dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        sliderIndex = index;
        updateSlider();
    });
});

updateSlider();

function galleryShow(){
    if (galleryPrevBtn && galleryNextBtn && galleryContainer && galleryImage && imgs.length > 0) {
        if(sliderIndex === 0){
            galleryPrevBtn.classList.add('hide');
        }else{
            galleryPrevBtn.classList.remove('hide');
        }
        if(sliderIndex === imgs.length - 1){
            galleryNextBtn.classList.add('hide');
        }else{
            galleryNextBtn.classList.remove('hide');
        }
        galleryImage.src = imgs[sliderIndex].src; 
        galleryContainer.classList.add('show');
    }
}

imgs.forEach((item, index)=>{
    item.addEventListener('click', function(){
        sliderIndex = index;
        galleryShow();
    });
});

if (galleryCloseBtn) {
    galleryCloseBtn.addEventListener('mouseover', ()=>{
        galleryCloseBtn.style.color = 'red'
    })
    galleryCloseBtn.addEventListener('mouseout', ()=>{
        galleryCloseBtn.style.color = 'unset'
    })
    galleryCloseBtn.addEventListener('click', function(){
        if (galleryContainer) {
            galleryContainer.classList.remove('show');
            
        }
    });
}
document.addEventListener('keydown', function(e){ 
    if(e.key === 'Escape'){ 
        if (galleryContainer) {
            galleryContainer.classList.remove('show');
        }
    }
});

if (galleryPrevBtn) {
    galleryPrevBtn.addEventListener('click', function(){
        if(sliderIndex > 0){
            sliderIndex--;
            galleryShow();
        }
    });
}

if (galleryNextBtn) {
    galleryNextBtn.addEventListener('click', function(){
        if(sliderIndex < imgs.length - 1){
            sliderIndex++;
            galleryShow();
        }
    });
}
      
