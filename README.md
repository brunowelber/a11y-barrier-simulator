# A11Y Barrier Simulator 🚀

[![License: MIT](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Userscript Install](https://img.shields.io/badge/instalar-userscript-brightgreen)](https://raw.githubusercontent.com/brunowelber/a11y-barrier-simulator/main/a11y-barrier-simulator.js)

Um **userscript** para Tampermonkey, Violentmonkey ou Greasemonkey que deixa você **ligar/desligar 11 barreiras de acessibilidade** em qualquer página, direto do navegador.  
Ideal para gerar empatia, treinar equipes e descobrir problemas de design antes que cheguem ao usuário final.


---

## 📑 Índice
- [Recursos Principais](#recursos-principais)
- [Instalação Rápida](#instalação-rápida)
- [Como Usar](#como-usar)
- [Atalhos de Teclado](#atalhos-de-teclado)
- [Detalhes das Simulações](#detalhes-das-simulações)
- [Compatibilidade](#compatibilidade)
- [Roadmap](#roadmap)
- [Contribuindo](#contribuindo)
- [Licença](#licença)

---

## Recursos Principais

| # | Barreira simulada | O que faz |
|---|-------------------|-----------|
| 1 | **text-small** | Encolhe todo o texto |
| 2 | **fancy-fonts** | Troca para fonte decorativa |
| 3 | **low-contrast** | Reduz contraste global |
| 4 | **grayscale** | Remove cores (acromatopsia) |
| 5 | **deuteranopia** | Filtro daltonismo vermelho-verde |
| 6 | **bright-white** | Fundo branco ofuscante |
| 7 | **justified** | Força texto justificado |
| 8 | **cramped** | Aperta espaçamentos |
| 9 | **flicker** | Overlay piscante a 3 Hz |
|10 | **spin** | Elementos giratórios distrativos  |
|11 | **tiny-icons** | Ícones minúsculos & borrados |

---

## Instalação Rápida

1. Instale um gerenciador de userscripts (Tampermonkey, Violentmonkey ou Greasemonkey).  
2. Clique no badge **“Instalar userscript”** no topo deste README. O script será adicionado e receberá atualizações automáticas (`@updateURL` definido).

---

## Como Usar

- **Painel flutuante:**  
  - Pressione **`Alt + Shift + 0`** para mostrar/ocultar.  
  - Marque os _checkboxes_ para ativar barreiras.  
- **Hotkeys diretas:** veja abaixo.  
- As modificações afetam apenas a aba atual e desaparecem ao recarregar.

---

## Atalhos de Teclado

| Tecla | Barreira | Observação |
|-------|----------|------------|
| Alt + Shift + 1 | text-small |
| Alt + Shift + 2 | fancy-fonts |
| Alt + Shift + 3 | low-contrast |
| Alt + Shift + 4 | grayscale |
| Alt + Shift + 5 | deuteranopia |
| Alt + Shift + 6 | bright-white |
| Alt + Shift + 7 | justified |
| Alt + Shift + 8 | cramped |
| **Alt + Shift + 9** | **flicker** ⚠️ use com extrema cautela |
| Alt + Shift + - | spin |
| Alt + Shift + = | tiny-icons |

> Atalhos são ignorados quando o foco está em campos de texto.

---

## Detalhes das Simulações

Cada item abaixo abre em bloco expansível com ➕/➖.  
Dentro há **o que é alterado**, **por que atrapalha** e **como prevenir**.

<details>
<summary><strong>text-small</strong> — texto minúsculo</summary>

- **Simula**: `font-size` global reduzido a 10 px (≈60 % menor).  
- **Impacto**: força zoom e aumenta fadiga, típico de presbiopia não corrigida.  
- **Contramedida**: use unidades relativas (`rem`, `em`), largura fluida e teste zoom 200 % sem quebra.
</details>

<details>
<summary><strong>fancy-fonts</strong> — fontes decorativas</summary>

- **Simula**: troca família para “Brush Script MT” / serif rebuscada.  
- **Impacto**: legibilidade cai, atrapalha disléxicos e OCR.  
- **Contramedida**: preferir fontes sans-serif, peso 400–700, permitir override do usuário.
</details>

<details>
<summary><strong>low-contrast</strong> — contraste insuficiente</summary>

- **Simula**: texto #777 em fundo #fff, links #aaa.  
- **Impacto**: leitura em luz ambiente forte vira “camuflagem”.  
- **Contramedida**: contraste ≥ 4.5 : 1 (WCAG 1.4.3) e tema alta-contraste opcional.
</details>

<details>
<summary><strong>grayscale</strong> — ausência total de cor</summary>

- **Simula**: `filter: grayscale(100%)`.  
- **Impacto**: testa dependência exclusiva de cor para transmitir estado.  
- **Contramedida**: rótulos, padrões, ícones e texto redundante (WCAG 1.4.1).
</details>

<details>
<summary><strong>deuteranopia</strong> — daltonismo vermelho-verde</summary>

- **Simula**: matriz de cor recalibrando canais R/G.  
- **Impacto**: verde-vermelho viram tons semelhantes; status “erro/sucesso” vira ambíguo.  
- **Contramedida**: paleta segura (azul / laranja), grafismos diferentes, alt-text descritivo.
</details>

<details>
<summary><strong>bright-white</strong> — ofuscamento</summary>

- **Simula**: fundo branco puro + overlay 10 % glare.  
- **Impacto**: desconforto para fotossensíveis, gera dores de cabeça.  
- **Contramedida**: modo escuro automático (`prefers-color-scheme`), cinzas (#f5f5f5) como base.
</details>

<details>
<summary><strong>justified</strong> — rios de branco</summary>

- **Simula**: `text-align: justify` em parágrafos.  
- **Impacto**: espaços irregulares quebram fluxo ocular, piorando dislexia.  
- **Contramedida**: alinhamento à esquerda, largura 45–80 car, `hyphens:auto` nos idiomas suportados.
</details>

<details>
<summary><strong>cramped</strong> — espaçamento apertado</summary>

- **Simula**: `letter-spacing -0.05em`, `line-height 1`.  
- **Impacto**: palavras se mesclam, velocidade de leitura cai até 60 %.  
- **Contramedida**: seguir C21 (0.12 em letra, 1.5 line) e permitir botão “Texto Confortável”.
</details>

<details>
<summary><strong>flicker</strong> — flash a 3 Hz ⚠️</summary>

- **Simula**: overlay cinza piscando 5×/s.  
- **Impacto**: risco de crise epiléptica fotossensível, distração extrema.  
- **Contramedida**: evitar flashes > 3 Hz, botão pausa, respeitar `prefers-reduced-motion`.
</details>

<details>
<summary><strong>spin</strong> — animações contínuas</summary>

- **Simula**: rotação 360°/s em elementos focais.  
- **Impacto**: nausea, perda de foco, barreira para vestibulodissofobia.  
- **Contramedida**: animações discretas, pausa em hover/focus e alternativa estática.
</details>

<details>
<summary><strong>tiny-icons</strong> — ícones minúsculos e borrados</summary>

- **Simula**: escala 0.5, blur 0.7px, opacidade 65 %.  
- **Impacto**: usuários não identificam função nem acertam alvo de clique.  
- **Contramedida**: ícone ≥ 24 px visível, área clicável 44 × 44 px, `aria-label` textual.
</details>

---

## Compatibilidade

| Navegador | Status |
|-----------|--------|
| Chrome ≥ 124 | ✅ |
| Firefox ≥ 126 | ✅ |
| Edge (Chromium) | ✅ |
| Safari (Tampermonkey) | ⚠️ Filtros SVG podem falhar |

Não coleta dados nem faz chamadas de rede.

---

## Roadmap

- [ ] Simulação de navegação apenas por teclado (ocultar foco e forçar navegação linear).  
- [ ] Forçar distrações sensoriais (Sons, redesign de layout).  
- [ ] Barreiras cognitivas (texto excessivo, linguagem complexa).  

---

## Contribuindo

1. Abra uma _Issue_ descrevendo bug ou sugestão.  
2. Faça _fork_ → _branch_ → _commit_ claro.  
3. Envie seu _Pull Request_.  
4. Siga o padrão de código (ESLint + Prettier).

---

## Licença

Distribuído sob a [MIT License](LICENSE) — liberdade total para usar, modificar e redistribuir, mantido aviso de copyright.
