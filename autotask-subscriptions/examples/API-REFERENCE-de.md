# NaviTerm AutoTask API-Referenz

**[Andere Sprachen](README.md)** | 🇩🇪 Deutsch

Vollständige Referenz für alle verfügbaren JavaScript-APIs in NaviTerm AutoTask.

---

## Inhaltsverzeichnis

- [SSH-Operationen](#ssh-operationen)
- [HTTP-Client](#http-client)
- [Benachrichtigungen](#benachrichtigungen)
- [Persistenter Speicher](#persistenter-speicher)
- [Laufzeitvariablen](#laufzeitvariablen)
- [Einstellungen](#einstellungen)
- [Umgebungsvariablen](#umgebungsvariablen)
- [Systemumgebung](#systemumgebung)
- [Datums-Utilities](#datums-utilities)
- [Protokollierung](#protokollierung)
- [Skript-Steuerung](#skript-steuerung)

---

## SSH-Operationen

### `$ssh.exec(hostId, command, callback)`

SSH-Befehl auf einem Remote-Host ausführen.

**Parameter:**
- `hostId` (string): Host-ID aus konfigurierten Hosts
- `command` (string): Auszuführender Shell-Befehl
- `callback` (function): Callback-Funktion mit Ergebnis

**Callback-Signatur:**
```javascript
(result) => {
    // result.success (boolean): Befehlsausführungsstatus
    // result.output (string): Befehlsausgabe
    // result.exitCode (number): Exit-Code
    // result.error (string): Fehlermeldung (bei Fehler)
}
```

**Beispiel:**
```javascript
$ssh.exec('host-123', 'uptime', (result) => {
    if (result.success) {
        console.log('Betriebszeit:', result.output);
    } else {
        console.error('Fehler:', result.error);
    }
});
```

### `$ssh.getHosts(callback)`

Alle konfigurierten SSH-Hosts abrufen.

**Parameter:**
- `callback` (function): Callback-Funktion mit Host-Array

**Callback-Signatur:**
```javascript
(hosts) => {
    // hosts ist ein Array von Host-Objekten:
    // - id (string): Host-ID
    // - name (string): Host-Name
    // - host (string): Hostname oder IP
    // - port (number): SSH-Port
    // - username (string): SSH-Benutzername
    // - group (string): Host-Gruppe (optional)
}
```

**Beispiel:**
```javascript
$ssh.getHosts((hosts) => {
    console.log(`${hosts.length} Hosts gefunden`);
    hosts.forEach(host => {
        console.log(`- ${host.name} (${host.host})`);
    });
});
```

### `$ssh.connect(hostId, callback)`

SSH-Verbindung zu einem Host herstellen.

**Parameter:**
- `hostId` (string): Host-ID
- `callback` (function): Callback mit Verbindungsergebnis

**Beispiel:**
```javascript
$ssh.connect('host-123', (success, error) => {
    if (success) {
        console.log('Erfolgreich verbunden');
    } else {
        console.error('Verbindung fehlgeschlagen:', error);
    }
});
```

### `$ssh.disconnect(hostId)`

Vom SSH-Host trennen.

**Parameter:**
- `hostId` (string): Host-ID

**Beispiel:**
```javascript
$ssh.disconnect('host-123');
```

### `$ssh.isConnected(hostId)`

Prüfen, ob mit einem Host verbunden.

**Parameter:**
- `hostId` (string): Host-ID

**Rückgabe:** `boolean`

**Beispiel:**
```javascript
if ($ssh.isConnected('host-123')) {
    console.log('Bereits verbunden');
}
```

---

## HTTP-Client

### `$httpClient.get(urlOrOptions, callback)`

HTTP-GET-Anfrage senden.

**Parameter:**
- `urlOrOptions` (string | object): URL-String oder Options-Objekt
- `callback` (function): Callback mit Antwort

**Options-Objekt:**
```javascript
{
    url: 'https://api.example.com/data',
    headers: {
        'Authorization': 'Bearer token',
        'Content-Type': 'application/json'
    }
}
```

**Callback-Signatur:**
```javascript
(error, response, body) => {
    // error (string): Fehlermeldung (null bei Erfolg)
    // response (object): Antwortobjekt mit Status und Headers
    // body (string): Antwortkörper
}
```

**Beispiel:**
```javascript
$httpClient.get('https://api.example.com/data', (error, response, body) => {
    if (error) {
        console.error('Anfrage fehlgeschlagen:', error);
        return;
    }
    console.log('Status:', response.status);
    console.log('Körper:', body);
});
```

### `$httpClient.post(urlOrOptions, callback)`

HTTP-POST-Anfrage senden.

**Beispiel:**
```javascript
$httpClient.post({
    url: 'https://api.example.com/data',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({ key: 'value' })
}, (error, response, body) => {
    if (!error && response.status === 200) {
        console.log('Erfolg:', body);
    }
});
```

### `$httpClient.put(urlOrOptions, callback)`

HTTP-PUT-Anfrage senden. Gleiche Signatur wie POST.

### `$httpClient.delete(urlOrOptions, callback)`

HTTP-DELETE-Anfrage senden. Gleiche Signatur wie GET.

### `$httpClient.head(urlOrOptions, callback)`

HTTP-HEAD-Anfrage senden. Gleiche Signatur wie GET.

### `$httpClient.patch(urlOrOptions, callback)`

HTTP-PATCH-Anfrage senden. Gleiche Signatur wie POST.

### `$task.fetch(options)`

Promise-basierter HTTP-Client.

**Parameter:**
- `options` (object): Anfrage-Optionen

**Optionen:**
```javascript
{
    url: 'https://api.example.com/data',
    method: 'GET',  // GET, POST, PUT, DELETE, etc.
    headers: {
        'Authorization': 'Bearer token'
    },
    body: 'Anfragekörper'
}
```

**Rückgabe:** Promise mit Antwortobjekt

**Antwortobjekt:**
```javascript
{
    status: 200,
    headers: { ... },
    body: 'Antwortkörper'
}
```

**Beispiel:**
```javascript
$task.fetch({
    url: 'https://api.example.com/data',
    method: 'GET'
})
.then(response => {
    console.log('Status:', response.status);
    console.log('Körper:', response.body);
})
.catch(error => {
    console.error('Fehler:', error.error);
});
```

---

## Benachrichtigungen

### `$notification.post(title, subtitle, body, options)`

Systembenachrichtigung senden.

**Parameter:**
- `title` (string): Benachrichtigungstitel
- `subtitle` (string): Benachrichtigungs-Untertitel
- `body` (string): Benachrichtigungskörper
- `options` (object): Optionale Einstellungen

**Optionen:**
```javascript
{
    url: 'https://example.com',  // URL zum Öffnen beim Klicken
    'open-url': 'https://example.com'  // Alternativer Schlüssel
}
```

**Beispiel:**
```javascript
$notification.post(
    'Server-Alarm',
    'Hohe CPU-Auslastung',
    'CPU-Auslastung liegt bei 95%',
    { url: 'https://monitoring.example.com' }
);
```

### `$notify(title, subtitle, body, options)`

Alternative Benachrichtigungs-API. Gleiche Signatur wie `$notification.post`.

---

## Persistenter Speicher

### `$persistentStore.write(value, key)`

Daten dauerhaft speichern.

**Parameter:**
- `value` (string): Zu speichernder Wert
- `key` (string): Speicherschlüssel

**Rückgabe:** `boolean` (Erfolgsstatus)

**Beispiel:**
```javascript
const data = JSON.stringify({ count: 42 });
$persistentStore.write(data, 'my-data');
```

### `$persistentStore.read(key)`

Gespeicherte Daten lesen.

**Parameter:**
- `key` (string): Speicherschlüssel

**Rückgabe:** `string | null`

**Beispiel:**
```javascript
const data = $persistentStore.read('my-data');
if (data) {
    const obj = JSON.parse(data);
    console.log('Zähler:', obj.count);
}
```

### `$persistentStore.allKeys()`

Alle Speicherschlüssel abrufen.

**Rückgabe:** Array von Strings

**Beispiel:**
```javascript
const keys = $persistentStore.allKeys();
console.log('Gespeicherte Schlüssel:', keys);
```

### `$persistentStore.remove(key)`

Einen Schlüssel aus dem Speicher entfernen.

**Parameter:**
- `key` (string): Speicherschlüssel

**Rückgabe:** `boolean`

**Beispiel:**
```javascript
$persistentStore.remove('my-data');
```

### `$persistentStore.clear()`

Alle gespeicherten Daten löschen.

**Beispiel:**
```javascript
$persistentStore.clear();
```

---

## Laufzeitvariablen

Temporäre Variablen, die nur während der Skriptausführung existieren.

### `$variables.set(key, value)`

Laufzeitvariable setzen.

**Parameter:**
- `key` (string): Variablenname
- `value` (string): Variablenwert

**Rückgabe:** `boolean`

**Beispiel:**
```javascript
$variables.set('counter', '10');
```

### `$variables.get(key)`

Laufzeitvariable abrufen.

**Parameter:**
- `key` (string): Variablenname

**Rückgabe:** `string | null`

**Beispiel:**
```javascript
const counter = $variables.get('counter');
console.log('Zähler:', counter);
```

### `$variables.has(key)`

Prüfen, ob Variable existiert.

**Parameter:**
- `key` (string): Variablenname

**Rückgabe:** `boolean`

**Beispiel:**
```javascript
if ($variables.has('counter')) {
    console.log('Zähler existiert');
}
```

### `$variables.allKeys()`

Alle Variablennamen abrufen.

**Rückgabe:** Array von Strings

### `$variables.remove(key)`

Eine Variable entfernen.

**Parameter:**
- `key` (string): Variablenname

**Rückgabe:** `boolean`

### `$variables.clear()`

Alle Variablen löschen.

---

## Einstellungen

Ähnlich wie persistenter Speicher, aber für Benutzereinstellungen konzipiert.

### `$prefs.setValueForKey(value, key)`

Einstellungswert setzen.

**Parameter:**
- `value` (string): Einstellungswert
- `key` (string): Einstellungsschlüssel

**Rückgabe:** `boolean`

### `$prefs.valueForKey(key)`

Einstellungswert abrufen.

**Parameter:**
- `key` (string): Einstellungsschlüssel

**Rückgabe:** `string | null`

### `$prefs.removeValueForKey(key)`

Einstellung entfernen.

**Parameter:**
- `key` (string): Einstellungsschlüssel

**Rückgabe:** `boolean`

### `$prefs.removeAllValues()`

Alle Einstellungen löschen.

---

## Umgebungsvariablen

### `$env.get(key, defaultValue)`

Umgebungsvariable abrufen.

**Parameter:**
- `key` (string): Variablenname
- `defaultValue` (string): Standardwert, wenn nicht gefunden

**Rückgabe:** `string | null`

**Beispiel:**
```javascript
const apiKey = $env.get('API_KEY', 'default-key');
```

### `$env.set(key, value)`

Umgebungsvariable setzen.

**Parameter:**
- `key` (string): Variablenname
- `value` (string): Variablenwert

**Rückgabe:** `boolean`

### `$env.remove(key)`

Umgebungsvariable entfernen.

**Parameter:**
- `key` (string): Variablenname

**Rückgabe:** `boolean`

### `$env.allKeys()`

Alle Umgebungsvariablennamen abrufen.

**Rückgabe:** Array von Strings

### `$env.all()`

Alle Umgebungsvariablen als Objekt abrufen.

**Rückgabe:** Objekt mit Schlüssel-Wert-Paaren

**Beispiel:**
```javascript
const allEnv = $env.all();
console.log('Umgebung:', allEnv);
```

---

## Systemumgebung

### `$environment`

Nur-Lese-Objekt mit Systeminformationen.

**Eigenschaften:**
- `system` (string): "iOS" oder "macOS"
- `version` (string): App-Version
- `language` (string): Systemsprachcode
- `deviceName` (string): Gerätename

**Beispiel:**
```javascript
console.log('System:', $environment.system);
console.log('Version:', $environment.version);
console.log('Sprache:', $environment.language);
console.log('Gerät:', $environment.deviceName);
```

---

## Datums-Utilities

### `$date.now()`

Aktuelles Datum/Uhrzeit mit Millisekunden abrufen.

**Rückgabe:** String im Format "YYYY-MM-DD HH:mm:ss.SSS"

**Beispiel:**
```javascript
const now = $date.now();
console.log('Jetzt:', now);  // "2024-01-15 14:30:45.123"
```

### `$date.nowSimple()`

Aktuelles Datum/Uhrzeit ohne Millisekunden abrufen.

**Rückgabe:** String im Format "YYYY-MM-DD HH:mm:ss"

**Beispiel:**
```javascript
const now = $date.nowSimple();
console.log('Jetzt:', now);  // "2024-01-15 14:30:45"
```

### `$date.format(formatString)`

Aktuelles Datum/Uhrzeit mit benutzerdefiniertem Format formatieren.

**Parameter:**
- `formatString` (string): Datumsformat-String (optional, Standard: "yyyy-MM-dd HH:mm:ss")

**Rückgabe:** Formatierter Datumsstring

**Beispiel:**
```javascript
const date = $date.format('yyyy-MM-dd');
console.log('Datum:', date);  // "2024-01-15"

const time = $date.format('HH:mm:ss');
console.log('Zeit:', time);  // "14:30:45"
```

### `$date.timestamp()`

Aktuellen Zeitstempel in Millisekunden abrufen.

**Rückgabe:** Number (Millisekunden seit Epoch)

**Beispiel:**
```javascript
const ts = $date.timestamp();
console.log('Zeitstempel:', ts);  // 1705329045123
```

---

## Protokollierung

### `console.log(message)`

Normale Nachricht protokollieren.

**Parameter:**
- `message` (string): Protokollnachricht

**Beispiel:**
```javascript
console.log('[Info] Skript gestartet');
```

### `console.warn(message)`

Warnmeldung protokollieren.

**Parameter:**
- `message` (string): Warnmeldung

**Beispiel:**
```javascript
console.warn('[Warnung] Hohe CPU-Auslastung erkannt');
```

### `console.error(message)`

Fehlermeldung protokollieren.

**Parameter:**
- `message` (string): Fehlermeldung

**Beispiel:**
```javascript
console.error('[Fehler] Verbindung fehlgeschlagen');
```

---

## Skript-Steuerung

### `$done(result)`

Skriptausführung beenden und Ergebnis zurückgeben.

**Parameter:**
- `result` (string): Ergebnisdaten (normalerweise JSON-String)

**Beispiel:**
```javascript
$done(JSON.stringify({
    success: true,
    data: { count: 42 }
}));
```

**Wichtig:** Rufen Sie immer `$done()` am Ende Ihres Skripts auf, besonders bei asynchronen Operationen.

---

## Best Practices

### 1. Fehlerbehandlung

Behandeln Sie immer Fehler in Callbacks:

```javascript
$ssh.exec(hostId, command, (result) => {
    if (!result.success) {
        console.error('Befehl fehlgeschlagen:', result.error);
        $notification.post('Fehler', result.error, '');
        $done(JSON.stringify({ error: result.error }));
        return;
    }
    // Erfolgsfall verarbeiten
});
```

### 2. Asynchrone Operationen

Verfolgen Sie asynchrone Operationen, um sicherzustellen, dass `$done()` korrekt aufgerufen wird:

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

### 3. Protokollierung

Verwenden Sie strukturierte Protokollierung mit Präfixen:

```javascript
console.log('[Gesundheitsprüfung] Starte...');
console.warn('[Gesundheitsprüfung] Hohe CPU: 95%');
console.error('[Gesundheitsprüfung] Verbindung fehlgeschlagen');
```

---

## Beispiele

### Vollständiges SSH-Skript

```javascript
console.log('[Festplattenprüfung] Starte...');

$ssh.getHosts((hosts) => {
    if (hosts.length === 0) {
        console.error('[Festplattenprüfung] Keine Hosts konfiguriert');
        $done(JSON.stringify({ error: 'Keine Hosts' }));
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
                        'Festplatten-Alarm',
                        host.name,
                        `Festplattennutzung: ${usage}%`
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

### Vollständiges HTTP-Skript

```javascript
console.log('[API-Prüfung] Starte...');

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
                    'API-Alarm',
                    `${unhealthy.length} Endpunkt(e) ausgefallen`,
                    ''
                );
            }
            $done(JSON.stringify({ results }));
        }
    });
});
```

---

## Benötigen Sie Hilfe?

- **Schnellstart**: [QUICK-START-de.md](QUICK-START-de.md)
- **GitHub**: https://github.com/jc-hk-1916/NaviTerm

---

**Viel Erfolg beim Programmieren! 🚀**
