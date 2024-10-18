let lastScrollTop = 0;
const navbar = document.querySelector('.navbar'); // Gọi đến id "navbar"

window.addEventListener('scroll', function () {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;

    if (scrollTop > lastScrollTop) {
        // Cuộn xuống, ẩn thanh điều hướng
        navbar.style.top = '-100px';
    } else if (scrollTop < lastScrollTop) {
        // Cuộn lên, hiện thanh điều hướng
        navbar.style.top = '0';
    }

    lastScrollTop = scrollTop;
});
