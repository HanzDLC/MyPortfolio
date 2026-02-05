/**
 * main.js - Main Application JavaScript
 * Handles modal, gallery, and certifications scroll functionality
 */

'use strict';

// ===== MODAL FUNCTIONS =====

function openModal() {
    const modal = document.getElementById('dv-modal');
    if (!modal) return;

    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden'; // Prevent background scrolling

    // Trigger animation
    requestAnimationFrame(() => {
        modal.classList.add('show');
    });
}

function closeModal() {
    const modal = document.getElementById('dv-modal');
    if (!modal) return;

    modal.classList.remove('show');
    document.body.style.overflow = ''; // Restore background scrolling

    setTimeout(() => {
        modal.style.display = 'none';
    }, 300);
}

// ===== GALLERY HORIZONTAL SCROLL =====

function initGalleryScroll() {
    const galleryContainer = document.querySelector('.gallery-scroll-container');
    if (!galleryContainer) return;

    galleryContainer.addEventListener('wheel', (evt) => {
        evt.preventDefault();
        galleryContainer.scrollLeft += evt.deltaY;
    }, { passive: false });
}

// ===== CERTIFICATIONS SCROLL =====

function initCertificationsScroll() {
    const stickySection = document.querySelector('.scroll-section-outer');
    const horizontalTrack = document.querySelector('.horizontal-track');
    const dots = document.querySelectorAll('.dot');
    const certItems = document.querySelectorAll('.cert-item');

    if (!stickySection || !horizontalTrack) return;

    // Throttle scroll handler for performance
    let ticking = false;

    function updateScroll() {
        const offsetTop = stickySection.offsetTop;
        const scrollY = window.scrollY;
        const sectionHeight = stickySection.offsetHeight;
        const windowHeight = window.innerHeight;

        if (scrollY >= offsetTop && scrollY <= offsetTop + sectionHeight - windowHeight) {
            const percentage = (scrollY - offsetTop) / (sectionHeight - windowHeight);

            // Calculate scroll
            const scrollWidth = horizontalTrack.scrollWidth;
            const viewWidth = window.innerWidth;
            const maxScroll = scrollWidth - viewWidth + (viewWidth * 0.5);

            const x = Math.max(0, Math.min(1, percentage)) * maxScroll;
            horizontalTrack.style.transform = `translateX(-${x}px)`;

            // Update active dot and card
            if (certItems.length > 0) {
                const itemCount = certItems.length;
                const activeIndex = Math.floor((percentage + 0.05) * itemCount);
                const safeIndex = Math.min(Math.max(activeIndex, 0), itemCount - 1);

                dots.forEach((dot, index) => {
                    if (index === safeIndex) {
                        dot.classList.add('active');
                        certItems[index]?.classList.add('active-card');
                    } else {
                        dot.classList.remove('active');
                        certItems[index]?.classList.remove('active-card');
                    }
                });
            }
        } else if (scrollY < offsetTop) {
            horizontalTrack.style.transform = 'translateX(0px)';

            // Reset to first
            dots.forEach(d => d.classList.remove('active'));
            if (dots.length > 0) dots[0].classList.add('active');

            certItems.forEach(c => c.classList.remove('active-card'));
            if (certItems.length > 0) certItems[0].classList.add('active-card');
        }

        ticking = false;
    }

    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(updateScroll);
            ticking = true;
        }
    });
}

// ===== EVENT LISTENERS =====

// Close modal if clicked outside
window.addEventListener('click', (event) => {
    const modal = document.getElementById('dv-modal');
    if (event.target === modal) {
        closeModal();
    }
});

// Close modal on escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeModal();
    }
});

// ===== INITIALIZATION =====

document.addEventListener('DOMContentLoaded', () => {
    initGalleryScroll();
    initCertificationsScroll();
});
