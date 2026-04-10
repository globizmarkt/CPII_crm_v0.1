/**
 * 🛡️ CLOUD RUN FUNCTIONS v2 - AUTH TRIGGER
 * ============================================================
 * Proyecto:    CPII CRM (Planta 2026)
 * Función:     onStaffCreated
 * Evento:      google.cloud.identitytoolkit.v1.AuthenticationService.SignUp
 * Doctrina:    R5 Economía de Guerra | Default-Deny RBAC
 * ============================================================
 */

const functions = require('@google-cloud/functions-framework');
const admin = require('firebase-admin');

// Inicialización Lazy de Firebase Admin
if (!admin.apps.length) {
    admin.initializeApp();
}

/**
 * Punto de entrada para Eventarc (Auth SignUp)
 * Procesa el CloudEvent e inyecta el rol 'guest' por defecto.
 */
functions.cloudEvent('onStaffCreated', async (cloudEvent) => {
    try {
        console.log(`[AUTH-V2] Iniciando procesamiento de evento ID: ${cloudEvent.id}`);
        
        // 1. Extracción de Identidad del Payload de Identity Platform
        const payload = cloudEvent.data;
        const uid = payload.uid || (payload.user && payload.user.uid);
        const email = payload.email || (payload.user && payload.user.email) || 'unknown@cpii.digital';
        
        if (!uid) {
            throw new Error("UID no detectado en el CloudEvent. Abortando.");
        }

        const db = admin.firestore();
        const staffRef = db.collection('staff').doc(uid);

        // 2. Operación Atómica Firestore: Creación de Perfil con Bloqueo (Default-Deny)
        // Usamos set {merge: true} para prevenir sobreescrituras accidentales si ya existía el doc.
        const canonicTenantId = 'cpii_lux_v1.0';
        
        await staffRef.set({
            email: email,
            role: 'guest',                // 🛡️ Rol restrictivo inicial
            status: 'pending_approval',   // Requiere intervención de Admin
            createdAt: admin.firestore.FieldValue.serverTimestamp(),
            lastLogin: admin.firestore.FieldValue.serverTimestamp(),
            tenant_id: canonicTenantId,
            metadata: {
                event_id: cloudEvent.id,
                source: 'identity-platform-signup'
            }
        }, { merge: true });
        
        console.info(`[AUTH-V2] Perfil 'guest' persistido exitosamente para: ${email} (${uid})`);

        // 3. Inyección de Privilegios (Custom Claims)
        // Esto permite que el PassportEngine O(1) valide el acceso sin consultar Firestore cada vez.
        await admin.auth().setCustomUserClaims(uid, {
            role: 'guest',
            status: 'pending_approval',
            tenant_id: canonicTenantId,
            onboarding_phase: 0
        });

        console.info(`[AUTH-V2] Custom Claims (role:guest) inyectadas para UID: ${uid}`);

    } catch (error) {
        console.error("[AUTH-V2] ❌ FALLO CRÍTICO EN FLUJO DE IDENTIDAD:", error);
        // El error debe lanzarse para que Google Cloud lo marque como fallido y permita reintentar si se configura.
        throw error; 
    }
});
