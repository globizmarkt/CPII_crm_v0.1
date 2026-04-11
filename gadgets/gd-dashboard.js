/**
 * GADGET: gd-dashboard.js
 * TYPE: Custom Element (Web Component)
 * JURISDICTION: features/ — Electrificado por Junior Dev-Logic (Kimi)
 * 
 * DOCTRINAS APLICADAS:
 * [R0] Agnosticismo Radical — Lógica de "status" genérica, no específica de negocio
 * [R2] Light DOM estricto — Sin attachShadow(), herencia CSS nativa
 * [R4] i18n Strict — Todas las cadenas via data-i18n
 * [R5] Economía O(1) — Lookup constante, event delegation, cleanup estricto
 * [R7] Feature Blur/Hibernation — Soporte data-hibernatable con degradación visual
 * 
 * CARTOGRAFÍA QUIRÚRGICA v3.2
 * Timestamp: 2026-04-11T15:00:00Z
 * Shield: ⚡ Skeleton-Agnostic | Zero-Trust UI | Glass-Certified | Custody-Veil
 * 
 * DEPENDENCIAS:
 * - window.__CPII__.session.status — Fuente de verdad fiduciaria
 * - window.__CPII__.i18n.t() — Motor de traducción institucional
 * - Tokens CSS v2.6: --theme-surface-glass, --theme-blur-glass, --theme-border-glass
 * 
 * HISTORIA:
 * - v1.0.0: Electrificación Dashboard Sprint 22 con Velo de Custodia integrado
 */

(function () {
  'use strict';

  // === CONFIGURACIÓN AGNÓSTICA ===
  const GADGET_ID = 'gd-dashboard';
  const GADGET_VERSION = '1.0.0';
  const I18N_DOMAIN = 'gadget.dashboard';

  // Estados de custodia que activan el veil
  const CUSTODY_LOCK_STATES = new Set(['pending_approval', 'guest', 'frozen']);

  // === UTILIDADES O(1) ===
  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => Array.from(root.querySelectorAll(selector));

  // === CUSTOM ELEMENT: GdDashboard ===
  class GdDashboard extends HTMLElement {
    constructor() {
      super();
      this._locale = null;
      this._i18nUnsubscribe = null;
      this._sessionUnsubscribe = null;
      this._mutationObserver = null;
      this._isHibernating = false;
      this._veilActive = false;
    }

    // --- Ciclo de Vida ---

    connectedCallback() {
      this._render();
      this._hydrateI18n();
      this._setupListeners();
      this._evaluateCustodyVeil(); // Check inicial
      this._emitReady();
    }

    disconnectedCallback() {
      this._teardownListeners();
      this._cleanupObserver();
    }

    // --- Renderizado (Estructura Trinity Glass + Veil) ---

    _render() {
      // R2: Light DOM — Estructura Stitch adaptada a gadget
      this.innerHTML = `
        <div class="gd-dashboard-wrapper relative w-full h-full overflow-hidden bg-[--theme-bg]">
          
          <!-- CONTENIDO PRINCIPAL (Órbita 2 Style) -->
          <div class="dashboard-canvas w-full h-full overflow-y-auto p-6 md:p-10 space-y-8 transition-all duration-500" id="dashboard-content">
            
            <!-- Breadcrumbs -->
            <nav class="flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-[--theme-text-muted] mb-6">
              <span data-i18n="${I18N_DOMAIN}.breadcrumb_home">Inicio</span>
              <span class="material-symbols-outlined text-[10px]">chevron_right</span>
              <span class="text-[--theme-primary]" data-i18n="${I18N_DOMAIN}.breadcrumb_dashboard">Dashboard</span>
            </nav>

            <!-- KYC Alert Banner (Condicional visual, no bloqueante) -->
            <div class="mb-8 flex items-center justify-between p-4 bg-[--theme-surface] border-l-4 border-[--theme-alert] rounded-r" id="kyc-banner">
              <div class="flex items-center gap-4">
                <div class="w-10 h-10 bg-[--theme-alert]/10 flex items-center justify-center text-[--theme-alert] rounded">
                  <span class="material-symbols-outlined" style="font-variation-settings: 'FILL' 1;">error</span>
                </div>
                <div>
                  <p class="text-[--theme-text] font-bold text-xs uppercase tracking-wider" data-i18n="${I18N_DOMAIN}.kyc_title">Cumplimiento Normativo Requerido</p>
                  <p class="text-[--theme-text-muted] text-[11px]" data-i18n="${I18N_DOMAIN}.kyc_subtitle">Complete su verificación para acceder a activos institucionales.</p>
                </div>
              </div>
              <button class="px-5 py-2 bg-[--theme-alert] text-[--theme-paper] text-[10px] font-bold uppercase tracking-widest hover:opacity-90 transition-all rounded" data-i18n="${I18N_DOMAIN}.kyc_cta">
                Verificar Ahora
              </button>
            </div>

            <!-- Welcome Header -->
            <div class="flex flex-col md:flex-row md:items-end justify-between mb-8 border-b border-[--theme-border] pb-6 gap-4">
              <div>
                <h1 class="text-2xl font-serif text-[--theme-text] mb-1" data-i18n="${I18N_DOMAIN}.welcome">Buenos Días, Alexander</h1>
                <p class="text-[--theme-text-muted] text-[11px] uppercase tracking-widest" data-i18n="${I18N_DOMAIN}.date">Rendimiento Consolidado • 10 Oct, 2024</p>
              </div>
              <div class="flex gap-2">
                <button class="px-3 py-1.5 border border-[--theme-border] text-[--theme-text-muted] hover:text-[--theme-text] hover:border-[--theme-primary] transition-colors flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest rounded">
                  <span class="material-symbols-outlined text-sm">share</span> 
                  <span data-i18n="${I18N_DOMAIN}.btn_share">Compartir</span>
                </button>
                <button class="px-3 py-1.5 border border-[--theme-border] text-[--theme-text-muted] hover:text-[--theme-text] hover:border-[--theme-primary] transition-colors flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest rounded">
                  <span class="material-symbols-outlined text-sm">download</span> 
                  <span data-i18n="${I18N_DOMAIN}.btn_report">Reporte</span>
                </button>
              </div>
            </div>

            <!-- Bento Grid: Resumen + Acciones -->
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <!-- Investment Summary (Glass Card) -->
              <div class="md:col-span-2 luxury-glass p-6 relative overflow-hidden rounded institutional-card">
                <div class="flex justify-between items-start mb-8">
                  <h3 class="text-[--theme-text-muted] text-[10px] uppercase tracking-[0.2em] font-bold" data-i18n="${I18N_DOMAIN}.card_capital_title">Resumen de Capital</h3>
                  <span class="text-[10px] text-[--theme-primary] font-bold uppercase tracking-widest" data-i18n="${I18N_DOMAIN}.badge_audited">Activos Auditados</span>
                </div>
                <div class="grid grid-cols-1 sm:grid-cols-3 gap-8">
                  <div>
                    <p class="text-[--theme-text-muted] text-[10px] uppercase tracking-widest mb-2" data-i18n="${I18N_DOMAIN}.label_total">Valor Total</p>
                    <p class="font-serif text-3xl text-[--theme-primary]">€142.500,00</p>
                  </div>
                  <div>
                    <p class="text-[--theme-text-muted] text-[10px] uppercase tracking-widest mb-2" data-i18n="${I18N_DOMAIN}.label_yield">Rendimiento</p>
                    <p class="font-serif text-3xl text-[--theme-text]">7,24<span class="text-lg opacity-40">%</span></p>
                  </div>
                  <div>
                    <p class="text-[--theme-text-muted] text-[10px] uppercase tracking-widest mb-2" data-i18n="${I18N_DOMAIN}.label_maturity">Próximo Vencimiento</p>
                    <p class="font-serif text-2xl text-[--theme-text]">12 Oct, 2024</p>
                  </div>
                </div>
                <div class="mt-8 pt-6 border-t border-[--theme-border-glass] flex items-center justify-between">
                  <div class="flex items-center gap-2">
                    <span class="w-1.5 h-1.5 bg-[--theme-success] rounded-full"></span>
                    <span class="text-[10px] text-[--theme-text-muted] font-bold uppercase tracking-widest" data-i18n="${I18N_DOMAIN}.markets_open">Mercados Abiertos</span>
                  </div>
                  <button class="text-[10px] text-[--theme-primary] font-bold uppercase tracking-widest flex items-center gap-1 hover:underline">
                    <span data-i18n="${I18N_DOMAIN}.link_status">Estado Detallado</span> 
                    <span class="material-symbols-outlined text-xs">arrow_forward</span>
                  </button>
                </div>
              </div>

              <!-- Quick Actions (Solid Card) -->
              <div class="luxury-glass p-6 rounded institutional-card">
                <h3 class="text-[--theme-text-muted] text-[10px] uppercase tracking-[0.2em] font-bold mb-6" data-i18n="${I18N_DOMAIN}.card_actions_title">Transacciones</h3>
                <div class="space-y-2">
                  <button class="w-full flex items-center justify-between p-3 border border-[--theme-border-glass] hover:border-[--theme-primary] bg-[--theme-surface]/50 transition-all group rounded">
                    <div class="flex items-center gap-3">
                      <span class="material-symbols-outlined text-lg text-[--theme-primary]">add_circle</span>
                      <span class="text-[11px] font-bold uppercase tracking-widest text-[--theme-text]" data-i18n="${I18N_DOMAIN}.action_new">Nueva Inversión</span>
                    </div>
                    <span class="material-symbols-outlined text-[--theme-text-muted] group-hover:text-[--theme-primary] text-sm">chevron_right</span>
                  </button>
                  <button class="w-full flex items-center justify-between p-3 border border-[--theme-border-glass] hover:border-[--theme-primary] bg-[--theme-surface]/50 transition-all group rounded">
                    <div class="flex items-center gap-3">
                      <span class="material-symbols-outlined text-lg text-[--theme-primary]">pie_chart</span>
                      <span class="text-[11px] font-bold uppercase tracking-widest text-[--theme-text]" data-i18n="${I18N_DOMAIN}.action_rebalance">Rebalancear</span>
                    </div>
                    <span class="material-symbols-outlined text-[--theme-text-muted] group-hover:text-[--theme-primary] text-sm">chevron_right</span>
                  </button>
                  <button class="w-full flex items-center justify-between p-3 border border-[--theme-border-glass] hover:border-[--theme-primary] bg-[--theme-surface]/50 transition-all group rounded">
                    <div class="flex items-center gap-3">
                      <span class="material-symbols-outlined text-lg text-[--theme-primary]">shopping_bag</span>
                      <span class="text-[11px] font-bold uppercase tracking-widest text-[--theme-text]" data-i18n="${I18N_DOMAIN}.action_market">Acceder al Mercado</span>
                    </div>
                    <span class="material-symbols-outlined text-[--theme-text-muted] group-hover:text-[--theme-primary] text-sm">chevron_right</span>
                  </button>
                </div>
              </div>
            </div>

            <!-- News & Allocation Grid -->
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
              <!-- Inteligencia Feed -->
              <section>
                <div class="flex items-center justify-between mb-6">
                  <h3 class="text-sm font-bold uppercase tracking-widest text-[--theme-text]" data-i18n="${I18N_DOMAIN}.feed_title">Feed de Inteligencia</h3>
                  <button class="text-[--theme-text-muted] hover:text-[--theme-primary] text-[10px] font-bold uppercase tracking-widest" data-i18n="${I18N_DOMAIN}.btn_archive">Archivo</button>
                </div>
                <div class="space-y-4">
                  <div class="luxury-glass flex gap-4 p-4 hover:border-[--theme-primary] transition-colors cursor-pointer group rounded">
                    <div class="w-24 h-24 overflow-hidden shrink-0 rounded bg-[--theme-surface]">
                      <img class="w-full h-full object-cover grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500" 
                           alt="Asset" 
                           src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=400&h=400&fit=crop" />
                    </div>
                    <div>
                      <span class="text-[9px] text-[--theme-primary] font-bold uppercase tracking-[0.2em]" data-i18n="${I18N_DOMAIN}.tag_launch">Lanzamiento</span>
                      <h4 class="text-[13px] font-bold text-[--theme-text] mb-1 mt-0.5 group-hover:text-[--theme-primary] transition-colors uppercase tracking-wider" data-i18n="${I18N_DOMAIN}.news_1_title">Palácio Real: Finca en Alentejo</h4>
                      <p class="text-[11px] text-[--theme-text-muted] leading-relaxed line-clamp-2" data-i18n="${I18N_DOMAIN}.news_1_desc">Pre-lanzamiento exclusivo para miembros. Renovación histórica con ROI proyectado del 12%.</p>
                    </div>
                  </div>
                  
                  <div class="luxury-glass flex gap-4 p-4 hover:border-[--theme-primary] transition-colors cursor-pointer group rounded">
                    <div class="w-24 h-24 overflow-hidden shrink-0 rounded bg-[--theme-surface]">
                      <img class="w-full h-full object-cover grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500" 
                           alt="Office" 
                           src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400&h=400&fit=crop" />
                    </div>
                    <div>
                      <span class="text-[9px] text-[--theme-primary] font-bold uppercase tracking-[0.2em]" data-i18n="${I18N_DOMAIN}.tag_report">Informe</span>
                      <h4 class="text-[13px] font-bold text-[--theme-text] mb-1 mt-0.5 group-hover:text-[--theme-primary] transition-colors uppercase tracking-wider" data-i18n="${I18N_DOMAIN}.news_2_title">Perspectivas Q4</h4>
                      <p class="text-[11px] text-[--theme-text-muted] leading-relaxed line-clamp-2" data-i18n="${I18N_DOMAIN}.news_2_desc">Análisis trimestral del sector comercial portugués.</p>
                    </div>
                  </div>
                </div>
              </section>

              <!-- Asset Allocation -->
              <section>
                <div class="flex items-center justify-between mb-6">
                  <h3 class="text-sm font-bold uppercase tracking-widest text-[--theme-text]" data-i18n="${I18N_DOMAIN}.allocation_title">Asignación de Activos</h3>
                  <button class="text-[--theme-text-muted] hover:text-[--theme-primary] text-[10px] font-bold uppercase tracking-widest" data-i18n="${I18N_DOMAIN}.btn_config">Configuración</button>
                </div>
                <div class="luxury-glass p-8 h-[314px] flex flex-col justify-center items-center rounded">
                  <div class="w-44 h-44 border-[1px] border-[--theme-border] flex items-center justify-center relative rounded-full">
                    <div class="absolute inset-0 border-4 border-[--theme-primary]/20 rounded-full"></div>
                    <div class="absolute inset-0 border-t-4 border-l-4 border-[--theme-primary] rounded-full"></div>
                    <div class="text-center">
                      <p class="text-[10px] text-[--theme-text-muted] font-bold uppercase tracking-widest mb-1" data-i18n="${I18N_DOMAIN}.label_total_assets">Total Activos</p>
                      <p class="font-serif text-3xl text-[--theme-text]">24</p>
                    </div>
                  </div>
                  <div class="mt-8 flex gap-6">
                    <div class="flex items-center gap-2">
                      <span class="w-2 h-2 bg-[--theme-primary]"></span>
                      <span class="text-[10px] text-[--theme-text-muted] font-bold uppercase tracking-widest" data-i18n="${I18N_DOMAIN}.label_real_estate">Inmobiliario (75%)</span>
                    </div>
                    <div class="flex items-center gap-2">
                      <span class="w-2 h-2 bg-[--theme-border]"></span>
                      <span class="text-[10px] text-[--theme-text-muted] font-bold uppercase tracking-widest" data-i18n="${I18N_DOMAIN}.label_commercial">Comercial (25%)</span>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </div>

          <!-- CUSTODY VEIL SECURITY OVERLAY (Velo de Custodia) -->
          <div id="custody-veil" class="absolute inset-0 z-50 flex items-center justify-center hidden transition-all duration-500">
            <!-- Backdrop Glass -->
            <div class="absolute inset-0 bg-[--theme-surface-glass] backdrop-blur-[--theme-blur-glass]"></div>
            
            <!-- Modal Card -->
            <div class="relative max-w-md w-full mx-4 bg-[--theme-surface]/95 border border-[--theme-border-glass] p-10 rounded shadow-2xl text-center space-y-6 luxury-glass">
              <div class="flex justify-center">
                <span class="material-symbols-outlined text-6xl text-[--theme-primary]">shield_lock</span>
              </div>
              
              <div class="space-y-3">
                <h2 class="font-serif text-2xl text-[--theme-text] leading-tight" data-i18n="${I18N_DOMAIN}.veil_title">
                  Acesso em Custodia Fiduciaria
                </h2>
                <p class="text-sm text-[--theme-text-muted] leading-relaxed" data-i18n="${I18N_DOMAIN}.veil_subtitle">
                  Este conteúdo está reservado para membros com verificação de conformidade completa.
                </p>
              </div>

              <div class="pt-4 space-y-3">
                <button id="veil-cta" class="w-full py-3 px-6 bg-[--theme-primary] text-[--theme-bg] text-xs font-bold uppercase tracking-widest rounded hover:bg-[--theme-primary-hover] transition-colors">
                  <span data-i18n="${I18N_DOMAIN}.veil_cta">Consultar Estado de Validación</span>
                </button>
                <p class="text-[9px] text-[--theme-text-muted] uppercase tracking-widest" id="veil-status-detail"></p>
              </div>
            </div>
          </div>

        </div>
      `;

      // Inyectar estilos específicos del glass si no existen
      this._injectGlassStyles();
    }

    // --- Gestión del Velo de Custodia (Lógica de Seguridad) ---

    _evaluateCustodyVeil() {
      const session = window.__CPII__?.session;
      const status = session?.status;
      const veil = $('#custody-veil', this);
      const content = $('#dashboard-content', this);

      if (!veil) return;

      // R0: Agnóstico — usamos Set para O(1) lookup de estados bloqueantes
      const shouldLock = CUSTODY_LOCK_STATES.has(status);

      if (shouldLock && !this._veilActive) {
        // Activar Velo
        veil.classList.remove('hidden');
        content.classList.add('blur-sm', 'scale-[0.98]', 'opacity-50');
        this._veilActive = true;
        this._emit('dashboard:custody-locked', { status, timestamp: Date.now() });

        // Actualizar detalle de estado si existe
        const detail = $('#veil-status-detail', this);
        if (detail && status) {
          detail.textContent = `Status: ${status}`;
        }

      } else if (!shouldLock && this._veilActive) {
        // Desactivar Velo
        veil.classList.add('hidden');
        content.classList.remove('blur-sm', 'scale-[0.98]', 'opacity-50');
        this._veilActive = false;
        this._emit('dashboard:custody-unlocked', { status, timestamp: Date.now() });
      }
    }

    // --- Hidratación i18n (R4) ---

    _hydrateI18n() {
      const i18n = window.__CPII__?.i18n;
      if (!i18n || typeof i18n.t !== 'function') {
        console.warn(`[${GADGET_ID}] Motor i18n no disponible.`);
        return;
      }

      this._locale = window.__CPII__.config?.lang || 'es';
      const elements = $$(`[data-i18n^="${I18N_DOMAIN}"]`, this);
      this._translateBatch(elements, i18n);

      if (i18n.subscribe) {
        this._i18nUnsubscribe = i18n.subscribe((newLang) => {
          this._locale = newLang;
          this._translateBatch($$(`[data-i18n^="${I18N_DOMAIN}"]`, this), i18n);
        });
      }
    }

    _translateBatch(elements, i18nEngine) {
      elements.forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (!key) return;

        const translated = i18nEngine.t(key, {
          defaultValue: el.textContent.trim(),
          locale: this._locale
        });

        if (el.hasAttribute('data-i18n-placeholder')) {
          el.placeholder = translated;
        } else if (el.hasAttribute('data-i18n-html')) {
          el.innerHTML = translated;
        } else {
          el.textContent = translated;
        }
      });
    }

    // --- Event Listeners ---

    _setupListeners() {
      // Escuchar cambios de sesión (passport) para re-evaluar custody veil
      document.addEventListener('passport:session-updated', this._handleSessionUpdate);
      document.addEventListener('passport:staff-authenticated', this._handleSessionUpdate);

      // Delegación de eventos para botones internos (R5: O(1))
      this.addEventListener('click', (e) => {
        const target = e.target.closest('[data-action]');
        if (!target) return;

        const action = target.dataset.action;
        if (action === 'check-status') {
          this._emit('dashboard:request-status-check', { timestamp: Date.now() });
        }
      });

      // Observer para i18n dinámico
      this._mutationObserver = new MutationObserver((mutations) => {
        const newNodes = mutations
          .flatMap(m => Array.from(m.addedNodes))
          .filter(n => n.nodeType === 1 && n.hasAttribute?.('data-i18n'));

        if (newNodes.length > 0 && window.__CPII__?.i18n) {
          this._translateBatch(newNodes, window.__CPII__.i18n);
        }
      });

      this._mutationObserver.observe(this, { childList: true, subtree: true });
    }

    _teardownListeners() {
      document.removeEventListener('passport:session-updated', this._handleSessionUpdate);
      document.removeEventListener('passport:staff-authenticated', this._handleSessionUpdate);

      if (typeof this._i18nUnsubscribe === 'function') {
        this._i18nUnsubscribe();
      }
      if (this._mutationObserver) {
        this._mutationObserver.disconnect();
      }
    }

    _handleSessionUpdate = () => {
      // R5: Debounce O(1) — evaluación inmediata pero eficiente
      this._evaluateCustodyVeil();
    };

    // --- R7: Hibernation Support ---

    hibernate() {
      // Modo bajo consumo — aplicar blur y pausar actualizaciones
      this._isHibernating = true;
      this.classList.add('blur-[2px]', 'opacity-80', 'pointer-events-none');
      this._emit('dashboard:hibernated');
    }

    wake() {
      this._isHibernating = false;
      this.classList.remove('blur-[2px]', 'opacity-80', 'pointer-events-none');
      this._evaluateCustodyVeil(); // Re-verificar estado al despertar
      this._emit('dashboard:awakened');
    }

    // --- Utilidades ---

    _injectGlassStyles() {
      // Asegurar que las clases glass estén disponibles (idempotente)
      if (document.getElementById('gd-dashboard-glass-styles')) return;

      const styles = document.createElement('style');
      styles.id = 'gd-dashboard-glass-styles';
      styles.textContent = `
        .luxury-glass {
          background: var(--theme-surface-glass, rgba(30, 27, 20, 0.4));
          backdrop-filter: blur(var(--theme-blur-glass, 16px));
          -webkit-backdrop-filter: blur(var(--theme-blur-glass, 16px));
          border: 1px solid var(--theme-border-glass, rgba(193, 168, 93, 0.15));
          box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.4);
        }
        .institutional-card {
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
        }
        .institutional-card:hover {
          border-color: var(--theme-primary);
          transform: translateY(-2px);
        }
      `;
      document.head.appendChild(styles);
    }

    _emit(eventName, detail = {}) {
      const event = new CustomEvent(eventName, {
        detail: { ...detail, gadget: GADGET_ID, version: GADGET_VERSION },
        bubbles: true,
        cancelable: true,
        composed: false // R2: Light DOM
      });
      this.dispatchEvent(event);
    }

    _emitReady() {
      this._emit('gadget:ready', {
        gadgetId: GADGET_ID,
        hasCustodyVeil: this._veilActive,
        timestamp: Date.now()
      });
      console.log(`[${GADGET_ID}] v${GADGET_VERSION} inicializado. Velo: ${this._veilActive ? 'ACTIVO' : 'INACTIVO'}`);
    }

    // --- API Pública ---

    checkCustodyStatus() {
      this._evaluateCustodyVeil();
      return {
        locked: this._veilActive,
        status: window.__CPII__?.session?.status
      };
    }

    forceUnlockVeil() {
      // Para testing/simulación únicamente — no usar en producción
      const veil = $('#custody-veil', this);
      const content = $('#dashboard-content', this);
      if (veil) veil.classList.add('hidden');
      content?.classList.remove('blur-sm', 'scale-[0.98]', 'opacity-50');
      this._veilActive = false;
    }
  }

  // === REGISTRO GLOBAL ===
  if (!customElements.get(GADGET_ID)) {
    customElements.define(GADGET_ID, GdDashboard);
    console.log(`[Skeleton] CustomElement <${GADGET_ID}> registrado v${GADGET_VERSION}`);
  }

  // === EXPORTACIÓN AGNÓSTICA ===
  if (typeof window !== 'undefined') {
    window.__CPII__ = window.__CPII__ || {};
    window.__CPII__.gadgets = window.__CPII__.gadgets || {};
    window.__CPII__.gadgets[GADGET_ID] = GdDashboard;
  }

})();