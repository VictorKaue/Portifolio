const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 50);
  updateActiveNav();
  toggleBackToTop();
});
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');
hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => navLinks.classList.remove('open'));
});
function updateActiveNav() {
  const sections = document.querySelectorAll('section[id]');
  let current = '';
  sections.forEach(sec => {
    if (window.scrollY >= sec.offsetTop - 120) current = sec.id;
  });
  document.querySelectorAll('.nav-link').forEach(link => {
    link.classList.toggle('active', link.getAttribute('href') === '#' + current);
  });
}
const roles = ['Engenheiro de Dados', 'Desenvolvedor iOS', 'Entusiasta de Dados', 'Solucionador de Problemas'];
let roleIndex = 0, charIndex = 0, isDeleting = false;
const roleText = document.getElementById('role-text');
function type() {
  const current = roles[roleIndex];
  if (isDeleting) {
    roleText.textContent = current.substring(0, charIndex--);
    if (charIndex < 0) { isDeleting = false; roleIndex = (roleIndex + 1) % roles.length; setTimeout(type, 500); return; }
  } else {
    roleText.textContent = current.substring(0, ++charIndex);
    if (charIndex === current.length) { isDeleting = true; setTimeout(type, 1800); return; }
  }
  setTimeout(type, isDeleting ? 60 : 100);
}
setTimeout(type, 800);
const reveals = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('visible'), i * 80);
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });
reveals.forEach(el => observer.observe(el));
document.querySelectorAll('.tab-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const tab = btn.dataset.tab;
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
    btn.classList.add('active');
    const content = document.getElementById('tab-content-' + tab);
    content.classList.add('active');
    content.querySelectorAll('.reveal').forEach(el => {
      el.classList.remove('visible');
      setTimeout(() => el.classList.add('visible'), 100);
    });
  });
});
const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');
filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const filter = btn.dataset.filter;
    projectCards.forEach(card => {
      const cats = card.dataset.category || '';
      const show = filter === 'all' || cats.includes(filter);
      card.classList.toggle('hidden', !show);
    });
  });
});
const form = document.getElementById('contact-form');
form.addEventListener('submit', (e) => {
  e.preventDefault();
  let valid = true;
  ['name', 'email', 'message'].forEach(field => {
    document.getElementById(field).classList.remove('error');
    document.getElementById(field + '-error').textContent = '';
  });
  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const message = document.getElementById('message').value.trim();
  if (!name) { setError('name', 'Nome é obrigatório.'); valid = false; }
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { setError('email', 'Insira um e-mail válido.'); valid = false; }
  if (!message) { setError('message', 'Mensagem é obrigatória.'); valid = false; }
  if (!valid) return;
  const btnText = document.getElementById('btn-text');
  const btnLoading = document.getElementById('btn-loading');
  btnText.style.display = 'none';
  btnLoading.style.display = 'flex';
  document.getElementById('submit-btn').disabled = true;
  setTimeout(() => {
    btnText.style.display = 'flex';
    btnLoading.style.display = 'none';
    document.getElementById('submit-btn').disabled = false;
    document.getElementById('form-success').style.display = 'flex';
    form.reset();
    setTimeout(() => document.getElementById('form-success').style.display = 'none', 5000);
  }, 1800);
});
function setError(field, msg) {
  document.getElementById(field).classList.add('error');
  document.getElementById(field + '-error').textContent = msg;
}
const backToTop = document.getElementById('back-to-top');
function toggleBackToTop() {
  backToTop.classList.toggle('visible', window.scrollY > 400);
}
backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
