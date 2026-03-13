/**
 * CPII — gd-manual.js
 * Versión: v2.0 — Modelo Híbrido Autónomo
 * Gadget: Manual de Buenas Prácticas
 * Ruta: gadgets/gd-manual.js
 *
 * ARQUITECTURA:
 * - Diccionario interno PT/ES/EN/FR (no contamina core/i18n.js)
 * - Lee idioma desde localStorage 'cpii:locale' o window.__CPII__.config.lang
 * - render() inyecta HTML con textos del idioma activo directamente
 * - Light DOM — hereda var(--theme-*) y clases Tailwind sin Shadow DOM
 * - Escucha evento 'cpii:lang:change' para re-renderizar al cambiar idioma
 *
 * Índice:
 * [SEC-01] Diccionario interno PT/ES/EN/FR
 * [SEC-02] Clase GdManual y ciclo de vida
 * [SEC-03] getLang() — detección de idioma
 * [SEC-04] render() — HTML con textos inyectados
 * [SEC-05] Registro y listener de cambio de idioma
 */

// ── [SEC-01] Diccionario interno ──────────────────────────────
const MANUAL_I18N = {
  pt: {
    version: "Versão 1.0 · Março 2026",
    title: "Manual de Boas Práticas",
    subtitle: "Gestão e Crescimento do Clube Privado de Investimento Imobiliário",
    purpose: "Este manual recolhe as diretrizes operativas para que qualquer membro da equipa possa replicar o sistema de captação, integração e fidelização de membros do clube de forma consistente e escalável.",
    s1_title: "1. Princípio Orientador: Um Sistema Duplicável",
    s1_intro: "O objetivo é criar um sistema tão claro e simples que qualquer pessoa possa executá-lo corretamente.",
    s1_avoid: "❌ Erros a evitar",
    s1_err1: "Explicar o projeto com palavras próprias.",
    s1_err2: "Responder todas as perguntas antes do tempo.",
    s1_err3: "Misturar mensagens e audiências numa conversa.",
    s1_rule_label: "✅ A Regra de Ouro",
    s1_rule: '"Um prescritor bem formado não convence: abre a porta. O sistema faz o resto."',
    s2_title: "2. O Fluxo de Captação Passo a Passo",
    s2_th_phase: "Fase", s2_th_action: "Ação", s2_th_note: "Nota Chave",
    s2_f1_phase: "Fase 1", s2_f1_action: "Envio do vídeo de apresentação", s2_f1_note: "Sem explicações adicionais.",
    s2_f2_phase: "Fase 2", s2_f2_action: "O que é isto? (Sinal de interesse)", s2_f2_note: "O gancho está a funcionar.",
    s2_f3_phase: "Fase 3", s2_f3_action: "Convite para o webinar", s2_f3_note: "Não responder perguntas. Redirecionar.",
    s2_f4_phase: "Fase 4", s2_f4_action: "Inscrição no webinar (Formulário)", s2_f4_note: "Rastreio da origem do contacto.",
    s2_f5_phase: "Fase 5", s2_f5_action: "Inscrição na web", s2_f5_note: "Apenas no final do webinar.",
    s2_warning: "⚠️ ATENÇÃO: O prescritor assiste ao webinar junto com o seu convidado para garantir coerência.",
    s3_title: "3. O Percurso do Novo Membro (Onboarding)",
    s3_step1: "Inscrição na página web.", s3_step2: "Acesso e completação do onboarding completo.",
    s3_step3: "Receção de email de boas-vindas.", s3_step4: "Entrada na sequência de emails de acompanhamento.",
    s3_goal_label: "🎯 OBJETIVO:", s3_goal: "Que cada novo membro sinta que há um sistema que o acompanha, mantendo-o focado e motivado.",
    s4_title: "4. Dois Tipos de Webinar, Duas Audiências",
    s4_wa_label: "🏠 WEBINAR A — Profissionais", s4_wa_body: "Perfil: Agentes, gestores, promotores. Conteúdo: Plataforma, produção e investimento.",
    s4_wb_label: "💰 WEBINAR B — Investidores", s4_wb_body: "Perfil: Investidores externos. Conteúdo: Retorno e sistema de referidos.",
    s5_title: "5. Sequência de Emails Automatizada",
    s5_th_email: "Email", s5_th_when: "Envio", s5_th_goal: "Objetivo",
    s5_e1_label: "Email 1", s5_e1_when: "Após onboarding", s5_e1_goal: "Boas-vindas calorosas. Tom motivador.",
    s5_e2_label: "Email 2", s5_e2_when: "Primeiros dias", s5_e2_goal: "Explicar o funcionamento da plataforma.",
    s5_e3_label: "Newsletter", s5_e3_when: "Recorrente", s5_e3_goal: "Manter ligação e novidades.",
    s5_note: "📌 Redigidos com IA, revistos pela Equipa Técnica e aprovados pela Equipa de Fundadores.",
    s6_title: "6. Comunicação Interna (Notas de Áudio)",
    s6_li1: "Mais rápidas que escrever.", s6_li2: "Captam tom e intenção.",
    s6_li3: "Processadas por IA para gerar tarefas.", s6_li4: "Reduzem reuniões desnecessárias.",
    s6_rule: '"Qualquer ideia ou dúvida deve ser enviada primeiro como nota de áudio."',
    s7_title: "7. Papéis e Responsabilidades",
    s7_r1_role: "DIREÇÃO ESTRATÉGICA", s7_r1_desc: "Liderança, definição e aprovação.",
    s7_r2_role: "GESTÃO OPERATIVA", s7_r2_desc: "Execução de webinars e suporte IA.",
    s7_r3_role: "EQUIPA TÉCNICA", s7_r3_desc: "Redação e processamento de conteúdos.",
    s7_r4_role: "PRESCRITORES", s7_r4_desc: "Enviar vídeo e convidar. Não vender.",
    s7_r5_role: "STAFF", s7_r5_desc: "Contribuir com ideias em formato áudio.",
    s8_title: "8. Espaço para Avaliações e Perguntas",
    s8_q1: "Avaliações:", s8_q2: "Dúvidas:", s8_q3: "Sugestões:",
    footer: "Manual de Boas Práticas · Club Privado de Investimento Imobiliário · v1.0",
  },
  es: {
    version: "Versión 1.0 · Marzo 2026",
    title: "Manual de Buenas Prácticas",
    subtitle: "Gestión y Crecimiento del Club Privado de Inversión Inmobiliaria",
    purpose: "Este manual recoge las directrices operativas para que cualquier miembro del equipo pueda replicar el sistema de captación, incorporación y fidelización de forma consistente y escalable.",
    s1_title: "1. Principio Rector: Un Sistema Duplicable",
    s1_intro: "El objetivo es crear un sistema tan claro y sencillo que cualquier persona pueda ejecutarlo correctamente.",
    s1_avoid: "❌ Error común a evitar",
    s1_err1: "Explicar el proyecto con palabras propias.",
    s1_err2: "Responder todas las preguntas antes de tiempo.",
    s1_err3: "Mezclar mensajes y audiencias en una conversación.",
    s1_rule_label: "✅ La Regla de Oro",
    s1_rule: '"Un prescriptor bien formado no convence: abre la puerta. El sistema hace el resto."',
    s2_title: "2. El Flujo de Captación Paso a Paso",
    s2_th_phase: "Fase", s2_th_action: "Acción", s2_th_note: "Nota Clave",
    s2_f1_phase: "Fase 1", s2_f1_action: "Envío de vídeo de presentación", s2_f1_note: "Sin explicaciones adicionales.",
    s2_f2_phase: "Fase 2", s2_f2_action: "¿Qué es esto? (Señal de interés)", s2_f2_note: "El gancho está funcionando.",
    s2_f3_phase: "Fase 3", s2_f3_action: "Invitación al webinar", s2_f3_note: "No responder preguntas. Redirigir.",
    s2_f4_phase: "Fase 4", s2_f4_action: "Inscripción en webinar (Formulario)", s2_f4_note: "Rastreo de origen del contacto.",
    s2_f5_phase: "Fase 5", s2_f5_action: "Inscripción en la web", s2_f5_note: "Solo al final del webinar.",
    s2_warning: "⚠️ ATENCIÓN: El prescriptor asiste al webinar junto con su invitado para garantizar coherencia.",
    s3_title: "3. El Recorrido del Nuevo Miembro (Onboarding)",
    s3_step1: "Inscripción en la página web.", s3_step2: "Acceso y completado del onboarding completo.",
    s3_step3: "Recepción de email de bienvenida.", s3_step4: "Entrada en secuencia de emails de seguimiento.",
    s3_goal_label: "🎯 OBJETIVO:", s3_goal: "Que cada nuevo miembro sienta que hay un sistema que le acompaña, manteniéndole enfocado y motivado.",
    s4_title: "4. Dos Tipos de Webinar, Dos Audiencias",
    s4_wa_label: "🏠 WEBINAR A — Profesionales", s4_wa_body: "Perfil: Agentes, gestores, promotores. Contenido: Plataforma, producción e inversión.",
    s4_wb_label: "💰 WEBINAR B — Inversores", s4_wb_body: "Perfil: Inversores externos. Contenido: Retorno y sistema de referidos.",
    s5_title: "5. Secuencia de Emails Automatizada",
    s5_th_email: "Email", s5_th_when: "Envío", s5_th_goal: "Objetivo",
    s5_e1_label: "Email 1", s5_e1_when: "Tras onboarding", s5_e1_goal: "Bienvenida calurosa. Tono motivador.",
    s5_e2_label: "Email 2", s5_e2_when: "Primeros días", s5_e2_goal: "Explicar el funcionamiento de la plataforma.",
    s5_e3_label: "Newsletter", s5_e3_when: "Recurrente", s5_e3_goal: "Mantener conexión y novedades.",
    s5_note: "📌 Redactados con IA, revisados por Equipo Técnico y aprobados por Equipo de Fundadores.",
    s6_title: "6. Comunicación Interna (Notas de Audio)",
    s6_li1: "Más rápidas que escribir.", s6_li2: "Capturan tono e intención.",
    s6_li3: "Procesadas por IA para generar tareas.", s6_li4: "Reducen reuniones innecesarias.",
    s6_rule: '"Cualquier idea o duda debe enviarse primero como nota de audio."',
    s7_title: "7. Roles y Responsabilidades",
    s7_r1_role: "DIRECCIÓN ESTRATÉGICA", s7_r1_desc: "Liderazgo, definición y aprobación.",
    s7_r2_role: "GESTIÓN OPERATIVA", s7_r2_desc: "Ejecución de webinars y soporte IA.",
    s7_r3_role: "EQUIPO TÉCNICO", s7_r3_desc: "Redacción y procesamiento de contenidos.",
    s7_r4_role: "PRESCRIPTORES", s7_r4_desc: "Enviar vídeo e invitar. No vender.",
    s7_r5_role: "STAFF", s7_r5_desc: "Aportar ideas en formato audio.",
    s8_title: "8. Espacio para Valoraciones y Preguntas",
    s8_q1: "Valoraciones:", s8_q2: "Dudas:", s8_q3: "Sugerencias:",
    footer: "Manual de Buenas Prácticas · Club Privado de Inversión Inmobiliaria · v1.0",
  },
  en: {
    version: "Version 1.0 · March 2026",
    title: "Best Practices Manual",
    subtitle: "Management and Growth of the Private Real Estate Investment Club",
    purpose: "This manual gathers the operational guidelines so that any team member can replicate the member acquisition, onboarding and retention system in a consistent and scalable way.",
    s1_title: "1. Core Principle: A Duplicable System",
    s1_intro: "The goal is to create a system so clear and simple that anyone can execute it correctly.",
    s1_avoid: "❌ Common errors to avoid",
    s1_err1: "Explaining the project in your own words.",
    s1_err2: "Answering all questions before the right time.",
    s1_err3: "Mixing messages and audiences in one conversation.",
    s1_rule_label: "✅ The Golden Rule",
    s1_rule: '"A well-trained prescriber does not convince: they open the door. The system does the rest."',
    s2_title: "2. The Acquisition Flow Step by Step",
    s2_th_phase: "Phase", s2_th_action: "Action", s2_th_note: "Key Note",
    s2_f1_phase: "Phase 1", s2_f1_action: "Send the presentation video", s2_f1_note: "No additional explanations.",
    s2_f2_phase: "Phase 2", s2_f2_action: "What is this? (Interest signal)", s2_f2_note: "The hook is working.",
    s2_f3_phase: "Phase 3", s2_f3_action: "Invitation to the webinar", s2_f3_note: "Do not answer questions. Redirect.",
    s2_f4_phase: "Phase 4", s2_f4_action: "Webinar registration (Form)", s2_f4_note: "Track the origin of each contact.",
    s2_f5_phase: "Phase 5", s2_f5_action: "Website registration", s2_f5_note: "Only at the end of the webinar.",
    s2_warning: "⚠️ ATTENTION: The prescriber attends the webinar with their guest to ensure consistency.",
    s3_title: "3. New Member Journey (Onboarding)",
    s3_step1: "Registration on the website.", s3_step2: "Access and completion of full onboarding.",
    s3_step3: "Receipt of welcome email.", s3_step4: "Entry into the follow-up email sequence.",
    s3_goal_label: "🎯 GOAL:", s3_goal: "Every new member should feel that there is a system supporting them, keeping them focused and motivated.",
    s4_title: "4. Two Types of Webinar, Two Audiences",
    s4_wa_label: "🏠 WEBINAR A — Professionals", s4_wa_body: "Profile: Agents, managers, developers. Content: Platform, production and investment.",
    s4_wb_label: "💰 WEBINAR B — Investors", s4_wb_body: "Profile: External investors. Content: Return and referral system.",
    s5_title: "5. Automated Email Sequence",
    s5_th_email: "Email", s5_th_when: "Sent", s5_th_goal: "Goal",
    s5_e1_label: "Email 1", s5_e1_when: "After onboarding", s5_e1_goal: "Warm welcome. Motivating tone.",
    s5_e2_label: "Email 2", s5_e2_when: "First days", s5_e2_goal: "Explain how the platform works.",
    s5_e3_label: "Newsletter", s5_e3_when: "Recurring", s5_e3_goal: "Maintain connection and share news.",
    s5_note: "📌 Written with AI, reviewed by Technical Team and approved by Founders Team.",
    s6_title: "6. Internal Communication (Audio Notes)",
    s6_li1: "Faster than writing.", s6_li2: "Capture tone and intention.",
    s6_li3: "Processed by AI to generate tasks.", s6_li4: "Reduce unnecessary meetings.",
    s6_rule: '"Any idea or doubt must be sent first as an audio note."',
    s7_title: "7. Roles and Responsibilities",
    s7_r1_role: "STRATEGIC DIRECTION", s7_r1_desc: "Leadership, definition and approval.",
    s7_r2_role: "OPERATIONAL MANAGEMENT", s7_r2_desc: "Webinar execution and AI support.",
    s7_r3_role: "TECHNICAL TEAM", s7_r3_desc: "Content writing and processing.",
    s7_r4_role: "PRESCRIBERS", s7_r4_desc: "Send video and invite. Do not sell.",
    s7_r5_role: "STAFF", s7_r5_desc: "Contribute ideas in audio format.",
    s8_title: "8. Space for Feedback and Questions",
    s8_q1: "Feedback:", s8_q2: "Doubts:", s8_q3: "Suggestions:",
    footer: "Best Practices Manual · Private Real Estate Investment Club · v1.0",
  },
  fr: {
    version: "Version 1.0 · Mars 2026",
    title: "Manuel des Bonnes Pratiques",
    subtitle: "Gestion et Croissance du Club Privé d'Investissement Immobilier",
    purpose: "Ce manuel rassemble les directives opérationnelles pour que tout membre de l'équipe puisse répliquer le système d'acquisition, d'intégration et de fidélisation des membres du club de façon cohérente et évolutive.",
    s1_title: "1. Principe Directeur: Un Système Duplicable",
    s1_intro: "L'objectif est de créer un système si clair et simple que n'importe qui peut l'exécuter correctement.",
    s1_avoid: "❌ Erreurs courantes à éviter",
    s1_err1: "Expliquer le projet avec ses propres mots.",
    s1_err2: "Répondre à toutes les questions avant le bon moment.",
    s1_err3: "Mélanger messages et audiences dans une conversation.",
    s1_rule_label: "✅ La Règle d'Or",
    s1_rule: '"Un prescripteur bien formé ne convainc pas: il ouvre la porte. Le système fait le reste."',
    s2_title: "2. Le Flux d'Acquisition Étape par Étape",
    s2_th_phase: "Phase", s2_th_action: "Action", s2_th_note: "Note Clé",
    s2_f1_phase: "Phase 1", s2_f1_action: "Envoi de la vidéo de présentation", s2_f1_note: "Sans explications supplémentaires.",
    s2_f2_phase: "Phase 2", s2_f2_action: "Qu'est-ce que c'est? (Signal d'intérêt)", s2_f2_note: "L'accroche fonctionne.",
    s2_f3_phase: "Phase 3", s2_f3_action: "Invitation au webinaire", s2_f3_note: "Ne pas répondre. Rediriger.",
    s2_f4_phase: "Phase 4", s2_f4_action: "Inscription au webinaire (Formulaire)", s2_f4_note: "Suivi de l'origine du contact.",
    s2_f5_phase: "Phase 5", s2_f5_action: "Inscription sur le site", s2_f5_note: "Seulement à la fin du webinaire.",
    s2_warning: "⚠️ ATTENTION: Le prescripteur assiste au webinaire avec son invité pour garantir la cohérence.",
    s3_title: "3. Le Parcours du Nouveau Membre (Onboarding)",
    s3_step1: "Inscription sur le site web.", s3_step2: "Accès et complétion de l'onboarding complet.",
    s3_step3: "Réception de l'email de bienvenue.", s3_step4: "Entrée dans la séquence d'emails de suivi.",
    s3_goal_label: "🎯 OBJECTIF:", s3_goal: "Que chaque nouveau membre sente qu'il y a un système qui l'accompagne, le gardant concentré et motivé.",
    s4_title: "4. Deux Types de Webinaire, Deux Audiences",
    s4_wa_label: "🏠 WEBINAIRE A — Professionnels", s4_wa_body: "Profil: Agents, gestionnaires, promoteurs. Contenu: Plateforme, production et investissement.",
    s4_wb_label: "💰 WEBINAIRE B — Investisseurs", s4_wb_body: "Profil: Investisseurs externes. Contenu: Rendement et système de parrainage.",
    s5_title: "5. Séquence d'Emails Automatisée",
    s5_th_email: "Email", s5_th_when: "Envoi", s5_th_goal: "Objectif",
    s5_e1_label: "Email 1", s5_e1_when: "Après l'onboarding", s5_e1_goal: "Bienvenue chaleureuse. Ton motivant.",
    s5_e2_label: "Email 2", s5_e2_when: "Premiers jours", s5_e2_goal: "Expliquer le fonctionnement de la plateforme.",
    s5_e3_label: "Newsletter", s5_e3_when: "Récurrente", s5_e3_goal: "Maintenir le lien et les nouveautés.",
    s5_note: "📌 Rédigés avec IA, relus par l'Équipe Technique et approuvés par l'Équipe des Fondateurs.",
    s6_title: "6. Communication Interne (Notes Audio)",
    s6_li1: "Plus rapides qu'écrire.", s6_li2: "Captent le ton et l'intention.",
    s6_li3: "Traitées par IA pour générer des tâches.", s6_li4: "Réduisent les réunions inutiles.",
    s6_rule: '"Toute idée ou doute doit d\'abord être envoyé en note audio."',
    s7_title: "7. Rôles et Responsabilités",
    s7_r1_role: "DIRECTION STRATÉGIQUE", s7_r1_desc: "Leadership, définition et approbation.",
    s7_r2_role: "GESTION OPÉRATIONNELLE", s7_r2_desc: "Exécution des webinaires et support IA.",
    s7_r3_role: "ÉQUIPE TECHNIQUE", s7_r3_desc: "Rédaction et traitement des contenus.",
    s7_r4_role: "PRESCRIPTEURS", s7_r4_desc: "Envoyer la vidéo et inviter. Ne pas vendre.",
    s7_r5_role: "STAFF", s7_r5_desc: "Contribuer avec des idées en format audio.",
    s8_title: "8. Espace pour Évaluations et Questions",
    s8_q1: "Évaluations:", s8_q2: "Doutes:", s8_q3: "Suggestions:",
    footer: "Manuel des Bonnes Pratiques · Club Privé d'Investissement Immobilier · v1.0",
  }
};

// ── [SEC-02] Clase GdManual ───────────────────────────────────
class GdManual extends HTMLElement {

  connectedCallback() {
    this.classList.add('gd-manual');
    this.setAttribute('role', 'tabpanel');
    this.render();
  }

  disconnectedCallback() { }

  // ── [SEC-03] Detección de idioma ────────────────────────────
  getLang() {
    const fromBootstrapper = window.__CPII__?.config?.lang;
    const fromStorage = localStorage.getItem('cpii:locale');
    const lang = fromBootstrapper || fromStorage || 'pt';
    return MANUAL_I18N[lang] ? lang : 'pt';
  }

  // ── [SEC-04] Render con textos del idioma activo ────────────
  render() {
    const T = MANUAL_I18N[this.getLang()];
    this.innerHTML = `
      <div class="p-10 bg-theme-bg text-theme-text font-sans max-w-5xl mx-auto border border-theme-border">
        <header class="mb-8">
          <div class="bg-[var(--theme-ink)] text-white p-6">
            <h1 class="text-3xl font-bold uppercase tracking-tight">${T.title}</h1>
            <p class="text-sm font-semibold uppercase opacity-70 mt-1">${T.subtitle} · ${T.version}</p>
          </div>
        </header>

        <div class="bg-theme-surface p-4 border border-theme-border mb-8">
          <p class="text-sm italic text-theme-text leading-relaxed"><strong class="font-bold">💡 </strong>${T.purpose}</p>
        </div>

        <section class="mb-8">
          <h2 class="text-xl font-bold mb-4 border-b-2 border-[var(--theme-ink)] pb-1 uppercase text-[var(--theme-ink)]">${T.s1_title}</h2>
          <p class="mb-4 text-sm leading-relaxed text-theme-text">${T.s1_intro}</p>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div class="bg-theme-surface p-4 border border-theme-border">
              <p class="text-xs font-bold mb-2 uppercase text-red-700">${T.s1_avoid}</p>
              <ul class="text-xs space-y-1 list-disc pl-4 text-theme-text-muted">
                <li>${T.s1_err1}</li><li>${T.s1_err2}</li><li>${T.s1_err3}</li>
              </ul>
            </div>
            <div class="bg-theme-border-active p-4 text-theme-bg">
              <p class="text-xs font-bold mb-2 uppercase text-theme-bg opacity-70">${T.s1_rule_label}</p>
              <p class="text-sm italic font-medium leading-relaxed">${T.s1_rule}</p>
            </div>
          </div>
        </section>

        <section class="mb-8">
          <h2 class="text-xl font-bold mb-4 border-b-2 border-[var(--theme-ink)] pb-1 uppercase text-[var(--theme-ink)]">${T.s2_title}</h2>
          <table class="w-full text-left text-xs border-collapse border border-theme-border">
            <thead><tr class="bg-[var(--theme-ink)] text-white uppercase">
              <th class="p-3 border border-theme-border">${T.s2_th_phase}</th>
              <th class="p-3 border border-theme-border">${T.s2_th_action}</th>
              <th class="p-3 border border-theme-border">${T.s2_th_note}</th>
            </tr></thead>
            <tbody>
              <tr><td class="p-2 border border-theme-border font-bold bg-theme-surface">${T.s2_f1_phase}</td><td class="p-2 border border-theme-border">${T.s2_f1_action}</td><td class="p-2 border border-theme-border text-theme-text-muted">${T.s2_f1_note}</td></tr>
              <tr><td class="p-2 border border-theme-border font-bold bg-theme-surface">${T.s2_f2_phase}</td><td class="p-2 border border-theme-border">${T.s2_f2_action}</td><td class="p-2 border border-theme-border text-theme-text-muted italic font-medium">${T.s2_f2_note}</td></tr>
              <tr><td class="p-2 border border-theme-border font-bold bg-theme-surface">${T.s2_f3_phase}</td><td class="p-2 border border-theme-border font-semibold">${T.s2_f3_action}</td><td class="p-2 border border-theme-border text-theme-text-muted">${T.s2_f3_note}</td></tr>
              <tr><td class="p-2 border border-theme-border font-bold bg-theme-surface">${T.s2_f4_phase}</td><td class="p-2 border border-theme-border">${T.s2_f4_action}</td><td class="p-2 border border-theme-border text-theme-text-muted">${T.s2_f4_note}</td></tr>
              <tr class="bg-theme-surface"><td class="p-2 border border-theme-border font-bold text-theme-border-active">${T.s2_f5_phase}</td><td class="p-2 border border-theme-border font-bold">${T.s2_f5_action}</td><td class="p-2 border border-theme-border font-bold italic">${T.s2_f5_note}</td></tr>
            </tbody>
          </table>
          <div class="mt-2 bg-theme-surface p-2 text-[10px] text-theme-text-muted border border-theme-border font-bold uppercase italic">${T.s2_warning}</div>
        </section>

        <section class="mb-8">
          <h2 class="text-xl font-bold mb-4 border-b-2 border-[var(--theme-ink)] pb-1 uppercase text-[var(--theme-ink)]">${T.s3_title}</h2>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <ul class="text-sm list-decimal pl-5 space-y-2 text-theme-text-muted font-medium italic">
              <li>${T.s3_step1}</li><li>${T.s3_step2}</li><li>${T.s3_step3}</li><li>${T.s3_step4}</li>
            </ul>
            <div class="bg-theme-surface p-4 border border-theme-border flex items-center italic">
              <p class="text-xs text-theme-text font-medium"><strong>${T.s3_goal_label}</strong> ${T.s3_goal}</p>
            </div>
          </div>
        </section>

        <section class="mb-8">
          <h2 class="text-xl font-bold mb-4 border-b-2 border-[var(--theme-ink)] pb-1 uppercase text-[var(--theme-ink)]">${T.s4_title}</h2>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs">
            <div class="bg-theme-border-active text-theme-bg p-4">
              <h4 class="font-bold mb-2 uppercase border-b border-theme-border pb-1">${T.s4_wa_label}</h4>
              <p class="text-theme-bg opacity-80">${T.s4_wa_body}</p>
            </div>
            <div class="bg-theme-border-active text-theme-bg p-4">
              <h4 class="font-bold mb-2 uppercase border-b border-theme-border pb-1">${T.s4_wb_label}</h4>
              <p class="text-theme-bg opacity-80">${T.s4_wb_body}</p>
            </div>
          </div>
        </section>

        <section class="mb-8 text-sm">
          <h2 class="text-xl font-bold mb-4 border-b-2 border-[var(--theme-ink)] pb-1 uppercase text-[var(--theme-ink)]">${T.s5_title}</h2>
          <table class="w-full text-left text-xs border-collapse border border-theme-border mb-2">
            <thead class="bg-[var(--theme-ink)] text-white uppercase text-[10px] tracking-widest">
              <tr><th class="p-2 border border-theme-border">${T.s5_th_email}</th><th class="p-2 border border-theme-border">${T.s5_th_when}</th><th class="p-2 border border-theme-border">${T.s5_th_goal}</th></tr>
            </thead>
            <tbody class="text-theme-text">
              <tr><td class="p-2 border border-theme-border font-bold italic">${T.s5_e1_label}</td><td class="p-2 border border-theme-border italic">${T.s5_e1_when}</td><td class="p-2 border border-theme-border">${T.s5_e1_goal}</td></tr>
              <tr><td class="p-2 border border-theme-border font-bold italic">${T.s5_e2_label}</td><td class="p-2 border border-theme-border italic">${T.s5_e2_when}</td><td class="p-2 border border-theme-border">${T.s5_e2_goal}</td></tr>
              <tr class="bg-theme-surface"><td class="p-2 border border-theme-border font-bold">${T.s5_e3_label}</td><td class="p-2 border border-theme-border font-bold italic">${T.s5_e3_when}</td><td class="p-2 border border-theme-border font-medium">${T.s5_e3_goal}</td></tr>
            </tbody>
          </table>
          <p class="text-[10px] font-bold text-theme-text-muted uppercase italic">${T.s5_note}</p>
        </section>

        <div class="p-6 border-2 border-theme-border-active bg-theme-surface">
          <h2 class="text-xl font-bold mb-4 border-b-2 border-[var(--theme-ink)] pb-1 uppercase text-[var(--theme-ink)]">${T.s6_title}</h2>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs italic">
            <ul class="space-y-1 list-disc pl-4 text-theme-text font-medium leading-relaxed">
              <li>${T.s6_li1}</li><li>${T.s6_li2}</li><li>${T.s6_li3}</li><li>${T.s6_li4}</li>
            </ul>
            <div class="bg-theme-border-active text-theme-bg p-6 font-bold uppercase text-center flex items-center justify-center">
              <p class="text-sm tracking-wide leading-relaxed italic">${T.s6_rule}</p>
            </div>
          </div>
        </div>

        <section class="mb-8">
          <h2 class="text-xl font-bold mb-4 border-b-2 border-[var(--theme-ink)] pb-1 uppercase text-[var(--theme-ink)]">${T.s7_title}</h2>
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 text-[11px]">
            <div class="p-3 border border-theme-border bg-theme-surface"><strong class="block text-theme-border-active uppercase">${T.s7_r1_role}</strong>${T.s7_r1_desc}</div>
            <div class="p-3 border border-theme-border bg-theme-surface"><strong class="block text-theme-border-active uppercase">${T.s7_r2_role}</strong>${T.s7_r2_desc}</div>
            <div class="p-3 border border-theme-border bg-theme-surface"><strong class="block text-theme-border-active uppercase">${T.s7_r3_role}</strong>${T.s7_r3_desc}</div>
            <div class="p-3 border border-theme-border bg-theme-surface"><strong class="block text-theme-border-active uppercase">${T.s7_r4_role}</strong>${T.s7_r4_desc}</div>
            <div class="p-3 border border-theme-border bg-theme-surface"><strong class="block text-theme-border-active uppercase">${T.s7_r5_role}</strong>${T.s7_r5_desc}</div>
          </div>
        </section>

        <section class="pb-6">
          <h2 class="text-xl font-bold mb-4 border-b-2 border-[var(--theme-ink)] pb-1 uppercase text-[var(--theme-ink)]">${T.s8_title}</h2>
          <div class="grid grid-cols-3 gap-2 h-24">
            <div class="border border-theme-border p-2 text-[9px] text-theme-text-muted uppercase font-bold">${T.s8_q1}</div>
            <div class="border border-theme-border p-2 text-[9px] text-theme-text-muted uppercase font-bold">${T.s8_q2}</div>
            <div class="border border-theme-border p-2 text-[9px] text-theme-text-muted uppercase font-bold">${T.s8_q3}</div>
          </div>
        </section>

        <footer class="text-center pt-6 border-t border-theme-border text-[9px] text-theme-text-muted font-bold uppercase tracking-[0.3em]">
          ${T.footer}
        </footer>
      </div>
    `;
  }
}

// ── [SEC-05] Registro y listener de cambio de idioma ─────────
if (!customElements.get('gd-manual')) {
  customElements.define('gd-manual', GdManual);
}

// Re-renderizar si el idioma cambia mientras el manual está abierto
document.addEventListener('cpii:lang:change', () => {
  document.querySelectorAll('gd-manual').forEach(el => el.render());
});