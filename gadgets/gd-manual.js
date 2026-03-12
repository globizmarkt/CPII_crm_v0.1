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
 * window.__CPII__.tabManager.open('gd-manual')
 * — o directamente —
 * <gd-manual></gd-manual>
 */
class GdManual extends HTMLElement {

  connectedCallback() {
    this.classList.add('gd-manual');
    this.setAttribute('role', 'tabpanel');
    this.render();
    this._applyI18n();
  }

  disconnectedCallback() {
    // Limpieza si fuera necesaria
  }

  render() {
    this.innerHTML = `
      <div class="gd-manual__inner p-8 space-y-12 text-slate-300 max-w-5xl mx-auto font-display">
        
        <header class="border-b border-primary/20 pb-8">
          <h1 class="text-4xl font-serif text-accent-gold mb-2 uppercase italic tracking-tighter" data-i18n="manual_title">
            MANUAL DE BUENAS PRÁCTICAS
          </h1>
          <p class="text-sm tracking-widest text-slate-500 uppercase font-medium">
            Gestión y Crecimiento del Club · v1.0 · Marzo 2026
          </p>
        </header>

        <div class="luxury-glass p-6 rounded-xl border-l-4 border-accent-gold bg-black/20">
          <p class="text-lg leading-relaxed italic">
            <strong class="text-accent-gold font-bold italic">💡 PROPÓSITO:</strong> 
            Este manual recoge las directrices operativas para que cualquier miembro del equipo pueda replicar el sistema de captación, incorporación y fidelización de miembros de forma consistente y escalable[cite: 13].
          </p>
        </div>

        <section class="space-y-4">
          <h2 class="text-2xl font-bold text-slate-100 italic">1. PRINCIPIO RECTOR: UN SISTEMA DUPLICABLE</h2>
          <p class="text-slate-400">El objetivo es crear un sistema tan claro y sencillo que cualquier persona pueda ejecutarlo correctamente[cite: 14, 15].</p>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
            <div class="bg-red-900/10 p-4 rounded border border-red-900/20">
              <p class="text-xs text-red-400 font-bold mb-2 uppercase tracking-widest italic">❌ Errores a evitar</p>
              <ul class="text-xs space-y-2 list-disc pl-4 text-slate-400">
                <li>Explicar el proyecto con palabras propias[cite: 17].</li>
                <li>Responder todas las preguntas antes de tiempo[cite: 18].</li>
                <li>Mezclar mensajes, etapas y audiencias en una misma conversación[cite: 19].</li>
              </ul>
            </div>
            <div class="bg-green-900/10 p-4 rounded border border-accent-gold/30">
              <p class="text-xs text-accent-gold font-bold mb-2 uppercase italic tracking-widest italic">✅ LA REGLA DE ORO</p>
              <p class="text-sm font-medium leading-relaxed italic text-slate-200">
                "Un prescriptor bien formado no convence: abre la puerta. El sistema hace el resto." [cite: 21]
              </p>
            </div>
          </div>
        </section>

        <section class="space-y-4">
          <h2 class="text-2xl font-bold text-slate-100 italic">2. EL FLUJO DE CAPTACIÓN PASO A PASO</h2>
          <div class="overflow-x-auto rounded-xl border border-slate-800">
            <table class="w-full text-left text-sm border-collapse">
              <thead class="bg-slate-900 text-accent-gold uppercase text-[10px] tracking-widest">
                <tr>
                  <th class="p-4 border-b border-slate-800 italic">Fase</th>
                  <th class="p-4 border-b border-slate-800 italic">Acción</th>
                  <th class="p-4 border-b border-slate-800 italic">Responsable / Nota</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-slate-800">
                <tr><td class="p-4 font-bold text-slate-400 uppercase italic">Fase 1</td><td class="p-4 text-slate-300 italic">Envío de vídeo de presentación</td><td class="p-4 text-slate-500 italic">Sin explicaciones adicionales[cite: 24].</td></tr>
                <tr><td class="p-4 font-bold text-slate-400 uppercase italic">Fase 2</td><td class="p-4 text-slate-300 italic">¿Qué es esto? (Señal de interés)</td><td class="p-4 text-slate-500 italic">El gancho está funcionando[cite: 24].</td></tr>
                <tr><td class="p-4 font-bold text-slate-400 uppercase italic">Fase 3</td><td class="p-4 text-slate-300 italic">Invitación al webinar</td><td class="p-4 text-slate-500 italic">Redirigir, no responder[cite: 24].</td></tr>
                <tr><td class="p-4 font-bold text-slate-400 uppercase italic">Fase 4</td><td class="p-4 text-slate-300 italic">Inscripción en webinar</td><td class="p-4 text-slate-500 italic">Rastreo de origen del contacto[cite: 24].</td></tr>
                <tr><td class="p-4 font-bold text-accent-gold uppercase italic">Fase 5</td><td class="p-4 text-slate-100 font-bold uppercase italic">Inscripción en la web</td><td class="p-4 text-slate-500 italic italic">Solo al final del webinar[cite: 24].</td></tr>
              </tbody>
            </table>
          </div>
          <p class="text-xs italic text-slate-400 bg-primary/5 p-3 rounded">
            ⚠️ <strong>ATENCIÓN:</strong> El prescriptor asiste al webinar junto con su invitado para garantizar coherencia[cite: 25].
          </p>
        </section>

        <section class="space-y-4">
          <h2 class="text-2xl font-bold text-slate-100 italic">3. EL RECORRIDO DEL NUEVO MIEMBRO (ONBOARDING)</h2>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
            <ul class="space-y-3 text-sm list-decimal pl-5 text-slate-400 italic">
              <li>Inscripción en la página web[cite: 28].</li>
              <li>Acceso y completado del onboarding completo[cite: 29].</li>
              <li>Recepción de email de bienvenida[cite: 30].</li>
              <li>Entrada en secuencia de emails de seguimiento[cite: 31].</li>
            </ul>
            <div class="luxury-glass p-6 rounded-xl border border-accent-gold/20 italic">
              <p class="text-xs font-bold text-accent-gold mb-1 uppercase tracking-widest italic italic">🎯 OBJETIVO</p>
              <p class="text-sm italic">"Que cada nuevo miembro sienta que hay un sistema que le acompaña, no que está solo navegando." [cite: 32]</p>
            </div>
          </div>
        </section>

        <section class="space-y-4">
          <h2 class="text-2xl font-bold text-slate-100 italic">4. DOS TIPOS DE WEBINAR, DOS AUDIENCIAS</h2>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div class="p-5 border border-slate-800 rounded-lg">
              <h4 class="text-accent-gold font-bold mb-3 uppercase italic text-sm">🏠 WEBINAR A — Profesionales</h4>
              <p class="text-xs text-slate-400 leading-relaxed italic">Perfil: agentes, gestores, promotores. Contenido: plataforma, producción e inversión[cite: 36].</p>
            </div>
            <div class="p-5 border border-slate-800 rounded-lg">
              <h4 class="text-accent-gold font-bold mb-3 uppercase italic text-sm">💰 WEBINAR B — Inversores</h4>
              <p class="text-xs text-slate-400 leading-relaxed italic">Perfil: inversores externos. Contenido: retornos y sistema de referenciadores[cite: 36].</p>
            </div>
          </div>
        </section>

        <section class="space-y-4">
          <h2 class="text-2xl font-bold text-slate-100 italic">5. SECUENCIA DE EMAILS</h2>
          <div class="overflow-x-auto rounded-xl border border-slate-800">
            <table class="w-full text-left text-sm border-collapse italic">
              <thead class="bg-slate-900 text-slate-500 uppercase text-[10px] tracking-widest italic">
                <tr><th class="p-3">Email</th><th class="p-3">Momento</th><th class="p-3">Objetivo</th></tr>
              </thead>
              <tbody class="divide-y divide-slate-800 text-xs">
                <tr><td class="p-3">Email 1</td><td class="p-3">Tras onboarding</td><td class="p-3 text-slate-400">Bienvenida calurosa[cite: 41].</td></tr>
                <tr><td class="p-3">Email 2</td><td class="p-3">Primeros días</td><td class="p-3 text-slate-400">Facilitar los primeros pasos[cite: 41].</td></tr>
                <tr><td class="p-3 font-bold italic">Email 3+</td><td class="p-3 font-bold italic">Recurrente</td><td class="p-3 text-slate-400 italic">Newsletter y novedades[cite: 41].</td></tr>
              </tbody>
            </table>
          </div>
          <p class="text-[10px] text-slate-500 italic uppercase">📌 Importante: Redactados con IA, revisados por Kelly y aprobados por David[cite: 42].</p>
        </section>

        <section class="gatekeeper-overlay p-8 rounded-2xl border border-primary/20">
          <h2 class="text-2xl font-bold text-accent-gold mb-4 uppercase italic">6. COMUNICACIÓN INTERNA (NOTAS DE AUDIO)</h2>
          <p class="text-sm mb-6 text-slate-300 italic">La nota de audio es la forma más rápida y natural de comunicarse dentro del equipo[cite: 50].</p>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <ul class="text-xs space-y-2 list-disc pl-4 text-slate-400 italic font-medium">
              <li>Más rápidas que escribir mensajes largos[cite: 46].</li>
              <li>Capturan el tono y la intención[cite: 47].</li>
              <li>Transcripción y procesamiento automático con IA[cite: 48].</li>
              <li>Reducción de reuniones innecesarias[cite: 49].</li>
            </ul>
            <div class="luxury-glass p-5 rounded border border-accent-gold/20 italic">
              <p class="text-[10px] uppercase font-bold text-accent-gold mb-2 italic tracking-[0.2em] italic">📣 NORMA SAGRADA</p>
              <p class="text-sm italic italic leading-relaxed">"Cualquier idea o duda debe enviarse primero como nota de audio." [cite: 50]</p>
            </div>
          </div>
        </section>

        <section class="space-y-4">
          <h2 class="text-2xl font-bold text-slate-100 italic italic">7. ROLES Y RESPONSABILIDADES</h2>
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-xs italic">
            <div class="p-4 border border-slate-800 rounded bg-slate-900/30">
              <strong class="text-accent-gold block mb-1 italic uppercase tracking-widest italic">David</strong> Liderazgo estratégico y aprobación[cite: 58].
            </div>
            <div class="p-4 border border-slate-800 rounded bg-slate-900/30">
              <strong class="text-accent-gold block mb-1 italic uppercase tracking-widest italic">Kelly</strong> Ejecución operativa y webinars[cite: 58].
            </div>
            <div class="p-4 border border-slate-800 rounded bg-slate-900/30">
              <strong class="text-accent-gold block mb-1 italic uppercase tracking-widest italic">Equipo IA</strong> Procesamiento de audios y contenidos[cite: 58].
            </div>
            <div class="p-4 border border-slate-800 rounded bg-slate-900/30">
              <strong class="text-accent-gold block mb-1 italic uppercase tracking-widest italic">Prescriptores</strong> Enviar vídeo y no vender[cite: 58].
            </div>
            <div class="p-4 border border-slate-800 rounded bg-slate-900/30">
              <strong class="text-accent-gold block mb-1 italic uppercase tracking-widest italic">Nuevos Miembros</strong> Notas de audio. No improvisar[cite: 58].
            </div>
          </div>
        </section>

        <section class="space-y-4 pb-12 italic">
          <h2 class="text-2xl font-bold text-slate-100 italic italic">8. VALORACIONES Y PREGUNTAS</h2>
          <p class="text-xs text-slate-500 mb-4 italic italic">Este es un documento vivo. Plantea tus dudas aquí antes de la reunión[cite: 60].</p>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4 h-32 italic">
            <div class="border border-slate-800 p-4 rounded text-[10px] text-slate-600 uppercase italic italic tracking-widest italic">Valoraciones:</div>
            <div class="border border-slate-800 p-4 rounded text-[10px] text-slate-600 uppercase italic italic tracking-widest italic">Preguntas/Dudas:</div>
            <div class="border border-slate-800 p-4 rounded text-[10px] text-slate-600 uppercase italic italic tracking-widest italic">Sugerencias:</div>
          </div>
        </section>

      </div>
    `;
  }

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

if (!customElements.get('gd-manual')) {
  customElements.define('gd-manual', GdManual);
}