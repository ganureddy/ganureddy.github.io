/* ═══════════════════════════════════════════════════════════════
   GANU BONTALWAD — Premium SaaS Portfolio Engine
   Smooth Animations · Performance Optimized
   ═══════════════════════════════════════════════════════════════ */

(function () {
  'use strict';

  /* ══════════════════════════════════════════
     LOADING SCREEN
  ══════════════════════════════════════════ */
  const loader = document.getElementById('loader');
  const loaderProgress = document.querySelector('.loader-progress');
  let progress = 0;

  const loadInterval = setInterval(() => {
    progress += Math.random() * 25 + 5;
    if (progress > 95) progress = 95;
    loaderProgress.style.width = progress + '%';
  }, 80);

  window.addEventListener('load', () => {
    clearInterval(loadInterval);
    loaderProgress.style.width = '100%';
    setTimeout(() => {
      loader.classList.add('done');
      initApp();
    }, 400);
  });

  /* ══════════════════════════════════════════
     APP INIT
  ══════════════════════════════════════════ */
  function initApp() {
    initNavigation();
    initHeroAnimations();
    initScrollReveal();
    initCounters();
    initSkillBars();
    initSmoothScroll();
    initFormHandler();
  }

  /* ══════════════════════════════════════════
     NAVIGATION
  ══════════════════════════════════════════ */
  function initNavigation() {
    const nav = document.querySelector('.nav');
    const hamburger = document.getElementById('hamburger');
    const mobileMenu = document.getElementById('mobile-menu');

    // Show nav
    setTimeout(() => nav.classList.add('visible'), 100);

    // Hamburger
    hamburger?.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      mobileMenu.classList.toggle('open');
    });

    // Close on link click
    mobileMenu?.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        mobileMenu.classList.remove('open');
      });
    });

    // Close on outside click
    document.addEventListener('click', (e) => {
      if (!hamburger?.contains(e.target) && !mobileMenu?.contains(e.target)) {
        hamburger?.classList.remove('active');
        mobileMenu?.classList.remove('open');
      }
    });

    // Nav scroll effect
    window.addEventListener('scroll', () => {
      if (window.pageYOffset > 50) {
        nav.style.background = 'rgba(5, 5, 5, 0.95)';
      } else {
        nav.style.background = 'rgba(5, 5, 5, 0.8)';
      }
    }, { passive: true });
  }

  /* ══════════════════════════════════════════
     HERO ANIMATIONS
  ══════════════════════════════════════════ */
  function initHeroAnimations() {
    const elements = [
      { el: '.hero-badge', delay: 100 },
      { el: '.hero-title', delay: 200 },
      { el: '.hero-subtitle', delay: 300 },
      { el: '.hero-actions', delay: 400 },
      { el: '.hero-stats', delay: 500 },
      { el: '.hero-scroll', delay: 700 }
    ];

    elements.forEach(({ el, delay }) => {
      const element = document.querySelector(el);
      if (element) {
        setTimeout(() => {
          element.style.opacity = '1';
          element.style.transform = 'translateY(0)';
          element.style.transition = 'opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1), transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)';
        }, delay);
      }
    });
  }

  /* ══════════════════════════════════════════
     SCROLL REVEAL
  ══════════════════════════════════════════ */
  function initScrollReveal() {
    const reveals = document.querySelectorAll('.reveal, .reveal-left');

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });

    reveals.forEach(el => observer.observe(el));
  }

  /* ══════════════════════════════════════════
     COUNTERS
  ══════════════════════════════════════════ */
  function initCounters() {
    const counters = document.querySelectorAll('[data-count]');

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target._counted) {
          entry.target._counted = true;
          animateCounter(entry.target);
        }
      });
    }, { threshold: 0.5 });

    counters.forEach(counter => observer.observe(counter));
  }

  function animateCounter(el) {
    const target = parseInt(el.dataset.count, 10);
    const suffix = el.dataset.suffix || '';
    const duration = 2000;
    const steps = 60;
    const increment = target / steps;
    let current = 0;
    let step = 0;

    const timer = setInterval(() => {
      step++;
      current = Math.min(Math.ceil(increment * step), target);
      el.textContent = current + suffix;

      if (step >= steps) {
        clearInterval(timer);
        el.textContent = target + suffix;
      }
    }, duration / steps);
  }

  /* ══════════════════════════════════════════
     SKILL BARS
  ══════════════════════════════════════════ */
  function initSkillBars() {
    const skillFills = document.querySelectorAll('.skill-fill[data-width]');

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target._animated) {
          entry.target._animated = true;
          setTimeout(() => {
            entry.target.style.width = entry.target.dataset.width + '%';
          }, 200);
        }
      });
    }, { threshold: 0.5 });

    skillFills.forEach(fill => observer.observe(fill));
  }

  /* ══════════════════════════════════════════
     SMOOTH SCROLL
  ══════════════════════════════════════════ */
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(link => {
      link.addEventListener('click', (e) => {
        const target = document.querySelector(link.getAttribute('href'));
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    });
  }

  /* ══════════════════════════════════════════
     FORM HANDLER
  ══════════════════════════════════════════ */
  function initFormHandler() {
    const form = document.getElementById('contact-form');
    const btn = document.getElementById('submit-btn');

    form?.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const originalText = btn.innerHTML;
      btn.innerHTML = `
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <polyline points="20 6 9 17 4 12"/>
        </svg>
        Sent!
      `;
      btn.style.background = '#10B981';
      btn.disabled = true;

      setTimeout(() => {
        btn.innerHTML = originalText;
        btn.style.background = '';
        btn.disabled = false;
        form.reset();
      }, 3000);
    });
  }

})();
