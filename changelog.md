# Histórico de versões – A11Y Barrier Simulator

## [1.8] - 2025-05-11

### Changed

- Largura do painel reduzida de **300 px → 260 px** para ocupar menos espaço em telas 1280×720.

### Fixed

- Nenhuma correção de bug.

## [1.7] - 2025-05-11

### Added

- Rótulos **em português** com indicação da habilidade afetada entre parênteses.  
  Ex.: `Baixo contraste (Visão subnormal / luz forte)`.
- Painel levemente ampliado para 300 px (posteriormente ajustado a 260 px).

### Changed

- Versão para 1.7.

## [1.6] - 2025-05-11

### Added

- Script estabilizado sem atalhos de função conflitantes; controle exclusivo via painel (F2).

### Changed

- Painel recodificado (largura 280 px), código simplificado, English labels mantidos.

### Removed

- Lógica de grupos F-keys introduzida em 1.3.

## [1.5] - _versão interna_

- Ajustes menores de CSS e deduplicação de seletores (não publicada oficialmente).

## [1.4] - 2025-05-11

### Changed

- **Atalhos de função removidos**; mantido apenas **F2** para abrir/fechar painel.
- Código reduzido ~30 % sem perda de funcionalidade.

### Fixed

- Conflitos com atalhos padrão do Chrome (F3/F5/F6/F7).

## [1.3] - 2025-05-10

### Added

- Atalhos: F3, F4, F6, F8, F9 para ligar/desligar grupos de barreiras.
- Checkbox labels exibiam dicas de atalhos.

### Changed

- Reestruturado `keyGroups` e `groupHotkey()`.

## [1.2] - 2025-05-10

### Added

- Migração de `e.key` → **`e.code`**; suporte a **Ctrl + Shift + número** (interceptado depois pelo Chrome).

### Fixed

- Eventos não chegavam com layout ABNT.

## [1.1] - 2025-05-09

### Added

- **Painel flutuante** com checkboxes, aviso de flicker e aviso de baixo contraste.
- Hotkeys **Alt + Shift + 1 – =** mantidos.

### Changed

- Script “híbrido” (atalhos + UI) substituiu a versão minimalista 1.0.

## [1.0] - 2025-05-09

### Added

- Primeira versão pública.
  - 11 barreiras (classes `a11y-*`).
  - Atalhos Alt + Shift + 1 – = para ligar/desligar.
  - Sem painel, sem avisos.
