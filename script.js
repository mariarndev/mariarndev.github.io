// ==== Alternar modo claro / oscuro ====
const toggleBtn = document.getElementById("theme-toggle");
toggleBtn.addEventListener("click", () => {
  document.body.classList.toggle("light-mode");
  localStorage.setItem("theme", document.body.classList.contains("light-mode") ? "light" : "dark");
});

// Guardar tema preferido
window.addEventListener("load", () => {
  const theme = localStorage.getItem("theme");
  if (theme === "light") document.body.classList.add("light-mode");
});

// ==== Tabs del portfolio (básico) ====
const tabs = document.querySelectorAll(".tab");
const cards = document.querySelectorAll(".project-card");

tabs.forEach(tab => {
  tab.addEventListener("click", () => {
    tabs.forEach(t => t.classList.remove("active"));
    tab.classList.add("active");
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