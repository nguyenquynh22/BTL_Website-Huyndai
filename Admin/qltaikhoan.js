
var userNameAccount = document.querySelector('#tenNguoiDung');
var emailAccount = document.querySelector('#emailTK');
var phoneNumberAccount = document.querySelector('#sdtTK');
var passwordAccount = document.querySelector('#matKhauTK');
var confirmPassword = document.querySelector('#xacNhanMatKhauTK');

var addNewAccount = document.querySelector('#add-new-account');
var overlayAccount = document.querySelector('#add-account-overlay');
var saveAccount = document.querySelector('#save-account-button');
var closeOverlay = document.querySelector('#close-account-overlay-button');

var accountTableBody = document.querySelector('#account-table tbody');

var searchInput = document.getElementById('search-account');
var searchAccountButton = document.querySelector('.search-Button[data-search-for="account"]');

var data = [];
const LOCAL_STORAGE_KEY = 'accountData';

var editingId = null;

function loadDataFromLocalStorage() {
    const storedData = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (storedData) {
        try {
            data = JSON.parse(storedData);
            console.log("Load dữ liệu thành công:", data);
        } catch (e) {
            console.error('Lỗi load dữ liệu', e);
            data = [];
        }
    } else {
        console.log("Không tìm thấy dữ liệu");
    }
}

// ham luu du lieu vao local
function saveDataToLocalStorage() {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(data));
}

// Hàm vừa thêm mới, vừa cập nhật
function saveItem() {
    saveAccount.disabled = true;
    var userName = userNameAccount.value;
    var email = emailAccount.value;
    var phoneNumber = phoneNumberAccount.value;
    var passWord = passwordAccount.value;
    var confirmedPassword = confirmPassword.value;

    if (passWord !== confirmedPassword) {
        alert('Mật khẩu và xác nhận mật khẩu không khớp!');
        saveAccount.disabled = false;
        return;
    }

    if (!userName || !email || !phoneNumber || !passWord) {
        alert('Vui lòng điền đầy đủ thông tin: Tên người dùng, Email, Số điện thoại và Mật khẩu.');
        saveAccount.disabled = false;
        return;
    }

    // Kiểm tra tên người dùng đã tồn tại chưa (chỉ khi thêm mới)
    if (!editingId) {
        if (data.some(item => item && item.UserName && item.UserName.toLowerCase() === userName.toLowerCase())) {
            alert('Tên người dùng đã tồn tại. Vui lòng nhập tên người dùng khác.');
            saveAccount.disabled = false;
            return;
        }
    }

    if (editingId) {
        let itemToUpdate = data.find(item => item.Id === editingId);
        if (itemToUpdate) {
            itemToUpdate.UserName = userName;
            itemToUpdate.Email = email;
            itemToUpdate.PhoneNumber = phoneNumber;
            itemToUpdate.PassWord = passWord;
        }
        editingId = null;
    } else {
        var item = {
            Id: Date.now().toString(),
            UserName: userName,
            Email: email,
            PhoneNumber: phoneNumber,
            PassWord: passWord
        };
        data.push(item);
    }

    saveDataToLocalStorage();
    render();
    clear();
    overlayAccount.classList.remove('active');

    saveAccount.disabled = false;
}

function clear() {
    userNameAccount.value = '';
    emailAccount.value = '';
    phoneNumberAccount.value = '';
    passwordAccount.value = '';
    confirmPassword.value = '';
}

function render(dataToRender = data) { 
    // Kiểm tra nếu accountTableBody là null, thoát hàm
    if (!accountTableBody) {
        console.error("Account table body not found.");
        return;
    }

    let tableContent = '';
    if (dataToRender.length === 0) {
        tableContent = `<tr><td colspan="6" style="text-align: center;">Không có dữ liệu tài khoản nào.</td></tr>`;
    } else {
        for (let i = 0; i < dataToRender.length; i++) { 
            const currentItem = dataToRender[i];
            tableContent += `<tr>
                                <td>${i + 1}</td>
                                <td>${currentItem.UserName || ''}</td>
                                <td>${currentItem.Email || ''}</td>
                                <td>${currentItem.PhoneNumber || ''}</td>
                                <td>${currentItem.PassWord || ''}</td>
                                <td>
                                    <button onclick="deleteItem('${currentItem.Id}')"><i class="fas fa-trash-alt"></i></button>
                                    <button onclick="editItem('${currentItem.Id}')"><i class="fas fa-edit"></i></button>
                                </td>
                            </tr>`;
        }
    }
    accountTableBody.innerHTML = tableContent;
}

function deleteItem(id) {
    if (confirm('Bạn có chắc chắn muốn xóa tài khoản này không?')) {
        data = data.filter(item => item.Id !== id);
        saveDataToLocalStorage();
        render();
    }
}

function editItem(id) {
    console.log('editItem called with id:', id);
    // Kiểm tra nếu overlayAccount là null, thoát hàm
    if (!overlayAccount || !userNameAccount || !emailAccount || !phoneNumberAccount || !passwordAccount || !saveAccount) {
        console.error("Một hoặc nhiều phần tử overlay/form tài khoản không tìm thấy trong editItem.");
        return;
    }
    overlayAccount.classList.add('active');

    let itemToEdit = data.find((item) => item.Id === id);
    if (itemToEdit) {
        userNameAccount.value = itemToEdit.UserName;
        emailAccount.value = itemToEdit.Email;
        phoneNumberAccount.value = itemToEdit.PhoneNumber;
        passwordAccount.value = itemToEdit.PassWord;
        confirmPassword.value = ''; 
        editingId = id;
    }
    // Kiểm tra nếu saveAccount là null, thoát hàm
    if (saveAccount) {
        saveAccount.disabled = false;
    }
}

// Hàm khởi tạo riêng cho module tài khoản
function initAccountModule() {
    loadDataFromLocalStorage();
    render();

    if (addNewAccount) {
        addNewAccount.addEventListener('click', function() {
            console.log('Bạn đã nhấn phím thêm mới tài khoản!');
            clear();
            editingId = null;
            if (saveAccount) saveAccount.disabled = false;
            if (overlayAccount) overlayAccount.classList.add('active');
        });
    }

    if (closeOverlay) {
        closeOverlay.addEventListener('click', function() {
            if (overlayAccount) overlayAccount.classList.remove('active');
            clear();
            editingId = null;
            if (saveAccount) saveAccount.disabled = false;
        });
    }

    if (saveAccount) {
        saveAccount.addEventListener('click', saveItem);
    }

    if (searchInput) {
        searchInput.addEventListener('input', function() {
            var searchTerm = searchInput.value.toLowerCase();
            var filteredData = data.filter(function(item) {
                var userNameLower = item.UserName ? item.UserName.toLowerCase() : '';
                var emailLower = item.Email ? item.Email.toLowerCase() : '';
                var phoneNumberLower = item.PhoneNumber ? item.PhoneNumber.toLowerCase() : '';

                return userNameLower.includes(searchTerm) ||
                       emailLower.includes(searchTerm) ||
                       phoneNumberLower.includes(searchTerm);
            });
            render(filteredData);
        });
    }

    if (searchAccountButton) {
        searchAccountButton.addEventListener('click', function() {
            if (searchInput) searchInput.dispatchEvent(new Event('input'));
        });
    }
}
initAccountModule()