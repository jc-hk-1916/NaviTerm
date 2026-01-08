# Referencia de API de NaviTerm AutoTask

**[Otros idiomas](README.md)** | 🇪🇸 Español

Referencia completa de todas las API de JavaScript disponibles en NaviTerm AutoTask.

---

## Tabla de Contenidos

- [Operaciones SSH](#operaciones-ssh)
- [Cliente HTTP](#cliente-http)
- [Notificaciones](#notificaciones)
- [Almacenamiento Persistente](#almacenamiento-persistente)
- [Variables de Tiempo de Ejecución](#variables-de-tiempo-de-ejecución)
- [Preferencias](#preferencias)
- [Variables de Entorno](#variables-de-entorno)
- [Entorno del Sistema](#entorno-del-sistema)
- [Utilidades de Fecha](#utilidades-de-fecha)
- [Registro](#registro)
- [Control de Script](#control-de-script)

---

## Operaciones SSH

### `$ssh.exec(hostId, command, callback)`

Ejecutar comando SSH en un host remoto.

**Parámetros:**
- `hostId` (string): ID del host de los hosts configurados
- `command` (string): Comando shell a ejecutar
- `callback` (function): Función de callback con resultado

**Firma del callback:**
```javascript
(result) => {
    // result.success (boolean): Estado de ejecución del comando
    // result.output (string): Salida del comando
    // result.exitCode (number): Código de salida
    // result.error (string): Mensaje de error (si falló)
}
```

**Ejemplo:**
```javascript
$ssh.exec('host-123', 'uptime', (result) => {
    if (result.success) {
        console.log('Tiempo de actividad:', result.output);
    } else {
        console.error('Error:', result.error);
    }
});
```

### `$ssh.getHosts(callback)`

Obtener todos los hosts SSH configurados.

**Parámetros:**
- `callback` (function): Función de callback con array de hosts

**Firma del callback:**
```javascript
(hosts) => {
    // hosts es un array de objetos host:
    // - id (string): ID del host
    // - name (string): Nombre del host
    // - host (string): Nombre de host o IP
    // - port (number): Puerto SSH
    // - username (string): Nombre de usuario SSH
    // - group (string): Grupo del host (opcional)
}
```

**Ejemplo:**
```javascript
$ssh.getHosts((hosts) => {
    console.log(`Se encontraron ${hosts.length} hosts`);
    hosts.forEach(host => {
        console.log(`- ${host.name} (${host.host})`);
    });
});
```

### `$ssh.connect(hostId, callback)`

Establecer conexión SSH a un host.

**Parámetros:**
- `hostId` (string): ID del host
- `callback` (function): Callback con resultado de conexión

**Ejemplo:**
```javascript
$ssh.connect('host-123', (success, error) => {
    if (success) {
        console.log('Conectado exitosamente');
    } else {
        console.error('Conexión fallida:', error);
    }
});
```

### `$ssh.disconnect(hostId)`

Desconectar del host SSH.

**Parámetros:**
- `hostId` (string): ID del host

**Ejemplo:**
```javascript
$ssh.disconnect('host-123');
```

### `$ssh.isConnected(hostId)`

Verificar si está conectado a un host.

**Parámetros:**
- `hostId` (string): ID del host

**Retorna:** `boolean`

**Ejemplo:**
```javascript
if ($ssh.isConnected('host-123')) {
    console.log('Ya conectado');
}
```

---

## Cliente HTTP

### `$httpClient.get(urlOrOptions, callback)`

Enviar solicitud HTTP GET.

**Parámetros:**
- `urlOrOptions` (string | object): String de URL u objeto de opciones
- `callback` (function): Callback con respuesta

**Objeto de opciones:**
```javascript
{
    url: 'https://api.example.com/data',
    headers: {
        'Authorization': 'Bearer token',
        'Content-Type': 'application/json'
    }
}
```

**Firma del callback:**
```javascript
(error, response, body) => {
    // error (string): Mensaje de error (null si éxito)
    // response (object): Objeto de respuesta con status y headers
    // body (string): Cuerpo de la respuesta
}
```

**Ejemplo:**
```javascript
$httpClient.get('https://api.example.com/data', (error, response, body) => {
    if (error) {
        console.error('Solicitud fallida:', error);
        return;
    }
    console.log('Estado:', response.status);
    console.log('Cuerpo:', body);
});
```

### `$httpClient.post(urlOrOptions, callback)`

Enviar solicitud HTTP POST.

**Ejemplo:**
```javascript
$httpClient.post({
    url: 'https://api.example.com/data',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({ key: 'value' })
}, (error, response, body) => {
    if (!error && response.status === 200) {
        console.log('Éxito:', body);
    }
});
```

### `$httpClient.put(urlOrOptions, callback)`

Enviar solicitud HTTP PUT. Misma firma que POST.

### `$httpClient.delete(urlOrOptions, callback)`

Enviar solicitud HTTP DELETE. Misma firma que GET.

### `$httpClient.head(urlOrOptions, callback)`

Enviar solicitud HTTP HEAD. Misma firma que GET.

### `$httpClient.patch(urlOrOptions, callback)`

Enviar solicitud HTTP PATCH. Misma firma que POST.

### `$task.fetch(options)`

Cliente HTTP basado en Promesas.

**Parámetros:**
- `options` (object): Opciones de solicitud

**Opciones:**
```javascript
{
    url: 'https://api.example.com/data',
    method: 'GET',  // GET, POST, PUT, DELETE, etc.
    headers: {
        'Authorization': 'Bearer token'
    },
    body: 'cuerpo de solicitud'
}
```

**Retorna:** Promesa con objeto de respuesta

**Objeto de respuesta:**
```javascript
{
    status: 200,
    headers: { ... },
    body: 'cuerpo de respuesta'
}
```

**Ejemplo:**
```javascript
$task.fetch({
    url: 'https://api.example.com/data',
    method: 'GET'
})
.then(response => {
    console.log('Estado:', response.status);
    console.log('Cuerpo:', response.body);
})
.catch(error => {
    console.error('Error:', error.error);
});
```

---

## Notificaciones

### `$notification.post(title, subtitle, body, options)`

Enviar notificación del sistema.

**Parámetros:**
- `title` (string): Título de la notificación
- `subtitle` (string): Subtítulo de la notificación
- `body` (string): Cuerpo de la notificación
- `options` (object): Configuración opcional

**Opciones:**
```javascript
{
    url: 'https://example.com',  // URL para abrir al hacer clic
    'open-url': 'https://example.com'  // Clave alternativa
}
```

**Ejemplo:**
```javascript
$notification.post(
    'Alerta del Servidor',
    'Uso Alto de CPU',
    'El uso de CPU está al 95%',
    { url: 'https://monitoring.example.com' }
);
```

### `$notify(title, subtitle, body, options)`

API de notificación alternativa. Misma firma que `$notification.post`.

---

## Almacenamiento Persistente

### `$persistentStore.write(value, key)`

Guardar datos permanentemente.

**Parámetros:**
- `value` (string): Valor a guardar
- `key` (string): Clave de almacenamiento

**Retorna:** `boolean` (estado de éxito)

**Ejemplo:**
```javascript
const data = JSON.stringify({ count: 42 });
$persistentStore.write(data, 'my-data');
```

### `$persistentStore.read(key)`

Leer datos guardados.

**Parámetros:**
- `key` (string): Clave de almacenamiento

**Retorna:** `string | null`

**Ejemplo:**
```javascript
const data = $persistentStore.read('my-data');
if (data) {
    const obj = JSON.parse(data);
    console.log('Contador:', obj.count);
}
```

### `$persistentStore.allKeys()`

Obtener todas las claves de almacenamiento.

**Retorna:** Array de strings

**Ejemplo:**
```javascript
const keys = $persistentStore.allKeys();
console.log('Claves almacenadas:', keys);
```

### `$persistentStore.remove(key)`

Eliminar una clave del almacenamiento.

**Parámetros:**
- `key` (string): Clave de almacenamiento

**Retorna:** `boolean`

**Ejemplo:**
```javascript
$persistentStore.remove('my-data');
```

### `$persistentStore.clear()`

Limpiar todos los datos almacenados.

**Ejemplo:**
```javascript
$persistentStore.clear();
```

---

## Variables de Tiempo de Ejecución

Variables temporales que existen solo durante la ejecución del script.

### `$variables.set(key, value)`

Establecer variable de tiempo de ejecución.

**Parámetros:**
- `key` (string): Nombre de la variable
- `value` (string): Valor de la variable

**Retorna:** `boolean`

**Ejemplo:**
```javascript
$variables.set('counter', '10');
```

### `$variables.get(key)`

Obtener variable de tiempo de ejecución.

**Parámetros:**
- `key` (string): Nombre de la variable

**Retorna:** `string | null`

**Ejemplo:**
```javascript
const counter = $variables.get('counter');
console.log('Contador:', counter);
```

### `$variables.has(key)`

Verificar si existe la variable.

**Parámetros:**
- `key` (string): Nombre de la variable

**Retorna:** `boolean`

**Ejemplo:**
```javascript
if ($variables.has('counter')) {
    console.log('El contador existe');
}
```

### `$variables.allKeys()`

Obtener todos los nombres de variables.

**Retorna:** Array de strings

### `$variables.remove(key)`

Eliminar una variable.

**Parámetros:**
- `key` (string): Nombre de la variable

**Retorna:** `boolean`

### `$variables.clear()`

Limpiar todas las variables.

---

## Preferencias

Similar al almacenamiento persistente pero diseñado para preferencias de usuario.

### `$prefs.setValueForKey(value, key)`

Establecer valor de preferencia.

**Parámetros:**
- `value` (string): Valor de preferencia
- `key` (string): Clave de preferencia

**Retorna:** `boolean`

### `$prefs.valueForKey(key)`

Obtener valor de preferencia.

**Parámetros:**
- `key` (string): Clave de preferencia

**Retorna:** `string | null`

### `$prefs.removeValueForKey(key)`

Eliminar preferencia.

**Parámetros:**
- `key` (string): Clave de preferencia

**Retorna:** `boolean`

### `$prefs.removeAllValues()`

Limpiar todas las preferencias.

---

## Variables de Entorno

### `$env.get(key, defaultValue)`

Obtener variable de entorno.

**Parámetros:**
- `key` (string): Nombre de la variable
- `defaultValue` (string): Valor predeterminado si no se encuentra

**Retorna:** `string | null`

**Ejemplo:**
```javascript
const apiKey = $env.get('API_KEY', 'default-key');
```

### `$env.set(key, value)`

Establecer variable de entorno.

**Parámetros:**
- `key` (string): Nombre de la variable
- `value` (string): Valor de la variable

**Retorna:** `boolean`

### `$env.remove(key)`

Eliminar variable de entorno.

**Parámetros:**
- `key` (string): Nombre de la variable

**Retorna:** `boolean`

### `$env.allKeys()`

Obtener todos los nombres de variables de entorno.

**Retorna:** Array de strings

### `$env.all()`

Obtener todas las variables de entorno como objeto.

**Retorna:** Objeto con pares clave-valor

**Ejemplo:**
```javascript
const allEnv = $env.all();
console.log('Entorno:', allEnv);
```

---

## Entorno del Sistema

### `$environment`

Objeto de solo lectura con información del sistema.

**Propiedades:**
- `system` (string): "iOS" o "macOS"
- `version` (string): Versión de la aplicación
- `language` (string): Código de idioma del sistema
- `deviceName` (string): Nombre del dispositivo

**Ejemplo:**
```javascript
console.log('Sistema:', $environment.system);
console.log('Versión:', $environment.version);
console.log('Idioma:', $environment.language);
console.log('Dispositivo:', $environment.deviceName);
```

---

## Utilidades de Fecha

### `$date.now()`

Obtener fecha/hora actual con milisegundos.

**Retorna:** String en formato "YYYY-MM-DD HH:mm:ss.SSS"

**Ejemplo:**
```javascript
const now = $date.now();
console.log('Ahora:', now);  // "2024-01-15 14:30:45.123"
```

### `$date.nowSimple()`

Obtener fecha/hora actual sin milisegundos.

**Retorna:** String en formato "YYYY-MM-DD HH:mm:ss"

**Ejemplo:**
```javascript
const now = $date.nowSimple();
console.log('Ahora:', now);  // "2024-01-15 14:30:45"
```

### `$date.format(formatString)`

Formatear fecha/hora actual con formato personalizado.

**Parámetros:**
- `formatString` (string): String de formato de fecha (opcional, predeterminado: "yyyy-MM-dd HH:mm:ss")

**Retorna:** String de fecha formateada

**Ejemplo:**
```javascript
const date = $date.format('yyyy-MM-dd');
console.log('Fecha:', date);  // "2024-01-15"

const time = $date.format('HH:mm:ss');
console.log('Hora:', time);  // "14:30:45"
```

### `$date.timestamp()`

Obtener marca de tiempo actual en milisegundos.

**Retorna:** Number (milisegundos desde epoch)

**Ejemplo:**
```javascript
const ts = $date.timestamp();
console.log('Marca de tiempo:', ts);  // 1705329045123
```

---

## Registro

### `console.log(message)`

Registrar mensaje normal.

**Parámetros:**
- `message` (string): Mensaje de registro

**Ejemplo:**
```javascript
console.log('[Info] Script iniciado');
```

### `console.warn(message)`

Registrar mensaje de advertencia.

**Parámetros:**
- `message` (string): Mensaje de advertencia

**Ejemplo:**
```javascript
console.warn('[Advertencia] Uso alto de CPU detectado');
```

### `console.error(message)`

Registrar mensaje de error.

**Parámetros:**
- `message` (string): Mensaje de error

**Ejemplo:**
```javascript
console.error('[Error] Conexión fallida');
```

---

## Control de Script

### `$done(result)`

Finalizar ejecución del script y devolver resultado.

**Parámetros:**
- `result` (string): Datos de resultado (usualmente string JSON)

**Ejemplo:**
```javascript
$done(JSON.stringify({
    success: true,
    data: { count: 42 }
}));
```

**Importante:** Siempre llame a `$done()` al final de su script, especialmente para operaciones asíncronas.

---

## Mejores Prácticas

### 1. Manejo de Errores

Siempre maneje errores en callbacks:

```javascript
$ssh.exec(hostId, command, (result) => {
    if (!result.success) {
        console.error('Comando fallido:', result.error);
        $notification.post('Error', result.error, '');
        $done(JSON.stringify({ error: result.error }));
        return;
    }
    // Procesar caso de éxito
});
```

### 2. Operaciones Asíncronas

Rastree operaciones asíncronas para asegurar que `$done()` se llame correctamente:

```javascript
let completed = 0;
const total = hosts.length;

hosts.forEach(host => {
    checkHost(host, (result) => {
        completed++;
        if (completed === total) {
            $done(JSON.stringify({ results }));
        }
    });
});
```

### 3. Registro

Use registro estructurado con prefijos:

```javascript
console.log('[Verificación de Salud] Iniciando...');
console.warn('[Verificación de Salud] CPU Alta: 95%');
console.error('[Verificación de Salud] Falló al conectar');
```

### 4. Notificaciones

Envíe notificaciones significativas:

```javascript
$notification.post(
    'Alerta del Servidor',                // Título claro
    'web-server-01',                      // Contexto específico
    'CPU: 95%, Memoria: 87%',            // Detalles accionables
    { url: 'https://monitoring.com' }     // Acceso rápido
);
```

### 5. Persistencia de Datos

Use almacenamiento persistente para tendencias:

```javascript
// Guardar valor actual
const key = `cpu_usage_${$date.format('yyyy-MM-dd')}`;
const history = JSON.parse($persistentStore.read(key) || '[]');
history.push({ time: $date.nowSimple(), value: cpuUsage });
$persistentStore.write(JSON.stringify(history), key);
```

---

## Ejemplos

### Script SSH Completo

```javascript
console.log('[Verificación de Disco] Iniciando...');

$ssh.getHosts((hosts) => {
    if (hosts.length === 0) {
        console.error('[Verificación de Disco] No hay hosts configurados');
        $done(JSON.stringify({ error: 'Sin hosts' }));
        return;
    }

    let results = [];
    let completed = 0;

    hosts.forEach(host => {
        $ssh.exec(host.id, "df -h / | tail -1 | awk '{print $5}'", (result) => {
            if (result.success) {
                const usage = parseInt(result.output.trim());
                results.push({ host: host.name, usage });

                if (usage > 90) {
                    $notification.post(
                        'Alerta de Disco',
                        host.name,
                        `Uso de disco: ${usage}%`
                    );
                }
            }

            completed++;
            if (completed === hosts.length) {
                $done(JSON.stringify({ results }));
            }
        });
    });
});
```

### Script HTTP Completo

```javascript
console.log('[Verificación de API] Iniciando...');

const endpoints = [
    'https://jsonplaceholder.typicode.com/posts/1',
    'https://httpbin.org/status/200'
];

let results = [];
let completed = 0;

endpoints.forEach(url => {
    const startTime = $date.timestamp();

    $httpClient.get(url, (error, response, body) => {
        const endTime = $date.timestamp();
        const responseTime = endTime - startTime;

        results.push({
            url,
            healthy: !error && response.status === 200,
            responseTime
        });

        completed++;
        if (completed === endpoints.length) {
            const unhealthy = results.filter(r => !r.healthy);
            if (unhealthy.length > 0) {
                $notification.post(
                    'Alerta de API',
                    `${unhealthy.length} endpoint(s) caído(s)`,
                    ''
                );
            }
            $done(JSON.stringify({ results }));
        }
    });
});
```

---

## ¿Necesita Ayuda?

- **Inicio Rápido**: [QUICK-START-es.md](QUICK-START-es.md)
- **GitHub**: https://github.com/jc-hk-1916/NaviTerm

---

**¡Feliz Codificación! 🚀**
