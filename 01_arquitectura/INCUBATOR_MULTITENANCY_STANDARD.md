# INCUBATOR_MULTITENANCY_STANDARD V1.0
**Ubicación:** `01_arquitectura/INCUBATOR_MULTITENANCY_STANDARD.md`  
**Estado:** Sellado por El Bibliotecario  
**Doctrina:** Economía de Guerra (R5) | Aislamiento Lógico Perimetral

---

## 1. Misión: El Blindaje del Free Pool
La "BreederHub Incubator" permite la gestación de múltiples proyectos en una infraestructura compartida (Google Cloud Free Tier). El éxito de esta maniobra depende de un **Aislamiento Multitenant Riguroso** para evitar la contaminación cruzada de datos y asegurar la credibilidad de la Factoría.

---

## 2. Estándar de Nomenclatura `project_id` (Nomenclatura Fiduciaria)
Para garantizar la trazabilidad y la escalabilidad, se establece el siguiente formato universal para todo `project_id`:

**Sintaxis:** `[vertical]_[client]_[iteration]`

*   **Vertical (3-4 letras)**: El nicho de mercado (ej. `cpii`, `aip`, `mls`).
*   **Client (3-6 letras)**: Identificador único del cliente o marca (ej. `lux`, `atla`, `hub`).
*   **Iteration (vX.X)**: Versión técnica del núcleo operativo (ej. `v1.0`).

### Ejemplos Autorizados:
- `cpii_lux_v1.0` (Club Privado Inmobiliario - Lux Lusitana)
- `aip_atla_v0.1` (Atlantis International Projects - Core)
- `mls_port_v2.1` (Multiple Listing Service - Portugal)

---

## 3. Blindaje de Datos (La Mochila Separada)
Todo documento persistido en la incubadora debe llevar la "Marca de Nacimiento" para ser gestionado por las reglas de seguridad.

1.  **Atributo `tenant_id`**: Obligatorio en la raíz de cada objeto en Firestore. Debe coincidir exactamente con el `project_id` del Pasaporte Electrónico.
2.  **Custom Claims en JWT**: El `passport-engine.js` debe asegurar que el token de Firebase Auth contenga el claim `tenant_id` (reflejando el `project_id` de la sesión).
3.  **Regla Supreme (Firestore)**:
    ```javascript
    match /leads/{docId} {
      allow read, write: if request.auth.token.tenant_id == resource.data.tenant_id;
    }
    ```

---

## 4. Protocolo de "Parto" (Startup Upgrade)
Cuando un proyecto madura y se traslada a su propia instancia física:

1.  **Filtrado Atómico**: El Bibliotecario coordina la extracción de datos mediante una consulta única por `tenant_id`.
2.  **Trasplante de Bóveda**: Inyección de los datos en el nuevo proyecto de Firebase.
3.  **Depuración de Reglas**: En la instancia dedicada, se eliminan los controles de `tenant_id` en favor de los roles de acceso puros (`admin`, `staff`, `user`).

---

## 5. Deuda Arquitectónica Detectada
- [ ] Implementar la inyección automática de `tenant_id` en el `at-bootstrapper.js`.
- [ ] Validar que todas las Cloud Functions del Free Pool filtran siempre por el contexto de la identidad.

---

*Registro sellado por El Bibliotecario en respuesta al diagnóstico del Lead Architect. La integridad del ecosistema BreederHub queda documentada para su ejecución segura.*
