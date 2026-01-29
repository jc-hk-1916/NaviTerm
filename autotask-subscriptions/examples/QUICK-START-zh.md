# 快速开始指南

**[其他语言](README.md)** | 🇨🇳 中文

5分钟快速上手 NaviTerm AutoTask！

---

## 步骤 1：添加您的第一个订阅

### 选项 A：完整套件（推荐）

1. 打开 **NaviTerm** 应用
2. 导航到 **AutoTask** → **订阅管理**
3. 点击 **添加订阅**（+ 按钮）
4. 填写表单：
   - **名称**：`完整自动化套件`
   - **URL**：
     ```
     https://raw.githubusercontent.com/jc-hk-1916/NaviTerm/main/autotask-subscriptions/subscriptions/complete-suite.json
     ```
   - **自动更新**：`0 6 * * *`（每天早上6点）
5. 点击 **添加**

✅ 完成！订阅已添加，所有示例脚本现在可以使用了。

### 选项 B：SSH 监控套件

仅用于服务器监控：

- **名称**：`SSH 监控`
- **URL**：
  ```
  https://raw.githubusercontent.com/jc-hk-1916/NaviTerm/main/autotask-subscriptions/subscriptions/ssh-monitoring-simple.conf
  ```
- **自动更新**：`0 6 * * *`

### 选项 C：API 监控套件

用于 API 健康检查：

- **名称**：`API 监控`
- **URL**：
  ```
  https://raw.githubusercontent.com/jc-hk-1916/NaviTerm/main/autotask-subscriptions/subscriptions/api-monitoring-simple.conf
  ```
- **自动更新**：`0 6 * * *`

---

## 步骤 2：配置您的第一个脚本

### 示例：服务器健康检查

1. 进入 **AutoTask** → **脚本**
2. 找到 **Server Health Check**
3. 点击打开脚本编辑器
4. 修改顶部的阈值：
   ```javascript
   const CPU_THRESHOLD = 80;      // CPU > 80% 时告警
   const MEMORY_THRESHOLD = 85;   // 内存 > 85% 时告警
   const DISK_THRESHOLD = 90;     // 磁盘 > 90% 时告警
   ```
5. 点击 **保存**

### 示例：API 健康检查

1. 找到 **API Health Check** 脚本
2. 编辑端点列表：
   ```javascript
   const ENDPOINTS = [
       { name: '我的 API', url: 'https://api.mysite.com/health' },
       { name: '认证服务', url: 'https://auth.mysite.com/status' }
   ];
   ```
3. 保存脚本

---

## 步骤 3：测试您的脚本

### 手动测试

1. 打开脚本
2. 点击 **运行** 按钮（▶️）
3. 实时查看日志
4. 检查通知

### 查看执行历史

1. 进入 **AutoTask** → **日志**
2. 按脚本名称筛选
3. 查看执行结果和输出

---

## 步骤 4：启用自动执行

脚本会根据 cron 计划自动运行：

- **Server Health Check**：每 6 小时（`0 */6 * * *`）
- **Disk Space Alert**：每天早上 8 点（`0 8 * * *`）
- **API Health Check**：每 5 分钟（`*/5 * * * *`）

### 修改计划

1. 打开脚本
2. 在 **订阅** 标签中找到订阅
3. 编辑 cron 表达式
4. 保存

---

## 常用 Cron 表达式

| 表达式 | 含义 |
|--------|------|
| `*/5 * * * *` | 每 5 分钟 |
| `*/15 * * * *` | 每 15 分钟 |
| `0 * * * *` | 每小时 |
| `0 */6 * * *` | 每 6 小时 |
| `0 8 * * *` | 每天早上 8:00 |
| `0 0 * * *` | 每天午夜 |
| `0 0 * * 0` | 每周日 |
| `0 0 1 * *` | 每月 1 号 |

---

## 故障排除

### 脚本不运行？

1. 检查脚本是否 **已启用**（绿点）
2. 验证 cron 表达式是否有效
3. 检查 **日志** 中的错误消息
4. 确保已配置 SSH 主机（对于 SSH 脚本）

### 没有通知？

1. 进入 **设置** → **通知**
2. 启用 **AutoTask 通知**
3. 在 iOS/macOS 设置中授予通知权限

### SSH 连接失败？

1. 验证 SSH 主机配置
2. 在终端标签中手动测试 SSH 连接
3. 检查网络连接
4. 验证 SSH 凭据

### API 请求失败？

1. 检查 API URL 是否正确
2. 验证 API 可从您的设备访问
3. 检查 API 认证（如果需要）
4. 查看日志中的错误消息

---

## 下一步

### 探索更多脚本

浏览所有可用脚本：
- **监控**：服务器健康、磁盘、内存、进程
- **系统信息**：运行时间、用户、硬件
- **网络**：连接性、端口、SSL、DNS
- **API 监控**：健康检查、响应时间、webhooks
- **集成**：Slack、Discord、Telegram

### 自定义脚本

所有脚本都完全可自定义：
1. 打开脚本编辑器
2. 修改配置常量
3. 添加您自己的逻辑
4. 保存并测试

### 创建您自己的脚本

学习 API 并创建自定义脚本：
- 阅读 **[API 参考](API-REFERENCE-zh.md)**
- 研究现有脚本
- 在脚本编辑器中实验
- 与社区分享！

---

## 需要帮助？

- **文档**：[完整 API 参考](API-REFERENCE-zh.md)
- **GitHub**：https://github.com/jc-hk-1916/NaviTerm

---

## 快速参考卡

### 核心 URL

**完整套件：**
```
https://raw.githubusercontent.com/jc-hk-1916/NaviTerm/main/autotask-subscriptions/subscriptions/complete-suite.json
```

**SSH 监控：**
```
https://raw.githubusercontent.com/jc-hk-1916/NaviTerm/main/autotask-subscriptions/subscriptions/ssh-monitoring-simple.conf
```

**API 监控：**
```
https://raw.githubusercontent.com/jc-hk-1916/NaviTerm/main/autotask-subscriptions/subscriptions/api-monitoring-simple.conf
```

### 核心 API

```javascript
// SSH
$ssh.exec(hostId, command, callback)
$ssh.getHosts(callback)

// HTTP
$httpClient.get(url, callback)
$httpClient.post(options, callback)

// 通知
$notification.post(title, subtitle, body)

// 存储
$persistentStore.write(value, key)
$persistentStore.read(key)

// 完成
$done(result)
```

---

## 💬 加入社区

- 📢 [Telegram 频道](https://t.me/khgk180_na) - 获取最新更新、功能发布和重要公告
- 💬 [Telegram 讨论组](https://t.me/kkkhjo_ut357) - 与其他用户交流使用技巧、分享经验

---

**祝您自动化愉快！🚀**
