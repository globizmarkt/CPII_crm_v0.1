(function () {
    'use strict';
    if (customElements.get('gd-dashboard')) return;

    class GdDashboard extends HTMLElement {
        constructor() {
            super();
            this.t = (key) => window.__CPII__?.i18n?.t(key) ?? key;
        }

        connectedCallback() {
            this.render();
            document.addEventListener('cpii:lang:change', () => this.render());
        }

        render() {
            // Diseño de Stitch adaptado a las variables globales del proyecto
            this.innerHTML = `
        <div class="p-8 max-w-5xl mx-auto w-full animate-fade-in">
          <div class="mb-8 flex items-center justify-between p-4 bg-red-900/10 border border-red-500/20 rounded-xl">
            <div class="flex items-center gap-4">
              <div class="w-10 h-10 rounded-full bg-red-500/20 flex items-center justify-center text-red-400">
                <span class="material-symbols-outlined">error</span>
              </div>
              <div>
                <p class="text-white font-bold text-sm">Verificación KYC Pendiente</p>
                <p class="text-slate-400 text-xs">Complete su perfil para desbloquear todas las oportunidades.</p>
              </div>
            </div>
            <button class="px-5 py-2 bg-red-900/50 text-white text-xs font-bold rounded-lg border border-red-500/30 hover:bg-red-800/50 transition-all">
              Verificar Ahora
            </button>
          </div>

          <div class="flex items-end justify-between mb-8">
            <div>
              <h1 class="text-3xl font-serif text-white mb-1">Buenos días, Inversor</h1>
              <p class="text-slate-400 text-sm">Este es el rendimiento de su portfolio hoy.</p>
            </div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div class="md:col-span-2 luxury-glass p-6 rounded-2xl relative overflow-hidden group">
              <div class="absolute top-0 right-0 p-8 opacity-5">
                <span class="material-symbols-outlined text-9xl">payments</span>
              </div>
              <h3 class="text-slate-400 text-xs uppercase tracking-widest font-bold mb-6">Resumen de Inversión</h3>
              <div class="grid grid-cols-1 sm:grid-cols-3 gap-8">
                <div>
                  <p class="text-slate-400 text-xs mb-1">Total Invertido</p>
                  <p class="font-serif text-3xl text-primary">€0.00</p>
                </div>
                <div>
                  <p class="text-slate-400 text-xs mb-1">Rendimiento Actual</p>
                  <p class="font-serif text-3xl text-white">0.00<span class="text-lg opacity-60">%</span></p>
                </div>
                <div>
                  <p class="text-slate-400 text-xs mb-1">Próximo Pago</p>
                  <p class="font-serif text-2xl text-white">--</p>
                </div>
              </div>
            </div>

            <div class="luxury-glass p-6 rounded-2xl">
              <h3 class="text-slate-400 text-xs uppercase tracking-widest font-bold mb-6">Acciones Rápidas</h3>
              <div class="space-y-3">
                <button class="w-full flex items-center justify-between p-3 rounded-xl border border-primary/20 hover:border-primary hover:bg-primary/5 transition-all group">
                  <div class="flex items-center gap-3">
                    <div class="w-8 h-8 rounded-lg bg-[#161513] border border-primary/20 flex items-center justify-center text-primary">
                      <span class="material-symbols-outlined text-sm">add_circle</span>
                    </div>
                    <span class="text-sm font-medium text-slate-300">Invertir Ahora</span>
                  </div>
                  <span class="material-symbols-outlined text-slate-500 group-hover:text-primary">chevron_right</span>
                </button>
                <button class="w-full flex items-center justify-between p-3 rounded-xl border border-primary/20 hover:border-primary hover:bg-primary/5 transition-all group">
                  <div class="flex items-center gap-3">
                    <div class="w-8 h-8 rounded-lg bg-[#161513] border border-primary/20 flex items-center justify-center text-primary">
                      <span class="material-symbols-outlined text-sm">shopping_bag</span>
                    </div>
                    <span class="text-sm font-medium text-slate-300">Mercado MLS</span>
                  </div>
                  <span class="material-symbols-outlined text-slate-500 group-hover:text-primary">chevron_right</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      `;
        }
    }
    customElements.define('gd-dashboard', GdDashboard);
})();