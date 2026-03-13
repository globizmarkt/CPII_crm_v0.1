(function () {
    'use strict';
    const state = { tabs: [], activeId: null };
    let tabBar, contentArea, omniboxInput, omniboxDropdown;

    function t(key) { return window.__CPII__?.i18n?.t(key) ?? key; }
    function emit(name, detail = {}) { document.dispatchEvent(new CustomEvent(name, { detail, bubbles: true })); }

    function buildOmnibox() {
        const wrapper = document.createElement('div');
        wrapper.style.cssText = `position: relative; display: flex; align-items: center; margin-left: auto;`;

        omniboxInput = document.createElement('input');
        omniboxInput.type = 'text';
        omniboxInput.placeholder = t('search_placeholder') || 'Buscar recursos...';
        // Estilos de Tailwind inyectados para integrarse con tu CSS
        omniboxInput.className = "bg-transparent border border-slate-700 rounded-md text-sm text-slate-300 focus:ring-1 focus:ring-primary w-64 h-8 px-3 ml-4";

        omniboxDropdown = document.createElement('ul');
        omniboxDropdown.className = "absolute right-0 bg-[#1e1b14] border border-[#c1a85c]/20 rounded-md shadow-lg z-50 text-sm text-slate-300 w-64";
        omniboxDropdown.style.top = "calc(100% + 4px)";
        omniboxDropdown.style.display = 'none';

        omniboxInput.addEventListener('input', () => {
            const query = omniboxInput.value.trim();
            if (query.length < 1) { hideDropdown(); return; }
            emit('cpii:omnibox:search', { query });
        });

        document.addEventListener('cpii:omnibox:results', (e) => {
            const ids = e.detail.ids || [];
            const registry = window.__CPII__.RESOURCE_REGISTRY || {};
            renderDropdown(ids.map(id => ({ id, labelKey: registry[id]?.labelKey || id })));
        });

        document.addEventListener('click', (e) => { if (!wrapper.contains(e.target)) hideDropdown(); });

        wrapper.appendChild(omniboxInput);
        wrapper.appendChild(omniboxDropdown);
        return wrapper;
    }

    function renderDropdown(results) {
        omniboxDropdown.innerHTML = '';
        if (results.length === 0) {
            omniboxDropdown.innerHTML = `<li class="px-4 py-2 text-slate-500">Sin resultados</li>`;
        } else {
            results.forEach((item) => {
                const li = document.createElement('li');
                li.textContent = t(item.labelKey);
                li.className = "px-4 py-2 cursor-pointer hover:bg-[#c1a85c]/10 hover:text-white transition-colors";
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

    function hideDropdown() { omniboxDropdown.style.display = 'none'; }

    function buildTabBar() {
        tabBar = document.createElement('div');
        // Adaptado a tu header original
        tabBar.className = "flex items-center gap-2 px-8 border-b border-primary/5 h-16 w-full";

        contentArea = document.createElement('div');
        contentArea.className = "flex-1 overflow-auto relative p-6";

        // AQUI ESTA LA CORRECCIÓN DEL ID
        const orbitCanvas = document.getElementById('canvas-orbita-2');
        if (!orbitCanvas) return console.warn('[TabManager] #canvas-orbita-2 no encontrado.');

        tabBar.appendChild(buildOmnibox());
        orbitCanvas.appendChild(tabBar);
        orbitCanvas.appendChild(contentArea);
    }

    function renderTabItem(tab) {
        const item = document.createElement('div');
        item.dataset.tabId = tab.id;
        item.className = "flex items-center gap-2 px-4 h-8 rounded-md text-sm cursor-pointer border border-transparent text-slate-400 transition-colors";

        const label = document.createElement('span');
        label.textContent = t(tab.labelKey);

        const closeBtn = document.createElement('button');
        closeBtn.innerHTML = '&times;';
        closeBtn.className = "hover:text-white ml-2";
        closeBtn.addEventListener('click', (e) => { e.stopPropagation(); closeTab(tab.id); });

        item.appendChild(label);
        item.appendChild(closeBtn);
        item.addEventListener('click', () => activateTab(tab.id));
        tabBar.insertBefore(item, tabBar.querySelector('div')); // inserta antes del wrapper del omnibox
        return item;
    }

    function activateTab(id) {
        state.tabs.forEach((tab) => {
            tab.node.style.display = tab.id === id ? '' : 'none';
            const tabEl = tabBar.querySelector(`[data-tab-id="${tab.id}"]`);
            if (tabEl) {
                if (tab.id === id) {
                    tabEl.classList.add('bg-[#1e1b14]', 'border-[#c1a85c]/20', 'text-white');
                    tabEl.classList.remove('text-slate-400', 'border-transparent');
                } else {
                    tabEl.classList.remove('bg-[#1e1b14]', 'border-[#c1a85c]/20', 'text-white');
                    tabEl.classList.add('text-slate-400', 'border-transparent');
                }
            }
        });
        state.activeId = id;
    }

    function openFromRegistry(resourceId) {
        const registry = window.__CPII__?.RESOURCE_REGISTRY;
        const resource = registry?.[resourceId];
        if (!resource) return;

        if (state.tabs.find((t) => t.id === resourceId)) return activateTab(resourceId);

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
        state.tabs[idx].node.remove();
        tabBar.querySelector(`[data-tab-id="${id}"]`)?.remove();
        state.tabs.splice(idx, 1);
        if (state.activeId === id) activateTab(state.tabs[idx]?.id || state.tabs[idx - 1]?.id);
    }

    document.addEventListener('DOMContentLoaded', () => {
        window.__CPII__ = window.__CPII__ || {};
        window.__CPII__.tabManager = { openFromRegistry };
        buildTabBar();
    });
})();