/**
 * navigation.js - Mobile Navigation Functionality
 * Handles hamburger menu toggle and mobile navigation
 */

'use strict';

// Mobile Menu Toggle
function toggleMobileMenu() {
    const navMenu = document.querySelector('.nav-menu');
    const menuBtn = document.querySelector('.mobile-menu-btn');
    const overlay = document.querySelector('.mobile-overlay');

    if (navMenu && menuBtn && overlay) {
        navMenu.classList.toggle('active');
        menuBtn.classList.toggle('active');
        overlay.classList.toggle('active');
        document.body.classList.toggle('menu-open');
    }
}

// Close Mobile Menu
function closeMobileMenu() {
    const navMenu = document.querySelector('.nav-menu');
    const menuBtn = document.querySelector('.mobile-menu-btn');
    const overlay = document.querySelector('.mobile-overlay');

    if (navMenu && menuBtn && overlay) {
        navMenu.classList.remove('active');
        menuBtn.classList.remove('active');
        overlay.classList.remove('active');
        document.body.classList.remove('menu-open');
    }
}

// Close menu on escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeMobileMenu();
    }
});

// Close menu when clicking a link (for smooth scroll links)
document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('.header-links a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            // Small delay to allow navigation before closing
            setTimeout(closeMobileMenu, 100);
        });
    });
});
