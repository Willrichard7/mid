# ⚡ Quick Start - 5 Minutos

Copy & paste para começar em 5 minutos.

---

## Checklist Rápido

- [ ] Gerar token Notion
- [ ] Criar database Notion  
- [ ] Compartilhar database com integration
- [ ] Deploy aplicação
- [ ] Testar conexão
- [ ] Adicionar primeira referência

---

## 1️⃣ Notion Token (1 min)

1. Acesse [notion.so/my-integrations](https://www.notion.so/my-integrations)
2. **New Integration** → "Mood Board"
3. **Copie**: `Internal Integration Secret` (começa com `secret_`)

```
Token: secret_abcd1234efgh5678ijkl9012mnop
```

---

## 2️⃣ Database Notion (2 min)

**Na seu workspace Notion:**

1. Nova página → `/database` → Inline database
2. Delete "Name" (propriedade padrão)
3. Add propriedades (clique "+"):
   - `URL Origem` → URL
   - `Thumbnail` → Files & media
   - `Rede Social` → Select (Instagram, Reels, Carrossel, TikTok, YouTube, Blog, Outro)
   - `Projeto/Cliente` → Select (Cliente A, Cliente B, Projeto Pessoal, Tendências, Competidores)
   - `Data Salva` → Created time
   - `Notas` → Text

4. **Copie Database ID** da URL:
   ```
   https://notion.so/[AQUI_É_O_ID]?v=...
   ID: bd47f0c8c77d45a98c07d2b5f6a8b9c0
   ```

---

## 3️⃣ Compartilhar Database (1 min)

**Na página da database:**
1. **Share** (canto superior direito)
2. Procure "Mood Board" (sua integration)
3. Clique → **Edit** → Confirm

✅ Deve aparecer check verde ao lado de "Mood Board"

---

## 4️⃣ Deploy Aplicação (1 min)

### Opção A: GitHub Pages

```bash
# 1. Fork o repo em GitHub (botão Fork no canto superior)
# 2. Settings > Pages > Source: main
# 3. Acesse: https://seu-usuario.github.io/notion-mood-board
```

### Opção B: Vercel (Automático)

```bash
vercel import https://github.com/seu-usuario/notion-mood-board
```

### Opção C: Localhost

```bash
python3 -m http.server 8000
# Acesso: http://localhost:8000
```

---

## 5️⃣ Usar Aplicação

**Na aplicação:**

1. Cole seu **Notion API Token** (campo cinza)
   ```
   secret_abcd1234efgh5678ijkl9012mnop
   ```

2. Cole seu **Database ID** (campo cinza)
   ```
   bd47f0c8c77d45a98c07d2b5f6a8b9c0
   ```

3. Clique **"🧪 Testar Conexão"**
   - Aguarde 3s
   - Se verde: ✅ Pronto!
   - Se vermelho: Revise valores

4. Cole uma URL:
   ```
   https://www.instagram.com/p/CqX8hzVJK9E/
   ```

5. Clique **"Adicionar"**
   - Aguarde 2-3s
   - Card aparece no grid
   - Dados sincronizam com Notion

---

## ✅ Pronto!

Sua aplicação está funcionando. Agora:

```
Cole URLs → Analise previews → Organize por projeto → Adicione notas → Sincronize Notion
```

---

## 📚 Documentação Completa

- **Setup detalhado**: Ver `SETUP.md`
- **Técnico (developers)**: Ver `TECHNICAL.md`
- **Funcionalidades**: Ver `README.md`

---

## 🆘 Problemas?

### ❌ "Desconectado"
- Token válido? Começa com `secret_`?
- Database compartilhada com integration?
- Tente novo token em [notion.so/my-integrations](https://www.notion.so/my-integrations)

### ❌ "Erro ao adicionar"
- Revise token e database ID
- F12 > Console > Veja mensagem de erro
- Copie a mensagem em uma issue no GitHub

### ❌ "Preview não aparece"
- Normal! Muitos sites bloqueiam CORS
- Usamos placeholder automático
- Quando sincroniza no Notion, imagem real aparece

---

## 💡 Primeira Análise

1. Adicione **10 posts similares** de um cliente
2. Use o filtro **"Projeto/Cliente"**
3. Procure por **padrões**:
   - Cores mais usadas
   - Posição de CTA
   - Tamanho e tipo de fonte
   - Hook visual (primeiros 3 segundos)

4. Anote insights nas **notas** de cada card

5. **Exporte** (screenshot ou PDF) para briefing de design

---

## 🚀 Comandos Úteis (Dev Console)

```javascript
// Carregar dados de demo
loadDemoData();

// Ver app state
console.log(appState);

// Testar conexão manualmente
testNotionConnection();

// Recarregar items do Notion
loadItems();
```

---

Sucesso! 🎉
