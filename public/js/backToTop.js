// Hiện biểu tượng khi cuộn xuống
window.onscroll = function () {
    const scrollToTopButton = document.getElementById("scrollToTop");
    if (document.body.scrollTop > 200 || document.documentElement.scrollTop > 200) {
        scrollToTopButton.style.display = "block";
    } else {
        scrollToTopButton.style.display = "none";
    }
};

// Xử lý sự kiện nhấp chuột
document.getElementById("scrollToTop").onclick = function () {
    window.scrollTo({ top: 0, behavior: 'smooth' });
};

