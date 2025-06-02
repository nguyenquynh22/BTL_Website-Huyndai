// -- Khai báo các phần tử DOM --
var maXeInput = document.querySelector('#ma');
var tenXeInput = document.querySelector('#ten');
var dongXeInput = document.querySelector('#dong');
var giaNiemYetInput = document.querySelector('#gia');
var nhaCungCapInput = document.querySelector('#nhaCungCap');

var addNewCarButton = document.querySelector('#add-new-car'); // Nút "Thêm mới"
var carOverlay = document.querySelector('#add-car-overlay'); // Overlay form thêm/sửa xe
var saveCarButton = carOverlay.querySelector('.save-button'); // Nút "Lưu" trong overlay
var closeCarOverlayButton = carOverlay.querySelector('.close-overlay-button'); // Nút "X" đóng overlay

// Phần tử tbody của bảng xe
var carTableBody = document.querySelector('#car-table tbody');

// Input tìm kiếm
var searchCarInput = document.querySelector('#search-car');
var searchCarButton = document.querySelector('.search-Button[data-search-for="car"]'); // Nút "Tìm kiếm"

// -- Biến dữ liệu và Local Storage --
var carData = []; // Mảng chứa dữ liệu xe
const LOCAL_STORAGE_CAR_KEY = 'carData'; // Key cho Local Storage

// Biến quan trọng: Để lưu ID của xe đang được chỉnh sửa
var editingCarId = null;

// -- Các hàm tiện ích --

// Ham load du lieu xe tu local storage
function loadCarDataFromLocalStorage() {
    const storedCarData = localStorage.getItem(LOCAL_STORAGE_CAR_KEY);
    if (storedCarData) {
        try {
            carData = JSON.parse(storedCarData);
            console.log("Car data loaded successfully:", carData);
        } catch (e) {
            console.error('Error parsing car data from localStorage', e);
            carData = [];
        }
    } else {
        console.log("No car data found in localStorage.");
    }
}

// Ham luu du lieu xe vao local storage
function saveCarDataToLocalStorage() {
    localStorage.setItem(LOCAL_STORAGE_CAR_KEY, JSON.stringify(carData));
}

// -- Hàm xử lý CRUD --

// Hàm vừa thêm mới, vừa cập nhật xe
function saveCarItem() {
    saveCarButton.disabled = true; // Vô hiệu hóa nút lưu

    var maXe = maXeInput.value;
    var tenXe = tenXeInput.value;
    var dongXe = dongXeInput.value;
    var giaNiemYet = giaNiemYetInput.value;
    var nhaCungCap = nhaCungCapInput.value;

    // Validation cơ bản
    if (!maXe || !tenXe || !dongXe || !giaNiemYet || !nhaCungCap) {
        alert('Vui lòng điền đầy đủ thông tin xe: Mã xe, Tên xe, Dòng xe, Giá niêm yết và Nhà cung cấp.');
        saveCarButton.disabled = false; // Bật lại nút nếu validation thất bại
        return;
    }

    // Kiểm tra tính hợp lệ của giá niêm yết (phải là số dương)
    if (isNaN(parseFloat(giaNiemYet)) || parseFloat(giaNiemYet) <= 0) {
        alert('Giá niêm yết phải là một số dương.');
        saveCarButton.disabled = false;
        return;
    }

    if (editingCarId) {
        // Nếu editingCarId có giá trị, nghĩa là đang cập nhật một mục hiện có
        let itemToUpdate = carData.find(item => item.Id === editingCarId);
        if (itemToUpdate) {
            itemToUpdate.MaXe = maXe;
            itemToUpdate.TenXe = tenXe;
            itemToUpdate.DongXe = dongXe;
            itemToUpdate.GiaNiemYet = giaNiemYet;
            itemToUpdate.NhaCungCap = nhaCungCap;
        }
        editingCarId = null; // Reset editingCarId sau khi cập nhật xong
    } else {
        // Nếu editingCarId là null, nghĩa là đang thêm một mục mới
        // Kiểm tra mã xe đã tồn tại chưa (chỉ khi thêm mới)
        if (carData.some(item => item.MaXe.toLowerCase() === maXe.toLowerCase())) {
            alert('Mã xe đã tồn tại. Vui lòng nhập mã xe khác.');
            saveCarButton.disabled = false;
            return;
        }

        var newItem = {
            Id: Date.now().toString(), // Tạo ID duy nhất
            MaXe: maXe,
            TenXe: tenXe,
            DongXe: dongXe,
            GiaNiemYet: giaNiemYet,
            NhaCungCap: nhaCungCap
        };
        carData.push(newItem);
    }

    saveCarDataToLocalStorage();
    renderCarList(); // Gọi hàm render để cập nhật bảng
    clearCarForm();
    carOverlay.classList.remove('active'); // Đóng overlay

    saveCarButton.disabled = false; // Bật lại nút sau khi hoàn thành lưu
}

// Hàm xóa trắng form nhập liệu
function clearCarForm() {
    maXeInput.value = '';
    tenXeInput.value = '';
    dongXeInput.value = '';
    giaNiemYetInput.value = '';
    nhaCungCapInput.value = '';
}

// Hàm render danh sách xe ra bảng
function renderCarList(dataToRender = carData) { // Mặc định render toàn bộ carData
    let tableContent = '';
    if (dataToRender.length === 0) {
        tableContent = `<tr><td colspan="7" style="text-align: center;">Không có dữ liệu xe nào.</td></tr>`;
    } else {
        for (let i = 0; i < dataToRender.length; i++) {
            // Đảm bảo các thuộc tính tồn tại trước khi truy cập
            const currentItem = dataToRender[i];
            const maXe = currentItem.MaXe || '';
            const tenXe = currentItem.TenXe || '';
            const dongXe = currentItem.DongXe || '';
            const giaNiemYet = currentItem.GiaNiemYet || '';
            const nhaCungCap = currentItem.NhaCungCap || '';
            const id = currentItem.Id || '';

            tableContent += `<tr>
                                <td>${i + 1}</td>
                                <td>${maXe}</td>
                                <td>${tenXe}</td>
                                <td>${dongXe}</td>
                                <td>${giaNiemYet}</td>
                                <td>${nhaCungCap}</td>
                                <td>
                                    <button onclick="deleteCarItem('${id}')"><i class="fas fa-trash-alt"></i></button>
                                    <button onclick="editCarItem('${id}')"><i class="fas fa-edit"></i></button>
                                </td>
                            </tr>`;
        }
    }
    carTableBody.innerHTML = tableContent;
}

// Hàm xóa một mục xe
function deleteCarItem(id) {
    if (confirm('Bạn có chắc chắn muốn xóa xe này không?')) {
        carData = carData.filter(item => item.Id !== id);
        saveCarDataToLocalStorage();
        renderCarList(); // Render lại bảng sau khi xóa
    }
}

// Hàm điền dữ liệu vào form để chỉnh sửa
function editCarItem(id) {
    console.log('editCarItem called with id:', id);
    carOverlay.classList.add('active'); // Hiển thị overlay

    let itemToEdit = carData.find((item) => item.Id === id);
    if (itemToEdit) {
        maXeInput.value = itemToEdit.MaXe;
        tenXeInput.value = itemToEdit.TenXe;
        dongXeInput.value = itemToEdit.DongXe;
        giaNiemYetInput.value = itemToEdit.GiaNiemYet;
        nhaCungCapInput.value = itemToEdit.NhaCungCap;
        editingCarId = id; // GÁN ID CỦA MỤC ĐANG CHỈNH SỬA
    }
    saveCarButton.disabled = false; // Đảm bảo nút lưu được bật
}

// -- Event Listeners --

// Tải dữ liệu và render khi trang được tải
window.onload = function() {
    loadCarDataFromLocalStorage();
    renderCarList();
};

// Sự kiện click nút "Thêm mới"
addNewCarButton.addEventListener('click', function() {
    clearCarForm(); 
    editingCarId = null; // Đảm bảo là thêm mới
    saveCarButton.disabled = false; // Bật nút lưu
    carOverlay.classList.add('active'); // Hiển thị overlay
    console.log('addNewCarButton:', addNewCarButton);
});

// Sự kiện click nút "X" đóng overlay
closeCarOverlayButton.addEventListener('click', function() {
    carOverlay.classList.remove('active');
    clearCarForm(); // Xóa form khi đóng
    editingCarId = null; // Reset editingCarId
    saveCarButton.disabled = false; // Bật nút lưu
});

// Sự kiện click nút "Lưu" trong form overlay
saveCarButton.addEventListener('click', saveCarItem);

// Sự kiện 'input' trên ô tìm kiếm
searchCarInput.addEventListener('input', function() {
    var searchTerm = searchCarInput.value.toLowerCase().trim(); // Lấy giá trị, chuyển chữ thường, bỏ khoảng trắng đầu cuối

    var filteredCarData = carData.filter(function(item) {
        // Chuyển các trường bạn muốn tìm kiếm sang chữ thường
        var maXeLower = item.MaXe ? item.MaXe.toLowerCase() : '';
        var tenXeLower = item.TenXe ? item.TenXe.toLowerCase() : '';
        var dongXeLower = item.DongXe ? item.DongXe.toLowerCase() : '';
        var nhaCungCapLower = item.NhaCungCap ? item.NhaCungCap.toLowerCase() : '';

        // Kiểm tra xem searchTerm có nằm trong bất kỳ trường nào không
        return maXeLower.includes(searchTerm) ||
               tenXeLower.includes(searchTerm) ||
               dongXeLower.includes(searchTerm) ||
               nhaCungCapLower.includes(searchTerm);
    });

    renderCarList(filteredCarData); // Render bảng với dữ liệu đã lọc
});

// Sự kiện click nút "Tìm kiếm" (nếu vẫn muốn giữ)
if (searchCarButton) {
    searchCarButton.addEventListener('click', function() {
        // Kích hoạt sự kiện 'input' để sử dụng cùng logic lọc
        searchCarInput.dispatchEvent(new Event('input'));
    });
}