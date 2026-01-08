// API Response Time Monitor
// 监控API响应时间并记录趋势
// Monitor API response times and track trends

// ==================== 配置 Configuration ====================
const ENDPOINTS = [
    {
        name: 'GitHub API',
        url: 'https://api.github.com',
        threshold: 1000  // 响应时间阈值(ms) Response time threshold (ms)
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

// ==================== 脚本开始 Script Start ====================
console.log('[响应时间监控] 开始执行...');
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
        console.log(`${icon} [${endpoint.name}] ${responseTime}ms (阈值 threshold: ${endpoint.threshold}ms)`);

        // 存储响应时间历史 Store response time history
        const historyKey = `response_time_${endpoint.name.toLowerCase().replace(/\s+/g, '_')}`;
        const history = JSON.parse($persistentStore.read(historyKey) || '[]');
        history.push({
            time: $date.nowSimple(),
            responseTime: responseTime,
            status: status
        });

        // 只保留最近100条记录 Keep only last 100 records
        if (history.length > 100) {
            history.shift();
        }

        $persistentStore.write(JSON.stringify(history), historyKey);

        // 如果响应时间过慢,发送告警 Send alert if response time is slow
        if (status === 'SLOW') {
            $notification.post(
                '响应时间告警 Response Time Alert',
                endpoint.name,
                `响应时间: ${responseTime}ms (阈值: ${endpoint.threshold}ms)\nResponse time: ${responseTime}ms (Threshold: ${endpoint.threshold}ms)`
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

        console.error(`✗ [${endpoint.name}] 请求失败 Request failed: ${error.error}`);

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
    console.log('[响应时间监控] 监控完成');
    console.log('[Response Time Monitor] Monitoring complete');

    // 计算统计信息 Calculate statistics
    const successful = results.filter(r => r.status !== 'ERROR');
    const avgResponseTime = successful.length > 0
        ? Math.round(successful.reduce((sum, r) => sum + r.responseTime, 0) / successful.length)
        : 0;
    const slowCount = results.filter(r => r.status === 'SLOW').length;
    const errorCount = results.filter(r => r.status === 'ERROR').length;

    console.log(`平均响应时间 Average response time: ${avgResponseTime}ms`);
    console.log(`慢响应 Slow responses: ${slowCount}`);
    console.log(`错误 Errors: ${errorCount}`);

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
