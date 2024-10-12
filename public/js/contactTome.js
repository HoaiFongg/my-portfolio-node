// Khởi tạo EmailJS với user ID
emailjs.init('yfBDjKwQxwQeXHzT8');

// Lấy form và thêm sự kiện submit
document.getElementById('contactForm').addEventListener('submit', function (event) {
    event.preventDefault(); // Ngăn chặn hành vi mặc định của form submit

    // Gửi form qua EmailJS
    emailjs.sendForm('service_contact', 'template_qhe0qaf', this)
        .then(function () {
            alert('Your message has been sent!'); // Thông báo khi gửi thành công
        }, function (error) {
            alert('Failed to send message: ' + JSON.stringify(error)); // Thông báo khi gửi thất bại
        });
});
