// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

// ========== NAVBAR ==========
const navbar = document.getElementById('navbar');
const heroContent = document.querySelector('.hero-content');

// ========== DROPDOWN MENU ==========
const menuBtn = document.getElementById('menuBtn');
const dropdownMenu = document.getElementById('dropdownMenu');

menuBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    const isOpen = dropdownMenu.classList.toggle('show');
    menuBtn.classList.toggle('active');

    if (isOpen) {
        gsap.fromTo(dropdownMenu,
            { opacity: 0, y: -12, scale: 0.96 },
            { opacity: 1, y: 0, scale: 1, duration: 0.35, ease: 'power2.out' }
        );
        gsap.fromTo(dropdownMenu.querySelectorAll('a'),
            { opacity: 0, x: -10 },
            { opacity: 1, x: 0, duration: 0.3, stagger: 0.04, ease: 'power2.out', delay: 0.05 }
        );
    }
});

document.addEventListener('click', (e) => {
    if (!menuBtn.contains(e.target) && !dropdownMenu.contains(e.target)) {
        dropdownMenu.classList.remove('show');
        menuBtn.classList.remove('active');
    }
});

dropdownMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        dropdownMenu.classList.remove('show');
        menuBtn.classList.remove('active');
    });
});

// ========== LOGIN PAGE ==========
const btnMasuk = document.getElementById('btnMasuk');
const loginPage = document.getElementById('loginPage');
const backToLanding = document.getElementById('backToLanding');

btnMasuk.addEventListener('click', (e) => {
    e.preventDefault();
    loginPage.classList.add('active');
    document.body.style.overflow = 'hidden';

    gsap.fromTo('.login-container',
        { opacity: 0, scale: 0.9, y: 30 },
        { opacity: 1, scale: 1, y: 0, duration: 0.5, ease: 'power3.out' }
    );
    gsap.fromTo('.login-form-side > *',
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.4, stagger: 0.08, delay: 0.2, ease: 'power2.out' }
    );
    gsap.fromTo('.login-logo-side > *',
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1, duration: 0.6, stagger: 0.1, delay: 0.25, ease: 'back.out(1.4)' }
    );
});

backToLanding.addEventListener('click', (e) => {
    e.preventDefault();
    gsap.to('.login-container', {
        opacity: 0, scale: 0.95, y: 20, duration: 0.3, ease: 'power2.in',
        onComplete: () => {
            loginPage.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
});

// Toggle Password
const togglePass = document.getElementById('togglePass');
const passwordInput = document.getElementById('passwordInput');

togglePass.addEventListener('click', () => {
    const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
    passwordInput.setAttribute('type', type);
    togglePass.innerHTML = type === 'password'
        ? '<i class="fas fa-eye-slash"></i>'
        : '<i class="fas fa-eye"></i>';
});

document.getElementById('loginForm').addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Login berhasil! (Demo)\nSelamat datang di Glamping Lakeside.');
    loginPage.classList.remove('active');
    document.body.style.overflow = '';
});

// ========== FAQ ACCORDION (with GSAP) ==========
document.querySelectorAll('.faq-question').forEach(question => {
    question.addEventListener('click', () => {
        const item = question.parentElement;
        const answer = item.querySelector('.faq-answer');
        const isActive = item.classList.contains('active');

        document.querySelectorAll('.faq-item').forEach(i => {
            if (i !== item && i.classList.contains('active')) {
                i.classList.remove('active');
                gsap.to(i.querySelector('.faq-answer'), {
                    height: 0, duration: 0.35, ease: 'power2.inOut'
                });
            }
        });

        if (!isActive) {
            item.classList.add('active');
            gsap.set(answer, { height: 'auto' });
            const fullHeight = answer.offsetHeight;
            gsap.fromTo(answer,
                { height: 0 },
                { height: fullHeight, duration: 0.4, ease: 'power2.out' }
            );
        } else {
            item.classList.remove('active');
            gsap.to(answer, { height: 0, duration: 0.35, ease: 'power2.inOut' });
        }
    });
});

// ========== CONTACT FORM ==========
document.getElementById('contactForm').addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Terima kasih! Pesan Anda telah terkirim.\nTim kami akan segera menghubungi Anda.');
    e.target.reset();
});

// ========== GSAP: HERO INTRO ==========
const heroTl = gsap.timeline({ defaults: { ease: 'power3.out' } });
heroTl
    .from('.hero-badge', { opacity: 0, y: 30, duration: 0.7 })
    .from('.hero h1', { opacity: 0, y: 50, duration: 0.9 }, '-=0.4')
    .from('.hero p', { opacity: 0, y: 30, duration: 0.7 }, '-=0.5')
    .from('.hero-btns a', { opacity: 0, y: 25, duration: 0.6, stagger: 0.12 }, '-=0.4')
    .from('.navbar', { opacity: 1, y: -20, duration: 0.6 }, '-=0.8');

// ========== GSAP: PARALLAX HERO ==========
gsap.to('.hero-content', {
    y: 120,
    opacity: 0.15,
    ease: 'none',
    scrollTrigger: {
        trigger: '.hero',
        start: 'top top',
        end: 'bottom top',
        scrub: true
    }
});

gsap.to('.hero', {
    backgroundPosition: '50% 30%',
    ease: 'none',
    scrollTrigger: {
        trigger: '.hero',
        start: 'top top',
        end: 'bottom top',
        scrub: true
    }
});

// ========== GSAP: NAVBAR ON SCROLL ==========
ScrollTrigger.create({
    start: 'top -80',
    onUpdate: (self) => {
        if (self.scroll() > 80) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }
});

// ========== GSAP: SCROLL ANIMATIONS ==========
function animateFrom(selector, vars = {}) {
    const defaults = {
        opacity: 0,
        y: 50,
        duration: 0.8,
        ease: 'power2.out',
        stagger: 0.1
    };
    const config = { ...defaults, ...vars };

    gsap.utils.toArray(selector).forEach((el) => {
        const fromVars = { opacity: 0 };
        if (el.classList.contains('fade-left')) {
            fromVars.x = -60;
            fromVars.y = 0;
        } else if (el.classList.contains('fade-right')) {
            fromVars.x = 60;
            fromVars.y = 0;
        } else if (el.classList.contains('scale-in')) {
            fromVars.scale = 0.85;
            fromVars.y = 30;
        } else {
            fromVars.y = 50;
        }

        let delay = 0;
        for (let d = 1; d <= 6; d++) {
            if (el.classList.contains(`delay-${d}`)) {
                delay = d * 0.08;
                break;
            }
        }

        gsap.fromTo(el, fromVars, {
            opacity: 1,
            x: 0,
            y: 0,
            scale: 1,
            duration: config.duration,
            delay: delay,
            ease: config.ease,
            scrollTrigger: {
                trigger: el,
                start: 'top 88%',
                toggleActions: 'play none none none'
            }
        });
    });
}

animateFrom('.section-header.animate-on-scroll');
animateFrom('.about-img.animate-on-scroll');
animateFrom('.about-content.animate-on-scroll');
animateFrom('.feature-item.animate-on-scroll', { duration: 0.6 });

gsap.fromTo('.dest-card.animate-on-scroll',
    { opacity: 0, y: 60, scale: 0.95 },
    {
        opacity: 1, y: 0, scale: 1,
        duration: 0.75,
        stagger: 0.12,
        ease: 'power2.out',
        scrollTrigger: {
            trigger: '.dest-grid',
            start: 'top 85%',
            toggleActions: 'play none none none'
        }
    }
);

gsap.fromTo('.gallery-item.animate-on-scroll',
    { opacity: 0, scale: 0.8, y: 40 },
    {
        opacity: 1, scale: 1, y: 0,
        duration: 0.7,
        stagger: 0.1,
        ease: 'back.out(1.2)',
        scrollTrigger: {
            trigger: '.gallery-grid',
            start: 'top 85%',
            toggleActions: 'play none none none'
        }
    }
);

gsap.fromTo('.event-card.animate-on-scroll',
    { opacity: 0, y: 50 },
    {
        opacity: 1, y: 0,
        duration: 0.7,
        stagger: 0.15,
        ease: 'power2.out',
        scrollTrigger: {
            trigger: '.event-grid',
            start: 'top 85%',
            toggleActions: 'play none none none'
        }
    }
);

gsap.fromTo('.quote-card.animate-on-scroll',
    { opacity: 0, y: 40 },
    {
        opacity: 1, y: 0,
        duration: 0.65,
        stagger: 0.12,
        ease: 'power2.out',
        scrollTrigger: {
            trigger: '.testi-quotes',
            start: 'top 88%',
            toggleActions: 'play none none none'
        }
    }
);

gsap.fromTo('.video-wrapper',
    { opacity: 0, scale: 0.92, y: 40 },
    {
        opacity: 1, scale: 1, y: 0,
        duration: 0.9,
        ease: 'power2.out',
        scrollTrigger: {
            trigger: '.video-wrapper',
            start: 'top 85%',
            toggleActions: 'play none none none'
        }
    }
);

gsap.fromTo('.faq-item.animate-on-scroll',
    { opacity: 0, y: 30 },
    {
        opacity: 1, y: 0,
        duration: 0.55,
        stagger: 0.08,
        ease: 'power2.out',
        scrollTrigger: {
            trigger: '.faq-list',
            start: 'top 88%',
            toggleActions: 'play none none none'
        }
    }
);

gsap.fromTo('.map-container',
    { opacity: 0, y: 50 },
    {
        opacity: 1, y: 0,
        duration: 0.8,
        ease: 'power2.out',
        scrollTrigger: {
            trigger: '.map-container',
            start: 'top 88%',
            toggleActions: 'play none none none'
        }
    }
);

animateFrom('.map-info-item.animate-on-scroll', { duration: 0.6 });

gsap.fromTo('.contact-grid.animate-on-scroll',
    { opacity: 0, y: 50 },
    {
        opacity: 1, y: 0,
        duration: 0.85,
        ease: 'power2.out',
        scrollTrigger: {
            trigger: '.contact-grid',
            start: 'top 88%',
            toggleActions: 'play none none none'
        }
    }
);

gsap.fromTo('.footer-grid > *',
    { opacity: 0, y: 30 },
    {
        opacity: 1, y: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power2.out',
        scrollTrigger: {
            trigger: '.footer',
            start: 'top 92%',
            toggleActions: 'play none none none'
        }
    }
);

// ========== GSAP: SCROLLSPY ==========
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.dropdown-content a[href^="#"]');

sections.forEach(section => {
    ScrollTrigger.create({
        trigger: section,
        start: 'top 30%',
        end: 'bottom 30%',
        onEnter: () => setActiveLink(section.id),
        onEnterBack: () => setActiveLink(section.id)
    });
});

ScrollTrigger.create({
    start: 'top top',
    end: 300,
    onEnter: () => setActiveLink('home'),
    onEnterBack: () => setActiveLink('home')
});

function setActiveLink(id) {
    navLinks.forEach(link => {
        link.classList.remove('active-link');
        if (link.getAttribute('href') === '#' + id) {
            link.classList.add('active-link');
        }
    });
}

// ========== SMOOTH SCROLL ==========
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const targetId = this.getAttribute('href');
        if (targetId === '#' || targetId === '') return;

        const target = document.querySelector(targetId);
        if (target) {
            e.preventDefault();
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({ top: offsetTop, behavior: 'smooth' });
        }
    });
});

// ========== WA BUTTON ENTRANCE ==========
gsap.from('.wa-float', {
    opacity: 0,
    scale: 0,
    duration: 0.6,
    delay: 1.5,
    ease: 'back.out(1.7)'
});

// Refresh ScrollTrigger after everything loads
window.addEventListener('load', () => {
    ScrollTrigger.refresh();
}); 

