// ==== Dark / Light mode ====
const themeToggle = document.getElementById("theme-toggle");
const userPref = localStorage.getItem("theme");

if (userPref === "light") {
  document.body.classList.add("light-mode");
  themeToggle.textContent = "☀️";
} else {
  themeToggle.textContent = "🌙";
}

themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("light-mode");
  const isLight = document.body.classList.contains("light-mode");
  themeToggle.textContent = isLight ? "☀️" : "🌙";
  localStorage.setItem("theme", isLight ? "light" : "dark");
});


// ==== Project data ====
const projects = [
  { category: "featured", title: "App Transporte Urbano", image: "images/proyecto1.jpg", link: "projects/featured.html" },
  { category: "uxui", title: "UI Dashboard Médico", image: "images/proyecto2.jpg", link: "projects/uxui.html" },
  { category: "research", title: "Estudio Accesibilidad 2024", image: "images/proyecto3.jpg", link: "projects/research.html" },
  { category: "accessibility", title: "Rediseño Inclusivo Web", image: "images/proyecto4.jpg", link: "projects/accessibility.html" },
  { category: "development", title: "Simulador Bancario", image: "images/proyecto5.jpg", link: "projects/development.html" },
  { category: "gamejams", title: "Echoes of Light", image: "images/proyecto6.jpg", link: "projects/gamejams.html" },
  { category: "college", title: "Proyecto Final Universidad", image: "images/proyecto7.jpg", link: "projects/college.html" },
  { category: "all", title: "Todos mis proyectos", image: "images/proyecto8.jpg", link: "projects/all.html" }
];

const projectsGrid = document.getElementById("projects-grid");
const tabs = document.querySelectorAll(".tab");
const showMoreBtn = document.getElementById("show-more");

let currentCategory = "featured";
let visibleCount = 6;

function renderProjects(category, reset = true) {
  if (reset) visibleCount = 6;
  projectsGrid.innerHTML = "";
  const filtered = category === "all" ? projects : projects.filter(p => p.category === category);
  filtered.slice(0, visibleCount).forEach((p, i) => {
    const card = document.createElement("a");
    card.href = p.link;
    card.className = "project-card";
    card.innerHTML = `
      <img src="${p.image}" alt="${p.title}">
      <h3>${p.title}</h3>
    `;
    projectsGrid.appendChild(card);
    setTimeout(() => card.classList.add("show"), 100 * i);
  });
  showMoreBtn.style.display = visibleCount < filtered.length ? "block" : "none";
}

showMoreBtn.addEventListener("click", () => {
  visibleCount += 3;
  renderProjects(currentCategory, false);
});

tabs.forEach(tab => {
  tab.addEventListener("click", () => {
    tabs.forEach(t => t.classList.remove("active"));
    tab.classList.add("active");
    currentCategory = tab.dataset.category;
    renderProjects(currentCategory);
  });
});

renderProjects(currentCategory);


// ==== Back to top (button) ====
const scrollBtn = document.createElement("button");
scrollBtn.innerText = "↑ Back to top";
scrollBtn.className = "back-to-top";
scrollBtn.style.display = "none";
document.body.appendChild(scrollBtn);

window.addEventListener("scroll", () => {
  scrollBtn.style.display = window.scrollY > 300 ? "block" : "none";
});

scrollBtn.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});