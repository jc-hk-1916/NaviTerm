# Quick Start Guide

Get started with NaviTerm AutoTask in 5 minutes!

---

## Step 1: Add Your First Subscription

### Option A: Complete Suite (Recommended for Beginners)

1. Open **NaviTerm** app
2. Navigate to **AutoTask** → **Subscriptions**
3. Tap **Add Subscription** (+ button)
4. Fill in the form:
   - **Name**: `Complete Automation Suite`
   - **URL**:
     ```
     https://raw.githubusercontent.com/jc-hk-1916/NaviTerm/main/autotask-subscriptions/subscriptions/complete-suite.json
     ```
   - **Auto-Update**: `0 6 * * *` (Daily at 6 AM)
5. Tap **Add**

✅ Done! Subscription added, all example scripts are now available.

### Option B: SSH Monitoring Suite

For server monitoring only:

- **Name**: `SSH Monitoring`
- **URL**:
  ```
  https://raw.githubusercontent.com/jc-hk-1916/NaviTerm/main/autotask-subscriptions/subscriptions/ssh-monitoring-simple.conf
  ```
- **Auto-Update**: `0 6 * * *`

### Option C: API Monitoring Suite

For API health checks:

- **Name**: `API Monitoring`
- **URL**:
  ```
  https://raw.githubusercontent.com/jc-hk-1916/NaviTerm/main/autotask-subscriptions/subscriptions/api-monitoring-simple.conf
  ```
- **Auto-Update**: `0 6 * * *`

---

## Step 2: Configure Your First Script

### Example: Server Health Check

1. Go to **AutoTask** → **Scripts**
2. Find **Server Health Check**
3. Tap to open the script editor
4. Modify the thresholds at the top:
   ```javascript
   const CPU_THRESHOLD = 80;      // Alert when CPU > 80%
   const MEMORY_THRESHOLD = 85;   // Alert when Memory > 85%
   const DISK_THRESHOLD = 90;     // Alert when Disk > 90%
   ```
5. Tap **Save**

### Example: API Health Check

1. Find **API Health Check** script
2. Edit the endpoints list:
   ```javascript
   const ENDPOINTS = [
       { name: 'My API', url: 'https://api.mysite.com/health' },
       { name: 'Auth Service', url: 'https://auth.mysite.com/status' }
   ];
   ```
3. Save the script

---

## Step 3: Test Your Script

### Manual Test

1. Open the script
2. Tap **Run** button (▶️)
3. Watch the logs in real-time
4. Check the notification

### View Execution History

1. Go to **AutoTask** → **Logs**
2. Filter by script name
3. View execution results and output

---

## Step 4: Enable Automatic Execution

Scripts run automatically based on their cron schedule:

- **Server Health Check**: Every 6 hours (`0 */6 * * *`)
- **Disk Space Alert**: Daily at 8 AM (`0 8 * * *`)
- **API Health Check**: Every 5 minutes (`*/5 * * * *`)

### Modify Schedule

1. Open the script
2. Find the subscription in **Subscriptions** tab
3. Edit the cron expression
4. Save

---

## Common Cron Expressions

| Expression | Meaning |
|------------|---------|
| `*/5 * * * *` | Every 5 minutes |
| `*/15 * * * *` | Every 15 minutes |
| `0 * * * *` | Every hour |
| `0 */6 * * *` | Every 6 hours |
| `0 8 * * *` | Daily at 8:00 AM |
| `0 0 * * *` | Daily at midnight |
| `0 0 * * 0` | Weekly on Sunday |
| `0 0 1 * *` | Monthly on 1st day |

---

## Troubleshooting

### Script Not Running?

1. Check if the script is **enabled** (green dot)
2. Verify the cron expression is valid
3. Check **Logs** for error messages
4. Ensure you have configured SSH hosts (for SSH scripts)

### No Notifications?

1. Go to **Settings** → **Notifications**
2. Enable **AutoTask Notifications**
3. Grant notification permissions in iOS/macOS Settings

### SSH Connection Failed?

1. Verify SSH host configuration
2. Test SSH connection manually in Terminal tab
3. Check network connectivity
4. Verify SSH credentials

### API Request Failed?

1. Check API URL is correct
2. Verify API is accessible from your device
3. Check API authentication (if required)
4. Review error message in logs

---

## Next Steps

### Explore More Scripts

Browse all available scripts:
- **Monitoring**: Server health, disk, memory, processes
- **System Info**: Uptime, users, hardware
- **Network**: Connectivity, ports, SSL, DNS
- **API Monitoring**: Health checks, response time, webhooks
- **Integrations**: Slack, Discord, Telegram

### Customize Scripts

All scripts are fully customizable:
1. Open script editor
2. Modify configuration constants
3. Add your own logic
4. Save and test

### Create Your Own Scripts

Learn the API and create custom scripts:
- Read **[API Reference](API-REFERENCE.md)**
- Study existing scripts
- Experiment in the script editor
- Share with the community!

---

## Need Help?

- **Documentation**: [Full API Reference](API-REFERENCE.md)
- **Examples**: [Advanced Examples](ADVANCED-EXAMPLES.md)
- **Support**: support@naviterm.com
- **GitHub**: https://github.com/jc-hk-1916/NaviTerm

---

## Quick Reference Card

### Essential URLs

**Complete Suite:**
```
https://raw.githubusercontent.com/jc-hk-1916/NaviTerm/main/autotask-subscriptions/subscriptions/complete-suite.json
```

**SSH Monitoring:**
```
https://raw.githubusercontent.com/jc-hk-1916/NaviTerm/main/autotask-subscriptions/subscriptions/ssh-monitoring-simple.conf
```

**API Monitoring:**
```
https://raw.githubusercontent.com/jc-hk-1916/NaviTerm/main/autotask-subscriptions/subscriptions/api-monitoring-simple.conf
```

### Essential APIs

```javascript
// SSH
$ssh.exec(hostId, command, callback)
$ssh.getHosts(callback)

// HTTP
$httpClient.get(url, callback)
$httpClient.post(options, callback)

// Notifications
$notification.post(title, subtitle, body)

// Storage
$persistentStore.write(value, key)
$persistentStore.read(key)

// Finish
$done(result)
```

---

**Happy Automating! 🚀**
