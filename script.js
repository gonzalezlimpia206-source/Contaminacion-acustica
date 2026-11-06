const diapositivas = document.querySelectorAll(".diapositiva");
const contador = document.querySelector("#contador");
let actual = 0;

function irA(numero) {
  actual = Math.max(0, Math.min(numero, diapositivas.length - 1));
  diapositivas[actual].scrollIntoView({ behavior: "smooth" });
}

document.addEventListener("keydown", (evento) => {
  if (["ArrowRight", "ArrowDown", "PageDown", " "].includes(evento.key)) {
    evento.preventDefault();
    irA(actual + 1);
  }

  if (["ArrowLeft", "ArrowUp", "PageUp"].includes(evento.key)) {
    evento.preventDefault();
    irA(actual - 1);
  }
});

const observador = new IntersectionObserver((entradas) => {
  entradas.forEach((entrada) => {
    if (entrada.isIntersecting) {
      actual = [...diapositivas].indexOf(entrada.target);
      contador.textContent = `${actual + 1} / ${diapositivas.length}`;
    }
  });
}, { rootMargin: "-50% 0px -50% 0px" });

diapositivas.forEach((diapositiva) => observador.observe(diapositiva));