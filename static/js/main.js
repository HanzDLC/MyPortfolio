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

// ----- Certificate Modal Functions -----

function openCertModal(imageSrc, title) {
    const modal = document.getElementById('cert-modal');
    const modalImg = document.getElementById('cert-modal-img');
    const modalTitle = document.getElementById('cert-modal-title');

    if (!modal || !modalImg || !modalTitle) return;

    modalImg.src = imageSrc;
    modalImg.alt = title;
    modalTitle.textContent = title;

    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';

    requestAnimationFrame(() => {
        modal.classList.add('show');
    });
}

function closeCertModal() {
    const modal = document.getElementById('cert-modal');
    if (!modal) return;

    modal.classList.remove('show');
    document.body.style.overflow = '';

    setTimeout(() => {
        modal.style.display = 'none';
    }, 400);
}

// Machine Learning Dropdown logic
function toggleMLDropdown(event) {
    // Prevent bubbling to document click listener
    event.stopPropagation();

    const dropdown = document.getElementById('ml-dropdown');
    const card = document.getElementById('ml-card');

    if (!dropdown) return;

    const isVisible = dropdown.classList.contains('show');

    // Close any other open things if needed

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

    // Buffer to let the section "settle" before scrolling images
    const startBuffer = window.innerHeight * 0.2; // 20% of screen height
    let ticking = false;

    function updateScroll() {
        const offsetTop = stickySection.offsetTop;
        const scrollY = window.scrollY;
        const sectionHeight = stickySection.offsetHeight;
        const windowHeight = window.innerHeight;
        const scrollRange = sectionHeight - windowHeight;

        // Current scroll within the section
        const currentInView = scrollY - offsetTop;

        if (currentInView >= 0 && currentInView <= scrollRange) {
            // Apply buffer: percentage is 0 until we pass startBuffer
            let percentage = 0;
            if (currentInView > startBuffer) {
                percentage = (currentInView - startBuffer) / (scrollRange - startBuffer - 100);
            }
            percentage = Math.max(0, Math.min(1, percentage));

            const scrollWidth = horizontalTrack.scrollWidth;
            const viewWidth = window.innerWidth;

            // Adjust maxScroll to account for the last item centering
            // Total track width - viewport + some padding for safety
            const maxScroll = scrollWidth - viewWidth + (viewWidth * 0.2);

            const x = percentage * maxScroll;
            horizontalTrack.style.transform = `translateX(-${x}px)`;

            // Update active dot and card
            if (certItems.length > 0) {
                const itemCount = certItems.length;
                // Use a slightly shifted percentage for dot activation to catch transitions early
                const activeIndex = Math.floor(percentage * itemCount);
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
        } else if (currentInView < 0) {
            horizontalTrack.style.transform = 'translateX(0px)';
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

    // Add click listeners to dots for manual navigation
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            const offsetTop = stickySection.offsetTop;
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
                targetScrollWithin = 5; // Scroll slightly into section to ensure it's active
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
                openCertModal(img.src, h4.textContent);
            }
        });
    });
}

// ===== EVENT LISTENERS =====

// Close modal if clicked outside
window.addEventListener('click', (event) => {
    const dvModal = document.getElementById('dv-modal');
    const certModal = document.getElementById('cert-modal');

    if (event.target === dvModal) {
        closeModal();
    }
    if (event.target === certModal) {
        closeCertModal();
    }
});

// Close ML Dropdown when clicking outside
document.addEventListener('click', (event) => {
    const dropdown = document.getElementById('ml-dropdown');
    const card = document.getElementById('ml-card');

    if (dropdown && dropdown.classList.contains('show')) {
        // If click is outside the card and dropdown
        if (!card.contains(event.target)) {
            dropdown.classList.remove('show');
            card.classList.remove('active');
        }
    }
});

// Close modal on escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeModal();
        closeCertModal();

        // Also close dropdown
        const dropdown = document.getElementById('ml-dropdown');
        if (dropdown) dropdown.classList.remove('show');
    }
});

// ===== INITIALIZATION =====

document.addEventListener('DOMContentLoaded', () => {
    initGalleryScroll();
    initCertificationsScroll();
});
