# Aula de Robótica — 8 LEDs controlados por um potenciômetro

Material didático completo para uma aula de robótica iniciante com metodologia
**PBL (Aprendizagem Baseada em Problemas)**. O desafio do dia: **acender 8 LEDs
progressivamente girando um potenciômetro**, usando um Arduino Uno.

Todo o conteúdo está em **português do Brasil (pt-BR)**.

---

## 📦 O que tem neste pacote

| Arquivo | O que é |
|---|---|
| `index.html` | **Slides da aula** (apresentação para projetar). Abre no navegador. |
| `styles.css` | Estilo visual dos slides. |
| `script.js` | Navegação dos slides (setas, toque, barra de progresso). |
| `roteiro-professor.md` | **Roteiro do professor**: o que falar, o que os alunos fazem, pausas, intervenções. |
| `dever-casa-robotica.html` | Versão imprimível do **dever de casa** (origem do PDF). |
| `dever-casa-robotica.pdf` | **Dever de casa** pronto para imprimir (frente e verso, 2 páginas, fonte 16). |
| `gabarito-dever-casa.md` | **Gabarito** do dever de casa (somente professor). |

> Os PDFs e materiais de referência originais (`material1.txt`, `material2.txt`,
> e os `.pdf` da oficina) foram **mantidos** e serviram de base para o conteúdo.

---

## ▶️ Como abrir os slides

1. Dê um duplo clique em **`index.html`** (abre no navegador padrão), **ou**
2. Clique com o botão direito → "Abrir com" → seu navegador.

**Navegação:**
- Setas **← →** do teclado, ou botões **Anterior / Próximo** na barra inferior.
- **Barra de espaço** avança; **Home/End** vão ao primeiro/último slide.
- **F** entra/sai da tela cheia (ideal para projetar).
- No celular/tablet: **deslize** o dedo para os lados.

Não precisa de internet nem de instalar nada — funciona offline.

---

## 🖨️ Como usar / imprimir o dever de casa

O arquivo **`dever-casa-robotica.pdf`** já está pronto:

1. Abra o PDF e mande imprimir.
2. Configure a impressão como **frente e verso** (duplex) — são **2 páginas**.
3. Fonte tamanho **16**, pensada para alunos iniciantes.

### Quer editar e gerar o PDF de novo?
Edite `dever-casa-robotica.html` e rode (Google Chrome instalado):

```bash
google-chrome --headless --disable-gpu --no-pdf-header-footer \
  --print-to-pdf="dever-casa-robotica.pdf" "dever-casa-robotica.html"
```

Sem o Chrome pela linha de comando, dá para abrir o `.html` no navegador e usar
**Imprimir → Salvar como PDF** (escolha papel A4 e margens padrão).

---

## 🧑‍🏫 Sequência sugerida da aula

Use o **`roteiro-professor.md`** junto com os slides. Resumo dos blocos:

1. Acolhimento e apresentação do problema (slides 1–3)
2. Revisão de eletrônica: LED, resistor, corrente, tensão, GND (slides 4–7)
3. Conhecendo o Arduino Uno: pinos, entrada/saída, digital/analógico (slides 8–10)
4. Componente novo: o potenciômetro (slides 11–14)
5. Conceitos de programação (slides 15–19)
6. Mãos à obra: montar o circuito e programar (slides 20–24)
7. Depuração de erros comuns (slide 25)
8. Reflexão final e fechamento (slides 26–27)

---

## 🔌 Resumo do circuito

- **8 LEDs** (com 1 resistor de 220–330 Ω cada) nos **pinos digitais 2 a 9**.
- Lado negativo de todos os LEDs no **GND**.
- **Potenciômetro:** laterais no **5V** e **GND**; terminal do **meio** no **A0**.

O código completo e comentado está no **slide 24** dos slides (`index.html`).

---

## ✅ Vocabulário reforçado na aula
entrada · saída · analógico · digital · corrente · tensão · GND · variável ·
repetição · leitura · controle
