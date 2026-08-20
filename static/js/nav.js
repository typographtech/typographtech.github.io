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

    // Project detail view
    const detail = document.getElementById('projectDetail');
    const detailImage = document.getElementById('detailImage');
    const detailTitle = document.getElementById('detailTitle');
    const detailDescription = document.getElementById('detailDescription');
    const detailLink = document.getElementById('detailLink');
    const detailClose = detail.querySelector('.project-detail-close');
    const cards = document.querySelectorAll('.gallery-card');

    function openDetail(card) {
        const screenshot = card.dataset.screenshot || '';
        const title = card.dataset.title || '';
        const description = card.dataset.description || '';
        const tagline = card.dataset.tagline || '';
        const url = card.dataset.url || '';

        detailImage.src = screenshot;
        detailImage.alt = title + ' screenshot';
        detailTitle.textContent = title;
        detailDescription.textContent = description || tagline;
        detailLink.style.display = url ? 'inline-block' : 'none';
        if (url) detailLink.href = url;

        detail.style.display = (window.innerWidth <= 768) ? 'block' : 'flex';
        requestAnimationFrame(function() {
            detail.classList.add('active');
            if (window.innerWidth <= 768) {
                galleryScroll.style.display = 'none';
                if (galleryHint) galleryHint.style.display = 'none';
            } else {
                galleryScroll.style.opacity = '0.25';
                galleryScroll.style.pointerEvents = 'none';
                if (galleryHint) galleryHint.style.opacity = '0';
            }
        });
        detail.setAttribute('aria-hidden', 'false');
        detailClose.focus();
    }

    function closeDetail() {
        detail.classList.remove('active');
        if (window.innerWidth <= 768) {
            galleryScroll.style.display = '';
            if (galleryHint) galleryHint.style.display = '';
        } else {
            galleryScroll.style.opacity = '';
            galleryScroll.style.pointerEvents = '';
            if (galleryHint) {
                const isOverflow = galleryScroll.scrollWidth > galleryScroll.clientWidth;
                galleryHint.style.opacity = isOverflow ? '0.55' : '0';
            }
        }
        setTimeout(function() {
            detail.style.display = 'none';
        }, 150);
        detail.setAttribute('aria-hidden', 'true');
    }

    cards.forEach(function(card) {
        card.addEventListener('click', function() {
            openDetail(card);
        });
        card.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                openDetail(card);
            }
        });
    });

    detailClose.addEventListener('click', closeDetail);

    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && detail.classList.contains('active')) {
            closeDetail();
        }
    });

    // Touch swipe-down-to-close
    let touchStartY = 0;
    detail.addEventListener('touchstart', function(e) {
        touchStartY = e.touches[0].clientY;
    }, { passive: true });
    detail.addEventListener('touchmove', function(e) {
        if (!detail.classList.contains('active')) return;
        const touchY = e.touches[0].clientY;
        if (touchY - touchStartY > 60) {
            closeDetail();
        }
    }, { passive: true });
});
