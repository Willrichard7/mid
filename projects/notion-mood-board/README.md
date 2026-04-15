# 🎨 Mood Board - Análise Visual de Redes Sociais

Uma ferramenta poderosa para coletar, organizar e analisar referências visuais de redes sociais diretamente no Notion.

## ✨ Features

- 📸 **Extração automática de previews** (og:image, thumbnails)
- 🎯 **Detecção inteligente** de rede social (Instagram, TikTok, YouTube, Blog, etc)
- 📊 **Grid responsivo** 3 colunas estilo Pinterest/Instagram
- 💾 **Sincronização Notion API** - dados persistem automaticamente
- 🏷️ **Filtros por projeto/cliente** para organização
- 📝 **Notas inline** para anotar ganchos, CTAs, insights
- ⚡ **Sem back-end** - funciona 100% no navegador com Notion API
- 🚀 **Performance** - carregamento instantâneo de cards

## 🚀 Setup Guide

### 1. Criar Integration Notion

1. Acesse [notion.so/my-integrations](https://www.notion.so/my-integrations)
2. Clique em "New Integration"
3. Preencha os dados:
   - **Name**: "Mood Board"
   - **Associated workspace**: Seu workspace
   - **User capability**: Selecione as permissões necessárias
4. Copie o **Internal Integration Token** (começa com `secret_`)
5. Salve em local seguro

### 2. Criar Database Notion

#### Opção A: Usar Template (Recomendado)

Crie uma database no Notion com essas propriedades:

| Propriedade | Tipo | Descrição |
|---|---|---|
| **URL Origem** | URL | Link do post/conteúdo |
| **Thumbnail** | Image | Cover da página |
| **Rede Social** | Select | Instagram, Reels, TikTok, YouTube, Blog, etc |
| **Projeto/Cliente** | Select | Para filtrar e organizar |
| **Data Salva** | Created Time | Auto-gerado |
| **Notas** | Rich Text | Anotações sobre gancho, CTA, design |

#### Opção B: Copiar Template

Duplicar esta [database template](https://notion.so/template) no seu workspace.

### 3. Obter Database ID

1. Abra a database no Notion
2. Copie a URL: `https://notion.so/[AQUI_É_O_ID]?v=...`
3. O ID é a parte entre `/` e `?` (sem hífens)
   - Exemplo: `bd47f0c8c77d45a98c07d2b5f6a8b9c0`

### 4. Compartilhar Database com Integration

Na database Notion:
1. Clique em "Share" (canto superior direito)
2. Invite a integration que criou (apareça como "Mood Board")
3. Dê permissão de **Edit**
4. Confirme

### 5. Deploy da Aplicação

#### Opção A: GitHub Pages (Recomendado)

```bash
# 1. Fazer fork ou clonar o repo
git clone https://github.com/seu-usuario/notion-mood-board.git
cd notion-mood-board

# 2. Fazer push para GitHub
git push origin main

# 3. Ativar GitHub Pages
# Settings > Pages > Source > main branch > /root ou /docs
```

Acesso: `https://seu-usuario.github.io/notion-mood-board`

#### Opção B: Vercel (Automático)

```bash
# 1. Deploy direto do GitHub
vercel import https://github.com/seu-usuario/notion-mood-board
```

#### Opção C: Localhost (Desenvolvimento)

```bash
# Iniciar simple HTTP server
python3 -m http.server 8000
# ou
npx http-server

# Acesse: http://localhost:8000
```

#### Opção D: Arquivo Local

Abra `index.html` direto no navegador com `file://` (algumas funcionalidades podem ser limitadas por CORS).

### 6. Usar a Aplicação

1. Abra a URL da aplicação
2. Cole seu **Notion API Token** no campo "Notion API Token"
3. Cole seu **Database ID** no campo "Database ID"
4. Clique em "🧪 Testar Conexão"
5. Quando conectado, você verá "✅ Conectado"

## 📖 Como Usar

### Adicionar Referência

1. **Cole a URL** de um post/vídeo/blog
2. **Rede Social** será detectada automaticamente (ou escolha manualmente)
3. **Selecione Projeto/Cliente**
4. **(Opcional)** Adicione notas sobre gancho, CTA, insights visuais
5. Clique em **"Adicionar"**

### Interagir com Cards

**Hover** sobre um card:
- 🔗 **Ver Original** - abre URL em nova aba
- 📋 **Copiar** - copia URL para clipboard
- 📝 **Notas** - abre painel para editar anotações

**Clique** no card:
- Abre painel de notas
- Edite suas observações
- Salve automaticamente no Notion
- Delete se necessário

### Filtrar & Organizar

- **Filtro por Projeto** - dropdown no topo
- **Atualizar** - botão 🔄 para carregar mudanças
- **Limpar Tudo** - deleta todos os itens (cuidado!)

## 🎨 Personalizações

### Adicionar Mais Opções de Rede Social

Edite em `js/app.js`:

```javascript
function detectSocialNetwork(url) {
    if (url.includes('reddit.com')) return 'Reddit';
    if (url.includes('pinterest.com')) return 'Pinterest';
    // ...
}
```

E adicione placeholder em `getPlaceholderImage()`:

```javascript
const placeholders = {
    Reddit: 'https://via.placeholder.com/400x500/FF4500/FFFFFF?text=Reddit',
    Pinterest: 'https://via.placeholder.com/400x500/E60023/FFFFFF?text=Pinterest',
};
```

### Customizar Cores

Edite `:root` em `css/style.css`:

```css
:root {
    --primary: #6366f1;  /* Cor principal */
    --secondary: #8b5cf6;  /* Cor secundária */
    --danger: #ef4444;    /* Cor de ação destrutiva */
}
```

### Mudar Número de Colunas

Em `css/style.css`:

```css
.mood-grid {
    grid-template-columns: repeat(4, 1fr);  /* 4 colunas */
}

@media (max-width: 1024px) {
    .mood-grid {
        grid-template-columns: repeat(2, 1fr);
    }
}
```

## 🔒 Segurança

- **Tokens salvos no localStorage** do navegador (nunca enviados a servidores terceiros)
- **CORS**: Alguns URLs podem ser bloqueados por CORS, usamos fallback com placeholders
- **Validação**: URLs são validadas antes de serem processadas
- **Database permissions**: Configure permissões adequadas na integration Notion

## 🐛 Troubleshooting

### "❌ Desconectado"
- Verifique se o token é válido (começa com `secret_`)
- Verifique se a integration foi compartilhada com a database
- Tente gerar um novo token

### "❌ Erro ao carregar itens"
- Verifique o Database ID (sem hífens)
- Confirme que a database tem as propriedades corretas
- Cheque console do navegador (F12) para mais detalhes

### "Preview não está aparecendo"
- URL bloqueada por CORS (comum em redes sociais)
- Usamos placeholder automático neste caso
- Imagem ainda aparece quando sincronizada com Notion

### CORS Errors
Alguns sites bloqueiam requisições do navegador. Usamos:
1. Primeiro: tenta extrair og:image da página
2. Fallback: placeholder com ícone da rede social

## 📚 Estrutura de Arquivos

```
notion-mood-board/
├── index.html          # HTML principal
├── css/
│   └── style.css       # Estilos (responsivo, dark mode)
├── js/
│   └── app.js          # Lógica (Notion API, extração, grid)
├── README.md           # Este arquivo
└── example-data.json   # Dados de exemplo
```

## 🚀 Roadmap

- [ ] Dark mode automático
- [ ] Exportar mood board como PDF
- [ ] Compartilhar boards com outros usuários
- [ ] Análise de tendências (mais cores, fontes comuns)
- [ ] Upload de imagens locais
- [ ] Tags customizadas
- [ ] Integração com Figma
- [ ] Desktop app (Electron)

## 📄 Licença

MIT

## 💬 Feedback

Encontrou um bug? Tem uma feature request?

Abra uma [issue no GitHub](https://github.com/seu-usuario/notion-mood-board/issues)

## 🙏 Créditos

Desenvolvido para criadores de conteúdo e social media managers que precisam de uma ferramenta simples e poderosa para análise de referências visuais.

---

**Pro Tips** 💡

1. **Organize por projeto**: Use a seleção "Projeto/Cliente" para separar referências por cliente
2. **Notas detalhadas**: Anote ganchos, CTAs, timing de vídeos, técnicas de design
3. **Comparar layouts**: Agora com 3 colunas é fácil ver padrões visuais
4. **Reutilizar insights**: Exporte notas para briefs de design/copywriting
5. **Atualização em tempo real**: Abre em várias abas e vê mudanças sincronizarem!
