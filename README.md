# A11Y Barrier Simulator 🚀

[**Instalar script**](https://raw.githubusercontent.com/brunowelber/a11y-barrier-simulator/main/a11y-barrier-simulator.user.js)

Userscript para Tamper-, Violent- ou Greasemonkey que **liga/desliga 11 barreiras de acessibilidade** em qualquer site.  
Excelente para gerar empatia, treinar times e detectar problemas antes que o usuário final sofra.

---

## 📑 Índice
- [Recursos Principais](#recursos-principais)
- [Instalação](#instalação)
- [Como Usar](#como-usar)
- [Detalhes das Simulações](#detalhes-das-simulações)
- [Compatibilidade](#compatibilidade)
- [Contribuindo](#contribuindo)
- [Licença](#licença)

---

## Recursos Principais

| # | Barreira simulada | O que faz | Habilidade afetada |
|---|-------------------|-----------|--------------------|
| 1 | **text-small** | Encolhe todo o texto | Baixa visão |
| 2 | **fancy-fonts** | Troca para fonte decorativa | Dislexia |
| 3 | **low-contrast** | Reduz contraste global | Visão subnormal / luz forte |
| 4 | **grayscale** | Remove cores | Dependência de cor |
| 5 | **deuteranopia** | Filtro daltonismo vermelho-verde | Daltonismo |
| 6 | **bright-white** | Fundo branco ofuscante | Fotossensibilidade |
| 7 | **justified** | Força texto justificado | Fluxo de leitura |
| 8 | **cramped** | Aperta espaçamentos | Dificuldade de leitura |
| 9 | **flicker** | Piscando a 3 Hz | Epilepsia fotosensível |
|10 | **spin** | Elementos giratórios | TEA e TDAH |
|11 | **tiny-icons** | Ícones minúsculos | Área de clique pequena |

---

## Instalação

### 🚀 Instalação rápida

1. Instale um gerenciador de userscripts:  
   - [Tampermonkey](https://www.tampermonkey.net/) • Chrome, Firefox, Edge, Safari, Opera  
   - [Violentmonkey](https://violentmonkey.github.io/) • Chrome, Firefox, Edge, Opera  
   - [Greasemonkey](https://www.greasespot.net/) • Firefox  
2. Clique em **Instalar script** (link no topo).  
   O gerenciador abre a tela de confirmação e configura auto-update.

### 🛠️ Instalação manual

1. Painel do userscript → **Novo**.  
2. Cole a URL raw ou o conteúdo do arquivo `.user.js`.  
3. Salve. O script roda em todos os sites (`@match *://*/*`).

---

## Como Usar

| Ação | Atalho |
|------|--------|
| Abrir/fechar painel | **F2** |

1. Pressione **F2** para mostrar o painel flutuante.  
2. Marque/desmarque os _checkboxes_ para ativar barreiras.  
3. As alterações afetam só a aba atual e somem ao recarregar.

---

## Detalhes das Simulações

<details>
<summary><strong>Texto pequeno</strong> — reduz fontes para 10 px</summary>

**Impacto:** força zoom, aumenta fadiga visual.  
**Contramedida:** usar `rem/em`, verificar zoom 200 %.
</details>

<details>
<summary><strong>Fontes decorativas</strong> — troca para Brush Script MT</summary>

**Impacto:** dificulta leitura e OCR, agrava dislexia.  
**Contramedida:** fontes sans-serif consistentes, opção do usuário.
</details>

<details>
<summary><strong>Baixo contraste</strong> — texto #777 em fundo #eee</summary>

**Impacto:** texto “camuflado” em ambientes claros.  
**Contramedida:** contraste ≥ 4 .5 : 1 e tema alto contraste.
</details>

<details>
<summary><strong>Escala de cinza</strong> — remove cores</summary>

**Impacto:** testa dependência de cor.  
**Contramedida:** rótulos redundantes, ícones diferenciados.
</details>

<details>
<summary><strong>Deuteranopia</strong> — filtro vermelho-verde</summary>

**Impacto:** verde e vermelho tornam-se similares.  
**Contramedida:** paletas seguras, padrões, texto de apoio.
</details>

<details>
<summary><strong>Fundo branco intenso</strong></summary>

**Impacto:** brilho excessivo, causa desconforto.  
**Contramedida:** modo escuro automático, tons de cinza claro.
</details>

<details>
<summary><strong>Texto justificado</strong></summary>

**Impacto:** cria “rios” de espaço, quebra rastreio ocular.  
**Contramedida:** alinhamento à esquerda, `hyphens:auto`.
</details>

<details>
<summary><strong>Espaçamento apertado</strong></summary>

**Impacto:** letras se juntam, leitura mais lenta.  
**Contramedida:** `letter-spacing 0.12em`, `line-height 1.5`.
</details>

<details>
<summary><strong>Piscando 3 Hz</strong> ⚠️</summary>

**Impacto:** pode disparar crise epiléptica.  
**Contramedida:** evitar flashes > 3 Hz, botão pausa.
</details>

<details>
<summary><strong>Elementos girando</strong></summary>

**Impacto:** distrai e causa náusea.  
**Contramedida:** respeitar `prefers-reduced-motion`.
</details>

<details>
<summary><strong>Ícones minúsculos</strong></summary>

**Impacto:** área de clique difícil, ambiguidade.  
**Contramedida:** área 44 × 44 px, rótulo texto/aria.
</details>

---

## Compatibilidade

| Navegador | Status |
|-----------|--------|
| Chrome ≥ 124 | ✅ |
| Firefox ≥ 126 | ✅ |
| Edge (Chromium) | ✅ |
| Safari + Tampermonkey | ⚠️ Filtros SVG podem falhar |

---

## Contribuindo

1. Abra uma _issue_ com bug ou sugestão.  
2. Faça _fork_ ➜ _branch_ ➜ commits claros.  
3. Envie _pull request_.  
4. Siga os linters (ESLint + Prettier).

---

## Licença

MIT — use, modifique e distribua livremente mantendo o aviso de copyright.
