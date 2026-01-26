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
- [Quantumult X 兼容层](#quantumult-x-兼容层)
- [日志记录](#日志记录)
- [脚本控制](#脚本控制)
- [高级特性](#高级特性)

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

### `$httpClient.put(urlOrOptions, callback)`

发送 HTTP PUT 请求。与 POST 方法用法相同。

### `$httpClient.delete(urlOrOptions, callback)`

发送 HTTP DELETE 请求。与 GET 方法用法相同。

### `$httpClient.head(urlOrOptions, callback)`

发送 HTTP HEAD 请求。与 GET 方法用法相同。

### `$httpClient.patch(urlOrOptions, callback)`

发送 HTTP PATCH 请求。与 POST 方法用法相同。

---

### `$task.fetch(options)`

基于 Promise 的 HTTP 客户端（推荐使用）。

**🌟 特色功能：**
- ✅ 自动忽略 SSL 证书验证（适用于自签名证书）
- ✅ 智能请求策略：GET/HEAD 使用 downloadTask 绕过资源大小限制

**参数：**
- `url` (string)：请求 URL
- `method` (string)：请求方法（GET、POST、PUT、DELETE、PATCH、HEAD）
- `headers` (object)：请求头
- `body` (string)：请求体（仅 POST/PUT/PATCH）

**返回：**
Promise 对象，resolve 值包含：
- `status` (number)：HTTP 状态码
- `headers` (object)：响应头
- `body` (string)：响应体

**示例：**
```javascript
// GET 请求
$task.fetch({
    url: 'https://api.example.com/data',
    method: 'GET',
    headers: {
        'Accept': 'application/json'
    }
})
.then(response => {
    console.log('状态:', response.status);
    console.log('响应:', response.body);
})
.catch(error => {
    console.error('错误:', error.error);
});

// POST 请求
$task.fetch({
    url: 'https://api.example.com/data',
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({ key: 'value' })
})
.then(response => {
    console.log('提交成功:', response.body);
});
```

---

## 通知

### `$notification.post(title, subtitle, body, options)`

发送系统通知。

**参数：**
- `title` (string)：通知标题
- `subtitle` (string)：通知副标题
- `body` (string)：通知内容
- `options` (object)：可选配置
  - `url` 或 `open-url` (string)：点击通知后打开的 URL

**示例：**
```javascript
$notification.post(
    '服务器告警',
    'CPU 使用率过高',
    'CPU 使用率达到 95%',
    { url: 'https://monitoring.example.com' }
);
```

### `$notify(title, subtitle, body, options)`

`$notification.post()` 的简写形式，参数完全相同。

**示例：**
```javascript
$notify('任务完成', '数据处理', '已处理 100 条记录', { 'open-url': 'app://results' });
```

---

## 持久化存储

持久化存储用于永久保存数据，脚本重启后数据依然存在。

### `$persistentStore.write(value, key)`

永久保存数据。

**参数：**
- `value` (string)：要保存的值（通常使用 JSON 字符串）
- `key` (string)：存储键名

**返回：** boolean - 是否成功

**示例：**
```javascript
const data = JSON.stringify({ count: 42 });
$persistentStore.write(data, 'my-data');
```

### `$persistentStore.read(key)`

读取保存的数据。

**参数：**
- `key` (string)：存储键名

**返回：** string | null

**示例：**
```javascript
const data = $persistentStore.read('my-data');
if (data) {
    const obj = JSON.parse(data);
    console.log('计数:', obj.count);
}
```

### `$persistentStore.allKeys()`

获取所有存储的键名。

**返回：** Array<string>

**示例：**
```javascript
const keys = $persistentStore.allKeys();
console.log('所有键:', keys);
```

### `$persistentStore.remove(key)`

删除指定键的数据。

**参数：**
- `key` (string)：存储键名

**返回：** boolean - 是否成功

**示例：**
```javascript
$persistentStore.remove('my-data');
```

### `$persistentStore.clear()`

清空所有持久化数据。

**示例：**
```javascript
$persistentStore.clear();
console.log('已清空所有持久化数据');
```

---

## 运行时变量

🆕 **自定义扩展 API** - 仅在脚本执行期间存在的临时变量（内存级别，不持久化）。

### `$variables.set(key, value)`

设置运行时变量。

**参数：**
- `key` (string)：变量名
- `value` (string)：变量值

**返回：** boolean - 是否成功

**示例：**
```javascript
$variables.set('counter', '10');
```

### `$variables.get(key)`

获取运行时变量。

**参数：**
- `key` (string)：变量名

**返回：** string | null

**示例：**
```javascript
const counter = $variables.get('counter');
console.log('计数器:', counter);
```

### `$variables.allKeys()`

获取所有运行时变量的键名。

**返回：** Array<string>

**示例：**
```javascript
const keys = $variables.allKeys();
console.log('所有运行时变量:', keys);
```

### `$variables.remove(key)`

删除指定的运行时变量。

**参数：**
- `key` (string)：变量名

**返回：** boolean - 是否成功

**示例：**
```javascript
$variables.remove('counter');
```

### `$variables.clear()`

清空所有运行时变量。

**示例：**
```javascript
$variables.clear();
```

### `$variables.has(key)`

检查运行时变量是否存在。

**参数：**
- `key` (string)：变量名

**返回：** boolean

**示例：**
```javascript
if ($variables.has('counter')) {
    console.log('计数器存在');
}
```

---

**💡 使用场景：**
- 在同一个脚本的多个异步操作之间传递临时数据
- 避免持久化不必要的临时状态
- 脚本执行完成后自动清除，无需手动清理

---

## 环境变量

### `$env.get(key, defaultValue)`

获取环境变量（支持默认值）。

**参数：**
- `key` (string)：变量名
- `defaultValue` (string, 可选)：默认值

**返回：** string | null

**示例：**
```javascript
const apiKey = $env.get('API_KEY', 'default-key');
console.log('API Key:', apiKey);
```

### `$env.set(key, value)`

设置环境变量（持久化保存）。

**参数：**
- `key` (string)：变量名
- `value` (string)：变量值

**返回：** boolean - 是否成功

**示例：**
```javascript
$env.set('API_KEY', 'your-secret-key');
```

### `$env.remove(key)`

删除环境变量。

**参数：**
- `key` (string)：变量名

**返回：** boolean - 是否成功

**示例：**
```javascript
$env.remove('OLD_CONFIG');
```

### `$env.allKeys()` 🆕

获取所有环境变量的键名（扩展方法）。

**返回：** Array<string>

**示例：**
```javascript
const keys = $env.allKeys();
console.log('所有环境变量:', keys);
```

### `$env.all()` 🆕

获取所有环境变量的键值对（扩展方法）。

**返回：** object

**示例：**
```javascript
const allEnvVars = $env.all();
console.log('所有环境变量:', JSON.stringify(allEnvVars));
```

---

### `$prefs` - Quantumult X 兼容 API

`$prefs` 等同于 `$env`，使用 `autotask_env_` 前缀存储。数据会显示在变量管理页面的"环境变量"标签页。

**方法列表：**
- `$prefs.valueForKey(key)` - 等同于 `$env.get(key)`
- `$prefs.setValueForKey(value, key)` - 等同于 `$env.set(key, value)`
- `$prefs.removeValueForKey(key)` - 等同于 `$env.remove(key)`
- `$prefs.removeAllValues()` - 清空所有环境变量

**示例：**
```javascript
// 设置
$prefs.setValueForKey('my-value', 'MY_KEY');

// 获取
const value = $prefs.valueForKey('MY_KEY');
console.log('值:', value);

// 删除
$prefs.removeValueForKey('MY_KEY');
```

---

### `$environment`

只读的系统信息对象。

**属性：**
- `system` (string)：操作系统（"iOS" 或 "macOS"）
- `version` (string)：应用版本
- `language` (string)：系统语言
- `deviceName` (string)：设备名称

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

## Quantumult X 兼容层

NaviTerm 完整支持 Quantumult X 的 `Env` 框架,可直接运行 QX 脚本。

### `Env` 构造函数

创建 Quantumult X 风格的脚本环境。

**用法：**
```javascript
const $ = new Env('脚本名称');
```

**方法列表：**

#### `$.log(...args)`

输出日志信息。

**示例：**
```javascript
$.log('脚本启动');
$.log('数据:', { count: 42 });
```

#### `$.wait(ms)`

延迟等待（返回 Promise）。

**参数：**
- `ms` (number)：等待毫秒数

**示例：**
```javascript
await $.wait(1000);  // 等待 1 秒
```

#### `$.done(value)`

完成脚本执行。

**参数：**
- `value` (any, 可选)：返回值

**示例：**
```javascript
$.done({ success: true });
```

#### `$.getScript(url)` 🌟

下载远程脚本（带智能缓存）。

**参数：**
- `url` (string)：脚本 URL

**返回：** Promise<string>

**🌟 特色功能：**
- ✅ 自动缓存下载的脚本（基于文件名）
- ✅ 自动忽略 SSL 证书验证
- ✅ 支持自签名证书的 HTTPS 请求

**示例：**
```javascript
try {
    const script = await $.getScript('https://example.com/utils.js');
    eval(script);  // 执行下载的脚本
    $.log('脚本加载成功');
} catch (error) {
    $.log('脚本加载失败:', error);
}
```

#### `$.http.get/post/put/delete/head/patch(options, callback)`

HTTP 请求方法（支持 Promise 和回调两种方式）。

**参数：**
- `options` (string | object)：URL 字符串或配置对象
  - `url` (string)：请求 URL
  - `method` (string)：请求方法
  - `headers` (object)：请求头
  - `body` (string | object)：请求体（对象会自动转 JSON）
- `callback` (function, 可选)：回调函数

**返回：** Promise（resolve 值包含 error、status、statusCode、headers、body）

**🌟 特色功能：**
- ✅ body 支持对象自动转 JSON
- ✅ 自动设置 Content-Type
- ✅ 自动忽略 SSL 证书验证

**示例：**
```javascript
// 使用 Promise
const result = await $.http.get('https://api.example.com/data');
if (!result.error) {
    $.log('状态码:', result.status);
    $.log('响应:', result.body);
}

// 使用回调
$.http.post({
    url: 'https://api.example.com/data',
    body: { key: 'value' }  // 自动转 JSON
}, (error, response, body) => {
    if (!error) {
        $.log('提交成功:', body);
    }
});

// 简化写法（直接传 URL）
$.http.get('https://api.example.com/data', (error, response, body) => {
    $.log(body);
});
```

#### `$.notification.post(title, subtitle, body, options)`

发送系统通知。

**示例：**
```javascript
$.notification.post('任务完成', '数据处理', '已处理 100 条记录');
```

#### `$.read(key)` / `$.write(value, key)` / `$.del(key)`

持久化存储操作。

**示例：**
```javascript
// 写入
$.write(JSON.stringify({ count: 42 }), 'my-data');

// 读取
const data = $.read('my-data');
if (data) {
    const obj = JSON.parse(data);
    $.log('计数:', obj.count);
}

// 删除
$.del('my-data');
```

#### 环境判断方法

- `$.isNode()` - 返回 false
- `$.isSurge()` - 返回 false
- `$.isQuanX()` - 返回 true
- `$.isLoon()` - 返回 false

**示例：**
```javascript
if ($.isQuanX()) {
    $.log('运行在 Quantumult X 兼容模式');
}
```

---

### 完整的 QX 脚本示例

```javascript
const $ = new Env('健康检查');

(async () => {
    $.log('开始健康检查...');

    // 下载远程工具库（自动缓存）
    try {
        const utils = await $.getScript('https://example.com/utils.js');
        eval(utils);
    } catch (error) {
        $.log('工具库加载失败:', error);
    }

    // 执行 HTTP 请求
    const result = await $.http.get({
        url: 'https://api.example.com/health',
        headers: {
            'Authorization': 'Bearer token'
        }
    });

    if (!result.error && result.status === 200) {
        $.log('健康检查通过');

        // 保存结果
        $.write(result.body, 'last-health-check');

        // 发送通知
        $.notification.post('健康检查', '✅ 通过', '');
    } else {
        $.log('健康检查失败:', result.error);
        $.notification.post('健康检查', '❌ 失败', result.error || '');
    }

    // 完成脚本
    $.done();
})();
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

## 高级特性

### 🌟 SSL 证书自动忽略

NaviTerm 的所有 HTTP 请求（`$httpClient`、`$task.fetch`、`$.http`）都会**自动忽略 SSL 证书验证**,无需额外配置即可访问自签名证书的 HTTPS 服务。

**适用场景：**
- 内网测试环境的 HTTPS API
- 使用自签名证书的私有服务
- 开发环境的 HTTPS 接口

**示例：**
```javascript
// 直接访问自签名证书的 HTTPS 服务,无需额外配置
$task.fetch({
    url: 'https://self-signed.example.com/api',
    method: 'GET'
})
.then(response => {
    console.log('访问成功:', response.body);
});
```

---

### 🌟 智能请求策略

`$task.fetch` 根据请求方法自动选择最优策略：

**GET / HEAD 请求：**
- 使用 `downloadTask`
- 绕过系统资源大小限制
- 适合下载大文件或大响应体

**POST / PUT / DELETE / PATCH 请求：**
- 使用 `uploadTask`
- 完整支持请求体
- 适合提交数据

---

### 🌟 智能脚本缓存

`Env.getScript(url)` 自动缓存下载的远程脚本：

**缓存策略：**
- 基于 URL 的最后一部分（文件名）生成缓存键
- 首次下载后自动缓存到持久化存储
- 后续调用直接从缓存读取,无需重复下载

**示例：**
```javascript
const $ = new Env('我的脚本');

// 首次调用会下载并缓存
const cheerio = await $.getScript('https://cdn.jsdelivr.net/npm/cheerio@1.0.0-rc.12/dist/browser/cheerio.min.js');
// 缓存键: script_cache_cheerio.min.js

// 再次调用直接从缓存读取,瞬间返回
const cheerio2 = await $.getScript('https://cdn.jsdelivr.net/npm/cheerio@1.0.0-rc.12/dist/browser/cheerio.min.js');
```

**清除缓存：**
```javascript
// 手动删除缓存
$persistentStore.remove('script_cache_cheerio.min.js');
```

---

### 💡 运行时变量 vs 持久化存储

| 特性 | `$variables` | `$persistentStore` |
|------|--------------|-------------------|
| 存储位置 | 内存 | 磁盘 |
| 生命周期 | 仅当前脚本执行期间 | 永久保存 |
| 性能 | 极快 | 较慢（涉及 I/O） |
| 适用场景 | 临时状态、异步操作传递 | 配置、历史数据 |

**最佳实践：**
```javascript
// 使用运行时变量传递临时状态
$variables.set('request_count', '0');

hosts.forEach(host => {
    checkHost(host, (result) => {
        let count = parseInt($variables.get('request_count') || '0');
        count++;
        $variables.set('request_count', count.toString());

        if (count === hosts.length) {
            // 完成后保存到持久化存储
            $persistentStore.write(
                JSON.stringify({ lastCheck: $date.now(), total: count }),
                'check-history'
            );
            $done();
        }
    });
});
```

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

## 附录：API 完整对照表

### 标准 API（兼容 Surge / Quantumult X / Loon）

| API | 类型 | 说明 |
|-----|------|------|
| `$httpClient.get/post/put/delete/head/patch` | 标准 | HTTP 客户端（回调方式） |
| `$task.fetch` | 标准 + 增强 | HTTP 客户端（Promise,带 SSL 忽略和智能策略） |
| `$notification.post` | 标准 | 系统通知 |
| `$notify` | 标准 | 通知简写 |
| `$persistentStore.read/write` | 标准 | 持久化存储 |
| `$prefs.valueForKey/setValueForKey` | 标准 (QX) | 环境变量（QX 风格） |
| `$env.get/set/remove` | 标准 | 环境变量 |
| `$environment` | 标准 | 系统信息 |
| `Env` 构造函数 | 标准 (QX) + 增强 | Quantumult X 兼容层（带缓存优化） |
| `$done` | 标准 | 脚本完成 |
| `console.log/warn/error` | 标准 | 日志输出 |

### 扩展 API（NaviTerm 新增）

| API | 说明 | 优势 |
|-----|------|------|
| `$variables.*` | 运行时临时变量 | 内存级存储,性能更高 |
| `$date.*` | 日期格式化工具 | 无需手动处理时间格式 |
| `$env.allKeys()` | 获取所有环境变量键 | 便于遍历和管理 |
| `$env.all()` | 获取所有环境变量对象 | 批量访问环境变量 |
| `$persistentStore.allKeys()` | 获取所有存储键 | 便于遍历和管理 |
| `$persistentStore.remove()` | 删除指定键 | 精确删除单个数据 |
| `$persistentStore.clear()` | 清空所有数据 | 批量清理 |
| `$variables.has()` | 检查变量是否存在 | 避免 undefined 判断 |
| `$ssh.exec/getHosts` | SSH 操作 | 直接执行远程命令 |

### 增强特性（标准 API 的优化实现）

| 特性 | 说明 | 涉及 API |
|-----|------|---------|
| SSL 证书自动忽略 | 自动忽略证书验证,支持自签名证书 | `$task.fetch`, `$.http`, `$.getScript` |
| 智能请求策略 | GET/HEAD 用 downloadTask 绕过大小限制 | `$task.fetch` |
| 智能脚本缓存 | 自动缓存远程脚本,加速二次加载 | `$.getScript` |
| 自动 JSON 序列化 | HTTP body 支持对象自动转 JSON | `$.http.*` |

---

**祝您编码愉快！🚀**
