/* ============================================
   MICHAEL PORTFOLIO — ULTRA EDITION JS
   ============================================ */

// === CUSTOM CURSOR ===
const cursor = document.getElementById('cursor');
const cursorFollower = document.getElementById('cursorFollower');
let mouseX = 0, mouseY = 0;
let followerX = 0, followerY = 0;

document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  cursor.style.left = mouseX + 'px';
  cursor.style.top = mouseY + 'px';
});

function animateFollower() {
  followerX += (mouseX - followerX) * 0.1;
  followerY += (mouseY - followerY) * 0.1;
  cursorFollower.style.left = followerX + 'px';
  cursorFollower.style.top = followerY + 'px';
  requestAnimationFrame(animateFollower);
}
animateFollower();

document.querySelectorAll('a, button, .skill-card, .stat-card, .project-visual, .contact-card').forEach(el => {
  el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
  el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
});

// === HERO CANVAS PARTICLE SYSTEM ===
const canvas = document.getElementById('heroCanvas');
const ctx = canvas.getContext('2d');
let particles = [];
let animFrame;

function resizeCanvas() {
  canvas.width = canvas.offsetWidth;
  canvas.height = canvas.offsetHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

class Particle {
  constructor() { this.reset(); }
  reset() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.size = Math.random() * 1.5 + 0.3;
    this.speedX = (Math.random() - 0.5) * 0.3;
    this.speedY = (Math.random() - 0.5) * 0.3;
    this.opacity = Math.random() * 0.5 + 0.1;
    this.color = Math.random() > 0.5 ? '102, 126, 234' : '0, 212, 255';
  }
  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    if (this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height) this.reset();
  }
  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(${this.color}, ${this.opacity})`;
    ctx.fill();
  }
}

// Create particles
for (let i = 0; i < 80; i++) particles.push(new Particle());

function drawConnections() {
  for (let i = 0; i < particles.length; i++) {
    for (let j = i + 1; j < particles.length; j++) {
      const dx = particles[i].x - particles[j].x;
      const dy = particles[i].y - particles[j].y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 120) {
        ctx.beginPath();
        ctx.strokeStyle = `rgba(102, 126, 234, ${0.08 * (1 - dist / 120)})`;
        ctx.lineWidth = 0.5;
        ctx.moveTo(particles[i].x, particles[i].y);
        ctx.lineTo(particles[j].x, particles[j].y);
        ctx.stroke();
      }
    }
  }
}

function animateParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach(p => { p.update(); p.draw(); });
  drawConnections();
  animFrame = requestAnimationFrame(animateParticles);
}
animateParticles();

// === TYPEWRITER EFFECT ===
const roles = ['Web Developer', 'Frontend Engineer', 'React Developer', 'UI/UX Builder', 'Problem Solver'];
let roleIndex = 0, charIndex = 0, isDeleting = false;
const roleTextEl = document.getElementById('roleText');

function typeRole() {
  const current = roles[roleIndex];
  if (isDeleting) {
    roleTextEl.textContent = current.substring(0, charIndex - 1);
    charIndex--;
    if (charIndex === 0) { isDeleting = false; roleIndex = (roleIndex + 1) % roles.length; setTimeout(typeRole, 400); return; }
  } else {
    roleTextEl.textContent = current.substring(0, charIndex + 1);
    charIndex++;
    if (charIndex === current.length) { setTimeout(() => { isDeleting = true; typeRole(); }, 2200); return; }
  }
  setTimeout(typeRole, isDeleting ? 50 : 80);
}
setTimeout(typeRole, 1200);

// === NAVBAR SCROLL ===
const navbar = document.getElementById('navbar');
const menuToggle = document.getElementById('menuToggle');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 50);
  updateActiveLink();
});

// === MOBILE MENU ===
menuToggle.addEventListener('click', () => {
  navMenu.classList.toggle('active');
  menuToggle.classList.toggle('open');
});
navLinks.forEach(link => {
  link.addEventListener('click', () => {
    navMenu.classList.remove('active');
    menuToggle.classList.remove('open');
  });
});
document.addEventListener('click', (e) => {
  if (!navMenu.contains(e.target) && !menuToggle.contains(e.target)) {
    navMenu.classList.remove('active');
    menuToggle.classList.remove('open');
  }
});

// === SMOOTH SCROLL ===
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      const navH = navbar.offsetHeight;
      window.scrollTo({ top: target.offsetTop - navH, behavior: 'smooth' });
    }
  });
});

// === ACTIVE NAV LINK ===
function updateActiveLink() {
  const sections = document.querySelectorAll('section');
  let current = '';
  sections.forEach(sec => {
    if (window.scrollY >= sec.offsetTop - 120) current = sec.getAttribute('id');
  });
  navLinks.forEach(link => {
    link.classList.toggle('active', link.getAttribute('href') === '#' + current);
  });
}
updateActiveLink();

// === INTERSECTION OBSERVER (Reveal) ===
const revealEls = document.querySelectorAll('.stat-card, .skill-card, .project-item, .contact-card, .atag, .project-info');
revealEls.forEach((el, i) => {
  el.classList.add('reveal');
  el.style.transitionDelay = `${(i % 4) * 0.07}s`;
});

const revealObs = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObs.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });
document.querySelectorAll('.reveal').forEach(el => revealObs.observe(el));

// === SKILL BARS ANIMATION ===
const skillSection = document.getElementById('skills');
const skillBarsObs = new IntersectionObserver((entries) => {
  if (entries[0].isIntersecting) {
    document.querySelectorAll('.skill-fill').forEach(bar => {
      bar.classList.add('animated');
    });
    skillBarsObs.disconnect();
  }
}, { threshold: 0.2 });
if (skillSection) skillBarsObs.observe(skillSection);

// === STAT COUNTER ANIMATION ===
function animateCounter(el, target) {
  let current = 0;
  const duration = 1800;
  const step = target / (duration / 16);
  const update = () => {
    current = Math.min(current + step, target);
    el.textContent = Math.round(current);
    if (current < target) requestAnimationFrame(update);
  };
  requestAnimationFrame(update);
}

const aboutSection = document.getElementById('about');
let counted = false;
const countObs = new IntersectionObserver((entries) => {
  if (entries[0].isIntersecting && !counted) {
    counted = true;
    document.querySelectorAll('.stat-num[data-count]').forEach(el => {
      animateCounter(el, parseInt(el.dataset.count));
    });
    countObs.disconnect();
  }
}, { threshold: 0.3 });
if (aboutSection) countObs.observe(aboutSection);

// === PARALLAX ON HERO VISUAL FRAME ===
window.addEventListener('mousemove', (e) => {
  const x = (e.clientX / window.innerWidth - 0.5) * 12;
  const y = (e.clientY / window.innerHeight - 0.5) * 12;
  const frame = document.querySelector('.visual-frame');
  if (frame) {
    frame.style.transform = `perspective(1000px) rotateY(${x}deg) rotateX(${-y}deg)`;
  }
  const badges = document.querySelectorAll('.frame-badge');
  badges.forEach((b, i) => {
    const factor = (i + 1) * 0.5;
    b.style.transform = `translate(${x * factor * 0.6}px, ${y * factor * 0.6}px)`;
  });
});

// Reset on mouse leave
document.querySelector('.hero')?.addEventListener('mouseleave', () => {
  const frame = document.querySelector('.visual-frame');
  if (frame) frame.style.transform = '';
});

// === MAGNETIC BUTTON EFFECT ===
document.querySelectorAll('.btn-primary').forEach(btn => {
  btn.addEventListener('mousemove', (e) => {
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    btn.style.transform = `translate(${x * 0.2}px, ${y * 0.25}px) translateY(-3px) scale(1.03)`;
  });
  btn.addEventListener('mouseleave', () => {
    btn.style.transform = '';
  });
});

// === PAGE LOAD ===
window.addEventListener('load', () => {
  document.body.style.opacity = '0';
  document.body.style.transition = 'opacity 0.5s ease';
  requestAnimationFrame(() => { document.body.style.opacity = '1'; });
});

// Console signature
console.log('%c✦ Michael\'s Portfolio — Ultra Edition', 'color: #00d4ff; font-family: monospace; font-size: 16px; font-weight: bold;');
console.log('%cBuilt with passion. Reach out: michaeluwa09@gmail.com', 'color: #667eea; font-size: 13px;');
