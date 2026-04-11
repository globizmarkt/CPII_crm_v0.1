/**
 * GADGET: gd-manual.js
 * TYPE: Custom Element (Web Component)
 * JURISDICTION: features/ — Electrificado por Junior Dev-Logic (Kimi)
 * 
 * DOCTRINAS APLICADAS:
 * [R2] Light DOM estricto — Sin attachShadow()
 * [R3] Zero-Hex Absolute — Todas las referencias cromáticas via variables --theme-*
 * [R4] i18n Strict — Motor institucional window.__CPII__.i18n.t()
 * [R5] Economía O(1) — Lookup constante, cleanup estricto
 * 
 * CARTOGRAFÍA QUIRÚRGICA v3.2-R3
 * Timestamp: 2026-04-11T13:56:00Z
 * Shield: ⚡ Skeleton-Agnostic | Zero-Trust UI | Paper-Mode Certified | R3-Purged
 * 
 * CHANGELOG R3:
 * - Purga total de clases Tailwind cromáticas (stone-*)
 * - Migración a tokens institucionales: --theme-text-muted, --theme-surface-paper, --theme-border-subtle
 * - Paper Mode 100% dependiente de variables CSS (zero hardcode)
 */

(function () {
  'use strict';

  // === CONFIGURACIÓN AGNÓSTICA ===
  const GADGET_ID = 'gd-manual';
  const GADGET_VERSION = '3.0.1-R3';
  const I18N_DOMAIN = 'gadget.manual';

  // === UTILIDADES O(1) ===
  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => Array.from(root.querySelectorAll(selector));

  // === CUSTOM ELEMENT: GdManual ===
  class GdManual extends HTMLElement {
    constructor() {
      super();
      this._locale = null;
      this._i18nUnsubscribe = null;
      this._mutationObserver = null;
    }

    connectedCallback() {
      this._render();
      this._hydrateI18n();
      this._setupListeners();
      this._emitReady();
    }

    disconnectedCallback() {
      this._teardownListeners();
      this._cleanupObserver();
    }

    _render() {
      this.innerHTML = `
        <main class="gd-manual w-full min-h-screen flex flex-col items-center py-12 px-4 md:px-12 overflow-y-auto">
          <!-- Paper Container -->
          <article class="w-full max-w-4xl bg-[--theme-paper] text-[--theme-paper-ink] paper-mode-shadow overflow-hidden">
            <!-- Dossier Header -->
            <header class="bg-[--theme-bg] text-[--theme-paper] p-8 md:p-12 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
              <div class="space-y-2">
                <p class="text-[--theme-primary] text-xs uppercase tracking-[0.3em] font-bold" data-i18n="${I18N_DOMAIN}.context">Trinity - Órbita 2</p>
                <h2 class="text-4xl md:text-5xl font-headline italic leading-tight" data-i18n="${I18N_DOMAIN}.title">Manual de Boas Práticas</h2>
              </div>
              <div class="text-right pb-1">
                <p class="text-[10px] text-[--theme-text-muted] uppercase tracking-tighter" data-i18n="${I18N_DOMAIN}.doc_code">DOC.REF.CPII-2024.08</p>
              </div>
            </header>
            
            <div class="p-8 md:p-16 space-y-16">
              <!-- Section 1: Intro -->
              <section class="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12">
                <div class="md:col-span-4 border-b md:border-b-0 md:border-r border-[--theme-border-subtle] pb-8 md:pb-0 md:pr-8">
                  <h3 class="text-xs font-bold uppercase tracking-widest text-[--theme-primary] mb-4" data-i18n="${I18N_DOMAIN}.section_meta_title">Resumo Executivo</h3>
                  <p class="text-xs leading-relaxed text-[--theme-text-muted] italic" data-i18n="${I18N_DOMAIN}.section_meta_desc">
                    Este documento estabelece os parâmetros de excelência e conformidade institucional para as operações realizadas na Órbita 2 do sistema Trinity.
                  </p>
                </div>
                <div class="md:col-span-8">
                  <h4 class="font-headline text-2xl md:text-3xl mb-6" data-i18n="${I18N_DOMAIN}.content_title_1">Conformidade e Ética Operacional</h4>
                  <p class="text-sm leading-8 text-justify text-[--theme-paper-ink]" data-i18n="${I18N_DOMAIN}.content_p_1">
                    A governança institucional da CPII exige que todos os fluxos de captação e diretrizes de conformidade sejam seguidos com rigor técnico. O 'Paper Mode' representa não apenas uma escolha estética, mas um compromisso com a legibilidade, a preservação da memória institucional e a autoridade dos dados aqui apresentados. Cada registro deve ser tratado como um documento arquivístico de alto valor.
                  </p>
                </div>
              </section>

              <!-- Section 2: Tables -->
              <section>
                <div class="flex items-center gap-4 mb-8">
                  <div class="h-[1px] flex-1 bg-[--theme-border-subtle]"></div>
                  <h3 class="text-xs font-bold uppercase tracking-[0.4em] text-[--theme-text-muted]" data-i18n="${I18N_DOMAIN}.table_section_label">Matriz de Responsabilidades</h3>
                  <div class="h-[1px] flex-1 bg-[--theme-border-subtle]"></div>
                </div>
                <div class="overflow-x-auto border border-[--theme-border-subtle]">
                  <table class="w-full text-left border-collapse min-w-[600px]">
                    <thead>
                      <tr class="bg-[--theme-surface-paper] border-b border-[--theme-border-subtle]">
                        <th class="p-4 text-[10px] font-bold uppercase tracking-widest text-[--theme-text-muted]" data-i18n="${I18N_DOMAIN}.th_role">Função</th>
                        <th class="p-4 text-[10px] font-bold uppercase tracking-widest text-[--theme-text-muted]" data-i18n="${I18N_DOMAIN}.th_scope">Escopo de Atuação</th>
                        <th class="p-4 text-[10px] font-bold uppercase tracking-widest text-[--theme-text-muted]" data-i18n="${I18N_DOMAIN}.th_status">Nível de Acesso</th>
                      </tr>
                    </thead>
                    <tbody class="divide-y divide-[--theme-border-subtle]">
                      <tr>
                        <td class="p-4 text-xs font-bold text-[--theme-primary]" data-i18n="${I18N_DOMAIN}.td_role_1">Coordenador Trinity</td>
                        <td class="p-4 text-xs text-[--theme-text-muted]" data-i18n="${I18N_DOMAIN}.td_scope_1">Supervisão de fluxos de captação e auditoria.</td>
                        <td class="p-4">
                          <span class="bg-[--theme-bg] text-[--theme-paper] px-3 py-1 text-[9px] uppercase font-bold tracking-tighter" data-i18n="${I18N_DOMAIN}.status_total">Total</span>
                        </td>
                      </tr>
                      <tr>
                        <td class="p-4 text-xs font-bold text-[--theme-primary]" data-i18n="${I18N_DOMAIN}.td_role_2">Analista de Órbita</td>
                        <td class="p-4 text-xs text-[--theme-text-muted]" data-i18n="${I18N_DOMAIN}.td_scope_2">Execução técnica e validação de documentos.</td>
                        <td class="p-4">
                          <span class="bg-[--theme-primary]/20 text-[--theme-primary] border border-[--theme-primary]/30 px-3 py-1 text-[9px] uppercase font-bold tracking-tighter" data-i18n="${I18N_DOMAIN}.status_restricted">Restrito</span>
                        </td>
                      </tr>
                      <tr>
                        <td class="p-4 text-xs font-bold text-[--theme-primary]" data-i18n="${I18N_DOMAIN}.td_role_3">Auditor Externo</td>
                        <td class="p-4 text-xs text-[--theme-text-muted]" data-i18n="${I18N_DOMAIN}.td_scope_3">Verificação de conformidade e integridade.</td>
                        <td class="p-4">
                          <span class="bg-[--theme-surface-paper] text-[--theme-text-muted] border border-[--theme-border-subtle] px-3 py-1 text-[9px] uppercase font-bold tracking-tighter" data-i18n="${I18N_DOMAIN}.status_readonly">Leitura</span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </section>

              <!-- Section 3: Bento Grid -->
              <section class="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div class="md:col-span-3">
                  <h4 class="font-headline text-2xl mb-4 italic text-[--theme-paper-ink]" data-i18n="${I18N_DOMAIN}.bento_title">Fluxos Dinâmicos</h4>
                </div>
                <div class="bg-[--theme-surface-paper] p-6 border-l-4 border-[--theme-primary]">
                  <span class="material-symbols-outlined text-[--theme-primary] mb-4">verified_user</span>
                  <h5 class="text-sm font-bold uppercase mb-2 text-[--theme-paper-ink]" data-i18n="${I18N_DOMAIN}.card_1_title">Validação</h5>
                  <p class="text-xs text-[--theme-text-muted] leading-relaxed" data-i18n="${I18N_DOMAIN}.card_1_desc">Processo de verificação de autenticidade documental em tempo real via Trinity Hub.</p>
                </div>
                <div class="bg-[--theme-bg] p-6 text-[--theme-paper]">
                  <span class="material-symbols-outlined text-[--theme-primary] mb-4">hub</span>
                  <h5 class="text-sm font-bold uppercase mb-2 text-[--theme-primary]" data-i18n="${I18N_DOMAIN}.card_2_title">Integração</h5>
                  <p class="text-xs text-[--theme-text-muted] leading-relaxed" data-i18n="${I18N_DOMAIN}.card_2_desc">Sincronização de dados entre Órbita 1 e Órbita 2 para relatórios consolidados.</p>
                </div>
                <div class="bg-[--theme-surface-paper] p-6 border-l-4 border-[--theme-border-strong]">
                  <span class="material-symbols-outlined text-[--theme-border-strong] mb-4">archive</span>
                  <h5 class="text-sm font-bold uppercase mb-2 text-[--theme-paper-ink]" data-i18n="${I18N_DOMAIN}.card_3_title">Arquivo</h5>
                  <p class="text-xs text-[--theme-text-muted] leading-relaxed" data-i18n="${I18N_DOMAIN}.card_3_desc">Armazenamento seguro em Arquivo Morto digital com criptografia de ponta.</p>
                </div>
              </section>

              <!-- Institutional Placeholder -->
              <section class="pt-8">
                <div class="relative w-full h-64 bg-[--theme-surface] flex items-center justify-center overflow-hidden border border-[--theme-border-subtle]">
                  <div class="text-center space-y-2 px-8">
                    <span class="material-symbols-outlined text-4xl text-[--theme-primary]/40">account_balance</span>
                    <p class="text-[10px] text-[--theme-text-muted] uppercase tracking-[0.2em]" data-i18n="${I18N_DOMAIN}.img_placeholder">Área Reservada para Ativos Institucionais</p>
                  </div>
                  <div class="absolute bottom-6 left-6 right-6 flex justify-between items-end">
                    <span class="text-[9px] text-[--theme-text-muted] uppercase tracking-widest font-bold" data-i18n="${I18N_DOMAIN}.img_caption">Biblioteca de Ativos Institucionais - CPII</span>
                    <span class="material-symbols-outlined text-[--theme-text-muted]/40 text-sm">lock</span>
                  </div>
                </div>
              </section>
            </div>

            <!-- Dossier Footer -->
            <footer class="border-t border-[--theme-border-subtle] p-8 md:p-12 flex flex-col md:flex-row justify-between items-center gap-6">
              <div class="flex items-center gap-4">
                <div class="w-10 h-10 bg-[--theme-bg] flex items-center justify-center">
                  <span class="text-[--theme-primary] font-headline italic text-lg">CP</span>
                </div>
                <div>
                  <p class="text-[10px] font-bold uppercase tracking-widest text-[--theme-paper-ink]" data-i18n="${I18N_DOMAIN}.footer_entity">Comitê de Conformidade Institucional</p>
                  <p class="text-[9px] text-[--theme-text-muted] uppercase tracking-tighter" data-i18n="${I18N_DOMAIN}.copyright">© 2024 Todos os direitos reservados.</p>
                </div>
              </div>
              <div class="flex gap-8">
                <a class="text-[10px] uppercase font-bold text-[--theme-text-muted] hover:text-[--theme-primary] transition-colors" data-i18n="${I18N_DOMAIN}.foot_link_1" href="#">Privacidade</a>
                <a class="text-[10px] uppercase font-bold text-[--theme-text-muted] hover:text-[--theme-primary] transition-colors" data-i18n="${I18N_DOMAIN}.foot_link_2" href="#">Termos</a>
                <a class="text-[10px] uppercase font-bold text-[--theme-text-muted] hover:text-[--theme-primary] transition-colors" data-i18n="${I18N_DOMAIN}.foot_link_3" href="#">Suporte</a>
              </div>
            </footer>
          </article>
          
          <!-- Semantic Shell End -->
          <div class="mt-12 text-center text-[--theme-text-muted] text-[10px] uppercase tracking-[0.5em] pb-12">
            <span data-i18n="${I18N_DOMAIN}.end_manual">Fim do Documento - Trinity Manual</span>
          </div>
        </main>
      `;
    }

    _hydrateI18n() {
      const i18n = window.__CPII__?.i18n;
      if (!i18n || typeof i18n.t !== 'function') {
        console.warn(`[${GADGET_ID}] Motor i18n no disponible. Manteniendo fallbacks semánticos.`);
        return;
      }

      this._locale = window.__CPII__.config?.lang || 'pt-BR';
      const elements = $$(`[data-i18n^="${I18N_DOMAIN}"]`, this);
      const hydratedCount = this._translateBatch(elements, i18n);

      if (i18n.subscribe) {
        this._i18nUnsubscribe = i18n.subscribe((newLang) => {
          this._locale = newLang;
          this._translateBatch(elements, i18n);
          this._emit('gadget:locale-changed', { gadget: GADGET_ID, locale: newLang });
        });
      }

      console.log(`[${GADGET_ID}] Hidratación completada: ${hydratedCount} claves i18n resueltas`);
    }

    _translateBatch(elements, i18nEngine) {
      let count = 0;
      elements.forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (!key) return;

        const translated = i18nEngine.t(key, {
          defaultValue: el.textContent.trim(),
          locale: this._locale
        });

        if (el.hasAttribute('data-i18n-html')) {
          el.innerHTML = translated;
        } else {
          el.textContent = translated;
        }
        count++;
      });
      return count;
    }

    _setupListeners() {
      document.addEventListener('cpii:lang:change', this._handleLangChange);

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
      document.removeEventListener('cpii:lang:change', this._handleLangChange);
      if (typeof this._i18nUnsubscribe === 'function') {
        this._i18nUnsubscribe();
      }
    }

    _cleanupObserver() {
      if (this._mutationObserver) {
        this._mutationObserver.disconnect();
        this._mutationObserver = null;
      }
    }

    _handleLangChange = (e) => {
      const newLang = e.detail?.lang;
      if (newLang && newLang !== this._locale) {
        this._locale = newLang;
        const elements = $$(`[data-i18n^="${I18N_DOMAIN}"]`, this);
        if (window.__CPII__?.i18n) {
          this._translateBatch(elements, window.__CPII__.i18n);
        }
      }
    };

    _emit(eventName, detail = {}) {
      const event = new CustomEvent(eventName, {
        detail: { ...detail, gadget: GADGET_ID, version: GADGET_VERSION },
        bubbles: true,
        cancelable: true,
        composed: false
      });
      this.dispatchEvent(event);
    }

    _emitReady() {
      this._emit('gadget:ready', {
        gadgetId: GADGET_ID,
        timestamp: Date.now(),
        locale: this._locale
      });
      console.log(`[${GADGET_ID}] v${GADGET_VERSION} inicializado y listo (R3 Certified)`);
    }

    refreshI18n() {
      const elements = $$(`[data-i18n^="${I18N_DOMAIN}"]`, this);
      if (window.__CPII__?.i18n) {
        this._translateBatch(elements, window.__CPII__.i18n);
      }
    }

    getLocale() {
      return this._locale;
    }

    static get observedAttributes() {
      return ['data-locale'];
    }

    attributeChangedCallback(name, oldVal, newVal) {
      if (name === 'data-locale' && newVal !== oldVal) {
        this._locale = newVal;
        this.refreshI18n();
      }
    }
  }

  if (!customElements.get(GADGET_ID)) {
    customElements.define(GADGET_ID, GdManual);
    console.log(`[Skeleton] CustomElement <${GADGET_ID}> registrado v${GADGET_VERSION}`);
  }

  if (typeof window !== 'undefined') {
    window.__CPII__ = window.__CPII__ || {};
    window.__CPII__.gadgets = window.__CPII__.gadgets || {};
    window.__CPII__.gadgets[GADGET_ID] = GdManual;
  }

})();