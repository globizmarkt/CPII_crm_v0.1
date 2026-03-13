// core/at-tab-manager.js — CPII Tab Manager v3.0 (Corregido)
(function () {
    'use strict';

    const state = {
        tabs: [],
        activeId: null,
    };

    let tabBar, contentArea, omniboxInput, omniboxDropdown;

    function t(key) {
        return window.__CPII__?.i18n?.t(key) ?? key;
    }

    function emit(name, detail = {}) {
        document.dispatchEvent(new CustomEvent(name, { detail, bubbles: true }));
    }

    function buildOmnibox() {
        const wrapper = document.createElement('div');
        wrapper.className = 'cpii-omnibox-wrapper';
        wrapper.style.cssText = `position: relative; display: flex; align-items: center; margin-left: auto;`;

        omniboxInput = document.createElement('input');
        omniboxInput.type = 'text';
        omniboxInput.placeholder = t('search_placeholder') || 'Pesquisar...';
        // Estilos alineados a tu diseño original
        omniboxInput.style.cssText = `
      height: 32px; padding: 0 12px; font-size: 13px; border-radius: 6px;
      border: 1px solid var(--theme-border, #333); background: transparent; 
      color: var(--theme-text, #ccc); outline: none; width: 260px;
    `;

        omniboxDropdown = document.createElement('ul');
        omniboxDropdown.style.cssText = `
      position: absolute; top: calc(100% + 4px); right: 0; min-width: 260px;
      margin: 0; padding: 4px 0; list-style: none; background: #1e1b14;
      border: 1px solid rgba(193, 168, 93, 0.2); border-radius: 6px; z-index: 200; display: none;
    `;

        omniboxInput.addEventListener('input', () => {
            const query = omniboxInput.value.trim();
            if (query.length < 1) { hideDropdown(); return; }
            emit('cpii:omnibox:search', { query });
        });

        // CORRECCIÓN APLICADA: Mapear IDs a Objetos
        document.addEventListener('cpii:omnibox:results', (e) => {
            const ids = e.detail.ids || [];
            const registry = window.__CPII__.RESOURCE_REGISTRY || {};
            const resultsForRender = ids.map(id => ({
                id,
                labelKey: registry[id]?.labelKey || id
            }));
            renderDropdown(resultsForRender);
        });

        document.addEventListener('click', (e) => {
            if (!wrapper.contains(e.target)) hideDropdown();
        });

        wrapper.appendChild(omniboxInput);
        wrapper.appendChild(omniboxDropdown);
        return wrapper;
    }

    function renderDropdown(results) {
        omniboxDropdown.innerHTML = '';
        if (results.length === 0) {
            const empty = document.createElement('li');
            empty.textContent = 'Sin resultados';
            empty.style.cssText = `padding: 8px 12px; font-size: 13px; color: #888; pointer-events: none;`;
            omniboxDropdown.appendChild(empty);
        } else {
            results.forEach((item) => {
                const li = document.createElement('li');
                li.textContent = t(item.labelKey) || item.id;
                li.dataset.resourceId = item.id;
                li.style.cssText = `padding: 8px 14px; font-size: 13px; color: #ccc; cursor: pointer;`;
                li.addEventListener('mouseenter', () => li.style.background = 'rgba(193, 168, 93, 0.1)');
                li.addEventListener('mouseleave', () => li.style.background = 'transparent');
                li.addEventListener('mousedown', (e) => {
                    e.preventDefault();
                    openFromRegistry(item.id);
                    omniboxInput.value = '';
                    hideDropdown();
                });
                omniboxDropdown.appendChild(li);
            });
        }
        omniboxDropdown.style.display = 'block';
    }

    function hideDropdown() {
        omniboxDropdown.style.display = 'none';
    }

    function buildTabBar() {
        tabBar = document.createElement('div');
        tabBar.id = 'cpii-tab-bar';
        tabBar.style.cssText = `
      display: flex; align-items: center; gap: 4px; padding: 0 24px; 
      height: 64px; border-bottom: 1px solid rgba(193, 168, 93, 0.1); width: 100%;
    `;

        contentArea = document.createElement('div');
        contentArea.id = 'cpii-content-area';
        contentArea.style.cssText = `flex: 1; overflow: auto; position: relative; padding: 24px;`;

        // CORRECCIÓN: Apuntando al div real de tu HTML
        const orbitCanvas = document.getElementById('canvas-orbita-2');
        if (!orbitCanvas) {
            console.warn('[TabManager] #canvas-orbita-2 no encontrado.');
            return;
        }

        tabBar.appendChild(buildOmnibox());
        orbitCanvas.appendChild(tabBar);
        orbitCanvas.appendChild(contentArea);
    }

    function renderTabItem(tab) {
        const item = document.createElement('div');
        item.className = 'cpii-tab-item';
        item.dataset.tabId = tab.id;
        item.style.cssText = `
      display: flex; align-items: center; gap: 8px; padding: 0 16px; height: 36px;
      font-size: 13px; color: #888; border-radius: 6px; cursor: pointer; border: 1px solid transparent;
    `;

        const label = document.createElement('span');
        label.textContent = t(tab.labelKey) || tab.id;

        const closeBtn = document.createElement('button');
        closeBtn.innerHTML = '&times;';
        closeBtn.style.cssText = `background: none; border: none; color: inherit; cursor: pointer; font-size: 16px;`;
        closeBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            closeTab(tab.id);
        });

        item.appendChild(label);
        item.appendChild(closeBtn);
        item.addEventListener('click', () => activateTab(tab.id));

        tabBar.insertBefore(item, tabBar.querySelector('.cpii-omnibox-wrapper'));
        return item;
    }

    function activateTab(id) {
        state.tabs.forEach((tab) => {
            tab.node.style.display = tab.id === id ? '' : 'none';
        });

        tabBar.querySelectorAll('.cpii-tab-item').forEach((el) => {
            const isActive = el.dataset.tabId === id;
            el.style.background = isActive ? '#1e1b14' : 'transparent';
            el.style.color = isActive ? '#fff' : '#888';
            el.style.borderColor = isActive ? 'rgba(193, 168, 93, 0.2)' : 'transparent';
        });
        state.activeId = id;
    }

    function openFromRegistry(resourceId) {
        const registry = window.__CPII__?.RESOURCE_REGISTRY;
        if (!registry) return;
        const resource = registry[resourceId];
        if (!resource) return;

        if (state.tabs.find((t) => t.id === resourceId)) {
            activateTab(resourceId);
            return;
        }

        const node = document.createElement(resource.tag);
        node.style.display = 'none';
        contentArea.appendChild(node);

        const tab = { id: resourceId, labelKey: resource.labelKey, node };
        state.tabs.push(tab);
        renderTabItem(tab);
        activateTab(resourceId);
    }

    function closeTab(id) {
        const idx = state.tabs.findIndex((t) => t.id === id);
        if (idx === -1) return;
        const [removed] = state.tabs.splice(idx, 1);
        removed.node.remove();
        tabBar.querySelector(`[data-tab-id="${id}"]`)?.remove();

        if (state.activeId === id) {
            const next = state.tabs[idx] ?? state.tabs[idx - 1];
            next ? activateTab(next.id) : (state.activeId = null);
        }
    }

    function init() {
        window.__CPII__ = window.__CPII__ ?? {};
        window.__CPII__.tabManager = { openFromRegistry, activateTab, closeTab };
        buildTabBar();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();