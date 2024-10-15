async function loadHTML(elementId, file) {
    try {
        console.log(`Loading ${file} into ${elementId}`); // Log để kiểm tra
        const response = await fetch(file);
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.text();
        const element = document.getElementById(elementId);
        if (element) {
            console.log(`Loaded content into ${elementId}`); // Log để kiểm tra
            element.innerHTML = data;
            element.style.opacity = '1';  // Hiển thị phần tử sau khi tải
        } else {
            console.error('Phần tử không tồn tại:', elementId);
        }
    } catch (error) {
        console.error('Error loading HTML:', error);
    }
}

document.addEventListener('DOMContentLoaded', async () => {
    await Promise.all([
        loadHTML('navbar', 'partials/navigation.ejs'),
        loadHTML('footer', 'partials/footer.ejs')
    ]);
    document.body.classList.remove('hidden'); // Hiện nội dung sau khi tải xong
    const loadingElement = document.getElementById('loading');
    if (loadingElement) {
        loadingElement.classList.add('hidden'); // Ẩn loading nếu tồn tại
    } else {
        console.error('Phần tử loading không tồn tại');
    }
});
