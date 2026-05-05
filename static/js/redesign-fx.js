/**
 * redesign-fx.js — interactivity layer for the 2026 editorial redesign.
 *
 * Handles:
 *  - Scroll progress bar (top of page)
 *  - Sticky header scroll-state
 *  - Hero photo parallax on scroll
 *  - Selected Works: cursor-following thumbnail preview per row
 *  - Project card 3D tilt (projects page)
 *
 * Respects prefers-reduced-motion.
 */
(function () {
    'use strict';

    var prefersReduced = window.matchMedia &&
        window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    function rafThrottle(fn) {
        var ticking = false;
        return function () {
            var args = arguments, ctx = this;
            if (!ticking) {
                window.requestAnimationFrame(function () {
                    fn.apply(ctx, args);
                    ticking = false;
                });
                ticking = true;
            }
        };
    }

    /* --- Scroll progress bar ------------------------------------ */
    function initScrollProgress() {
        var bar = document.querySelector('[data-scroll-progress]');
        if (!bar) return;
        var update = rafThrottle(function () {
            var doc = document.documentElement;
            var max = doc.scrollHeight - doc.clientHeight;
            var pct = max > 0 ? (window.scrollY / max) * 100 : 0;
            bar.style.width = pct + '%';
        });
        window.addEventListener('scroll', update, { passive: true });
        update();
    }

    /* --- Header scrolled state ---------------------------------- */
    function initHeaderState() {
        var header = document.querySelector('.site-header');
        if (!header) return;
        var update = rafThrottle(function () {
            if (window.scrollY > 40) {
                header.classList.add('is-scrolled');
            } else {
                header.classList.remove('is-scrolled');
            }
        });
        window.addEventListener('scroll', update, { passive: true });
        update();
    }

    /* --- Hero photo parallax ------------------------------------ */
    function initParallax() {
        if (prefersReduced) return;
        var els = document.querySelectorAll('[data-parallax]');
        if (!els.length) return;
        var update = rafThrottle(function () {
            var scrollY = window.scrollY;
            els.forEach(function (el) {
                var factor = parseFloat(el.getAttribute('data-parallax')) || 0.1;
                el.style.transform = 'translate3d(0,' + (-scrollY * factor) + 'px,0)';
            });
        });
        window.addEventListener('scroll', update, { passive: true });
        update();
    }

    /* --- Selected Works hover thumb ----------------------------- */
    /* Thumb is positioned by CSS (fixed, right edge of viewport).
       No JS positioning needed — the cursor-follow approach was
       fighting the fixed positioning and dumping the thumb in the
       wrong spot. Hover state is handled purely by CSS :hover. */
    function initWorkThumbs() {
        return;
    }

    /* --- Project card tilt -------------------------------------- */
    function initCardTilt() {
        if (prefersReduced) return;
        var cards = document.querySelectorAll('.project-card');
        if (!cards.length) return;

        cards.forEach(function (card) {
            card.addEventListener('mouseenter', function () {
                card.classList.add('is-tilting');
            });
            card.addEventListener('mousemove', function (e) {
                var rect = card.getBoundingClientRect();
                var x = e.clientX - rect.left;
                var y = e.clientY - rect.top;
                var cx = rect.width / 2;
                var cy = rect.height / 2;
                var rotY = ((x - cx) / cx) * 4;       // max 4deg
                var rotX = ((cy - y) / cy) * 4;
                card.style.transform =
                    'perspective(1000px) rotateX(' + rotX + 'deg) rotateY(' + rotY + 'deg) translateZ(0)';
            });
            card.addEventListener('mouseleave', function () {
                card.classList.remove('is-tilting');
                card.style.transform = '';
            });
        });
    }

    /* --- Hero spotlight (mouse-tracked CSS vars) ---------------- */
    function initHeroSpotlight() {
        var hero = document.querySelector('.hero-v3');
        if (!hero) return;
        var update = rafThrottle(function (e) {
            var rect = hero.getBoundingClientRect();
            var x = ((e.clientX - rect.left) / rect.width) * 100;
            var y = ((e.clientY - rect.top) / rect.height) * 100;
            hero.style.setProperty('--mouse-x', x + '%');
            hero.style.setProperty('--mouse-y', y + '%');
        });
        hero.addEventListener('mousemove', update);
    }

    /* --- Hero photo tilt --------------------------------------- */
    function initHeroTilt() {
        if (prefersReduced) return;
        var wrap = document.querySelector('.hero-v3__photo-wrap');
        if (!wrap) return;

        var update = rafThrottle(function (e) {
            var rect = wrap.getBoundingClientRect();
            var x = e.clientX - rect.left;
            var y = e.clientY - rect.top;
            var cx = rect.width / 2;
            var cy = rect.height / 2;
            var rotY = ((x - cx) / cx) * 6;       // max 6deg
            var rotX = ((cy - y) / cy) * 6;
            wrap.style.transform =
                'perspective(1000px) rotateX(' + rotX + 'deg) rotateY(' + rotY + 'deg) scale(1.02)';
        });
        wrap.addEventListener('mousemove', update);
        wrap.addEventListener('mouseleave', function () {
            wrap.style.transform = '';
        });
    }

    /* --- Hero photo float (CSS-driven) ------------------------- */
    function initHeroFloat() {
        if (prefersReduced) return;
        var wrap = document.querySelector('.hero-v3__photo-wrap');
        if (!wrap) return;
        window.setTimeout(function () {
            wrap.classList.add('is-floating');
        }, 600);
    }

    /* --- Stat counters ----------------------------------------- */
    function initStatCounters() {
        var els = document.querySelectorAll('[data-counter-target]');
        if (!els.length) return;

        function render(el, value, suffix) {
            el.innerText = String(value) + (suffix || '');
        }

        function animate(el) {
            var target = parseFloat(el.getAttribute('data-counter-target')) || 0;
            var suffix = el.getAttribute('data-counter-suffix') || '';
            if (prefersReduced) {
                render(el, target, suffix);
                return;
            }
            var duration = 1400;
            var start = null;
            function step(ts) {
                if (start === null) start = ts;
                var elapsed = ts - start;
                var t = Math.min(elapsed / duration, 1);
                var eased = 1 - Math.pow(1 - t, 3);
                var current = Math.round(target * eased);
                render(el, current, t === 1 ? suffix : (suffix && t > 0.95 ? suffix : ''));
                if (t < 1) {
                    window.requestAnimationFrame(step);
                } else {
                    render(el, target, suffix);
                }
            }
            window.requestAnimationFrame(step);
        }

        if (!('IntersectionObserver' in window)) {
            els.forEach(animate);
            return;
        }

        var observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    animate(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.4 });

        els.forEach(function (el) { observer.observe(el); });
    }

    /* --- Cert skip-controls visibility -------------------------- */
    function initCertSkipVisibility() {
        var section = document.getElementById('certifications');
        var controls = document.querySelector('.cert-skip-controls');
        if (!section || !controls) return;
        if (!('IntersectionObserver' in window)) {
            controls.classList.add('is-visible');
            return;
        }
        var observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    controls.classList.add('is-visible');
                } else {
                    controls.classList.remove('is-visible');
                }
            });
        }, { threshold: 0.05 });
        observer.observe(section);
    }

    /* --- Init --------------------------------------------------- */
    function init() {
        initScrollProgress();
        initHeaderState();
        initParallax();
        initWorkThumbs();
        initCardTilt();
        initHeroSpotlight();
        initHeroTilt();
        initHeroFloat();
        initStatCounters();
        initCertSkipVisibility();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
