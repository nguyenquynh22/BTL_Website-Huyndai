var logIn = document.querySelector('#log-in');
var userNameInput = document.querySelector('#user-name');
var passWordInput = document.querySelector('#password');

//nút đăng nhập
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

    // Tìm tài khoản khớp trong mảng 'data' hay k?
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
