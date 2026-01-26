# NaviTerm AutoTask API Reference

Complete reference for all available JavaScript APIs in NaviTerm AutoTask.

---

## Table of Contents

- [SSH Operations](#ssh-operations)
- [HTTP Client](#http-client)
- [Notifications](#notifications)
- [Persistent Storage](#persistent-storage)
- [Runtime Variables](#runtime-variables)
- [Environment Variables](#environment-variables)
- [Date Utilities](#date-utilities)
- [Quantumult X Compatibility Layer](#quantumult-x-compatibility-layer)
- [Logging](#logging)
- [Script Control](#script-control)
- [Advanced Features](#advanced-features)

---

## SSH Operations

### `$ssh.exec(hostId, command, callback)`

Execute SSH command on a remote host.

**Parameters:**
- `hostId` (string): Host ID from configured hosts
- `command` (string): Shell command to execute
- `callback` (function): Callback function with result

**Callback signature:**
```javascript
(result) => {
    // result.success (boolean): Command execution status
    // result.output (string): Command output
    // result.exitCode (number): Exit code
    // result.error (string): Error message (if failed)
}
```

**Example:**
```javascript
$ssh.exec('host-123', 'uptime', (result) => {
    if (result.success) {
        console.log('Uptime:', result.output);
    } else {
        console.error('Error:', result.error);
    }
});
```

### `$ssh.getHosts(callback)`

Get all configured SSH hosts.

**Example:**
```javascript
$ssh.getHosts((hosts) => {
    console.log(`Found ${hosts.length} hosts`);
    hosts.forEach(host => {
        console.log(`- ${host.name} (${host.host})`);
    });
});
```

---

## HTTP Client

### `$httpClient.get(urlOrOptions, callback)`

Send HTTP GET request.

**Example:**
```javascript
$httpClient.get('https://api.example.com/data', (error, response, body) => {
    if (error) {
        console.error('Request failed:', error);
        return;
    }
    console.log('Status:', response.status);
    console.log('Response:', body);
});
```

### `$httpClient.post(urlOrOptions, callback)`

Send HTTP POST request.

**Example:**
```javascript
$httpClient.post({
    url: 'https://api.example.com/data',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({ key: 'value' })
}, (error, response, body) => {
    if (!error && response.status === 200) {
        console.log('Success:', body);
    }
});
```

### `$httpClient.put(urlOrOptions, callback)`

Send HTTP PUT request. Same usage as POST.

### `$httpClient.delete(urlOrOptions, callback)`

Send HTTP DELETE request. Same usage as GET.

### `$httpClient.head(urlOrOptions, callback)`

Send HTTP HEAD request. Same usage as GET.

### `$httpClient.patch(urlOrOptions, callback)`

Send HTTP PATCH request. Same usage as POST.

---

### `$task.fetch(options)`

Promise-based HTTP client (recommended).

**🌟 Features:**
- ✅ Automatically ignores SSL certificate validation (for self-signed certificates)
- ✅ Smart request strategy: GET/HEAD uses downloadTask to bypass resource size limits

**Parameters:**
- `url` (string): Request URL
- `method` (string): Request method (GET, POST, PUT, DELETE, PATCH, HEAD)
- `headers` (object): Request headers
- `body` (string): Request body (POST/PUT/PATCH only)

**Returns:**
Promise object, resolve value includes:
- `status` (number): HTTP status code
- `headers` (object): Response headers
- `body` (string): Response body

**Examples:**
```javascript
// GET request
$task.fetch({
    url: 'https://api.example.com/data',
    method: 'GET',
    headers: {
        'Accept': 'application/json'
    }
})
.then(response => {
    console.log('Status:', response.status);
    console.log('Response:', response.body);
})
.catch(error => {
    console.error('Error:', error.error);
});

// POST request
$task.fetch({
    url: 'https://api.example.com/data',
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({ key: 'value' })
})
.then(response => {
    console.log('Submitted successfully:', response.body);
});
```

---

## Notifications

### `$notification.post(title, subtitle, body, options)`

Send system notification.

**Parameters:**
- `title` (string): Notification title
- `subtitle` (string): Notification subtitle
- `body` (string): Notification content
- `options` (object): Optional configuration
  - `url` or `open-url` (string): URL to open when notification is clicked

**Example:**
```javascript
$notification.post(
    'Server Alert',
    'High CPU Usage',
    'CPU usage reached 95%',
    { url: 'https://monitoring.example.com' }
);
```

### `$notify(title, subtitle, body, options)`

Shorthand for `$notification.post()`, same parameters.

**Example:**
```javascript
$notify('Task Complete', 'Data Processing', 'Processed 100 records', { 'open-url': 'app://results' });
```

---

## Persistent Storage

Persistent storage saves data permanently, surviving script restarts.

### `$persistentStore.write(value, key)`

Save data permanently.

**Parameters:**
- `value` (string): Value to save (typically JSON string)
- `key` (string): Storage key

**Returns:** boolean - Success status

**Example:**
```javascript
const data = JSON.stringify({ count: 42 });
$persistentStore.write(data, 'my-data');
```

### `$persistentStore.read(key)`

Read saved data.

**Parameters:**
- `key` (string): Storage key

**Returns:** string | null

**Example:**
```javascript
const data = $persistentStore.read('my-data');
if (data) {
    const obj = JSON.parse(data);
    console.log('Count:', obj.count);
}
```

### `$persistentStore.allKeys()`

Get all storage keys.

**Returns:** Array<string>

**Example:**
```javascript
const keys = $persistentStore.allKeys();
console.log('All keys:', keys);
```

### `$persistentStore.remove(key)`

Delete data for a specific key.

**Parameters:**
- `key` (string): Storage key

**Returns:** boolean - Success status

**Example:**
```javascript
$persistentStore.remove('my-data');
```

### `$persistentStore.clear()`

Clear all persistent data.

**Example:**
```javascript
$persistentStore.clear();
console.log('All persistent data cleared');
```

---

## Runtime Variables

🆕 **Custom Extension API** - Temporary variables that exist only during script execution (memory-level, not persisted).

### `$variables.set(key, value)`

Set a runtime variable.

**Parameters:**
- `key` (string): Variable name
- `value` (string): Variable value

**Returns:** boolean - Success status

**Example:**
```javascript
$variables.set('counter', '10');
```

### `$variables.get(key)`

Get a runtime variable.

**Parameters:**
- `key` (string): Variable name

**Returns:** string | null

**Example:**
```javascript
const counter = $variables.get('counter');
console.log('Counter:', counter);
```

### `$variables.allKeys()`

Get all runtime variable keys.

**Returns:** Array<string>

**Example:**
```javascript
const keys = $variables.allKeys();
console.log('All runtime variables:', keys);
```

### `$variables.remove(key)`

Delete a specific runtime variable.

**Parameters:**
- `key` (string): Variable name

**Returns:** boolean - Success status

**Example:**
```javascript
$variables.remove('counter');
```

### `$variables.clear()`

Clear all runtime variables.

**Example:**
```javascript
$variables.clear();
```

### `$variables.has(key)`

Check if a runtime variable exists.

**Parameters:**
- `key` (string): Variable name

**Returns:** boolean

**Example:**
```javascript
if ($variables.has('counter')) {
    console.log('Counter exists');
}
```

---

**💡 Use Cases:**
- Pass temporary data between multiple async operations in the same script
- Avoid persisting unnecessary temporary state
- Automatically cleared after script execution, no manual cleanup needed

---

## Environment Variables

### `$env.get(key, defaultValue)`

Get environment variable (supports default value).

**Parameters:**
- `key` (string): Variable name
- `defaultValue` (string, optional): Default value

**Returns:** string | null

**Example:**
```javascript
const apiKey = $env.get('API_KEY', 'default-key');
console.log('API Key:', apiKey);
```

### `$env.set(key, value)`

Set environment variable (persisted).

**Parameters:**
- `key` (string): Variable name
- `value` (string): Variable value

**Returns:** boolean - Success status

**Example:**
```javascript
$env.set('API_KEY', 'your-secret-key');
```

### `$env.remove(key)`

Delete environment variable.

**Parameters:**
- `key` (string): Variable name

**Returns:** boolean - Success status

**Example:**
```javascript
$env.remove('OLD_CONFIG');
```

### `$env.allKeys()` 🆕

Get all environment variable keys (extension method).

**Returns:** Array<string>

**Example:**
```javascript
const keys = $env.allKeys();
console.log('All environment variables:', keys);
```

### `$env.all()` 🆕

Get all environment variables as key-value pairs (extension method).

**Returns:** object

**Example:**
```javascript
const allEnvVars = $env.all();
console.log('All environment variables:', JSON.stringify(allEnvVars));
```

---

### `$prefs` - Quantumult X Compatible API

`$prefs` is equivalent to `$env`, stored with `autotask_env_` prefix. Data appears in the "Environment Variables" tab of the variables management page.

**Methods:**
- `$prefs.valueForKey(key)` - Equivalent to `$env.get(key)`
- `$prefs.setValueForKey(value, key)` - Equivalent to `$env.set(key, value)`
- `$prefs.removeValueForKey(key)` - Equivalent to `$env.remove(key)`
- `$prefs.removeAllValues()` - Clear all environment variables

**Example:**
```javascript
// Set
$prefs.setValueForKey('my-value', 'MY_KEY');

// Get
const value = $prefs.valueForKey('MY_KEY');
console.log('Value:', value);

// Delete
$prefs.removeValueForKey('MY_KEY');
```

---

### `$environment`

Read-only system information object.

**Properties:**
- `system` (string): Operating system ("iOS" or "macOS")
- `version` (string): App version
- `language` (string): System language
- `deviceName` (string): Device name

**Example:**
```javascript
console.log('System:', $environment.system);      // "iOS" or "macOS"
console.log('Version:', $environment.version);     // App version
console.log('Language:', $environment.language);   // System language
console.log('Device:', $environment.deviceName);   // Device name
```

---

## Date Utilities

🆕 **Custom Extension API** - Convenient date formatting utilities.

### `$date.now()`

Get current date/time (with milliseconds).

**Returns:** string - Format: "YYYY-MM-DD HH:mm:ss.SSS"

**Example:**
```javascript
const now = $date.now();
console.log('Now:', now);  // "2024-01-15 14:30:45.123"
```

### `$date.nowSimple()`

Get current date/time (without milliseconds).

**Returns:** string - Format: "YYYY-MM-DD HH:mm:ss"

**Example:**
```javascript
const now = $date.nowSimple();
console.log('Now:', now);  // "2024-01-15 14:30:45"
```

### `$date.format(formatString)`

Format current date/time with custom format.

**Parameters:**
- `formatString` (string, optional): Date format string (default: "yyyy-MM-dd HH:mm:ss")

**Returns:** string

**Supported format symbols:**
- `yyyy` - 4-digit year
- `MM` - Month (01-12)
- `dd` - Day (01-31)
- `HH` - Hour (00-23)
- `mm` - Minute (00-59)
- `ss` - Second (00-59)
- `SSS` - Millisecond (000-999)

**Examples:**
```javascript
const date = $date.format('yyyy-MM-dd');
console.log('Date:', date);  // "2024-01-15"

const time = $date.format('HH:mm:ss');
console.log('Time:', time);  // "14:30:45"

const custom = $date.format('yyyy/MM/dd HH:mm');
console.log('Custom:', custom);  // "2024/01/15 14:30"
```

### `$date.timestamp()`

Get current timestamp (milliseconds).

**Returns:** number - Unix timestamp (milliseconds)

**Example:**
```javascript
const ts = $date.timestamp();
console.log('Timestamp:', ts);  // 1705329045123

// Calculate execution time
const startTime = $date.timestamp();
// ... perform operations
const endTime = $date.timestamp();
console.log('Duration:', endTime - startTime, 'ms');
```

---

## Quantumult X Compatibility Layer

NaviTerm fully supports Quantumult X's `Env` framework, allowing QX scripts to run directly.

### `Env` Constructor

Create Quantumult X-style script environment.

**Usage:**
```javascript
const $ = new Env('Script Name');
```

**Available methods:**

#### `$.log(...args)`

Output log information.

**Example:**
```javascript
$.log('Script started');
$.log('Data:', { count: 42 });
```

#### `$.wait(ms)`

Delay wait (returns Promise).

**Parameters:**
- `ms` (number): Milliseconds to wait

**Example:**
```javascript
await $.wait(1000);  // Wait 1 second
```

#### `$.done(value)`

Complete script execution.

**Parameters:**
- `value` (any, optional): Return value

**Example:**
```javascript
$.done({ success: true });
```

#### `$.getScript(url)` 🌟

Download remote script (with smart caching).

**Parameters:**
- `url` (string): Script URL

**Returns:** Promise<string>

**🌟 Features:**
- ✅ Automatically caches downloaded scripts (based on filename)
- ✅ Automatically ignores SSL certificate validation
- ✅ Supports HTTPS requests with self-signed certificates

**Example:**
```javascript
try {
    const script = await $.getScript('https://example.com/utils.js');
    eval(script);  // Execute downloaded script
    $.log('Script loaded successfully');
} catch (error) {
    $.log('Script loading failed:', error);
}
```

#### `$.http.get/post/put/delete/head/patch(options, callback)`

HTTP request methods (supports both Promise and callback styles).

**Parameters:**
- `options` (string | object): URL string or configuration object
  - `url` (string): Request URL
  - `method` (string): Request method
  - `headers` (object): Request headers
  - `body` (string | object): Request body (objects auto-converted to JSON)
- `callback` (function, optional): Callback function

**Returns:** Promise (resolve value includes error, status, statusCode, headers, body)

**🌟 Features:**
- ✅ body supports objects auto-converted to JSON
- ✅ Automatically sets Content-Type
- ✅ Automatically ignores SSL certificate validation

**Examples:**
```javascript
// Using Promise
const result = await $.http.get('https://api.example.com/data');
if (!result.error) {
    $.log('Status code:', result.status);
    $.log('Response:', result.body);
}

// Using callback
$.http.post({
    url: 'https://api.example.com/data',
    body: { key: 'value' }  // Auto-converted to JSON
}, (error, response, body) => {
    if (!error) {
        $.log('Submitted successfully:', body);
    }
});

// Simplified syntax (direct URL)
$.http.get('https://api.example.com/data', (error, response, body) => {
    $.log(body);
});
```

#### `$.notification.post(title, subtitle, body, options)`

Send system notification.

**Example:**
```javascript
$.notification.post('Task Complete', 'Data Processing', 'Processed 100 records');
```

#### `$.read(key)` / `$.write(value, key)` / `$.del(key)`

Persistent storage operations.

**Example:**
```javascript
// Write
$.write(JSON.stringify({ count: 42 }), 'my-data');

// Read
const data = $.read('my-data');
if (data) {
    const obj = JSON.parse(data);
    $.log('Count:', obj.count);
}

// Delete
$.del('my-data');
```

#### Environment Detection Methods

- `$.isNode()` - Returns false
- `$.isSurge()` - Returns false
- `$.isQuanX()` - Returns true
- `$.isLoon()` - Returns false

**Example:**
```javascript
if ($.isQuanX()) {
    $.log('Running in Quantumult X compatibility mode');
}
```

---

### Complete QX Script Example

```javascript
const $ = new Env('Health Check');

(async () => {
    $.log('Starting health check...');

    // Download remote utility library (auto-cached)
    try {
        const utils = await $.getScript('https://example.com/utils.js');
        eval(utils);
    } catch (error) {
        $.log('Utility library loading failed:', error);
    }

    // Execute HTTP request
    const result = await $.http.get({
        url: 'https://api.example.com/health',
        headers: {
            'Authorization': 'Bearer token'
        }
    });

    if (!result.error && result.status === 200) {
        $.log('Health check passed');

        // Save result
        $.write(result.body, 'last-health-check');

        // Send notification
        $.notification.post('Health Check', '✅ Passed', '');
    } else {
        $.log('Health check failed:', result.error);
        $.notification.post('Health Check', '❌ Failed', result.error || '');
    }

    // Complete script
    $.done();
})();
```

---

## Logging

### `console.log(message)`

Log normal messages.

**Example:**
```javascript
console.log('[Info] Script started');
```

### `console.warn(message)`

Log warning messages.

**Example:**
```javascript
console.warn('[Warning] High CPU usage detected');
```

### `console.error(message)`

Log error messages.

**Example:**
```javascript
console.error('[Error] Connection failed');
```

---

## Script Control

### `$done(result)`

Complete script execution and return result.

**Example:**
```javascript
$done(JSON.stringify({
    success: true,
    data: { count: 42 }
}));
```

**Important:** Always call `$done()` at the end of your script, especially for async operations.

---

## Advanced Features

### 🌟 SSL Certificate Auto-Ignore

All HTTP requests in NaviTerm (`$httpClient`, `$task.fetch`, `$.http`) **automatically ignore SSL certificate validation**, allowing access to HTTPS services with self-signed certificates without extra configuration.

**Use cases:**
- Internal test environment HTTPS APIs
- Private services with self-signed certificates
- Development environment HTTPS endpoints

**Example:**
```javascript
// Directly access HTTPS service with self-signed certificate, no extra config needed
$task.fetch({
    url: 'https://self-signed.example.com/api',
    method: 'GET'
})
.then(response => {
    console.log('Access successful:', response.body);
});
```

---

### 🌟 Smart Request Strategy

`$task.fetch` automatically chooses optimal strategy based on request method:

**GET / HEAD requests:**
- Uses `downloadTask`
- Bypasses system resource size limits
- Suitable for downloading large files or large response bodies

**POST / PUT / DELETE / PATCH requests:**
- Uses `uploadTask`
- Full support for request body
- Suitable for submitting data

---

### 🌟 Smart Script Caching

`Env.getScript(url)` automatically caches downloaded remote scripts:

**Caching strategy:**
- Generates cache key based on URL's last component (filename)
- Auto-caches to persistent storage after first download
- Subsequent calls read directly from cache, no re-download needed

**Example:**
```javascript
const $ = new Env('My Script');

// First call downloads and caches
const cheerio = await $.getScript('https://cdn.jsdelivr.net/npm/cheerio@1.0.0-rc.12/dist/browser/cheerio.min.js');
// Cache key: script_cache_cheerio.min.js

// Second call reads directly from cache, instant return
const cheerio2 = await $.getScript('https://cdn.jsdelivr.net/npm/cheerio@1.0.0-rc.12/dist/browser/cheerio.min.js');
```

**Clear cache:**
```javascript
// Manually delete cache
$persistentStore.remove('script_cache_cheerio.min.js');
```

---

### 💡 Runtime Variables vs Persistent Storage

| Feature | `$variables` | `$persistentStore` |
|---------|--------------|-------------------|
| Storage Location | Memory | Disk |
| Lifecycle | Current script execution only | Permanent |
| Performance | Very fast | Slower (involves I/O) |
| Use Cases | Temporary state, async operation passing | Configuration, historical data |

**Best practice:**
```javascript
// Use runtime variables to pass temporary state
$variables.set('request_count', '0');

hosts.forEach(host => {
    checkHost(host, (result) => {
        let count = parseInt($variables.get('request_count') || '0');
        count++;
        $variables.set('request_count', count.toString());

        if (count === hosts.length) {
            // Save to persistent storage when complete
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

## Best Practices

### 1. Error Handling

Always handle errors in callbacks:

```javascript
$ssh.exec(hostId, command, (result) => {
    if (!result.success) {
        console.error('Command failed:', result.error);
        $notification.post('Error', result.error, '');
        $done(JSON.stringify({ error: result.error }));
        return;
    }
    // Handle success case
});
```

### 2. Async Operations

Track async operations to ensure proper `$done()` call:

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

### 3. Logging

Use structured logging with prefixes:

```javascript
console.log('[Health Check] Starting...');
console.warn('[Health Check] High CPU: 95%');
console.error('[Health Check] Connection failed');
```

---

## Complete Examples

### SSH Script Example

```javascript
console.log('[Disk Check] Starting...');

$ssh.getHosts((hosts) => {
    if (hosts.length === 0) {
        console.error('[Disk Check] No hosts configured');
        $done(JSON.stringify({ error: 'No hosts found' }));
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
                        'Disk Alert',
                        host.name,
                        `Disk usage: ${usage}%`
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

### HTTP Script Example

```javascript
console.log('[API Check] Starting...');

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
                    'API Alert',
                    `${unhealthy.length} endpoints down`,
                    ''
                );
            }
            $done(JSON.stringify({ results }));
        }
    });
});
```

---

## Need Help?

- **Quick Start**: [QUICK-START.md](QUICK-START.md)
- **GitHub**: https://github.com/jc-hk-1916/NaviTerm

---

## Appendix: Complete API Reference Table

### Standard APIs (Compatible with Surge / Quantumult X / Loon)

| API | Type | Description |
|-----|------|-------------|
| `$httpClient.get/post/put/delete/head/patch` | Standard | HTTP client (callback style) |
| `$task.fetch` | Standard + Enhanced | HTTP client (Promise, with SSL ignore and smart strategy) |
| `$notification.post` | Standard | System notifications |
| `$notify` | Standard | Notification shorthand |
| `$persistentStore.read/write` | Standard | Persistent storage |
| `$prefs.valueForKey/setValueForKey` | Standard (QX) | Environment variables (QX style) |
| `$env.get/set/remove` | Standard | Environment variables |
| `$environment` | Standard | System information |
| `Env` constructor | Standard (QX) + Enhanced | Quantumult X compatibility layer (with cache optimization) |
| `$done` | Standard | Script completion |
| `console.log/warn/error` | Standard | Logging output |

### Extension APIs (NaviTerm Additions)

| API | Description | Advantage |
|-----|-------------|-----------|
| `$variables.*` | Runtime temporary variables | Memory-level storage, higher performance |
| `$date.*` | Date formatting utilities | No manual time format handling needed |
| `$env.allKeys()` | Get all environment variable keys | Easier traversal and management |
| `$env.all()` | Get all environment variables as object | Batch access to environment variables |
| `$persistentStore.allKeys()` | Get all storage keys | Easier traversal and management |
| `$persistentStore.remove()` | Delete specific key | Precise single data deletion |
| `$persistentStore.clear()` | Clear all data | Batch cleanup |
| `$variables.has()` | Check if variable exists | Avoid undefined checks |
| `$ssh.exec/getHosts` | SSH operations | Direct remote command execution |

### Enhanced Features (Optimized Implementations of Standard APIs)

| Feature | Description | Affected APIs |
|---------|-------------|--------------|
| SSL Certificate Auto-Ignore | Automatically ignores certificate validation, supports self-signed certificates | `$task.fetch`, `$.http`, `$.getScript` |
| Smart Request Strategy | GET/HEAD uses downloadTask to bypass size limits | `$task.fetch` |
| Smart Script Caching | Automatically caches remote scripts, accelerates second load | `$.getScript` |
| Auto JSON Serialization | HTTP body supports objects auto-converted to JSON | `$.http.*` |

---

**Happy coding! 🚀**
