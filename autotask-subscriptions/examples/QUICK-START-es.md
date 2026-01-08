# Guía de Inicio Rápido

**[Otros idiomas](README.md)** | 🇪🇸 Español

¡Comienza con NaviTerm AutoTask en 5 minutos!

---

## Paso 1: Agrega tu Primera Suscripción

### Opción A: Suite Completa (Recomendado)

1. Abre la aplicación **NaviTerm**
2. Navega a **AutoTask** → **Suscripciones**
3. Toca **Agregar Suscripción** (botón +)
4. Completa el formulario:
   - **Nombre**: `Suite de Automatización Completa`
   - **URL**:
     ```
     https://raw.githubusercontent.com/jc-hk-1916/NaviTerm/main/autotask-subscriptions/subscriptions/complete-suite.json
     ```
   - **Actualización Automática**: `0 6 * * *` (Diariamente a las 6 AM)
5. Toca **Agregar**

✅ ¡Listo! Ahora tienes 4 scripts esenciales listos para usar.

---

## Paso 2: Configura tu Primer Script

### Ejemplo: Verificación de Salud del Servidor

1. Ve a **AutoTask** → **Scripts**
2. Encuentra **Server Health Check**
3. Edita los umbrales en la parte superior:
   ```javascript
   const CPU_THRESHOLD = 80;      // Alerta cuando CPU > 80%
   const MEMORY_THRESHOLD = 85;   // Alerta cuando Memoria > 85%
   const DISK_THRESHOLD = 90;     // Alerta cuando Disco > 90%
   ```
4. Guarda el script

---

## Expresiones Cron Comunes

| Expresión | Significado |
|-----------|-------------|
| `*/5 * * * *` | Cada 5 minutos |
| `0 * * * *` | Cada hora |
| `0 */6 * * *` | Cada 6 horas |
| `0 8 * * *` | Diariamente a las 8:00 AM |
| `0 0 * * 0` | Semanalmente los domingos |

---

## APIs Principales

```javascript
// SSH
$ssh.exec(hostId, command, callback)
$ssh.getHosts(callback)

// HTTP
$httpClient.get(url, callback)
$httpClient.post(options, callback)

// Notificaciones
$notification.post(title, subtitle, body)

// Almacenamiento
$persistentStore.write(value, key)
$persistentStore.read(key)

// Finalizar
$done(result)
```

---

## URLs de Suscripción

**Suite Completa:**
```
https://raw.githubusercontent.com/jc-hk-1916/NaviTerm/main/autotask-subscriptions/subscriptions/complete-suite.json
```

**Monitoreo SSH:**
```
https://raw.githubusercontent.com/jc-hk-1916/NaviTerm/main/autotask-subscriptions/subscriptions/ssh-monitoring-simple.conf
```

**Monitoreo API:**
```
https://raw.githubusercontent.com/jc-hk-1916/NaviTerm/main/autotask-subscriptions/subscriptions/api-monitoring-simple.conf
```

---

**¡Feliz Automatización! 🚀**
