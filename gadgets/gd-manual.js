/**
 * CPII — gd-manual.js
 * Gadget: Manual de Buenas Prácticas
 * Ruta: gadgets/gd-manual.js
 *
 * Web Component (Light DOM) — sin Shadow DOM para heredar var(--theme-*)
 * Todos los textos via data-i18n (R4)
 * Sin hex, solo variables CSS (R3)
 *
 * Uso:
 *   window.__CPII__.tabManager.open('gd-manual')
 *   — o directamente —
 *   <gd-manual></gd-manual>
 */
class GdManual extends HTMLElement {

    connectedCallback() {
        this.classList.add('gd-manual');
        this.setAttribute('role', 'tabpanel');
        this.render();
        this._applyI18n();
    }

    disconnectedCallback() {
        // Limpieza si fuera necesaria en el futuro
    }

    render() {
        this.innerHTML = `
      <div class="gd-manual__inner">

        <!-- Cabecera del gadget -->
        <header class="gd-manual__header">
          <h2 class="gd-manual__title" data-i18n="manual_title">Manual de Buenas Prácticas</h2>
          <p class="gd-manual__subtitle" data-i18n="manual_subtitle">
            Guía operativa para socios del Club Privado de Inversión Inmobiliaria
          </p>
        </header>

        <!-- Alerta doctrinal (cuadro oscuro) -->
        <div class="gd-manual__alert" role="alert">
          <span class="gd-manual__alert-icon" aria-hidden="true">⚠</span>
          <p data-i18n="manual_alert">
            Este manual es confidencial. Su distribución fuera del ecosistema CPII
            está estrictamente prohibida por los estatutos del club.
          </p>
        </div>

        <!-- Índice de secciones -->
        <nav class="gd-manual__index" aria-label="Índice del manual">
          <h3 class="gd-manual__index-title" data-i18n="manual_index_title">Índice</h3>
          <ol class="gd-manual__index-list">
            <li><a href="#manual-s1" data-i18n="manual_s1_title">Código de Conducta del Socio</a></li>
            <li><a href="#manual-s2" data-i18n="manual_s2_title">Proceso de Incorporación</a></li>
            <li><a href="#manual-s3" data-i18n="manual_s3_title">Gestión de Inversiones</a></li>
            <li><a href="#manual-s4" data-i18n="manual_s4_title">Comunicación Interna</a></li>
            <li><a href="#manual-s5" data-i18n="manual_s5_title">Resolución de Conflictos</a></li>
          </ol>
        </nav>

        <!-- Sección 1 -->
        <section class="gd-manual__section" id="manual-s1">
          <h3 class="gd-manual__section-title" data-i18n="manual_s1_title">
            Código de Conducta del Socio
          </h3>
          <p class="gd-manual__section-body" data-i18n="manual_s1_body">
            Todo socio del CPII se compromete a actuar con integridad, transparencia
            y respeto hacia los demás miembros del club y hacia las comunidades
            donde se desarrollan los proyectos de inversión.
          </p>
        </section>

        <!-- Sección 2 -->
        <section class="gd-manual__section" id="manual-s2">
          <h3 class="gd-manual__section-title" data-i18n="manual_s2_title">
            Proceso de Incorporación
          </h3>
          <p class="gd-manual__section-body" data-i18n="manual_s2_body">
            El acceso al club sigue un proceso de verificación KYC en tres niveles.
            El socio debe completar cada nivel antes de acceder a las oportunidades
            de inversión correspondientes.
          </p>
        </section>

        <!-- Sección 3 -->
        <section class="gd-manual__section" id="manual-s3">
          <h3 class="gd-manual__section-title" data-i18n="manual_s3_title">
            Gestión de Inversiones
          </h3>
          <p class="gd-manual__section-body" data-i18n="manual_s3_body">
            Las decisiones de inversión se toman de forma colectiva siguiendo
            el protocolo de votación establecido en los estatutos. Ningún socio
            puede comprometer fondos del club de forma unilateral.
          </p>
        </section>

        <!-- Sección 4 -->
        <section class="gd-manual__section" id="manual-s4">
          <h3 class="gd-manual__section-title" data-i18n="manual_s4_title">
            Comunicación Interna
          </h3>
          <p class="gd-manual__section-body" data-i18n="manual_s4_body">
            Toda comunicación oficial entre socios se realiza a través de los
            canales habilitados en la plataforma. Las comunicaciones externas
            sobre los proyectos del club requieren aprobación previa.
          </p>
        </section>

        <!-- Sección 5 -->
        <section class="gd-manual__section" id="manual-s5">
          <h3 class="gd-manual__section-title" data-i18n="manual_s5_title">
            Resolución de Conflictos
          </h3>
          <p class="gd-manual__section-body" data-i18n="manual_s5_body">
            En caso de discrepancia entre socios, se activa el protocolo de
            mediación interna. Si no se alcanza acuerdo, el Comité de Arbitraje
            del club emite una resolución vinculante.
          </p>
        </section>

      </div>
    `;
    }

    // ── Aplicar i18n si el motor está disponible ──────────────
    _applyI18n() {
        if (!window.__CPII__?.i18n?.t) return;
        const t = window.__CPII__.i18n.t.bind(window.__CPII__.i18n);
        this.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            const translation = t(key);
            if (translation && translation !== key) {
                el.textContent = translation;
            }
        });
    }
}

// ── Autoregistro del Web Component ───────────────────────────
if (!customElements.get('gd-manual')) {
    customElements.define('gd-manual', GdManual);
}