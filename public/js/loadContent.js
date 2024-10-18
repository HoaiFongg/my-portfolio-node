async function loadHTML(elementId, file) {
    try {
        const response = await fetch(file);
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.text();
        const element = document.getElementById(elementId);
        element.innerHTML = data;
        element.style.opacity = '1';  // Hiển thị phần tử sau khi tải
    } catch (error) {
        console.error('Error loading HTML:', error);
    }
}

(async function () {
    await Promise.all([
        loadHTML('navbar', 'partials/navbar.ejs'),
        loadHTML('footer', 'partials/footer.ejs')
    ]);
    document.body.classList.remove('hidden'); // Hiện nội dung sau khi tải xong
    document.getElementById('loading').classList.add('hidden'); // Ẩn loading
})();
