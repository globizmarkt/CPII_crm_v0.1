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
      <div class="p-10 bg-white text-black font-sans max-w-5xl mx-auto border border-slate-200 shadow-sm">
        
        <header class="border-b-2 border-slate-900 pb-6 mb-8">
          <h1 class="text-3xl font-bold uppercase tracking-tight text-slate-900">
            MANUAL DE BUENAS PRÁCTICAS
          </h1>
          <p class="text-sm font-semibold text-slate-600 uppercase">
            Gestión y Crecimiento del [NOMBRE_DEL_CLUB] · Versión 1.0 · Marzo 2026 [cite: 10-12]
          </p>
        </header>

        <div class="bg-blue-100 p-4 border border-blue-200 mb-8">
          <p class="text-sm italic text-blue-900 leading-relaxed">
            <strong class="text-blue-900 font-bold">💡 PROPÓSITO:</strong> 
            Este manual recoge las directrices operativas para que cualquier miembro del equipo pueda replicar el sistema de captación, incorporación y fidelización de forma consistente y escalable. [cite: 13]
          </p>
        </div>

        <section class="mb-8">
          <h2 class="text-xl font-bold mb-4 border-b border-slate-300 pb-1 uppercase">1. PRINCIPIO RECTOR: UN SISTEMA DUPLICABLE</h2>
          <p class="mb-4 text-sm leading-relaxed text-slate-800">El objetivo es crear un sistema tan claro y sencillo que cualquier persona pueda ejecutarlo correctamente. [cite: 14-15]</p>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div class="bg-slate-50 p-4 border border-slate-200">
              <p class="text-xs font-bold mb-2 uppercase text-red-700">❌ Error común a evitar [cite: 16-19]</p>
              <ul class="text-xs space-y-1 list-disc pl-4 text-slate-700">
                <li>Explicar el proyecto con palabras propias.</li>
                <li>Responder todas las preguntas antes de tiempo.</li>
                <li>Mezclar mensajes y audiencias en una conversación.</li>
              </ul>
            </div>
            <div class="bg-blue-900 p-4 text-white rounded-sm">
              <p class="text-xs font-bold mb-2 uppercase text-blue-200">✅ La Regla de Oro</p>
              <p class="text-sm italic font-medium leading-relaxed">
                "Un prescriptor bien formado no convence: abre la puerta. El sistema hace el resto." [cite: 20-21]
              </p>
            </div>
          </div>
        </section>

        <section class="mb-8">
          <h2 class="text-xl font-bold mb-4 border-b border-slate-300 pb-1 uppercase">2. EL FLUJO DE CAPTACIÓN PASO A PASO</h2>
          <table class="w-full text-left text-xs border-collapse border border-slate-300">
            <thead>
              <tr class="bg-blue-900 text-white uppercase">
                <th class="p-3 border border-slate-300">Fase [cite: 24]</th>
                <th class="p-3 border border-slate-300">Acción</th>
                <th class="p-3 border border-slate-300">Nota Clave</th>
              </tr>
            </thead>
            <tbody>
              <tr><td class="p-2 border border-slate-300 font-bold bg-slate-50">Fase 1</td><td class="p-2 border border-slate-300">Envío de vídeo de presentación</td><td class="p-2 border border-slate-300 text-slate-600">Sin explicaciones adicionales.</td></tr>
              <tr><td class="p-2 border border-slate-300 font-bold bg-slate-50">Fase 2</td><td class="p-2 border border-slate-300">¿Qué es esto? (Señal de interés)</td><td class="p-2 border border-slate-300 text-slate-600 italic font-medium">El gancho está funcionando.</td></tr>
              <tr><td class="p-2 border border-slate-300 font-bold bg-slate-50">Fase 3</td><td class="p-2 border border-slate-300 font-semibold">Invitación al webinar</td><td class="p-2 border border-slate-300 text-slate-600">No responder preguntas. Redirigir.</td></tr>
              <tr><td class="p-2 border border-slate-300 font-bold bg-slate-50 text-slate-500">Fase 4</td><td class="p-2 border border-slate-300">Inscripción en webinar (Formulario)</td><td class="p-2 border border-slate-300 text-slate-500">Rastreo de origen del contacto.</td></tr>
              <tr class="bg-blue-50"><td class="p-2 border border-slate-300 font-bold text-blue-900">Fase 5</td><td class="p-2 border border-slate-300 font-bold">Inscripción en la web</td><td class="p-2 border border-slate-300 font-bold italic">Solo al final del webinar.</td></tr>
            </tbody>
          </table>
          <div class="mt-2 bg-blue-100 p-2 text-[10px] text-blue-900 border border-blue-200 font-bold uppercase italic">
            ⚠️ ATENCIÓN: El prescriptor asiste al webinar junto con su invitado para garantizar coherencia. [cite: 25]
          </div>
        </section>

        <section class="mb-8">
          <h2 class="text-xl font-bold mb-4 border-b border-slate-300 pb-1 uppercase">3. EL RECORRIDO DEL NUEVO MIEMBRO (ONBOARDING)</h2>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <ul class="text-sm list-decimal pl-5 space-y-2 text-slate-800 font-medium italic">
              <li>Inscripción en la página web. [cite: 28]</li>
              <li>Acceso y completado del onboarding completo. [cite: 29]</li>
              <li>Recepción de email de bienvenida. [cite: 30]</li>
              <li>Entrada en secuencia de emails de seguimiento. [cite: 31]</li>
            </ul>
            <div class="bg-blue-50 p-4 border border-blue-200 flex items-center italic">
              <p class="text-xs text-blue-900 font-medium">
                <strong>🎯 OBJETIVO:</strong> Que cada nuevo miembro sienta que hay un sistema que le acompaña, manteniéndole enfocado y motivado. [cite: 32]
              </p>
            </div>
          </div>
        </section>

        <section class="mb-8">
          <h2 class="text-xl font-bold mb-4 border-b border-slate-300 pb-1 uppercase">4. DOS TIPOS DE WEBINAR, DOS AUDIENCIAS</h2>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs">
            <div class="bg-blue-900 text-white p-4">
              <h4 class="font-bold mb-2 uppercase border-b border-blue-700 pb-1">🏠 WEBINAR A — Profesionales [cite: 36]</h4>
              <p class="text-blue-100">Perfil: Agentes, gestores, promotores. Contenido: Plataforma, producción e inversión.</p>
            </div>
            <div class="bg-blue-900 text-white p-4">
              <h4 class="font-bold mb-2 uppercase border-b border-blue-700 pb-1">💰 WEBINAR B — Inversores [cite: 36]</h4>
              <p class="text-blue-100">Perfil: Inversores externos. Contenido: Retorno y sistema de referidos.</p>
            </div>
          </div>
        </section>

        <section class="mb-8 text-sm">
          <h2 class="text-xl font-bold mb-4 border-b border-slate-300 pb-1 uppercase">5. SECUENCIA DE EMAILS AUTOMATIZADA</h2>
          <table class="w-full text-left text-xs border-collapse border border-slate-300 mb-2">
            <thead class="bg-slate-100 text-slate-600 uppercase text-[10px] tracking-widest">
              <tr><th class="p-2 border border-slate-300">Email [cite: 41]</th><th class="p-2 border border-slate-300">Envío</th><th class="p-2 border border-slate-300">Objetivo</th></tr>
            </thead>
            <tbody class="text-slate-700">
              <tr><td class="p-2 border border-slate-300 font-bold italic">Email 1</td><td class="p-2 border border-slate-300 italic">Tras onboarding</td><td class="p-2 border border-slate-300">Bienvenida calurosa. Tono motivador.</td></tr>
              <tr><td class="p-2 border border-slate-300 font-bold italic">Email 2</td><td class="p-2 border border-slate-300 italic">Primeros días</td><td class="p-2 border border-slate-300">Explicar funcionamiento de la plataforma.</td></tr>
              <tr class="bg-slate-50"><td class="p-2 border border-slate-300 font-bold">Newsletter</td><td class="p-2 border border-slate-300 font-bold italic">Recurrente</td><td class="p-2 border border-slate-300 font-medium">Mantener conexión y novedades.</td></tr>
            </tbody>
          </table>
          <p class="text-[10px] font-bold text-slate-500 uppercase italic">📌 Redactados con IA, revisados por [OPERATIVA] y aprobados por [DIRECCIÓN]. [cite: 42]</p>
        </section>

        <section class="mb-8 p-6 border-2 border-blue-900 bg-slate-50">
          <h2 class="text-xl font-bold mb-4 text-blue-900 uppercase">6. COMUNICACIÓN INTERNA (NOTAS DE AUDIO)</h2>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs italic">
            <ul class="space-y-1 list-disc pl-4 text-slate-800 font-medium leading-relaxed">
              <li>Más rápidas que escribir. [cite: 46]</li>
              <li>Capturan tono e intención. [cite: 47]</li>
              <li>Procesadas por IA para generar tareas. [cite: 48]</li>
              <li>Reducen reuniones innecesarias. [cite: 49]</li>
            </ul>
            <div class="bg-blue-900 text-white p-6 font-bold uppercase text-center flex items-center justify-center rounded-sm">
              <p class="text-sm tracking-wide leading-relaxed italic">
                "Cualquier idea o duda debe enviarse primero como nota de audio." [cite: 50]
              </p>
            </div>
          </div>
        </section>

        <section class="mb-8">
          <h2 class="text-xl font-bold mb-4 border-b border-slate-300 pb-1 uppercase italic italic tracking-widest italic">7. ROLES Y RESPONSABILIDADES</h2>
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 text-[11px] italic italic italic italic tracking-widest italic">
            <div class="p-3 border border-slate-300 bg-slate-50 italic">
              <strong class="block text-blue-900 uppercase italic">[DIRECCIÓN ESTRATÉGICA]</strong> Liderazgo, definición y aprobación. 
            </div>
            <div class="p-3 border border-slate-300 bg-slate-50 italic">
              <strong class="block text-blue-900 uppercase italic">[GESTIÓN OPERATIVA]</strong> Ejecución de webinars y soporte IA. 
            </div>
            <div class="p-3 border border-slate-300 bg-slate-50 italic">
              <strong class="block text-blue-900 uppercase italic">[EQUIPO IA]</strong> Redacción y procesamiento de contenidos. 
            </div>
            <div class="p-3 border border-slate-300 bg-slate-50 italic">
              <strong class="block text-blue-900 uppercase italic">PRESCRIPTORES</strong> Enviar vídeo e invitar. No vender. 
            </div>
            <div class="p-3 border border-slate-300 bg-slate-50 italic">
              <strong class="block text-blue-900 uppercase italic">STAFF</strong> Aportar ideas en formato audio. 
            </div>
          </div>
        </section>

        <section class="pb-6">
          <h2 class="text-xl font-bold mb-4 border-b border-slate-300 pb-1 uppercase italic italic tracking-widest italic">8. ESPACIO PARA VALORACIONES Y PREGUNTAS</h2>
          <div class="grid grid-cols-3 gap-2 h-24 italic italic italic italic tracking-widest italic italic">
            <div class="border border-slate-300 p-2 text-[9px] text-slate-400 uppercase italic font-bold">Valoraciones: [cite: 61]</div>
            <div class="border border-slate-300 p-2 text-[9px] text-slate-400 uppercase italic font-bold">Dudas: [cite: 61]</div>
            <div class="border border-slate-300 p-2 text-[9px] text-slate-400 uppercase italic font-bold">Sugerencias: [cite: 61]</div>
          </div>
        </section>

        <footer class="text-center pt-6 border-t border-slate-300 text-[9px] text-slate-500 font-bold uppercase italic italic italic tracking-[0.3em] italic">
          Manual de Buenas Prácticas · [NOMBRE_DEL_CLUB] · v1.0 [cite: 62]
        </footer>
      </div>
    `;
  }
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