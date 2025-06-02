
var maHDNhapInput = document.querySelector('#maHDNhap');
var matHangNhapInput = document.querySelector('#matHangNhap');
var soLuongNhapInput = document.querySelector('#soLuongNhap');
var giaTienNhapInput = document.querySelector('#giaTienNhap');
var phanLoaiNhapInput = document.querySelector('#phanLoaiNhap');

var addNewImportBillButton = document.querySelector('#add-new-import-bill'); 
var importBillOverlay = document.querySelector('#add-import-bill-overlay'); 
var saveImportBillButton = importBillOverlay.querySelector('.save-button'); 
var closeImportBillOverlayButton = importBillOverlay.querySelector('.close-overlay-button'); 

var importBillTableBody = document.querySelector('#import-bill-table tbody');

var searchImportBillInput = document.querySelector('#search-import-bill');
var searchImportBillButton = document.querySelector('.search-Button[data-search-for="import-bill"]'); // Nút "Tìm kiếm"

var importBillData = [];
const LOCAL_STORAGE_IMPORT_BILL_KEY = 'importBillData'; 

var editingImportBillId = null;

function loadImportBillDataFromLocalStorage() {
    const storedImportBillData = localStorage.getItem(LOCAL_STORAGE_IMPORT_BILL_KEY);
    if (storedImportBillData) {
        try {
            importBillData = JSON.parse(storedImportBillData);
            console.log("Import bill data loaded successfully:", importBillData);
        } catch (e) {
            console.error('Error parsing import bill data from localStorage', e);
            importBillData = [];
        }
    } else {
        console.log("No import bill data found in localStorage.");
    }
}

function saveImportBillDataToLocalStorage() {
    localStorage.setItem(LOCAL_STORAGE_IMPORT_BILL_KEY, JSON.stringify(importBillData));
}

// Hàm vừa thêm mới, vừa cập nhật hóa đơn nhập
function saveImportBillItem() {
    saveImportBillButton.disabled = true; // Vô hiệu hóa nút lưu

    var maHDNhap = maHDNhapInput.value;
    var matHangNhap = matHangNhapInput.value;
    var soLuongNhap = parseInt(soLuongNhapInput.value);
    var giaTienNhap = parseFloat(giaTienNhapInput.value); 
    var phanLoaiNhap = phanLoaiNhapInput.value;

    // Validation cơ bản
    if (!maHDNhap || !matHangNhap || isNaN(soLuongNhap) || isNaN(giaTienNhap) || !phanLoaiNhap) { // Thêm phanLoaiNhap vào validation
        alert('Vui lòng điền đầy đủ và đúng định dạng thông tin hóa đơn nhập.');
        saveImportBillButton.disabled = false; // Bật lại nút nếu validation thất bại
        return;
    }

    if (soLuongNhap <= 0) {
        alert('Số lượng phải lớn hơn 0.');
        saveImportBillButton.disabled = false;
        return;
    }

    if (giaTienNhap <= 0) {
        alert('Giá tiền phải lớn hơn 0.');
        saveImportBillButton.disabled = false;
        return;
    }

    var tongTien = soLuongNhap * giaTienNhap;

    if (editingImportBillId) {
        // Nếu editingImportBillId có giá trị, nghĩa là đang cập nhật một mục hiện có
        let itemToUpdate = importBillData.find(item => item.Id === editingImportBillId);
        if (itemToUpdate) {
            itemToUpdate.MaHDNhap = maHDNhap;
            itemToUpdate.MatHangNhap = matHangNhap;
            itemToUpdate.SoLuongNhap = soLuongNhap;
            itemToUpdate.GiaTienNhap = giaTienNhap;
            itemToUpdate.TongTien = tongTien;
            itemToUpdate.PhanLoaiNhap = phanLoaiNhap; 
        }
        editingImportBillId = null; // Reset editingImportBillId sau khi cập nhật xong
    } else {

        if (importBillData.some(item => item && item.MaHDNhap && item.MaHDNhap.toLowerCase() === maHDNhap.toLowerCase())) {
            alert('Mã hóa đơn nhập đã tồn tại. Vui lòng nhập mã hóa đơn khác.');
            saveImportBillButton.disabled = false;
            return;
        }

        var newItem = {
            Id: Date.now().toString(), // Tạo ID duy nhất
            MaHDNhap: maHDNhap,
            MatHangNhap: matHangNhap,
            SoLuongNhap: soLuongNhap,
            GiaTienNhap: giaTienNhap,
            TongTien: tongTien,
            PhanLoaiNhap: phanLoaiNhap // Thêm trường Phân loại vào đối tượng mới
        };
        importBillData.push(newItem);
    }

    saveImportBillDataToLocalStorage();
    renderImportBillList(); 
    clearImportBillForm();
    importBillOverlay.classList.remove('active'); 

    saveImportBillButton.disabled = false; // Bật lại nút sau khi hoàn thành lưu
}

function clearImportBillForm() {
    maHDNhapInput.value = '';
    matHangNhapInput.value = '';
    soLuongNhapInput.value = '';
    giaTienNhapInput.value = '';
    phanLoaiNhapInput.value = '';
}

// Hàm render danh sách hóa đơn nhập ra bảng
function renderImportBillList(dataToRender = importBillData) {
    let tableContent = '';
    // Thay đổi colspan từ 7 thành 8 (thêm 1 cột Phân loại)
    if (dataToRender.length === 0) {
        tableContent = `<tr><td colspan="8" style="text-align: center;">Không có dữ liệu hóa đơn nhập nào.</td></tr>`;
    } else {
        for (let i = 0; i < dataToRender.length; i++) {
            const currentItem = dataToRender[i];
            const maHDNhap = currentItem.MaHDNhap || '';
            const matHangNhap = currentItem.MatHangNhap || '';
            const soLuongNhap = currentItem.SoLuongNhap || 0;
            const giaTienNhap = currentItem.GiaTienNhap || 0;
            const tongTien = currentItem.TongTien || 0;
            const phanLoaiNhap = currentItem.PhanLoaiNhap || ''; // Lấy giá trị Phân loại
            const id = currentItem.Id || '';

            tableContent += `<tr>
                                <td>${i + 1}</td>
                                <td>${maHDNhap}</td>
                                <td>${matHangNhap}</td>
                                <td>${soLuongNhap}</td>
                                <td>${giaTienNhap.toLocaleString('vi-VN')}</td>
                                <td>${tongTien.toLocaleString('vi-VN')}</td>
                                <td>${phanLoaiNhap}</td> <td>
                                    <button onclick="deleteImportBillItem('${id}')"><i class="fas fa-trash-alt"></i></button>
                                    <button onclick="editImportBillItem('${id}')"><i class="fas fa-edit"></i></button>
                                </td>
                            </tr>`;
        }
    }
    importBillTableBody.innerHTML = tableContent;
}

// Hàm xóa một mục hóa đơn nhập
function deleteImportBillItem(id) {
    if (confirm('Bạn có chắc chắn muốn xóa hóa đơn nhập này không?')) {
        importBillData = importBillData.filter(item => item.Id !== id);
        saveImportBillDataToLocalStorage();
        renderImportBillList(); // Render lại bảng sau khi xóa
    }
}

// Hàm điền dữ liệu vào form để chỉnh sửa hóa đơn nhập
function editImportBillItem(id) {
    console.log('editImportBillItem called with id:', id);
    importBillOverlay.classList.add('active'); // Hiển thị overlay

    let itemToEdit = importBillData.find((item) => item.Id === id);
    if (itemToEdit) {
        maHDNhapInput.value = itemToEdit.MaHDNhap;
        matHangNhapInput.value = itemToEdit.MatHangNhap;
        soLuongNhapInput.value = itemToEdit.SoLuongNhap;
        giaTienNhapInput.value = itemToEdit.GiaTienNhap;
        phanLoaiNhapInput.value = itemToEdit.PhanLoaiNhap; 
        editingImportBillId = id; // GÁN ID CỦA MỤC ĐANG CHỈNH SỬA
    }
    saveImportBillButton.disabled = false; // Đảm bảo nút lưu được bật
}

// -- Event Listeners --

// Tải dữ liệu và render khi trang được tải
window.onload = function() {
    loadImportBillDataFromLocalStorage();
    renderImportBillList();
};

// Sự kiện click nút "Thêm mới"
addNewImportBillButton.addEventListener('click', function() {
    clearImportBillForm(); // Xóa form để chuẩn bị cho nhập liệu mới
    editingImportBillId = null; // Đảm bảo là thêm mới
    saveImportBillButton.disabled = false; // Bật nút lưu
    importBillOverlay.classList.add('active'); // Hiển thị overlay
});

// Sự kiện click nút "X" đóng overlay
closeImportBillOverlayButton.addEventListener('click', function() {
    importBillOverlay.classList.remove('active');
    clearImportBillForm(); // Xóa form khi đóng
    editingImportBillId = null; // Reset editingImportBillId
    saveImportBillButton.disabled = false; // Bật nút lưu
});

// Sự kiện click nút "Lưu" trong form overlay
saveImportBillButton.addEventListener('click', saveImportBillItem);

// Sự kiện 'input' trên ô tìm kiếm
searchImportBillInput.addEventListener('input', function() {
    var searchTerm = searchImportBillInput.value.toLowerCase().trim(); // Lấy giá trị, chuyển chữ thường, bỏ khoảng trắng đầu cuối

    var filteredImportBillData = importBillData.filter(function(item) {
        // Chuyển các trường bạn muốn tìm kiếm sang chữ thường
        var maHDNhapLower = item.MaHDNhap ? item.MaHDNhap.toLowerCase() : '';
        var matHangNhapLower = item.MatHangNhap ? item.MatHangNhap.toLowerCase() : '';
        var soLuongNhapStr = item.SoLuongNhap ? item.SoLuongNhap.toString().toLowerCase() : '';
        var giaTienNhapStr = item.GiaTienNhap ? item.GiaTienNhap.toString().toLowerCase() : '';
        var phanLoaiNhapLower = item.PhanLoaiNhap ? item.PhanLoaiNhap.toLowerCase() : ''; // Thêm tìm kiếm theo Phân loại

        // Kiểm tra xem searchTerm có nằm trong bất kỳ trường nào không
        return maHDNhapLower.includes(searchTerm) ||
               matHangNhapLower.includes(searchTerm) ||
               soLuongNhapStr.includes(searchTerm) ||
               giaTienNhapStr.includes(searchTerm) ||
               phanLoaiNhapLower.includes(searchTerm); // Thêm điều kiện tìm kiếm cho Phân loại
    });

    renderImportBillList(filteredImportBillData);
});

// Sự kiện click nút "Tìm kiếm" (nếu vẫn muốn giữ)
if (searchImportBillButton) {
    searchImportBillButton.addEventListener('click', function() {
        // Kích hoạt sự kiện 'input' để sử dụng cùng logic lọc
        searchImportBillInput.dispatchEvent(new Event('input'));
    });
}