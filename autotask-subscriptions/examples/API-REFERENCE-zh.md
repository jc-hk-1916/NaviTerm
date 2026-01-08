# NaviTerm AutoTask API 参考

**[其他语言](README.md)** | 🇨🇳 中文

NaviTerm AutoTask 中所有可用 JavaScript API 的完整参考。

---

## 目录

- [SSH 操作](#ssh-操作)
- [HTTP 客户端](#http-客户端)
- [通知](#通知)
- [持久化存储](#持久化存储)
- [运行时变量](#运行时变量)
- [环境变量](#环境变量)
- [日期工具](#日期工具)
- [日志记录](#日志记录)
- [脚本控制](#脚本控制)

---

## SSH 操作

### `$ssh.exec(hostId, command, callback)`

在远程主机上执行 SSH 命令。

**参数：**
- `hostId` (string)：配置的主机 ID
- `command` (string)：要执行的 Shell 命令
- `callback` (function)：带结果的回调函数

**回调签名：**
```javascript
(result) => {
    // result.success (boolean)：命令执行状态
    // result.output (string)：命令输出
    // result.exitCode (number)：退出代码
    // result.error (string)：错误消息（如果失败）
}
```

**示例：**
```javascript
$ssh.exec('host-123', 'uptime', (result) => {
    if (result.success) {
        console.log('运行时间:', result.output);
    } else {
        console.error('错误:', result.error);
    }
});
```

### `$ssh.getHosts(callback)`

获取所有配置的 SSH 主机。

**示例：**
```javascript
$ssh.getHosts((hosts) => {
    console.log(`找到 ${hosts.length} 个主机`);
    hosts.forEach(host => {
        console.log(`- ${host.name} (${host.host})`);
    });
});
```

---

## HTTP 客户端

### `$httpClient.get(urlOrOptions, callback)`

发送 HTTP GET 请求。

**示例：**
```javascript
$httpClient.get('https://api.example.com/data', (error, response, body) => {
    if (error) {
        console.error('请求失败:', error);
        return;
    }
    console.log('状态:', response.status);
    console.log('响应:', body);
});
```

### `$httpClient.post(urlOrOptions, callback)`

发送 HTTP POST 请求。

**示例：**
```javascript
$httpClient.post({
    url: 'https://api.example.com/data',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({ key: 'value' })
}, (error, response, body) => {
    if (!error && response.status === 200) {
        console.log('成功:', body);
    }
});
```

### `$task.fetch(options)`

基于 Promise 的 HTTP 客户端。

**示例：**
```javascript
$task.fetch({
    url: 'https://api.example.com/data',
    method: 'GET'
})
.then(response => {
    console.log('状态:', response.status);
    console.log('响应:', response.body);
})
.catch(error => {
    console.error('错误:', error.error);
});
```

---

## 通知

### `$notification.post(title, subtitle, body, options)`

发送系统通知。

**示例：**
```javascript
$notification.post(
    '服务器告警',
    'CPU 使用率过高',
    'CPU 使用率达到 95%',
    { url: 'https://monitoring.example.com' }
);
```

---

## 持久化存储

### `$persistentStore.write(value, key)`

永久保存数据。

**示例：**
```javascript
const data = JSON.stringify({ count: 42 });
$persistentStore.write(data, 'my-data');
```

### `$persistentStore.read(key)`

读取保存的数据。

**示例：**
```javascript
const data = $persistentStore.read('my-data');
if (data) {
    const obj = JSON.parse(data);
    console.log('计数:', obj.count);
}
```

---

## 运行时变量

仅在脚本执行期间存在的临时变量。

### `$variables.set(key, value)`

设置运行时变量。

**示例：**
```javascript
$variables.set('counter', '10');
```

### `$variables.get(key)`

获取运行时变量。

**示例：**
```javascript
const counter = $variables.get('counter');
console.log('计数器:', counter);
```

---

## 环境变量

### `$env.get(key, defaultValue)`

获取环境变量。

**示例：**
```javascript
const apiKey = $env.get('API_KEY', 'default-key');
```

### `$environment`

只读的系统信息对象。

**示例：**
```javascript
console.log('系统:', $environment.system);      // "iOS" 或 "macOS"
console.log('版本:', $environment.version);     // 应用版本
console.log('语言:', $environment.language);    // 系统语言
console.log('设备:', $environment.deviceName);  // 设备名称
```

---

## 日期工具

### `$date.now()`

获取当前日期/时间（带毫秒）。

**示例：**
```javascript
const now = $date.now();
console.log('现在:', now);  // "2024-01-15 14:30:45.123"
```

### `$date.nowSimple()`

获取当前日期/时间（不带毫秒）。

**示例：**
```javascript
const now = $date.nowSimple();
console.log('现在:', now);  // "2024-01-15 14:30:45"
```

### `$date.format(formatString)`

使用自定义格式格式化��前日期/时间。

**示例：**
```javascript
const date = $date.format('yyyy-MM-dd');
console.log('日期:', date);  // "2024-01-15"
```

### `$date.timestamp()`

获取当前时间戳（毫秒）。

**示例：**
```javascript
const ts = $date.timestamp();
console.log('时间戳:', ts);  // 1705329045123
```

---

## 日志记录

### `console.log(message)`

记录普通消息。

**示例：**
```javascript
console.log('[信息] 脚本已启动');
```

### `console.warn(message)`

记录警告消息。

**示例：**
```javascript
console.warn('[警告] 检测到高 CPU 使用率');
```

### `console.error(message)`

记录错误消息。

**示例：**
```javascript
console.error('[错误] 连接失败');
```

---

## 脚本控制

### `$done(result)`

完成脚本执行并返回结果。

**示例：**
```javascript
$done(JSON.stringify({
    success: true,
    data: { count: 42 }
}));
```

**重要提示：** 始终在脚本末尾调用 `$done()`，特别是对于异步操作。

---

## 最佳实践

### 1. 错误处理

始终在回调中处理错误：

```javascript
$ssh.exec(hostId, command, (result) => {
    if (!result.success) {
        console.error('命令失败:', result.error);
        $notification.post('错误', result.error, '');
        $done(JSON.stringify({ error: result.error }));
        return;
    }
    // 处理成功情况
});
```

### 2. 异步操作

跟踪异步操作以确保正确调用 `$done()`：

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

### 3. 日志记录

使用带前缀的结构化日志：

```javascript
console.log('[健康检查] 正在启动...');
console.warn('[健康检查] 高 CPU: 95%');
console.error('[健康检查] 连接失败');
```

---

## 完整示例

### SSH 脚本示例

```javascript
console.log('[磁盘检查] 正在启动...');

$ssh.getHosts((hosts) => {
    if (hosts.length === 0) {
        console.error('[磁盘检查] 未配置主机');
        $done(JSON.stringify({ error: '未找到主机' }));
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
                        '磁盘告警',
                        host.name,
                        `磁盘使用率: ${usage}%`
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

### HTTP 脚本示例

```javascript
console.log('[API 检查] 正在启动...');

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
                    'API 告警',
                    `${unhealthy.length} 个端点故障`,
                    ''
                );
            }
            $done(JSON.stringify({ results }));
        }
    });
});
```

---

## 需要帮助？

- **快速开始**：[QUICK-START-zh.md](QUICK-START-zh.md)
- **GitHub**：https://github.com/jc-hk-1916/NaviTerm

---

**祝您编码愉快！🚀**
