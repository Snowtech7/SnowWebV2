/* ============================================================
   SNOW TECH — UI compartida (todas las páginas)
   Header scroll · Menú móvil · Formularios · Analytics
   Cargado con defer. Sustituye los scripts inline duplicados.
   ============================================================ */
(function () {
    'use strict';

    /* ── CONFIG ─────────────────────────────────────────────
       Rellenar cuando existan las cuentas reales:
       - formEndpoint:       endpoint POST de contacto (Formspree: 'https://formspree.io/f/XXXXXXXX' o webhook n8n)
       - newsletterEndpoint: endpoint POST de newsletter (si vacío, usa formEndpoint)
       - plausibleDomain:    dominio en Plausible para activar analytics (p.ej. 'snowtech.io')
       - whatsapp:           número con prefijo internacional, solo dígitos (p.ej. '34600111222');
                             activa el botón "CANAL DIRECTO ▸ WHATSAPP" en contact.html
       - calendarUrl:        URL de agenda (Calendly/Cal.com); activa "AGENDA UNA LLAMADA ▸" en contact.html
       Mientras estén vacíos NO se simula éxito: los formularios
       derivan al correo real y los accesos directos quedan ocultos. */
    var CONFIG = window.SNOW_CONFIG = {
        formEndpoint: '',
        newsletterEndpoint: '',
        plausibleDomain: '',
        contactEmail: 'sales@isnowagency.com',
        whatsapp: '',
        calendarUrl: ''
    };

    /* ── ANALYTICS ── */
    if (CONFIG.plausibleDomain) {
        var ps = document.createElement('script');
        ps.defer = true;
        ps.setAttribute('data-domain', CONFIG.plausibleDomain);
        ps.src = 'https://plausible.io/js/script.js';
        document.head.appendChild(ps);
    }
    window.snowTrack = function (event, props) {
        try {
            if (window.plausible) window.plausible(event, { props: props || {} });
            else if (window.gtag) window.gtag('event', event, props || {});
        } catch (e) { /* analytics nunca debe romper la página */ }
    };

    /* ── HEADER: estado scrolled (rAF + passive) ── */
    var scrollTick = false;
    window.addEventListener('scroll', function () {
        if (scrollTick) return;
        scrollTick = true;
        requestAnimationFrame(function () {
            var header = document.querySelector('header');
            if (header) header.classList.toggle('scrolled', window.scrollY > 50);
            scrollTick = false;
        });
    }, { passive: true });

    /* ── MENÚ MÓVIL ── */
    window.toggleMobileMenu = function () {
        var overlay = document.getElementById('mobile-overlay');
        var toggle = document.getElementById('mobile-menu-toggle');
        if (!overlay || !toggle) return;
        var isOpen = overlay.style.display === 'flex';
        overlay.style.display = isOpen ? 'none' : 'flex';
        overlay.hidden = isOpen;
        toggle.setAttribute('aria-expanded', String(!isOpen));
        toggle.setAttribute('aria-label', isOpen ? 'Abrir menú de navegación' : 'Cerrar menú');
    };

    /* ── HELPERS DE FORMULARIO ── */
    function postJSON(endpoint, data) {
        return fetch(endpoint, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
            body: JSON.stringify(data)
        }).then(function (r) {
            if (!r.ok) throw new Error('HTTP ' + r.status);
            return r;
        });
    }
    window.snowPostForm = postJSON;

    function formNote(form, text, isError) {
        var note = form.querySelector('.form-note');
        if (!note) {
            note = document.createElement('p');
            note.className = 'form-note';
            note.setAttribute('role', 'status');
            note.style.cssText = "font-family:'JetBrains Mono',monospace;font-size:0.7rem;letter-spacing:0.08em;margin:0.4rem 0 0;";
            form.appendChild(note);
        }
        note.style.color = isError ? '#ff7b7b' : 'var(--accent)';
        note.textContent = text;
    }

    /* ── NEWSLETTERS (.newsletter-form) ── */
    document.addEventListener('submit', function (e) {
        var form = e.target;
        if (!form.classList || !form.classList.contains('newsletter-form')) return;
        e.preventDefault();
        var input = form.querySelector('input[type="email"]');
        var email = input ? input.value.trim() : '';
        if (!email) return;
        var source = form.getAttribute('data-source') || location.pathname;
        window.snowTrack('newsletter_submit', { source: source });

        var endpoint = CONFIG.newsletterEndpoint || CONFIG.formEndpoint;
        if (!endpoint) {
            // Sin backend aún: derivar al correo real, nunca fingir éxito
            window.location.href = 'mailto:' + CONFIG.contactEmail +
                '?subject=' + encodeURIComponent('Alta newsletter SNOW') +
                '&body=' + encodeURIComponent('Quiero suscribirme a la newsletter con este email: ' + email);
            formNote(form, '→ Abriendo tu correo · o escribe a ' + CONFIG.contactEmail, false);
            return;
        }
        var btn = form.querySelector('button');
        if (btn) btn.disabled = true;
        postJSON(endpoint, { email: email, form: 'newsletter', source: source })
            .then(function () {
                form.innerHTML = "<span style=\"color:var(--accent);font-family:'JetBrains Mono',monospace;font-size:0.75rem;\">✓ Suscrito</span>";
            })
            .catch(function () {
                if (btn) btn.disabled = false;
                formNote(form, '✕ Error de conexión · escribe a ' + CONFIG.contactEmail, true);
            });
    });

    /* ── TRACKING DE CTAs ── */
    document.addEventListener('click', function (e) {
        if (!e.target.closest) return;
        var cta = e.target.closest('a.cta-header');
        if (cta) window.snowTrack('cta_header_click', { page: location.pathname });
    });
})();
