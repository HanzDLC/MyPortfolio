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
