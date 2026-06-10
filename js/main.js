// DANCHE Training & Consultancy — site interactions

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const isTouch = window.matchMedia('(hover: none)').matches;

// ---------- Mobile navigation ----------
const navToggle = document.getElementById('nav-toggle');
const siteNav = document.getElementById('site-nav');

navToggle.addEventListener('click', () => {
  const open = siteNav.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', String(open));
});

siteNav.addEventListener('click', (e) => {
  if (e.target.tagName === 'A') {
    siteNav.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
  }
});

// ---------- Scroll reveal with stagger ----------
const revealEls = document.querySelectorAll('.reveal');

// Stagger siblings that reveal together within the same parent
const parentCounts = new Map();
revealEls.forEach((el) => {
  const parent = el.parentElement;
  const n = parentCounts.get(parent) || 0;
  el.style.setProperty('--reveal-delay', `${Math.min(n * 0.1, 0.5)}s`);
  parentCounts.set(parent, n + 1);
});

if ('IntersectionObserver' in window && !prefersReducedMotion) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );
  revealEls.forEach((el) => observer.observe(el));
} else {
  revealEls.forEach((el) => el.classList.add('visible'));
}

// ---------- Animated counters ----------
const counters = document.querySelectorAll('.counter');

function animateCounter(el) {
  const target = parseInt(el.dataset.count, 10);
  const duration = 1400;
  const start = performance.now();

  function tick(now) {
    const t = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - t, 3);
    el.textContent = Math.round(target * eased);
    if (t < 1) requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
}

if ('IntersectionObserver' in window && !prefersReducedMotion) {
  const counterObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          counterObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.6 }
  );
  counters.forEach((el) => counterObserver.observe(el));
} else {
  counters.forEach((el) => (el.textContent = el.dataset.count));
}

// ---------- Seamless marquee (duplicate track content) ----------
const marqueeTrack = document.getElementById('marquee-track');
if (marqueeTrack) {
  marqueeTrack.innerHTML += marqueeTrack.innerHTML;
}

// ---------- 3D tilt on cards ----------
if (!isTouch && !prefersReducedMotion) {
  document.querySelectorAll('.tilt').forEach((card) => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      card.style.transform = `rotateY(${x * 8}deg) rotateX(${-y * 8}deg) translateY(-4px)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });
}

// ---------- Cursor glow + orb parallax ----------
const cursorGlow = document.getElementById('cursor-glow');

if (!isTouch && !prefersReducedMotion && cursorGlow) {
  document.body.classList.add('has-cursor');
  window.addEventListener('mousemove', (e) => {
    cursorGlow.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
  });
}

const orbs = document.querySelectorAll('.orb');
if (!prefersReducedMotion && orbs.length) {
  let ticking = false;
  window.addEventListener('scroll', () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      const y = window.scrollY;
      orbs.forEach((orb) => {
        orb.style.marginTop = `${y * parseFloat(orb.dataset.speed)}px`;
      });
      ticking = false;
    });
  });
}

// ---------- Contact form ----------
// Client-side validation with a friendly confirmation.
// Wire `action` to a form backend (e.g. Netlify Forms, Formspree) to go live.
const form = document.getElementById('contact-form');
const status = document.getElementById('form-status');

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const name = form.name.value.trim();
  const email = form.email.value.trim();
  const message = form.message.value.trim();

  if (!name || !email || !message) {
    status.textContent = 'Please fill in your name, email, and message.';
    status.className = 'form-status err';
    return;
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    status.textContent = 'Please enter a valid email address.';
    status.className = 'form-status err';
    return;
  }

  status.textContent = `Thank you, ${name}! Your inquiry has been noted — we'll get back to you shortly.`;
  status.className = 'form-status ok';
  form.reset();
});

// ---------- Footer year ----------
document.getElementById('year').textContent = new Date().getFullYear();
