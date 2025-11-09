// Theme toggle + persist
(function(){
  const body = document.body;
  const toggle = document.getElementById('theme-toggle');
  const stored = localStorage.getItem('site-theme');
  if(stored === 'light'){ body.classList.add('theme-light'); toggle.setAttribute('aria-pressed','true') }
  else { body.classList.remove('theme-light'); toggle.setAttribute('aria-pressed','false') }

  toggle.addEventListener('click', () => {
    const isLight = body.classList.toggle('theme-light');
    toggle.setAttribute('aria-pressed', String(isLight));
    localStorage.setItem('site-theme', isLight ? 'light' : 'dark');
  });
})();

// Tabs and filtering projects (accessible)
(function(){
  const tabContainer = document.querySelector('.tabs');
  const tabs = Array.from(tabContainer.querySelectorAll('[role="tab"]'));
  const grid = document.getElementById('projects');
  const cards = Array.from(grid.querySelectorAll('.project-card'));

  function setFilter(filter){
    tabs.forEach(t => {
      const isActive = t.dataset.filter === filter;
      t.setAttribute('aria-selected', isActive ? 'true' : 'false');
      if(isActive) t.focus();
    });

    // Accessible update
    grid.setAttribute('aria-busy','true');

    // Filter logic: card data-categories contains filter
    cards.forEach(card => {
      const cats = (card.getAttribute('data-categories')||'').split(/\s+/);
      const show = (filter === 'all') || cats.includes(filter);
      card.style.display = show ? '' : 'none';
    });

    grid.setAttribute('aria-busy','false');
  }

  // Click / keyboard on tabs
  tabs.forEach(t => {
    t.addEventListener('click', () => setFilter(t.dataset.filter));
    t.addEventListener('keydown', (e) => {
      const idx = tabs.indexOf(t);
      if(e.key === 'ArrowRight') { tabs[(idx+1)%tabs.length].click(); e.preventDefault(); }
      if(e.key === 'ArrowLeft') { tabs[(idx-1+tabs.length)%tabs.length].click(); e.preventDefault(); }
    });
  });

  // Initialize
  setFilter('all');

  // Make project-cards keyboard-activable (Enter opens link)
  cards.forEach(card => {
    card.addEventListener('keydown', (e) => {
      if(e.key === 'Enter' || e.key === ' ') {
        const link = card.querySelector('.project-link');
        if(link) link.click();
      }
    });
  });
})();

// Set current year in footer
document.addEventListener('DOMContentLoaded', () => {
  const y = new Date().getFullYear();
  const el = document.getElementById('year');
  if(el) el.textContent = y;
});