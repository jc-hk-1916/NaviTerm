// Data Collection Script
// Collect data from multiple APIs and store them

// ==================== Configuration ====================
const DATA_SOURCES = [
    {
        name: 'GitHub API',
        url: 'https://api.github.com',
        description: 'GitHub API status'
    },
    {
        name: 'JSONPlaceholder',
        url: 'https://jsonplaceholder.typicode.com/posts/1',
        description: 'Sample post data'
    },
    {
        name: 'HTTPBin IP',
        url: 'https://httpbin.org/ip',
        description: 'Public IP information'
    }
];

// ==================== Script Start ====================
console.log('[Data Collection] Starting...');

let results = [];
let completed = 0;

DATA_SOURCES.forEach(source => {
    const startTime = $date.timestamp();

    $httpClient.get(source.url, (error, response, body) => {
        const endTime = $date.timestamp();
        const responseTime = endTime - startTime;

        if (!error && response.status === 200) {
            // Parse JSON data
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

            console.log(`✓ [${source.name}] Data collected successfully`);
            console.log(`  Response time: ${responseTime}ms`);

            // Store data to persistent storage
            const storageKey = `data_${source.name.toLowerCase().replace(/\s+/g, '_')}_${$date.format('yyyy-MM-dd')}`;
            $persistentStore.write(JSON.stringify({
                data: data,
                timestamp: $date.nowSimple(),
                responseTime: responseTime
            }), storageKey);

            console.log(`  Stored to: ${storageKey}`);

        } else {
            console.error(`✗ [${source.name}] Data collection failed`);
            console.error(`  Error: ${error || 'HTTP ' + response.status}`);

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
            console.log('[Data Collection] Collection complete');

            const successful = results.filter(r => r.status === 'SUCCESS').length;
            const failed = results.filter(r => r.status === 'FAILED').length;

            console.log(`Success: ${successful}/${DATA_SOURCES.length}`);
            console.log(`Failed: ${failed}/${DATA_SOURCES.length}`);

            if (failed > 0) {
                $notification.post(
                    'Data Collection Alert',
                    `${failed} sources failed`,
                    `Success: ${successful}, Failed: ${failed}`
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
