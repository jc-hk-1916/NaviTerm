# NaviTerm AutoTask Skripte

**[🇩🇪 Deutsch](README-de.md) | [🇺🇸 English](README.md) | [🇨🇳 中文](README-zh.md) | [🇪🇸 Español](README-es.md) | [🇫🇷 Français](README-fr.md) | [🇯🇵 日本語](README-ja.md) | [🇷🇺 Русский](README-ru.md)**

---

**Offizielles Automatisierungsskript-Repository von NaviTerm**

Eine umfassende Sammlung von Automatisierungsskripten für Serverüberwachung, API-Gesundheitsprüfungen und Systemwartungsaufgaben. Angetrieben von NaviTerms AutoTask-Engine mit Unterstützung für SSH-, HTTP- und Hybrid-Workflows.

## 🚀 Schnellstart

### Abonnieren in 3 Schritten

1. Öffnen Sie die **NaviTerm** App
2. Navigieren Sie zu **AutoTask** → **Abonnements**
3. Fügen Sie ein Abonnement mit einer der URLs unten hinzu

## 💬 Treten Sie unserer Community bei

- 📢 [Telegram-Kanal](https://t.me/NavitermNews) - Erhalten Sie die neuesten Updates, Feature-Releases und wichtige Ankündigungen
- 💬 [Telegram-Diskussionsgruppe](https://t.me/NaviTermCommunity) - Vernetzen Sie sich mit anderen Benutzern, teilen Sie Tipps und tauschen Sie Erfahrungen aus

## 📋 Verfügbare Abonnements

### SSH-Überwachungssuite
Überwachen Sie Ihre Server mit umfassenden Gesundheitsprüfungen.

**Standard-Konfigurationsformat:**
```
https://raw.githubusercontent.com/jc-hk-1916/NaviTerm/main/autotask-subscriptions/subscriptions/ssh-monitoring.conf
```

**Einfaches Cron-Format:**
```
https://raw.githubusercontent.com/jc-hk-1916/NaviTerm/main/autotask-subscriptions/subscriptions/ssh-monitoring-simple.conf
```

**Erweitertes Cron-Format:**
```
https://raw.githubusercontent.com/jc-hk-1916/NaviTerm/main/autotask-subscriptions/subscriptions/ssh-monitoring-extended.conf
```

### API-Überwachungssuite
Überwachen Sie Ihre APIs und Webdienste.

**Standard-Konfigurationsformat:**
```
https://raw.githubusercontent.com/jc-hk-1916/NaviTerm/main/autotask-subscriptions/subscriptions/api-monitoring.conf
```

**Einfaches Cron-Format:**
```
https://raw.githubusercontent.com/jc-hk-1916/NaviTerm/main/autotask-subscriptions/subscriptions/api-monitoring-simple.conf
```

### Vollständige Suite (Empfohlen)
Alle Skripte in einem Abonnement (JSON-Format).

```
https://raw.githubusercontent.com/jc-hk-1916/NaviTerm/main/autotask-subscriptions/subscriptions/complete-suite.json
```

## 📦 Was Enthalten Ist

Dieses Repository bietet 13 Beispielskripte, die die vollständigen Fähigkeiten von NaviTerm AutoTask demonstrieren:

### SSH-Skripte (8 Beispiele)

**🔍 Überwachung (5 Skripte)**
- **Server-Gesundheitsprüfung** (`scripts/ssh/monitoring/server-health-check.js`)
  - Umfassende CPU-, Speicher- und Festplattenüberwachung
  - Konfigurierbare Alarmschwellen
  - Automatische Benachrichtigungen

- **Festplattenspeicher-Alarm** (`scripts/ssh/monitoring/disk-alert.js`)
  - Überwachung der Festplattennutzung
  - Konfigurierbare Schwellenwertalarme
  - Multi-Host-Unterstützung

- **Speicher-Monitor** (`scripts/ssh/monitoring/memory-monitor.js`)
  - Echtzeit-Speichernutzungsüberwachung
  - Konfigurierbare Alarmschwellen
  - Historische Datenverfolgung

- **Prozess-Monitor** (`scripts/ssh/monitoring/process-monitor.js`)
  - Überwachen kritischer Prozessstatus
  - Automatische Alarme bei Prozessstopps
  - Anpassbare Prozessliste

- **Historischer Daten-Tracker** (`scripts/ssh/monitoring/historical-data-tracker.js`)
  - Server-Metriken mit persistentem Speicher verfolgen
  - Lastverlaufsdaten aufzeichnen
  - Statistiken berechnen (Durchschnitt, Maximum, Minimum)
  - Automatische Bereinigung alter Daten

**📊 Systeminformationen (1 Skript)**
- **Systeminformationen** (`scripts/ssh/system/system-info.js`)
  - Vollständige Systeminformationen sammeln
  - OS, Kernel, CPU, Speicher usw.
  - Periodische Systemberichte generieren

**🌐 Netzwerkprüfung (2 Skripte)**
- **Netzwerkkonnektivitätsprüfung** (`scripts/ssh/network/connectivity-check.js`)
  - Ping-Test mehrerer Ziele
  - Automatische Netzwerkausfallalarme
  - Verbindungsqualitätsüberwachung

- **SSH-Verbindungstest** (`scripts/ssh/network/ssh-connection-test.js`)
  - Alle konfigurierten SSH-Host-Verbindungen testen
  - Befehlsausführungsfähigkeit überprüfen
  - Automatische Alarme für fehlgeschlagene Verbindungen
  - Verbindungstestberichte generieren

### HTTP-Skripte (4 Beispiele)

**📡 API-Überwachung (2 Skripte)**
- **API-Gesundheitsprüfung** (`scripts/http/api-monitoring/api-health-check.js`)
  - Mehrere API-Endpunkte überwachen (mit echten funktionierenden APIs)
  - JSONPlaceholder API (https://jsonplaceholder.typicode.com)
  - HTTPBin (https://httpbin.org)
  - GitHub API (https://api.github.com)
  - Example.com (https://example.com)
  - Antwortzeitsmessung
  - Automatische Fehlererkennung und Benachrichtigungen

- **API-Antwortzeit-Monitor** (`scripts/http/api-monitoring/response-time-monitor.js`)
  - API-Antwortzeiten messen
  - Antwortzeittrend-Analyse
  - Automatische Alarme bei langsamer Antwort
  - Historische Datenspeicherung

**📥 Datensammlung (1 Skript)**
- **Datensammler** (`scripts/http/data-collection/data-collector.js`)
  - Daten von mehreren APIs sammeln
  - Automatische Datenspeicherung
  - Sammlungsfehleralarme
  - JSON-Datenanalyse-Unterstützung

**🔗 Drittanbieter-Integration (1 Skript)**
- **Webhook-Integration** (`scripts/http/integrations/webhook-integration.js`)
  - Generische Webhook-Integration
  - Unterstützt Slack, Discord, DingTalk usw.
  - Automatische Statusberichte
  - Konfigurierbares Nachrichtenformat

### Hybrid-Skripte (1 Beispiel)

**🔄 SSH + HTTP Kombiniert**
- **Server-Statusbericht** (`scripts/hybrid/server-status-report.js`)
  - Server-Metriken über SSH sammeln
  - An Überwachungsplattform über HTTP berichten
  - Verwendet httpbin.org für Tests
  - Konfigurierbarer Berichtsendpunkt

## ✅ Echte Funktionierende APIs

Alle Beispielskripte verwenden echte, öffentlich verfügbare APIs:

| API | Zweck | URL |
|-----|-------|-----|
| JSONPlaceholder | Kostenlose Fake-REST-API | https://jsonplaceholder.typicode.com |
| HTTPBin | HTTP-Anfragetests | https://httpbin.org |
| GitHub API | Öffentliche API | https://api.github.com |
| Example.com | Test-Domain | https://example.com |

## 📖 Dokumentation

Vollständige Dokumentation in mehreren Sprachen verfügbar:

| Sprache | Schnellstart | API-Referenz |
|---------|--------------|--------------|
| 🇺🇸 English | [Quick Start](examples/QUICK-START.md) | [API Reference](examples/API-REFERENCE.md) |
| 🇨🇳 中文 | [快速开始](examples/QUICK-START-zh.md) | [API参考](examples/API-REFERENCE-zh.md) |

## 🤝 Beitragen

Wir begrüßen Community-Beiträge! Sie können auf folgende Weise teilnehmen:

- 📝 **Neue Skripte Einreichen** - Teilen Sie Ihre Automatisierungsskripte
- 🔧 **Bestehende Skripte Verbessern** - Fehler beheben oder Funktionen optimieren
- 🎨 **Icons Hinzufügen** - Bessere Icons entwerfen
- 🌐 **Dokumentation Übersetzen** - Mehr Sprachen unterstützen

### Wie Sie Beitragen Können

1. Forken Sie dieses Repository
2. Erstellen Sie Ihren Feature-Branch: `git checkout -b feature/amazing-script`
3. Committen Sie Ihre Änderungen: `git commit -m 'feat: add amazing script'`
4. Pushen Sie zum Branch: `git push origin feature/amazing-script`
5. Reichen Sie einen Pull Request ein

**Detaillierte Anleitung:** [CONTRIBUTING.md](CONTRIBUTING.md)

### Skript-Qualitätsanforderungen

- ✅ Echte, funktionierende APIs verwenden (Beispiel-APIs vermeiden)
- ✅ Fehlerbehandlung und Protokollierung einschließen
- ✅ Detaillierte Kommentare bereitstellen
- ✅ Bestehenden Code-Stil befolgen
- ✅ Skripte testen, um sicherzustellen, dass sie funktionieren

### Problem-Meldung

Ein Problem gefunden? Bitte melden Sie es in GitHub Issues:

- 💬 Diskussionen: [GitHub Discussions](https://github.com/jc-hk-1916/NaviTerm/discussions)
- 🐛 Probleme: [GitHub Issues](https://github.com/jc-hk-1916/NaviTerm/issues)

---

**Mit ❤️ erstellt vom NaviTerm Team**
