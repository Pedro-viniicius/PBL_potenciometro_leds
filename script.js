/* =========================================================================
   Navegação dos slides — Aula de Robótica (8 LEDs + potenciômetro)
   ========================================================================= */
(function () {
  "use strict";

  var slides = Array.prototype.slice.call(document.querySelectorAll(".slide"));
  var atual = 0;

  var elAtual = document.getElementById("atual");
  var elTotal = document.getElementById("total");
  var elTitulo = document.getElementById("tituloSlide");
  var elProgresso = document.getElementById("progresso");
  var btnPrev = document.getElementById("btnPrev");
  var btnNext = document.getElementById("btnNext");

  elTotal.textContent = slides.length;

  function mostrar(indice) {
    atual = Math.max(0, Math.min(indice, slides.length - 1));

    slides.forEach(function (s, i) {
      s.classList.toggle("ativo", i === atual);
    });

    // rola o slide ativo para o topo
    slides[atual].scrollTop = 0;

    elAtual.textContent = atual + 1;
    elTitulo.textContent = slides[atual].getAttribute("data-titulo") || "";
    elProgresso.style.width = ((atual + 1) / slides.length * 100) + "%";

    btnPrev.disabled = atual === 0;
    btnNext.disabled = atual === slides.length - 1;

    // guarda a posição na URL (#3) para recarregar no mesmo slide
    history.replaceState(null, "", "#" + (atual + 1));
  }

  function proximo() { mostrar(atual + 1); }
  function anterior() { mostrar(atual - 1); }

  btnNext.addEventListener("click", proximo);
  btnPrev.addEventListener("click", anterior);

  // teclado: setas, espaço, Home/End, F (tela cheia)
  document.addEventListener("keydown", function (e) {
    switch (e.key) {
      case "ArrowRight":
      case "PageDown":
      case " ":
        e.preventDefault(); proximo(); break;
      case "ArrowLeft":
      case "PageUp":
        e.preventDefault(); anterior(); break;
      case "Home":
        e.preventDefault(); mostrar(0); break;
      case "End":
        e.preventDefault(); mostrar(slides.length - 1); break;
      case "f":
      case "F":
        if (document.fullscreenElement) document.exitFullscreen();
        else document.documentElement.requestFullscreen();
        break;
    }
  });

  // navegação por toque (celular/tablet)
  var xInicio = null;
  document.addEventListener("touchstart", function (e) { xInicio = e.touches[0].clientX; }, { passive: true });
  document.addEventListener("touchend", function (e) {
    if (xInicio === null) return;
    var dx = e.changedTouches[0].clientX - xInicio;
    if (Math.abs(dx) > 60) { dx < 0 ? proximo() : anterior(); }
    xInicio = null;
  }, { passive: true });

  // abrir direto no slide indicado pela URL (#5)
  var inicio = parseInt((location.hash || "").replace("#", ""), 10);
  mostrar(isNaN(inicio) ? 0 : inicio - 1);
})();
