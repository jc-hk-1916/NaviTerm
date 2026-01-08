# NaviTerm AutoTask API Reference

Complete reference for all available JavaScript APIs in NaviTerm AutoTask.

---

## Table of Contents

- [SSH Operations](#ssh-operations)
- [HTTP Client](#http-client)
- [Notifications](#notifications)
- [Persistent Storage](#persistent-storage)
- [Runtime Variables](#runtime-variables)
- [Preferences](#preferences)
- [Environment Variables](#environment-variables)
- [System Environment](#system-environment)
- [Date Utilities](#date-utilities)
- [Logging](#logging)
- [Script Control](#script-control)

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

**Parameters:**
- `callback` (function): Callback function with hosts array

**Callback signature:**
```javascript
(hosts) => {
    // hosts is an array of host objects:
    // - id (string): Host ID
    // - name (string): Host name
    // - host (string): Hostname or IP
    // - port (number): SSH port
    // - username (string): SSH username
    // - group (string): Host group (optional)
}
```

**Example:**
```javascript
$ssh.getHosts((hosts) => {
    console.log(`Found ${hosts.length} hosts`);
    hosts.forEach(host => {
        console.log(`- ${host.name} (${host.host})`);
    });
});
```

### `$ssh.connect(hostId, callback)`

Establish SSH connection to a host.

**Parameters:**
- `hostId` (string): Host ID
- `callback` (function): Callback with connection result

**Example:**
```javascript
$ssh.connect('host-123', (success, error) => {
    if (success) {
        console.log('Connected successfully');
    } else {
        console.error('Connection failed:', error);
    }
});
```

### `$ssh.disconnect(hostId)`

Disconnect from SSH host.

**Parameters:**
- `hostId` (string): Host ID

**Example:**
```javascript
$ssh.disconnect('host-123');
```

### `$ssh.isConnected(hostId)`

Check if connected to a host.

**Parameters:**
- `hostId` (string): Host ID

**Returns:** `boolean`

**Example:**
```javascript
if ($ssh.isConnected('host-123')) {
    console.log('Already connected');
}
```

---

## HTTP Client

### `$httpClient.get(urlOrOptions, callback)`

Send HTTP GET request.

**Parameters:**
- `urlOrOptions` (string | object): URL string or options object
- `callback` (function): Callback with response

**Options object:**
```javascript
{
    url: 'https://api.example.com/data',
    headers: {
        'Authorization': 'Bearer token',
        'Content-Type': 'application/json'
    }
}
```

**Callback signature:**
```javascript
(error, response, body) => {
    // error (string): Error message (null if success)
    // response (object): Response object with status and headers
    // body (string): Response body
}
```

**Example:**
```javascript
$httpClient.get('https://api.example.com/data', (error, response, body) => {
    if (error) {
        console.error('Request failed:', error);
        return;
    }
    console.log('Status:', response.status);
    console.log('Body:', body);
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

Send HTTP PUT request. Same signature as POST.

### `$httpClient.delete(urlOrOptions, callback)`

Send HTTP DELETE request. Same signature as GET.

### `$httpClient.head(urlOrOptions, callback)`

Send HTTP HEAD request. Same signature as GET.

### `$httpClient.patch(urlOrOptions, callback)`

Send HTTP PATCH request. Same signature as POST.

### `$task.fetch(options)`

Promise-based HTTP client.

**Parameters:**
- `options` (object): Request options

**Options:**
```javascript
{
    url: 'https://api.example.com/data',
    method: 'GET',  // GET, POST, PUT, DELETE, etc.
    headers: {
        'Authorization': 'Bearer token'
    },
    body: 'request body'
}
```

**Returns:** Promise with response object

**Response object:**
```javascript
{
    status: 200,
    headers: { ... },
    body: 'response body'
}
```

**Example:**
```javascript
$task.fetch({
    url: 'https://api.example.com/data',
    method: 'GET'
})
.then(response => {
    console.log('Status:', response.status);
    console.log('Body:', response.body);
})
.catch(error => {
    console.error('Error:', error.error);
});
```

---

## Notifications

### `$notification.post(title, subtitle, body, options)`

Send system notification.

**Parameters:**
- `title` (string): Notification title
- `subtitle` (string): Notification subtitle
- `body` (string): Notification body
- `options` (object): Optional settings

**Options:**
```javascript
{
    url: 'https://example.com',  // URL to open when clicked
    'open-url': 'https://example.com'  // Alternative key
}
```

**Example:**
```javascript
$notification.post(
    'Server Alert',
    'High CPU Usage',
    'CPU usage is at 95%',
    { url: 'https://monitoring.example.com' }
);
```

### `$notify(title, subtitle, body, options)`

Alternative notification API. Same signature as `$notification.post`.

---

## Persistent Storage

### `$persistentStore.write(value, key)`

Save data permanently.

**Parameters:**
- `value` (string): Value to save
- `key` (string): Storage key

**Returns:** `boolean` (success status)

**Example:**
```javascript
const data = JSON.stringify({ count: 42 });
$persistentStore.write(data, 'my-data');
```

### `$persistentStore.read(key)`

Read saved data.

**Parameters:**
- `key` (string): Storage key

**Returns:** `string | null`

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

**Returns:** Array of strings

**Example:**
```javascript
const keys = $persistentStore.allKeys();
console.log('Stored keys:', keys);
```

### `$persistentStore.remove(key)`

Remove a key from storage.

**Parameters:**
- `key` (string): Storage key

**Returns:** `boolean`

**Example:**
```javascript
$persistentStore.remove('my-data');
```

### `$persistentStore.clear()`

Clear all stored data.

**Example:**
```javascript
$persistentStore.clear();
```

---

## Runtime Variables

Temporary variables that exist only during script execution.

### `$variables.set(key, value)`

Set runtime variable.

**Parameters:**
- `key` (string): Variable name
- `value` (string): Variable value

**Returns:** `boolean`

**Example:**
```javascript
$variables.set('counter', '10');
```

### `$variables.get(key)`

Get runtime variable.

**Parameters:**
- `key` (string): Variable name

**Returns:** `string | null`

**Example:**
```javascript
const counter = $variables.get('counter');
console.log('Counter:', counter);
```

### `$variables.has(key)`

Check if variable exists.

**Parameters:**
- `key` (string): Variable name

**Returns:** `boolean`

**Example:**
```javascript
if ($variables.has('counter')) {
    console.log('Counter exists');
}
```

### `$variables.allKeys()`

Get all variable names.

**Returns:** Array of strings

### `$variables.remove(key)`

Remove a variable.

**Parameters:**
- `key` (string): Variable name

**Returns:** `boolean`

### `$variables.clear()`

Clear all variables.

---

## Preferences

Similar to persistent storage but designed for user preferences.

### `$prefs.setValueForKey(value, key)`

Set preference value.

**Parameters:**
- `value` (string): Preference value
- `key` (string): Preference key

**Returns:** `boolean`

### `$prefs.valueForKey(key)`

Get preference value.

**Parameters:**
- `key` (string): Preference key

**Returns:** `string | null`

### `$prefs.removeValueForKey(key)`

Remove preference.

**Parameters:**
- `key` (string): Preference key

**Returns:** `boolean`

### `$prefs.removeAllValues()`

Clear all preferences.

---

## Environment Variables

### `$env.get(key, defaultValue)`

Get environment variable.

**Parameters:**
- `key` (string): Variable name
- `defaultValue` (string): Default value if not found

**Returns:** `string | null`

**Example:**
```javascript
const apiKey = $env.get('API_KEY', 'default-key');
```

### `$env.set(key, value)`

Set environment variable.

**Parameters:**
- `key` (string): Variable name
- `value` (string): Variable value

**Returns:** `boolean`

### `$env.remove(key)`

Remove environment variable.

**Parameters:**
- `key` (string): Variable name

**Returns:** `boolean`

### `$env.allKeys()`

Get all environment variable names.

**Returns:** Array of strings

### `$env.all()`

Get all environment variables as object.

**Returns:** Object with key-value pairs

**Example:**
```javascript
const allEnv = $env.all();
console.log('Environment:', allEnv);
```

---

## System Environment

### `$environment`

Read-only object with system information.

**Properties:**
- `system` (string): "iOS" or "macOS"
- `version` (string): App version
- `language` (string): System language code
- `deviceName` (string): Device name

**Example:**
```javascript
console.log('System:', $environment.system);
console.log('Version:', $environment.version);
console.log('Language:', $environment.language);
console.log('Device:', $environment.deviceName);
```

---

## Date Utilities

### `$date.now()`

Get current date/time with milliseconds.

**Returns:** String in format "YYYY-MM-DD HH:mm:ss.SSS"

**Example:**
```javascript
const now = $date.now();
console.log('Now:', now);  // "2024-01-15 14:30:45.123"
```

### `$date.nowSimple()`

Get current date/time without milliseconds.

**Returns:** String in format "YYYY-MM-DD HH:mm:ss"

**Example:**
```javascript
const now = $date.nowSimple();
console.log('Now:', now);  // "2024-01-15 14:30:45"
```

### `$date.format(formatString)`

Format current date/time with custom format.

**Parameters:**
- `formatString` (string): Date format string (optional, default: "yyyy-MM-dd HH:mm:ss")

**Returns:** Formatted date string

**Example:**
```javascript
const date = $date.format('yyyy-MM-dd');
console.log('Date:', date);  // "2024-01-15"

const time = $date.format('HH:mm:ss');
console.log('Time:', time);  // "14:30:45"
```

### `$date.timestamp()`

Get current timestamp in milliseconds.

**Returns:** Number (milliseconds since epoch)

**Example:**
```javascript
const ts = $date.timestamp();
console.log('Timestamp:', ts);  // 1705329045123
```

---

## Logging

### `console.log(message)`

Log normal message.

**Parameters:**
- `message` (string): Log message

**Example:**
```javascript
console.log('[Info] Script started');
```

### `console.warn(message)`

Log warning message.

**Parameters:**
- `message` (string): Warning message

**Example:**
```javascript
console.warn('[Warning] High CPU usage detected');
```

### `console.error(message)`

Log error message.

**Parameters:**
- `message` (string): Error message

**Example:**
```javascript
console.error('[Error] Connection failed');
```

---

## Script Control

### `$done(result)`

Finish script execution and return result.

**Parameters:**
- `result` (string): Result data (usually JSON string)

**Example:**
```javascript
$done(JSON.stringify({
    success: true,
    data: { count: 42 }
}));
```

**Important:** Always call `$done()` at the end of your script, especially for async operations.

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
    // Process success case
});
```

### 2. Async Operations

Track async operations to ensure `$done()` is called correctly:

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
console.error('[Health Check] Failed to connect');
```

### 4. Notifications

Send meaningful notifications:

```javascript
$notification.post(
    'Server Alert',                    // Clear title
    'web-server-01',                   // Specific context
    'CPU: 95%, Memory: 87%',          // Actionable details
    { url: 'https://monitoring.com' }  // Quick access
);
```

### 5. Data Persistence

Use persistent storage for trending:

```javascript
// Save current value
const key = `cpu_usage_${$date.format('yyyy-MM-dd')}`;
const history = JSON.parse($persistentStore.read(key) || '[]');
history.push({ time: $date.nowSimple(), value: cpuUsage });
$persistentStore.write(JSON.stringify(history), key);
```

---

## Examples

### Complete SSH Script

```javascript
console.log('[Disk Check] Starting...');

$ssh.getHosts((hosts) => {
    if (hosts.length === 0) {
        console.error('[Disk Check] No hosts configured');
        $done(JSON.stringify({ error: 'No hosts' }));
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

### Complete HTTP Script

```javascript
console.log('[API Check] Starting...');

const endpoints = [
    'https://api.example.com/health',
    'https://auth.example.com/status'
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
                    `${unhealthy.length} endpoint(s) down`,
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
- **Examples**: [ADVANCED-EXAMPLES.md](ADVANCED-EXAMPLES.md)
- **Support**: support@naviterm.com
- **GitHub**: https://github.com/jc-hk-1916/NaviTerm

---

**Happy Coding! 🚀**
