// ==UserScript==
// @name         A11Y Barrier Simulator
// @namespace    https://github.com/brunowelber/a11y-barrier-simulator
// @version      1.8
// @description  Simulates 11 accessibility barriers; Panel opens/closes with F2.
// @author       Bruno Welber
// @homepageURL  https://github.com/brunowelber/a11y-barrier-simulator
// @supportURL   https://github.com/brunowelber/a11y-barrier-simulator/issues
// @match        *://*/*
// @run-at       document-end
// @grant        GM_addStyle
// @downloadURL  https://raw.githubusercontent.com/brunowelber/a11y-barrier-simulator/main/a11y-barrier-simulator.user.js
// @updateURL    https://raw.githubusercontent.com/brunowelber/a11y-barrier-simulator/main/a11y-barrier-simulator.user.js
// @license      MIT
// @noframes
// ==/UserScript==

(() => {
  /* ---------- Recursos ---------- */
  const features = [
    "textSmall",
    "fancyFonts",
    "lowContrast",
    "grayScale",
    "deuteranopia",
    "brightWhite",
    "justified",
    "cramped",
    "flicker",
    "spin",
    "tinyIcons",
  ];

  /* Rótulos em português + habilidade afetada */
  const ptLabels = {
    textSmall: "Texto pequeno (Baixa visão)",
    fancyFonts: "Fontes decorativas (Dislexia)",
    lowContrast: "Baixo contraste (Visão subnormal)",
    grayScale: "Escala de cinza (Dependência de cor)",
    deuteranopia: "Deuteranopia (Daltonismo vermelho-verde)",
    brightWhite: "Fundo branco intenso (Fotossensibilidade)",
    justified: "Texto justificado (Fluxo de leitura)",
    cramped: "Espaçamento apertado (Dificuldade leitura)",
    flicker: "Piscando > 3 Hz (Epilepsia fotossensível)",
    spin: "Animação girando (TEA e TDAH)",
    tinyIcons: "Ícones minúsculos (Cordenação motora)",
  };

  /* ---------- CSS ---------- */
  const rules = {
    textSmall: `
      html.a11y-textSmall, body.a11y-textSmall {font-size:10px!important;}
      body.a11y-textSmall *:not(#a11y-panel):not(#a11y-panel *){font-size:.625rem!important;line-height:1.1!important;}
    `,
    fancyFonts: `body.a11y-fancyFonts *:not(#a11y-panel):not(#a11y-panel *){font-family:"Brush Script MT","Times New Roman",serif!important;}`,
    lowContrast: `
      body.a11y-lowContrast{background:#eeeeee!important;background-image:none!important;}
      body.a11y-lowContrast *:not(img):not(svg):not(video):not(canvas):not(#a11y-panel):not(#a11y-panel *){color:#cccccc!important;border-color:#dddddd!important;text-shadow:none!important;}
      body.a11y-lowContrast a{color:#c8c8c8!important;}
      body.a11y-lowContrast img:not(#a11y-panel img){filter:contrast(65%) opacity(75%) brightness(105%)!important;}
    `,
    grayScale: `body.a11y-grayScale{filter:grayscale(100%)!important;}`,
    deuteranopia: `body.a11y-deuteranopia{filter:url(#a11y-filter-deuteranopia)!important;}`,
    brightWhite: `
      body.a11y-brightWhite{background:#ffffff!important;background-image:none!important;}
      body.a11y-brightWhite *:not(#a11y-panel):not(#a11y-panel *):not(img):not(svg):not(video){background-color:transparent!important;}
      body.a11y-brightWhite::after{content:"";position:fixed;inset:0;background:rgba(255,255,255,.1);pointer-events:none;z-index:999998;}
    `,
    justified: `body.a11y-justified p, body.a11y-justified li{ text-align:justify!important;text-justify:inter-word!important;hyphens:none!important;}`,
    cramped: `body.a11y-cramped *:not(#a11y-panel):not(#a11y-panel *){letter-spacing:-.05em!important;word-spacing:-.2em!important;line-height:1!important;}`,
    flicker: `
      @keyframes a11y-flicker{0%,49%{opacity:0}50%,100%{opacity:.3}}
      body.a11y-flicker::before{content:"";position:fixed;inset:0;background:#444;animation:a11y-flicker .33s steps(1,end) infinite!important;pointer-events:none;z-index:999990;}
    `,
    spin: `
      @keyframes a11y-spin{to{transform:rotate(360deg)}}
      body.a11y-spin img:not(#a11y-panel img),
      body.a11y-spin button:not(#a11y-panel button),
      body.a11y-spin [class*="icon"]:not(#a11y-panel [class*="icon"]){
        animation:a11y-spin 1.5s linear infinite!important;
      }
    `,
    tinyIcons: `
      body.a11y-tinyIcons img:not(#a11y-panel img),
      body.a11y-tinyIcons svg:not(#a11y-panel svg),
      body.a11y-tinyIcons i[class*="icon"]:not(#a11y-panel i){
        transform:scale(.55)!important;filter:blur(.7px)!important;opacity:.65!important;
      }
    `,
  };

  GM_addStyle(Object.values(rules).join("\n"));

  /* ---------- Filtro para deuteranopia ---------- */
  if (!document.getElementById("a11y-filter-deuteranopia")) {
    const holder = document.createElement("div");
    holder.style.display = "none";
    holder.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg">
        <filter id="a11y-filter-deuteranopia">
          <feColorMatrix type="matrix"
            values="0.625 0.375 0 0 0
                    0.70  0.30  0 0 0
                    0     0.30  0.70 0 0
                    0     0     0    1 0"/>
        </filter>
      </svg>`;
    document.documentElement.appendChild(holder);
  }

  /* ---------- Estado ---------- */
  const state = Object.fromEntries(features.map((f) => [f, false]));
  const checkboxMap = {};

  /* ---------- Painel ---------- */
  const panel = document.createElement("div");
  panel.id = "a11y-panel";
  panel.hidden = true;
  panel.style.cssText = `
    position:fixed;bottom:10px;right:10px;z-index:2147483647;
    background:#f8f9fa;color:#212529;border:1px solid #dee2e6;padding:15px;
    font:12px/1.5 Arial,sans-serif;border-radius:6px;box-shadow:0 4px 11px rgba(0,0,0,.15);
    max-height:calc(100vh - 20px);overflow-y:auto;width:240px;`;
  panel.innerHTML =
    '<h3 style="margin:0 0 12px;font-size:14px;border-bottom:1px solid #e9ecef;padding-bottom:8px;">Simulador A11Y <small>(F2)</small></h3>';
  document.body.appendChild(panel);

  /* ---------- Gera lista ---------- */
  features.forEach((f) => {
    const id = "cb-" + f;
    const label = document.createElement("label");
    label.style.cssText = "display:block;margin-bottom:8px;cursor:pointer;";
    label.htmlFor = id;

    const cb = document.createElement("input");
    cb.type = "checkbox";
    cb.id = id;
    cb.style.marginRight = "8px";
    cb.onchange = () => toggle(f);
    checkboxMap[f] = cb;

    label.appendChild(cb);
    label.appendChild(document.createTextNode(ptLabels[f]));
    panel.appendChild(label);
  });

  /* ---------- Avisos ---------- */
  const flickerWarn = document.createElement("div");
  flickerWarn.hidden = true;
  flickerWarn.style.cssText =
    "background:#fff3cd;color:#856404;border:1px solid #ffeeba;padding:10px;margin-top:10px;font-size:10px;border-radius:4px;";
  flickerWarn.textContent =
    'Alerta: "Piscando" pode disparar fotossensibilidade.';
  panel.appendChild(flickerWarn);

  const contrastWarn = document.createElement("div");
  contrastWarn.hidden = true;
  contrastWarn.style.cssText =
    "background:#e2e3e5;color:#383d41;border:1px solid #d6d8db;padding:10px;margin-top:10px;font-size:10px;border-radius:4px;";
  contrastWarn.innerHTML =
    "<strong>Nota:</strong> o filtro de Baixo Contraste em imagens é apenas ilustrativo.";
  panel.appendChild(contrastWarn);

  /* ---------- Alterna recursos ---------- */
  function toggle(feature, force = null) {
    state[feature] = force !== null ? force : !state[feature];
    document.body.classList.toggle("a11y-" + feature, state[feature]);
    checkboxMap[feature].checked = state[feature];
    if (feature === "flicker") flickerWarn.hidden = !state[feature];
    if (feature === "lowContrast") contrastWarn.hidden = !state[feature];
  }

  /* ---------- F2 abre/fecha painel ---------- */
  document.addEventListener("keydown", (e) => {
    if (
      e.code === "F2" &&
      !["INPUT", "TEXTAREA"].includes(e.target.tagName) &&
      !e.target.isContentEditable
    ) {
      panel.hidden = !panel.hidden;
    }
  });
})();
