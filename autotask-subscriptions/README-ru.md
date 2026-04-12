# Скрипты NaviTerm AutoTask

**[🇷🇺 Русский](README-ru.md) | [🇺🇸 English](README.md) | [🇨🇳 中文](README-zh.md) | [🇪🇸 Español](README-es.md) | [🇫🇷 Français](README-fr.md) | [🇩🇪 Deutsch](README-de.md) | [🇯🇵 日本語](README-ja.md)**

---

**Официальный репозиторий скриптов автоматизации для NaviTerm**

Полная коллекция скриптов автоматизации для мониторинга серверов, проверки работоспособности API и задач обслуживания системы. Работает на движке AutoTask от NaviTerm с поддержкой SSH, HTTP и гибридных рабочих процессов.

## 🚀 Быстрый Старт

### Подписаться за 3 Шага

1. Откройте приложение **NaviTerm**
2. Перейдите в **AutoTask** → **Подписки**
3. Добавьте подписку с одним из URL ниже

## 💬 Присоединяйтесь к Нашему Сообществу

- 📢 [Telegram-канал](https://t.me/NavitermNews) - Получайте последние обновления, релизы функций и важные объявления
- 💬 [Telegram-группа для обсуждений](https://t.me/NaviTermCommunity) - Общайтесь с другими пользователями, делитесь советами и обменивайтесь опытом

## 📋 Доступные Подписки

### Набор SSH Мониторинга
Мониторьте свои серверы с комплексными проверками работоспособности.

**Стандартный Формат Конфигурации:**
```
https://raw.githubusercontent.com/jc-hk-1916/NaviTerm/main/autotask-subscriptions/subscriptions/ssh-monitoring.conf
```

**Простой Формат Cron:**
```
https://raw.githubusercontent.com/jc-hk-1916/NaviTerm/main/autotask-subscriptions/subscriptions/ssh-monitoring-simple.conf
```

**Расширенный Формат Cron:**
```
https://raw.githubusercontent.com/jc-hk-1916/NaviTerm/main/autotask-subscriptions/subscriptions/ssh-monitoring-extended.conf
```

### Набор API Мониторинга
Мониторьте ваши API и веб-сервисы.

**Стандартный Формат Конфигурации:**
```
https://raw.githubusercontent.com/jc-hk-1916/NaviTerm/main/autotask-subscriptions/subscriptions/api-monitoring.conf
```

**Простой Формат Cron:**
```
https://raw.githubusercontent.com/jc-hk-1916/NaviTerm/main/autotask-subscriptions/subscriptions/api-monitoring-simple.conf
```

### Полный Набор (Рекомендуется)
Все скрипты в одной подписке (формат JSON).

```
https://raw.githubusercontent.com/jc-hk-1916/NaviTerm/main/autotask-subscriptions/subscriptions/complete-suite.json
```

## 📦 Что Включено

Этот репозиторий предоставляет 13 примеров скриптов, демонстрирующих полные возможности NaviTerm AutoTask:

### SSH Скрипты (8 примеров)

**🔍 Мониторинг (5 скриптов)**
- **Проверка Работоспособности Сервера** (`scripts/ssh/monitoring/server-health-check.js`)
  - Комплексный мониторинг CPU, памяти и диска
  - Настраиваемые пороги оповещений
  - Автоматические уведомления

- **Оповещение о Дисковом Пространстве** (`scripts/ssh/monitoring/disk-alert.js`)
  - Мониторинг использования диска
  - Настраиваемые пороговые оповещения
  - Поддержка нескольких хостов

- **Монитор Памяти** (`scripts/ssh/monitoring/memory-monitor.js`)
  - Мониторинг использования памяти в реальном времени
  - Настраиваемые пороги оповещений
  - Отслеживание исторических данных

- **Монитор Процессов** (`scripts/ssh/monitoring/process-monitor.js`)
  - Мониторинг статуса критических процессов
  - Автоматические оповещения при остановке процессов
  - Настраиваемый список процессов

- **Трекер Исторических Данных** (`scripts/ssh/monitoring/historical-data-tracker.js`)
  - Отслеживание метрик сервера с использованием постоянного хранилища
  - Запись исторических данных о нагрузке
  - Расчет статистики (среднее, максимум, минимум)
  - Автоматическая очистка старых данных

**📊 Системная Информация (1 скрипт)**
- **Системная Информация** (`scripts/ssh/system/system-info.js`)
  - Сбор полной системной информации
  - ОС, ядро, CPU, память и т.д.
  - Генерация периодических системных отчетов

**🌐 Проверка Сети (2 скрипта)**
- **Проверка Сетевого Подключения** (`scripts/ssh/network/connectivity-check.js`)
  - Ping-тест нескольких целей
  - Автоматические оповещения о сбоях сети
  - Мониторинг качества соединения

- **Тест SSH Подключения** (`scripts/ssh/network/ssh-connection-test.js`)
  - Тестирование всех настроенных SSH-подключений к хостам
  - Проверка возможности выполнения команд
  - Автоматические оповещения о неудачных подключениях
  - Генерация отчетов о тестировании подключений

### HTTP Скрипты (4 примера)

**📡 API Мониторинг (2 скрипта)**
- **Проверка Работоспособности API** (`scripts/http/api-monitoring/api-health-check.js`)
  - Мониторинг нескольких конечных точек API (используя реальные работающие API)
  - JSONPlaceholder API (https://jsonplaceholder.typicode.com)
  - HTTPBin (https://httpbin.org)
  - GitHub API (https://api.github.com)
  - Example.com (https://example.com)
  - Измерение времени отклика
  - Автоматическое обнаружение сбоев и уведомления

- **Монитор Времени Отклика API** (`scripts/http/api-monitoring/response-time-monitor.js`)
  - Измерение времени отклика API
  - Анализ тенденций времени отклика
  - Автоматические оповещения о медленном отклике
  - Хранение исторических данных

**📥 Сбор Данных (1 скрипт)**
- **Сборщик Данных** (`scripts/http/data-collection/data-collector.js`)
  - Сбор данных из нескольких API
  - Автоматическое хранение данных
  - Оповещения о сбоях сбора
  - Поддержка анализа данных JSON

**🔗 Интеграция Третьих Сторон (1 скрипт)**
- **Интеграция Webhook** (`scripts/http/integrations/webhook-integration.js`)
  - Универсальная интеграция webhook
  - Поддерживает Slack, Discord, DingTalk и т.д.
  - Автоматические отчеты о статусе
  - Настраиваемый формат сообщений

### Гибридные Скрипты (1 пример)

**🔄 Комбинация SSH + HTTP**
- **Отчет о Статусе Сервера** (`scripts/hybrid/server-status-report.js`)
  - Сбор метрик сервера через SSH
  - Отчет на платформу мониторинга через HTTP
  - Использует httpbin.org для тестирования
  - Настраиваемая конечная точка отчетов

## ✅ Реальные Работающие API

Все примеры скриптов используют реальные, общедоступные API:

| API | Назначение | URL |
|-----|------------|-----|
| JSONPlaceholder | Бесплатный фейковый REST API | https://jsonplaceholder.typicode.com |
| HTTPBin | Тестирование HTTP-запросов | https://httpbin.org |
| GitHub API | Публичный API | https://api.github.com |
| Example.com | Тестовый домен | https://example.com |

## 📖 Документация

Полная документация доступна на нескольких языках:

| Язык | Быстрый Старт | Справочник API |
|------|---------------|----------------|
| 🇺🇸 English | [Quick Start](examples/QUICK-START.md) | [API Reference](examples/API-REFERENCE.md) |
| 🇨🇳 中文 | [快速开始](examples/QUICK-START-zh.md) | [API参考](examples/API-REFERENCE-zh.md) |

## 🤝 Внести Вклад

Мы приветствуем вклад сообщества! Вы можете участвовать следующими способами:

- 📝 **Отправить Новые Скрипты** - Поделитесь своими скриптами автоматизации
- 🔧 **Улучшить Существующие Скрипты** - Исправить ошибки или оптимизировать функции
- 🎨 **Добавить Иконки** - Разработать лучшие иконки
- 🌐 **Перевести Документацию** - Поддержать больше языков

### Как Внести Вклад

1. Форкните этот репозиторий
2. Создайте ветку функции: `git checkout -b feature/amazing-script`
3. Зафиксируйте изменения: `git commit -m 'feat: add amazing script'`
4. Отправьте в ветку: `git push origin feature/amazing-script`
5. Отправьте Pull Request

**Подробное Руководство:** [CONTRIBUTING.md](CONTRIBUTING.md)

### Требования к Качеству Скриптов

- ✅ Использовать реальные, работающие API (избегать примеров API)
- ✅ Включать обработку ошибок и логирование
- ✅ Предоставлять подробные комментарии
- ✅ Следовать существующему стилю кода
- ✅ Тестировать скрипты для обеспечения работоспособности

### Сообщение о Проблемах

Нашли проблему? Пожалуйста, сообщите об этом в GitHub Issues:

- 💬 Обсуждения: [GitHub Discussions](https://github.com/jc-hk-1916/NaviTerm/discussions)
- 🐛 Проблемы: [GitHub Issues](https://github.com/jc-hk-1916/NaviTerm/issues)

---

**Сделано с ❤️ командой NaviTerm**
