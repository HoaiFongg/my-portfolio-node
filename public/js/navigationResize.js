document.addEventListener("DOMContentLoaded", function () {
    const navbar = document.querySelector(".navbar");

    if (!navbar) {
        console.error('Element with class "navbar" not found.');
        return;
    }

    let lastScrollY = window.scrollY;

    function handleScroll() {
        const currentScrollY = window.scrollY;

        if (currentScrollY > lastScrollY) {
            // Scroll down
            navbar.classList.add("small-nav");
        } else {
            // Scroll up
            navbar.classList.remove("small-nav");
        }

        lastScrollY = currentScrollY;
    }

    window.addEventListener("scroll", function () {
        window.requestAnimationFrame(handleScroll);
    });
});
