# Schnellstart-Anleitung

**[Andere Sprachen](README.md)** | 🇩🇪 Deutsch

Starten Sie mit NaviTerm AutoTask in 5 Minuten!

---

## Schritt 1: Fügen Sie Ihr Erstes Abonnement Hinzu

### Option A: Vollständige Suite (Empfohlen)

1. Öffnen Sie die **NaviTerm** App
2. Navigieren Sie zu **AutoTask** → **Abonnements**
3. Tippen Sie auf **Abonnement Hinzufügen** (+ Button)
4. Füllen Sie das Formular aus:
   - **Name**: `Vollständige Automatisierungs-Suite`
   - **URL**:
     ```
     https://raw.githubusercontent.com/jc-hk-1916/NaviTerm/main/autotask-subscriptions/subscriptions/complete-suite.json
     ```
   - **Auto-Update**: `0 6 * * *` (Täglich um 6 Uhr)
5. Tippen Sie auf **Hinzufügen**

✅ Fertig! Abonnement hinzugefügt, alle Beispielskripte sind jetzt verfügbar.

---

## Schritt 2: Konfigurieren Sie Ihr Erstes Skript

### Beispiel: Server-Gesundheitsprüfung

1. Gehen Sie zu **AutoTask** → **Skripte**
2. Finden Sie **Server Health Check**
3. Ändern Sie die Schwellenwerte oben:
   ```javascript
   const CPU_THRESHOLD = 80;      // Alarm wenn CPU > 80%
   const MEMORY_THRESHOLD = 85;   // Alarm wenn Speicher > 85%
   const DISK_THRESHOLD = 90;     // Alarm wenn Festplatte > 90%
   ```
4. Speichern Sie das Skript

---

## Häufige Cron-Ausdrücke

| Ausdruck | Bedeutung |
|----------|-----------|
| `*/5 * * * *` | Alle 5 Minuten |
| `0 * * * *` | Jede Stunde |
| `0 */6 * * *` | Alle 6 Stunden |
| `0 8 * * *` | Täglich um 8:00 Uhr |
| `0 0 * * 0` | Wöchentlich am Sonntag |

---

## Haupt-APIs

```javascript
// SSH
$ssh.exec(hostId, command, callback)
$ssh.getHosts(callback)

// HTTP
$httpClient.get(url, callback)
$httpClient.post(options, callback)

// Benachrichtigungen
$notification.post(title, subtitle, body)

// Speicher
$persistentStore.write(value, key)
$persistentStore.read(key)

// Beenden
$done(result)
```

---

## Abonnement-URLs

**Vollständige Suite:**
```
https://raw.githubusercontent.com/jc-hk-1916/NaviTerm/main/autotask-subscriptions/subscriptions/complete-suite.json
```

**SSH-Überwachung:**
```
https://raw.githubusercontent.com/jc-hk-1916/NaviTerm/main/autotask-subscriptions/subscriptions/ssh-monitoring-simple.conf
```

**API-Überwachung:**
```
https://raw.githubusercontent.com/jc-hk-1916/NaviTerm/main/autotask-subscriptions/subscriptions/api-monitoring-simple.conf
```

---

**Viel Erfolg bei der Automatisierung! 🚀**
