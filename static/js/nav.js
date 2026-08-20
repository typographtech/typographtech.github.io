document.addEventListener('DOMContentLoaded', function() {
    const navToggle = document.querySelector('.nav-toggle');
    const nav = document.querySelector('.nav');

    navToggle.addEventListener('click', function() {
        nav.classList.toggle('nav-open');
        const isOpen = nav.classList.contains('nav-open');
        navToggle.setAttribute('aria-expanded', isOpen);
    });

    document.querySelectorAll('.nav-links a').forEach(function(link) {
        link.addEventListener('click', function() {
            nav.classList.remove('nav-open');
            navToggle.setAttribute('aria-expanded', 'false');
        });
    });

    // Gallery scroll hint: show only if content overflows
    const galleryScroll = document.getElementById('galleryScroll');
    const galleryHint = document.querySelector('.gallery-hint');

    if (galleryScroll && galleryHint) {
        function checkOverflow() {
            const isOverflow = galleryScroll.scrollWidth > galleryScroll.clientWidth;
            galleryHint.classList.toggle('visible', isOverflow);
        }

        checkOverflow();
        window.addEventListener('resize', checkOverflow);

        // Hide hint once user starts scrolling
        galleryScroll.addEventListener('scroll', function() {
            galleryHint.classList.remove('visible');
        }, { once: true });
    }
});
