/* ============================================================
   SETH DISON C. SEPE — Shared Components (nav + footer)
   ============================================================ */

(function () {
  // ─── Inject Navbar ───────────────────────────────────────
  const navHTML = `
<nav id="navbar" aria-label="Main navigation">
  <div class="container nav-inner">
    <a href="index.html" class="nav-logo">Seth<span>.</span></a>
    <ul class="nav-links" role="list">
      <li><a href="index.html">Home</a></li>
      <li><a href="pages/about.html">About</a></li>
      <li><a href="pages/services.html">Services</a></li>
      <li><a href="pages/portfolio.html">Portfolio</a></li>
      <li><a href="pages/contact.html">Contact</a></li>
    </ul>
    <button class="hamburger" aria-label="Toggle menu" aria-expanded="false">
      <span></span><span></span><span></span>
    </button>
  </div>
</nav>
<nav class="mobile-nav" aria-label="Mobile navigation">
  <a href="index.html">Home</a>
  <a href="pages/about.html">About</a>
  <a href="pages/services.html">Services</a>
  <a href="pages/portfolio.html">Portfolio</a>
  <a href="pages/contact.html">Contact</a>
</nav>`;

  // ─── Inject Footer ───────────────────────────────────────
  const footerHTML = `
<footer>
  <div class="container">
    <div class="footer-inner">
      <div class="footer-brand">
        <div class="nav-logo">Seth<span style="color:var(--red)">.</span></div>
        <p>Information Systems student and creative professional from Davao del Norte, Philippines. Exploring the intersection of art and technology.</p>
      </div>
      <div class="footer-col">
        <h5>Navigation</h5>
        <ul>
          <li><a href="index.html">Home</a></li>
          <li><a href="pages/about.html">About</a></li>
          <li><a href="pages/services.html">Services</a></li>
          <li><a href="pages/portfolio.html">Portfolio</a></li>
          <li><a href="pages/contact.html">Contact</a></li>
        </ul>
      </div>
      <div class="footer-col">
        <h5>Services</h5>
        <ul>
          <li><a href="pages/services.html">Graphic Design</a></li>
          <li><a href="pages/services.html">Photo &amp; Video Editing</a></li>
          <li><a href="pages/services.html">Web Development</a></li>
          <li><a href="pages/services.html">Documentation</a></li>
          <li><a href="pages/services.html">Photography</a></li>
        </ul>
      </div>
    </div>
    <div class="footer-bottom">
      <p>&copy; 2025 Seth Dison C. Sepe. All rights reserved.</p>
      <div class="footer-socials">
        <a href="#" aria-label="Facebook" title="Facebook">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
        </a>
        <a href="#" aria-label="LinkedIn" title="LinkedIn">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>
        </a>
        <a href="#" aria-label="GitHub" title="GitHub">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/></svg>
        </a>
      </div>
    </div>
  </div>
</footer>

<button id="scroll-top" aria-label="Scroll to top" title="Back to top">
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="18 15 12 9 6 15"/></svg>
</button>`;

  // ─── Inject on DOM ready ─────────────────────────────────
  document.addEventListener('DOMContentLoaded', () => {
    const navTarget = document.getElementById('nav-placeholder');
    const footerTarget = document.getElementById('footer-placeholder');
    if (navTarget) navTarget.outerHTML = navHTML;
    if (footerTarget) footerTarget.outerHTML = footerHTML;

    // Fix nav links for pages in /pages/ subfolder
    const inSubfolder = window.location.pathname.includes('/pages/');
    if (inSubfolder) {
      document.querySelectorAll('#navbar a, .mobile-nav a, footer a').forEach(a => {
        const href = a.getAttribute('href');
        if (href && !href.startsWith('#') && !href.startsWith('http') && !href.startsWith('../')) {
          if (href.startsWith('index.html')) {
            a.setAttribute('href', '../' + href);
          } else if (href.startsWith('pages/')) {
            a.setAttribute('href', href.replace('pages/', ''));
          }
        }
      });
    }
  });
})();
