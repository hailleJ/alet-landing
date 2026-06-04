/* ============================================
   AletCloud Landing Page — JavaScript
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

    // --- Navigation scroll effect ---
    const nav = document.getElementById('main-nav');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.scrollY;
        if (currentScroll > 40) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
        lastScroll = currentScroll;
    }, { passive: true });

    // --- Mobile nav toggle ---
    const navToggle = document.getElementById('nav-toggle');
    const navLinks = document.getElementById('nav-links');

    if (navToggle) {
        navToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });

        // Close on link click
        navLinks.querySelectorAll('.nav__link').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
            });
        });
    }

    // --- Scroll animations (IntersectionObserver) ---
    const animateElements = document.querySelectorAll(
        '.feature-card, .service-card, .pricing-card, .cta__card, .section__header'
    );

    animateElements.forEach(el => el.classList.add('animate-on-scroll'));

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Stagger the animation
                const siblings = entry.target.parentElement.querySelectorAll('.animate-on-scroll');
                let delay = 0;
                siblings.forEach((sib, i) => {
                    if (sib === entry.target) delay = i * 80;
                });
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, delay);
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -40px 0px'
    });

    animateElements.forEach(el => observer.observe(el));

    // --- Terminal typing animation ---
    const lines = [
        { target: 'type-line-1', text: 'git push aletcloud main', speed: 50 },
        { target: 'type-line-2', text: '⟶ Building from GitHub...', speed: 30, delay: 600 },
        { target: 'type-line-3', text: '⟶ Deploying to addis-ababa-1...', speed: 30, delay: 400 },
        { target: 'type-line-4', text: '✓ Live at https://myapp.app.aletcloud.com', speed: 25, delay: 500 }
    ];

    function typeText(elementId, text, speed, callback) {
        const el = document.getElementById(elementId);
        if (!el) return;
        let i = 0;

        // Add cursor
        const cursor = document.createElement('span');
        cursor.className = 'typing-cursor';
        el.appendChild(cursor);

        function type() {
            if (i < text.length) {
                el.insertBefore(document.createTextNode(text.charAt(i)), cursor);
                i++;
                setTimeout(type, speed);
            } else {
                // Remove cursor after typing done
                setTimeout(() => {
                    cursor.remove();
                    if (callback) callback();
                }, 300);
            }
        }
        type();
    }

    function startTerminalAnimation() {
        let currentLine = 0;

        function typeLine() {
            if (currentLine >= lines.length) return;

            const line = lines[currentLine];
            const delay = currentLine === 0 ? 800 : (line.delay || 300);

            setTimeout(() => {
                typeText(line.target, line.text, line.speed, () => {
                    currentLine++;
                    typeLine();
                });
            }, delay);
        }

        typeLine();
    }

    // Start terminal animation when hero is visible
    const heroTerminal = document.getElementById('hero-terminal');
    if (heroTerminal) {
        const terminalObserver = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                startTerminalAnimation();
                terminalObserver.disconnect();
            }
        }, { threshold: 0.3 });
        terminalObserver.observe(heroTerminal);
    }

    // --- Smooth scroll for anchor links ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offset = 80;
                const top = target.getBoundingClientRect().top + window.scrollY - offset;
                window.scrollTo({ top, behavior: 'smooth' });
            }
        });
    });

    // --- Parallax-lite for bg glows ---
    let ticking = false;
    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(() => {
                const scrolled = window.scrollY;
                document.querySelectorAll('.bg-glow').forEach((glow, i) => {
                    const speed = 0.03 + (i * 0.015);
                    glow.style.transform = `translateY(${scrolled * speed}px)`;
                });
                ticking = false;
            });
            ticking = true;
        }
    }, { passive: true });

});
