// API Response Time Monitor
// Monitor API response time and record trends

// ==================== Configuration ====================
const ENDPOINTS = [
    {
        name: 'GitHub API',
        url: 'https://api.github.com',
        threshold: 1000  // Response time threshold (ms)
    },
    {
        name: 'JSONPlaceholder',
        url: 'https://jsonplaceholder.typicode.com/posts/1',
        threshold: 500
    },
    {
        name: 'HTTPBin',
        url: 'https://httpbin.org/get',
        threshold: 800
    }
];

// ==================== Script Start ====================
console.log('[Response Time Monitor] Starting...');

let results = [];
let completed = 0;

ENDPOINTS.forEach(endpoint => {
    const startTime = $date.timestamp();

    $task.fetch({
        url: endpoint.url,
        method: 'GET'
    })
    .then(response => {
        const endTime = $date.timestamp();
        const responseTime = endTime - startTime;
        const status = responseTime > endpoint.threshold ? 'SLOW' : 'OK';

        results.push({
            name: endpoint.name,
            url: endpoint.url,
            responseTime: responseTime,
            threshold: endpoint.threshold,
            status: status,
            httpStatus: response.status,
            timestamp: $date.nowSimple()
        });

        const icon = status === 'OK' ? '✓' : '⚠️';
        console.log(`${icon} [${endpoint.name}] ${responseTime}ms (Threshold: ${endpoint.threshold}ms)`);

        // Store response time history
        const historyKey = `response_time_${endpoint.name.toLowerCase().replace(/\s+/g, '_')}`;
        const history = JSON.parse($persistentStore.read(historyKey) || '[]');
        history.push({
            time: $date.nowSimple(),
            responseTime: responseTime,
            status: status
        });

        // Keep only the last 100 records
        if (history.length > 100) {
            history.shift();
        }

        $persistentStore.write(JSON.stringify(history), historyKey);

        // If response time is too slow, send alert
        if (status === 'SLOW') {
            $notification.post(
                'Response Time Alert',
                endpoint.name,
                `Response time: ${responseTime}ms (Threshold: ${endpoint.threshold}ms)`
            );
        }

        completed++;
        if (completed === ENDPOINTS.length) {
            finishMonitoring();
        }
    })
    .catch(error => {
        const endTime = $date.timestamp();
        const responseTime = endTime - startTime;

        console.error(`✗ [${endpoint.name}] Request failed: ${error.error}`);

        results.push({
            name: endpoint.name,
            url: endpoint.url,
            responseTime: responseTime,
            status: 'ERROR',
            error: error.error,
            timestamp: $date.nowSimple()
        });

        completed++;
        if (completed === ENDPOINTS.length) {
            finishMonitoring();
        }
    });
});

function finishMonitoring() {
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('[Response Time Monitor] Monitoring complete');

    // Calculate statistics
    const successful = results.filter(r => r.status !== 'ERROR');
    const avgResponseTime = successful.length > 0
        ? Math.round(successful.reduce((sum, r) => sum + r.responseTime, 0) / successful.length)
        : 0;
    const slowCount = results.filter(r => r.status === 'SLOW').length;
    const errorCount = results.filter(r => r.status === 'ERROR').length;

    console.log(`Average response time: ${avgResponseTime}ms`);
    console.log(`Slow responses: ${slowCount}`);
    console.log(`Errors: ${errorCount}`);

    // Send summary notification
    const okCount = results.filter(r => r.status === 'OK').length;
    let notificationTitle = 'API Response Time Monitor';
    let notificationBody = '';

    if (errorCount > 0 || slowCount > 0) {
        // Alert notification for issues
        notificationTitle = '⚠️ API Performance Issues';
        const issues = [];
        if (errorCount > 0) issues.push(`${errorCount} error${errorCount > 1 ? 's' : ''}`);
        if (slowCount > 0) issues.push(`${slowCount} slow response${slowCount > 1 ? 's' : ''}`);
        notificationBody = `${issues.join(', ')} detected\nAverage: ${avgResponseTime}ms | OK: ${okCount}/${ENDPOINTS.length}`;
    } else {
        // Success notification
        notificationTitle = '✓ API Performance Normal';
        notificationBody = `All ${ENDPOINTS.length} endpoints responding normally\nAverage response time: ${avgResponseTime}ms`;
    }

    $notification.post(
        notificationTitle,
        notificationBody,
        ''
    );

    $done(JSON.stringify({
        success: true,
        results: results,
        summary: {
            total: ENDPOINTS.length,
            avgResponseTime: avgResponseTime,
            slowCount: slowCount,
            errorCount: errorCount
        }
    }));
}
