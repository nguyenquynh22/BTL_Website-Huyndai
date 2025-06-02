var maHDBanInput = document.querySelector('#maHDBan');
var matHangBanInput = document.querySelector('#matHangBan');
var soLuongBanInput = document.querySelector('#soLuongBan');
var giaTienBanInput = document.querySelector('#giaTienBan');

var addNewSellBillButton = document.querySelector('#add-new-sell-bill'); 
var sellBillOverlay = document.querySelector('#add-sell-bill-overlay');
var saveSellBillButton = sellBillOverlay.querySelector('.save-button');
var closeSellBillOverlayButton = sellBillOverlay.querySelector('.close-overlay-button'); 

var sellBillTableBody = document.querySelector('#sell-bill-table tbody');

// -- Input tìm kiếm --
var searchSellBillInput = document.querySelector('#search-sell-bill');
var searchSellBillButton = document.querySelector('.search-Button[data-search-for="sell-bill"]'); 

var sellBillData = [];
const LOCAL_STORAGE_SELL_BILL_KEY = 'sellBillData';

var editingSellBillId = null;

function loadSellBillDataFromLocalStorage() {
    const storedSellBillData = localStorage.getItem(LOCAL_STORAGE_SELL_BILL_KEY);
    if (storedSellBillData) {
        try {
            sellBillData = JSON.parse(storedSellBillData);
            console.log("Sell bill data loaded successfully:", sellBillData);
        } catch (e) {
            console.error('Error parsing sell bill data from localStorage', e);
            sellBillData = [];
        }
    }
}


function saveSellBillDataToLocalStorage() {
    localStorage.setItem(LOCAL_STORAGE_SELL_BILL_KEY, JSON.stringify(sellBillData));
}

// Hàm vừa thêm mới, vừa cập nhật hóa đơn bán
function saveSellBillItem() {
    saveSellBillButton.disabled = true; // Vô hiệu hóa nút lưu

    var maHDBan = maHDBanInput.value;
    var matHangBan = matHangBanInput.value;
    var soLuongBan = parseInt(soLuongBanInput.value);
    var giaTienBan = parseFloat(giaTienBanInput.value); 

    // Validation cơ bản
    if (!maHDBan || !matHangBan || isNaN(soLuongBan) || isNaN(giaTienBan)) {
        alert('Vui lòng điền đầy đủ và đúng định dạng thông tin hóa đơn bán.');
        saveSellBillButton.disabled = false; // Bật lại nút nếu validation thất bại
        return;
    }

    if (soLuongBan <= 0) {
        alert('Số lượng phải lớn hơn 0.');
        saveSellBillButton.disabled = false;
        return;
    }

    if (giaTienBan <= 0) {
        alert('Giá tiền phải lớn hơn 0.');
        saveSellBillButton.disabled = false;
        return;
    }

    var tongTien = soLuongBan * giaTienBan;

    if (editingSellBillId) {
        // Nếu editingSellBillId có giá trị, nghĩa là đang cập nhật một mục hiện có
        let itemToUpdate = sellBillData.find(item => item.Id === editingSellBillId);
        if (itemToUpdate) {
            itemToUpdate.MaHDBan = maHDBan;
            itemToUpdate.MatHangBan = matHangBan;
            itemToUpdate.SoLuongBan = soLuongBan;
            itemToUpdate.GiaTienBan = giaTienBan;
            itemToUpdate.TongTien = tongTien;
        }
        editingSellBillId = null; // Reset editingSellBillId sau khi cập nhật xong
    } else {
        if (sellBillData.some(item => item && item.MaHDBan && item.MaHDBan.toLowerCase() === maHDBan.toLowerCase())) {
            alert('Mã hóa đơn bán đã tồn tại. Vui lòng nhập mã hóa đơn khác.');
            saveSellBillButton.disabled = false;
            return;
        }

        var newItem = {
            Id: Date.now().toString(), // Tạo ID duy nhất
            MaHDBan: maHDBan,
            MatHangBan: matHangBan,
            SoLuongBan: soLuongBan,
            GiaTienBan: giaTienBan,
            TongTien: tongTien
        };
        sellBillData.push(newItem);
    }

    saveSellBillDataToLocalStorage();
    renderSellBillList();
    clearSellBillForm();
    sellBillOverlay.classList.remove('active'); 

    saveSellBillButton.disabled = false; // Bật lại nút sau khi hoàn thành lưu
}

// Hàm xóa trắng form nhập liệu hóa đơn bán
function clearSellBillForm() {
    maHDBanInput.value = '';
    matHangBanInput.value = '';
    soLuongBanInput.value = '';
    giaTienBanInput.value = '';
}

// Hàm render danh sách hóa đơn bán ra bảng
function renderSellBillList(dataToRender = sellBillData) { // Mặc định render toàn bộ sellBillData
    let tableContent = '';
    if (dataToRender.length === 0) {
        tableContent = `<tr><td colspan="7" style="text-align: center;">Không có dữ liệu hóa đơn bán nào.</td></tr>`;
    } else {
        for (let i = 0; i < dataToRender.length; i++) {
            const currentItem = dataToRender[i];
            const maHDBan = currentItem.MaHDBan || '';
            const matHangBan = currentItem.MatHangBan || '';
            const soLuongBan = currentItem.SoLuongBan || 0;
            const giaTienBan = currentItem.GiaTienBan || 0;
            const tongTien = currentItem.TongTien || 0;
            const id = currentItem.Id || '';

            tableContent += `<tr>
                                <td>${i + 1}</td>
                                <td>${maHDBan}</td>
                                <td>${matHangBan}</td>
                                <td>${soLuongBan}</td>
                                <td>${giaTienBan.toLocaleString('vi-VN')}</td>
                                <td>${tongTien.toLocaleString('vi-VN')}</td>
                                <td>
                                    <button onclick="deleteSellBillItem('${id}')"><i class="fas fa-trash-alt"></i></button>
                                    <button onclick="editSellBillItem('${id}')"><i class="fas fa-edit"></i></button>
                                </td>
                            </tr>`;
        }
    }
    sellBillTableBody.innerHTML = tableContent;
}

// Hàm xóa một mục hóa đơn bán
function deleteSellBillItem(id) {
    if (confirm('Bạn có chắc chắn muốn xóa hóa đơn bán này không?')) {
        sellBillData = sellBillData.filter(item => item.Id !== id);
        saveSellBillDataToLocalStorage();
        renderSellBillList();
    }
}

// Hàm điền dữ liệu vào form để chỉnh sửa hóa đơn bán
function editSellBillItem(id) {
    console.log('editSellBillItem called with id:', id);
    sellBillOverlay.classList.add('active'); // Hiển thị overlay

    let itemToEdit = sellBillData.find((item) => item.Id === id);
    if (itemToEdit) {
        maHDBanInput.value = itemToEdit.MaHDBan;
        matHangBanInput.value = itemToEdit.MatHangBan;
        soLuongBanInput.value = itemToEdit.SoLuongBan;
        giaTienBanInput.value = itemToEdit.GiaTienBan;
        editingSellBillId = id; // GÁN ID CỦA MỤC ĐANG CHỈNH SỬA
    }
    saveSellBillButton.disabled = false; // Đảm bảo nút lưu được bật
}


// Tải dữ liệu và render khi trang được tải
window.onload = function() {
    loadSellBillDataFromLocalStorage();
    renderSellBillList();
};

// Sự kiện click nút "Thêm mới"
addNewSellBillButton.addEventListener('click', function() {
    clearSellBillForm();
    editingSellBillId = null; 
    saveSellBillButton.disabled = false; // Bật nút lưu
    sellBillOverlay.classList.add('active'); 
});

// Sự kiện click nút "X" đóng overlay
closeSellBillOverlayButton.addEventListener('click', function() {
    sellBillOverlay.classList.remove('active');
    clearSellBillForm(); 
    editingSellBillId = null; 
    saveSellBillButton.disabled = false; // Bật nút lưu
});

// Sự kiện click nút "Lưu" trong form overlay
saveSellBillButton.addEventListener('click', saveSellBillItem);

// Sự kiện 'input' trên ô tìm kiếm
searchSellBillInput.addEventListener('input', function() {
    var searchTerm = searchSellBillInput.value.toLowerCase().trim(); // Lấy giá trị, chuyển chữ thường, bỏ khoảng trắng đầu cuối

    var filteredSellBillData = sellBillData.filter(function(item) {
        var maHDBanLower = item.MaHDBan ? item.MaHDBan.toLowerCase() : '';
        var matHangBanLower = item.MatHangBan ? item.MatHangBan.toLowerCase() : '';
        var soLuongBanStr = item.SoLuongBan ? item.SoLuongBan.toString().toLowerCase() : '';
        var giaTienBanStr = item.GiaTienBan ? item.GiaTienBan.toString().toLowerCase() : '';

        // Kiểm tra xem searchTerm có nằm trong bất kỳ trường nào không
        return maHDBanLower.includes(searchTerm) ||
               matHangBanLower.includes(searchTerm) ||
               soLuongBanStr.includes(searchTerm) ||
               giaTienBanStr.includes(searchTerm);
    });

    renderSellBillList(filteredSellBillData);
});

if (searchSellBillButton) {
    searchSellBillButton.addEventListener('click', function() {
        searchSellBillInput.dispatchEvent(new Event('input'));
    });
}