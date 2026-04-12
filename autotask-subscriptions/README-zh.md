# NaviTerm AutoTask 脚本

**[🇨🇳 中文](README-zh.md) | [🇺🇸 English](README.md) | [🇪🇸 Español](README-es.md) | [🇫🇷 Français](README-fr.md) | [🇩🇪 Deutsch](README-de.md) | [🇯🇵 日本語](README-ja.md) | [🇷🇺 Русский](README-ru.md)**

---

**NaviTerm 官方自动化脚本仓库**

一个全面的自动化脚本集合，用于服务器监控、API 健康检查和系统维护任务。由 NaviTerm 的 AutoTask 引擎驱动，支持 SSH、HTTP 和混合工作流。

## 🚀 快速开始

### 三步订阅

1. 打开 **NaviTerm** 应用
2. 导航到 **AutoTask** → **订阅管理**
3. 使用下面的 URL 添加订阅

## 💬 加入社区

- 📢 [Telegram 频道](https://t.me/NavitermNews) - 获取最新更新、功能发布和重要公告
- 💬 [Telegram 讨论组](https://t.me/NaviTermCommunity) - 与其他用户交流使用技巧、分享经验

## 📋 可用订阅

### 完整套件（推荐）
使用 NaviTerm 原生 JSON 格式的完整脚本集合。

**JSON 格式 (.json) - NaviTerm 标准格式：**
```
https://raw.githubusercontent.com/jc-hk-1916/NaviTerm/main/autotask-subscriptions/subscriptions/complete-suite.json
```

### SSH 监控套件
使用全面的健康检查监控您的服务器。

**兼容格式：**

Config 格式 (.conf)：
```
https://raw.githubusercontent.com/jc-hk-1916/NaviTerm/main/autotask-subscriptions/subscriptions/ssh-monitoring.conf
```

Cron 格式 (.conf)：
```
https://raw.githubusercontent.com/jc-hk-1916/NaviTerm/main/autotask-subscriptions/subscriptions/ssh-monitoring-simple.conf
```

Cron+ 格式 (.conf)：
```
https://raw.githubusercontent.com/jc-hk-1916/NaviTerm/main/autotask-subscriptions/subscriptions/ssh-monitoring-extended.conf
```

### API 监控套件
监控您的 API 和 Web 服务。

**兼容格式：**

Config 格式 (.conf)：
```
https://raw.githubusercontent.com/jc-hk-1916/NaviTerm/main/autotask-subscriptions/subscriptions/api-monitoring.conf
```

Cron 格式 (.conf)：
```
https://raw.githubusercontent.com/jc-hk-1916/NaviTerm/main/autotask-subscriptions/subscriptions/api-monitoring-simple.conf
```

## 📦 包含内容

本仓库提供了13个示例脚本,展示了NaviTerm AutoTask的完整功能:

### SSH 脚本 (8个示例)

**🔍 监控类 (5个)**
- **服务器健康检查** (`scripts/ssh/monitoring/server-health-check.js`)
  - 全面的 CPU、内存和磁盘监控
  - 可配置的告警阈值
  - 自动通知功能

- **磁盘空间告警** (`scripts/ssh/monitoring/disk-alert.js`)
  - 磁盘使用率监控
  - 可配置阈值的告警
  - 支持多主机监控

- **内存监控** (`scripts/ssh/monitoring/memory-monitor.js`)
  - 实时内存使用率监控
  - 可配置告警阈值
  - 历史数据记录

- **进程监控** (`scripts/ssh/monitoring/process-monitor.js`)
  - 监控关键进程状态
  - 进程停止自动告警
  - 支持自定义进程列表

- **历史数据追踪** (`scripts/ssh/monitoring/historical-data-tracker.js`)
  - 使用持久化存储追踪服务器指标
  - 记录负载历史数据
  - 计算统计信息（平均值、最大值、最小值）
  - 自动清理旧数据

**📊 系统信息 (1个)**
- **系统信息收集** (`scripts/ssh/system/system-info.js`)
  - 收集完整系统信息
  - OS、内核、CPU、内存等
  - 定期生成系统报告

**🌐 网络检查 (2个)**
- **网络连接性检查** (`scripts/ssh/network/connectivity-check.js`)
  - Ping测试多个目标
  - 网络故障自动告警
  - 连接质量监控

- **SSH连接测试** (`scripts/ssh/network/ssh-connection-test.js`)
  - 测试所有配置的SSH主机连接
  - 验证命令执行能力
  - 自动告警连接失败的主机
  - 生成连接测试报告

### HTTP 脚本 (4个示例)

**📡 API 监控类 (2个)**
- **API 健康检查** (`scripts/http/api-monitoring/api-health-check.js`)
  - 监控多个 API 端点(使用真实可用的 API)
  - JSONPlaceholder API (https://jsonplaceholder.typicode.com)
  - HTTPBin (https://httpbin.org)
  - GitHub API (https://api.github.com)
  - Example.com (https://example.com)
  - 响应时间测量
  - 自动故障检测和通知

- **API 响应时间监控** (`scripts/http/api-monitoring/response-time-monitor.js`)
  - 测量API响应时间
  - 响应时间趋势分析
  - 慢响应自动告警
  - 历史数据存储

**📥 数据收集 (1个)**
- **数据收集器** (`scripts/http/data-collection/data-collector.js`)
  - 从多个API收集数据
  - 自动数据存储
  - 收集失败告警
  - 支持JSON数据解析

**🔗 第三方集成 (1个)**
- **Webhook集成** (`scripts/http/integrations/webhook-integration.js`)
  - 通用Webhook集成
  - 支持Slack、Discord、钉钉等
  - 自动状态报告
  - 可配置消息格式

### 混合脚本 (1个示例)

**🔄 SSH + HTTP 组合**
- **服务器状态报告** (`scripts/hybrid/server-status-report.js`)
  - 通过 SSH 收集服务器指标
  - 通过 HTTP 报告到监控平台
  - 使用 httpbin.org 进行测试
  - 可配置的报告端点

## ✅ 真实可用的 API

所有示例脚本都使用真实可用的公共 API：

| API | 用途 | URL |
|-----|------|-----|
| JSONPlaceholder | 免费的假 REST API | https://jsonplaceholder.typicode.com |
| HTTPBin | HTTP 请求测试服务 | https://httpbin.org |
| GitHub API | 公共 API | https://api.github.com |
| Example.com | 测试域名 | https://example.com |

## 📖 文档

完整文档提供多种语言版本：

| 语言 | 快速开始 | API参考 |
|------|---------|---------|
| 🇨🇳 中文 | [快速开始](examples/QUICK-START-zh.md) | [API参考](examples/API-REFERENCE-zh.md) |
| 🇺🇸 English | [Quick Start](examples/QUICK-START.md) | [API Reference](examples/API-REFERENCE.md) |

## 🤝 参与贡献

我们欢迎社区贡献！您可以通过以下方式参与：

- 📝 **提交新脚本** - 分享您的自动化脚本
- 🔧 **改进现有脚本** - 修复 bug 或优化功能
- 🎨 **添加图标** - 设计更好的图标
- 🌐 **翻译文档** - 支持更多语言

### 贡献步骤

1. Fork 本仓库
2. 创建您的功能分支：`git checkout -b feature/amazing-script`
3. 提交更改：`git commit -m 'feat: add amazing script'`
4. 推送到分支：`git push origin feature/amazing-script`
5. 提交 Pull Request

**详细指南：** [CONTRIBUTING.md](CONTRIBUTING.md)

### 脚本质量要求

- ✅ 使用真实可用的 API（避免示例 API）
- ✅ 包含错误处理和日志输出
- ✅ 提供详细的注释
- ✅ 遵循现有代码风格
- ✅ 测试脚本确保正常运行

### 问题反馈

发现问题？请在 GitHub Issues 中报告：

- 💬 讨论：[GitHub Discussions](https://github.com/jc-hk-1916/NaviTerm/discussions)
- 🐛 问题：[GitHub Issues](https://github.com/jc-hk-1916/NaviTerm/issues)

---

**Made with ❤️ by the NaviTerm Team**
