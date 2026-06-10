/* ============================================
   SIDIA SURFACE - Premium Interactions
   ============================================ */

(function() {
    'use strict';

    // ============================================
    // PRELOADER
    // ============================================
    window.addEventListener('load', () => {
        setTimeout(() => {
            document.getElementById('preloader').classList.add('hide');
            setTimeout(initHeroAnimations, 400);
        }, 1800);
    });

    function initHeroAnimations() {
        document.querySelector('.hero-badge')?.classList.add('visible');
        document.querySelectorAll('.hero-title .hero-line').forEach(el => el.classList.add('visible'));
        document.querySelector('.hero-subtitle')?.classList.add('visible');
        document.querySelector('.hero-actions')?.classList.add('visible');
        document.querySelector('.hero-stats')?.classList.add('visible');
    }

    // ============================================
    // CUSTOM CURSOR
    // ============================================
    const cursor = document.getElementById('cursor');
    const cursorFollower = document.getElementById('cursor-follower');
    let mouseX = 0, mouseY = 0;
    let followerX = 0, followerY = 0;

    if (window.matchMedia('(min-width: 1025px)').matches) {
        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            if (cursor) {
                cursor.style.left = mouseX + 'px';
                cursor.style.top = mouseY + 'px';
            }
        });

        function animateFollower() {
            followerX += (mouseX - followerX) * 0.15;
            followerY += (mouseY - followerY) * 0.15;
            if (cursorFollower) {
                cursorFollower.style.left = followerX + 'px';
                cursorFollower.style.top = followerY + 'px';
            }
            requestAnimationFrame(animateFollower);
        }
        animateFollower();

        // Hover effects on interactive elements
        document.querySelectorAll('a, button, .project-card, .service-card, .whyus-card, .thumb, .gallery-item').forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursor?.classList.add('hover');
                cursorFollower?.classList.add('hover');
            });
            el.addEventListener('mouseleave', () => {
                cursor?.classList.remove('hover');
                cursorFollower?.classList.remove('hover');
            });
        });
    }

    // ============================================
    // NAVBAR
    // ============================================
    const navbar = document.getElementById('navbar');
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 80) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    navToggle?.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        navMenu.classList.toggle('open');
        document.body.style.overflow = navMenu.classList.contains('open') ? 'hidden' : '';
    });

    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navToggle.classList.remove('active');
            navMenu.classList.remove('open');
            document.body.style.overflow = '';
        });
    });

    // Active link on scroll
    const sections = document.querySelectorAll('section[id], header[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    const observerNav = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === '#' + id) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, { rootMargin: '-50% 0px -50% 0px' });

    sections.forEach(section => observerNav.observe(section));

    // ============================================
    // HERO SLIDESHOW
    // ============================================
    const heroSlides = document.querySelectorAll('.hero-slide');
    let currentSlide = 0;

    if (heroSlides.length > 0) {
        setInterval(() => {
            heroSlides[currentSlide].classList.remove('active');
            currentSlide = (currentSlide + 1) % heroSlides.length;
            heroSlides[currentSlide].classList.add('active');
        }, 6000);
    }

    // ============================================
    // SCROLL REVEAL (AOS-like)
    // ============================================
    const revealElements = document.querySelectorAll('[data-aos]');

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const delay = entry.target.getAttribute('data-aos-delay') || 0;
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, parseInt(delay));
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -80px 0px' });

    revealElements.forEach(el => revealObserver.observe(el));

    // ============================================
    // COUNTER ANIMATION
    // ============================================
    const counters = document.querySelectorAll('[data-count]');

    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.getAttribute('data-count'));
                const duration = 2000;
                const start = performance.now();

                function updateCounter(currentTime) {
                    const elapsed = currentTime - start;
                    const progress = Math.min(elapsed / duration, 1);
                    const eased = 1 - Math.pow(1 - progress, 3);
                    counter.textContent = Math.floor(eased * target);

                    if (progress < 1) {
                        requestAnimationFrame(updateCounter);
                    } else {
                        counter.textContent = target;
                    }
                }
                requestAnimationFrame(updateCounter);
                counterObserver.unobserve(counter);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => counterObserver.observe(counter));

    // ============================================
    // GALLERY THUMBS
    // ============================================
    const thumbs = document.querySelectorAll('.thumb');
    const mainImage = document.getElementById('mainImage');

    thumbs.forEach(thumb => {
        thumb.addEventListener('click', () => {
            thumbs.forEach(t => t.classList.remove('active'));
            thumb.classList.add('active');
            if (mainImage) {
                mainImage.style.opacity = '0';
                setTimeout(() => {
                    mainImage.src = thumb.src.replace('w=400', 'w=1400');
                    mainImage.style.opacity = '1';
                }, 300);
            }
        });
    });

    if (mainImage) {
        mainImage.style.transition = 'opacity 0.4s ease';
    }

    // ============================================
    // PARALLAX EFFECT (3D TILT)
    // ============================================
    const tiltCards = document.querySelectorAll('.tilt-card');

    // ============================================
    // SMOOTH SCROLL
    // ============================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const target = this.getAttribute('href');
            if (target === '#' || target === '#!') return;
            const targetEl = document.querySelector(target);
            if (targetEl) {
                e.preventDefault();
                const offset = 80;
                const top = targetEl.getBoundingClientRect().top + window.pageYOffset - offset;
                window.scrollTo({ top, behavior: 'smooth' });
            }
        });
    });

    // ============================================
    // BACK TO TOP
    // ============================================
    const backToTop = document.getElementById('backToTop');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 600) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    });

    backToTop?.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // ============================================
    // PARALLAX ON MOUSE MOVE (HERO)
    // ============================================
    const hero = document.querySelector('.hero-bg');
    if (hero && window.matchMedia('(min-width: 1025px)').matches) {
        document.addEventListener('mousemove', (e) => {
            const x = (e.clientX / window.innerWidth - 0.5) * 20;
            const y = (e.clientY / window.innerHeight - 0.5) * 20;
            hero.style.transform = `translate(${x}px, ${y}px)`;
        });
    }

    // ============================================
    // MAGNETIC BUTTONS
    // ============================================
    if (window.matchMedia('(min-width: 1025px)').matches) {
        document.querySelectorAll('.btn').forEach(btn => {
            btn.addEventListener('mousemove', (e) => {
                const rect = btn.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;
                btn.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
            });
            btn.addEventListener('mouseleave', () => {
                btn.style.transform = '';
            });
        });
    }

    // ============================================
    // FORM SUBMIT
    // ============================================
    window.handleSubmit = function(form) {
        const btn = form.querySelector('button[type="submit"]');
        const originalContent = btn.innerHTML;
        btn.innerHTML = '<i class="fas fa-check"></i> Message envoyé !';
        btn.style.background = '#1F2328';

        setTimeout(() => {
            btn.innerHTML = originalContent;
            btn.style.background = '';
            form.reset();
        }, 3000);
    };

    // ============================================
    // SERVICE CARDS - 3D TILT
    // ============================================
    if (window.matchMedia('(min-width: 1025px)').matches) {
        document.querySelectorAll('.service-card, .whyus-card').forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = (e.clientX - rect.left) / rect.width - 0.5;
                const y = (e.clientY - rect.top) / rect.height - 0.5;
                card.style.transform = `perspective(1000px) rotateY(${x * 6}deg) rotateX(${-y * 6}deg) translateY(-10px)`;
            });
            card.addEventListener('mouseleave', () => {
                card.style.transform = '';
            });
        });
    }

    // ============================================
    // GALLERY ITEMS - SLOW ZOOM
    // ============================================
    const galleryObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
            }
        });
    });

    document.querySelectorAll('.gallery-item').forEach(el => galleryObserver.observe(el));

    // ============================================
    // CONSOLE EASTER EGG
    // ============================================
    console.log('%c SIDIA SURFACE ', 'background: #A11D2A; color: #FFFFFF; font-size: 24px; padding: 16px; font-weight: bold; font-family: serif;');
    console.log('%c Construire aujourd\'hui les espaces de vie de demain ', 'color: #A11D2A; font-size: 14px; padding: 8px; font-style: italic;');

    // ============================================
    // SCROLL PROGRESS BAR
    // ============================================
    const scrollProgress = document.getElementById('scrollProgress');
    if (scrollProgress) {
        let ticking = false;
        window.addEventListener('scroll', () => {
            if (!ticking) {
                requestAnimationFrame(() => {
                    const h = document.documentElement.scrollHeight - window.innerHeight;
                    const pct = h > 0 ? (window.scrollY / h) * 100 : 0;
                    scrollProgress.style.width = pct + '%';
                    ticking = false;
                });
                ticking = true;
            }
        }, { passive: true });
    }

})();
