
var maKHInput = document.querySelector('#ma'); 
var tenKHInput = document.querySelector('#ten');
var diaChiKHInput = document.querySelector('#diaChi');
var emailKHInput = document.querySelector('#email');
var sdtKHInput = document.querySelector('#sdt');

var addNewClientButton = document.querySelector('#add-new-client'); 
var clientOverlay = document.querySelector('#add-client-overlay');
var saveClientButton = clientOverlay.querySelector('.save-button'); 
var closeClientOverlayButton = clientOverlay.querySelector('.close-overlay-button'); 

var clientTableBody = document.querySelector('#client-table tbody');

var searchClientInput = document.querySelector('#search-client');
var searchClientButton = document.querySelector('.search-Button[data-search-for="client"]'); 

var clientData = []; 
const LOCAL_STORAGE_CLIENT_KEY = 'clientData'; 
var editingClientId = null;

function loadClientDataFromLocalStorage() {
    const storedClientData = localStorage.getItem(LOCAL_STORAGE_CLIENT_KEY);
    if (storedClientData) {
        try {
            clientData = JSON.parse(storedClientData);
            console.log("Client data loaded successfully:", clientData);
        } catch (e) {
            console.error('Error parsing client data from localStorage', e);
            clientData = [];
        }
    } else {
        console.log("No client data found in localStorage.");
    }
}

// Ham luu du lieu khách hàng vao local storage
function saveClientDataToLocalStorage() {
    localStorage.setItem(LOCAL_STORAGE_CLIENT_KEY, JSON.stringify(clientData));
}

// -- Hàm xử lý CRUD --

// Hàm vừa thêm mới, vừa cập nhật khách hàng
function saveClientItem() {
    saveClientButton.disabled = true; // Vô hiệu hóa nút lưu

    var maKH = maKHInput.value;
    var tenKH = tenKHInput.value;
    var diaChiKH = diaChiKHInput.value;
    var emailKH = emailKHInput.value;
    var sdtKH = sdtKHInput.value;

    // Validation cơ bản
    if (!maKH || !tenKH || !diaChiKH || !emailKH || !sdtKH) {
        alert('Vui lòng điền đầy đủ thông tin khách hàng.');
        saveClientButton.disabled = false; 
        return;
    }

    // Validation email
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailKH)) {
        alert('Email không hợp lệ. Vui lòng nhập đúng định dạng email.');
        saveClientButton.disabled = false;
        return;
    }
    
    if (!/^0\d{9}$/.test(sdtKH)) {
        alert('Số điện thoại không hợp lệ. Vui lòng nhập 10 chữ số và bắt đầu bằng số 0.');
        saveClientButton.disabled = false;
        return;
    }

    if (editingClientId) {
        // Nếu editingClientId có giá trị, nghĩa là đang cập nhật một mục hiện có
        let itemToUpdate = clientData.find(item => item.Id === editingClientId);
        if (itemToUpdate) {
            itemToUpdate.MaKH = maKH;
            itemToUpdate.TenKH = tenKH;
            itemToUpdate.DiaChiKH = diaChiKH;
            itemToUpdate.EmailKH = emailKH;
            itemToUpdate.SdtKH = sdtKH;
        }
        editingClientId = null; // Reset editingClientId sau khi cập nhật xong
    } else {
        if (clientData.some(item => item.MaKH.toLowerCase() === maKH.toLowerCase())) {
            alert('Mã khách hàng đã tồn tại. Vui lòng nhập mã khách hàng khác.');
            saveClientButton.disabled = false;
            return;
        }

        var newItem = {
            Id: Date.now().toString(), // Tạo ID duy nhất
            MaKH: maKH,
            TenKH: tenKH,
            DiaChiKH: diaChiKH,
            EmailKH: emailKH,
            SdtKH: sdtKH
        };
        clientData.push(newItem);
    }

    saveClientDataToLocalStorage();
    renderClientList();
    clearClientForm();
    clientOverlay.classList.remove('active');

    saveClientButton.disabled = false; // Bật lại nút sau khi hoàn thành lưu
}

// Hàm xóa trắng form nhập liệu khách hàng
function clearClientForm() {
    maKHInput.value = '';
    tenKHInput.value = '';
    diaChiKHInput.value = '';
    emailKHInput.value = '';
    sdtKHInput.value = '';
}

// Hàm render danh sách khách hàng ra bảng
function renderClientList(dataToRender = clientData) { 
    let tableContent = '';
    if (dataToRender.length === 0) {
        tableContent = `<tr><td colspan="7" style="text-align: center;">Không có dữ liệu khách hàng nào.</td></tr>`;
    } else {
        for (let i = 0; i < dataToRender.length; i++) {
            const currentItem = dataToRender[i];
            const maKH = currentItem.MaKH || '';
            const tenKH = currentItem.TenKH || '';
            const diaChiKH = currentItem.DiaChiKH || '';
            const emailKH = currentItem.EmailKH || '';
            const sdtKH = currentItem.SdtKH || '';
            const id = currentItem.Id || '';

            tableContent += `<tr>
                                <td>${i + 1}</td>
                                <td>${maKH}</td>
                                <td>${tenKH}</td>
                                <td>${diaChiKH}</td>
                                <td>${emailKH}</td>
                                <td>${sdtKH}</td>
                                <td>
                                    <button onclick="deleteClientItem('${id}')"><i class="fas fa-trash-alt"></i></button>
                                    <button onclick="editClientItem('${id}')"><i class="fas fa-edit"></i></button>
                                </td>
                            </tr>`;
        }
    }
    clientTableBody.innerHTML = tableContent;
}

// Hàm xóa một mục khách hàng
function deleteClientItem(id) {
    if (confirm('Bạn có chắc chắn muốn xóa khách hàng này không?')) {
        clientData = clientData.filter(item => item.Id !== id);
        saveClientDataToLocalStorage();
        renderClientList(); 
    }
}

// Hàm điền dữ liệu vào form để chỉnh sửa khách hàng
function editClientItem(id) {
    console.log('editClientItem called with id:', id);
    clientOverlay.classList.add('active'); 

    let itemToEdit = clientData.find((item) => item.Id === id);
    if (itemToEdit) {
        maKHInput.value = itemToEdit.MaKH;
        tenKHInput.value = itemToEdit.TenKH;
        diaChiKHInput.value = itemToEdit.DiaChiKH;
        emailKHInput.value = itemToEdit.EmailKH;
        sdtKHInput.value = itemToEdit.SdtKH;
        editingClientId = id; // GÁN ID CỦA MỤC ĐANG CHỈNH SỬA
    }
    saveClientButton.disabled = false; // Đảm bảo nút lưu được bật
}

// -- Event Listeners --

// Tải dữ liệu và render khi trang được tải
window.onload = function() {
    loadClientDataFromLocalStorage();
    renderClientList();
};

// Sự kiện click nút "Thêm mới"
addNewClientButton.addEventListener('click', function() {
    clearClientForm(); 
    editingClientId = null; 
    saveClientButton.disabled = false;
    clientOverlay.classList.add('active'); 
});

// Sự kiện click nút "X" đóng overlay
closeClientOverlayButton.addEventListener('click', function() {
    clientOverlay.classList.remove('active');
    clearClientForm(); 
    editingClientId = null; 
    saveClientButton.disabled = false;
});

// Sự kiện click nút "Lưu" trong form overlay
saveClientButton.addEventListener('click', saveClientItem);

// Sự kiện 'input' trên ô tìm kiếm
searchClientInput.addEventListener('input', function() {
    var searchTerm = searchClientInput.value.toLowerCase().trim();

    var filteredClientData = clientData.filter(function(item) {
        // Chuyển các trường bạn muốn tìm kiếm sang chữ thường
        var maKHLower = item.MaKH ? item.MaKH.toLowerCase() : '';
        var tenKHLower = item.TenKH ? item.TenKH.toLowerCase() : '';
        var diaChiKHLower = item.DiaChiKH ? item.DiaChiKH.toLowerCase() : '';
        var emailKHLower = item.EmailKH ? item.EmailKH.toLowerCase() : '';
        var sdtKHLower = item.SdtKH ? item.SdtKH.toLowerCase() : '';

        // Kiểm tra xem searchTerm có nằm trong bất kỳ trường nào không
        return maKHLower.includes(searchTerm) ||
               tenKHLower.includes(searchTerm) ||
               diaChiKHLower.includes(searchTerm) ||
               emailKHLower.includes(searchTerm) ||
               sdtKHLower.includes(searchTerm);
    });

    renderClientList(filteredClientData); 
});

if (searchClientButton) {
    searchClientButton.addEventListener('click', function() {
        // Kích hoạt sự kiện 'input' để sử dụng cùng logic lọc
        searchClientInput.dispatchEvent(new Event('input'));
    });
}