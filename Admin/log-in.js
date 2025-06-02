// Lấy các phần tử DOM cho form đăng nhập
var logIn = document.querySelector('#log-in');
var userNameInput = document.querySelector('#user-name');
var passWordInput = document.querySelector('#password');

// Xử lý sự kiện click nút đăng nhập
logIn.addEventListener('click', function() {
    var userName = userNameInput.value.trim(); 
    var passWord = passWordInput.value.trim();

    if (data.length === 0) {
        alert('Không có tài khoản nào được đăng ký. Đăng nhập tự động!');
        window.location.href = 'home.html';
        return; 
    }
    if (userName === '' || passWord === '') {
        alert('Vui lòng điền đầy đủ Tên người dùng và Mật khẩu.');
        return; 
    }
    loadDataFromLocalStorage(); 

    // Tìm tài khoản khớp trong mảng 'data'
    var foundAccount = data.find(function(account) {
        return account.UserName === userName && account.PassWord === passWord;
    });

    if (foundAccount) {
        alert('Đăng nhập thành công!');
        window.location.href = 'home.html';
    } else {
        alert('Tên người dùng hoặc mật khẩu không đúng.');
    }
});


var exitBtn = document.querySelector('#exit');
var registerContainer = document.querySelector('.register');
var registerBtn = document.querySelector('#registerBtn');
var informationForm = document.querySelector('.information-form');

// Xử lý khi click vào nút "Register" (mở form đăng ký)
if (registerBtn) { // Kiểm tra xem nút có tồn tại không
    registerBtn.addEventListener('click', function() {
        if (registerContainer.classList.contains('hide')) {
            registerContainer.classList.remove('hide');

            setTimeout(() => {
                informationForm.classList.add('show-animation');
            }, 10);
        }
    });
}

// Xử lý khi click vào nút "X" (đóng form đăng ký)
if (exitBtn) { // Kiểm tra xem nút có tồn tại không
    exitBtn.addEventListener('click', function() {
        informationForm.classList.remove('show-animation');

        setTimeout(() => {
            registerContainer.classList.add('hide');
        }, 100);
    });
}

