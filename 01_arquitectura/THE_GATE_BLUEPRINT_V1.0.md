# THE GATE BLUEPRINT V1.1 - Sincronización Fiduciaria
**Ubicación:** `01_arquitectura/THE_GATE_BLUEPRINT_V1.0.md`  
**Estado:** Sellado por El Bibliotecario  
**Fase:** Electrificación del Gate / Órbita 2 Transition

---

## 1. Misión de la Fase
Transformar el "Vacío Operativo" del `<at-admin-gate>` en un componente funcional ("electrificado") capaz de arbitrar el acceso de Staff y Partners mediante la validación multicapa del `passport-engine.js`.

---

## 2. Constitución del Pasaporte (Doctrina de Fases)
El acceso se rige por el **Privilegio por Cumplimiento (Compliance-Based Privilege)** acumulativo:

| Fase | Título | Requerimientos | Desbloqueo |
|---|---|---|---|
| **Fase 1** | Acceso Público | Sign-in básico | Estructura Club (Custody Hold activo) |
| **Fase 2** | Habilitación Fiduciaria | KYC Aprobado + Academy 100% | Mi Cartera, Red, Historial |
| **Fase 3** | Estatus Partner/AUM | Fase 2 + AUM o Invitación Directa | Relaciones, Herramientas Staff |

---

## 3. El Gate (Portal de Staff vs. Imán de Leads)
Para preservar la integridad del embudo comercial (`access-form.html`), se establece una bifurcación física del acceso:

*   **access-form.html**: Exclusivo para captación de Leads e inversores externos. Sin lógica de Staff.
*   **admin-gate.html**: Entrada secreta y aséptica para Staff (Owners, Managers, Agentes).

---

## 4. Anatomía de admin-gate.html (Estructura R3)
El archivo `admin-gate.html` debe ser un contenedor minimalista diseñado para el "Handoff" fiduciario:

```html
<!DOCTYPE html>
<html lang="es" class="dark">
<head>
    <meta charset="UTF-8">
    <title>Staff Gate | Lux Lusitana</title>
    <script src="core/at-bootstrapper.js"></script>
    <link rel="stylesheet" href="css/tailwind.css">
    <link rel="stylesheet" href="css/theme.css">
</head>
<body class="bg-carbon min-h-screen flex items-center justify-center">
    <!-- Zona de Intervención para Bulldozer -->
    <div id="gate-portal" 
         data-gate-zone="staff-login" 
         data-requires="role:owner|role:gestor"
         data-gate-state="pending"
         class="relative w-full max-w-lg p-10">
        
        <div data-gate-content class="relative z-10">
            <at-admin-gate></at-admin-gate>
        </div>

        <div data-gate-lock class="hidden absolute inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center">
            <!-- Icono de candado i18n -->
        </div>
    </div>

    <script src="core/passport-engine.js"></script>
    <script src="features/at-admin-gate.js"></script>
</body>
</html>
```

---

## 4. Veredicto Técnico: Persistencia Perimetral
Para garantizar el **Agnosticismo Radical** y la **Economía de Guerra (O(1))**:
- **JWT Custom Claims**: La "Firma del Contrato" y el "Nivel de Staff" deben persistir en el Token (`staff_contract: true`).
- **Razón**: Permite la validación instantánea en el perímetro por el `passport-engine` sin recurrir a Firestore en el flujo crítico de navegación.

---

## 5. Contrato de Eventos (Universal SDK)
Los componentes se comunican mediante los siguientes esquemas de `e.detail`:

### `passport:updated`
Informa cambios en el estado del usuario para reactividad de UI.
```json
{
  "source": "engine",
  "passport": {
    "tier": "OWNER",
    "claims": { "kyc": "approved", "staff_contract": true },
    "integrity_score": 100
  }
}
```

### `passport:denied`
Bloquea el acceso e invoca el "Custody Hold" visual.
```json
{
  "requirement": "staff_contract:true",
  "reason": "CONTRACT_MISSING"
}
```

---

## 6. Deuda Técnica a mitigar (Sprint Siguiente)
- [ ] Implementar lógica `OR` (`|`) en `passport-engine.js`.
- [ ] Añadir fallback de sesión para evitar colapso de UI si falla `window.__CPII__.session`.

---

## 7. Plano Estructural (Requisito Bulldozer - Doctrina R3)
Para asegurar que la intervención visual no rompa el layout, se establece la siguiente anatomía obligatoria en el DOM:

| Atributo | Función | Estado |
|---|---|---|
| `data-gate-zone` | Contenedor raíz evaluable. Lleva el el `data-requires`. | Requerido |
| `data-gate-content` | Capa de contenido real (lo que se bloquea visualmente). | Requerido |
| `data-gate-lock` | Capa de Custodia (invisible por defecto, activada por el motor). | Requerido |
| `data-gate-state` | Estado de carga/validación (`pending`, `granted`, `denied`). | Requerido |

---

## 8. Mecánica O(1) y Refresco (Requisito Senior Dev)
La eficiencia del motor y la consistencia del estado se basan en dos pilares:

1.  **Estructura Hash Map**: El payload del JWT y `window.__CPII__.session.claims` deben ser un diccionario plano (ej. `{ role: "owner", staff_contract: true }`). Prohibido el uso de arrays iterables para validación de claims para garantizar tiempo constante $O(1)$.
2.  **Bypass de Caché (Handoff)**: Tras la firma del contrato de valores, es obligatorio ejecutar `getIdTokenResult(true)` para forzar el refresco de los Custom Claims en el cliente sin recargar la página, seguido de la emisión de `CPII:session:resolved`.

---

*Documento actualizado y sellado por El Bibliotecario bajo el protocolo /ojo_de_halcon. La geolocalización de memoria ha sido expandida con el tejido físico y mecánico pactado.*
