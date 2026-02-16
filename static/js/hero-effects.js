/**
 * Hero Effects — Advanced interactivity for the hero section.
 * - Mouse-following spotlight
 * - 3D Tilt on profile image
 * - Magnetic social icons
 */
(function () {
    'use strict';

    function initHeroInteractivity() {
        const hero = document.querySelector('.hero-align');
        const spotlight = document.querySelector('.hero-spotlight');
        const visual = document.querySelector('.hero-visual');
        const profileImg = document.querySelector('.myimage');

        if (!hero || !spotlight) return;

        // --- Anime.js Grid Formation Logic ---
        const ROWS = 5;
        const COLS = 5;

        function createBlocks() {
            if (!visual || !profileImg) return;

            // 1. Check if Anime.js is actually loaded
            // If not loaded, we just return, leaving the image visible (opacity: 1 in CSS)
            if (typeof anime === 'undefined') {
                console.warn('Anime.js not loaded, skipping animation.');
                return;
            }

            const existing = visual.querySelector('.image-blocks-container');
            if (existing) existing.remove();

            // Ensure image is ready before building
            if (!profileImg.complete) {
                profileImg.onload = createBlocks;
                return;
            }

            // 2. Prepare for animation (HIDE original image)
            // We do this via class to ensure we can revert easily
            visual.classList.remove('blocks-complete');
            visual.classList.add('blocks-active');

            const blocksContainer = document.createElement('div');
            blocksContainer.className = 'image-blocks-container';
            const imgSrc = profileImg.src;
            visual.appendChild(blocksContainer);

            // Create 5x5 grid
            for (let i = 0; i < ROWS * COLS; i++) {
                const block = document.createElement('div');
                block.className = 'image-block';
                block.style.backgroundImage = `url(${imgSrc})`;

                const r = Math.floor(i / COLS);
                const c = i % COLS;

                const posX = (c / (COLS - 1)) * 100;
                const posY = (r / (ROWS - 1)) * 100;

                block.style.backgroundPosition = `${posX}% ${posY}%`;
                blocksContainer.appendChild(block);
            }

            // Anime.js Stagger Animation
            anime({
                targets: '.image-block',
                scale: [0, 1],
                opacity: [0, 1],
                delay: anime.stagger(100, { grid: [ROWS, COLS], from: 'center' }),
                duration: 800,
                easing: 'easeInOutQuad',
                complete: () => {
                    visual.classList.remove('blocks-active');
                    visual.classList.add('blocks-complete');
                    profileImg.classList.add('floating-active');
                }
            });
        }

        // Trigger formation on intersection
        const blockObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    createBlocks();
                    blockObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });

        if (visual) blockObserver.observe(visual);

        // 1. Mouse Spotlight Follow
        hero.addEventListener('mousemove', (e) => {
            const rect = hero.getBoundingClientRect();
            const x = ((e.clientX - rect.left) / rect.width) * 100;
            const y = ((e.clientY - rect.top) / rect.height) * 100;
            hero.style.setProperty('--mouse-x', `${x}%`);
            hero.style.setProperty('--mouse-y', `${y}%`);
        });

        // 2. 3D Tilt on Profile Image
        if (visual && profileImg) {
            visual.addEventListener('mousemove', (e) => {
                const rect = visual.getBoundingClientRect();
                const x = e.clientX - rect.left; // x position within element
                const y = e.clientY - rect.top;  // y position within element
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;

                // Calculate rotation (max 15 degrees)
                const rotateY = ((x - centerX) / centerX) * 15;
                const rotateX = ((centerY - y) / centerY) * 15;

                profileImg.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
            });

            visual.addEventListener('mouseleave', () => {
                profileImg.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
            });
        }

        // 3. Magnetic Social Icons
        const socialIcons = document.querySelectorAll('.social-icon');
        socialIcons.forEach(icon => {
            icon.addEventListener('mousemove', (e) => {
                const rect = icon.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;
                icon.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px) scale(1.1)`;
            });

            icon.addEventListener('mouseleave', () => {
                icon.style.transform = `translate(0px, 0px) scale(1)`;
            });
        });
    }

    // Run after DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initHeroInteractivity);
    } else {
        initHeroInteractivity();
    }
})();
