// core/at-tab-manager.js — Versión Blindada 3.1
(function () {
    'use strict';

    const state = { tabs: [], activeId: null };
    // Referencias persistentes
    let tabBarRef, contentAreaRef;

    const t = (key) => window.__CPII__?.i18n?.t(key) ?? key;
    const emit = (name, detail = {}) => document.dispatchEvent(new CustomEvent(name, { detail, bubbles: true }));

    // 1. CONSTRUCTOR DEL OMNIBOX (Blindado)
    function createOmnibox() {
        const wrapper = document.createElement('div');
        wrapper.style.cssText = 'position: relative; display: flex; align-items: center; margin-left: auto;';

        const input = document.createElement('input');
        input.type = 'text';
        input.placeholder = t('search_placeholder') || 'Pesquisar...';
        input.style.cssText = 'height: 32px; padding: 0 12px; font-size: 13px; border-radius: 6px; border: 1px solid var(--theme-border); background: var(--theme-bg); color: var(--theme-text); outline: none; width: 260px;';

        const dropdown = document.createElement('ul');
        dropdown.style.cssText = 'position: absolute; top: 100%; right: 0; min-width: 260px; margin-top: 4px; background: var(--theme-surface); border: 1px solid var(--theme-border); border-radius: 6px; z-index: 999; display: none; padding: 0; list-style: none; overflow: hidden;';

        // Lógica de búsqueda
        input.addEventListener('input', () => {
            const query = input.value.trim();
            if (query.length < 1) { dropdown.style.display = 'none'; return; }
            emit('cpii:omnibox:search', { query });
        });

        document.addEventListener('cpii:omnibox:results', (e) => {
            const ids = e.detail.ids || [];
            const registry = window.__CPII__.RESOURCE_REGISTRY || {};
            dropdown.innerHTML = '';

            if (ids.length === 0) {
                dropdown.innerHTML = '<li style="padding: 10px; color: #666; font-size: 12px;">Sin resultados</li>';
            } else {
                ids.forEach(id => {
                    const li = document.createElement('li');
                    li.textContent = t(registry[id]?.labelKey || id);
                    li.style.cssText = 'padding: 10px 15px; cursor: pointer; color: var(--theme-text-muted); border-bottom: 1px solid var(--theme-border); font-size: 13px;';
                    li.addEventListener('mouseenter', () => li.style.background = 'var(--theme-surface-hover)');
                    li.addEventListener('mouseleave', () => li.style.background = 'transparent');
                    li.addEventListener('mousedown', (ev) => {
                        ev.preventDefault();
                        openFromRegistry(id);
                        input.value = '';
                        dropdown.style.display = 'none';
                    });
                    dropdown.appendChild(li);
                });
            }
            dropdown.style.display = 'block';
        });

        // Cerrar al hacer clic fuera
        document.addEventListener('click', (e) => {
            if (!wrapper.contains(e.target)) dropdown.style.display = 'none';
        });

        wrapper.appendChild(input);
        wrapper.appendChild(dropdown);
        return wrapper;
    }

    // 2. CONSTRUCTOR DE LA ESTRUCTURA
    function buildInterface() {
        const orbitCanvas = document.getElementById('canvas-orbita-2');
        if (!orbitCanvas) return;

        // Crear Barra (CONTRASTE MEJORADO)
        tabBarRef = document.createElement('div');
        tabBarRef.id = 'cpii-tab-bar';
        tabBarRef.style.cssText = 'display: flex; align-items: center; gap: 8px; height: 64px; border-bottom: 1px solid var(--theme-border); background: var(--theme-ink); padding: 0 24px; width: 100%; z-index: 10;';

        // Crear Área de Contenido
        contentAreaRef = document.createElement('div');
        contentAreaRef.id = 'cpii-content-area';
        contentAreaRef.style.cssText = 'flex: 1; position: relative; overflow: auto; background: var(--theme-bg);';

        // Ensamblar
        tabBarRef.appendChild(createOmnibox());
        orbitCanvas.appendChild(tabBarRef);
        orbitCanvas.appendChild(contentAreaRef);
    }

    // 3. GESTIÓN DE PESTAÑAS (Blindada)
    function openFromRegistry(id) {
        const res = window.__CPII__?.RESOURCE_REGISTRY?.[id];
        if (!res) return;

        // Si ya existe, activar
        if (state.tabs.find(t => t.id === id)) return activateTab(id);

        const node = document.createElement(res.tag);
        node.style.display = 'none';
        contentAreaRef.appendChild(node);

        const tab = { id, labelKey: res.labelKey, node };
        state.tabs.push(tab);

        // Crear pestaña visual
        const tabEl = document.createElement('div');
        tabEl.dataset.id = id;
        tabEl.style.cssText = 'display: flex; align-items: center; gap: 8px; padding: 0 15px; height: 36px; background: transparent; border: 1px solid transparent; border-radius: 6px; color: rgba(255,255,255,0.5); cursor: pointer; font-size: 13px; transition: all 0.2s;';
        tabEl.innerHTML = `<span>${t(res.labelKey)}</span><b style="margin-left:8px; opacity:0.5; font-weight:normal;">&times;</b>`;

        tabEl.addEventListener('click', () => activateTab(id));
        tabEl.querySelector('b').addEventListener('click', (e) => {
            e.stopPropagation();
            closeTab(id);
        });

        // Insertar antes del buscador
        tabBarRef.insertBefore(tabEl, tabBarRef.lastChild);
        activateTab(id);
    }

    function activateTab(id) {
        state.tabs.forEach(t => {
            t.node.style.display = t.id === id ? 'block' : 'none';
            const el = tabBarRef.querySelector(`[data-id="${t.id}"]`);
            if (el) {
                el.style.color = t.id === id ? 'var(--theme-border-active)' : 'rgba(255,255,255,0.5)';
                el.style.borderColor = t.id === id ? 'var(--theme-border-active)' : 'transparent';
                el.style.background = t.id === id ? 'rgba(255,255,255,0.08)' : 'transparent';
            }
        });
        state.activeId = id;
    }

    function closeTab(id) {
        const idx = state.tabs.findIndex(t => t.id === id);
        if (idx === -1) return;
        state.tabs[idx].node.remove();
        tabBarRef.querySelector(`[data-id="${id}"]`).remove();
        state.tabs.splice(idx, 1);
        if (state.activeId === id && state.tabs.length > 0) activateTab(state.tabs[0].id);
    }

    // 4. INICIALIZACIÓN
    function init() {
        if (document.getElementById('cpii-tab-bar')) return;
        window.__CPII__ = window.__CPII__ || {};
        window.__CPII__.tabManager = { openFromRegistry };

        buildInterface();

        // Auto-apertura del Dashboard
        setTimeout(() => {
            if (window.__CPII__.RESOURCE_REGISTRY?.['dashboard']) {
                openFromRegistry('dashboard');
            }
        }, 600);
    }

    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
    else init();
})();