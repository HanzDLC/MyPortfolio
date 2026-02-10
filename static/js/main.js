/**
 * main.js - Main Application JavaScript
 * Handles modal, gallery, and certifications scroll functionality
 */

'use strict';

// ===== MODAL FUNCTIONS =====

function openModal(modalId, hash) {
    const modal = document.getElementById(modalId);
    if (!modal) return;

    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden'; // Prevent background scrolling

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

// ===== CERTIFICATIONS SCROLL =====

function initCertificationsScroll() {
    const stickySection = document.querySelector('.scroll-section-outer');
    const horizontalTrack = document.querySelector('.horizontal-track');
    const dots = document.querySelectorAll('.dot');
    const certItems = document.querySelectorAll('.cert-item');

    if (!stickySection || !horizontalTrack || certItems.length === 0) return;

    // Measure how much the track needs to move
    const trackScrollWidth = horizontalTrack.scrollWidth;
    const viewportWidth = window.innerWidth;
    const horizontalDistance = Math.max(0, trackScrollWidth - viewportWidth);

    let ticking = false;

    function updateScroll() {
        const rect = stickySection.getBoundingClientRect();
        const sectionTop = rect.top + window.pageYOffset;
        const sectionHeight = stickySection.offsetHeight;
        const viewportHeight = window.innerHeight;
        const scrollRange = sectionHeight - viewportHeight;

        // How far into the section we've scrolled
        const scrolledInto = window.scrollY - sectionTop;

        if (scrolledInto >= 0 && scrolledInto <= scrollRange) {
            // Map vertical scroll to 0-1 percentage
            const percentage = Math.max(0, Math.min(1, scrolledInto / scrollRange));

            // Move the track
            const x = percentage * horizontalDistance;
            horizontalTrack.style.transform = `translateX(-${x}px)`;

            // Update active dot and card
            const itemCount = certItems.length;
            const activeIndex = Math.min(Math.floor(percentage * itemCount), itemCount - 1);
            dots.forEach((dot, i) => dot.classList.toggle('active', i === activeIndex));
            certItems.forEach((cert, i) => cert.classList.toggle('active-card', i === activeIndex));

        } else if (scrolledInto < 0) {
            horizontalTrack.style.transform = 'translateX(0px)';
            dots.forEach((dot, i) => dot.classList.toggle('active', i === 0));
            certItems.forEach((cert, i) => cert.classList.toggle('active-card', i === 0));
        } else {
            horizontalTrack.style.transform = `translateX(-${horizontalDistance}px)`;
            const last = certItems.length - 1;
            dots.forEach((dot, i) => dot.classList.toggle('active', i === last));
            certItems.forEach((cert, i) => cert.classList.toggle('active-card', i === last));
        }
        ticking = false;
    }

    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(updateScroll);
            ticking = true;
        }
    });

    // Dot click: maps dot index to scroll position using identical math
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            const sectionTop = stickySection.getBoundingClientRect().top + window.pageYOffset;
            const scrollRange = stickySection.offsetHeight - window.innerHeight;
            const targetPercentage = index / Math.max(certItems.length - 1, 1);
            window.scrollTo({
                top: sectionTop + (targetPercentage * scrollRange),
                behavior: 'smooth'
            });
        });
    });

    // Trigger initial state
    updateScroll();

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
