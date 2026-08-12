document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".nav");
  if (toggle && nav) {
    toggle.addEventListener("click", () => {
      const open = nav.classList.toggle("open");
      toggle.setAttribute("aria-expanded", String(open));
    });
  }

  const carousel = document.querySelector("[data-carousel]");
  if (!carousel) return;

  const slides = [...carousel.querySelectorAll(".slide")];
  const dots = carousel.querySelector(".dots");
  const prev = carousel.querySelector(".prev");
  const next = carousel.querySelector(".next");
  let current = 0;
  let timer;

  slides.forEach((_, index) => {
    const dot = document.createElement("button");
    dot.className = "dot" + (index === 0 ? " active" : "");
    dot.setAttribute("aria-label", `Ir para slide ${index + 1}`);
    dot.addEventListener("click", () => show(index));
    dots.appendChild(dot);
  });

  function show(index) {
    current = (index + slides.length) % slides.length;
    slides.forEach((slide, i) => slide.classList.toggle("is-active", i === current));
    [...dots.children].forEach((dot, i) => dot.classList.toggle("active", i === current));
    restart();
  }
  function restart() {
    clearInterval(timer);
    timer = setInterval(() => show(current + 1), 5500);
  }
  prev.addEventListener("click", () => show(current - 1));
  next.addEventListener("click", () => show(current + 1));
  restart();
});
