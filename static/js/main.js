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
    const galleryContainer = document.querySelector('.gallery-scroll-container');
    if (!galleryContainer) return;

    galleryContainer.addEventListener('wheel', (evt) => {
        evt.preventDefault();
        // Increase scroll multiplier for better speed (e.g., 2.5 is a good balance)
        galleryContainer.scrollLeft += evt.deltaY * 4.0;
    }, { passive: false });

    // Add click event for zooming gallery images
    const images = galleryContainer.querySelectorAll('img');
    images.forEach(img => {
        img.addEventListener('click', () => {
            openZoomModal(img.src, img.alt);
        });
    });
}

// ===== CERTIFICATIONS SCROLL =====

function initCertificationsScroll() {
    const stickySection = document.querySelector('.scroll-section-outer');
    const horizontalTrack = document.querySelector('.horizontal-track');
    const dots = document.querySelectorAll('.dot');
    const certItems = document.querySelectorAll('.cert-item');

    if (!stickySection || !horizontalTrack) return;

    // Buffer to let the section "settle" before scrolling images
    const startBuffer = window.innerHeight * 0.2; // 20% of screen height
    let ticking = false;

    function updateScroll() {
        // Calculate absolute offset relative to document
        const rect = stickySection.getBoundingClientRect();
        const offsetTop = rect.top + window.pageYOffset;

        const scrollY = window.scrollY;
        const sectionHeight = stickySection.offsetHeight;
        const windowHeight = window.innerHeight;

        // The total vertical distance available for scrolling
        const scrollRange = sectionHeight - windowHeight;

        // Current scroll within the section (0 when section top hits screen top)
        const currentInView = scrollY - offsetTop;

        if (currentInView >= 0 && currentInView <= scrollRange) {
            // Apply buffer: percentage is 0 until we pass startBuffer
            // We want to reach 100% just before the section ends
            const effectiveRange = scrollRange - startBuffer - 50;
            let percentage = 0;

            if (currentInView > startBuffer) {
                percentage = (currentInView - startBuffer) / effectiveRange;
            }
            percentage = Math.max(0, Math.min(1, percentage));

            const scrollWidth = horizontalTrack.scrollWidth;
            const viewWidth = window.innerWidth;

            // maxScroll is the amount we need to shift to see everything
            // Since we have 15vw padding on both sides, we scroll until the last item is in view
            const maxScroll = scrollWidth - viewWidth;

            const x = percentage * maxScroll;
            horizontalTrack.style.transform = `translateX(-${x}px)`;

            // Update active dot and card
            if (certItems.length > 0) {
                const itemCount = certItems.length;
                // Distribute dots evenly across the percentage
                const activeIndex = Math.min(Math.floor(percentage * itemCount), itemCount - 1);

                dots.forEach((dot, index) => {
                    if (index === activeIndex) {
                        dot.classList.add('active');
                        certItems[index]?.classList.add('active-card');
                    } else {
                        dot.classList.remove('active');
                        certItems[index]?.classList.remove('active-card');
                    }
                });
            }
        } else if (currentInView < 0) {
            // Above the section
            horizontalTrack.style.transform = 'translateX(0px)';
            dots.forEach((dot, index) => {
                if (index === 0) dot.classList.add('active');
                else dot.classList.remove('active');
            });
            certItems.forEach((cert, index) => {
                if (index === 0) cert.classList.add('active-card');
                else cert.classList.remove('active-card');
            });
        }

        ticking = false;
    }

    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(updateScroll);
            ticking = true;
        }
    });

    // Add click listeners to dots for manual navigation
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            const rect = stickySection.getBoundingClientRect();
            const offsetTop = rect.top + window.pageYOffset;

            const sectionHeight = stickySection.offsetHeight;
            const windowHeight = window.innerHeight;
            const scrollRange = sectionHeight - windowHeight;
            const itemCount = certItems.length;

            // Target scroll position:
            // percentage = index / itemCount
            // scrollY = offsetTop + startBuffer + (percentage * range)
            let targetScrollWithin = 0;
            if (index > 0) {
                const targetPercentage = index / (itemCount - 1); // Spread across the scrollable area
                targetScrollWithin = startBuffer + (targetPercentage * (scrollRange - startBuffer - 100));
            } else {
                // First dot: scroll to just past the start of the section
                targetScrollWithin = startBuffer + 50;
            }

            window.scrollTo({
                top: offsetTop + targetScrollWithin,
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
