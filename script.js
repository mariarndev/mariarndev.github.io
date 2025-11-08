document.addEventListener('DOMContentLoaded', () => {
const links = document.querySelectorAll('a[href^="#"]');
links.forEach(link => {
link.addEventListener('click', e => {
const targetId = link.getAttribute('href');
if (targetId.startsWith('#')) {
e.preventDefault();
document.querySelector(targetId)?.scrollIntoView({ behavior: 'smooth' });
}
});
});
});