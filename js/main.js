/* ============================================================
   SETH DISON C. SEPE — Portfolio JavaScript
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  // ─── Active Nav Link ───────────────────────────────────────
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a, .mobile-nav a').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });

  // ─── Navbar Scroll ─────────────────────────────────────────
  const navbar = document.getElementById('navbar');
  const onScroll = () => {
    if (window.scrollY > 60) navbar?.classList.add('scrolled');
    else navbar?.classList.remove('scrolled');
    toggleScrollTop();
  };
  window.addEventListener('scroll', onScroll, { passive: true });

  // ─── Hamburger Menu ────────────────────────────────────────
  const hamburger = document.querySelector('.hamburger');
  const mobileNav = document.querySelector('.mobile-nav');
  hamburger?.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    mobileNav?.classList.toggle('open');
    document.body.style.overflow = mobileNav?.classList.contains('open') ? 'hidden' : '';
  });
  document.querySelectorAll('.mobile-nav a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger?.classList.remove('open');
      mobileNav?.classList.remove('open');
      document.body.style.overflow = '';
    });
  });

  // ─── Scroll-to-top ─────────────────────────────────────────
  const scrollTopBtn = document.getElementById('scroll-top');
  function toggleScrollTop() {
    if (!scrollTopBtn) return;
    if (window.scrollY > 400) scrollTopBtn.classList.add('visible');
    else scrollTopBtn.classList.remove('visible');
  }
  scrollTopBtn?.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

  // ─── Hero scroll effect ────────────────────────────────────
  const heroPhoto = document.getElementById('hero-photo') || document.querySelector('.profile-placeholder');
  const heroBgName = document.getElementById('hero-bg-name');
  if (heroPhoto || heroBgName) {
    window.addEventListener('scroll', () => {
      const scrollY = window.scrollY;
      const fadeStart = 80;
      const fadeEnd = 400;
      const progress = Math.max(0, Math.min(1, (scrollY - fadeStart) / (fadeEnd - fadeStart)));

      //if (heroPhoto) {
       // heroPhoto.style.opacity = 1 - progress;
      //}
      if (heroBgName) {
        heroBgName.style.opacity = progress * 0.06;
      }
    }, { passive: true });
  }

  // ─── Reveal on scroll ─────────────────────────────────────
  const revealEls = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        // Stagger delay based on sibling index
        const delay = entry.target.dataset.delay || 0;
        setTimeout(() => entry.target.classList.add('visible'), delay * 120);
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  revealEls.forEach((el, i) => {
    if (!el.dataset.delay) el.dataset.delay = i % 4;
    revealObserver.observe(el);
  });

  // ─── Portfolio filter ──────────────────────────────────────
  const filterBtns = document.querySelectorAll('.filter-btn');
  const portfolioItems = document.querySelectorAll('.portfolio-item');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.dataset.filter;

      portfolioItems.forEach(item => {
        if (filter === 'all' || item.dataset.category === filter) {
          item.classList.remove('hidden');
          item.style.animation = 'none';
          requestAnimationFrame(() => {
            item.style.animation = 'fadeIn 0.4s ease forwards';
          });
        } else {
          item.classList.add('hidden');
        }
      });
    });
  });

  // ─── Lightbox ─────────────────────────────────────────────
  const lightbox = document.getElementById('lightbox');
  const lightboxClose = document.getElementById('lightbox-close');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxTitle = document.getElementById('lightbox-title');
  const lightboxCategory = document.getElementById('lightbox-category');
  const lightboxDesc = document.getElementById('lightbox-desc');
  const lightboxTags = document.getElementById('lightbox-tags');

  portfolioItems.forEach(item => {
    item.addEventListener('click', () => {
      if (!lightbox) return;
      const title = item.dataset.title || 'Project';
      const category = item.dataset.category || '';
      const desc = item.dataset.desc || 'A portfolio piece showcasing creative and technical skills.';
      const tags = (item.dataset.tags || '').split(',').filter(Boolean);
      const img = item.dataset.img || '';

      if (lightboxTitle) lightboxTitle.textContent = title;
      if (lightboxCategory) lightboxCategory.textContent = category.replace('-', ' ');
      if (lightboxDesc) lightboxDesc.textContent = desc;
      if (lightboxTags) {
        lightboxTags.innerHTML = tags.map(t => `<span>${t.trim()}</span>`).join('');
      }
      if (lightboxImg) {
        if (img) { lightboxImg.src = img; lightboxImg.style.display = 'block'; }
        else { lightboxImg.style.display = 'none'; }
      }
      lightbox.classList.add('open');
      document.body.style.overflow = 'hidden';
    });
  });

  lightboxClose?.addEventListener('click', closeLightbox);
  lightbox?.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeLightbox();
  });
  function closeLightbox() {
    lightbox?.classList.remove('open');
    document.body.style.overflow = '';
  }

  // ─── Contact form ──────────────────────────────────────────
  const contactForm = document.getElementById('contact-form');
  contactForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    const success = document.getElementById('form-success');
    const btn = contactForm.querySelector('button[type="submit"]');
    btn.textContent = 'Sending…';
    btn.disabled = true;
    setTimeout(() => {
      success?.classList.add('show');
      contactForm.reset();
      btn.textContent = 'Send Message';
      btn.disabled = false;
      setTimeout(() => success?.classList.remove('show'), 5000);
    }, 1200);
  });

  // ─── Smooth page transitions ───────────────────────────────
  // Already handled by smooth-scroll on html

  // ─── Animate numbers (About page stats) ───────────────────
  const statNums = document.querySelectorAll('.stat-number[data-target]');
  const statObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.dataset.target);
        const suffix = el.dataset.suffix || '';
        let current = 0;
        const increment = target / 40;
        const timer = setInterval(() => {
          current += increment;
          if (current >= target) { current = target; clearInterval(timer); }
          el.innerHTML = Math.floor(current) + `<span>${suffix}</span>`;
        }, 35);
        statObserver.unobserve(el);
      }
    });
  }, { threshold: 0.5 });
  statNums.forEach(el => statObserver.observe(el));

});

// Fade-in keyframe for portfolio filter
const style = document.createElement('style');
style.textContent = `
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(12px); }
    to   { opacity: 1; transform: none; }
  }
`;
document.head.appendChild(style);
