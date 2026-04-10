# FIRESTORE_SECURITY_RULES_TEMPLATE V1.0
**Ubicación:** `01_arquitectura/FIRESTORE_SECURITY_RULES_TEMPLATE.md`  
**Estado:** Sellado por El Bibliotecario  
**Doctrina:** Multitenencia Lógica Rigurosa | Blindaje Criptográfico

---

## 1. El Estándar de Seguridad Universal
En el BreederHub Incubator (Free Pool), la seguridad no es física (instancias separadas), sino lógica y criptográfica. Se establece un único archivo de reglas (`firestore.rules`) para toda la incubadora, basado en la identidad inyectada en el JWT.

---

## 2. Definición de Funciones de Blindaje
Todo acceso debe ser validado mediante la función `belongsToTenant()`.

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    
    // Función de Validación Multitenant
    function belongsToTenant() {
      return request.auth != null && 
             request.auth.token.tenant_id == resource.data.tenant_id;
    }

    // Función para Creación Protegida (Haciendo el tenant_id obligatorio)
    function isCreateValid() {
      return request.auth != null && 
             request.resource.data.tenant_id == request.auth.token.tenant_id;
    }

    // --- REGLAS POR COLECCIÓN ---

    match /leads/{leadId} {
      allow read, update, delete: if belongsToTenant();
      allow create: if isCreateValid();
    }

    match /users/{uid} {
      allow read, update: if request.auth.uid == uid && belongsToTenant();
      allow create: if isCreateValid();
    }

    // Documentos Públicos (Exentos de tenant_id si aplica)
    match /public_content/{contentId} {
      allow read: if true;
    }
  }
}
```

---

## 3. Obligaciones del Operario (Bulldozer / Kimi)
Al programar incisiones que afecten la persistencia de datos:

1.  **Inyección de `tenant_id`**: Cada `addDoc` o `setDoc` debe incluir explícitamente el campo `tenant_id` obtenido de `window.__CPII__.session.passport.tenant_id`.
2.  **No Bypass**: Está prohibido el uso de colecciones raíz sin el atributo de tenencia, salvo aprobación expresa del Lead Architect para contenido "Global Hub".

---

## 4. Auditoría de "Contaminación Cruzada"
Cualquier intento de lectura que no incluya el filtro de `tenant_id` o que intente saltar el muro perimetral será registrado como un **Incidente de Seguridad Perimetral**.

---

*Plantilla de seguridad sellada por El Bibliotecario para el blindaje del Free Pool.*
