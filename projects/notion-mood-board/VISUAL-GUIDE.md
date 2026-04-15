# 🎨 Visual Guide - Estrutura & Interface

Guia visual completo da interface da aplicação.

---

## 📐 Layout Geral

```
┌────────────────────────────────────────────────────────────┐
│                        HEADER                               │
│  🎨 Mood Board                                             │
│  Análise Visual de Referências para Redes Sociais         │
└────────────────────────────────────────────────────────────┘

┌────────────────────────────────────────────────────────────┐
│           CONFIG SECTION (Cinza)                           │
│  ⚙️ Configuração Notion                                    │
│  ┌──────────────────────────────────────────────────────┐  │
│  │ Notion API Token: [secret_xxxx__________]            │  │
│  │ Database ID: [xxxx-xxxx-xxxx-xxxx_____]             │  │
│  │ [🧪 Testar Conexão] [✅ Conectado]                 │  │
│  └──────────────────────────────────────────────────────┘  │
└────────────────────────────────────────────────────────────┘

┌────────────────────────────────────────────────────────────┐
│           ADD SECTION (Branco)                            │
│  ➕ Adicionar ao Mood Board                               │
│  ┌──────────────────────────────────────────────────────┐  │
│  │ [https://instagram.com/...__________] [Adicionar]  │  │
│  │                                                      │  │
│  │ Rede Social: [Detectar automaticamente ▼]          │  │
│  │ Projeto/Cliente: [Cliente A ▼]                     │  │
│  │ Notas: [Gancho visual, CTA urgente......] (3 lines)│  │
│  └──────────────────────────────────────────────────────┘  │
└────────────────────────────────────────────────────────────┘

┌────────────────────────────────────────────────────────────┐
│           FILTERS SECTION                                  │
│  🔍 Filtrar                                                │
│  [Todos os Projetos ▼] [🔄 Atualizar] [🗑️ Limpar Tudo]  │
└────────────────────────────────────────────────────────────┘

┌────────────────────────────────────────────────────────────┐
│  0 Itens Total      │  0 Visíveis      │  (STATS)         │
└────────────────────────────────────────────────────────────┘

┌────────────────────────────────────────────────────────────┐
│           GRID SECTION (3 COLUNAS)                        │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐     │
│  │              │  │              │  │              │     │
│  │   CARD 1     │  │   CARD 2     │  │   CARD 3     │     │
│  │              │  │              │  │              │     │
│  └──────────────┘  └──────────────┘  └──────────────┘     │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐     │
│  │              │  │              │  │              │     │
│  │   CARD 4     │  │   CARD 5     │  │   CARD 6     │     │
│  │              │  │              │  │              │     │
│  └──────────────┘  └──────────────┘  └──────────────┘     │
└────────────────────────────────────────────────────────────┘
```

---

## 🎯 Anatomia de um Card

```
┌─────────────────────────────────────┐
│                                     │
│      IMAGEM/THUMBNAIL (300px)      │  ← mood-card-image
│       (Aspect ratio natural)        │
│                                     │
│  ┌─ Instagram ─────────────────┐  │  ← mood-card-badge
│  │                             │  │
│  │                             │  │  ← mood-card-overlay
│  │      [🔗 Original]          │  │     (mostra ao hover)
│  │      [📋 Copiar]            │  │
│  │      [📝 Notas]             │  │
│  │                             │  │
│  └─────────────────────────────┘  │
│                                     │
│  ┌───── mood-card-info ──────────┐ │
│  │ Cliente A                      │ │
│  │ 2h atrás                       │ │
│  └────────────────────────────────┘ │
└─────────────────────────────────────┘

Hover Effects:
- Imagem: Escurece (overlay 0.4)
- Botões: Aparecem com transição
- Card: Levanta (+8px) com sombra
```

---

## 📊 Grid Responsivo

### Desktop (1200px+)
```
3 colunas × N linhas
Gap: 20px
Card height: 300px (flex)
```

### Tablet (768px - 1024px)
```
2 colunas × N linhas
Gap: 20px
Card height: 300px
```

### Mobile (< 768px)
```
1 coluna × N linhas
Gap: 15px
Card height: 350px
Padding: 15px
```

**Exemplo visual:**

```
Desktop:          Tablet:          Mobile:
┌──┬──┬──┐       ┌──┬──┐          ┌──┐
├──┼──┼──┤       ├──┼──┤          ├──┤
├──┼──┼──┤       ├──┼──┤          ├──┤
└──┴──┴──┘       └──┴──┘          └──┘
```

---

## 🎭 Modal de Notas

```
╔════════════════════════════════════════╗
║  Editar Notas                       [×]║
╠════════════════════════════════════════╣
║                                        ║
║  ┌──────────────────────────────────┐  ║
║  │ Suas notas...                    │  ║
║  │ [cursor piscando]                │  ║
║  │                                  │  ║
║  │                                  │  ║
║  └──────────────────────────────────┘  ║
║                                        ║
║  URL: https://instagram.com/p/...     ║
║  Adicionado em: 15 de abr de 2024     ║
║                                        ║
╠════════════════════════════════════════╣
║  [Salvar Notas]  [Deletar]  [Fechar]  ║
╚════════════════════════════════════════╝
```

---

## 🎨 Paleta de Cores

```css
/* Primary */
--primary: #6366f1          /* Roxo/Indigo */
--primary-dark: #4f46e5     /* Roxo escuro */

/* Secondary */
--secondary: #8b5cf6        /* Roxo claro */

/* Status */
--success: #10b981          /* Verde */
--danger: #ef4444           /* Vermelho */

/* Backgrounds */
--bg: #f9fafb               /* Cinza muito claro */
--bg-white: #ffffff         /* Branco */

/* Text */
--text-dark: #1f2937        /* Cinza escuro */
--text-light: #6b7280       /* Cinza médio */

/* Borders */
--border: #e5e7eb           /* Cinza claro */
```

**Dark Mode (Futuro):**
```css
@media (prefers-color-scheme: dark) {
  --bg: #1f2937;
  --bg-white: #111827;
  --text-dark: #f3f4f6;
  --border: #374151;
}
```

---

## 🎬 Animações

### Fade-in do Card
```css
animation: fadeIn 0.3s ease;

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}
```

### Hover Card
```css
transition: all 0.3s ease;

&:hover {
  transform: translateY(-8px);
  box-shadow: var(--shadow-lg);
}
```

### Loading Spinner
```css
animation: spin 0.8s linear infinite;

@keyframes spin {
  to { transform: rotate(360deg); }
}
```

### Toast Notification
```css
animation: slideIn 0.3s ease;

@keyframes slideIn {
  from { transform: translateX(400px); opacity: 0; }
  to { transform: translateX(0); opacity: 1; }
}
```

---

## 📝 Exemplos de Dados

### Card 1 - Instagram
```
URL: https://www.instagram.com/p/CqX8hzVJK9E/
Thumbnail: [Imagem rosa/pink do post]
Rede Social: Instagram
Projeto/Cliente: Cliente A - Loja Online
Data Salva: 15/04/2024
Notas: "Gancho visual com cores vibrantes, CTA: 
        'Saiba mais', layout minimalista"
```

### Card 2 - TikTok
```
URL: https://www.tiktok.com/@brand/video/123
Thumbnail: [Imagem preta com person sorrindo]
Rede Social: TikTok
Projeto/Cliente: Tendências - Viral Content
Data Salva: 14/04/2024
Notas: "Hook 3s, trending sound, transição rápida,
        CTA: 'Segue para mais'"
```

### Card 3 - YouTube
```
URL: https://www.youtube.com/watch?v=dQw4w9WgXcQ
Thumbnail: [Thumbnail com face + texto vermelho]
Rede Social: YouTube
Projeto/Cliente: Competidores - Análise
Data Salva: 13/04/2024
Notas: "Face expressão forte, texto ALL CAPS,
        cores: vermelho + preto, urgência visual"
```

---

## 🔄 Estados da Aplicação

### 1. Loading
```
[Spinner girando] Carregando dados...
```

### 2. Conectado
```
✅ Conectado    (Botão verde)
```

### 3. Desconectado
```
❌ Desconectado    (Botão vermelho)
```

### 4. Grid Vazio
```
┌────────────────────────────────────┐
│                                    │
│     📭 Nenhuma referência ainda    │
│     Cole uma URL acima!            │
│                                    │
└────────────────────────────────────┘
```

### 5. Toast Success
```
╔═══════════════════════════════════╗
║  ✅ Adicionado ao Mood Board!     ║
╚═══════════════════════════════════╝
(desaparece em 3s)
```

### 6. Toast Error
```
╔═══════════════════════════════════╗
║  ❌ Erro ao conectar              ║
╚═══════════════════════════════════╝
(desaparece em 3s)
```

---

## 📱 Exemplo Completo - Mobile

```
┌──────────────────────────┐
│      🎨 Mood Board       │
│  Análise Visual...       │
└──────────────────────────┘
┌──────────────────────────┐
│ ⚙️ Config                │
│ [Token_____]             │
│ [Database__]             │
│ [Test] [✅]              │
└──────────────────────────┘
┌──────────────────────────┐
│ ➕ Add                   │
│ [URL________] [Add]      │
│ [Social ▼]               │
│ [Projeto ▼]              │
│ [Notas____]              │
└──────────────────────────┘
┌──────────────────────────┐
│ 🔍 [Project ▼]           │
│    [🔄] [🗑️]           │
└──────────────────────────┘
┌──────────────────────────┐
│ 5 Items  │  5 Visíveis    │
└──────────────────────────┘
┌──────────────────────────┐
│     [CARD 1]             │
│     [CARD 2]             │
│     [CARD 3]             │
│     [CARD 4]             │
│     [CARD 5]             │
└──────────────────────────┘
```

---

## 🎯 Fluxo Visual de Uso

```
1. Abrir app
        ↓
2. Cole credenciais Notion
        ↓
3. 🧪 Testar conexão
        ↓
4. ✅ Conectado (grid vazio)
        ↓
5. Cole URL (Instagram/TikTok/etc)
        ↓
6. [Adicionar]
        ↓
7. ⏳ Extrai preview (2-3s)
        ↓
8. 📸 Card aparece no grid
        ↓
9. Hover → Vê botões
        ↓
10. Click → Abre modal de notas
        ↓
11. Edita notas → [Salvar]
        ↓
12. 📌 Notas sincronizam com Notion
```

---

## 🌐 Responsividade - Breakpoints

| Device | Width | Colunas | Font |
|---|---|---|---|
| Mobile | < 600px | 1 | 14px |
| Tablet | 600-1024px | 2 | 15px |
| Desktop | > 1024px | 3 | 16px |

```css
/* Mobile First */
.mood-grid { grid-template-columns: 1fr; }

@media (min-width: 600px) {
  .mood-grid { grid-template-columns: repeat(2, 1fr); }
}

@media (min-width: 1024px) {
  .mood-grid { grid-template-columns: repeat(3, 1fr); }
}
```

---

## 🎨 Customização Visual

### Mudar Cor Primária

Em `css/style.css`:
```css
:root {
  --primary: #ec4899;        /* Mudar para pink */
  --primary-dark: #be185d;
}
```

### Mudar Número de Colunas

Em `css/style.css`:
```css
.mood-grid {
  grid-template-columns: repeat(4, 1fr);  /* 4 colunas */
}
```

### Aumentar Card Height

Em `css/style.css`:
```css
.mood-card {
  height: 400px;  /* Ao invés de 300px */
}
```

---

**Mais dúvidas sobre visual?** Abra uma issue com tag `[ui]` no GitHub.
