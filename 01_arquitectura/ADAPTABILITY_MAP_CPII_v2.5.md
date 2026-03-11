# Mapa de Adaptabilidad CPII v2.5

## Componente Auditado: cpii_agentmetrics.at_agent
- **Estado Geometría Trinity:** ⚠️
- **Estado TDI:** ⚠️
- **Estado Agnosticismo R0:** ❌

### Lista de puntos de fricción concretos:
- **Geometría Trinity:** Existe overflow-y-auto en la Órbita 1 (Sidebar) y en la Órbita 3 (Dock), lo que permite scroll fuera de la Órbita 2.
- **Preparación TDI:** Los widgets (como KPI Cards, Timeline, Waterfall) son bloques HTML estáticos. Carecen de atributos de serialización de estado (ej. data-state) o un encapsulamiento claro que permita su fácil instanciación/hibernación.
- **Agnosticismo R0 (Textos):** Existe abundante texto de vertical hardcodeado sin el hook data-i18n (ej. "Lux Agent", "Entry Phase", "Platform Tax", "Recent Notifications", valores monetarios y nombres propios de prueba).
- **Agnosticismo R0 (Estilos):** Colores hexadecimales hardcodeados fuera de variables CSS, tanto en clases de Tailwind (ej. g-[#12110f], g-[#0f0e0c]) como en <style> (#3f3a2c, #c1a85c).

- **Distancia estimada al estándar 2.5:** MEDIA

## Componente Auditado: cpii_autofinancingclock.wd_clock
- **Estado Geometría Trinity:** ⚠️
- **Estado TDI:** ⚠️
- **Estado Agnosticismo R0:** ❌

### Lista de puntos de fricción concretos:
- **Geometría Trinity:** La Órbita 3 (Dock) contiene un div con overflow-y-auto (<div class="flex-1 p-6 space-y-6 overflow-y-auto">), lo cual rompe la regla de que el scroll debe existir únicamente en la Órbita 2. Las medidas de las sidebars sí se respetan (250px y 320px).
- **Preparación TDI:** Los widgets principales (Progreso de Autofinanciamento, Catapulta, Refúgio) están desarrollados como bloques HTML estáticos. No poseen atributos para deshidratación (data-state, etc.) que permitan hibernación o fácil instanciación.
- **Agnosticismo R0 (Textos):** Aunque hay un buen uso inicial de data-i18n, sigue existiendo abundante texto estático "quemado" sin el hook respectivo (ej. "Pesquisar ativos...", "Estás no caminho", "Catapulta", "High Yield", "20% APY", valores monetarios, "Status: Quase lá!").
- **Agnosticismo R0 (Estilos):** Colores hexadecimales hardcodeados en vez de depender estrictamente de variables, visible en el bloque CSS incrustado (#8e773d, rgba manual en sombras: gba(193,168,92,0.8)).

- **Distancia estimada al estándar 2.5:** MEDIA

## Componente Auditado: cpii_clubpulse.gd_pulse
- **Estado Geometría Trinity:** ✅
- **Estado TDI:** ❌
- **Estado Agnosticismo R0:** ❌

### Lista de puntos de fricción concretos:
- **Geometría Trinity:** Muy buen trabajo. Respeta los 250px para la Órbita 1 (`w-sidebar`) y 320px para la Órbita 3 (`w-dock`). A diferencia de anteriores, el `overflow-y-auto` existe *únicamente* en la Órbita 2 (`<main>`), manteniendo las barras laterales fijas. Falta inyectar estas medidas por variables CSS globales, pero la geometría física es correcta.
- **Preparación TDI:** El documento presenta un dashboard gigantesco y estático. Secciones enteras como el Termómetro, Distribución de Vehículos, Mapa de Calor, Ventanas de Liquidación y Feed de Actividad no son widgets serializables y extraíbles (`.wd-*`). Todo el DOM está anidado estructuralmente.
- **Agnosticismo R0 (Textos):** Hay hooks básicos `data-i18n`, pero cientos de palabras permanecen ancladas al HTML en portugués/inglés ("Gestão AUM", "Status do Fundo", "Distribuição de Veículos", "Catapulta Tier A", "Insight do Dia").
- **Agnosticismo R0 (Estilos):** Paleta de colores dura incrustada mediante un script local de Tailwind (`#c1a85c`, `#1e1b14`). Uso intensivo de utilidades que referencian colores forzados y valores rgba directos en etiquetas `<style>` como `rgba(30, 27, 20, 0.6)`.

- **Distancia estimada al estándar 2.5:** MEDIA

## Componente Auditado: cpii_compliancemessenger.wd_messenger
- **Estado Geometría Trinity:** ✅
- **Estado TDI:** ❌
- **Estado Agnosticismo R0:** ❌

### Lista de puntos de fricción concretos:
- **Geometría Trinity:** Cumple con la distribución física de tres paneles sin scroll global indeseado, limitando el scroll vertical al contenedor interior de la Órbita 2 y al editor de mensajes. Sin embargo, usa `w-64` (256px) para la Órbita 1 en lugar de 250px exactos dictados por la doctrina v2.5, y `w-80` (320px) para la Órbita 3. No implementa variables de entorno CSS aún.
- **Preparación TDI:** El flujo de mensajería, el buzón de entrada (Inbox) y los metadatos de compliance (Audit Trail) conforman un archivo HTML estático e inseparable. Lejos de ser componentes modulares, inyectables e hibernables con inicializadores independientes (`.wd-inbox`, `.wd-metadata`).
- **Agnosticismo R0 (Textos):** Aplica bien la capa de `data-i18n` a gran parte de la UI estructural ("msg.inbox_title", "field.template"), pero los datos "dummy" (ASUNTOS de los mensajes, IBAN, textos del asistente IA) son fijos, junto con nombres de países.
- **Agnosticismo R0 (Estilos):** Vuelve a definir colores explícitos en el bloque temporal de configuración de Tailwind `<script id="tailwind-config">` (`#c1a85c`), anulando la delegación limpia al Sistema Operativo.

- **Distancia estimada al estándar 2.5:** MEDIA

## Componente Auditado: cpii_dealroom.at_dealroom
- **Estado Geometría Trinity:** ⚠️
- **Estado TDI:** ❌
- **Estado Agnosticismo R0:** ❌

### Lista de puntos de fricción concretos:
- **Geometría Trinity:** Utiliza `orbit-sidebar` (250px) y `orbit-dock` (320px) bien definidos. Sin embargo, cuenta con dos "pecados" geométricos: el Dock (Órbita 3) tiene el área interior con scroll (`overflow-y-auto custom-scrollbar`), e introduce una 4ta columna camuflada (Deal Detail Side Panel) dentro del contenedor de la Órbita 2.
- **Preparación TDI:** Diseño monolítico extremo. Todo el Pipeline Visual, la Tabla de Deals, el Inspector de Detalles y el Chat del asistente están cosidos en un mismo HTML rígido. Es imposible extraer el widget `.wd-deal-pipeline` sin llevarse todo el DOM.
- **Agnosticismo R0 (Textos):** Existe cierto mapeo básico en el menú (`data-i18n="nav.dealroom"`), pero los datos de los Deals ("Lux Lusitana XII", "Rua Garrett", "Certidão Permanente", "Janela Global X") son todos estáticos embebidos en el documento.
- **Agnosticismo R0 (Estilos):** Arrastra el mismo problema que todos los demás: Tailwind inyectado vía script con la dupla de variables de color (`primary: #c1a85c`, `background-dark: #161513`) forzadas explícitamente sin respetar variables de entorno preexistentes del SO.

- **Distancia estimada al estándar 2.5:** LEJOS

## Componente Auditado: cpii_prescriptortree.gd_network
- **Estado Geometría Trinity:** ⚠️
- **Estado TDI:** ❌
- **Estado Agnosticismo R0:** ❌

### Lista de puntos de fricción concretos:
- **Geometría Trinity:** Respeta escrupulosamente los anchos LSB (`w-[250px]`) y RSB (`w-[320px]`). Sin embargo, en el interior del Dock (Órbita 3), la sección del asistente vuelve a tener `overflow-y-auto`, permitiendo scroll local y rompiendo la filosofía de scroll único central. Las dimensiones siguen acopladas a clases estáticas en vez de variables CSS de entorno.
- **Preparación TDI:** El componente de red genealógica (con sus líneas conectores y tarjetas), las métricas KPI y la tabla de referencias están codificadas monolíticamente en un gigantesco bloque de `<main>`. Ausencia total de widgets independientes para el canvas gráfico (`.wd-tree-canvas`) o el feed.
- **Agnosticismo R0 (Textos):** A pesar de incrustar ganchos rudimentarios (ej. `data-i18n="nav_network"`), prevalecen inyecciones directas como "Minha Rede", "Ganhos L1/L2/L3", "Prescritor Master", "Você (Root Node)" o "Lisboa, Portugal" que imposibilitan compilarlo en un motor de idioma dinámico.
- **Agnosticismo R0 (Estilos):** Mantiene la arquitectura bloqueante en el header del archivo configurando Tailwind con colores fijos en duro (`#c1a85c`), desconectando el componente del sistema central de apariencias (Skins) del Sistema Operativo.

- **Distancia estimada al estándar 2.5:** MEDIA



- **Distancia estimada al estándar 2.5:** MEDIA

## Componente Auditado: cpii_dividendtracker.gd_dividend
- **Estado Geometría Trinity:** ✅
- **Estado TDI:** ❌
- **Estado Agnosticismo R0:** ❌

### Lista de puntos de fricción concretos:
- **Geometría Trinity:** Respeta las dimensiones estándar (Header 64px, LSB 250px, RSB 320px, Footer 32px). El scroll está correctamente confinado a la Órbita 2 (`main`). Sin embargo, el Dock de AIMON (Órbita 3) también posee scroll interno, lo cual es una excepción menor pero marcada en la doctrina como punto a vigilar.
- **Preparación TDI:** Totalmente monolítico. Secciones críticas como el "Calendario de Distribución", "Vehicle Breakdown" y "Future Projection" no están encapsuladas en widgets inyectables. No hay rastro de la nomenclatura `.wd-`.
- **Agnosticismo R0 (Textos):** Aunque implementa `data-i18n` en la navegación, el 80% del contenido de valor (nombres de vehículos, estados de pago "PAGO/PEND/PREV", leyendas de gráficos) está hardcodeado en portugués/inglés.
- **Agnosticismo R0 (Estilos):** Uso de paleta fija en el config de Tailwind (`primary: #c1a85c`). Colores de gráficos (line-catapulta) definidos mediante stroke en CSS directo en lugar de variables de sistema.

- **Distancia estimada al estándar 2.5:** MEDIA

## Componente Auditado: cpii_onboardingjourney.at_journey
- **Estado Geometría Trinity:** ⚠️
- **Estado TDI:** ❌
- **Estado Agnosticismo R0:** ❌

### Lista de puntos de fricción concretos:
- **Geometría Trinity:** Presenta desviaciones menores: el Footer tiene una altura de 40px (`h-10`) en lugar de los 32px reglamentados. El body usa `overflow-x-hidden` en lugar de un `overflow-hidden` estricto que bloquee todo scroll fuera de la Órbita 2.
- **Preparación TDI:** Estructura rígida. El "Mapa de Jornada" con sus etapas (Casilla 0 a Enterprise) y el panel de "Conquistas" son bloques de DOM fijos. No es posible hibernar o permutar estas secciones de forma independiente.
- **Agnosticismo R0 (Textos):** Fallo sistemático en datos de usuario ("Felix Silva", "Aimon Mentoring") y nombres de las etapas del mapa. Aunque usa `data-i18n` para etiquetas genéricas, la inteligencia del componente (Milestones) es estática.
- **Agnosticismo R0 (Estilos):** Colores de marca (`primary: #c1a85c`) y efectos de brillo (`badge-glow`) inyectados con valores hexadecimales y rgba fijos en etiquetas `<style>`.

- **Distancia estimada al estándar 2.5:** MEDIA



- **Distancia estimada al estándar 2.5:** MEDIA

## Componente Auditado: cpii_payoutwallet.wd_payout
- **Estado Geometría Trinity:** ⚠️
- **Estado TDI:** ❌
- **Estado Agnosticismo R0:** ❌

### Lista de puntos de fricción concretos:
- **Geometría Trinity:** Presenta una desviación en la Órbita 1 (Sidebar), con un ancho de 280px (`orbit-sidebar`) en lugar de los 250px dictados por la doctrina v2.5. El resto (Dock 320px, Header 64px, Footer 32px) es correcto. El scroll está bien confinado a la Órbita 2.
- **Preparación TDI:** Estructura monolítica. Secciones como el Status Card, Next Distribution y el Flow Diagram están fusionadas en el DOM principal. Implementa el selector `.wd-payout` en el `<main>`, pero de forma inerte, sin modularización real del contenido.
- **Agnosticismo R0 (Textos):** Existe etiquetado parcial con `data-i18n`, pero los datos técnicos ("PX-2024-04-A", nombres de vehículos) y mensajes del asistente están hardcodeados.
- **Agnosticismo R0 (Estilos):** Define colores de marca (`primary: #c1a85c`) y gradientes (`lux-gradient`) con valores fijos en el bloque de configuración de Tailwind, desconectado de las variables de entorno del SO.

- **Distancia estimada al estándar 2.5:** MEDIA

## Componente Auditado: cpii_whitepaperviewer.at_whitepaper
- **Estado Geometría Trinity:** ✅
- **Estado TDI:** ❌
- **Estado Agnosticismo R0:** ❌

### Lista de puntos de fricción concretos:
- **Geometría Trinity:** Cumplimiento total. Respeta los 250px (LSB), 320px (RSB), Header 64px y Footer 32px. El scroll es único y central en la Órbita 2. Es un ejemplo de buena implementación geométrica física.
- **Preparación TDI:** Fallo por arquitectura monolítica. El timeline vertical de hitos (Timeline), las métricas de madurez y el dock de AIMON están rígidamente codificados en el HTML. No hay separación en widgets `.wd-*` reutilizables.
- **Agnosticismo R0 (Textos):** Bajo nivel de internacionalización. A pesar de algunos ganchos `data-i18n`, el contenido core del Whitepaper y el Roadmap permanece estático en portugués/inglés.
- **Agnosticismo R0 (Estilos):** Reincide en el uso de colores fijos (`#c1a85c`) y paneles de cristal (`glass-panel`) con transparencias hardcodeadas en etiquetas `<style>`, ignorando el sistema de temas dinámico.

- **Distancia estimada al estándar 2.5:** MEDIA



# Mapa de Adaptabilidad - Skeleton Doctrine v2.5 (CPII-CRM-MLS)

Este documento registra la auditorÃ­a de skins en `stitch_cpii_crm_mls_tramo_01` contra los tres ejes de la doctrina v2.5: GeometrÃ­a Trinity, PreparaciÃ³n TDI y Agnosticismo R0.

---

### 1. CPII CRM Skin 01 Layout Trinity

- **Estado GeometrÃ­a Trinity:** â
- **Estado TDI:** â ï¸
- **Estado Agnosticismo R0:** â ï¸

**Fricciones concretas:**
- **Trinity:** GeometrÃ­a conseguida fÃ­sicamente. Implementa `w-[250px]` para LSB, `flex-1` con `overflow-y-auto` para el canvas, y `w-[320px]` para RSB. El contenedor general tiene `h-screen overflow-hidden`. Ãnico detalle menor: las dimensiones estÃ¡n aplicadas con clases arbitrary de Tailwind en lugar de referenciar `--sidebar-width` a nivel root.
- **TDI:** Estructura general prometedora, el overlay (Gatekeeper KYC) es modular, pero el canvas sigue centralizando el layout principal de "Welcome" de forma monolÃ­tica sin recurrir a inyecciÃ³n por manifiesto con selectores `.wd-*`.
- **R0:** Gran avance. **Todos** los textos cuentan con un atributo de internacionalizaciÃ³n (ej. `i18n="nav_dashboard"`), aunque el protocolo dicta `data-i18n`. Las variables de color siguen quemadas en un bloque de Tailwind `<script>` local en lugar del scope de sistema operativo.

**Distancia:** CERCA

---

### 2. CPII CRM Skin 02 KYC Gatekeeper Flow

- **Estado GeometrÃ­a Trinity:** â
- **Estado TDI:** â
- **Estado Agnosticismo R0:** â ï¸

**Fricciones concretas:**
- **Trinity:** Mantiene la proporciÃ³n estricta de 3 columnas (`w-64`, `flex-1`, `w-80`) con `overflow-hidden` nativo en el contenedor principal. Sigue pecando de usar Tailwind en crudo en vez de `--sidebar-width`.
- **TDI:** FricciÃ³n grave. El manejo de estados (Unverified, Pending, Verified) se hace inyectando modales HTML gigantes (`<div id="overlay-unverified">`) ocultados y mostrados mediante una funciÃ³n JavaScript monolÃ­tica `toggleState()`. Esto choca de frente con la directiva TDI de widgets hibernables y serializables; deberÃ­an ser vistas inyectables.
- **R0:** MagnÃ­fico uso de la internacionalizaciÃ³n (`data-i18n="nav.dashboard"`, `data-i18n="aimon.kyc_start"`). Solo falla en R0 estricto por la definiciÃ³n de la paleta (`#f2b90d`, `#221e10`) acoplada al script de Tailwind en lugar de variables CSS agnÃ³sticas.

**Distancia:** MEDIA

---

### 3. CPII CRM Skin 03 Portfolio Visualizer

- **Estado GeometrÃ­a Trinity:** â
- **Estado TDI:** â
- **Estado Agnosticismo R0:** â ï¸

**Fricciones concretas:**
- **Trinity:** El esqueleto logra la disposiciÃ³n exacta: `w-64` (LSB), `flex-1` con `overflow-y-auto` (Canvas), y `w-80` (RSB) con el `h-screen overflow-hidden` global. Sigue empleando clases crudas de Tailwind en lugar de referir a las variables CSS del SO global.
- **TDI:** La pÃ¡gina de visualizaciÃ³n del portafolio (KPIs, grÃ¡ficas circulares, tablas multinivel) estÃ¡ construida como un documento largo e inerte dentro del `<main>`. No sigue el patrÃ³n de diseÃ±o `.wd-*` que permite extraer, inyectar y serializar componentes visuales de manera individual.
- **R0:** ContinÃºa la excelente tendencia de usar `data-i18n` para todo el texto de la interfaz ("nav.portfolio", "kpi.revenue_share"). Sin embargo, la paleta de colores (`#c1a85c`, `#1e1b14`) sigue introducida manualmente en la configuraciÃ³n de la plantilla.

**Distancia:** MEDIA

---

### 4. CPII CRM Skin 04 Investment Simulator

- **Estado Geometría Trinity:** ?
- **Estado TDI:** ?
- **Estado Agnosticismo R0:** ??

**Fricciones concretas:**
- **Trinity:** Abandona por completo el patrón del SO. Es una página web tradicional centrada (`max-w-[1100px] w-full flex flex-col items-center`). No existen ni LSB (Navegación Izquierda) ni RSB (Inspector Derecho).
- **TDI:** El simulador (inputs a la izquierda, resultados y gráficas a la derecha) está fusionado en una única grid HTML de 2 columnas dentro del `<main>`. No está segmentado en widgets inyectables (`.wd-simulator-input`, `.wd-simulator-output`).
- **R0:** De nuevo, un excelente trabajo con la internacionalización (`data-i18n="input.initial_amount"`, `data-i18n="fiscal.title"`). El problema persiste en la cabecera del documento: inyecta `#f2b90d` manualmente mediante el objeto `tailwind.config`, ignorando el CSS corporativo global.

**Distancia:** LEJOS


---

### 5. CPII CRM Skin 05 Fiscal Report Generator

- **Estado Geometría Trinity:** ?
- **Estado TDI:** ?
- **Estado Agnosticismo R0:** ?

**Fricciones concretas:**
- **Trinity:** Pierde completamente el layout Trinity. Implementa un menú lateral minimizado de 80px (`w-20`) y un canvas principal fluido dividido en grids asimétricos (`col-span-7` / `col-span-5`). No respeta ni LSB 250px ni RSB 320px.
- **TDI:** Extrema dependencia de scripting monolítico. El contenido se inyecta y permuta mediante una única función JavaScript global (`switchJurisdiction()`) que sobreescribe directamente el innerHTML del modelo DOM, alejándolo fuertemente del paradigma de widgets aislados e hibernables.
- **R0:** Retroceso crítico. Apenas hay etiquetas `data-i18n` en el HTML fijo, pero todos los datos fiscales, nombres de países, etiquetas e incluso el título del regulador ("CMVM", "CNMV") están clavados estáticamente dentro del diccionario Javascript. Vuelve a inyectar colores corporativos (`#1e3a8a`, `#b45309`) en el bloque Tailwind en vez de asimilar las variables del núcleo.

**Distancia:** LEJOS


---

### 6. CPII CRM Skin 06 Integrated Dashboard

- **Estado Geometría Trinity:** ?
- **Estado TDI:** ?
- **Estado Agnosticismo R0:** ??

**Fricciones concretas:**
- **Trinity:** Recupera la cordura geométrica. Instancia correctamente las áreas de Sistema Operativo (`w-64`, `flex-1`, `w-80`) con anclaje `h-screen overflow-hidden`. Como siempre, el pecado venial es el uso primitivo de Tailwind (clases absolutas) en lugar de dependencias de entorno tipo CSS `var(--sidebar-width)`.
- **TDI:** Es un cuadro de mandos monolítico. En vez de orquestar *widgets* (ej. `.wd-portfolio-glance`, `.wd-mls-feed`, `.wd-docusign-alert`) que inyecten su propio scope, todo está escrito a pedaleta (hard-coded) dentro del grid de la columna central (`<div class="grid grid-cols-2">`).
- **R0:** Gran abundancia de etiquetas de traducción (`data-i18n="nav.portfolio"`, `data-i18n="docs.title"`). Falla el R0 por inyectar un objeto de tema (Theme object) de Tailwind en modo bloque script que define `"primary": "#f2b90d"` estáticamente.

**Distancia:** MEDIA


---

### 7. CPII CRM Skin 07 Property AVM Gadget

- **Estado Geometría Trinity:** ?
- **Estado TDI:** ?
- **Estado Agnosticismo R0:** ??

**Fricciones concretas:**
- **Trinity:** Pierde el estándar. Mantiene una barra lateral izquierda colapsable (`w-16 md:w-60`) y un gran sector derecho (Canvas), pero no existe barra lateral inspector (RSB). Está pensado como un layout clásico de 2 columnas de dashboard antiguo, en lugar de la estación de trabajo de 3 del WebOS.
- **TDI:** La calculadora paramétrica (Property Parameters), el renderizador de mapa y la tabla de comparables son un inmenso monolito HTML. Múltiples secciones que deberían ser módulos instalables (ej. `.wd-avm-inputs`, `.wd-map-context`, `.wd-market-comps`) viven pegadas secuencialmente sin separación arquitectónica.
- **R0:** Magnífico uso de identificadores R0 para casi todo el texto plano visible (`data-i18n="label_jurisdiction"`, `data-i18n="breadcrumb_mls"`, `data-i18n="gadget_title"`). Falla en R0 estricto puramente por arrastrar el bloque temporal de Tailwind de la cabecera que fuerza los temas en color dorado (`#f2b90d`).

**Distancia:** MEDIA

