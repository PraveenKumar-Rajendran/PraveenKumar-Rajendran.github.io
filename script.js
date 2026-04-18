/* ============================================
   PRAVEEN KUMAR RAJENDRAN — PORTFOLIO
   script.js
   ============================================ */

/* ── Nav scroll shadow ── */
const nav = document.querySelector('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 20);
  highlightNav();
}, { passive: true });

/* ── Mobile nav toggle ── */
const navToggle = document.querySelector('.nav-toggle');
const navLinks  = document.querySelector('.nav-links');
navToggle?.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});
navLinks?.addEventListener('click', (e) => {
  if (e.target.tagName === 'A') navLinks.classList.remove('open');
});

/* ── Active nav highlight on scroll ── */
const sections = document.querySelectorAll('section[id]');
function highlightNav() {
  const scrollY = window.scrollY + 80;
  sections.forEach(sec => {
    const top    = sec.offsetTop;
    const bottom = top + sec.offsetHeight;
    const link   = document.querySelector(`.nav-links a[href="#${sec.id}"]`);
    if (link) link.classList.toggle('active', scrollY >= top && scrollY < bottom);
  });
}

/* ── Scroll reveal ── */
const revealEls = document.querySelectorAll('.reveal');
const revealObs = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      revealObs.unobserve(e.target);
    }
  });
}, { threshold: 0.08 });
revealEls.forEach(el => revealObs.observe(el));

/* ── Staggered reveal for grid items ── */
const staggerParents = document.querySelectorAll('[data-stagger]');
const staggerObs = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      Array.from(e.target.children).forEach((child, i) => {
        child.style.transitionDelay = `${i * 60}ms`;
        child.classList.add('visible');
      });
      staggerObs.unobserve(e.target);
    }
  });
}, { threshold: 0.05 });
staggerParents.forEach(p => {
  Array.from(p.children).forEach(c => c.classList.add('reveal'));
  staggerObs.observe(p);
});

/* ── Experience timeline expand/collapse ── */
document.querySelectorAll('.timeline-header').forEach(header => {
  header.addEventListener('click', () => {
    const item = header.closest('.timeline-item');
    const wasOpen = item.classList.contains('open');
    // Close all
    document.querySelectorAll('.timeline-item.open').forEach(i => i.classList.remove('open'));
    // Open clicked if it was closed
    if (!wasOpen) item.classList.add('open');
  });
});
// Open first one by default
document.querySelector('.timeline-item')?.classList.add('open');

/* ── Education expand/collapse ── */
document.querySelectorAll('.edu-expandable').forEach(card => {
  card.querySelector('.edu-expand-header')?.addEventListener('click', () => {
    card.classList.toggle('open');
  });
});
// Open first expandable by default
document.querySelector('.edu-expandable')?.classList.add('open');

/* ── Project filter ── */
const filterTabs  = document.querySelectorAll('.filter-tab');
const projectCards = document.querySelectorAll('.project-card');

filterTabs.forEach(tab => {
  tab.addEventListener('click', () => {
    filterTabs.forEach(t => t.classList.remove('active'));
    tab.classList.add('active');

    const filter = tab.dataset.filter;
    projectCards.forEach(card => {
      const show = filter === 'all' || card.dataset.category === filter;
      card.classList.toggle('hidden', !show);
    });
  });
});
