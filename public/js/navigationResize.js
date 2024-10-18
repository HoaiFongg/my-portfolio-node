document.addEventListener("DOMContentLoaded", function () {
    const navbar = document.querySelector("#navbar");

    if (!navbar) {
        console.error('Element with ID "header" not found.');
        return;
    }

    console.log("Navbar element found:", navbar);

    let lastScrollY = window.scrollY;
    let ticking = false;

    function handleScroll() {
        const currentScrollY = window.scrollY;
        if (currentScrollY > lastScrollY) {
            // Scroll down
            navbar.classList.add("small-nav");
        } else if (currentScrollY < lastScrollY) {
            // Scroll up
            navbar.classList.remove("small-nav");
        }
        lastScrollY = currentScrollY;
        ticking = false;
    }

    window.addEventListener("scroll", function () {
        if (!ticking) {
            window.requestAnimationFrame(handleScroll);
            ticking = true;
        }
    });
});
