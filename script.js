/* Heave Ventures — interactions */

// ── Nav: scroll class + hamburger ──────────────────
const nav = document.getElementById('nav');
const hamburger = document.getElementById('hamburger');
const navLinks = document.querySelector('.nav__links');

window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 20);
}, { passive: true });

hamburger.addEventListener('click', () => {
  const open = navLinks.classList.toggle('open');
  hamburger.setAttribute('aria-expanded', open);
  // animate hamburger to X
  const spans = hamburger.querySelectorAll('span');
  if (open) {
    spans[0].style.transform = 'rotate(45deg) translate(5px,5px)';
    spans[1].style.opacity   = '0';
    spans[2].style.transform = 'rotate(-45deg) translate(5px,-5px)';
  } else {
    spans[0].style.transform = '';
    spans[1].style.opacity   = '';
    spans[2].style.transform = '';
  }
});

// Close nav on link click
navLinks.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => {
    navLinks.classList.remove('open');
    const spans = hamburger.querySelectorAll('span');
    spans[0].style.transform = '';
    spans[1].style.opacity   = '';
    spans[2].style.transform = '';
  });
});

// ── Reveal on scroll ───────────────────────────────
const revealEls = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      // stagger siblings within same parent
      const siblings = Array.from(entry.target.parentElement.querySelectorAll('.reveal'));
      const idx = siblings.indexOf(entry.target);
      entry.target.style.transitionDelay = `${idx * 80}ms`;
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.12,
  rootMargin: '0px 0px -48px 0px'
});

revealEls.forEach(el => revealObserver.observe(el));

// ── Smooth active nav highlight ────────────────────
const sections = document.querySelectorAll('section[id]');
const navAnchors = document.querySelectorAll('.nav__links a[href^="#"]');

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.getAttribute('id');
      navAnchors.forEach(a => {
        a.classList.toggle('active', a.getAttribute('href') === `#${id}`);
      });
    }
  });
}, { rootMargin: '-40% 0px -55% 0px' });

sections.forEach(s => sectionObserver.observe(s));

// ── Counter animation for stats ────────────────────
function animateCounter(el, target, suffix = '') {
  const duration = 1800;
  const start = performance.now();
  const isFloat = String(target).includes('.');
  const from = 0;

  function tick(now) {
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
    // ease-out-expo
    const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
    const value = from + (target - from) * eased;
    el.textContent = isFloat ? value.toFixed(1) : Math.round(value);
    if (progress < 1) requestAnimationFrame(tick);
    else el.textContent = target;
  }
  requestAnimationFrame(tick);
}

const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const numEl = entry.target.querySelector('.stat-card__number');
      if (!numEl || numEl.dataset.animated) return;
      numEl.dataset.animated = 'true';

      // Extract the number from text content
      const raw = numEl.textContent.replace(/[^0-9.]/g, '');
      const target = parseFloat(raw);
      if (!isNaN(target)) {
        // Temporarily clear while animating
        const children = Array.from(numEl.children);
        const childText = children.map(c => c.outerHTML).join('');
        numEl.textContent = '0';
        children.forEach(c => numEl.appendChild(c));
        animateCounter(numEl, target);
      }
      statsObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('.stat-card').forEach(card => statsObserver.observe(card));

// ── Active nav link styling ────────────────────────
const style = document.createElement('style');
style.textContent = `
  .nav__links a.active:not(.nav__cta) {
    color: #ffffff;
  }
  .nav__links a.active:not(.nav__cta)::after {
    content: '';
    display: block;
    height: 2px;
    background: #4abe5c;
    border-radius: 1px;
    margin-top: 2px;
  }
`;
document.head.appendChild(style);
