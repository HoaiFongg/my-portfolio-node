document.addEventListener('DOMContentLoaded', function () {
    // Get current path
    const currentPath = window.location.pathname;

    // Get all nav links
    const navLinks = document.querySelectorAll('.navbar .nav-link');

    // Add active class to current page link
    navLinks.forEach(link => {
        const href = link.getAttribute('href');

        // Check if the href matches the current path
        if (href === currentPath) {
            link.classList.add('active');
        }

        // Special case for home page
        if ((currentPath === '/' || currentPath === '/home') && href === '/') {
            link.classList.add('active');
        }
    });
});
