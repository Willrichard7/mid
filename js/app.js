// App State
const appState = {
    items: [],
    filteredItems: [],
    notionToken: localStorage.getItem('notionToken') || '',
    databaseId: localStorage.getItem('databaseId') || '',
    isConnected: false,
    editingItemId: null,
};

// DOM Elements
const elements = {
    notionToken: document.getElementById('notionToken'),
    databaseId: document.getElementById('databaseId'),
    testConnection: document.getElementById('testConnection'),
    connectionStatus: document.getElementById('connectionStatus'),
    urlInput: document.getElementById('urlInput'),
    addBtn: document.getElementById('addBtn'),
    socialSelect: document.getElementById('socialSelect'),
    projectSelect: document.getElementById('projectSelect'),
    notesInput: document.getElementById('notesInput'),
    projectFilter: document.getElementById('projectFilter'),
    refreshBtn: document.getElementById('refreshBtn'),
    clearAllBtn: document.getElementById('clearAllBtn'),
    moodGrid: document.getElementById('moodGrid'),
    emptyState: document.getElementById('emptyState'),
    notesModal: document.getElementById('notesModal'),
    modalNotesInput: document.getElementById('modalNotesInput'),
    modalUrl: document.getElementById('modalUrl'),
    modalDate: document.getElementById('modalDate'),
    saveNotesBtn: document.getElementById('saveNotesBtn'),
    deleteItemBtn: document.getElementById('deleteItemBtn'),
    closeModalBtn: document.getElementById('closeModalBtn'),
    modalClose: document.querySelector('.modal-close'),
    toast: document.getElementById('toast'),
    totalCount: document.getElementById('totalCount'),
    filteredCount: document.getElementById('filteredCount'),
    loadingIndicator: document.getElementById('loadingIndicator'),
};

// ============= NOTION API =============

async function testNotionConnection() {
    const token = elements.notionToken.value;
    const dbId = elements.databaseId.value;

    if (!token || !dbId) {
        showToast('Preencha Token e Database ID', 'error');
        return;
    }

    showLoading(true);
    try {
        const response = await fetch(
            `https://api.notion.com/v1/databases/${dbId.replace(/-/g, '')}`,
            {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Notion-Version': '2022-06-28',
                    'Content-Type': 'application/json',
                },
            }
        );

        if (response.ok) {
            appState.notionToken = token;
            appState.databaseId = dbId;
            appState.isConnected = true;

            localStorage.setItem('notionToken', token);
            localStorage.setItem('databaseId', dbId);

            updateConnectionStatus(true);
            showToast('✅ Conectado ao Notion!', 'success');
            await loadItems();
        } else {
            const error = await response.json();
            showToast(`❌ Erro: ${error.message}`, 'error');
            updateConnectionStatus(false);
        }
    } catch (error) {
        console.error('Erro ao conectar:', error);
        showToast('❌ Erro de conexão. Verifique token e ID.', 'error');
        updateConnectionStatus(false);
    } finally {
        showLoading(false);
    }
}

function updateConnectionStatus(connected) {
    appState.isConnected = connected;
    if (connected) {
        elements.connectionStatus.textContent = '✅ Conectado';
        elements.connectionStatus.classList.add('connected');
        elements.connectionStatus.classList.remove('disconnected');
    } else {
        elements.connectionStatus.textContent = '❌ Desconectado';
        elements.connectionStatus.classList.add('disconnected');
        elements.connectionStatus.classList.remove('connected');
    }
}

async function loadItems() {
    if (!appState.isConnected) {
        showToast('Configure Notion para carregar itens', 'error');
        return;
    }

    showLoading(true);
    try {
        const dbId = appState.databaseId.replace(/-/g, '');
        const response = await fetch(
            `https://api.notion.com/v1/databases/${dbId}/query`,
            {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${appState.notionToken}`,
                    'Notion-Version': '2022-06-28',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    sorts: [
                        {
                            property: 'Data Salva',
                            direction: 'descending',
                        },
                    ],
                }),
            }
        );

        if (response.ok) {
            const data = await response.json();
            appState.items = data.results.map(page => ({
                id: page.id,
                url: page.properties['URL Origem']?.url || '',
                thumbnail: page.properties['Thumbnail']?.files?.[0]?.file?.url || '',
                social: page.properties['Rede Social']?.select?.name || 'Outro',
                project: page.properties['Projeto/Cliente']?.select?.name || 'Sem projeto',
                notes: page.properties['Notas']?.rich_text?.map(t => t.plain_text).join('') || '',
                dateSaved: page.properties['Data Salva']?.created_time || new Date().toISOString(),
            }));

            renderGrid();
            updateStats();
        } else {
            const error = await response.json();
            console.error('Erro ao carregar:', error);
            showToast('Erro ao carregar itens', 'error');
        }
    } catch (error) {
        console.error('Erro:', error);
        showToast('Erro na requisição', 'error');
    } finally {
        showLoading(false);
    }
}

async function addItemToNotion(url, thumbnail, social, project, notes) {
    if (!appState.isConnected) {
        showToast('Configure Notion para adicionar itens', 'error');
        return;
    }

    showLoading(true);
    try {
        const dbId = appState.databaseId.replace(/-/g, '');
        const response = await fetch('https://api.notion.com/v1/pages', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${appState.notionToken}`,
                'Notion-Version': '2022-06-28',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                parent: { database_id: dbId },
                properties: {
                    'URL Origem': {
                        url: url,
                    },
                    'Rede Social': {
                        select: {
                            name: social || 'Outro',
                        },
                    },
                    'Projeto/Cliente': {
                        select: {
                            name: project || 'Sem projeto',
                        },
                    },
                    'Notas': {
                        rich_text: [
                            {
                                text: {
                                    content: notes || '',
                                },
                            },
                        ],
                    },
                },
                cover: thumbnail
                    ? {
                          external: {
                              url: thumbnail,
                          },
                      }
                    : undefined,
            }),
        });

        if (response.ok) {
            const newPage = await response.json();
            const newItem = {
                id: newPage.id,
                url: url,
                thumbnail: thumbnail,
                social: social || 'Outro',
                project: project || 'Sem projeto',
                notes: notes || '',
                dateSaved: new Date().toISOString(),
            };

            appState.items.unshift(newItem);
            renderGrid();
            updateStats();
            showToast('✅ Adicionado ao Mood Board!', 'success');
            clearForm();
        } else {
            const error = await response.json();
            console.error('Erro ao adicionar:', error);
            showToast(`❌ Erro: ${error.message}`, 'error');
        }
    } catch (error) {
        console.error('Erro:', error);
        showToast('❌ Erro ao adicionar item', 'error');
    } finally {
        showLoading(false);
    }
}

async function updateItemInNotion(pageId, notes) {
    if (!appState.isConnected) return;

    try {
        const response = await fetch(
            `https://api.notion.com/v1/pages/${pageId.replace(/-/g, '')}`,
            {
                method: 'PATCH',
                headers: {
                    'Authorization': `Bearer ${appState.notionToken}`,
                    'Notion-Version': '2022-06-28',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    properties: {
                        'Notas': {
                            rich_text: [
                                {
                                    text: {
                                        content: notes,
                                    },
                                },
                            ],
                        },
                    },
                }),
            }
        );

        if (response.ok) {
            const item = appState.items.find(i => i.id === pageId);
            if (item) {
                item.notes = notes;
            }
            showToast('✅ Notas atualizadas!', 'success');
        }
    } catch (error) {
        console.error('Erro ao atualizar:', error);
        showToast('❌ Erro ao atualizar notas', 'error');
    }
}

async function deleteItemFromNotion(pageId) {
    if (!appState.isConnected) return;

    showLoading(true);
    try {
        const response = await fetch(
            `https://api.notion.com/v1/pages/${pageId.replace(/-/g, '')}`,
            {
                method: 'PATCH',
                headers: {
                    'Authorization': `Bearer ${appState.notionToken}`,
                    'Notion-Version': '2022-06-28',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    archived: true,
                }),
            }
        );

        if (response.ok) {
            appState.items = appState.items.filter(i => i.id !== pageId);
            renderGrid();
            updateStats();
            showToast('✅ Item deletado!', 'success');
            closeModal();
        }
    } catch (error) {
        console.error('Erro ao deletar:', error);
        showToast('❌ Erro ao deletar item', 'error');
    } finally {
        showLoading(false);
    }
}

// ============= URL & PREVIEW EXTRACTION =============

function detectSocialNetwork(url) {
    if (url.includes('instagram.com')) {
        if (url.includes('/reel/')) return 'Reels';
        if (url.includes('/stories/')) return 'Instagram';
        return 'Instagram';
    }
    if (url.includes('tiktok.com') || url.includes('vt.tiktok.com')) return 'TikTok';
    if (url.includes('youtube.com') || url.includes('youtu.be')) return 'YouTube';
    if (url.includes('twitter.com') || url.includes('x.com')) return 'Twitter';
    if (url.includes('linkedin.com')) return 'LinkedIn';
    if (url.includes('facebook.com')) return 'Facebook';
    return 'Blog';
}

async function extractPreview(url) {
    try {
        // Tentar obter og:image usando um serviço gratuito (workaround CORS)
        // Usamos a API do site com suporte a CORS
        const response = await fetch(`https://www.linkpreview.net/?url=${encodeURIComponent(url)}`);

        if (response.ok) {
            const html = await response.text();
            // Parse og:image do HTML
            const ogImageMatch = html.match(/og:image"?\s+content="([^"]+)"/);
            if (ogImageMatch && ogImageMatch[1]) {
                return ogImageMatch[1];
            }
        }

        // Fallback: retornar URL genérica de placeholder
        return getPlaceholderImage(detectSocialNetwork(url));
    } catch (error) {
        console.log('Preview não disponível, usando placeholder');
        return getPlaceholderImage(detectSocialNetwork(url));
    }
}

function getPlaceholderImage(social) {
    const placeholders = {
        Instagram: 'https://via.placeholder.com/400x500/E1306C/FFFFFF?text=Instagram',
        Reels: 'https://via.placeholder.com/400x500/E1306C/FFFFFF?text=Reels',
        Carrossel: 'https://via.placeholder.com/400x500/E1306C/FFFFFF?text=Carousel',
        TikTok: 'https://via.placeholder.com/400x500/000000/FFFFFF?text=TikTok',
        YouTube: 'https://via.placeholder.com/400x500/FF0000/FFFFFF?text=YouTube',
        Blog: 'https://via.placeholder.com/400x500/6366F1/FFFFFF?text=Blog',
        Outro: 'https://via.placeholder.com/400x500/808080/FFFFFF?text=Referência',
    };
    return placeholders[social] || placeholders.Outro;
}

function isValidUrl(url) {
    try {
        new URL(url);
        return true;
    } catch {
        return false;
    }
}

// ============= GRID RENDERING =============

function renderGrid() {
    const filter = elements.projectFilter.value;
    appState.filteredItems = filter
        ? appState.items.filter(item => item.project === filter)
        : appState.items;

    elements.moodGrid.innerHTML = '';

    if (appState.filteredItems.length === 0) {
        elements.emptyState.style.display = 'block';
        return;
    }

    elements.emptyState.style.display = 'none';

    appState.filteredItems.forEach(item => {
        const card = createCard(item);
        elements.moodGrid.appendChild(card);
    });
}

function createCard(item) {
    const card = document.createElement('div');
    card.className = 'mood-card';
    card.innerHTML = `
        <img src="${item.thumbnail}" alt="${item.social}" class="mood-card-image" onerror="this.src='${getPlaceholderImage(item.social)}'">
        <div class="mood-card-badge">${item.social}</div>
        <div class="mood-card-overlay">
            <div class="mood-card-buttons">
                <button class="card-btn" onclick="openItemInOriginal('${item.url}')">🔗 Original</button>
                <button class="card-btn" onclick="copyToClipboard('${item.url}')">📋 Copiar</button>
                <button class="card-btn" onclick="openNotesModal('${item.id}')">📝 Notas</button>
            </div>
        </div>
        <div class="mood-card-info">
            <div class="mood-card-title">${item.project}</div>
            <div class="mood-card-meta">${formatDate(item.dateSaved)}</div>
        </div>
    `;

    card.addEventListener('click', (e) => {
        if (!e.target.closest('.card-btn')) {
            openNotesModal(item.id);
        }
    });

    return card;
}

// ============= MODAL =============

function openNotesModal(itemId) {
    const item = appState.items.find(i => i.id === itemId);
    if (!item) return;

    appState.editingItemId = itemId;
    elements.modalUrl.textContent = item.url;
    elements.modalDate.textContent = formatDate(item.dateSaved);
    elements.modalNotesInput.value = item.notes;

    elements.notesModal.classList.remove('hidden');
}

function closeModal() {
    elements.notesModal.classList.add('hidden');
    appState.editingItemId = null;
}

function saveNotes() {
    if (!appState.editingItemId) return;

    const notes = elements.modalNotesInput.value;
    updateItemInNotion(appState.editingItemId, notes);
    closeModal();
}

// ============= FORM HANDLING =============

async function handleAddItem() {
    const url = elements.urlInput.value.trim();

    if (!url) {
        showToast('Cole uma URL válida', 'error');
        return;
    }

    if (!isValidUrl(url)) {
        showToast('URL inválida', 'error');
        return;
    }

    showLoading(true);

    const social = elements.socialSelect.value || detectSocialNetwork(url);
    const project = elements.projectSelect.value || 'Sem projeto';
    const notes = elements.notesInput.value.trim();

    try {
        const thumbnail = await extractPreview(url);
        await addItemToNotion(url, thumbnail, social, project, notes);
    } catch (error) {
        console.error('Erro ao processar URL:', error);
        showToast('❌ Erro ao processar URL', 'error');
    } finally {
        showLoading(false);
    }
}

function clearForm() {
    elements.urlInput.value = '';
    elements.socialSelect.value = '';
    elements.projectSelect.value = '';
    elements.notesInput.value = '';
}

// ============= UTILITIES =============

function showToast(message, type = 'info') {
    elements.toast.textContent = message;
    elements.toast.className = `toast ${type}`;
    elements.toast.classList.remove('hidden');

    setTimeout(() => {
        elements.toast.classList.add('hidden');
    }, 3000);
}

function showLoading(show) {
    if (show) {
        elements.loadingIndicator.classList.remove('hidden');
    } else {
        elements.loadingIndicator.classList.add('hidden');
    }
}

function formatDate(dateString) {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'Agora';
    if (diffMins < 60) return `${diffMins}m atrás`;
    if (diffHours < 24) return `${diffHours}h atrás`;
    if (diffDays < 7) return `${diffDays}d atrás`;

    return date.toLocaleDateString('pt-BR');
}

function openItemInOriginal(url) {
    window.open(url, '_blank');
}

function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        showToast('✅ URL copiada!', 'success');
    });
}

function updateStats() {
    elements.totalCount.textContent = appState.items.length;
    elements.filteredCount.textContent = appState.filteredItems.length;
}

// ============= LOAD DEMO DATA =============

async function loadDemoData() {
    const demoItems = [
        {
            url: 'https://www.instagram.com/p/sample1/',
            thumbnail: 'https://via.placeholder.com/400x500/FF6B6B/FFFFFF?text=Post+1',
            social: 'Instagram',
            project: 'Cliente A',
            notes: 'Gancho visual forte com cores contrastantes. CTA claro no final.',
        },
        {
            url: 'https://www.tiktok.com/@sample',
            thumbnail: 'https://via.placeholder.com/400x500/000000/FFFFFF?text=TikTok+Viral',
            social: 'TikTok',
            project: 'Tendências',
            notes: 'Formato curto (15s), transição rápida, trending sound.',
        },
        {
            url: 'https://www.instagram.com/reel/sample/',
            thumbnail: 'https://via.placeholder.com/400x500/E1306C/FFFFFF?text=Reels',
            social: 'Reels',
            project: 'Cliente B',
            notes: 'Padrão 9:16, 30s, hook nos primeiros 3s.',
        },
        {
            url: 'https://www.youtube.com/watch?v=sample',
            thumbnail: 'https://via.placeholder.com/400x500/FF0000/FFFFFF?text=YouTube',
            social: 'YouTube',
            project: 'Competidores',
            notes: 'Thumbnail com texto grande e emoção clara.',
        },
        {
            url: 'https://blog.exemplo.com/post',
            thumbnail: 'https://via.placeholder.com/400x500/6366F1/FFFFFF?text=Blog+Design',
            social: 'Blog',
            project: 'Projeto Pessoal',
            notes: 'Layout limpo, tipografia hierárquica clara.',
        },
    ];

    appState.items = demoItems;
    renderGrid();
    updateStats();
    showToast('📚 Dados de demo carregados!', 'success');
}

// ============= EVENT LISTENERS =============

document.addEventListener('DOMContentLoaded', () => {
    // Config Section
    elements.testConnection.addEventListener('click', testNotionConnection);

    // Add Item
    elements.addBtn.addEventListener('click', handleAddItem);
    elements.urlInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') handleAddItem();
    });

    // Filters
    elements.projectFilter.addEventListener('change', renderGrid);
    elements.refreshBtn.addEventListener('click', loadItems);
    elements.clearAllBtn.addEventListener('click', () => {
        if (confirm('Tem certeza que deseja deletar TODOS os itens?')) {
            appState.items.forEach(item => deleteItemFromNotion(item.id));
        }
    });

    // Modal
    elements.saveNotesBtn.addEventListener('click', saveNotes);
    elements.deleteItemBtn.addEventListener('click', () => {
        if (confirm('Deletar este item?')) {
            deleteItemFromNotion(appState.editingItemId);
        }
    });
    elements.closeModalBtn.addEventListener('click', closeModal);
    elements.modalClose.addEventListener('click', closeModal);

    // Demo data button (para testes)
    window.loadDemoData = loadDemoData;

    // Restore token and DB from localStorage
    if (appState.notionToken && appState.databaseId) {
        elements.notionToken.value = appState.notionToken;
        elements.databaseId.value = appState.databaseId;
    }
});

// Close modal on escape
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeModal();
    }
});
