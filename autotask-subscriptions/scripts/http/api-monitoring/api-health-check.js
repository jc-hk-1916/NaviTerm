/**
 * API Health Check
 * Monitor multiple API endpoints and report their status
 *
 * Real API examples (all URLs are accessible):
 * - JSONPlaceholder: Free fake REST API for testing
 * - httpbin.org: HTTP request and response service
 * - GitHub API: Public API
 * - Example.com: Always available test domain
 *
 * Configuration:
 * - ENDPOINTS: Array of API endpoints to monitor
 *
 * @author NaviTerm AutoTask
 * @version 1.0.0
 */

const ENDPOINTS = [
    // JSONPlaceholder - Free fake API for testing (https://jsonplaceholder.typicode.com)
    { name: 'JSONPlaceholder API', url: 'https://jsonplaceholder.typicode.com/posts/1' },

    // httpbin.org - HTTP request and response service
    { name: 'HTTPBin Status', url: 'https://httpbin.org/status/200' },

    // GitHub API - Public API
    { name: 'GitHub API', url: 'https://api.github.com' },

    // Example.com - Always available
    { name: 'Example.com', url: 'https://example.com' }
];

console.log('[API Health] Starting API health check...');
console.log(`[API Health] Checking ${ENDPOINTS.length} endpoints...`);

let results = [];
let completed = 0;

ENDPOINTS.forEach(endpoint => {
    checkEndpoint(endpoint, (result) => {
        results.push(result);
        completed++;

        if (completed === ENDPOINTS.length) {
            finishCheck(results);
        }
    });
});

function checkEndpoint(endpoint, callback) {
    console.log(`[API Health] Checking ${endpoint.name}...`);

    const startTime = $date.timestamp();

    $httpClient.get(endpoint.url, (error, response, body) => {
        const endTime = $date.timestamp();
        const responseTime = endTime - startTime;

        if (error) {
            console.error(`[API Health] ${endpoint.name} failed: ${error}`);
            callback({
                name: endpoint.name,
                url: endpoint.url,
                healthy: false,
                error: error,
                responseTime: responseTime
            });
            return;
        }

        const healthy = response.status >= 200 && response.status < 300;

        if (!healthy) {
            console.warn(`[API Health] ${endpoint.name} returned HTTP ${response.status}`);
        } else {
            console.log(`[API Health] ${endpoint.name} healthy (${Math.round(responseTime)}ms)`);
        }

        callback({
            name: endpoint.name,
            url: endpoint.url,
            healthy: healthy,
            status: response.status,
            responseTime: Math.round(responseTime),
            body: body.substring(0, 200)  // First 200 characters
        });
    });
}

function finishCheck(results) {
    const unhealthy = results.filter(r => !r.healthy);
    const healthy = results.filter(r => r.healthy);

    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('[API Health] Check complete');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');

    results.forEach(r => {
        const status = r.healthy ? '✓' : '✗';
        const time = r.responseTime ? `${r.responseTime}ms` : 'N/A';
        console.log(`${status} ${r.name}: ${r.healthy ? 'OK' : 'FAILED'} (${time})`);
    });

    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');

    if (unhealthy.length > 0) {
        const message = unhealthy.map(r =>
            `${r.name}: ${r.error || `HTTP ${r.status}`}`
        ).join('\n');

        console.error(`[API Health] Issues detected:\n${message}`);
        $notification.post(
            'API Health Alert',
            `${unhealthy.length}/${ENDPOINTS.length} endpoints down`,
            ''
        );
    } else {
        console.log('[API Health] All endpoints are healthy');
        $notification.post(
            'API Health OK',
            `All ${ENDPOINTS.length} endpoints are healthy`,
            ''
        );
    }

    // Calculate average response time
    const avgResponseTime = healthy.length > 0
        ? results.filter(r => r.responseTime).reduce((sum, r) => sum + r.responseTime, 0) / healthy.length
        : 0;

    $done(JSON.stringify({
        timestamp: $date.nowSimple(),
        total: results.length,
        healthy: healthy.length,
        unhealthy: unhealthy.length,
        avgResponseTime: Math.round(avgResponseTime),
        details: results
    }));
}
