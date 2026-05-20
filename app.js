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
    const darkSections = document.querySelectorAll('.section.dark, .origins, .modular, .origins-full');
    if (nav && darkSections.length) {
        const checkDark = () => {
            const anyDark = Array.from(darkSections).some(sec => {
                const r = sec.getBoundingClientRect();
                return r.top <= 76 && r.bottom >= 76;
            });
            nav.classList.toggle('on-dark', anyDark);
        };
        checkDark();
        let raf;
        window.addEventListener('scroll', () => {
            if (raf) return;
            raf = requestAnimationFrame(() => { checkDark(); raf = null; });
        }, { passive: true });
        window.addEventListener('resize', checkDark);
    }

    // ── Hero scroll-linked zoom + fade ──
    const hero = document.querySelector('.hero');
    const heroSticky = hero?.querySelector('.hero__sticky');
    const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (hero && heroSticky && !reduceMotion) {
        let heroRaf;
        const updateHero = () => {
            const rect = hero.getBoundingClientRect();
            const total = hero.offsetHeight - window.innerHeight;
            const scrolled = Math.min(Math.max(-rect.top, 0), total);
            const progress = total > 0 ? scrolled / total : 0;
            // Image-content zoom: continuous, monotonic — keeps zooming in until the image fades out.
            const zoom = 1 + progress * 2.2;
            // Frame stays at full size — no card-shrink anymore.
            const scale = 1;
            // Opacity: holds, then fades out alongside the text.
            const opacity = progress < 0.25
                ? 1
                : Math.max(0, 1 - (progress - 0.25) / 0.65);
            // No framing styling (radius/shadow) — card behaviour removed.
            const frame = 0;
            heroSticky.style.setProperty('--hero-progress', progress.toFixed(3));
            heroSticky.style.setProperty('--hero-zoom', zoom.toFixed(3));
            heroSticky.style.setProperty('--hero-scale', scale.toFixed(3));
            heroSticky.style.setProperty('--hero-opacity', opacity.toFixed(3));
            heroSticky.style.setProperty('--hero-frame', frame.toFixed(3));
            heroRaf = null;
        };
        updateHero();
        window.addEventListener('scroll', () => {
            if (heroRaf) return;
            heroRaf = requestAnimationFrame(updateHero);
        }, { passive: true });
        window.addEventListener('resize', updateHero);
    }

    // ── Ethos: split final line into per-letter spans, trigger staged reveal ──
    const ethos = document.querySelector('.ethos');
    const ethosLine = ethos?.querySelector('.ethos__line');
    if (ethosLine) {
        const text = ethosLine.textContent;
        ethosLine.setAttribute('aria-label', text);
        ethosLine.textContent = '';
        Array.from(text).forEach((ch, i) => {
            const span = document.createElement('span');
            span.className = 'char';
            span.style.setProperty('--i', i);
            span.setAttribute('aria-hidden', 'true');
            span.textContent = ch;
            ethosLine.appendChild(span);
        });
    }
    if (ethos && !reduceMotion) {
        let ethosRaf;
        const updateEthos = () => {
            const rect = ethos.getBoundingClientRect();
            const vh = window.innerHeight || 1;
            // 0 when section top is at viewport bottom, 1 when section top is ~40% from viewport top.
            // Tighter range so the staged reveal completes shortly after the section enters view.
            const progress = Math.max(0, Math.min(1, (vh - rect.top) / (vh * 0.6)));
            ethos.style.setProperty('--ethos-progress', progress.toFixed(3));
            ethosRaf = null;
        };
        updateEthos();
        window.addEventListener('scroll', () => {
            if (ethosRaf) return;
            ethosRaf = requestAnimationFrame(updateEthos);
        }, { passive: true });
        window.addEventListener('resize', updateEthos);
    } else if (ethos) {
        ethos.style.setProperty('--ethos-progress', 1);
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
