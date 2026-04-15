# 🎯 Setup Passo a Passo - Mood Board Notion

Siga este guia para colocar a aplicação funcionando em menos de 10 minutos.

---

## PASSO 1: Gerar Notion API Token

### 1️⃣ Acesse o portal de integrações

1. Vá para [notion.so/my-integrations](https://www.notion.so/my-integrations)
2. Faça login com sua conta Notion
3. Clique no botão **"New Integration"**

### 2️⃣ Configure a integração

**Preencha os campos:**
- **Name**: `Mood Board` (ou o nome que preferir)
- **Logo**: (opcional) Escolha um ícone
- **Associated workspace**: Selecione seu workspace

**Capabilities (ative):**
- ✅ Read content
- ✅ Update content
- ✅ Insert content

### 3️⃣ Copie o Token

1. Clique em "Show" ao lado de "Internal Integration Secret"
2. Copie o texto que começa com `secret_`
3. **Salve em um local seguro** (você usará na próxima etapa)

Exemplo: `secret_abcd1234efgh5678ijkl9012`

---

## PASSO 2: Criar Database Notion

### 1️⃣ Crie uma página nova

1. No Notion, crie uma página/workspace para o mood board
2. Digite `/database` e selecione "Database - Inline"

### 2️⃣ Configure as propriedades

Copie exatamente os nomes abaixo. Clique em "+" para adicionar propriedade:

| Propriedade | Tipo | Configuração |
|---|---|---|
| **URL Origem** | URL | Padrão |
| **Thumbnail** | Files & media | Padrão |
| **Rede Social** | Select | Opções: Instagram, Reels, Carrossel, TikTok, YouTube, Blog, Outro |
| **Projeto/Cliente** | Select | Opções: Cliente A, Cliente B, Projeto Pessoal, Tendências, Competidores |
| **Data Salva** | Created time | Padrão (auto) |
| **Notas** | Text | Padrão |

**Deletar propriedade padrão:**
- Clique em "Name" e delete (não usaremos)

**Resultado esperado:**
```
[URL Origem] [Thumbnail] [Rede Social] [Projeto/Cliente] [Data Salva] [Notas]
```

### 3️⃣ Obtenha o Database ID

1. Abra a database (clique em botão branco ao lado do nome)
2. Copie a URL da barra de endereço:
   ```
   https://notion.so/[AQUI_É_O_ID]?v=[resto-da-url]
   ```
3. **O ID é apenas a parte sem hífens:** `bd47f0c8c77d45a98c07d2b5f6a8b9c0`

---

## PASSO 3: Compartilhar Database com Integration

**IMPORTANTE**: Sem este passo, a integração não consegue acessar a database!

### 1️⃣ Compartilhe a database

1. **Na página da database**, clique em **"Share"** (canto superior direito)
2. Na seção de invites, procure por **"Mood Board"** (sua integração)
3. Se não aparecer, clique em **"Invite"** e procure novamente
4. Clique para selecionar **"Mood Board"**
5. Defina permissão como **"Edit"**
6. Confirme

**Confirmação**: Ao lado do nome "Mood Board" deve aparecer ✅

---

## PASSO 4: Deploy da Aplicação

Escolha uma das opções abaixo:

### Opção A: GitHub Pages (⭐ Recomendado)

**Vantagens:**
- Gratuito
- Hospedagem rápida
- Integração automática com GitHub

**Passos:**

1. **Fork o repositório**
   - Acesse [github.com/seu-usuario/notion-mood-board](https://github.com/seu-usuario/notion-mood-board)
   - Clique em **"Fork"** (canto superior direito)

2. **Habilite GitHub Pages**
   - Acesse **Settings** > **Pages**
   - Em "Source", selecione **"main"** ou a branch desejada
   - A aplicação estará em: `https://seu-usuario.github.io/notion-mood-board`

3. **Acesso**
   - Aguarde 1-2 minutos
   - Abra a URL `https://seu-usuario.github.io/notion-mood-board`

---

### Opção B: Vercel (⭐⭐ Mais fácil)

**Vantagens:**
- Deploy automático a cada push
- Domínio customizado grátis
- Mais rápido

**Passos:**

1. Acesse [vercel.com](https://vercel.com)
2. Clique em **"New Project"**
3. Selecione **"Import Git Repository"**
4. Cole a URL do seu fork: `https://github.com/seu-usuario/notion-mood-board`
5. Clique **"Import"**
6. Deixe as configurações padrão
7. Clique **"Deploy"**
8. Pronto! Seu projeto está em produção em: `https://seu-projeto.vercel.app`

---

### Opção C: Netlify

1. Acesse [netlify.com](https://netlify.com)
2. Clique em **"New site from Git"**
3. Selecione **GitHub** e autorize
4. Escolha seu repositório (fork do mood board)
5. Deixe as configurações padrão
6. Clique **"Deploy"**
7. URL gerada automaticamente

---

### Opção D: Localhost (Para Desenvolvimento)

**Se quiser testar localmente:**

```bash
# 1. Clone o repositório
git clone https://github.com/seu-usuario/notion-mood-board.git
cd notion-mood-board

# 2. Inicie um servidor local
# Opção com Python:
python3 -m http.server 8000

# Opção com Node (npm):
npx http-server -p 8000

# 3. Abra no navegador:
# http://localhost:8000
```

---

## PASSO 5: Usar a Aplicação

### 1️⃣ Abra a página

1. Acesse a URL da sua aplicação (GitHub Pages, Vercel, ou localhost)
2. Você verá a tela inicial com 2 campos em cinza

### 2️⃣ Configure o Notion

1. **Cole seu Notion API Token:**
   - Clique no campo "Notion API Token"
   - Cole o token que copiou no Passo 1 (começa com `secret_`)

2. **Cole seu Database ID:**
   - Clique no campo "Database ID"
   - Cole o ID que copiou no Passo 2

3. **Teste a conexão:**
   - Clique no botão **"🧪 Testar Conexão"**
   - Aguarde 3 segundos
   - Se aparecer **"✅ Conectado"** (verde), funcionou!
   - Se aparecer **"❌ Desconectado"** (vermelho), revise os valores

### 3️⃣ Adicionar primeira referência

1. **Cole uma URL:**
   - Exemplo: `https://www.instagram.com/p/CqX8hzVJK9E/`
   - Ou qualquer post de Instagram, TikTok, YouTube, Blog, etc

2. **Selecione opções (opcional):**
   - Rede Social: Detecta automaticamente, mas você pode escolher manualmente
   - Projeto/Cliente: `Cliente A`, `Projeto Pessoal`, etc

3. **Adicione notas (opcional):**
   - Escreva sobre gancho, CTA, design, etc
   - Exemplo: "Gancho visual com cores vibrantes, CTA urgente"

4. **Clique "Adicionar"**
   - Aguarde 2-3 segundos
   - Um card com a imagem da referência aparecerá no grid
   - Dados sincronizam automaticamente com Notion

### 4️⃣ Interagir com cards

**Passe o mouse sobre um card:**
- 🔗 **Ver Original** - abre a URL em nova aba
- 📋 **Copiar** - copia a URL para clipboard
- 📝 **Notas** - abre painel para editar

**Clique no card:**
- Abre painel para editar notas
- Adicione insights sobre técnica, ganchos, CTAs
- Clique **"Salvar Notas"** para sincronizar
- Ou clique **"Deletar"** para remover

---

## 🎉 Pronto!

Sua aplicação está funcionando. Agora você pode:

✅ Coletar referências de redes sociais  
✅ Organizar por projeto/cliente  
✅ Anotar insights sobre cada referência  
✅ Filtrar e buscar  
✅ Sincronizar tudo no Notion  

---

## 🔧 Troubleshooting

### ❌ "Desconectado" mesmo após adicionar credenciais

**Solução:**
1. Verifique se o token começa com `secret_`
2. Verifique se a integração foi compartilhada com a database (Passo 3)
3. Tente gerar um novo token em [notion.so/my-integrations](https://www.notion.so/my-integrations)
4. Limpe o localStorage do navegador (F12 > Application > Local Storage > Delete)

### ❌ "Erro ao carregar itens"

**Solução:**
1. Verifique Database ID (deve ser 32 caracteres sem hífens)
2. Confirme que a database tem as propriedades exatas (nomes e tipos)
3. Abra o console do navegador (F12) e copie a mensagem de erro

### ❌ "Preview não está aparecendo"

**Solução:**
- Isso é normal! Muitos sites bloqueiam CORS
- Usamos um placeholder automático que tira o favicon do site
- Quando sincroniza no Notion, a imagem real aparece como cover

### ❌ "Dados não sincronizam com Notion"

**Solução:**
1. Verifique se a integração tem permissão "Edit" (não apenas "View")
2. Recarregue a página (F5)
3. Tente adicionar uma referência novamente
4. Abra a database no Notion para confirmar

---

## 💡 Pro Tips

1. **Organização por projeto:**
   - Use "Projeto/Cliente" para separar por cliente
   - Crie um mood board por projeto para não misturar

2. **Notas detalhadas:**
   - Anote os **primeiros 3 segundos** (o hook)
   - Copie o **CTA exato** usado
   - Descreva **técnicas de edição/design**

3. **Análise em lote:**
   - Filtre por rede social (crie views no Notion)
   - Compare 9-12 posts juntos
   - Procure por padrões

4. **Backup:**
   - Os dados vivem no Notion, então estão sempre sincronizados
   - Exporte a database como CSV quando precisar

5. **Compartilhar:**
   - Envie a URL da aplicação para colegas
   - Se compartilharem o mesmo Notion workspace, verão os mesmos dados!

---

## 📚 Próximas etapas

1. **Adicionar 10-20 referências** para ter base de análise
2. **Criar database views no Notion** (por rede social, por data, etc)
3. **Exportar notas** para briefing de conteúdo
4. **Analisar padrões** e aplicar em seu próprio conteúdo

---

**Dúvidas?** Abra uma issue no GitHub ou consulte o README.md para mais detalhes técnicos.

Bom mood board! 🎨
