/* =========================================================================
   Navegação dos slides — Aula de Robótica (8 LEDs + potenciômetro)

   IMPORTANTE: todos os slides ficam VISÍVEIS o tempo todo (basta rolar a
   página). Este script é só um BÔNUS: barra de progresso, contador, botões
   Anterior/Próximo e setas do teclado. Se o JavaScript não rodar, a aula
   continua 100% acessível rolando a página.
   ========================================================================= */
(function () {
  "use strict";

  var slides = Array.prototype.slice.call(document.querySelectorAll(".slide"));
  if (!slides.length) return;

  var elAtual = document.getElementById("atual");
  var elTotal = document.getElementById("total");
  var elTitulo = document.getElementById("tituloSlide");
  var elProgresso = document.getElementById("progresso");
  var btnPrev = document.getElementById("btnPrev");
  var btnNext = document.getElementById("btnNext");

  var atual = 0;
  if (elTotal) elTotal.textContent = slides.length;

  // -- rola suavemente até um slide --
  function irPara(indice) {
    indice = Math.max(0, Math.min(indice, slides.length - 1));
    slides[indice].scrollIntoView({ behavior: "smooth", block: "start" });
  }

  // -- atualiza contador / título / progresso / realce --
  function atualizarPainel(indice) {
    atual = indice;
    slides.forEach(function (s, i) { s.classList.toggle("ativo", i === indice); });
    if (elAtual) elAtual.textContent = indice + 1;
    if (elTitulo) elTitulo.textContent = slides[indice].getAttribute("data-titulo") || "";
    if (elProgresso) elProgresso.style.width = ((indice + 1) / slides.length * 100) + "%";
    if (btnPrev) btnPrev.disabled = indice === 0;
    if (btnNext) btnNext.disabled = indice === slides.length - 1;
  }

  // -- descobre qual slide está em foco usando IntersectionObserver --
  if ("IntersectionObserver" in window) {
    var obs = new IntersectionObserver(function (entradas) {
      entradas.forEach(function (e) {
        if (e.isIntersecting) {
          var i = slides.indexOf(e.target);
          if (i >= 0) atualizarPainel(i);
        }
      });
    }, { threshold: 0.55 });
    slides.forEach(function (s) { obs.observe(s); });
  }

  // -- reforço: também detecta o slide em foco pela posição da rolagem
  //    (garante que o contador e a barra de progresso nunca fiquem presos) --
  var emEspera = false;
  function aoRolar() {
    if (emEspera) return;
    emEspera = true;
    requestAnimationFrame(function () {
      emEspera = false;
      var meio = window.innerHeight / 2;
      var melhor = 0, menorDist = Infinity;
      for (var i = 0; i < slides.length; i++) {
        var r = slides[i].getBoundingClientRect();
        var centro = r.top + r.height / 2;
        var dist = Math.abs(centro - meio);
        if (dist < menorDist) { menorDist = dist; melhor = i; }
      }
      if (melhor !== atual) atualizarPainel(melhor);
    });
  }
  window.addEventListener("scroll", aoRolar, { passive: true });

  // -- botões --
  if (btnNext) btnNext.addEventListener("click", function () { irPara(atual + 1); });
  if (btnPrev) btnPrev.addEventListener("click", function () { irPara(atual - 1); });

  // -- teclado: setas, espaço, Home/End, F (tela cheia) --
  document.addEventListener("keydown", function (e) {
    switch (e.key) {
      case "ArrowRight":
      case "ArrowDown":
      case "PageDown":
        e.preventDefault(); irPara(atual + 1); break;
      case "ArrowLeft":
      case "ArrowUp":
      case "PageUp":
        e.preventDefault(); irPara(atual - 1); break;
      case "Home":
        e.preventDefault(); irPara(0); break;
      case "End":
        e.preventDefault(); irPara(slides.length - 1); break;
      case "f":
      case "F":
        if (document.fullscreenElement) document.exitFullscreen();
        else if (document.documentElement.requestFullscreen) document.documentElement.requestFullscreen();
        break;
    }
  });

  // -- estado inicial --
  atualizarPainel(0);

  // -- se a URL tiver #5, rola até aquele slide ao abrir --
  var inicio = parseInt((location.hash || "").replace("#", ""), 10);
  if (!isNaN(inicio) && inicio >= 1 && inicio <= slides.length) {
    setTimeout(function () { irPara(inicio - 1); }, 120);
  }
})();
