### 1. MAPA DE CONVERSACIONES
[VIBE-CPII-01] — [Bulldozer, Lead, Perplexity] — Prototipo Web — Creación del prototipo HTML estático inicial.
[VIBE-CPII-02] — [Bulldozer, Lead] — Refactorización — Modularización y establecimiento de clases base.
[VIBE-CPII-03] — [Bulldozer, Lead, Ingeniero] — access-form conexion — Integración de RGPD al esquema Verdent, diccionarios y debate Nginx vs WP.
[VIBE-CPII-04] — [Bulldozer, Lead, Ingeniero] — Grupo Comercial — Mapeo de diccionarios de métricas, parche de seguridad XSS en `i18n.js` y captura `?ref=`.
[VIBE-CPII-05] — [Bulldozer, Lead, Claude El Jefe] — Refinar — Saneamiento intensivo de marca "eXp" y purga de frameworks pesados (React/Zustand ban).
[VIBE-CPII-06] — [Bulldozer, Lead] — pre-lanzamiento — Despliegue asimétrico (Firebase Firebase vs WordPress LEMP) y corrección del árbol de red SVG.
[VIBE-CPII-07] — [Bulldozer, Lead] — encendido de motores — Despliegue GCE, Cloud Functions (onAuthCreate 1 Gen) y Webhook nativo a Google Sheets.
[VIBE-CPII-08] — [Bulldozer, Lead, Ingeniero] — chapa y pintura — Motor Telegram de alertas, candados de atribución (local storage) y Reglas Firestore base.
[VIBE-CPII-09] — [Bulldozer, Lead] — orbitando y acoplando — Diseño del esquema de agregación plana (NoSQL ancestry, zero-cost), Mailer Híbrido (SendGrid+Workspace).
[VIBE-CPII-10] — [Bulldozer, Lead] — sitensis para MLS — Blueprint de la "Estructura Tricameral" arquitectónica (Fase A) y migración a reglas Direct-to-Storage (Uploads).
[VIBE-CPII-11] — [Bulldozer, Kimi, Lead, Perplexity, Qwen] — Destilando para STITCH — Adaptación y preparación de componentes para integración en ecosistema STITCH.
[VIBE-CPII-12] — [Bulldozer, Kimi, Lead, Perplexity, Qwen] — Fork Polygon Dashboard — Bifurcación del frontend Polygon para el entorno CPII.
[VIBE-CPII-13] — [Bulldozer, Lead Architect] — Gadgets y Webinar — Gadget Manual, definición "Admin Gate", y UI Layout Trinity (Sidebar/Canvas/Dock).
[VIBE-CPII-14] — [Bulldozer, Kimi, Lead, Perplexity, Qwen] — El CRM ya existe — Auditoría y consolidación del sistema fiduciario base.
[VIBE-CPII-15] — [Bulldozer, Kimi, Lead, Perplexity, Qwen] — Manual funcionando — Sellado de la doctrina `MANUAL_ACCESO_FIDUCIARIO.md` y estructura de validación.
[VIBE-CPII-16] — [Kimi, Lead, Perplexity, Qwen] — Despliegue de nuevas funcionalidades — Inyección en Órbita 1 (6 pilares fiduciarios), script `passport-engine.js` y traducción institucional del Custody Hold.

**[Ámbito Estrategia & Negocio (Fuera de VIBE-CPII Tech)]**
[ACTA-2026-02-18] — [Lead] — David sobre CPII y EXP Commercial — Protocolo Leads Start y jerarquía de inversión. Redacción de actas de decisión de negocio. 
[CRM-CII-INTERES] — [Lead Strategist] — Interés Compuesto y Referidos — Definición matemática de Catapulta (20% APY) y Refugio (8% APY), doctrina de honorarios al 5%.
[F.AGEN-CPII-01] — [Lead CTO] — CPII Base y DNS — Creación de Lark Suite (Free tier), gestión de dominio `clubsocios.digital` y DNS SPF/DKIM.
[MARKETING-01] — [Socio de Marketing] — Emprendedores/Webinar Prescriptores — Trazabilidad de Línea A (Profesionales) y Línea B (Ahorradores). Privacidad selectiva para Facebook Ads.

### 2. DÓNDE ESTÁN LAS COSAS
- `core/MANUAL_ACCESO_FIDUCIARIO.md`: Doctrina legal y lógica acumulativa heredada (Elaborado por Lead Architect, curado por Qwen).
- `index.html` (Órbita 1): Estructura `<nav>` con `menu-pillar-wrapper`, `data-requires` y `data-phase` (Diseñado por Perplexity, inyectado por Lead). También contiene métricas SEC-05 (Equipo Comercial).
- `core/passport-engine.js`: Motor DOM en Vanilla JS para evaluación de requerimientos (Construido por Kimi).
- `core/i18n.js`: Motor principal, clave de nomenclatura institucional, protección contra XSS (Construido por Lead/Ingeniero).
- `access-form.html`: Formulario base, contiene hooks para Webhook Sheets, candados de atribución ("Stealth Referral") y validaciones RGPD Verdent (Bulldozer / Ingeniero).
- `simulator.html`: Simulador matemático Catapulta/Refugio (Lead Strategist).
- `functions/index.js` (Capa Backend): `onAuthCreateBridge`, Mailer Híbrido, Bot Alertas Telegram (Lead Architect / Ingeniero).
- `firestore.rules`: Arquitectura "Inmutabilidad Tenant", bloqueos Cross-Tenant y protección Direct-to-storage (Lead Cloud Architect).
- `src/js/core/PermissionEngine.js`: Concepto propuesto de backend/lógica para permisos avanzados (Ref/ Qwen).

### 3. DECISIONES GLOBALES DE ARQUITECTURA
- **Stack Vanilla / Zero-Server**: Prohibición de React, Vue o Redux (Doctrina R3). Web Components Nativos y Tailwind CSS vía tokens.
- **Despliegue Asimétrico (Bifurcado)**: El WordPress (captación/marketing) vive en GCE/LEMP; la Bóveda del CRM (SaaS) vive en Firebase Hosting CDN. Separación física y de dominio.
- **Economía de Guerra (Escala a 0)**: Reembolsos cero en costos mensuales base. Prohibido Redis/Memorystore. Alojamiento en Firebase Gen 2, cuentas Lark Suite, Firestore Sharded Counters.
- **Doctrinas Strict R3/R4**: Zero-Hex (solo `--theme-*`), i18n Estricto (nada de traducciones vía `innerHTML`, prevención XSS absoluta).
- **Compliance-Based Privilege (AML)**: Lógica KYC **ACUMULATIVA** y "Custody Hold". Superar la Fase 3 exige el 100% previo de Fase 2.
- **Jerarquía Anti-Alucinación**: Agentes (Kimi, Qwen, Perplexity) diseñan piezas desconectadas. El Lead Architect es un cortafuegos que fusiona manualmente, previniendo inyección de frameworks u obsolescencias lúdicas ("Templo").
- **Agregación Plana (NoSQL)**: Genealogías transversales finitas (`ancestry`) en Firestore para no saturar 1MB/doc de límite de subcolecciones infinitas.

### 4. DEUDA TÉCNICA CONSOLIDADA
- **Fallbacks JS Ausentes**: Si `window.__CPII__` colapsa, `passport-engine.js` se interrumpe sin gracia. Se requiere fallback UI robusto.
- **Integración CMS Inconclusa**: Existe la instancia GCE provisionada pero desalineada (faltan hardening y certificados de WordPress).
- **Tailwind en Producción**: Actualmente inyectado por CDN (`<script src=...`), lo que penaliza performance y contraviene buenas prácticas (requiere el Build de PostCSS).
- **Especificación Huérfana i18n**: Las iteraciones pasadas (`nav_mls`, `nav_history`) saturan el diccionario JS por limpiezas pospuestas.
- **Uploader Deficitario (Operación Doogfeed)**: Reestructuración urgente del motor de upload heredado para forzar `Direct-to-storage` e impedir saturar la RAM (512mb max) del servidor Firebase Cloud.
- **Identidad Rota**: No se ha definido qué pasa si el usuario cambia el email/perfil en la interfaz de WP estando diferente al Firebase (SaaS como "Single Source of Truth").
- **Hooks Desconectados**: `passport:engine-ready` emitido sin listeners; KYC carece de estatus transitorio claro (pending vs En Revisión). "El Gate" y `access-form` adolecen de credenciales integradas en el flujo del backend.
- **Certificados KC Bloqueados**: Fallos fácticos empresariales ("David Almeida pendiente foto DNI por error de WhatsApp" o contratos de Takeover inactivos en jurídico).

### 5. CONOCIMIENTO TÁCITO CONSOLIDADO
- **Paternalismo Sectorial / Compliance Limit**: "El club no acepta atajos". Las fricciones en los flujos de "Tracción Comercial" y "Hold de la Bóveda" (fases bloqueadas en grises en UI) comunican élite al público. La gamificación lúdica "Tokens/Rewards" arruinaría el ticket alto.
- **Escudo Psicológico**: Restringir es demostrar valor, no castigo. Conceptos como "El Gate", "Custodia Fiduciaria", o "Comité Takeover", imponen respeto a "agentes rebeldes" de España ("Fórmula de Éxito de David vs. el procedimiento español").
- **Alucinaciones LLM Recurrentes**: Sin atarles en corto, las inteligencias secundarias asumen componentes en React para Tailwind, JSON indexados absurdos o subcolecciones SQL-like en NoSQL. Lead asume este filtro permanente.
- **Bifurcación Traccional:** El inversor MVP no se preocupa por el software, le preocupa el "Deal Flow". Todo lo técnico debe operar "en invisible" con tiempos de latencia ínfimos (< 500ms login bridge).

### 6. GAPS DETECTADOS
- **Cero Trazabilidad de Integración WP/Firebase**: "El Limbo" entre registrar el interés y confirmar Sign-in no tiene cron jobs (Schedule Functions) para purgas de caducidad.
- **Vació Operativo "El Gate" Pospuesto**: El `access-form.html` (Admin Gate) no dispone del Web Component prometido (`<at-admin-gate>`/`passport-engine-v2.js`) para modelar jerarquías Staff sobre Firebase Auth Tokens (Claims de "dueño" vs "gestor").
- **Candado Stealth Pendiente**: El script para leer y ocultar `?ref=` ("Stealth Referral") en la UI para evitar robos de autoría de red, lleva pausas sucesivas sin ser subido (`deploy`) a Firebase Hosting.
- **Accesibilidad Incompleta (ARIA) Cero**: Los componentes en `Custody Hold` no propagan `aria-disabled="true"` a lectores de pantalla (inválido por WCAG para inversiones web).
- **Límite de Exposición Fondo (PoF)**: Regla financiera descrita teóricamente por estrategas, pero que carece por completo de algoritmia y variables operativas en el backend (Código Cero).
