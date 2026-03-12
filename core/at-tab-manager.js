/**
 * CPII — at-tab-manager.js
 * Artifact: Gestor Universal de Pestañas (Órbita 2)
 * Ruta: core/at-tab-manager.js
 *
 * Responsabilidades:
 * - Registro agnóstico de gadgets (gd-*)
 * - Renderiza y gestiona la barra de pestañas en Órbita 2
 * - Inyecta/destruye Web Components en #cpii-workspace
 * - Persistencia volátil (sessionStorage)
 * - Emite eventos: cpii:tab:open | cpii:tab:close | cpii:tab:change
 *
 * Doctrina: R0 Sin hardcode | R3 Solo var(--theme-*) | R4 data-i18n obligatorio
 */
(function () {
    'use strict';

    // ── Registro de gadgets disponibles ──────────────────────
    // Añadir aquí cada nuevo gd-* que se incorpore al ecosistema
    const GADGET_REGISTRY = {
        'gd-manual': {
            labelKey: 'tab_manual',
            labelFallback: 'Manual'
        },
        'gd-simulador': {
            labelKey: 'tab_simulador',
            labelFallback: 'Simulador'
        },
        'gd-calculadora': {
            labelKey: 'tab_calculadora',
            labelFallback: 'Calculadora'
        }
    };

    // ── Estado interno (volátil — sessionStorage) ─────────────
    const SESSION_KEY = 'cpii:tabs';

    function loadState() {
        try {
            return JSON.parse(sessionStorage.getItem(SESSION_KEY)) || { tabs: [], activeId: null };
        } catch {
            return { tabs: [], activeId: null };
        }
    }

    function saveState(state) {
        sessionStorage.setItem(SESSION_KEY, JSON.stringify(state));
    }

    let state = loadState();

    // ── Helpers ───────────────────────────────────────────────
    function getLabel(tagName) {
        const entry = GADGET_REGISTRY[tagName];
        if (!entry) return tagName;
        if (window.__CPII__?.i18n?.t) {
            return window.__CPII__.i18n.t(entry.labelKey) || entry.labelFallback;
        }
        return entry.labelFallback;
    }

    function generateId(tagName) {
        return `${tagName}-${Date.now()}`;
    }

    function emit(eventName, detail) {
        document.dispatchEvent(new CustomEvent(eventName, { detail, bubbles: true }));
    }

    // ── DOM refs ──────────────────────────────────────────────
    function getCanvas() { return document.getElementById('canvas-orbita-2'); }
    function getTabBar() { return document.querySelector('.cpii-tab-bar'); }
    function getWorkspace() { return document.querySelector('.cpii-workspace'); }

    // ── Inicializar estructura en Órbita 2 ────────────────────
    function initDOM() {
        const canvas = getCanvas();
        if (!canvas) return;

        if (!getTabBar()) {
            const nav = document.createElement('nav');
            nav.className = 'cpii-tab-bar';
            nav.setAttribute('role', 'tablist');
            canvas.prepend(nav);
        }

        if (!getWorkspace()) {
            const ws = document.createElement('div');
            ws.className = 'cpii-workspace';
            canvas.appendChild(ws);
        }
    }

    // ── Renderizar barra de pestañas ──────────────────────────
    function renderTabBar() {
        const tabBar = getTabBar();
        if (!tabBar) return;

        tabBar.innerHTML = '';

        state.tabs.forEach(tab => {
            const btn = document.createElement('button');
            btn.className = 'cpii-tab' + (tab.id === state.activeId ? ' is-active' : '');
            btn.dataset.tabId = tab.id;
            btn.setAttribute('role', 'tab');
            btn.setAttribute('aria-selected', String(tab.id === state.activeId));

            const labelSpan = document.createElement('span');
            labelSpan.className = 'cpii-tab__label';
            labelSpan.textContent = tab.label;

            const closeBtn = document.createElement('button');
            closeBtn.className = 'cpii-tab__close';
            closeBtn.setAttribute('aria-label', 'Cerrar pestaña');
            closeBtn.textContent = '×';
            closeBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                tabManager.close(tab.id);
            });

            btn.appendChild(labelSpan);
            btn.appendChild(closeBtn);
            btn.addEventListener('click', () => tabManager.activate(tab.id));

            tabBar.appendChild(btn);
        });
    }

    // ── Renderizar workspace ──────────────────────────────────
    function renderWorkspace() {
        const ws = getWorkspace();
        if (!ws) return;

        Array.from(ws.children).forEach(el => {
            el.style.display = 'none';
        });

        if (state.activeId) {
            const activeEl = ws.querySelector(`[data-tab-id="${state.activeId}"]`);
            if (activeEl) activeEl.style.display = '';
        }
    }

    // ── API pública ───────────────────────────────────────────
    const tabManager = {

        /**
         * Abrir un gadget como pestaña
         * @param {string} tagName — nombre del Web Component (ej. 'gd-manual')
         * @param {object} props   — propiedades opcionales a pasar al componente
         */
        open(tagName, props = {}) {
            // Si ya existe una pestaña de este tipo, activarla (no duplicar)
            const existing = state.tabs.find(t => t.tagName === tagName);
            if (existing) {
                this.activate(existing.id);
                return;
            }

            if (!GADGET_REGISTRY[tagName]) {
                console.warn(`[TabManager] Gadget no registrado: ${tagName}`);
                return;
            }

            const id = generateId(tagName);
            const label = getLabel(tagName);

            state.tabs.push({ id, tagName, label });
            state.activeId = id;
            saveState(state);

            const ws = getWorkspace();
            const gadget = document.createElement(tagName);
            gadget.dataset.tabId = id;

            Object.entries(props).forEach(([key, val]) => {
                gadget.setAttribute(key, val);
            });

            ws.appendChild(gadget);

            renderTabBar();
            renderWorkspace();
            emit('cpii:tab:open', { id, tagName, label });
        },

        /**
         * Activar una pestaña existente
         * @param {string} id
         */
        activate(id) {
            if (!state.tabs.find(t => t.id === id)) return;
            state.activeId = id;
            saveState(state);
            renderTabBar();
            renderWorkspace();
            emit('cpii:tab:change', { id });
        },

        /**
         * Cerrar una pestaña
         * @param {string} id
         */
        close(id) {
            const idx = state.tabs.findIndex(t => t.id === id);
            if (idx === -1) return;

            const { tagName, label } = state.tabs[idx];

            const ws = getWorkspace();
            const gadget = ws?.querySelector(`[data-tab-id="${id}"]`);
            if (gadget) gadget.remove();

            state.tabs.splice(idx, 1);

            if (state.activeId === id) {
                state.activeId = state.tabs[Math.min(idx, state.tabs.length - 1)]?.id || null;
            }

            saveState(state);
            renderTabBar();
            renderWorkspace();
            emit('cpii:tab:close', { id, tagName, label });
        },

        /**
         * Cerrar todas las pestañas
         */
        closeAll() {
            state.tabs = [];
            state.activeId = null;
            saveState(state);
            const ws = getWorkspace();
            if (ws) ws.innerHTML = '';
            renderTabBar();
        },

        getState() {
            return { ...state };
        }
    };

    // ── Inicialización ────────────────────────────────────────
    function init() {
        initDOM();

        if (state.tabs.length > 0) {
            const ws = getWorkspace();
            state.tabs.forEach(tab => {
                const gadget = document.createElement(tab.tagName);
                gadget.dataset.tabId = tab.id;
                ws.appendChild(gadget);
            });
            renderTabBar();
            renderWorkspace();
        }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    // ── Exponer API global ────────────────────────────────────
    window.__CPII__ = window.__CPII__ || {};
    window.__CPII__.tabManager = tabManager;

})();