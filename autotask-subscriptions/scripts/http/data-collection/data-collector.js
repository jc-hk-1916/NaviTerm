// Data Collection Script
// 从多个API收集数据并存储
// Collect data from multiple APIs and store

// ==================== 配置 Configuration ====================
const DATA_SOURCES = [
    {
        name: 'GitHub API',
        url: 'https://api.github.com',
        description: 'GitHub API Status'
    },
    {
        name: 'JSONPlaceholder',
        url: 'https://jsonplaceholder.typicode.com/posts/1',
        description: 'Sample Post Data'
    },
    {
        name: 'HTTPBin IP',
        url: 'https://httpbin.org/ip',
        description: 'Public IP Information'
    }
];

// ==================== 脚本开始 Script Start ====================
console.log('[数据收集] 开始执行...');
console.log('[Data Collection] Starting...');

let results = [];
let completed = 0;

DATA_SOURCES.forEach(source => {
    const startTime = $date.timestamp();

    $httpClient.get(source.url, (error, response, body) => {
        const endTime = $date.timestamp();
        const responseTime = endTime - startTime;

        if (!error && response.status === 200) {
            // 解析JSON数据 Parse JSON data
            let data;
            try {
                data = JSON.parse(body);
            } catch (e) {
                data = body;
            }

            results.push({
                source: source.name,
                description: source.description,
                url: source.url,
                status: 'SUCCESS',
                responseTime: responseTime,
                data: data,
                timestamp: $date.nowSimple()
            });

            console.log(`✓ [${source.name}] 数据收集成功 Data collected successfully`);
            console.log(`  响应时间 Response time: ${responseTime}ms`);

            // 存储数据到持久化存储 Store data to persistent storage
            const storageKey = `data_${source.name.toLowerCase().replace(/\s+/g, '_')}_${$date.format('yyyy-MM-dd')}`;
            $persistentStore.write(JSON.stringify({
                data: data,
                timestamp: $date.nowSimple(),
                responseTime: responseTime
            }), storageKey);

            console.log(`  已存储到 Stored to: ${storageKey}`);

        } else {
            console.error(`✗ [${source.name}] 数据收集失败 Data collection failed`);
            console.error(`  错误 Error: ${error || 'HTTP ' + response.status}`);

            results.push({
                source: source.name,
                description: source.description,
                url: source.url,
                status: 'FAILED',
                error: error || `HTTP ${response.status}`,
                timestamp: $date.nowSimple()
            });
        }

        completed++;
        if (completed === DATA_SOURCES.length) {
            console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
            console.log('[数据收集] 收集完成');
            console.log('[Data Collection] Collection complete');

            const successful = results.filter(r => r.status === 'SUCCESS').length;
            const failed = results.filter(r => r.status === 'FAILED').length;

            console.log(`成功 Success: ${successful}/${DATA_SOURCES.length}`);
            console.log(`失败 Failed: ${failed}/${DATA_SOURCES.length}`);

            if (failed > 0) {
                $notification.post(
                    '数据收集告警 Data Collection Alert',
                    `${failed} 个数据源失败 sources failed`,
                    `成功: ${successful}, 失败: ${failed}\nSuccess: ${successful}, Failed: ${failed}`
                );
            }

            $done(JSON.stringify({
                success: true,
                results: results,
                summary: {
                    total: DATA_SOURCES.length,
                    successful: successful,
                    failed: failed
                }
            }));
        }
    });
});
