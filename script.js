// ==== Alternar modo claro / oscuro ====
const toggleBtn = document.getElementById("theme-toggle");
toggleBtn.addEventListener("click", () => {
  document.body.classList.toggle("light-mode");
  localStorage.setItem("theme", document.body.classList.contains("light-mode") ? "light" : "dark");
});

window.addEventListener("load", () => {
  const theme = localStorage.getItem("theme");
  if (theme === "light") document.body.classList.add("light-mode");
});

// ==== Datos de proyectos ====
const projects = [
  { category: "featured", title: "Rediseño App de Transporte", image: "images/proyecto1.jpg", link: "projects/featured.html" },
  { category: "uxui", title: "Juego 2D en Unity", image: "images/proyecto2.jpg", link: "projects/uxui.html" },
  { category: "research", title: "Investigación sobre Accesibilidad Web", image: "images/proyecto4.jpg", link: "projects/research.html" },
  { category: "accessibility", title: "Mejoras de Accesibilidad en Apps Educativas", image: "images/proyecto5.jpg", link: "projects/accessibility.html" },
  { category: "development", title: "Simulador Bancario en Python", image: "images/proyecto3.jpg", link: "projects/development.html" },
  { category: "gamejams", title: "Game Jam: Echoes of Light", image: "images/proyecto6.jpg", link: "projects/gamejams.html" },
  { category: "college", title: "Proyecto Final Universitario", image: "images/proyecto7.jpg", link: "projects/college.html" },
  { category: "all", title: "Todos los proyectos", image: "images/proyecto8.jpg", link: "projects/all.html" }
];

// ==== Renderizar proyectos ====
const projectsGrid = document.getElementById("projects-grid");
const tabs = document.querySelectorAll(".tab");

function renderProjects(filter) {
  projectsGrid.innerHTML = "";
  const filtered = filter === "all" ? projects : projects.filter(p => p.category === filter);
  filtered.forEach((p, i) => {
    const card = document.createElement("a");
    card.href = p.link;
    card.className = "project-card";
    card.innerHTML = `
      <img src="${p.image}" alt="${p.title}">
      <h3>${p.title}</h3>
    `;
    projectsGrid.appendChild(card);

    // Efecto de aparición escalonado
    setTimeout(() => card.classList.add("show"), 100 * i);
  });
}

// Mostrar "Featured" por defecto
renderProjects("featured");

// ==== Navegación de tabs ====
tabs.forEach(tab => {
  tab.addEventListener("click", () => {
    tabs.forEach(t => t.classList.remove("active"));
    tab.classList.add("active");
    const category = tab.dataset.category;
    renderProjects(category);
  });
});

// ==== Botón volver arriba ====
const scrollBtn = document.createElement("button");
scrollBtn.innerText = "↑ Volver arriba";
scrollBtn.className = "back-to-top";
scrollBtn.style.display = "none";
document.body.appendChild(scrollBtn);

window.addEventListener("scroll", () => {
  scrollBtn.style.display = window.scrollY > 300 ? "block" : "none";
});

scrollBtn.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});