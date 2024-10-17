async function loadHTML(elementId, file) {
    try {
        const response = await fetch(file);
        if (!response.ok) throw new Error(`Failed to fetch file: ${file}. Network response was not ok`);
        const data = await response.text();

        const element = document.getElementById(elementId);
        if (!element) {
            console.error(`Element with ID "${elementId}" not found. Cannot set innerHTML.`);
            return;
        }

        element.innerHTML = data;
        element.style.opacity = '1';  // Hiển thị phần tử sau khi tải

    } catch (error) {
        console.error('Error loading HTML:', error);
    }
}

document.addEventListener('DOMContentLoaded', async function () {
    try {
        // Hiển thị thông báo bắt đầu load các phần tử
        console.log("Loading navbar and footer...");

        await Promise.all([
            loadHTML('navbar', 'partials/navigation.ejs'),
            loadHTML('footer', 'partials/footer.ejs')
        ]);

        // Xóa class 'hidden' của body sau khi nội dung đã được tải
        document.body.classList.remove('hidden');

        // Ẩn phần loading
        const loadingElement = document.getElementById('loading');
        if (loadingElement) {
            loadingElement.classList.add('hidden');
        } else {
            console.error('Loading element not found.');
        }

        console.log("Navbar and footer loaded successfully.");

    } catch (error) {
        console.error('Error during content loading:', error);
    }
});
