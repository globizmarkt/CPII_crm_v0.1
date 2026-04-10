# SIDECAR_ARCHITECTURE_DOCTRINE V1.0
**Ubicación:** `01_arquitectura/SIDECAR_ARCHITECTURE_DOCTRINE.md`  
**Estado:** Sellado por El Bibliotecario  
**Doctrina:** Motor Universal, Mochila Privada | R5 Economía de Guerra

---

## 1. El Dogma: "Motor Universal, Mochila Privada"
Para escalar con eficiencia y minimizar la deuda técnica en el BreederHub Incubator, la factoría adopta una **Arquitectura de Sidecars**. No modificamos el núcleo (Motor) para cada proyecto; le acoplamos un "sidecar" de configuración.

---

## 2. El Pasaporte Universal (`passport-engine.js`)
El motor de pasaportes deja de ser un activo específico de un vertical (AIP/CPII) para convertirse en un **Artifact Universal**.

1.  **Agnosticismo Radical**: El motor solo opera sobre reglas booleanas y reclamaciones (claims) abstractas. No conoce la lógica de negocio, solo la lógica de acceso.
2.  **Inyección de Contexto via `at-bootstrapper.js`**: 
    - Al arranque, el bootstrapper identifica el `project_id` desde el manifiesto o el entorno.
    - Inyecta el ID en el estado global (`window.__CPII__.config.project_id`).
    - El motor usa este ID para normalizar el `tenant_id` en todas las operaciones.

---

## 3. La Mochila Privada (Aislamiento de Datos)
La independencia de cada proyecto se garantiza mediante la "Mochila" (Data Isolation), no mediante el código.

- **Persistencia**: Todos los proyectos pueden residir en el mismo "Free Pool" (Instancia de Firestore Compartida).
- **Identidad Documental**: Cada documento es portador de su propio `tenant_id`.
- **Aislamiento Criptográfico**: Las reglas de seguridad (JWT) actúan como muros de hormigón lógico entre "mochilas".

---

## 4. Flujo de Handoff y Refresco
Para que la transición entre el Gate y la Órbita 2 sea invisible y segura:
1.  **Firma del Contrato**: Se ejecuta en el Front-end.
2.  **Sync Backend**: Una Cloud Function inyecta los Custom Claims correspondientes.
3.  **Refresco Perimetral**: Uso de `getIdTokenResult(true)` para actualizar el pasaporte en memoria sin recargar la página.

## 5. El Mandato de Sincronización (Firebase Auth)
Para asegurar que el motor universal reaccione en tiempo real, se establece la **Ley de Sincronización de Estado**:

1.  **Escucha Activa**: El módulo de autenticación (Firebase SDK) debe implementar el listener `onAuthStateChanged`.
2.  **Inyección de Sesión**: Al resolver el usuario y sus claims (mediante `getIdTokenResult()`), se debe actualizar inmediatamente el objeto global:
    ```javascript
    window.__CPII__.session = {
        uid: user.uid,
        claims: idTokenResult.claims,
        passport: generatePassport(user, idTokenResult.claims)
    };
    ```
3.  **Emisión de Evento**: Es obligatorio disparar el evento `passport:session-updated` para que el `Passport Engine` (Kimi) e interfaces reactivas (Bulldozer) actualicen los privilegios y el "Custody Hold" sin recarga de página.

---

## 6. Beneficios de la Arquitectura Sidecar
*   **Mantenibilidad**: Un solo bug fix en el motor universal se propaga a todos los proyectos de la incubadora.
*   **Escalabilidad a Cero**: Múltiples proyectos consumen el mismo tier gratuito de Google Cloud.
*   **Migración Indolora (Startup Upgrade)**: Mover un proyecto a su propia infraestructura física es una operación de trasplante de datos, no de re-ingeniería de código.

---

## 7. Mandato Zero Trust UI (Desbloqueo Seguro)
Para garantizar la protección absoluta del patrimonio y evitar parpadeos de información sensible (FOUC - Flash of Unauthenticated Content):

1.  **Bloqueo Nativo (Born Locked)**: Toda interfaz crítica (Órbita 2+) debe nacer en el DOM protegida por una capa física de `[data-gate-lock]`.
2.  **Watcher de Autenticación**: El componente `at-admin-gate.js` actúa como el vigía perimetral, gestionando el estado de Firebase Auth.
3.  **Protocolo de Revelación**:
    - **Caso No-Sesión**: Si el observador confirma que no hay usuario activo, debe retirar el lock (`hidden`) para permitir el acceso al formulario de credenciales.
    - **Caso Sesión-Activa**: El lock **permanece activo**. Es responsabilidad exclusiva del `Passport Engine` realizar la auditoría O(1) y retirar los bloqueos de forma selectiva basándose en los privilegios confirmados.

---

*Doctrina sellada por El Bibliotecario. La arquitectura de Sidecars y el Mandato Zero Trust UI quedan registrados como ley operativa de la Skeleton Factory.*
