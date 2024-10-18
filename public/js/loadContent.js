async function loadHTML(elementId, file) {
    try {
        const response = await fetch(file);
        if (!response.ok) throw new Error(`Failed to fetch file: ${file}. Network response was not ok`);
        const data = await response.text();
        const element = document.getElementById(elementId);
        if (!element) {
            console.error(`Element with ID "${elementId}" not found. Cannot insert HTML.`);
            return;
        }
        // Tạo một phần tử div chứa nội dung HTML
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = data;

        // Chèn tất cả các phần tử con của tempDiv vào element
        while (tempDiv.firstChild) {
            element.insertAdjacentElement('beforeend', tempDiv.firstChild);
        }

        element.style.opacity = '1';  // Hiển thị phần tử sau khi tải
    } catch (error) {
        console.error('Error loading HTML:', error);
    }
}

document.addEventListener('DOMContentLoaded', async function () {
    try {
        console.log("Loading navbar and footer...");
        await Promise.all([
            loadHTML('navbar', 'partials/navigation.ejs'),
            loadHTML('footer', 'partials/footer.ejs')
        ]);
        document.body.classList.remove('hidden');
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
