/**
 * Scroll Reveal — lightweight IntersectionObserver-based animation system.
 * Usage: Add data-reveal="fade-up|fade-left|fade-right|zoom" to any element.
 *        Add data-reveal-delay="100" (ms) for stagger timing.
 *        Add data-reveal-children to a parent to auto-animate its children.
 */
(function () {
    'use strict';

    const DEFAULTS = { threshold: 0.15, rootMargin: '0px 0px -40px 0px' };
    const STAGGER_MS = 80;

    function reveal(entries, observer) {
        entries.forEach(function (entry) {
            var el = entry.target;
            var delay = parseInt(el.getAttribute('data-reveal-delay') || '0', 10);

            if (entry.isIntersecting) {
                setTimeout(function () {
                    el.classList.add('revealed');
                }, delay);
            } else {
                // Optional: remove class when leaving viewport to trigger again on re-entry
                el.classList.remove('revealed');
            }
        });
    }

    function init() {
        var observer = new IntersectionObserver(reveal, DEFAULTS);

        // Direct [data-reveal] elements
        document.querySelectorAll('[data-reveal]').forEach(function (el) {
            el.classList.add('reveal-hidden');
            observer.observe(el);
        });

        // Auto-stagger children of [data-reveal-children]
        document.querySelectorAll('[data-reveal-children]').forEach(function (parent) {
            var animation = parent.getAttribute('data-reveal-children') || 'fade-up';
            var children = parent.children;
            for (var i = 0; i < children.length; i++) {
                var child = children[i];
                if (!child.hasAttribute('data-reveal')) {
                    child.setAttribute('data-reveal', animation);
                    child.setAttribute('data-reveal-delay', String(i * STAGGER_MS));
                    child.classList.add('reveal-hidden');
                    observer.observe(child);
                }
            }
        });
    }

    // Run after DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
