(function () {
    'use strict';

    const modal = document.getElementById('contact-modal');
    if (!modal) return;

    const form = modal.querySelector('#contact-form');
    const subjectInput = modal.querySelector('#contact-subject');
    const messageInput = modal.querySelector('#contact-message');
    const submitBtn = modal.querySelector('[data-contact-submit]');
    const statusEl = modal.querySelector('[data-contact-status]');
    const triggers = document.querySelectorAll('[data-contact-trigger]');
    const closers = modal.querySelectorAll('[data-contact-close]');

    let lastFocused = null;

    function openModal() {
        lastFocused = document.activeElement;
        modal.classList.add('is-open');
        modal.setAttribute('aria-hidden', 'false');
        document.body.classList.add('contact-modal-open');
        setStatus('', '');
        setTimeout(() => subjectInput && subjectInput.focus(), 60);
    }

    function closeModal() {
        modal.classList.remove('is-open');
        modal.setAttribute('aria-hidden', 'true');
        document.body.classList.remove('contact-modal-open');
        if (lastFocused && typeof lastFocused.focus === 'function') {
            lastFocused.focus();
        }
    }

    function setStatus(message, kind) {
        if (!statusEl) return;
        statusEl.textContent = message || '';
        statusEl.dataset.kind = kind || '';
    }

    function setLoading(isLoading) {
        if (!submitBtn) return;
        submitBtn.disabled = isLoading;
        submitBtn.dataset.loading = isLoading ? 'true' : 'false';
        submitBtn.textContent = isLoading ? 'Sending...' : 'Send Email';
    }

    triggers.forEach((trigger) => {
        trigger.addEventListener('click', (event) => {
            event.preventDefault();
            openModal();
        });
    });

    closers.forEach((closer) => {
        closer.addEventListener('click', (event) => {
            event.preventDefault();
            closeModal();
        });
    });

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && modal.classList.contains('is-open')) {
            closeModal();
        }
    });

    if (form) {
        form.addEventListener('submit', async (event) => {
            event.preventDefault();
            const subject = (subjectInput.value || '').trim();
            const message = (messageInput.value || '').trim();
            if (!subject || !message) {
                setStatus('Please fill in subject and message.', 'error');
                return;
            }

            setLoading(true);
            setStatus('Sending...', 'info');

            try {
                const response = await fetch('/contact', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ subject, message }),
                });
                const data = await response.json().catch(() => ({}));

                if (response.ok && data.ok) {
                    setStatus('Sent. Hanz will get back to you soon.', 'success');
                    form.reset();
                    setTimeout(closeModal, 1500);
                } else {
                    const err = (data && data.error) || 'Could not send. Please try again later.';
                    setStatus(err, 'error');
                }
            } catch (err) {
                setStatus('Network error. Please try again.', 'error');
            } finally {
                setLoading(false);
            }
        });
    }
})();
