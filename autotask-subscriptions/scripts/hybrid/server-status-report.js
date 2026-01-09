/**
 * Server Status Report (Hybrid Mode)
 * Collect server metrics via SSH and report to monitoring API via HTTP
 *
 * This script demonstrates the power of combining SSH and HTTP:
 * 1. Collect metrics from servers via SSH
 * 2. Aggregate and format data
 * 3. Send to monitoring platform via HTTP API
 *
 * Real API example:
 * - httpbin.org/post: HTTP POST test endpoint (echoes your data)
 * - You can replace it with your own monitoring platform API
 *
 * Configuration:
 * - MONITORING_API_URL: Your monitoring platform API endpoint
 * - USE_REAL_API: Set to false to use httpbin.org for testing
 *
 * @author NaviTerm AutoTask
 * @version 1.0.0
 */

// Configuration
const USE_REAL_API = false;  // Set to true when you have a real monitoring API

// Real monitoring API (replace with your own)
const REAL_MONITORING_API = {
    url: 'https://your-monitoring-platform.com/api/v1/metrics',
    apiKey: 'your-api-key-here'
};

// Test API (httpbin.org - always available for testing)
const TEST_API = {
    url: 'https://httpbin.org/post',
    apiKey: 'test-key'
};

const MONITORING_API_URL = USE_REAL_API ? REAL_MONITORING_API.url : TEST_API.url;
const API_KEY = USE_REAL_API ? REAL_MONITORING_API.apiKey : TEST_API.apiKey;

console.log('[Status Report] Starting server status collection...');

$ssh.getHosts((hosts) => {
    if (hosts.length === 0) {
        console.error('[Status Report] No configured hosts found');
        $notification.post('Status Report Failed', 'No configured hosts found', '');
        $done(JSON.stringify({ error: 'No hosts found' }));
        return;
    }

    console.log(`[Status Report] Collecting metrics from ${hosts.length} hosts...`);

    let metrics = [];
    let completed = 0;

    hosts.forEach(host => {
        collectMetrics(host, (result) => {
            if (result) {
                metrics.push(result);
            }
            completed++;

            if (completed === hosts.length) {
                sendReport(metrics);
            }
        });
    });
});

function collectMetrics(host, callback) {
    console.log(`[Status Report] Collecting from ${host.name}...`);

    // Collect CPU usage
    $ssh.exec(host.id, "top -bn1 | grep 'Cpu(s)' | awk '{print $2}' | cut -d'%' -f1", (cpuResult) => {
        if (!cpuResult.success) {
            console.error(`[Status Report] Failed to get CPU from ${host.name}`);
            callback(null);
            return;
        }

        const cpuUsage = parseFloat(cpuResult.output.trim());

        // Collect memory usage
        $ssh.exec(host.id, "free | grep Mem | awk '{print int($3/$2 * 100)}'", (memResult) => {
            if (!memResult.success) {
                console.error(`[Status Report] Failed to get memory from ${host.name}`);
                callback(null);
                return;
            }

            const memUsage = parseInt(memResult.output.trim());

            // Collect disk usage
            $ssh.exec(host.id, "df -h / | tail -1 | awk '{print $5}' | tr -d '%'", (diskResult) => {
                if (!diskResult.success) {
                    console.error(`[Status Report] Failed to get disk from ${host.name}`);
                    callback(null);
                    return;
                }

                const diskUsage = parseInt(diskResult.output.trim());

                // Collect uptime
                $ssh.exec(host.id, "uptime -p", (uptimeResult) => {
                    const uptime = uptimeResult.success ? uptimeResult.output.trim() : 'unknown';

                    console.log(`[Status Report] ${host.name}: CPU=${cpuUsage}%, Mem=${memUsage}%, Disk=${diskUsage}%`);

                    callback({
                        hostname: host.name,
                        host: host.host,
                        timestamp: $date.nowSimple(),
                        metrics: {
                            cpu_usage: cpuUsage,
                            memory_usage: memUsage,
                            disk_usage: diskUsage,
                            uptime: uptime
                        }
                    });
                });
            });
        });
    });
}

function sendReport(metrics) {
    if (metrics.length === 0) {
        console.error('[Status Report] No metrics collected');
        $notification.post('Status Report Failed', 'No metrics collected', '');
        $done(JSON.stringify({ error: 'No metrics collected' }));
        return;
    }

    console.log(`[Status Report] Sending ${metrics.length} metrics to monitoring API...`);

    const payload = {
        source: 'NaviTerm AutoTask',
        timestamp: $date.nowSimple(),
        metrics: metrics
    };

    $httpClient.post({
        url: MONITORING_API_URL,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${API_KEY}`,
            'User-Agent': 'NaviTerm-AutoTask/1.0'
        },
        body: JSON.stringify(payload)
    }, (error, response, body) => {
        if (error) {
            console.error(`[Status Report] Failed to send report: ${error}`);
            $notification.post('Status Report Failed', `API error: ${error}`, '');
            $done(JSON.stringify({ success: false, error: error }));
            return;
        }

        if (response.status >= 200 && response.status < 300) {
            console.log(`[Status Report] Report sent successfully (HTTP ${response.status})`);
            $notification.post(
                'Status Report Sent',
                `${metrics.length} servers reported`,
                ''
            );
            $done(JSON.stringify({
                success: true,
                metricsCount: metrics.length,
                status: response.status
            }));
        } else {
            console.error(`[Status Report] API returned HTTP ${response.status}`);
            $notification.post(
                'Status Report Failed',
                `API returned HTTP ${response.status}`,
                ''
            );
            $done(JSON.stringify({
                success: false,
                status: response.status,
                body: body
            }));
        }
    });
}
