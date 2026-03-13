/**
 * 📊 gd-dashboard.js — Web Component Autónomo (Modelo Híbrido)
 * Doctrina: R3 (Zero Hex) | R4 (i18n interno) | Light DOM
 * Fuente: cpii_gd_dashboard_home.html (Stitch Design)
 * Estado: Producción
 */

class GdDashboard extends HTMLElement {
    constructor() {
        super();
        this._onLangChange = this._onLangChange.bind(this);
    }

    /** 
     * Diccionarios internos por idioma.
     * Contenido extraído de Stitch + traducciones técnicas ES/PT/EN/FR.
     * Nota R3: Todos los colores usan var(--theme-*) o var(--brand-*).
     */
    static get dictionaries() {
        return {
            es: `<div class="gd-dashboard-home p-8 max-w-6xl mx-auto" data-hibernatable="true" data-state="active">
  <!-- Breadcrumbs -->
  <nav class="flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-[var(--theme-text-muted)] mb-8">
    <span>Inicio</span>
    <span class="material-symbols-outlined text-[10px]">chevron_right</span>
    <span class="text-[var(--theme-border-active)]">Dashboard</span>
  </nav>
  
  <!-- KYC Alert Banner -->
  <div class="mb-8 flex items-center justify-between p-4 bg-[var(--theme-surface)] border-l-4 border-[var(--brand-alert)]">
    <div class="flex items-center gap-4">
      <div class="w-10 h-10 bg-[var(--brand-alert)]/10 flex items-center justify-center text-[var(--brand-alert)]">
        <span class="material-symbols-outlined" style="font-variation-settings: 'FILL' 1;">error</span>
      </div>
      <div>
        <p class="text-[var(--theme-text)] font-bold text-xs uppercase tracking-wider">Cumplimiento Normativo Requerido</p>
        <p class="text-[var(--theme-text-muted)] text-[11px]">Complete su verificación KYC para acceder a activos de grado institucional.</p>
      </div>
    </div>
    <button class="px-5 py-2 bg-[var(--brand-alert)] text-[var(--theme-text)] text-[10px] font-bold uppercase tracking-widest hover:opacity-90 transition-all">
      Verificar Ahora
    </button>
  </div>
  
  <!-- Welcome Header -->
  <div class="flex items-end justify-between mb-8 border-b border-[var(--theme-border)] pb-6">
    <div>
      <h1 class="text-2xl font-serif text-[var(--theme-text)] mb-1">Buenos Días, Alexander</h1>
      <p class="text-[var(--theme-text-muted)] text-[11px] uppercase tracking-widest">Rendimiento Consolidado de Cartera • 10 Oct, 2024</p>
    </div>
    <div class="flex gap-2">
      <button class="px-3 py-1.5 border border-[var(--theme-border)] text-[var(--theme-text-muted)] hover:text-[var(--theme-text)] hover:border-[var(--theme-border-active)] transition-colors flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest">
        <span class="material-symbols-outlined text-sm">share</span> Compartir
      </button>
      <button class="px-3 py-1.5 border border-[var(--theme-border)] text-[var(--theme-text-muted)] hover:text-[var(--theme-text)] hover:border-[var(--theme-border-active)] transition-colors flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest">
        <span class="material-symbols-outlined text-sm">download</span> Reporte
      </button>
    </div>
  </div>
  
  <!-- Bento Grid Layout -->
  <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
    <!-- Investment Summary Card -->
    <div class="md:col-span-2 institutional-card p-6 relative overflow-hidden bg-[var(--theme-surface)] border-[var(--theme-border)]">
      <div class="flex justify-between items-start mb-8">
        <h3 class="text-[var(--theme-text-muted)] text-[10px] uppercase tracking-[0.2em] font-bold">Resumen de Capital</h3>
        <span class="text-[10px] text-[var(--theme-border-active)] font-bold uppercase tracking-widest">Activos Auditados</span>
      </div>
      <div class="grid grid-cols-1 sm:grid-cols-3 gap-8">
        <div>
          <p class="text-[var(--theme-text-muted)] text-[10px] uppercase tracking-widest mb-2">Valor Total de Activos</p>
          <p class="serif-numbers text-3xl text-[var(--theme-border-active)]">€142.500,00</p>
        </div>
        <div>
          <p class="text-[var(--theme-text-muted)] text-[10px] uppercase tracking-widest mb-2">Rendimiento Proyectado</p>
          <p class="serif-numbers text-3xl text-[var(--theme-text)]">7,24<span class="text-lg opacity-40">%</span></p>
        </div>
        <div>
          <p class="text-[var(--theme-text-muted)] text-[10px] uppercase tracking-widest mb-2">Próximo Vencimiento</p>
          <p class="serif-numbers text-2xl text-[var(--theme-text)]">12 Oct, 2024</p>
        </div>
      </div>
      <div class="mt-8 pt-6 border-t border-[var(--theme-border)] flex items-center justify-between">
        <div class="flex items-center gap-2">
          <span class="w-1.5 h-1.5 bg-[var(--theme-success)]"></span>
          <span class="text-[10px] text-[var(--theme-text-muted)] font-bold uppercase tracking-widest">Mercados Abiertos</span>
        </div>
        <button class="text-[10px] text-[var(--theme-border-active)] font-bold uppercase tracking-widest flex items-center gap-1 hover:underline">
          Estado Detallado <span class="material-symbols-outlined text-xs">arrow_forward</span>
        </button>
      </div>
    </div>
    
    <!-- Quick Actions Card -->
    <div class="institutional-card p-6 bg-[var(--theme-surface)] border-[var(--theme-border)]">
      <h3 class="text-[var(--theme-text-muted)] text-[10px] uppercase tracking-[0.2em] font-bold mb-6">Transacciones</h3>
      <div class="space-y-2">
        <button class="w-full flex items-center justify-between p-3 border border-[var(--theme-border)] hover:border-[var(--theme-border-active)] bg-[var(--theme-bg)] transition-all group">
          <div class="flex items-center gap-3">
            <span class="material-symbols-outlined text-lg text-[var(--theme-border-active)]">add_circle</span>
            <span class="text-[11px] font-bold uppercase tracking-widest text-[var(--theme-text)]">Nueva Inversión</span>
          </div>
          <span class="material-symbols-outlined text-[var(--theme-text-muted)] group-hover:text-[var(--theme-border-active)] text-sm">chevron_right</span>
        </button>
        <button class="w-full flex items-center justify-between p-3 border border-[var(--theme-border)] hover:border-[var(--theme-border-active)] bg-[var(--theme-bg)] transition-all group">
          <div class="flex items-center gap-3">
            <span class="material-symbols-outlined text-lg text-[var(--theme-border-active)]">pie_chart</span>
            <span class="text-[11px] font-bold uppercase tracking-widest text-[var(--theme-text)]">Rebalancear Cartera</span>
          </div>
          <span class="material-symbols-outlined text-[var(--theme-text-muted)] group-hover:text-[var(--theme-border-active)] text-sm">chevron_right</span>
        </button>
        <button class="w-full flex items-center justify-between p-3 border border-[var(--theme-border)] hover:border-[var(--theme-border-active)] bg-[var(--theme-bg)] transition-all group">
          <div class="flex items-center gap-3">
            <span class="material-symbols-outlined text-lg text-[var(--theme-border-active)]">shopping_bag</span>
            <span class="text-[11px] font-bold uppercase tracking-widest text-[var(--theme-text)]">Acceder al Mercado</span>
          </div>
          <span class="material-symbols-outlined text-[var(--theme-text-muted)] group-hover:text-[var(--theme-border-active)] text-sm">chevron_right</span>
        </button>
      </div>
    </div>
  </div>
  
  <!-- Club News & Recent Projects -->
  <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
    <section>
      <div class="flex items-center justify-between mb-6">
        <h3 class="text-sm font-bold uppercase tracking-widest text-[var(--theme-text)]">Feed de Inteligencia</h3>
        <button class="text-[var(--theme-text-muted)] hover:text-[var(--theme-border-active)] text-[10px] font-bold uppercase tracking-widest">Archivo</button>
      </div>
      <div class="space-y-4">
        <div class="flex gap-4 p-4 border border-[var(--theme-border)] bg-[var(--theme-surface)] hover:border-[var(--theme-border-active)] transition-colors cursor-pointer group">
          <div class="w-24 h-24 overflow-hidden shrink-0">
            <img class="w-full h-full object-cover grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500" alt="Luxury Villa" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDLDJKlI2kYDU8FQFrXvHICDxQ9KnN1li7h3Uupb5I_DQKRGRpa0G7kh85u-4Bkn10Wd29k7BX-oMLOe6ZRwcdbX4jCCfnme-Lz2NPSI2UwqZRCJ1KbWF6XqBOj_4XkLmrOUtwtxCWsuCUALp1E5ZT_cfITYrKaO2c_uPcPi0sVGuqLnuAEitk05SC5-h7FrInqDpU2MH73tKT-rKOUTLP3KgwlrxRHxtH3-kGQ0DrbWJwnWk17NDZsmui0UZ6adDqhUXv3V1bx991I"/>
          </div>
          <div>
            <span class="text-[9px] text-[var(--theme-border-active)] font-bold uppercase tracking-[0.2em]">Lanzamiento de Activo</span>
            <h4 class="text-[13px] font-bold text-[var(--theme-text)] mb-1 mt-0.5 group-hover:text-[var(--theme-border-active)] transition-colors uppercase tracking-wider">Palácio Real: Finca en Alentejo</h4>
            <p class="text-[11px] text-[var(--theme-text-muted)] leading-relaxed line-clamp-2">Pre-lanzamiento exclusivo para miembros CPII. Renovación histórica con ROI proyectado del 12%.</p>
          </div>
        </div>
        <div class="flex gap-4 p-4 border border-[var(--theme-border)] bg-[var(--theme-surface)] hover:border-[var(--theme-border-active)] transition-colors cursor-pointer group">
          <div class="w-24 h-24 overflow-hidden shrink-0">
            <img class="w-full h-full object-cover grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500" alt="Office Building" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDLY1tbqwZw5joDUXXx147ieSWNXMYiALKBh0Kz9fPKviP7xPnuF7ZBLOStz5khMUI_2gte0u-2eaxglgkbs_7EEOSuohrSWGBK82etq8pQ1jLUF_YNLJ5HokmE7Wl3P_4wFam7Jp6LnZ7Gx_Q3crXah4tj8vWmkbLA-NFlwugE2pL_8hSP6KE3RiQkZ9k4XlycMiKBRSW52vq9w7YqfL1obqRf63SFRpuk0W7QRUxllbrYTdWp5K2OdDrf9Z5cxBHIosK8xwrYqmq8"/>
          </div>
          <div>
            <span class="text-[9px] text-[var(--theme-border-active)] font-bold uppercase tracking-[0.2em]">Informe de Mercado</span>
            <h4 class="text-[13px] font-bold text-[var(--theme-text)] mb-1 mt-0.5 group-hover:text-[var(--theme-border-active)] transition-colors uppercase tracking-wider">Perspectivas del Sector Comercial Q4</h4>
            <p class="text-[11px] text-[var(--theme-text-muted)] leading-relaxed line-clamp-2">Análisis trimestral del sector comercial portugués y oportunidades de liquidez.</p>
          </div>
        </div>
      </div>
    </section>
    
    <section>
      <div class="flex items-center justify-between mb-6">
        <h3 class="text-sm font-bold uppercase tracking-widest text-[var(--theme-text)]">Asignación de Activos</h3>
        <button class="text-[var(--theme-text-muted)] hover:text-[var(--theme-border-active)] text-[10px] font-bold uppercase tracking-widest">Configuración</button>
      </div>
      <div class="institutional-card p-8 h-[314px] flex flex-col justify-center items-center bg-[var(--theme-surface)] border-[var(--theme-border)]">
        <div class="w-44 h-44 border-[1px] border-[var(--theme-border)] flex items-center justify-center relative">
          <div class="absolute inset-0 border-4 border-[var(--theme-border-active)]/20"></div>
          <div class="absolute inset-0 border-t-4 border-l-4 border-[var(--theme-border-active)]"></div>
          <div class="text-center">
            <p class="text-[10px] text-[var(--theme-text-muted)] font-bold uppercase tracking-widest mb-1">Total Activos</p>
            <p class="serif-numbers text-3xl text-[var(--theme-text)]">24</p>
          </div>
        </div>
        <div class="mt-8 flex gap-6">
          <div class="flex items-center gap-2">
            <span class="w-2 h-2 bg-[var(--theme-border-active)]"></span>
            <span class="text-[10px] text-[var(--theme-text-muted)] font-bold uppercase tracking-widest">Inmobiliario (75%)</span>
          </div>
          <div class="flex items-center gap-2">
            <span class="w-2 h-2 bg-[var(--theme-border)]"></span>
            <span class="text-[10px] text-[var(--theme-text-muted)] font-bold uppercase tracking-widest">Comercial (25%)</span>
          </div>
        </div>
      </div>
    </section>
  </div>
</div>`,

            pt: `<div class="gd-dashboard-home p-8 max-w-6xl mx-auto" data-hibernatable="true" data-state="active">
  <!-- Breadcrumbs -->
  <nav class="flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-[var(--theme-text-muted)] mb-8">
    <span>Início</span>
    <span class="material-symbols-outlined text-[10px]">chevron_right</span>
    <span class="text-[var(--theme-border-active)]">Dashboard</span>
  </nav>
  
  <!-- KYC Alert Banner -->
  <div class="mb-8 flex items-center justify-between p-4 bg-[var(--theme-surface)] border-l-4 border-[var(--brand-alert)]">
    <div class="flex items-center gap-4">
      <div class="w-10 h-10 bg-[var(--brand-alert)]/10 flex items-center justify-center text-[var(--brand-alert)]">
        <span class="material-symbols-outlined" style="font-variation-settings: 'FILL' 1;">error</span>
      </div>
      <div>
        <p class="text-[var(--theme-text)] font-bold text-xs uppercase tracking-wider">Conformidade Regulatória Necessária</p>
        <p class="text-[var(--theme-text-muted)] text-[11px]">Complete sua verificação KYC para acessar ativos de grau institucional.</p>
      </div>
    </div>
    <button class="px-5 py-2 bg-[var(--brand-alert)] text-[var(--theme-text)] text-[10px] font-bold uppercase tracking-widest hover:opacity-90 transition-all">
      Verificar Agora
    </button>
  </div>
  
  <!-- Welcome Header -->
  <div class="flex items-end justify-between mb-8 border-b border-[var(--theme-border)] pb-6">
    <div>
      <h1 class="text-2xl font-serif text-[var(--theme-text)] mb-1">Bom Dia, Alexander</h1>
      <p class="text-[var(--theme-text-muted)] text-[11px] uppercase tracking-widest">Desempenho Consolidado da Carteira • 10 Out, 2024</p>
    </div>
    <div class="flex gap-2">
      <button class="px-3 py-1.5 border border-[var(--theme-border)] text-[var(--theme-text-muted)] hover:text-[var(--theme-text)] hover:border-[var(--theme-border-active)] transition-colors flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest">
        <span class="material-symbols-outlined text-sm">share</span> Partilhar
      </button>
      <button class="px-3 py-1.5 border border-[var(--theme-border)] text-[var(--theme-text-muted)] hover:text-[var(--theme-text)] hover:border-[var(--theme-border-active)] transition-colors flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest">
        <span class="material-symbols-outlined text-sm">download</span> Relatório
      </button>
    </div>
  </div>
  
  <!-- Bento Grid Layout -->
  <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
    <!-- Investment Summary Card -->
    <div class="md:col-span-2 institutional-card p-6 relative overflow-hidden bg-[var(--theme-surface)] border-[var(--theme-border)]">
      <div class="flex justify-between items-start mb-8">
        <h3 class="text-[var(--theme-text-muted)] text-[10px] uppercase tracking-[0.2em] font-bold">Resumo de Capital</h3>
        <span class="text-[10px] text-[var(--theme-border-active)] font-bold uppercase tracking-widest">Ativos Auditados</span>
      </div>
      <div class="grid grid-cols-1 sm:grid-cols-3 gap-8">
        <div>
          <p class="text-[var(--theme-text-muted)] text-[10px] uppercase tracking-widest mb-2">Valor Total de Ativos</p>
          <p class="serif-numbers text-3xl text-[var(--theme-border-active)]">€142.500,00</p>
        </div>
        <div>
          <p class="text-[var(--theme-text-muted)] text-[10px] uppercase tracking-widest mb-2">Rendimento Projetado</p>
          <p class="serif-numbers text-3xl text-[var(--theme-text)]">7,24<span class="text-lg opacity-40">%</span></p>
        </div>
        <div>
          <p class="text-[var(--theme-text-muted)] text-[10px] uppercase tracking-widest mb-2">Próximo Vencimento</p>
          <p class="serif-numbers text-2xl text-[var(--theme-text)]">12 Out, 2024</p>
        </div>
      </div>
      <div class="mt-8 pt-6 border-t border-[var(--theme-border)] flex items-center justify-between">
        <div class="flex items-center gap-2">
          <span class="w-1.5 h-1.5 bg-[var(--theme-success)]"></span>
          <span class="text-[10px] text-[var(--theme-text-muted)] font-bold uppercase tracking-widest">Mercados Abertos</span>
        </div>
        <button class="text-[10px] text-[var(--theme-border-active)] font-bold uppercase tracking-widest flex items-center gap-1 hover:underline">
          Extrato Detalhado <span class="material-symbols-outlined text-xs">arrow_forward</span>
        </button>
      </div>
    </div>
    
    <!-- Quick Actions Card -->
    <div class="institutional-card p-6 bg-[var(--theme-surface)] border-[var(--theme-border)]">
      <h3 class="text-[var(--theme-text-muted)] text-[10px] uppercase tracking-[0.2em] font-bold mb-6">Transações</h3>
      <div class="space-y-2">
        <button class="w-full flex items-center justify-between p-3 border border-[var(--theme-border)] hover:border-[var(--theme-border-active)] bg-[var(--theme-bg)] transition-all group">
          <div class="flex items-center gap-3">
            <span class="material-symbols-outlined text-lg text-[var(--theme-border-active)]">add_circle</span>
            <span class="text-[11px] font-bold uppercase tracking-widest text-[var(--theme-text)]">Novo Investimento</span>
          </div>
          <span class="material-symbols-outlined text-[var(--theme-text-muted)] group-hover:text-[var(--theme-border-active)] text-sm">chevron_right</span>
        </button>
        <button class="w-full flex items-center justify-between p-3 border border-[var(--theme-border)] hover:border-[var(--theme-border-active)] bg-[var(--theme-bg)] transition-all group">
          <div class="flex items-center gap-3">
            <span class="material-symbols-outlined text-lg text-[var(--theme-border-active)]">pie_chart</span>
            <span class="text-[11px] font-bold uppercase tracking-widest text-[var(--theme-text)]">Rebalancear Carteira</span>
          </div>
          <span class="material-symbols-outlined text-[var(--theme-text-muted)] group-hover:text-[var(--theme-border-active)] text-sm">chevron_right</span>
        </button>
        <button class="w-full flex items-center justify-between p-3 border border-[var(--theme-border)] hover:border-[var(--theme-border-active)] bg-[var(--theme-bg)] transition-all group">
          <div class="flex items-center gap-3">
            <span class="material-symbols-outlined text-lg text-[var(--theme-border-active)]">shopping_bag</span>
            <span class="text-[11px] font-bold uppercase tracking-widest text-[var(--theme-text)]">Aceder ao Mercado</span>
          </div>
          <span class="material-symbols-outlined text-[var(--theme-text-muted)] group-hover:text-[var(--theme-border-active)] text-sm">chevron_right</span>
        </button>
      </div>
    </div>
  </div>
  
  <!-- Club News & Recent Projects -->
  <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
    <section>
      <div class="flex items-center justify-between mb-6">
        <h3 class="text-sm font-bold uppercase tracking-widest text-[var(--theme-text)]">Feed de Inteligência</h3>
        <button class="text-[var(--theme-text-muted)] hover:text-[var(--theme-border-active)] text-[10px] font-bold uppercase tracking-widest">Arquivo</button>
      </div>
      <div class="space-y-4">
        <div class="flex gap-4 p-4 border border-[var(--theme-border)] bg-[var(--theme-surface)] hover:border-[var(--theme-border-active)] transition-colors cursor-pointer group">
          <div class="w-24 h-24 overflow-hidden shrink-0">
            <img class="w-full h-full object-cover grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500" alt="Luxury Villa" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDLDJKlI2kYDU8FQFrXvHICDxQ9KnN1li7h3Uupb5I_DQKRGRpa0G7kh85u-4Bkn10Wd29k7BX-oMLOe6ZRwcdbX4jCCfnme-Lz2NPSI2UwqZRCJ1KbWF6XqBOj_4XkLmrOUtwtxCWsuCUALp1E5ZT_cfITYrKaO2c_uPcPi0sVGuqLnuAEitk05SC5-h7FrInqDpU2MH73tKT-rKOUTLP3KgwlrxRHxtH3-kGQ0DrbWJwnWk17NDZsmui0UZ6adDqhUXv3V1bx991I"/>
          </div>
          <div>
            <span class="text-[9px] text-[var(--theme-border-active)] font-bold uppercase tracking-[0.2em]">Lançamento de Ativo</span>
            <h4 class="text-[13px] font-bold text-[var(--theme-text)] mb-1 mt-0.5 group-hover:text-[var(--theme-border-active)] transition-colors uppercase tracking-wider">Palácio Real: Quinta no Alentejo</h4>
            <p class="text-[11px] text-[var(--theme-text-muted)] leading-relaxed line-clamp-2">Pré-lançamento exclusivo para membros CPII. Renovação histórica com ROI projetado de 12%.</p>
          </div>
        </div>
        <div class="flex gap-4 p-4 border border-[var(--theme-border)] bg-[var(--theme-surface)] hover:border-[var(--theme-border-active)] transition-colors cursor-pointer group">
          <div class="w-24 h-24 overflow-hidden shrink-0">
            <img class="w-full h-full object-cover grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500" alt="Office Building" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDLY1tbqwZw5joDUXXx147ieSWNXMYiALKBh0Kz9fPKviP7xPnuF7ZBLOStz5khMUI_2gte0u-2eaxglgkbs_7EEOSuohrSWGBK82etq8pQ1jLUF_YNLJ5HokmE7Wl3P_4wFam7Jp6LnZ7Gx_Q3crXah4tj8vWmkbLA-NFlwugE2pL_8hSP6KE3RiQkZ9k4XlycMiKBRSW52vq9w7YqfL1obqRf63SFRpuk0W7QRUxllbrYTdWp5K2OdDrf9Z5cxBHIosK8xwrYqmq8"/>
          </div>
          <div>
            <span class="text-[9px] text-[var(--theme-border-active)] font-bold uppercase tracking-[0.2em]">Relatório de Mercado</span>
            <h4 class="text-[13px] font-bold text-[var(--theme-text)] mb-1 mt-0.5 group-hover:text-[var(--theme-border-active)] transition-colors uppercase tracking-wider">Perspetivas do Setor Comercial Q4</h4>
            <p class="text-[11px] text-[var(--theme-text-muted)] leading-relaxed line-clamp-2">Análise trimestral do setor comercial português e oportunidades de liquidez.</p>
          </div>
        </div>
      </div>
    </section>
    
    <section>
      <div class="flex items-center justify-between mb-6">
        <h3 class="text-sm font-bold uppercase tracking-widest text-[var(--theme-text)]">Alocação de Ativos</h3>
        <button class="text-[var(--theme-text-muted)] hover:text-[var(--theme-border-active)] text-[10px] font-bold uppercase tracking-widest">Configuração</button>
      </div>
      <div class="institutional-card p-8 h-[314px] flex flex-col justify-center items-center bg-[var(--theme-surface)] border-[var(--theme-border)]">
        <div class="w-44 h-44 border-[1px] border-[var(--theme-border)] flex items-center justify-center relative">
          <div class="absolute inset-0 border-4 border-[var(--theme-border-active)]/20"></div>
          <div class="absolute inset-0 border-t-4 border-l-4 border-[var(--theme-border-active)]"></div>
          <div class="text-center">
            <p class="text-[10px] text-[var(--theme-text-muted)] font-bold uppercase tracking-widest mb-1">Total Ativos</p>
            <p class="serif-numbers text-3xl text-[var(--theme-text)]">24</p>
          </div>
        </div>
        <div class="mt-8 flex gap-6">
          <div class="flex items-center gap-2">
            <span class="w-2 h-2 bg-[var(--theme-border-active)]"></span>
            <span class="text-[10px] text-[var(--theme-text-muted)] font-bold uppercase tracking-widest">Imobiliário (75%)</span>
          </div>
          <div class="flex items-center gap-2">
            <span class="w-2 h-2 bg-[var(--theme-border)]"></span>
            <span class="text-[10px] text-[var(--theme-text-muted)] font-bold uppercase tracking-widest">Comercial (25%)</span>
          </div>
        </div>
      </div>
    </section>
  </div>
</div>`,

            en: `<div class="gd-dashboard-home p-8 max-w-6xl mx-auto" data-hibernatable="true" data-state="active">
  <!-- Breadcrumbs -->
  <nav class="flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-[var(--theme-text-muted)] mb-8">
    <span>Home</span>
    <span class="material-symbols-outlined text-[10px]">chevron_right</span>
    <span class="text-[var(--theme-border-active)]">Dashboard</span>
  </nav>
  
  <!-- KYC Alert Banner -->
  <div class="mb-8 flex items-center justify-between p-4 bg-[var(--theme-surface)] border-l-4 border-[var(--brand-alert)]">
    <div class="flex items-center gap-4">
      <div class="w-10 h-10 bg-[var(--brand-alert)]/10 flex items-center justify-center text-[var(--brand-alert)]">
        <span class="material-symbols-outlined" style="font-variation-settings: 'FILL' 1;">error</span>
      </div>
      <div>
        <p class="text-[var(--theme-text)] font-bold text-xs uppercase tracking-wider">Regulatory Compliance Required</p>
        <p class="text-[var(--theme-text-muted)] text-[11px]">Please complete your KYC verification to access institutional-grade assets.</p>
      </div>
    </div>
    <button class="px-5 py-2 bg-[var(--brand-alert)] text-[var(--theme-text)] text-[10px] font-bold uppercase tracking-widest hover:opacity-90 transition-all">
      Verify Now
    </button>
  </div>
  
  <!-- Welcome Header -->
  <div class="flex items-end justify-between mb-8 border-b border-[var(--theme-border)] pb-6">
    <div>
      <h1 class="text-2xl font-serif text-[var(--theme-text)] mb-1">Good Morning, Alexander</h1>
      <p class="text-[var(--theme-text-muted)] text-[11px] uppercase tracking-widest">Consolidated Portfolio Performance • Oct 10, 2024</p>
    </div>
    <div class="flex gap-2">
      <button class="px-3 py-1.5 border border-[var(--theme-border)] text-[var(--theme-text-muted)] hover:text-[var(--theme-text)] hover:border-[var(--theme-border-active)] transition-colors flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest">
        <span class="material-symbols-outlined text-sm">share</span> Share
      </button>
      <button class="px-3 py-1.5 border border-[var(--theme-border)] text-[var(--theme-text-muted)] hover:text-[var(--theme-text)] hover:border-[var(--theme-border-active)] transition-colors flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest">
        <span class="material-symbols-outlined text-sm">download</span> Report
      </button>
    </div>
  </div>
  
  <!-- Bento Grid Layout -->
  <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
    <!-- Investment Summary Card -->
    <div class="md:col-span-2 institutional-card p-6 relative overflow-hidden bg-[var(--theme-surface)] border-[var(--theme-border)]">
      <div class="flex justify-between items-start mb-8">
        <h3 class="text-[var(--theme-text-muted)] text-[10px] uppercase tracking-[0.2em] font-bold">Capital Overview</h3>
        <span class="text-[10px] text-[var(--theme-border-active)] font-bold uppercase tracking-widest">Audited Assets</span>
      </div>
      <div class="grid grid-cols-1 sm:grid-cols-3 gap-8">
        <div>
          <p class="text-[var(--theme-text-muted)] text-[10px] uppercase tracking-widest mb-2">Total Asset Value</p>
          <p class="serif-numbers text-3xl text-[var(--theme-border-active)]">€142,500.00</p>
        </div>
        <div>
          <p class="text-[var(--theme-text-muted)] text-[10px] uppercase tracking-widest mb-2">Projected Yield</p>
          <p class="serif-numbers text-3xl text-[var(--theme-text)]">7.24<span class="text-lg opacity-40">%</span></p>
        </div>
        <div>
          <p class="text-[var(--theme-text-muted)] text-[10px] uppercase tracking-widest mb-2">Next Maturity</p>
          <p class="serif-numbers text-2xl text-[var(--theme-text)]">Oct 12, 2024</p>
        </div>
      </div>
      <div class="mt-8 pt-6 border-t border-[var(--theme-border)] flex items-center justify-between">
        <div class="flex items-center gap-2">
          <span class="w-1.5 h-1.5 bg-[var(--theme-success)]"></span>
          <span class="text-[10px] text-[var(--theme-text-muted)] font-bold uppercase tracking-widest">Markets Open</span>
        </div>
        <button class="text-[10px] text-[var(--theme-border-active)] font-bold uppercase tracking-widest flex items-center gap-1 hover:underline">
          Detailed Statement <span class="material-symbols-outlined text-xs">arrow_forward</span>
        </button>
      </div>
    </div>
    
    <!-- Quick Actions Card -->
    <div class="institutional-card p-6 bg-[var(--theme-surface)] border-[var(--theme-border)]">
      <h3 class="text-[var(--theme-text-muted)] text-[10px] uppercase tracking-[0.2em] font-bold mb-6">Transactions</h3>
      <div class="space-y-2">
        <button class="w-full flex items-center justify-between p-3 border border-[var(--theme-border)] hover:border-[var(--theme-border-active)] bg-[var(--theme-bg)] transition-all group">
          <div class="flex items-center gap-3">
            <span class="material-symbols-outlined text-lg text-[var(--theme-border-active)]">add_circle</span>
            <span class="text-[11px] font-bold uppercase tracking-widest text-[var(--theme-text)]">New Investment</span>
          </div>
          <span class="material-symbols-outlined text-[var(--theme-text-muted)] group-hover:text-[var(--theme-border-active)] text-sm">chevron_right</span>
        </button>
        <button class="w-full flex items-center justify-between p-3 border border-[var(--theme-border)] hover:border-[var(--theme-border-active)] bg-[var(--theme-bg)] transition-all group">
          <div class="flex items-center gap-3">
            <span class="material-symbols-outlined text-lg text-[var(--theme-border-active)]">pie_chart</span>
            <span class="text-[11px] font-bold uppercase tracking-widest text-[var(--theme-text)]">Rebalance Portfolio</span>
          </div>
          <span class="material-symbols-outlined text-[var(--theme-text-muted)] group-hover:text-[var(--theme-border-active)] text-sm">chevron_right</span>
        </button>
        <button class="w-full flex items-center justify-between p-3 border border-[var(--theme-border)] hover:border-[var(--theme-border-active)] bg-[var(--theme-bg)] transition-all group">
          <div class="flex items-center gap-3">
            <span class="material-symbols-outlined text-lg text-[var(--theme-border-active)]">shopping_bag</span>
            <span class="text-[11px] font-bold uppercase tracking-widest text-[var(--theme-text)]">Access Market</span>
          </div>
          <span class="material-symbols-outlined text-[var(--theme-text-muted)] group-hover:text-[var(--theme-border-active)] text-sm">chevron_right</span>
        </button>
      </div>
    </div>
  </div>
  
  <!-- Club News & Recent Projects -->
  <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
    <section>
      <div class="flex items-center justify-between mb-6">
        <h3 class="text-sm font-bold uppercase tracking-widest text-[var(--theme-text)]">Intelligence Feed</h3>
        <button class="text-[var(--theme-text-muted)] hover:text-[var(--theme-border-active)] text-[10px] font-bold uppercase tracking-widest">Archive</button>
      </div>
      <div class="space-y-4">
        <div class="flex gap-4 p-4 border border-[var(--theme-border)] bg-[var(--theme-surface)] hover:border-[var(--theme-border-active)] transition-colors cursor-pointer group">
          <div class="w-24 h-24 overflow-hidden shrink-0">
            <img class="w-full h-full object-cover grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500" alt="Luxury Villa" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDLDJKlI2kYDU8FQFrXvHICDxQ9KnN1li7h3Uupb5I_DQKRGRpa0G7kh85u-4Bkn10Wd29k7BX-oMLOe6ZRwcdbX4jCCfnme-Lz2NPSI2UwqZRCJ1KbWF6XqBOj_4XkLmrOUtwtxCWsuCUALp1E5ZT_cfITYrKaO2c_uPcPi0sVGuqLnuAEitk05SC5-h7FrInqDpU2MH73tKT-rKOUTLP3KgwlrxRHxtH3-kGQ0DrbWJwnWk17NDZsmui0UZ6adDqhUXv3V1bx991I"/>
          </div>
          <div>
            <span class="text-[9px] text-[var(--theme-border-active)] font-bold uppercase tracking-[0.2em]">Asset Launch</span>
            <h4 class="text-[13px] font-bold text-[var(--theme-text)] mb-1 mt-0.5 group-hover:text-[var(--theme-border-active)] transition-colors uppercase tracking-wider">Palácio Real: Alentejo Estate</h4>
            <p class="text-[11px] text-[var(--theme-text-muted)] leading-relaxed line-clamp-2">Exclusive pre-launch for CPII members. Historical renovation with projected 12% ROI.</p>
          </div>
        </div>
        <div class="flex gap-4 p-4 border border-[var(--theme-border)] bg-[var(--theme-surface)] hover:border-[var(--theme-border-active)] transition-colors cursor-pointer group">
          <div class="w-24 h-24 overflow-hidden shrink-0">
            <img class="w-full h-full object-cover grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500" alt="Office Building" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDLY1tbqwZw5joDUXXx147ieSWNXMYiALKBh0Kz9fPKviP7xPnuF7ZBLOStz5khMUI_2gte0u-2eaxglgkbs_7EEOSuohrSWGBK82etq8pQ1jLUF_YNLJ5HokmE7Wl3P_4wFam7Jp6LnZ7Gx_Q3crXah4tj8vWmkbLA-NFlwugE2pL_8hSP6KE3RiQkZ9k4XlycMiKBRSW52vq9w7YqfL1obqRf63SFRpuk0W7QRUxllbrYTdWp5K2OdDrf9Z5cxBHIosK8xwrYqmq8"/>
          </div>
          <div>
            <span class="text-[9px] text-[var(--theme-border-active)] font-bold uppercase tracking-[0.2em]">Market Report</span>
            <h4 class="text-[13px] font-bold text-[var(--theme-text)] mb-1 mt-0.5 group-hover:text-[var(--theme-border-active)] transition-colors uppercase tracking-wider">Commercial Real Estate Outlook Q4</h4>
            <p class="text-[11px] text-[var(--theme-text-muted)] leading-relaxed line-clamp-2">Quarterly analysis of the Portuguese commercial sector and liquidity opportunities.</p>
          </div>
        </div>
      </div>
    </section>
    
    <section>
      <div class="flex items-center justify-between mb-6">
        <h3 class="text-sm font-bold uppercase tracking-widest text-[var(--theme-text)]">Asset Allocation</h3>
        <button class="text-[var(--theme-text-muted)] hover:text-[var(--theme-border-active)] text-[10px] font-bold uppercase tracking-widest">Configuration</button>
      </div>
      <div class="institutional-card p-8 h-[314px] flex flex-col justify-center items-center bg-[var(--theme-surface)] border-[var(--theme-border)]">
        <div class="w-44 h-44 border-[1px] border-[var(--theme-border)] flex items-center justify-center relative">
          <div class="absolute inset-0 border-4 border-[var(--theme-border-active)]/20"></div>
          <div class="absolute inset-0 border-t-4 border-l-4 border-[var(--theme-border-active)]"></div>
          <div class="text-center">
            <p class="text-[10px] text-[var(--theme-text-muted)] font-bold uppercase tracking-widest mb-1">Total Assets</p>
            <p class="serif-numbers text-3xl text-[var(--theme-text)]">24</p>
          </div>
        </div>
        <div class="mt-8 flex gap-6">
          <div class="flex items-center gap-2">
            <span class="w-2 h-2 bg-[var(--theme-border-active)]"></span>
            <span class="text-[10px] text-[var(--theme-text-muted)] font-bold uppercase tracking-widest">Real Estate (75%)</span>
          </div>
          <div class="flex items-center gap-2">
            <span class="w-2 h-2 bg-[var(--theme-border)]"></span>
            <span class="text-[10px] text-[var(--theme-text-muted)] font-bold uppercase tracking-widest">Commercial (25%)</span>
          </div>
        </div>
      </div>
    </section>
  </div>
</div>`,

            fr: `<div class="gd-dashboard-home p-8 max-w-6xl mx-auto" data-hibernatable="true" data-state="active">
  <!-- Breadcrumbs -->
  <nav class="flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-[var(--theme-text-muted)] mb-8">
    <span>Accueil</span>
    <span class="material-symbols-outlined text-[10px]">chevron_right</span>
    <span class="text-[var(--theme-border-active)]">Dashboard</span>
  </nav>
  
  <!-- KYC Alert Banner -->
  <div class="mb-8 flex items-center justify-between p-4 bg-[var(--theme-surface)] border-l-4 border-[var(--brand-alert)]">
    <div class="flex items-center gap-4">
      <div class="w-10 h-10 bg-[var(--brand-alert)]/10 flex items-center justify-center text-[var(--brand-alert)]">
        <span class="material-symbols-outlined" style="font-variation-settings: 'FILL' 1;">error</span>
      </div>
      <div>
        <p class="text-[var(--theme-text)] font-bold text-xs uppercase tracking-wider">Conformité Réglementaire Requise</p>
        <p class="text-[var(--theme-text-muted)] text-[11px]">Veuillez compléter votre vérification KYC pour accéder aux actifs de niveau institutionnel.</p>
      </div>
    </div>
    <button class="px-5 py-2 bg-[var(--brand-alert)] text-[var(--theme-text)] text-[10px] font-bold uppercase tracking-widest hover:opacity-90 transition-all">
      Vérifier Maintenant
    </button>
  </div>
  
  <!-- Welcome Header -->
  <div class="flex items-end justify-between mb-8 border-b border-[var(--theme-border)] pb-6">
    <div>
      <h1 class="text-2xl font-serif text-[var(--theme-text)] mb-1">Bonjour, Alexander</h1>
      <p class="text-[var(--theme-text-muted)] text-[11px] uppercase tracking-widest">Performance Consolidée du Portefeuille • 10 Oct, 2024</p>
    </div>
    <div class="flex gap-2">
      <button class="px-3 py-1.5 border border-[var(--theme-border)] text-[var(--theme-text-muted)] hover:text-[var(--theme-text)] hover:border-[var(--theme-border-active)] transition-colors flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest">
        <span class="material-symbols-outlined text-sm">share</span> Partager
      </button>
      <button class="px-3 py-1.5 border border-[var(--theme-border)] text-[var(--theme-text-muted)] hover:text-[var(--theme-text)] hover:border-[var(--theme-border-active)] transition-colors flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest">
        <span class="material-symbols-outlined text-sm">download</span> Rapport
      </button>
    </div>
  </div>
  
  <!-- Bento Grid Layout -->
  <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
    <!-- Investment Summary Card -->
    <div class="md:col-span-2 institutional-card p-6 relative overflow-hidden bg-[var(--theme-surface)] border-[var(--theme-border)]">
      <div class="flex justify-between items-start mb-8">
        <h3 class="text-[var(--theme-text-muted)] text-[10px] uppercase tracking-[0.2em] font-bold">Aperçu du Capital</h3>
        <span class="text-[10px] text-[var(--theme-border-active)] font-bold uppercase tracking-widest">Actifs Audités</span>
      </div>
      <div class="grid grid-cols-1 sm:grid-cols-3 gap-8">
        <div>
          <p class="text-[var(--theme-text-muted)] text-[10px] uppercase tracking-widest mb-2">Valeur Totale des Actifs</p>
          <p class="serif-numbers text-3xl text-[var(--theme-border-active)]">€142.500,00</p>
        </div>
        <div>
          <p class="text-[var(--theme-text-muted)] text-[10px] uppercase tracking-widest mb-2">Rendement Projeté</p>
          <p class="serif-numbers text-3xl text-[var(--theme-text)]">7,24<span class="text-lg opacity-40">%</span></p>
        </div>
        <div>
          <p class="text-[var(--theme-text-muted)] text-[10px] uppercase tracking-widest mb-2">Prochaine Échéance</p>
          <p class="serif-numbers text-2xl text-[var(--theme-text)]">12 Oct, 2024</p>
        </div>
      </div>
      <div class="mt-8 pt-6 border-t border-[var(--theme-border)] flex items-center justify-between">
        <div class="flex items-center gap-2">
          <span class="w-1.5 h-1.5 bg-[var(--theme-success)]"></span>
          <span class="text-[10px] text-[var(--theme-text-muted)] font-bold uppercase tracking-widest">Marchés Ouverts</span>
        </div>
        <button class="text-[10px] text-[var(--theme-border-active)] font-bold uppercase tracking-widest flex items-center gap-1 hover:underline">
          Relevé Détaillé <span class="material-symbols-outlined text-xs">arrow_forward</span>
        </button>
      </div>
    </div>
    
    <!-- Quick Actions Card -->
    <div class="institutional-card p-6 bg-[var(--theme-surface)] border-[var(--theme-border)]">
      <h3 class="text-[var(--theme-text-muted)] text-[10px] uppercase tracking-[0.2em] font-bold mb-6">Transactions</h3>
      <div class="space-y-2">
        <button class="w-full flex items-center justify-between p-3 border border-[var(--theme-border)] hover:border-[var(--theme-border-active)] bg-[var(--theme-bg)] transition-all group">
          <div class="flex items-center gap-3">
            <span class="material-symbols-outlined text-lg text-[var(--theme-border-active)]">add_circle</span>
            <span class="text-[11px] font-bold uppercase tracking-widest text-[var(--theme-text)]">Nouvel Investissement</span>
          </div>
          <span class="material-symbols-outlined text-[var(--theme-text-muted)] group-hover:text-[var(--theme-border-active)] text-sm">chevron_right</span>
        </button>
        <button class="w-full flex items-center justify-between p-3 border border-[var(--theme-border)] hover:border-[var(--theme-border-active)] bg-[var(--theme-bg)] transition-all group">
          <div class="flex items-center gap-3">
            <span class="material-symbols-outlined text-lg text-[var(--theme-border-active)]">pie_chart</span>
            <span class="text-[11px] font-bold uppercase tracking-widest text-[var(--theme-text)]">Rééquilibrer Portefeuille</span>
          </div>
          <span class="material-symbols-outlined text-[var(--theme-text-muted)] group-hover:text-[var(--theme-border-active)] text-sm">chevron_right</span>
        </button>
        <button class="w-full flex items-center justify-between p-3 border border-[var(--theme-border)] hover:border-[var(--theme-border-active)] bg-[var(--theme-bg)] transition-all group">
          <div class="flex items-center gap-3">
            <span class="material-symbols-outlined text-lg text-[var(--theme-border-active)]">shopping_bag</span>
            <span class="text-[11px] font-bold uppercase tracking-widest text-[var(--theme-text)]">Accéder au Marché</span>
          </div>
          <span class="material-symbols-outlined text-[var(--theme-text-muted)] group-hover:text-[var(--theme-border-active)] text-sm">chevron_right</span>
        </button>
      </div>
    </div>
  </div>
  
  <!-- Club News & Recent Projects -->
  <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
    <section>
      <div class="flex items-center justify-between mb-6">
        <h3 class="text-sm font-bold uppercase tracking-widest text-[var(--theme-text)]">Flux d'Intelligence</h3>
        <button class="text-[var(--theme-text-muted)] hover:text-[var(--theme-border-active)] text-[10px] font-bold uppercase tracking-widest">Archive</button>
      </div>
      <div class="space-y-4">
        <div class="flex gap-4 p-4 border border-[var(--theme-border)] bg-[var(--theme-surface)] hover:border-[var(--theme-border-active)] transition-colors cursor-pointer group">
          <div class="w-24 h-24 overflow-hidden shrink-0">
            <img class="w-full h-full object-cover grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500" alt="Luxury Villa" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDLDJKlI2kYDU8FQFrXvHICDxQ9KnN1li7h3Uupb5I_DQKRGRpa0G7kh85u-4Bkn10Wd29k7BX-oMLOe6ZRwcdbX4jCCfnme-Lz2NPSI2UwqZRCJ1KbWF6XqBOj_4XkLmrOUtwtxCWsuCUALp1E5ZT_cfITYrKaO2c_uPcPi0sVGuqLnuAEitk05SC5-h7FrInqDpU2MH73tKT-rKOUTLP3KgwlrxRHxtH3-kGQ0DrbWJwnWk17NDZsmui0UZ6adDqhUXv3V1bx991I"/>
          </div>
          <div>
            <span class="text-[9px] text-[var(--theme-border-active)] font-bold uppercase tracking-[0.2em]">Lancement d'Actif</span>
            <h4 class="text-[13px] font-bold text-[var(--theme-text)] mb-1 mt-0.5 group-hover:text-[var(--theme-border-active)] transition-colors uppercase tracking-wider">Palácio Real : Domaine en Alentejo</h4>
            <p class="text-[11px] text-[var(--theme-text-muted)] leading-relaxed line-clamp-2">Pré-lancement exclusif pour les membres CPII. Rénovation historique avec ROI projeté de 12%.</p>
          </div>
        </div>
        <div class="flex gap-4 p-4 border border-[var(--theme-border)] bg-[var(--theme-surface)] hover:border-[var(--theme-border-active)] transition-colors cursor-pointer group">
          <div class="w-24 h-24 overflow-hidden shrink-0">
            <img class="w-full h-full object-cover grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500" alt="Office Building" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDLY1tbqwZw5joDUXXx147ieSWNXMYiALKBh0Kz9fPKviP7xPnuF7ZBLOStz5khMUI_2gte0u-2eaxglgkbs_7EEOSuohrSWGBK82etq8pQ1jLUF_YNLJ5HokmE7Wl3P_4wFam7Jp6LnZ7Gx_Q3crXah4tj8vWmkbLA-NFlwugE2pL_8hSP6KE3RiQkZ9k4XlycMiKBRSW52vq9w7YqfL1obqRf63SFRpuk0W7QRUxllbrYTdWp5K2OdDrf9Z5cxBHIosK8xwrYqmq8"/>
          </div>
          <div>
            <span class="text-[9px] text-[var(--theme-border-active)] font-bold uppercase tracking-[0.2em]">Rapport de Marché</span>
            <h4 class="text-[13px] font-bold text-[var(--theme-text)] mb-1 mt-0.5 group-hover:text-[var(--theme-border-active)] transition-colors uppercase tracking-wider">Perspectives du Secteur Commercial Q4</h4>
            <p class="text-[11px] text-[var(--theme-text-muted)] leading-relaxed line-clamp-2">Analyse trimestrielle du secteur commercial portugais et opportunités de liquidité.</p>
          </div>
        </div>
      </div>
    </section>
    
    <section>
      <div class="flex items-center justify-between mb-6">
        <h3 class="text-sm font-bold uppercase tracking-widest text-[var(--theme-text)]">Allocation d'Actifs</h3>
        <button class="text-[var(--theme-text-muted)] hover:text-[var(--theme-border-active)] text-[10px] font-bold uppercase tracking-widest">Configuration</button>
      </div>
      <div class="institutional-card p-8 h-[314px] flex flex-col justify-center items-center bg-[var(--theme-surface)] border-[var(--theme-border)]">
        <div class="w-44 h-44 border-[1px] border-[var(--theme-border)] flex items-center justify-center relative">
          <div class="absolute inset-0 border-4 border-[var(--theme-border-active)]/20"></div>
          <div class="absolute inset-0 border-t-4 border-l-4 border-[var(--theme-border-active)]"></div>
          <div class="text-center">
            <p class="text-[10px] text-[var(--theme-text-muted)] font-bold uppercase tracking-widest mb-1">Total Actifs</p>
            <p class="serif-numbers text-3xl text-[var(--theme-text)]">24</p>
          </div>
        </div>
        <div class="mt-8 flex gap-6">
          <div class="flex items-center gap-2">
            <span class="w-2 h-2 bg-[var(--theme-border-active)]"></span>
            <span class="text-[10px] text-[var(--theme-text-muted)] font-bold uppercase tracking-widest">Immobilier (75%)</span>
          </div>
          <div class="flex items-center gap-2">
            <span class="w-2 h-2 bg-[var(--theme-border)]"></span>
            <span class="text-[10px] text-[var(--theme-text-muted)] font-bold uppercase tracking-widest">Commercial (25%)</span>
          </div>
        </div>
      </div>
    </section>
  </div>
</div>`
        };
    }

    connectedCallback() {
        const lang = localStorage.getItem('cpii:locale') || 'es';
        this._currentLang = lang;
        document.addEventListener('cpii:lang:change', this._onLangChange);
        this.render();
    }

    disconnectedCallback() {
        document.removeEventListener('cpii:lang:change', this._onLangChange);
    }

    _onLangChange(e) {
        this._currentLang = e.detail?.lang || 'es';
        this.render();
    }

    render() {
        const template = GdDashboard.dictionaries[this._currentLang] || GdDashboard.dictionaries.es;
        this.innerHTML = template;
    }
}

if (!customElements.get('gd-dashboard')) {
    customElements.define('gd-dashboard', GdDashboard);
}