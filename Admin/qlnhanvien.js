
var maNVInput = document.querySelector('#maNV');
var hoTenInput = document.querySelector('#hoTen');
var gioiTinhInput = document.querySelector('#gioiTinh');
var ngaySinhInput = document.querySelector('#ngaySinh');
var sdtNVInput = document.querySelector('#sdtNV');
var diaChiInput = document.querySelector('#diaChi');
var chucVuInput = document.querySelector('#chucVu');
var luongInput = document.querySelector('#luong');

var addNewEmployeeButton = document.querySelector('#add-new-employee');
var employeeOverlay = document.querySelector('#add-employee-overlay'); 
var saveEmployeeButton = employeeOverlay.querySelector('.save-button'); 
var closeEmployeeOverlayButton = employeeOverlay.querySelector('.close-overlay-button'); 

var employeeTableBody = document.querySelector('#employee-table tbody');

var searchEmployeeInput = document.querySelector('#search-employee');
var searchEmployeeButton = document.querySelector('.search-Button[data-search-for="employee"]'); 

var employeeData = [];
const LOCAL_STORAGE_EMPLOYEE_KEY = 'employeeData'; 

var editingEmployeeId = null;

function loadEmployeeDataFromLocalStorage() {
    const storedEmployeeData = localStorage.getItem(LOCAL_STORAGE_EMPLOYEE_KEY);
    if (storedEmployeeData) {
        try {
            employeeData = JSON.parse(storedEmployeeData);
            console.log("Employee data loaded successfully:", employeeData);
        } catch (e) {
            console.error('Error parsing employee data from localStorage', e);
            employeeData = [];
        }
    } else {
        console.log("No employee data found in localStorage.");
    }
}

// Ham luu du lieu nhân viên vao local storage
function saveEmployeeDataToLocalStorage() {
    localStorage.setItem(LOCAL_STORAGE_EMPLOYEE_KEY, JSON.stringify(employeeData));
}

// -- Hàm xử lý CRUD --

// Hàm vừa thêm mới, vừa cập nhật nhân viên
function saveEmployeeItem() {
    saveEmployeeButton.disabled = true; // Vô hiệu hóa nút lưu

    var maNV = maNVInput.value;
    var hoTen = hoTenInput.value;
    var gioiTinh = gioiTinhInput.value;
    var ngaySinh = ngaySinhInput.value;
    var sdtNV = sdtNVInput.value;
    var diaChi = diaChiInput.value;
    var chucVu = chucVuInput.value;
    var luong = luongInput.value;

    // Validation cơ bản
    if (!maNV || !hoTen || !gioiTinh || !ngaySinh || !sdtNV || !diaChi || !chucVu || !luong) {
        alert('Vui lòng điền đầy đủ thông tin nhân viên.');
        saveEmployeeButton.disabled = false; // Bật lại nút nếu validation thất bại
        return;
    }

    // Kiểm tra tính hợp lệ của lương (phải là số dương)
    if (isNaN(parseFloat(luong)) || parseFloat(luong) < 0) {
        alert('Lương phải là một số không âm.');
        saveEmployeeButton.disabled = false;
        return;
    }
    
    if (!/^0\d{9}$/.test(sdtNV)) {
        alert('Số điện thoại không hợp lệ. Vui lòng nhập 10 chữ số và bắt đầu bằng số 0.');
        saveEmployeeButton.disabled = false;
        return;
    }

    if (editingEmployeeId) {
        // Nếu editingEmployeeId có giá trị, nghĩa là đang cập nhật một mục hiện có
        let itemToUpdate = employeeData.find(item => item.Id === editingEmployeeId);
        if (itemToUpdate) {
            itemToUpdate.MaNV = maNV;
            itemToUpdate.HoTen = hoTen;
            itemToUpdate.GioiTinh = gioiTinh;
            itemToUpdate.NgaySinh = ngaySinh;
            itemToUpdate.SdtNV = sdtNV;
            itemToUpdate.DiaChi = diaChi;
            itemToUpdate.ChucVu = chucVu;
            itemToUpdate.Luong = luong;
        }
        editingEmployeeId = null; 
    } else {
        if (employeeData.some(item => item.MaNV.toLowerCase() === maNV.toLowerCase())) {
            alert('Mã nhân viên đã tồn tại. Vui lòng nhập mã nhân viên khác.');
            saveEmployeeButton.disabled = false;
            return;
        }

        var newItem = {
            Id: Date.now().toString(), // Tạo ID duy nhất
            MaNV: maNV,
            HoTen: hoTen,
            GioiTinh: gioiTinh,
            NgaySinh: ngaySinh,
            SdtNV: sdtNV,
            DiaChi: diaChi,
            ChucVu: chucVu,
            Luong: luong
        };
        employeeData.push(newItem);
    }

    saveEmployeeDataToLocalStorage();
    renderEmployeeList(); 
    clearEmployeeForm();
    employeeOverlay.classList.remove('active');
    saveEmployeeButton.disabled = false; 
}

function clearEmployeeForm() {
    maNVInput.value = '';
    hoTenInput.value = '';
    gioiTinhInput.value = '';
    ngaySinhInput.value = '';
    sdtNVInput.value = '';
    diaChiInput.value = '';
    chucVuInput.value = '';
    luongInput.value = '';
}

// Hàm render danh sách nhân viên ra bảng
function renderEmployeeList(dataToRender = employeeData) { 
    let tableContent = '';
    if (dataToRender.length === 0) {
        tableContent = `<tr><td colspan="9" style="text-align: center;">Không có dữ liệu nhân viên nào.</td></tr>`;
    } else {
        for (let i = 0; i < dataToRender.length; i++) {
            const currentItem = dataToRender[i];
            const maNV = currentItem.MaNV || '';
            const hoTen = currentItem.HoTen || '';
            const gioiTinh = currentItem.GioiTinh || '';
            const ngaySinh = currentItem.NgaySinh || '';
            const sdtNV = currentItem.SdtNV || '';
            const diaChi = currentItem.DiaChi || '';
            const chucVu = currentItem.ChucVu || '';
            const luong = currentItem.Luong || '';
            const id = currentItem.Id || '';

            tableContent += `<tr>
                                <td>${i + 1}</td>
                                <td>${maNV}</td>
                                <td>${hoTen}</td>
                                <td>${gioiTinh}</td>
                                <td>${ngaySinh}</td>
                                <td>${sdtNV}</td>
                                <td>${diaChi}</td>
                                <td>${chucVu}</td>
                                <td>${luong}</td>
                                <td>
                                    <button onclick="deleteEmployeeItem('${id}')"><i class="fas fa-trash-alt"></i></button>
                                    <button onclick="editEmployeeItem('${id}')"><i class="fas fa-edit"></i></button>
                                </td>
                            </tr>`;
        }
    }
    employeeTableBody.innerHTML = tableContent;
}

// Hàm xóa một mục nhân viên
function deleteEmployeeItem(id) {
    if (confirm('Bạn có chắc chắn muốn xóa nhân viên này không?')) {
        employeeData = employeeData.filter(item => item.Id !== id);
        saveEmployeeDataToLocalStorage();
        renderEmployeeList(); 
    }
}

// Hàm điền dữ liệu vào form để chỉnh sửa nhân viên
function editEmployeeItem(id) {
    console.log('editEmployeeItem called with id:', id);
    employeeOverlay.classList.add('active'); 
    let itemToEdit = employeeData.find((item) => item.Id === id);
    if (itemToEdit) {
        maNVInput.value = itemToEdit.MaNV;
        hoTenInput.value = itemToEdit.HoTen;
        gioiTinhInput.value = itemToEdit.GioiTinh;
        ngaySinhInput.value = itemToEdit.NgaySinh;
        sdtNVInput.value = itemToEdit.SdtNV;
        diaChiInput.value = itemToEdit.DiaChi;
        chucVuInput.value = itemToEdit.ChucVu;
        luongInput.value = itemToEdit.Luong;
        editingEmployeeId = id; // GÁN ID CỦA MỤC ĐANG CHỈNH SỬA
    }
    saveEmployeeButton.disabled = false; // Đảm bảo nút lưu được bật
}

// -- Event Listeners --

// Tải dữ liệu và render khi trang được tải
window.onload = function() {
    loadEmployeeDataFromLocalStorage();
    renderEmployeeList();
};

// Sự kiện click nút "Thêm mới"
addNewEmployeeButton.addEventListener('click', function() {
    clearEmployeeForm();
    editingEmployeeId = null;
    saveEmployeeButton.disabled = false;
    employeeOverlay.classList.add('active');
});

// Sự kiện click nút "X" đóng overlay
closeEmployeeOverlayButton.addEventListener('click', function() {
    employeeOverlay.classList.remove('active');
    clearEmployeeForm(); 
    editingEmployeeId = null; 
    saveEmployeeButton.disabled = false;
});

// Sự kiện click nút "Lưu" trong form overlay
saveEmployeeButton.addEventListener('click', saveEmployeeItem);

// Sự kiện 'input' trên ô tìm kiếm
searchEmployeeInput.addEventListener('input', function() {
    var searchTerm = searchEmployeeInput.value.toLowerCase().trim(); // Lấy giá trị, chuyển chữ thường, bỏ khoảng trắng đầu cuối

    var filteredEmployeeData = employeeData.filter(function(item) {
        // Chuyển các trường bạn muốn tìm kiếm sang chữ thường
        var maNVLower = item.MaNV ? item.MaNV.toLowerCase() : '';
        var hoTenLower = item.HoTen ? item.HoTen.toLowerCase() : '';
        var sdtNVLower = item.SdtNV ? item.SdtNV.toLowerCase() : '';
        var diaChiLower = item.DiaChi ? item.DiaChi.toLowerCase() : '';
        var chucVuLower = item.ChucVu ? item.ChucVu.toLowerCase() : '';

        // Kiểm tra xem searchTerm có nằm trong bất kỳ trường nào không
        return maNVLower.includes(searchTerm) ||
               hoTenLower.includes(searchTerm) ||
               sdtNVLower.includes(searchTerm) ||
               diaChiLower.includes(searchTerm) ||
               chucVuLower.includes(searchTerm);
    });

    renderEmployeeList(filteredEmployeeData); // Render bảng với dữ liệu đã lọc
});

if (searchEmployeeButton) {
    searchEmployeeButton.addEventListener('click', function() {
        searchEmployeeInput.dispatchEvent(new Event('input'));
    });
}