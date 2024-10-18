// Function to load content
async function loadContent(url, targetId) {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const content = await response.text();
        document.getElementById(targetId).innerHTML = content;
    } catch (error) {
        console.error('Error loading content:', error);
    }
}

// Load navbar and footer when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    loadContent('partials/navigation.ejs', 'navbar');
    loadContent('partials/footer.ejs', 'footer');
});

// Show loading indicator
function showLoading() {
    document.getElementById('loading').style.display = 'block';
}

// Hide loading indicator
function hideLoading() {
    document.getElementById('loading').style.display = 'none';
}

// Add event listener for form submission
document.getElementById('contactForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    showLoading();

    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        message: document.getElementById('message').value
    };

    try {
        const response = await fetch('/api/contact', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        alert(result.message);
        document.getElementById('contactForm').reset();
    } catch (error) {
        console.error('Error submitting form:', error);
        alert('An error occurred. Please try again later.');
    } finally {
        hideLoading();
    }
});
