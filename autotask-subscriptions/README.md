# NaviTerm AutoTask Scripts

**[🇺🇸 English](README.md) | [🇨🇳 中文](README-zh.md) | [🇪🇸 Español](README-es.md) | [🇫🇷 Français](README-fr.md) | [🇩🇪 Deutsch](README-de.md) | [🇯🇵 日本語](README-ja.md) | [🇷🇺 Русский](README-ru.md)**

---

**Official automation script repository for NaviTerm**

A comprehensive collection of automation scripts for server monitoring, API health checks, and system maintenance tasks. Powered by NaviTerm's AutoTask engine with support for SSH, HTTP, and hybrid workflows.

## 🚀 Quick Start

### Subscribe in 3 Steps

1. Open **NaviTerm** app
2. Navigate to **AutoTask** → **Subscriptions**
3. Add subscription with one of the URLs below

## 💬 Join Our Community

- 📢 [Telegram Channel](https://t.me/NavitermNews) - Get the latest updates, feature releases, and important announcements
- 💬 [Telegram Discussion Group](https://t.me/NaviTermCommunity) - Connect with other users, share tips, and exchange experiences

## 📋 Available Subscriptions

### Complete Suite (Recommended)
All scripts in one subscription using NaviTerm's native JSON format.

**JSON Format (.json) - NaviTerm Standard:**
```
https://raw.githubusercontent.com/jc-hk-1916/NaviTerm/main/autotask-subscriptions/subscriptions/complete-suite.json
```

### SSH Monitoring Suite
Monitor your servers with comprehensive health checks.

**Compatible Formats:**

Config Format (.conf):
```
https://raw.githubusercontent.com/jc-hk-1916/NaviTerm/main/autotask-subscriptions/subscriptions/ssh-monitoring.conf
```

Cron Format (.conf):
```
https://raw.githubusercontent.com/jc-hk-1916/NaviTerm/main/autotask-subscriptions/subscriptions/ssh-monitoring-simple.conf
```

Cron+ Format (.conf):
```
https://raw.githubusercontent.com/jc-hk-1916/NaviTerm/main/autotask-subscriptions/subscriptions/ssh-monitoring-extended.conf
```

### API Monitoring Suite
Monitor your APIs and web services.

**Compatible Formats:**

Config Format (.conf):
```
https://raw.githubusercontent.com/jc-hk-1916/NaviTerm/main/autotask-subscriptions/subscriptions/api-monitoring.conf
```

Cron Format (.conf):
```
https://raw.githubusercontent.com/jc-hk-1916/NaviTerm/main/autotask-subscriptions/subscriptions/api-monitoring-simple.conf
```

## 📦 What's Included

This repository provides 13 example scripts demonstrating the complete capabilities of NaviTerm AutoTask:

### SSH Scripts (8 examples)

**🔍 Monitoring (5 scripts)**
- **Server Health Check** (`scripts/ssh/monitoring/server-health-check.js`)
  - Comprehensive CPU, memory, and disk monitoring
  - Configurable alert thresholds
  - Automatic notifications

- **Disk Space Alert** (`scripts/ssh/monitoring/disk-alert.js`)
  - Disk usage monitoring
  - Configurable threshold alerts
  - Multi-host support

- **Memory Monitor** (`scripts/ssh/monitoring/memory-monitor.js`)
  - Real-time memory usage monitoring
  - Configurable alert thresholds
  - Historical data tracking

- **Process Monitor** (`scripts/ssh/monitoring/process-monitor.js`)
  - Monitor critical process status
  - Automatic alerts when processes stop
  - Customizable process list

- **Historical Data Tracker** (`scripts/ssh/monitoring/historical-data-tracker.js`)
  - Track server metrics using persistent storage
  - Record load history data
  - Calculate statistics (average, max, min)
  - Automatic old data cleanup

**📊 System Information (1 script)**
- **System Information** (`scripts/ssh/system/system-info.js`)
  - Collect complete system information
  - OS, kernel, CPU, memory, etc.
  - Generate periodic system reports

**🌐 Network Check (2 scripts)**
- **Network Connectivity Check** (`scripts/ssh/network/connectivity-check.js`)
  - Ping test multiple targets
  - Automatic network failure alerts
  - Connection quality monitoring

- **SSH Connection Test** (`scripts/ssh/network/ssh-connection-test.js`)
  - Test all configured SSH host connections
  - Verify command execution capability
  - Automatic alerts for failed connections
  - Generate connection test reports

### HTTP Scripts (4 examples)

**📡 API Monitoring (2 scripts)**
- **API Health Check** (`scripts/http/api-monitoring/api-health-check.js`)
  - Monitor multiple API endpoints (using real working APIs)
  - JSONPlaceholder API (https://jsonplaceholder.typicode.com)
  - HTTPBin (https://httpbin.org)
  - GitHub API (https://api.github.com)
  - Example.com (https://example.com)
  - Response time measurement
  - Automatic failure detection and notifications

- **API Response Time Monitor** (`scripts/http/api-monitoring/response-time-monitor.js`)
  - Measure API response times
  - Response time trend analysis
  - Slow response automatic alerts
  - Historical data storage

**📥 Data Collection (1 script)**
- **Data Collector** (`scripts/http/data-collection/data-collector.js`)
  - Collect data from multiple APIs
  - Automatic data storage
  - Collection failure alerts
  - JSON data parsing support

**🔗 Third-party Integration (1 script)**
- **Webhook Integration** (`scripts/http/integrations/webhook-integration.js`)
  - Generic webhook integration
  - Supports Slack, Discord, DingTalk, etc.
  - Automatic status reports
  - Configurable message format

### Hybrid Scripts (1 example)

**🔄 SSH + HTTP Combined**
- **Server Status Report** (`scripts/hybrid/server-status-report.js`)
  - Collect server metrics via SSH
  - Report to monitoring platform via HTTP
  - Uses httpbin.org for testing
  - Configurable reporting endpoint

## ✅ Real Working APIs

All example scripts use real, publicly available APIs:

| API | Purpose | URL |
|-----|---------|-----|
| JSONPlaceholder | Free fake REST API | https://jsonplaceholder.typicode.com |
| HTTPBin | HTTP request testing | https://httpbin.org |
| GitHub API | Public API | https://api.github.com |
| Example.com | Test domain | https://example.com |

## 📖 Documentation

Complete documentation available in multiple languages:

| Language | Quick Start | API Reference |
|----------|-------------|---------------|
| 🇺🇸 English | [Quick Start](examples/QUICK-START.md) | [API Reference](examples/API-REFERENCE.md) |
| 🇨🇳 中文 | [快速开始](examples/QUICK-START-zh.md) | [API参考](examples/API-REFERENCE-zh.md) |

## 🤝 Contributing

We welcome community contributions! You can participate in the following ways:

- 📝 **Submit New Scripts** - Share your automation scripts
- 🔧 **Improve Existing Scripts** - Fix bugs or optimize features
- 🎨 **Add Icons** - Design better icons
- 🌐 **Translate Documentation** - Support more languages

### How to Contribute

1. Fork this repository
2. Create your feature branch: `git checkout -b feature/amazing-script`
3. Commit your changes: `git commit -m 'feat: add amazing script'`
4. Push to the branch: `git push origin feature/amazing-script`
5. Submit a Pull Request

**Detailed Guide:** [CONTRIBUTING.md](CONTRIBUTING.md)

### Script Quality Requirements

- ✅ Use real, working APIs (avoid example APIs)
- ✅ Include error handling and logging
- ✅ Provide detailed comments
- ✅ Follow existing code style
- ✅ Test scripts to ensure they work

### Issue Reporting

Found an issue? Please report it in GitHub Issues:

- 💬 Discussions: [GitHub Discussions](https://github.com/jc-hk-1916/NaviTerm/discussions)
- 🐛 Issues: [GitHub Issues](https://github.com/jc-hk-1916/NaviTerm/issues)

---

**Made with ❤️ by the NaviTerm Team**
