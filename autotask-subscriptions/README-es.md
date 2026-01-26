# Scripts de NaviTerm AutoTask

**[🇪🇸 Español](README-es.md) | [🇺🇸 English](README.md) | [🇨🇳 中文](README-zh.md) | [🇫🇷 Français](README-fr.md) | [🇩🇪 Deutsch](README-de.md) | [🇯🇵 日本語](README-ja.md) | [🇷🇺 Русский](README-ru.md)**

---

**Repositorio oficial de scripts de automatización para NaviTerm**

Una colección completa de scripts de automatización para monitoreo de servidores, verificación de salud de API y tareas de mantenimiento del sistema. Impulsado por el motor AutoTask de NaviTerm con soporte para flujos de trabajo SSH, HTTP e híbridos.

## 🚀 Inicio Rápido

### Suscríbete en 3 Pasos

1. Abre la aplicación **NaviTerm**
2. Navega a **AutoTask** → **Suscripciones**
3. Agrega una suscripción con una de las URLs a continuación

## 📋 Suscripciones Disponibles

### Suite de Monitoreo SSH
Monitorea tus servidores con verificaciones de salud completas.

**Formato de Configuración Estándar:**
```
https://raw.githubusercontent.com/jc-hk-1916/NaviTerm/main/autotask-subscriptions/subscriptions/ssh-monitoring.conf
```

**Formato Cron Simple:**
```
https://raw.githubusercontent.com/jc-hk-1916/NaviTerm/main/autotask-subscriptions/subscriptions/ssh-monitoring-simple.conf
```

**Formato Cron Extendido:**
```
https://raw.githubusercontent.com/jc-hk-1916/NaviTerm/main/autotask-subscriptions/subscriptions/ssh-monitoring-extended.conf
```

### Suite de Monitoreo de API
Monitorea tus APIs y servicios web.

**Formato de Configuración Estándar:**
```
https://raw.githubusercontent.com/jc-hk-1916/NaviTerm/main/autotask-subscriptions/subscriptions/api-monitoring.conf
```

**Formato Cron Simple:**
```
https://raw.githubusercontent.com/jc-hk-1916/NaviTerm/main/autotask-subscriptions/subscriptions/api-monitoring-simple.conf
```

### Suite Completa (Recomendado)
Todos los scripts en una suscripción (formato JSON).

```
https://raw.githubusercontent.com/jc-hk-1916/NaviTerm/main/autotask-subscriptions/subscriptions/complete-suite.json
```

## 📦 Qué Incluye

Este repositorio proporciona 13 scripts de ejemplo que demuestran las capacidades completas de NaviTerm AutoTask:

### Scripts SSH (8 ejemplos)

**🔍 Monitoreo (5 scripts)**
- **Verificación de Salud del Servidor** (`scripts/ssh/monitoring/server-health-check.js`)
  - Monitoreo completo de CPU, memoria y disco
  - Umbrales de alerta configurables
  - Notificaciones automáticas

- **Alerta de Espacio en Disco** (`scripts/ssh/monitoring/disk-alert.js`)
  - Monitoreo de uso de disco
  - Alertas de umbral configurables
  - Soporte multi-host

- **Monitor de Memoria** (`scripts/ssh/monitoring/memory-monitor.js`)
  - Monitoreo de uso de memoria en tiempo real
  - Umbrales de alerta configurables
  - Seguimiento de datos históricos

- **Monitor de Procesos** (`scripts/ssh/monitoring/process-monitor.js`)
  - Monitorear estado de procesos críticos
  - Alertas automáticas cuando los procesos se detienen
  - Lista de procesos personalizable

- **Rastreador de Datos Históricos** (`scripts/ssh/monitoring/historical-data-tracker.js`)
  - Rastrear métricas del servidor usando almacenamiento persistente
  - Registrar datos históricos de carga
  - Calcular estadísticas (promedio, máximo, mínimo)
  - Limpieza automática de datos antiguos

**📊 Información del Sistema (1 script)**
- **Información del Sistema** (`scripts/ssh/system/system-info.js`)
  - Recopilar información completa del sistema
  - SO, kernel, CPU, memoria, etc.
  - Generar informes periódicos del sistema

**🌐 Verificación de Red (2 scripts)**
- **Verificación de Conectividad de Red** (`scripts/ssh/network/connectivity-check.js`)
  - Prueba de ping a múltiples objetivos
  - Alertas automáticas de fallas de red
  - Monitoreo de calidad de conexión

- **Prueba de Conexión SSH** (`scripts/ssh/network/ssh-connection-test.js`)
  - Probar todas las conexiones de hosts SSH configurados
  - Verificar capacidad de ejecución de comandos
  - Alertas automáticas para conexiones fallidas
  - Generar informes de prueba de conexión

### Scripts HTTP (4 ejemplos)

**📡 Monitoreo de API (2 scripts)**
- **Verificación de Salud de API** (`scripts/http/api-monitoring/api-health-check.js`)
  - Monitorear múltiples endpoints de API (usando APIs reales)
  - API JSONPlaceholder (https://jsonplaceholder.typicode.com)
  - HTTPBin (https://httpbin.org)
  - API de GitHub (https://api.github.com)
  - Example.com (https://example.com)
  - Medición de tiempo de respuesta
  - Detección automática de fallas y notificaciones

- **Monitor de Tiempo de Respuesta de API** (`scripts/http/api-monitoring/response-time-monitor.js`)
  - Medir tiempos de respuesta de API
  - Análisis de tendencias de tiempo de respuesta
  - Alertas automáticas de respuesta lenta
  - Almacenamiento de datos históricos

**📥 Recopilación de Datos (1 script)**
- **Recopilador de Datos** (`scripts/http/data-collection/data-collector.js`)
  - Recopilar datos de múltiples APIs
  - Almacenamiento automático de datos
  - Alertas de fallas de recopilación
  - Soporte de análisis de datos JSON

**🔗 Integración de Terceros (1 script)**
- **Integración de Webhook** (`scripts/http/integrations/webhook-integration.js`)
  - Integración genérica de webhook
  - Soporta Slack, Discord, DingTalk, etc.
  - Informes de estado automáticos
  - Formato de mensaje configurable

### Scripts Híbridos (1 ejemplo)

**🔄 Combinación SSH + HTTP**
- **Informe de Estado del Servidor** (`scripts/hybrid/server-status-report.js`)
  - Recopilar métricas del servidor vía SSH
  - Informar a la plataforma de monitoreo vía HTTP
  - Usa httpbin.org para pruebas
  - Endpoint de informes configurable

## ✅ APIs Reales Funcionales

Todos los scripts de ejemplo usan APIs públicas reales:

| API | Propósito | URL |
|-----|-----------|-----|
| JSONPlaceholder | API REST falsa gratuita | https://jsonplaceholder.typicode.com |
| HTTPBin | Pruebas de solicitudes HTTP | https://httpbin.org |
| API de GitHub | API pública | https://api.github.com |
| Example.com | Dominio de prueba | https://example.com |

## 📖 Documentación

Documentación completa disponible en múltiples idiomas:

| Idioma | Inicio Rápido | Referencia API |
|--------|---------------|----------------|
| 🇺🇸 English | [Quick Start](examples/QUICK-START.md) | [API Reference](examples/API-REFERENCE.md) |
| 🇨🇳 中文 | [快速开始](examples/QUICK-START-zh.md) | [API参考](examples/API-REFERENCE-zh.md) |

## 🤝 Contribuir

¡Damos la bienvenida a las contribuciones de la comunidad! Puedes participar de las siguientes maneras:

- 📝 **Enviar Nuevos Scripts** - Comparte tus scripts de automatización
- 🔧 **Mejorar Scripts Existentes** - Corregir errores u optimizar funciones
- 🎨 **Agregar Iconos** - Diseñar mejores iconos
- 🌐 **Traducir Documentación** - Soportar más idiomas

### Cómo Contribuir

1. Haz fork de este repositorio
2. Crea tu rama de características: `git checkout -b feature/amazing-script`
3. Confirma tus cambios: `git commit -m 'feat: add amazing script'`
4. Empuja a la rama: `git push origin feature/amazing-script`
5. Envía un Pull Request

**Guía Detallada:** [CONTRIBUTING.md](CONTRIBUTING.md)

### Requisitos de Calidad de Scripts

- ✅ Usar APIs reales y funcionales (evitar APIs de ejemplo)
- ✅ Incluir manejo de errores y registro
- ✅ Proporcionar comentarios detallados
- ✅ Seguir el estilo de código existente
- ✅ Probar scripts para asegurar que funcionen

### Reporte de Problemas

¿Encontraste un problema? Por favor repórtalo en GitHub Issues:

- 💬 Discusiones: [GitHub Discussions](https://github.com/jc-hk-1916/NaviTerm/discussions)
- 🐛 Problemas: [GitHub Issues](https://github.com/jc-hk-1916/NaviTerm/issues)

---

**Hecho con ❤️ por el Equipo de NaviTerm**
