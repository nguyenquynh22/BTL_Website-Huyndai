function handleGlobalSearch() {
    const searchInput = document.getElementById('global-search-input');
    const searchTerm = searchInput.value.toLowerCase().trim();

    if (searchTerm === '') {
        alert('Vui lòng nhập từ khóa tìm kiếm.');
        return;
    }

    const navLinks = document.querySelectorAll('.admin-main_left .load-content');
    let foundMatch = false;

    navLinks.forEach(link => {
        const pageName = link.dataset.pageName ? link.dataset.pageName.toLowerCase() : '';
        const targetHref = link.getAttribute('href');
        if (pageName.includes(searchTerm) || targetHref.includes(searchTerm)) {
            window.location.href = targetHref; 
            foundMatch = true;
        }
    });

    if (!foundMatch) {
        alert(`Không tìm thấy trang nào phù hợp với từ khóa "${searchTerm}".`);
    }
}

const globalSearchButton = document.getElementById('global-search-button');
if (globalSearchButton) {
    globalSearchButton.addEventListener('click', handleGlobalSearch);
}

//Enter
const globalSearchInput = document.getElementById('global-search-input');
if (globalSearchInput) {
    globalSearchInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            handleGlobalSearch();
        }
    });
}
var logOut = document.querySelector('.log-out')
logOut.addEventListener('click', function(){
    window.location.href = 'log_in.html'
})