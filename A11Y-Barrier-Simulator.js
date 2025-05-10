// ==UserScript==
// @name         A11Y Barrier Simulator
// @namespace    https://github.com/brunowelber/a11y-barrier-simulator
// @version      1.1
// @description  Call and turn off 11+ accessibility barriers for quick testing, with warning for complex simulations.
// @author       Bruno Welber
// @homepageURL  https://github.com/brunowelber/a11y-barrier-simulator
// @supportURL   https://github.com/brunowelber/a11y-barrier-simulator/issues
// @match        *://*/*
// @run-at       document-end
// @grant        GM_addStyle
// @downloadURL  https://raw.githubusercontent.com/brunowelber/a11y-barrier-simulator/main/A11Y-Barrier-Simulator.js
// @updateURL    https://raw.githubusercontent.com/brunowelber/a11y-barrier-simulator/main/A11Y-Barrier-Simulator.js
// @license MIT
// ==/UserScript==

(() => {
  /* ---------- Config ---------- */
  const order = [
    'textSmall','fancyFonts','lowContrast','grayScale','deuteranopia',
    'brightWhite','justified','cramped','flicker','spin','tinyIcons'
  ];
  const keyMap = '1234567890-=';      // Alt+Shift+1 .. Alt+Shift+=
  const panelHotkey = '0';            // Alt+Shift+0 mostra/oculta painel
  /* ---------- CSS ---------- */
  const rules = {
    textSmall: `
      body.a11y-textSmall html{font-size:10px!important;}
      body.a11y-textSmall *:not(#a11y-panel):not(#a11y-panel *),
      body.a11y-textSmall *::before:not(#a11y-panel):not(#a11y-panel *),
      body.a11y-textSmall *::after:not(#a11y-panel):not(#a11y-panel *){font-size:.625rem!important;line-height:1.1!important;}
    `,
    fancyFonts: `
      body.a11y-fancyFonts *:not(#a11y-panel):not(#a11y-panel *){font-family:"Brush Script MT","Times New Roman",serif!important;}
    `,
    lowContrast: `
      /* Força um fundo de página claro e texto com cor similar */
      body.a11y-lowContrast {
        background-color: #EEEEEE !important; /* Fundo da página cinza claro */
        background-image: none !important;
      }
      body.a11y-lowContrast *:not(img):not(svg):not(video):not(canvas):not(#a11y-panel):not(#a11y-panel *) {
        color: #CCCCCC !important; /* Cor do texto muito próxima do fundo #EEEEEE */
        border-color: #DDDDDD !important; /* Bordas também com baixo contraste */
        text-shadow: none !important;
        /* Não definimos background-color aqui para permitir herança ou fundos específicos de elementos internos.
           O baixo contraste ocorrerá entre o texto (#CCC) e o fundo herdado (#EEE) ou o fundo original do elemento. */
      }
      body.a11y-lowContrast a:not(#a11y-panel a) {
        color: #C8C8C8 !important; /* Links com cor ligeiramente diferente, mas ainda baixo contraste */
      }
      /* Aplica filtros a imagens para sugerir perda de clareza geral */
      body.a11y-lowContrast img:not(#a11y-panel img) {
        filter: contrast(65%) opacity(75%) brightness(105%) !important;
        /*
            contrast(65%): Reduz a diferença entre áreas claras e escuras.
            opacity(75%): Torna a imagem um pouco transparente/desbotada.
            brightness(105%): Aumenta levemente o brilho, pode "lavar" algumas cores.
            A combinação visa uma imagem menos nítida e um pouco "achatada".
        */
      }
    `,
    grayScale: `
      body.a11y-grayScale{filter:grayscale(100%)!important;}
    `,
    deuteranopia: `
      body.a11y-deuteranopia{filter:url(#a11y-filter-deuteranopia)!important;}
    `,
    brightWhite: `
      body.a11y-brightWhite{background-color:#fff!important; background-image:none!important;}
      body.a11y-brightWhite *:not(#a11y-panel):not(#a11y-panel *):not(img):not(svg):not(video){background-color:transparent!important;}
      body.a11y-brightWhite::after{content:"";position:fixed;inset:0;background:rgba(255,255,255,.1);pointer-events:none;z-index:999998;}
    `,
    justified: `
      body.a11y-justified p:not(#a11y-panel p),
      body.a11y-justified li:not(#a11y-panel li),
      body.a11y-justified div:not(#a11y-panel div):not(:has(>div)):not([class*="container"]):not([class*="wrapper"]) {
        text-align:justify!important;text-justify:inter-word!important;hyphens:none!important;
      }
    `,
    cramped: `
      body.a11y-cramped *:not(#a11y-panel):not(#a11y-panel *){letter-spacing:-.05em!important;word-spacing:-.2em!important;line-height:1!important;}
    `,
    flicker: `
      @keyframes a11y-flicker-overlay {
        0%, 49% { opacity: 0; }
        50%, 100% { opacity: 0.3; }
      }
      body.a11y-flicker::before { /* Usar overlay para flicker */
        content: "";
        position: fixed;
        top: 0; left: 0;
        width: 100vw; height: 100vh;
        background-color: #444;
        pointer-events: none;
        z-index: 999990;
        animation: a11y-flicker-overlay 0.33s steps(1,end) infinite !important; /* ~3Hz */
      }
    `,
    spin: `
      @keyframes a11y-spin{to{transform:rotate(360deg)}}
      /* Aplica rotação a elementos mais específicos para evitar quebrar a página inteira */
      body.a11y-spin img:not(#a11y-panel img),
      body.a11y-spin button:not(#a11y-panel button),
      body.a11y-spin [role="button"]:not(#a11y-panel [role="button"]),
      body.a11y-spin [class*="icon"]:not(#a11y-panel [class*="icon"]) {
        animation:a11y-spin 1.5s linear infinite!important;
      }
    `,
    tinyIcons: `
      body.a11y-tinyIcons img:not(#a11y-panel img),
      body.a11y-tinyIcons svg:not(#a11y-panel svg),
      body.a11y-tinyIcons i[class*="icon"]:not(#a11y-panel i[class*="icon"]) {
        transform: scale(0.55) !important; /* Usar scale para manter proporção */
        filter:blur(.7px)!important;
        opacity:.65!important;
      }
    `
  };

  /* ---------- Inject styles & filter ---------- */
  GM_addStyle(Object.values(rules).join('\n'));

  if (!document.getElementById('a11y-filters-container')) {
    const filtersContainer = document.createElement('div');
    filtersContainer.id = 'a11y-filters-container';
    filtersContainer.style.display = 'none';
    filtersContainer.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg">
        <filter id="a11y-filter-deuteranopia">
          <feColorMatrix type="matrix"
            values="0.625 0.375 0     0 0
                    0.70  0.30  0     0 0
                    0     0.30  0.70  0 0
                    0     0     0     1 0"/>
        </filter>
      </svg>`;
    // Adicionar ao final do body, ou head se preferir. Body é mais seguro para scripts que rodam cedo.
    if (document.body) {
        document.body.appendChild(filtersContainer);
    } else {
        document.addEventListener('DOMContentLoaded', () => document.body.appendChild(filtersContainer));
    }
  }

  /* ---------- State ---------- */
  const state = Object.fromEntries(order.map(k => [k,false]));

  /* ---------- Toggle ---------- */
  function toggle(key){
    state[key]=!state[key];
    document.body.classList.toggle('a11y-'+key,state[key]);
    if(key==='flicker') flickerWarningBanner.hidden = !state.flicker;
    if(key==='lowContrast') lowContrastWarningBanner.hidden = !state.lowContrast; // Controla visibilidade do novo banner
    checkboxMap[key].checked = state[key];
  }

  /* ---------- Hotkeys ---------- */
  document.addEventListener('keydown',e=>{
    if(!e.altKey||!e.shiftKey) return;
    if(e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA' || e.target.isContentEditable) return; // Não ativar em campos de input
    
    if(e.key===panelHotkey){
        panel.hidden=!panel.hidden;
        e.preventDefault(); // Prevenir ação padrão do navegador para Alt+Shift+0 se houver
        return;
    }
    const idx=keyMap.indexOf(e.key);
    if(idx>-1 && order[idx]){ // Checa se order[idx] existe
        toggle(order[idx]);
        e.preventDefault(); // Prevenir ação padrão do navegador
    }
  });

  /* ---------- Control panel ---------- */
  const panel = document.createElement('div');
  panel.id='a11y-panel';
  panel.hidden=true; // Começa oculto por padrão
  panel.style.cssText=`
    position:fixed;bottom:10px;right:10px;z-index:2147483647; /* Max z-index */
    background:#f8f9fa;color:#212529;border:1px solid #dee2e6;padding:15px;
    font:13px/1.5 Arial,sans-serif;border-radius:6px;box-shadow:0 4px 12px rgba(0,0,0,.15);
    max-height:calc(100vh - 20px);overflow-y:auto;width:280px;
  `;
  panel.innerHTML=`<h3 style="margin-top:0;margin-bottom:12px;font-size:16px;border-bottom:1px solid #e9ecef;padding-bottom:8px;">Simulador A11Y <small>(Alt+Shift+0)</small></h3>`;
  // Adicionar ao final do body, ou head se preferir. Body é mais seguro.
    if (document.body) {
        document.body.appendChild(panel);
    } else {
        document.addEventListener('DOMContentLoaded', () => document.body.appendChild(panel));
    }


  const checkboxMap={};
  order.forEach((key,i)=>{
    const id='a11y-cb-'+key;
    const label=document.createElement('label');
    label.style.cssText='display:block;margin-bottom:8px;font-weight:normal;cursor:pointer;';
    label.htmlFor=id;
    
    const cb=document.createElement('input');
    cb.type='checkbox';cb.id=id;cb.style.marginRight='8px';cb.style.verticalAlign='middle';
    cb.onchange=()=>toggle(key);
    checkboxMap[key]=cb;
    
    label.appendChild(cb); // Prepend no original, append para ordem lógica
    label.appendChild(document.createTextNode(`${keyMap[i]?(keyMap[i] + ' – '):''}${key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}`)); // Formata nome da chave

    panel.appendChild(label);
  });

  /* ---------- Epilepsy warning (Flicker) ---------- */
  const flickerWarningBanner=document.createElement('div');
  flickerWarningBanner.hidden=true;
  flickerWarningBanner.style.cssText='background:#fff3cd;color:#856404;border:1px solid #ffeeba;padding:10px;margin-top:10px;font-size:11px;border-radius:4px;';
  flickerWarningBanner.innerHTML='<strong>Atenção (Fotossensibilidade):</strong> A simulação "Flicker" pode ser prejudicial. Use com cautela.';
  panel.appendChild(flickerWarningBanner);

  /* ---------- Low Contrast Image Simulation Warning ---------- */
  const lowContrastWarningBanner = document.createElement('div');
  lowContrastWarningBanner.hidden = true;
  lowContrastWarningBanner.style.cssText = 'background:#e2e3e5;color:#383d41;border:1px solid #d6d8db;padding:10px;margin-top:10px;font-size:11px;border-radius:4px;';
  lowContrastWarningBanner.innerHTML = '<strong>Nota (Baixo Contraste em Imagens):</strong> Filtros são aplicados a imagens para sugerir perda geral de clareza. Esta parte da simulação <em>não</em> é uma representação fiel de como o contraste se aplica a texto dentro de imagens (WCAG 1.4.5), que requer análise específica.';
  panel.appendChild(lowContrastWarningBanner);


  // Garantir que o estado inicial das checkboxes e banners seja aplicado
  // após todos os elementos do painel serem criados.
  order.forEach(key => {
    if(state[key]){ // Se o estado já era true (ex: recarregando a página e o estado foi salvo/persistido)
        document.body.classList.add('a11y-'+key);
        checkboxMap[key].checked = true;
        if(key==='flicker') flickerWarningBanner.hidden = false;
        if(key==='lowContrast') lowContrastWarningBanner.hidden = false;
    }
  });

})();