// Samasta Saunas — minimal shared JS
// Mobile nav toggle + scroll reveals + nav background switch + form success

(() => {
    'use strict';

    // ── Mobile nav toggle ──
    const toggle = document.querySelector('.nav__toggle');
    const links = document.querySelector('.nav__links');
    if (toggle && links) {
        toggle.addEventListener('click', () => {
            const open = links.classList.toggle('open');
            toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
        });
        links.querySelectorAll('a').forEach(a => {
            a.addEventListener('click', () => links.classList.remove('open'));
        });
    }

    // ── Nav background switch when scrolling over dark sections ──
    const nav = document.querySelector('.nav');
    const darkSections = document.querySelectorAll('.section.dark, .hero, .origins, .modular, .origins-full');
    if (nav && darkSections.length) {
        const obs = new IntersectionObserver((entries) => {
            // If any dark section is intersecting the top of viewport, switch nav style.
            const anyDark = Array.from(darkSections).some(sec => {
                const r = sec.getBoundingClientRect();
                return r.top <= 76 && r.bottom >= 76;
            });
            nav.classList.toggle('on-dark', anyDark);
        }, { rootMargin: '-76px 0px 0px 0px', threshold: [0, 0.001, 0.5, 1] });
        darkSections.forEach(sec => obs.observe(sec));
        // also check on scroll for safety
        let raf;
        window.addEventListener('scroll', () => {
            if (raf) return;
            raf = requestAnimationFrame(() => {
                const anyDark = Array.from(darkSections).some(sec => {
                    const r = sec.getBoundingClientRect();
                    return r.top <= 76 && r.bottom >= 76;
                });
                nav.classList.toggle('on-dark', anyDark);
                raf = null;
            });
        }, { passive: true });
    }

    // ── Reveal on scroll ──
    const reveals = document.querySelectorAll('.reveal');
    if ('IntersectionObserver' in window && reveals.length) {
        const ro = new IntersectionObserver((entries) => {
            entries.forEach(e => {
                if (e.isIntersecting) {
                    e.target.classList.add('in');
                    ro.unobserve(e.target);
                }
            });
        }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
        reveals.forEach(el => ro.observe(el));
    } else {
        reveals.forEach(el => el.classList.add('in'));
    }

    // ── Enquiry form: graceful success state when posting to Formspree ──
    const form = document.querySelector('form.enquiry');
    if (form) {
        form.addEventListener('submit', async (e) => {
            // If the form has no real action (placeholder), simulate success.
            const action = form.getAttribute('action') || '';
            if (!action || action.includes('YOUR_FORMSPREE_ID')) {
                e.preventDefault();
                showSuccess(form);
                return;
            }
            // Otherwise let it POST normally but intercept with fetch for nicer UX.
            e.preventDefault();
            const submitBtn = form.querySelector('button[type="submit"]');
            const original = submitBtn.textContent;
            submitBtn.disabled = true;
            submitBtn.textContent = 'Sending…';
            try {
                const data = new FormData(form);
                const res = await fetch(action, {
                    method: 'POST',
                    body: data,
                    headers: { 'Accept': 'application/json' }
                });
                if (res.ok) {
                    showSuccess(form);
                } else {
                    submitBtn.textContent = 'Try again';
                    submitBtn.disabled = false;
                }
            } catch (err) {
                submitBtn.textContent = original;
                submitBtn.disabled = false;
            }
        });
    }

    function showSuccess(form) {
        const success = form.querySelector('.form-success');
        if (success) {
            form.querySelectorAll('.field, .submit-row').forEach(el => el.style.display = 'none');
            success.classList.add('show');
            success.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    }
})();
