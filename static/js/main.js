/**
 * main.js - Main Application JavaScript
 * Handles modal, gallery, and certifications scroll functionality
 */

'use strict';

// ===== MODAL FUNCTIONS =====

function openModal(modalId, hash) {
    const modal = document.getElementById(modalId);
    if (!modal) return;
    const modalContent = modal.querySelector('.modal-content');

    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden'; // Prevent background scrolling

    // Always open from top so mobile users can see gallery/problem sections first.
    modal.scrollTop = 0;
    if (modalContent) {
        modalContent.scrollTop = 0;
    }

    // Trigger animation
    requestAnimationFrame(() => {
        modal.classList.add('show');
    });

    // Persistence: Set hash
    if (hash) {
        window.location.hash = hash;
    }
}

function closeModal(modalId, hash) {
    const modal = document.getElementById(modalId);
    if (!modal) return;

    modal.classList.remove('show');
    document.body.style.overflow = ''; // Restore background scrolling

    setTimeout(() => {
        modal.style.display = 'none';
        // Persistence: Clear hash if it matches
        if (hash && window.location.hash === '#' + hash) {
            history.replaceState(null, null, ' ');
        }
    }, 300);
}

// ----- Generic Image Zoom Modal Functions -----

function openZoomModal(imageSrc, title) {
    const modal = document.getElementById('zoom-modal');
    const modalImg = document.getElementById('zoom-modal-img');
    const modalTitle = document.getElementById('zoom-modal-title');

    if (!modal || !modalImg || !modalTitle) return;

    modalImg.src = imageSrc;
    modalImg.alt = title || 'Image View';
    modalTitle.textContent = title || 'Image View';

    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';

    requestAnimationFrame(() => {
        modal.classList.add('show');
    });

    // Persistence: Store state
    sessionStorage.setItem('zoomImg', imageSrc);
    sessionStorage.setItem('zoomTitle', title || '');
    window.location.hash = 'zoom';
}

function closeZoomModal() {
    const modal = document.getElementById('zoom-modal');
    if (!modal) return;

    modal.classList.remove('show');
    document.body.style.overflow = '';

    setTimeout(() => {
        modal.style.display = 'none';
        // Persistence: Clear stored state and hash
        sessionStorage.removeItem('zoomImg');
        sessionStorage.removeItem('zoomTitle');
        if (window.location.hash === '#zoom') {
            history.replaceState(null, null, ' ');
        }
    }, 400);
}

// Generic Dropdown logic
function toggleDropdown(event, dropdownId, cardId) {
    // Prevent bubbling to document click listener
    event.stopPropagation();

    const dropdown = document.getElementById(dropdownId);
    const card = document.getElementById(cardId);

    if (!dropdown) return;

    const isVisible = dropdown.classList.contains('show');

    // Close any other open dropdowns first
    document.querySelectorAll('.ml-dropdown-menu').forEach(d => {
        if (d.id !== dropdownId) {
            d.classList.remove('show');
            const parentCard = d.parentElement;
            if (parentCard) parentCard.classList.remove('active');
        }
    });

    if (isVisible) {
        dropdown.classList.remove('show');
        card.classList.remove('active');
    } else {
        dropdown.classList.add('show');
        card.classList.add('active');
    }
}

// ===== GALLERY HORIZONTAL SCROLL =====

function initGalleryScroll() {
    const galleryContainers = document.querySelectorAll('.gallery-scroll-container');
    if (galleryContainers.length === 0) return;

    galleryContainers.forEach(galleryContainer => {
        galleryContainer.addEventListener('wheel', (evt) => {
            evt.preventDefault();
            galleryContainer.scrollLeft += evt.deltaY * 4.0;
        }, { passive: false });

        // Add click event for zooming gallery images
        const images = galleryContainer.querySelectorAll('img');
        images.forEach(img => {
            img.addEventListener('click', () => {
                openZoomModal(img.src, img.alt);
            });
        });
    });
}

// ===== PROJECT GRID HORIZONTAL SCROLL =====

function initProjectsScroll() {
    const projectGrids = document.querySelectorAll('.projects-grid');
    if (projectGrids.length === 0) return;

    projectGrids.forEach(grid => {
        grid.addEventListener('wheel', (evt) => {
            if ((grid.scrollLeft === 0 && evt.deltaY < 0) ||
                (Math.ceil(grid.scrollLeft + grid.clientWidth) >= grid.scrollWidth && evt.deltaY > 0)) {
                // Allow vertical scroll if at boundaries
                return;
            }

            // Otherwise prevent vertical scroll and scroll horizontally
            evt.preventDefault();
            grid.scrollLeft += evt.deltaY * 3.0;
        }, { passive: false });
    });
}

// ===== CERTIFICATIONS SCROLL =====

function initCertificationsScroll() {
    const stickySection = document.querySelector('.scroll-section-outer');
    const horizontalTrack = document.querySelector('.horizontal-track');
    const dots = document.querySelectorAll('.dot');
    const certItems = document.querySelectorAll('.cert-item');

    if (!stickySection || !horizontalTrack || certItems.length === 0) return;

    let horizontalDistance = 0;
    let scrollRange = 1;
    let ticking = false;

    function calculateMetrics() {
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;

        // Distance the horizontal track needs to travel.
        horizontalDistance = Math.max(0, horizontalTrack.scrollWidth - viewportWidth);

        // 1:1 mapping: every 1px vertical scroll moves 1px horizontally.
        // Keeps sticky behavior predictable and scales with real content width.
        const targetHeight = Math.max(viewportHeight + horizontalDistance, viewportHeight * 1.5);
        stickySection.style.height = `${Math.ceil(targetHeight)}px`;
        scrollRange = Math.max(1, stickySection.offsetHeight - viewportHeight);
    }

    function updateActiveState(percentage) {
        const clamped = Math.max(0, Math.min(1, percentage));
        const itemCount = certItems.length;
        const activeIndex = Math.min(Math.floor(clamped * itemCount), itemCount - 1);
        dots.forEach((dot, i) => dot.classList.toggle('active', i === activeIndex));
        certItems.forEach((cert, i) => cert.classList.toggle('active-card', i === activeIndex));
    }

    function updateScroll() {
        const sectionTop = stickySection.getBoundingClientRect().top + window.pageYOffset;
        const scrolledInto = window.scrollY - sectionTop;

        if (scrolledInto <= 0) {
            horizontalTrack.style.transform = 'translateX(0px)';
            updateActiveState(0);
        } else if (scrolledInto >= scrollRange) {
            horizontalTrack.style.transform = `translateX(-${horizontalDistance}px)`;
            updateActiveState(1);
        } else {
            const percentage = scrolledInto / scrollRange;
            const x = percentage * horizontalDistance;
            horizontalTrack.style.transform = `translateX(-${x}px)`;
            updateActiveState(percentage);
        }
        ticking = false;
    }

    function requestUpdate() {
        if (!ticking) {
            requestAnimationFrame(updateScroll);
            ticking = true;
        }
    }

    calculateMetrics();
    requestUpdate();

    window.addEventListener('scroll', requestUpdate, { passive: true });

    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            calculateMetrics();
            requestUpdate();
        }, 100);
    });

    window.addEventListener('load', () => {
        calculateMetrics();
        requestUpdate();
    });

    // Recompute when certificate images finish loading.
    horizontalTrack.querySelectorAll('img').forEach((img) => {
        if (img.complete) return;
        img.addEventListener('load', () => {
            calculateMetrics();
            requestUpdate();
        }, { once: true });
        img.addEventListener('error', () => {
            calculateMetrics();
            requestUpdate();
        }, { once: true });
    });

    // Dot click: maps dot index to scroll position using identical math
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            const sectionTop = stickySection.getBoundingClientRect().top + window.pageYOffset;
            const targetPercentage = index / Math.max(certItems.length - 1, 1);
            window.scrollTo({
                top: sectionTop + (targetPercentage * scrollRange),
                behavior: 'smooth'
            });
        });
    });

    // Add click event for zooming certificates
    certItems.forEach(item => {
        item.addEventListener('click', () => {
            const img = item.querySelector('img');
            const h4 = item.querySelector('h4');
            if (img && h4) {
                openZoomModal(img.src, h4.textContent);
            }
        });
    });
}

// ===== EVENT LISTENERS =====

// Close modal if clicked outside
window.addEventListener('click', (event) => {
    const modals = document.querySelectorAll('.modal');
    const zoomModal = document.getElementById('zoom-modal');

    modals.forEach(modal => {
        if (event.target === modal) {
            // Check which modal it is and close with proper hash
            if (modal.id === 'dv-modal') closeModal('dv-modal', 'data-viz');
            else if (modal.id === 'automation-modal') closeModal('automation-modal', 'automation');
            else closeModal(modal.id);
        }
    });

    if (event.target === zoomModal) {
        closeZoomModal();
    }
});

// Close Dropdowns when clicking outside
document.addEventListener('click', (event) => {
    const dropdowns = document.querySelectorAll('.ml-dropdown-menu');

    dropdowns.forEach(dropdown => {
        if (dropdown.classList.contains('show')) {
            const card = dropdown.parentElement;
            if (card && !card.contains(event.target)) {
                dropdown.classList.remove('show');
                card.classList.remove('active');
            }
        }
    });
});

// Close modal on escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        // Close all active modals
        document.querySelectorAll('.modal.show').forEach(modal => {
            if (modal.id === 'dv-modal') closeModal('dv-modal', 'data-viz');
            else if (modal.id === 'automation-modal') closeModal('automation-modal', 'automation');
            else closeModal(modal.id);
        });
        closeZoomModal();

        // Also close dropdowns
        document.querySelectorAll('.ml-dropdown-menu').forEach(dropdown => {
            dropdown.classList.remove('show');
            if (dropdown.parentElement) dropdown.parentElement.classList.remove('active');
        });
    }
});

// ===== INITIALIZATION =====

document.addEventListener('DOMContentLoaded', () => {
    initGalleryScroll();
    initProjectsScroll();
    initCertificationsScroll();

    // Persist Modal State on Refresh
    const hash = window.location.hash;
    if (hash === '#data-viz') {
        openModal('dv-modal', 'data-viz');
    } else if (hash === '#automation') {
        openModal('automation-modal', 'automation');
    } else if (hash === '#zoom') {
        const storedImg = sessionStorage.getItem('zoomImg');
        const storedTitle = sessionStorage.getItem('zoomTitle');
        if (storedImg) {
            openZoomModal(storedImg, storedTitle);
        }
    }
});
