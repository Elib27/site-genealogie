const nav = document.querySelector('nav');
const links = document.querySelectorAll('nav a');
const hamburger = document.querySelector('.nav-hamburger');
hamburger.addEventListener('click', () => {
  nav.classList.toggle('open');
  hamburger.classList.toggle('open');
});

links.forEach(link => {
  link.addEventListener('click', () => {
    nav.classList.remove('open');
    hamburger.classList.remove('open');
  });
});